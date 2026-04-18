import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import { IOption } from "../../../assets/enums/constants/property";

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
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input {...field} className={inputClass} />
          </div>
        )}
      />

      {/* Division */}
      <Controller
        control={control}
        name="divisionId"
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Division</label>
            <select {...field} className={inputClass}>
              <option value="">Select division</option>
              {divisions.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default CitiesForm;
