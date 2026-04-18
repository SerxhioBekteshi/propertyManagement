// components/ImageUploader.tsx
import { useCallback, useRef, useState } from "react";
import { Upload, X, GripVertical } from "lucide-react";

interface PreviewFile {
  id: string;
  file: File;
  url: string;
}

interface ImageUploaderProps {
  value?: PreviewFile[];
  onChange?: (files: PreviewFile[]) => void;
  maxFiles?: number;
}

export const ImageUploader = ({
  value = [],
  onChange,
  maxFiles = 20,
}: ImageUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragItem = useRef<string | null>(null);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const newFiles: PreviewFile[] = Array.from(incoming)
        .filter((f) => f.type.startsWith("image/"))
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

  const remove = (id: string) => {
    const item = value.find((f) => f.id === id);
    if (item) URL.revokeObjectURL(item.url);
    onChange?.(value.filter((f) => f.id !== id));
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
  };

  // drag-to-reorder
  const onDragStart = (id: string) => {
    dragItem.current = id;
  };

  const onDragOverItem = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverId(id);
  };

  const onDropItem = (targetId: string) => {
    if (!dragItem.current || dragItem.current === targetId) return;
    const from = value.findIndex((f) => f.id === dragItem.current);
    const to = value.findIndex((f) => f.id === targetId);
    const reordered = [...value];
    const [moved] = reordered.splice(from, 1);
    reordered.splice(to, 0, moved);
    onChange?.(reordered);
    dragItem.current = null;
    setDragOverId(null);
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <label
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center gap-2 w-full h-36 rounded-xl border-2 border-dashed cursor-pointer transition-all
          ${
            isDragging
              ? "border-slate-900 bg-slate-50"
              : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
          }
          ${value.length >= maxFiles ? "pointer-events-none opacity-40" : ""}
        `}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
          <Upload className="w-5 h-5 text-slate-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium text-slate-700">
            Drop images here or{" "}
            <span className="text-slate-900 underline underline-offset-2">
              browse
            </span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            PNG, JPG, WEBP · up to {maxFiles} images
          </p>
        </div>
      </label>

      {/* Preview grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
          {value.map((item, index) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => onDragStart(item.id)}
              onDragOver={(e) => onDragOverItem(e, item.id)}
              onDrop={() => onDropItem(item.id)}
              onDragEnd={() => setDragOverId(null)}
              className={`relative group rounded-xl overflow-hidden aspect-square border-2 transition-all cursor-grab active:cursor-grabbing
                ${dragOverId === item.id ? "border-slate-900 scale-105" : "border-transparent"}
              `}
            >
              <img
                src={item.url}
                alt={`upload-${index}`}
                className="w-full h-full object-cover"
              />

              {/* Cover badge on first image */}
              {index === 0 && (
                <span className="absolute bottom-1 left-1 text-[10px] font-semibold bg-slate-900 text-white px-1.5 py-0.5 rounded-md">
                  Cover
                </span>
              )}

              {/* Drag handle */}
              <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/80 rounded-md p-0.5">
                  <GripVertical className="w-3 h-3 text-slate-600" />
                </div>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-red-50 rounded-md p-0.5"
              >
                <X className="w-3 h-3 text-slate-600 hover:text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {value.length > 0 && (
        <p className="text-xs text-slate-400">
          {value.length}/{maxFiles} images · drag to reorder · first image is
          the cover
        </p>
      )}
    </div>
  );
};
