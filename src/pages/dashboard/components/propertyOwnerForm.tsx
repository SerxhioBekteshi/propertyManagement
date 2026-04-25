import { Controller, useFormContext } from "react-hook-form";
import * as yup from "yup";
import ErrorMessage from "../../../components/hook-form/error-message";
import Label from "../../../components/label";
import { IOption } from "../../../types";
import {
  COUNTRY_OPTIONS,
  PROPERTY_MAIN_LEAD_SOURCE_OPTIONS,
} from "../../../assets/enums/constants/property";
import { useAuth } from "../../../contexts/AuthContext";
import { ERoles } from "../../../assets/enums";
import { SingleSelect } from "../../../components/single-select";

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
            <Label>First Name</Label>
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
            <Label>Last Name</Label>
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
            <Label>Email</Label>
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
            <Label>Phone Number</Label>
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
            <Label>Personal ID</Label>
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
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <>
              <SingleSelect
                options={PROPERTY_MAIN_LEAD_SOURCE_OPTIONS}
                onChange={onChange}
                value={value}
                error={error}
              />
              {/* <ErrorMessage message={error?.message} /> */}
            </>
          )}
        />
      </div>

      <Controller
        control={control}
        name="nationality"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <>
            <Label>Nationality</Label>
            <SingleSelect
              options={COUNTRY_OPTIONS}
              onChange={onChange}
              value={value}
              error={error}
            />
          </>
        )}
      />
      {user?.role != ERoles.Agent.toString() && (
        <Controller
          control={control}
          name="assignedToId"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <div>
              <Label>Agent</Label>
              <SingleSelect
                options={assignes}
                onChange={onChange}
                value={value}
                error={error}
              />
              <ErrorMessage message={error?.message} />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default PropertyOwnerForm;
