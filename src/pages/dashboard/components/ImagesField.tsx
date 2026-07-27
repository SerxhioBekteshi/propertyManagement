import { useController, useFormContext } from "react-hook-form";
import { ImageUploader } from "../../../components/upload-image";

export const ImagesField = ({
  existingName,
  newName,
  label,
  maxFiles,
}: {
  existingName: string;
  newName: string;
  label: string;
  maxFiles?: number;
}) => {
  const { control } = useFormContext();
  const existing = useController({ control, name: existingName });
  const fresh = useController({ control, name: newName });

  return (
    <ImageUploader
      existingValue={existing.field.value ?? []}
      newValue={fresh.field.value ?? []}
      onExistingChange={existing.field.onChange}
      onNewChange={fresh.field.onChange}
      label={label}
      maxFiles={maxFiles}
    />
  );
};
