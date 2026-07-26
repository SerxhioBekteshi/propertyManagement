import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface PreviewFile {
  id: string;
  file: File | string;
  url: string;
}

interface ImageUploaderProps {
  value?: PreviewFile[];
  onChange?: (files: PreviewFile[]) => void;
  maxFiles?: number;
  label?: string;
  className?: string;
  onConvertingChange?: (isConverting: boolean) => void;
}

interface SingleImageUploaderProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  label?: string;
  className?: string;
  error?: boolean;
  onConvertingChange?: (isConverting: boolean) => void;
}

const resolveImageUrl = (url: string) =>
  import.meta.env.VITE_APP_BACKEND_API_URL?.includes("localhost")
    ? "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    : url.startsWith("http")
      ? url
      : `${import.meta.env.VITE_APP_BACKEND_API_URL}/${url}`;

const urlToFile = async (url: string, filename: string): Promise<File> => {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || "image/jpeg" });
};

const getFileNameFromUrl = (url: string) => {
  const parts = url.split("/");
  return parts[parts.length - 1] || "image.jpg";
};

export const ImageUploader = ({
  value = [],
  onChange,
  maxFiles = 20,
  label,
  className = "",
  onConvertingChange,
}: ImageUploaderProps) => {
  // normalize: turn any raw string entries into PreviewFile objects for display
  const items: PreviewFile[] = value.map((item) =>
    typeof item === "string"
      ? { id: item, file: item, url: resolveImageUrl(item) }
      : item,
  );

  // always holds the LATEST items array, so async .then() callbacks never
  // operate on a stale snapshot captured when the effect first ran
  const itemsRef = useRef<PreviewFile[]>(items);
  useEffect(() => {
    itemsRef.current = items;
  });

  // track which string items we've already kicked off a conversion for,
  // so we don't re-fetch on every render/effect run
  const convertingIds = useRef<Set<string>>(new Set());

  // notify parent whenever the in-flight conversion count changes, so the
  // form can disable submit until every string-backed image is a real File
  const notifyConverting = useCallback(() => {
    onConvertingChange?.(convertingIds.current.size > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      notifyConverting();

      const fileUrl = item.file as string;
      urlToFile(resolveImageUrl(fileUrl), getFileNameFromUrl(fileUrl))
        .then((file) => {
          // read the CURRENT items at resolve-time, never the stale closure
          // captured when this effect run started
          onChange?.(
            itemsRef.current.map((i) =>
              i.id === item.id ? { ...i, file } : i,
            ),
          );
        })
        .catch(() => {
          // if conversion fails (CORS, network), leave it as a string —
          // submit-side handling would still need a fallback in that case
        })
        .finally(() => {
          convertingIds.current.delete(item.id);
          notifyConverting();
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.id).join(",")]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: PreviewFile[] = acceptedFiles
        .slice(0, maxFiles - itemsRef.current.length)
        .map((file) => ({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          url: URL.createObjectURL(file),
        }));

      onChange?.([...itemsRef.current, ...newFiles]);
    },
    [onChange, maxFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const remove = (id: string) => {
    const item = itemsRef.current.find((f) => f.id === id);
    if (item && item.file instanceof File) {
      URL.revokeObjectURL(item.url);
    }
    convertingIds.current.delete(id);
    notifyConverting();
    onChange?.(itemsRef.current.filter((f) => f.id !== id));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}

      <div
        {...getRootProps()}
        className={`flex items-center justify-center gap-2 w-full h-24 rounded-xl border border-dashed transition cursor-pointer text-xs
        ${
          isDragActive
            ? "border-slate-900 bg-slate-100"
            : "border-slate-300 hover:bg-slate-50"
        }
        ${items.length >= maxFiles ? "opacity-50 pointer-events-none" : ""}
      `}
      >
        <input {...getInputProps()} />
        <Upload className="w-4 h-4 text-slate-500" />
        <span className="text-slate-600">
          {isDragActive ? "Drop..." : "Upload"}
        </span>
        <span className="text-slate-400">
          {items.length}/{maxFiles}
        </span>
      </div>

      {items.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative group rounded-lg overflow-hidden aspect-square"
            >
              <img src={item.url} className="w-full h-full object-cover" />

              {index === 0 && (
                <span className="absolute bottom-1 left-1 text-[9px] bg-black text-white px-1 rounded">
                  Cover
                </span>
              )}

              <button
                type="button"
                onClick={() => remove(item.id)}
                className="absolute top-1 right-1 bg-white/80 rounded p-0.5 opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SingleImageUploader = ({
  value,
  onChange,
  label,
  className = "",
  error,
  onConvertingChange,
}: SingleImageUploaderProps) => {
  const converting = useRef(false);
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  });

  // silently convert an existing string value into a real File,
  // so the form always holds a File by the time it's submitted
  useEffect(() => {
    if (typeof value === "string" && value && !converting.current) {
      converting.current = true;
      onConvertingChange?.(true);

      urlToFile(resolveImageUrl(value), getFileNameFromUrl(value))
        .then((file) => {
          // only apply if the value hasn't changed to something else
          // (e.g. user picked a new file) while this was in flight
          if (valueRef.current === value) {
            onChange?.(file);
          }
        })
        .catch(() => {
          // leave as string on failure
        })
        .finally(() => {
          converting.current = false;
          onConvertingChange?.(false);
        });
    }
    if (value instanceof File || value === null) {
      converting.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange?.(acceptedFiles[0] ?? null);
    },
    [onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  // only create a fresh object URL when `value` (the File) actually changes
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    if (value instanceof File) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(resolveImageUrl(value));
  }, [value]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}

      {!value ? (
        <div
          {...getRootProps()}
          className={`flex items-center justify-center gap-2 w-full h-24 rounded-xl border border-dashed transition cursor-pointer text-xs
          ${isDragActive ? "border-slate-900 bg-slate-100" : ""}
          ${error ? "border-red-500 bg-red-50 hover:bg-red-50" : "border-slate-300 hover:bg-slate-50"}`}
        >
          <input {...getInputProps()} />
          <Upload
            className={`w-4 h-4 ${error ? "text-red-400" : "text-slate-500"}`}
          />
          <span className={`${error ? "text-red-400" : "text-slate-600"}`}>
            {isDragActive ? "Drop..." : "Upload"}
          </span>
        </div>
      ) : (
        <div className="relative group rounded-lg overflow-hidden aspect-square w-32">
          {preview && (
            <img src={preview} className="w-full h-full object-cover" />
          )}
          <span className="absolute bottom-1 left-1 text-[9px] bg-black text-white px-1 rounded">
            Cover
          </span>
          <button
            type="button"
            onClick={() => onChange?.(null)}
            className="absolute top-1 right-1 bg-white/80 rounded p-0.5 opacity-0 group-hover:opacity-100"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
};
