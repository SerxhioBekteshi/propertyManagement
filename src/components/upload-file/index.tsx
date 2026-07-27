import { FileText, Upload, X } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  existingValue?: string[]; // URLs already saved server-side
  newValue?: File[]; // freshly picked files, not uploaded yet
  onExistingChange?: (urls: string[]) => void; // fired when an existing file is removed
  onNewChange?: (files: File[]) => void; // fired when new files are added/removed
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

export const FileUploader = ({
  existingValue = [],
  newValue = [],
  onExistingChange,
  onNewChange,
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
  const totalCount = existingValue.length + newValue.length;

  // no maxFiles enforcement here — caller decides limits and can choose
  // not to call onNewChange (or to trim) based on its own logic
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onNewChange?.([...newValue, ...acceptedFiles]);
    },
    [newValue, onNewChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  const removeExisting = (url: string) => {
    onExistingChange?.(existingValue.filter((u) => u !== url));
  };

  const removeNew = (file: File) => {
    onNewChange?.(newValue.filter((f) => f !== file));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}

      <div
        {...getRootProps()}
        className={`flex items-center justify-center gap-2 w-full h-24 rounded-xl border border-dashed transition cursor-pointer text-xs
        ${isDragActive ? "border-slate-900 bg-slate-100" : "border-slate-300 hover:bg-slate-50"}
      `}
      >
        <input {...getInputProps()} />
        <Upload className="w-4 h-4 text-slate-500" />
        <span className="text-slate-600">
          {isDragActive ? "Drop..." : "Upload Files"}
        </span>
        <span className="text-slate-400">{totalCount}</span>
      </div>

      {totalCount > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {existingValue.map((url) => (
            <div
              key={url}
              className="flex flex-col gap-1 px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 group relative"
            >
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <p className="text-[10px] font-medium text-slate-700 truncate w-full">
                {getFileNameFromUrl(url)}
              </p>
              <a
                href={resolveFileUrl(url)}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] text-slate-400 hover:underline"
              >
                View
              </a>

              <button
                type="button"
                onClick={() => removeExisting(url)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-white/80 rounded p-0.5 transition"
              >
                <X className="w-3 h-3 text-slate-500" />
              </button>
            </div>
          ))}

          {newValue.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex flex-col gap-1 px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 group relative"
            >
              <FileText className="w-4 h-4 text-slate-400 shrink-0" />
              <p className="text-[10px] font-medium text-slate-700 truncate w-full">
                {file.name}
              </p>
              <p className="text-[9px] text-emerald-600">
                New · {formatBytes(file.size)}
              </p>

              <button
                type="button"
                onClick={() => removeNew(file)}
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
