import { Controller, useFormContext } from "react-hook-form";
import Label from "../../../components/label";
import Section from "../../../components/section";
import {
  PROPERTY_AVAILABILITY_OPTIONS,
  PROPERTY_BEING_LIVED_OPTIONS,
  PROPERTY_BUSINESS_TYPE_OPTIONS,
  PROPERTY_DOCUMENTATION_OPTIONS,
  PROPERTY_ELEVATOR_OPTIONS,
  PROPERTY_EQUIPMENT_OPTIONS,
  PROPERTY_FURNISHED_OPTIONS,
  PROPERTY_INFRASTRUCTURE_OPTIONS,
  PROPERTY_MAIN_TYPE_OPTIONS,
  PROPERTY_ORIENTATION_OPTIONS,
  PROPERTY_OWNER_TYPOLOGY_OPTIONS,
  PROPERTY_PARKING_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  PROPERTY_SURROUNDINGS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  PROPERTY_VIEW_OPTIONS,
} from "../../../assets/enums/constants/property";
import { MultiSelect } from "../../../components/multi-select";
import { ImageUploader } from "../../../components/upload-file";

const inputClass =
  "w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder-slate-400 transition-all";

const checkboxClass =
  "h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer";

const PropertyForm = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      {/* ===================== BASIC (full width) ===================== */}
      <Section title="Basic Information">
        <div className="space-y-3">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div>
                <Label>Title *</Label>
                <input {...field} className={inputClass} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div>
                <Label>Description</Label>
                <textarea {...field} rows={3} className={inputClass} />
              </div>
            )}
          />
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <ImageUploader
                value={field.value ?? []}
                onChange={field.onChange}
                maxFiles={20}
              />
            )}
          />
          <Controller
            control={control}
            name="comments"
            render={({ field }) => (
              <div>
                <Label>Comments</Label>
                <textarea {...field} rows={2} className={inputClass} />
              </div>
            )}
          />
        </div>
      </Section>

      {/* ===================== TWO-COLUMN BODY ===================== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ──────────── LEFT COLUMN ──────────── */}
        <div className="space-y-6">
          <Section title="Classification" className="space-y-4">
            {/* Main Type */}
            <div>
              <Label>Main Type</Label>
              <Controller
                control={control}
                name="mainType"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_MAIN_TYPE_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Status */}
            <div>
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_STATUS_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Availability */}
            <div>
              <Label>Availability</Label>
              <Controller
                control={control}
                name="availability"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_AVAILABILITY_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Furnished */}
            <div>
              <Label>Furnished</Label>
              <Controller
                control={control}
                name="furnished"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_FURNISHED_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Publish to Portal */}
            <div>
              <Label>Publish to Portal</Label>
              <div className="flex items-center h-[40px]">
                <Controller
                  control={control}
                  name="publishToPortal"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value ?? false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className={checkboxClass}
                    />
                  )}
                />
              </div>
            </div>

            {/* Exclusive */}
            <div>
              <Label>Exclusive</Label>
              <div className="flex items-center h-[40px]">
                <Controller
                  control={control}
                  name="exclusive"
                  render={({ field }) => (
                    <input
                      type="checkbox"
                      checked={field.value ?? false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className={checkboxClass}
                    />
                  )}
                />
              </div>
            </div>
          </Section>
        </div>

        {/* ──────────── RIGHT COLUMN ──────────── */}
        <div className="space-y-6">
          <Section title="Property Information" className="space-y-4">
            {/* Property Type */}
            <div>
              <Label>Property Type</Label>
              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_TYPE_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Elevator */}
            <div>
              <Label>Elevator</Label>
              <Controller
                control={control}
                name="elevator"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_ELEVATOR_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Parking */}
            <div>
              <Label>Parking</Label>
              <Controller
                control={control}
                name="parking"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_PARKING_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Being Lived */}
            <div>
              <Label>Being Lived</Label>
              <Controller
                control={control}
                name="beingLived"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_BEING_LIVED_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            {/* Portals (Tag Input) */}
            <div>
              <Label>Portals</Label>
              <Controller
                control={control}
                name="portalsToPublish"
                render={({ field }) => {
                  const values: string[] = field.value ?? [];

                  const addValue = (val: string) => {
                    const trimmed = val.trim();
                    if (!trimmed) return;
                    if (values.includes(trimmed)) return;
                    field.onChange([...values, trimmed]);
                  };

                  const removeValue = (val: string) => {
                    field.onChange(values.filter((v) => v !== val));
                  };

                  return (
                    <div className="border rounded-md p-2 min-h-[40px]">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {values.map((v) => (
                          <span
                            key={v}
                            className="flex items-center gap-1 px-2 py-1 text-sm bg-slate-100 rounded-md"
                          >
                            {v}
                            <button
                              type="button"
                              onClick={() => removeValue(v)}
                              className="text-slate-500 hover:text-red-500"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <input
                        type="text"
                        placeholder="Type domain and press Enter..."
                        className="w-full outline-none text-sm"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addValue((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                    </div>
                  );
                }}
              />
            </div>

            {/* Orientation */}
            <div>
              <Label>Orientation</Label>
              <Controller
                control={control}
                name="propertyOrientation"
                render={({ field }) => (
                  <select {...field} className={inputClass}>
                    {PROPERTY_ORIENTATION_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          </Section>
        </div>
      </div>
      {/* ===================== LOCATION (full width) ===================== */}
      <Section title="Property Location">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <>
                  <Label>Country</Label>
                  <select {...field} className={inputClass}>
                    <option value="">— Select —</option>
                    <option value="Albania">Albania</option>
                    <option value="Greece">Greece</option>
                  </select>
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <>
                  <Label>City</Label>
                  {[].length > 0 ? (
                    <select {...field} className={inputClass}>
                      <option value="">— Select —</option>
                      {[].map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      {...field}
                      placeholder="Enter city"
                      className={inputClass}
                    />
                  )}
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <>
                  <Label>Address</Label>
                  <input {...field} className={inputClass} />
                </>
              )}
            />
          </div>

          {/* <div>
            <Controller
              control={control}
              name="division"
              render={({ field }) => (
                <>
                  <Label>Division</Label>
                  <select {...field} className={inputClass}>
                    {[].map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div> */}
          <div>
            <Controller
              control={control}
              name="zone"
              render={({ field }) => (
                <>
                  <Label>Zone</Label>
                  <input
                    {...field}
                    placeholder="e.g. Zone 3"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="floor"
              render={({ field }) => (
                <>
                  <Label>Floor</Label>
                  <input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="latitude"
              render={({ field }) => (
                <>
                  <Label>Latitude</Label>
                  <input
                    type="number"
                    step="any"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="e.g. 41.3275"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="longitude"
              render={({ field }) => (
                <>
                  <Label>Longitude</Label>
                  <input
                    type="number"
                    step="any"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="e.g. 19.8187"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>
          <div className="flex items-center">
            <Controller
              control={control}
              name="publishGeoreference"
              render={({ field }) => (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="publishGeoreference"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className={checkboxClass}
                  />
                  <Label
                    htmlFor="publishGeoreference"
                    className="mb-0 cursor-pointer"
                  >
                    Publish Georeference
                  </Label>
                </div>
              )}
            />
          </div>
        </div>
      </Section>
      {/* Property Price */}
      <Section title="Property Price" className="mt-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <Controller
              control={control}
              name="businessType"
              render={({ field }) => (
                <>
                  <Label>Business Type</Label>
                  <select {...field} className={inputClass}>
                    {PROPERTY_BUSINESS_TYPE_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <>
                  <Label>Price (€)</Label>
                  <input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="priceForM2"
              render={({ field }) => (
                <>
                  <Label>Price per m²</Label>
                  <input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>
          <div className="flex items-end pb-1">
            <Controller
              control={control}
              name="priceUponRequest"
              render={({ field }) => (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="priceUponRequest"
                    checked={field.value ?? false}
                    onChange={(e) => field.onChange(e.target.checked)}
                    className={checkboxClass}
                  />
                  <Label
                    htmlFor="priceUponRequest"
                    className="mb-0 cursor-pointer"
                  >
                    Price Upon Request
                  </Label>
                </div>
              )}
            />
          </div>
        </div>
      </Section>
      <Section title="Property Area">
        <div className="grid lg:grid-cols-2 gap-6">
          {(
            [
              { name: "interiorArea", label: "Interior Area" },
              { name: "grossArea", label: "Gross Area" },
              { name: "landArea", label: "Land Area" },
              { name: "balconyArea", label: "Balcony Area" },
              { name: "commonArea", label: "Common Area" },
            ] as const
          ).map(({ name, label }) => (
            <div key={name}>
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <>
                    <Label>{label}</Label>
                    <input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? Number(e.target.value) : undefined,
                        )
                      }
                      className={inputClass}
                    />
                  </>
                )}
              />
            </div>
          ))}
        </div>
      </Section>
      <Section title="Property Division">
        <div className="grid lg:grid-cols-2 gap-6">
          {" "}
          {(
            [
              { name: "bedrooms", label: "Bedrooms" },
              { name: "bathrooms", label: "Bathrooms" },
              { name: "livingRoom", label: "Living Room" },
              { name: "otherRooms", label: "Other Rooms" },
            ] as const
          ).map(({ name, label }) => (
            <div key={name}>
              <Controller
                control={control}
                name={name}
                render={({ field }) => (
                  <>
                    <Label>{label}</Label>
                    <input
                      type="number"
                      min={0}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className={inputClass}
                    />
                  </>
                )}
              />
            </div>
          ))}
        </div>
      </Section>
      {/* Owner */}
      <Section title="Property Owner">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <Controller
              control={control}
              name="owner"
              render={({ field }) => (
                <>
                  <Label>Owner</Label>
                  <input
                    {...field}
                    placeholder="Owner name or ID"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="ownersTypology"
              render={({ field }) => (
                <>
                  <Label>Owner's Typology</Label>
                  <select {...field} className={inputClass}>
                    <option value="">— Select —</option>
                    {PROPERTY_OWNER_TYPOLOGY_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>
        </div>
      </Section>
      {/* Owner */}
      <Section title="Property Other">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <Controller
              control={control}
              name="communalCharger"
              render={({ field }) => (
                <>
                  <Label>Communal Charger</Label>
                  <select {...field} className={inputClass}>
                    <option value="">— Select —</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="documentation"
              render={({ field }) => (
                <>
                  <Label>Documentation</Label>
                  <select {...field} className={inputClass}>
                    {PROPERTY_DOCUMENTATION_OPTIONS.map((v, i) => (
                      <option key={i} value={v.value}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="yearOfConstruction"
              render={({ field }) => (
                <>
                  <Label>Year of Construction</Label>
                  <input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    placeholder="e.g. 2005"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="yearOfRenovation"
              render={({ field }) => (
                <>
                  <Label>Year of Renovation</Label>
                  <input
                    type="number"
                    {...field}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    placeholder="e.g. 2020"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>
        </div>
      </Section>
      <Section title="More Features">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* View To */}
          <Controller
            control={control}
            name="withViewTo"
            render={({ field }) => (
              <div>
                <Label>View To</Label>
                <MultiSelect
                  options={PROPERTY_VIEW_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />

          {/* Equipment */}
          <Controller
            control={control}
            name="equipment"
            render={({ field }) => (
              <div>
                <Label>Equipment</Label>
                <MultiSelect
                  options={PROPERTY_EQUIPMENT_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />

          {/* Infrastructures */}
          <Controller
            control={control}
            name="infrastructures"
            render={({ field }) => (
              <div>
                <Label>Infrastructures</Label>
                <MultiSelect
                  options={PROPERTY_INFRASTRUCTURE_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />

          {/* Surroundings */}
          <Controller
            control={control}
            name="surroundings"
            render={({ field }) => (
              <div>
                <Label>Surroundings</Label>
                <MultiSelect
                  options={PROPERTY_SURROUNDINGS_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
      </Section>
    </div>
  );
};

export default PropertyForm;
