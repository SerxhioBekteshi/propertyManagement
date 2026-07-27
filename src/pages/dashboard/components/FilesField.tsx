import { useController, useFormContext } from "react-hook-form";
import { FileUploader } from "../../../components/upload-file";

export const FilesField = ({
  existingName,
  newName,
  label,
}: {
  existingName: string;
  newName: string;
  label: string;
}) => {
  const { control } = useFormContext();
  const existing = useController({ control, name: existingName });
  const fresh = useController({ control, name: newName });

  return (
    <FileUploader
      existingValue={existing.field.value ?? []}
      newValue={fresh.field.value ?? []}
      onExistingChange={existing.field.onChange}
      onNewChange={fresh.field.onChange}
      label={label}
    />
  );
};
