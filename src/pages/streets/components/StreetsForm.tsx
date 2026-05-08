import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../../components/hook-form/error-message";
import { IOption } from "../../../types";
import { SingleSelect } from "../../../components/single-select";
import Label from "../../../components/label";

interface StreetsFormProps {
  zones: IOption<number>[];
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export const streetsSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters"),
  zoneId: yup.number().required("Zone is required"),
});

const StreetsForm = ({ zones }: StreetsFormProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <Label>Name</Label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      {/* City */}
      <Controller
        control={control}
        name="zoneId"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <Label>Zone</Label>
            <SingleSelect
              options={zones}
              onChange={onChange}
              value={value}
              error={error}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />
    </div>
  );
};

export default StreetsForm;
