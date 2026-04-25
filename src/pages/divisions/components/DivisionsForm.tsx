import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../../components/hook-form/error-message";
import { SingleSelect } from "../../../components/single-select";
import { COUNTRY_OPTIONS } from "../../../assets/enums/constants/property";
import Label from "../../../components/label";

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
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <Label>Name</Label>
            <input
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
              value={value}
              onChange={onChange}
            />

            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      {/* Country */}
      <Controller
        control={control}
        name="country"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <Label>Country</Label>
            <SingleSelect
              options={COUNTRY_OPTIONS}
              onChange={onChange}
              value={value}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />
    </div>
  );
};

export default DivisionsForm;
