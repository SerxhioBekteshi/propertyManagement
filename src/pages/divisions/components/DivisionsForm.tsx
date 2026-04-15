import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export const divionsSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters"),

  country: yup.string().required("Country is required"),
});

const DivisionsForm = () => {
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

      {/* Country */}
      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select {...field} className={inputClass}>
              <option value="">Select country</option>
              <option value="AL">Albania (AL)</option>
              <option value="GR">Greece (GR)</option>
            </select>
          </div>
        )}
      />
    </div>
  );
};

export default DivisionsForm;
