import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../../components/hook-form/error-message";
import { IOption } from "../../../types";

interface CitiesFormProps {
  divisions: IOption<number>[];
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export const citiesSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters"),
  divisionId: yup.number().required("Division is required"),
});

const CitiesForm = ({ divisions }: CitiesFormProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      {/* Name */}
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      {/* Division */}
      <Controller
        control={control}
        name="divisionId"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Division</label>
            <select
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            >
              <option value="">Select division</option>
              {divisions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />
    </div>
  );
};

export default CitiesForm;
