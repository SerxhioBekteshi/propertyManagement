import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface PreviewFile {
  id: string;
  file: File;
  url: string;
}

interface ImageUploaderProps {
  value?: PreviewFile[];
  onChange?: (files: PreviewFile[]) => void;
  maxFiles?: number;
  label?: string;
  className?: string;
}

interface SingleImageUploaderProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  label?: string;
  className?: string;
  error?: boolean; // 👈 add this
}

export const ImageUploader = ({
  value = [],
  onChange,
  maxFiles = 20,
  label,
  className = "",
}: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles: PreviewFile[] = acceptedFiles
        .slice(0, maxFiles - value.length)
        .map((file) => ({
          id: `${file.name}-${Date.now()}-${Math.random()}`,
          file,
          url: URL.createObjectURL(file),
        }));

      onChange?.([...value, ...newFiles]);
    },
    [value, onChange, maxFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const remove = (id: string) => {
    const item = value.find((f) => f.id === id);
    if (item) URL.revokeObjectURL(item.url);
    onChange?.(value.filter((f) => f.id !== id));
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`flex items-center justify-center gap-2 w-full h-24 rounded-xl border border-dashed transition cursor-pointer text-xs
        ${
          isDragActive
            ? "border-slate-900 bg-slate-100"
            : "border-slate-300 hover:bg-slate-50"
        }
        ${value.length >= maxFiles ? "opacity-50 pointer-events-none" : ""}
      `}
      >
        <input {...getInputProps()} />
        <Upload className="w-4 h-4 text-slate-500" />
        <span className="text-slate-600">
          {isDragActive ? "Drop..." : "Upload"}
        </span>
        <span className="text-slate-400">
          {value.length}/{maxFiles}
        </span>
      </div>

      {/* Preview */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 gap-1.5">
          {value.map((item, index) => (
            <div
              key={item.id}
              className="relative group rounded-lg overflow-hidden aspect-square"
            >
              <img src={item.url} className="w-full h-full object-cover" />

              {/* Cover */}
              {index === 0 && (
                <span className="absolute bottom-1 left-1 text-[9px] bg-black text-white px-1 rounded">
                  Cover
                </span>
              )}

              {/* Remove */}
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
  error, // 👈 add this
}: SingleImageUploaderProps) => {
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

  const preview = !value
    ? null
    : value instanceof File
      ? URL.createObjectURL(value)
      : value;

  useEffect(() => {
    return () => {
      if (value instanceof File && preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [value, preview]);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <p className="text-sm font-medium text-slate-700">{label}</p>}

      {!value ? (
        <div
          {...getRootProps()}
          className={`flex items-center justify-center gap-2 w-full h-24 rounded-xl border border-dashed transition cursor-pointer text-xs
          ${isDragActive ? "border-slate-900 bg-slate-100" : ""}
          ${error ? "border-red-500 bg-red-50 hover:bg-red-50" : "border-slate-300 hover:bg-slate-50"}`} // 👈 error styles
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
          <img src={preview!} className="w-full h-full object-cover" />
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
