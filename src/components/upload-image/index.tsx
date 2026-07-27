import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface SingleImageUploaderProps {
  value?: File | string | null;
  onChange?: (file: File | string | null) => void;
  label?: string;
  className?: string;
  error?: boolean;
}

interface ImageUploaderProps {
  existingValue?: string[]; // URLs already saved server-side
  newValue?: File[]; // freshly picked files, not uploaded yet
  onExistingChange?: (urls: string[]) => void; // fired when an existing image is removed
  onNewChange?: (files: File[]) => void; // fired when new files are added/removed
  maxFiles?: number;
  label?: string;
  className?: string;
}

const resolveImageUrl = (url: string) =>
  import.meta.env.VITE_APP_BACKEND_API_URL?.includes("localhost")
    ? "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
    : url.startsWith("http")
      ? url
      : `${import.meta.env.VITE_APP_BACKEND_API_URL}/${url}`;

export const ImageUploader = ({
  existingValue = [],
  newValue = [],
  onExistingChange,
  onNewChange,
  maxFiles = 20,
  label,
  className = "",
}: ImageUploaderProps) => {
  // object URLs for File previews — created lazily, revoked on removal/unmount
  const objectUrlsRef = useRef<Map<File, string>>(new Map());

  const getObjectUrl = (file: File) => {
    let url = objectUrlsRef.current.get(file);
    if (!url) {
      url = URL.createObjectURL(file);
      objectUrlsRef.current.set(file, url);
    }
    return url;
  };

  // revoke any remaining object URLs on unmount
  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const totalCount = existingValue.length + newValue.length;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const room = maxFiles - totalCount;
      if (room <= 0) return;
      onNewChange?.([...newValue, ...acceptedFiles.slice(0, room)]);
    },
    [newValue, onNewChange, maxFiles, totalCount],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const removeExisting = (url: string) => {
    onExistingChange?.(existingValue.filter((u) => u !== url));
  };

  const removeNew = (file: File) => {
    const url = objectUrlsRef.current.get(file);
    if (url) {
      URL.revokeObjectURL(url);
      objectUrlsRef.current.delete(file);
    }
    onNewChange?.(newValue.filter((f) => f !== file));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}

      <div
        {...getRootProps()}
        className={`flex items-center justify-center gap-2 w-full h-24 rounded-xl border border-dashed transition cursor-pointer text-xs
        ${isDragActive ? "border-slate-900 bg-slate-100" : "border-slate-300 hover:bg-slate-50"}
        ${totalCount >= maxFiles ? "opacity-50 pointer-events-none" : ""}
      `}
      >
        <input {...getInputProps()} />
        <Upload className="w-4 h-4 text-slate-500" />
        <span className="text-slate-600">
          {isDragActive ? "Drop..." : "Upload"}
        </span>
        <span className="text-slate-400">
          {totalCount}/{maxFiles}
        </span>
      </div>

      {totalCount > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {existingValue.map((url) => (
            <div
              key={url}
              className="relative group rounded-lg overflow-hidden aspect-square"
            >
              <img
                src={resolveImageUrl(url)}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeExisting(url)}
                className="absolute top-1 right-1 bg-white/80 rounded p-0.5 opacity-0 group-hover:opacity-100"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {newValue.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group rounded-lg overflow-hidden aspect-square"
            >
              <img
                src={getObjectUrl(file)}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 left-1 text-[9px] bg-emerald-600 text-white px-1 rounded">
                New
              </span>
              <button
                type="button"
                onClick={() => removeNew(file)}
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
}: SingleImageUploaderProps) => {
  // only create a fresh object URL when `value` is a newly-picked File;
  // for an existing string URL, resolve it directly — no conversion, no fetch
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
