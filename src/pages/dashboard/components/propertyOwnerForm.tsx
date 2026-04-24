import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../../components/hook-form/error-message";
import Label from "../../../components/label";
import { IOption } from "../../../types";
import { PROPERTY_MAIN_LEAD_SOURCE_OPTIONS } from "../../../assets/enums/constants/property";
import { useAuth } from "../../../contexts/AuthContext";
import { ERoles } from "../../../assets/enums";

interface PropertyOwnerFormProps {
  assignes: IOption<number>[];
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
  // assignedToId: yup.number().required("Agent is required"),
});

const PropertyOwnerForm = ({ assignes }: PropertyOwnerFormProps) => {
  const { control } = useFormContext();

  const { user } = useAuth();

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
              value={value ?? ""}
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
              value={value ?? ""}
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
              value={value ?? ""}
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
              value={value ?? ""}
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
              value={value ?? ""}
              onChange={onChange}
              className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
            />
            <ErrorMessage message={error?.message} />
          </div>
        )}
      />

      <div>
        <Label>Main Type</Label>
        <Controller
          control={control}
          name="mainLeadSource"
          render={({ field }) => (
            <>
              <select {...field} className={inputClass}>
                {PROPERTY_MAIN_LEAD_SOURCE_OPTIONS.map((v, i) => (
                  <option key={i} value={v.value}>
                    {v.label}
                  </option>
                ))}
              </select>
              {/* <ErrorMessage message={error?.message} /> */}
            </>
          )}
        />
      </div>

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
      {user?.role != ERoles.Agent.toString() && (
        <Controller
          control={control}
          name="assignedToId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <label className="block text-sm font-medium mb-1">
                Select agent
              </label>
              <select
                value={value ?? ""}
                onChange={onChange}
                className={`${inputClass} ${error ? "border-red-500 focus:ring-red-500" : ""}`}
              >
                <option value="">Select agent</option>
                {assignes.map((d, index) => (
                  <option key={index} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              <ErrorMessage message={error?.message} />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default PropertyOwnerForm;
