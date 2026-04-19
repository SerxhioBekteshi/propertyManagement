import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../../components/hook-form/error-message";
import Label from "../../../components/label";

interface PropertyOwnerFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  assignes: any;
}

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export const propertyOwnerchema = yup.object({
  firstName: yup
    .string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters"),
  lastName: yup
    .string()
    .required("Name is required")
    .trim()
    .min(2, "Name must be at least 2 characters"),
  phoneNumber: yup.string().required("Phone Number is required").trim(),
});

const PropertyOwnerForm = ({ assignes }: PropertyOwnerFormProps) => {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      {/* Name */}
      <Controller
        control={control}
        name="firstName"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="phoneNumber"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="ssn"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">
              Personal ID
            </label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="mainLeadSource"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div>
            <label className="block text-sm font-medium mb-1">
              Main Lead Source{" "}
            </label>
            <input
              value={value}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      <Controller
        control={control}
        name="nationality"
        render={({ field }) => (
          <>
            <Label>Nationality</Label>
            <select {...field} className={inputClass}>
              <option value="">— Select —</option>
              <option value="AL">Albania</option>
              <option value="GR">Greece</option>
            </select>
          </>
        )}
      />
      {/* <Controller
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
        )} */}
    </div>
  );
};

export default PropertyOwnerForm;
