import { Controller, useFormContext } from "react-hook-form";
import Label from "../../../components/label";
import Section from "../../../components/section";
import {
  PROPERTY_AVAILABILITY_OPTIONS,
  PROPERTY_BUSINESS_TYPE_OPTIONS,
  PROPERTY_DOCUMENTATION_OPTIONS,
  PROPERTY_ELEVATOR_OPTIONS,
  PROPERTY_FURNISHED_OPTIONS,
  PROPERTY_MAIN_TYPE_OPTIONS,
  PROPERTY_PARKING_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
} from "../../../assets/enums/constants/property";

const inputClass =
  "w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder-slate-400 transition-all";

const PropertyForm = () => {
  const { control } = useFormContext();

  return (
    <>
      {/* ================= BASIC ================= */}
      <Section title="Basic Information">
        <div className="grid sm:grid-cols-2 gap-4">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div className="sm:col-span-2">
                <Label>Title *</Label>
                <input {...field} className={inputClass} />
              </div>
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div className="sm:col-span-2">
                <Label>Description</Label>
                <textarea {...field} rows={3} className={inputClass} />
              </div>
            )}
          />
        </div>
      </Section>

      {/* ================= CLASSIFICATION ================= */}
      <Section title="Classification">
        <div className="grid sm:grid-cols-3 gap-4">
          <Controller
            control={control}
            name="mainType"
            render={({ field }) => (
              <div>
                <Label>Main Type</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_MAIN_TYPE_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="propertyType"
            render={({ field }) => (
              <div>
                <Label>Property Type</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_TYPE_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <div>
                <Label>Status</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_STATUS_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="availability"
            render={({ field }) => (
              <div>
                <Label>Availability</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_AVAILABILITY_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="furnished"
            render={({ field }) => (
              <div>
                <Label>Furnished</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_FURNISHED_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
        </div>
      </Section>

      {/* ================= FEATURES ================= */}
      <Section title="Features">
        <div className="grid sm:grid-cols-3 gap-4">
          <Controller
            control={control}
            name="elevator"
            render={({ field }) => (
              <div>
                <Label>Elevator</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_ELEVATOR_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="parking"
            render={({ field }) => (
              <div>
                <Label>Parking</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_PARKING_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="documentation"
            render={({ field }) => (
              <div>
                <Label>Documentation</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_DOCUMENTATION_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />
        </div>
      </Section>

      {/* ================= BUSINESS ================= */}
      <Section title="Business">
        <div className="grid sm:grid-cols-3 gap-4">
          <Controller
            control={control}
            name="businessType"
            render={({ field }) => (
              <div>
                <Label>Business Type</Label>
                <select {...field} className={inputClass}>
                  {PROPERTY_BUSINESS_TYPE_OPTIONS.map((v, index) => (
                    <option key={index} value={v.value}>
                      {v.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <div>
                <Label>Price</Label>
                <input type="number" {...field} className={inputClass} />
              </div>
            )}
          />
        </div>
      </Section>

      {/* ================= LOCATION ================= */}
      <Section title="Location">
        <div className="grid sm:grid-cols-2 gap-4">
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <div>
                <Label>Country</Label>
                <input {...field} className={inputClass} />
              </div>
            )}
          />

          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <div>
                <Label>City</Label>
                <input {...field} className={inputClass} />
              </div>
            )}
          />

          <Controller
            control={control}
            name="address"
            render={({ field }) => (
              <div className="sm:col-span-2">
                <Label>Address</Label>
                <input {...field} className={inputClass} />
              </div>
            )}
          />
        </div>
      </Section>
    </>
  );
};

export default PropertyForm;
