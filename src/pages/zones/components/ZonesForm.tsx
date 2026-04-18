import { Controller, useFormContext } from "react-hook-form";

interface ZonesFormProps {
  cities: IOption<number>[];
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
import * as yup from "yup";
import { IOption } from "../../../assets/enums/constants/property";
import ErrorMessage from "../../../components/hook-form/error-message";

export const zonesSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters"),

  cityId: yup.number().required("City is required"),
});

const ZonesForm = ({ cities }: ZonesFormProps) => {
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

      {/* City */}
      <Controller
        control={control}
        name="cityId"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <select
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            >
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
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

export default ZonesForm;
