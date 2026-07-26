import { FileText, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";

interface PreviewFile {
  id: string;
  file: File | string; // 👈 string = already uploaded, File = new
  name: string;
  size: string;
}

interface FileUploaderProps {
  value?: (PreviewFile | string)[]; // 👈 accept raw strings from the server too
  onChange?: (files: PreviewFile[]) => void;
  maxFiles?: number;
  label?: string;
  className?: string;
  accept?: Record<string, string[]>;
}

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileNameFromUrl = (url: string) => {
  const parts = url.split("/");
  return parts[parts.length - 1] || url;
};

const resolveFileUrl = (url: string) =>
  url.startsWith("http")
    ? url
    : `${import.meta.env.VITE_APP_BACKEND_API_URL}/${url}`;

const urlToFile = async (url: string, filename: string): Promise<File> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, {
    type: blob.type || "application/octet-stream",
  });
};

export const FileUploader = ({
  value = [],
  onChange,
  maxFiles = 10,
  label,
  className = "",
  accept = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "image/*": [],
  },
}: FileUploaderProps) => {
  // normalize: turn any raw string entries into PreviewFile objects
  const items: PreviewFile[] = value.map((item) =>
    typeof item === "string"
      ? {
          id: item,
          file: item,
          name: getFileNameFromUrl(item),
          size: "—", // no size available for already-uploaded files
        }
      : item,
  );

  // track which string items we've already kicked off a conversion for,
  // so we don't re-fetch on every render/effect run
  const convertingIds = useRef<Set<string>>(new Set());

  // silently convert any existing string-backed items into real Files,
  // so by the time the form is submitted, every item.file is a File
  useEffect(() => {
    const pending = items.filter(
      (item) =>
        typeof item.file === "string" && !convertingIds.current.has(item.id),
    );

    if (pending.length === 0) return;

    pending.forEach((item) => {
      convertingIds.current.add(item.id);

      const fileUrl = item.file as string;
      urlToFile(resolveFileUrl(fileUrl), getFileNameFromUrl(fileUrl))
        .then((file) => {
          onChange?.(
            items.map((i) =>
              i.id === item.id
                ? { ...i, file, size: formatBytes(file.size) }
                : i,
            ),
          );
        })
        .catch(() => {
          // if conversion fails (CORS, network), leave it as a string —
          // submit-side handling would still need a fallback in that case
          convertingIds.current.delete(item.id);
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.id).join(",")]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: PreviewFile[] = acceptedFiles
        .slice(0, maxFiles - items.length)
        .map((file) => ({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: formatBytes(file.size),
        }));

      onChange?.([...items, ...newFiles]);
    },
    [items, onChange, maxFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const remove = (id: string) => {
    convertingIds.current.delete(id);
    onChange?.(items.filter((f) => f.id !== id));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}

      <div
        {...getRootProps()}
        className={`flex items-center justify-center gap-2 w-full h-24 rounded-xl border border-dashed transition cursor-pointer text-xs
        ${isDragActive ? "border-slate-900 bg-slate-100" : "border-slate-300 hover:bg-slate-50"}
        ${items.length >= maxFiles ? "opacity-50 pointer-events-none" : ""}
      `}
      >
        <input {...getInputProps()} />
        <Upload className="w-4 h-4 text-slate-500" />
        <span className="text-slate-600">
          {isDragActive ? "Drop..." : "Upload Files"}
        </span>
        <span className="text-slate-400">
          {items.length}/{maxFiles}
        </span>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 group relative"
            >
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <p className="text-[10px] font-medium text-slate-700 truncate w-full">
                {item.name}
              </p>
              <p className="text-[9px] text-slate-400">{item.size}</p>

              <button
                type="button"
                onClick={() => remove(item.id)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white/80 rounded p-0.5 transition"
              >
                <X className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
