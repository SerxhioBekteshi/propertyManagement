import { Controller, useFormContext, useWatch } from "react-hook-form";
import Label from "../../../components/label";
import Section from "../../../components/section";
import {
  COUNTRY_OPTIONS,
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
import {
  ImageUploader,
  SingleImageUploader,
} from "../../../components/upload-image";
import { useEffect, useState } from "react";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import BooleanSelect from "../../../components/boolean-select";
import { IOption } from "../../../types";
import { SingleSelect } from "../../../components/single-select";
import { Plus } from "lucide-react";
import PropertyOwnerDrawer from "./PropertyOwnerDrawer";
import { useAuth } from "../../../contexts/AuthContext";
import { FileUploader } from "../../../components/upload-file";
import MapPicker from "../../../components/MapPicker";
import "leaflet/dist/leaflet.css";
import * as yup from "yup";
import ErrorMessage from "../../../components/hook-form/error-message";

const inputClass =
  "w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder-slate-400 transition-all";

const checkboxClass =
  "h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer";

const getInputClass = (hasError?: boolean) =>
  `w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent placeholder-slate-400 transition-all
  ${
    hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-slate-200 focus:ring-slate-900"
  }`;

export const PropertyValidationSchema = yup.object({
  // title: yup
  //   .string()
  //   .required("Title is required")
  //   .min(3, "Title must be at least 3 characters")
  //   .max(50, "Title must not exceed 50 characters")
  //   .trim(),

  streetId: yup.number().required("Street is required"),

  mainImage: yup
    .mixed<File>()
    .required("Main image is required")
    .test("filePresent", "Main image is required", (value) => {
      return value instanceof File;
    }),
});

export type PropertyFormValues = yup.InferType<typeof PropertyValidationSchema>;

const PropertyForm = () => {
  const { control, setValue } = useFormContext();

  const { user } = useAuth();
  const selectedCountry = useWatch({ control, name: "country" });
  const selectedDivisionId = useWatch({ control, name: "divisionId" });
  const selectedCityId = useWatch({ control, name: "cityId" });
  const selectedZoneId = useWatch({ control, name: "zoneId" });

  const [divisions, setDivisions] = useState<IOption<number>[]>([]);
  const [cities, setCities] = useState<IOption<number>[]>([]);
  const [zones, setZones] = useState<IOption<number>[]>([]);
  const [streets, setStreets] = useState<IOption<number>[]>([]);

  const [propertyOwners, setPropertyOwners] = useState<IOption<number>[]>([]);
  const [ownerDrawerOpen, setOwnerDrawerOpen] = useState(false);
  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingZones, setLoadingZones] = useState(false);
  const [loadingStreets, setLoadingStreets] = useState(false);

  // Fetch divisions when country changes
  useEffect(() => {
    if (!selectedCountry) {
      setDivisions([]);
      setCities([]);
      setZones([]);
      return;
    }

    const fetch = async () => {
      setLoadingDivisions(true);
      setValue("divisionId", undefined);
      setValue("cityId", undefined);
      setValue("zone", undefined);
      setCities([]);
      setZones([]);
      try {
        const res =
          await LocationConfigurationService.getDivisions(selectedCountry);
        setDivisions(res.data ?? []);
      } finally {
        setLoadingDivisions(false);
      }
    };

    fetch();
  }, [selectedCountry]);

  // Fetch cities when division changes
  useEffect(() => {
    if (!selectedDivisionId) {
      setCities([]);
      setZones([]);
      return;
    }

    const fetch = async () => {
      setLoadingCities(true);
      setValue("cityId", undefined);
      setValue("zone", undefined);
      setZones([]);
      try {
        const res =
          await LocationConfigurationService.getCities(selectedDivisionId);
        setCities(res.data ?? []);
      } finally {
        setLoadingCities(false);
      }
    };

    fetch();
  }, [selectedDivisionId]);

  // Fetch zones when city changes
  useEffect(() => {
    if (!selectedCityId) {
      setZones([]);
      return;
    }

    const fetch = async () => {
      setLoadingZones(true);
      setValue("zoneId", undefined);
      try {
        const res = await LocationConfigurationService.getZones(selectedCityId);
        setZones(res.data ?? []);
      } finally {
        setLoadingZones(false);
      }
    };

    fetch();
  }, [selectedCityId]);

  useEffect(() => {
    if (!selectedZoneId) {
      setStreets([]);
      return;
    }

    const fetch = async () => {
      setLoadingStreets(true);
      setValue("streetId", undefined);
      try {
        const res =
          await LocationConfigurationService.getStreets(selectedZoneId);
        setStreets(res.data ?? []);
      } finally {
        setLoadingStreets(false);
      }
    };

    fetch();
  }, [selectedZoneId]);

  const fetchPropertyOwners = async () => {
    setLoadingZones(true);
    // setValue("", undefined);
    try {
      const res = await LocationConfigurationService.getPropertyOwners();
      setPropertyOwners(res.data ?? []);
    } finally {
      setLoadingZones(false);
    }
  };

  useEffect(() => {
    fetchPropertyOwners();
  }, []);

  const lat = useWatch({ control, name: "latitude" });
  const lng = useWatch({ control, name: "longitude" });

  return (
    <div className="space-y-8">
      {/* ===================== BASIC (full width) ===================== */}
      <Section title="Basic Information">
        <div className="space-y-3">
          <Controller
            control={control}
            name="title"
            render={({ field, fieldState: { error } }) => (
              <div>
                <Label>Title *</Label>
                <input
                  {...field}
                  value={field.value ?? ""}
                  className={getInputClass(!!error)}
                />
                {/* <ErrorMessage message={error?.message} /> */}
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
          <div
            className={`grid ${user?.role === "Agent" ? "grid-cols-3" : "grid-cols-2"} gap-4`}
          >
            <Controller
              control={control}
              name="mainImage"
              render={({ field, fieldState: { error } }) => (
                <div className="flex flex-col">
                  <SingleImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    label="Main Image *"
                    error={!!error}
                  />
                  <ErrorMessage message={error?.message} />
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
                  label="Public Images"
                />
              )}
            />

            {user?.role == "Agent" && (
              <Controller
                control={control}
                name="privateImages"
                render={({ field }) => (
                  <ImageUploader
                    value={field.value ?? []}
                    onChange={field.onChange}
                    label="Private Images"
                    maxFiles={5}
                  />
                )}
              />
            )}
          </div>

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

      <div className="grid cols-1">
        <Controller
          control={control}
          name="files"
          render={({ field }) => (
            <FileUploader
              value={field.value ?? []}
              onChange={field.onChange}
              label="Files"
            />
          )}
        />
      </div>

      {/* ===================== TWO-COLUMN BODY ===================== */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ──────────── LEFT COLUMN ──────────── */}
        <div className="space-y-6">
          <Section title="Classification" className="space-y-4">
            <div>
              <Label>Main Type</Label>
              <Controller
                control={control}
                name="mainType"
                render={({ field }) => (
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_MAIN_TYPE_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label>Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_STATUS_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label>Availability</Label>
              <Controller
                control={control}
                name="availability"
                render={({ field }) => (
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_AVAILABILITY_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label>Furnished</Label>
              <Controller
                control={control}
                name="furnished"
                render={({ field }) => (
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_FURNISHED_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
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
            <div>
              <Label>Property Type</Label>
              <Controller
                control={control}
                name="propertyType"
                render={({ field }) => (
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_TYPE_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div>
              <Label>Elevator</Label>
              <Controller
                control={control}
                name="elevator"
                render={({ field }) => (
                  <BooleanSelect
                    field={field}
                    options={PROPERTY_ELEVATOR_OPTIONS}
                  />
                )}
              />
            </div>

            <div>
              <Label>Parking</Label>
              <Controller
                control={control}
                name="parking"
                render={({ field }) => (
                  <BooleanSelect
                    field={field}
                    options={PROPERTY_PARKING_OPTIONS}
                  />
                )}
              />
            </div>

            <div>
              <Label>Being Lived</Label>
              <Controller
                control={control}
                name="beingLived"
                render={({ field }) => (
                  <BooleanSelect
                    field={field}
                    options={PROPERTY_BEING_LIVED_OPTIONS}
                  />
                )}
              />
            </div>
            <div>
              <Label>Portals</Label>
              <Controller
                control={control}
                name="portalsToPublish"
                render={({ field }) => {
                  const values: string[] = field.value ?? [];
                  const addValue = (val: string) => {
                    const trimmed = val.trim();
                    if (!trimmed || values.includes(trimmed)) return;
                    field.onChange([...values, trimmed]);
                  };
                  const removeValue = (val: string) => {
                    field.onChange(values.filter((v) => v !== val));
                  };
                  return (
                    <div className="border rounded-md p-2 min-h-[40px]">
                      <div className="flex flex-wrap gap-2 ">
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
            <div>
              <Label>Orientation</Label>
              <Controller
                control={control}
                name="propertyOrientation"
                render={({ field }) => (
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_ORIENTATION_OPTIONS}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </Section>
        </div>
      </div>

      {/* ===================== LOCATION (full width) ===================== */}
      <Section title="Property Location">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Country */}
          <div>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <>
                  <Label>Country</Label>
                  <SingleSelect
                    options={COUNTRY_OPTIONS}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </>
              )}
            />
          </div>

          {/* Division */}
          <div>
            <Controller
              control={control}
              name="divisionId"
              render={({ field }) => (
                <>
                  <Label>Division</Label>
                  <SingleSelect
                    value={field.value}
                    disabled={!selectedCountry || loadingDivisions}
                    loading={loadingDivisions}
                    options={divisions}
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    placeholder="— Select —"
                  />
                </>
              )}
            />
          </div>

          {/* City */}
          <div>
            <Controller
              control={control}
              name="cityId"
              render={({ field }) => (
                <>
                  <Label>City</Label>

                  <SingleSelect
                    value={field.value}
                    disabled={!selectedDivisionId || loadingCities}
                    loading={loadingCities}
                    options={cities}
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    placeholder="— Select —"
                  />
                </>
              )}
            />
          </div>

          {/* Zone */}
          <div>
            <Controller
              control={control}
              name="zoneId"
              render={({ field }) => (
                <>
                  <Label>Zone</Label>
                  <SingleSelect
                    value={field.value}
                    disabled={!selectedCityId || loadingZones}
                    loading={loadingZones}
                    options={zones}
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                    placeholder="— Select —"
                  />
                </>
              )}
            />
          </div>

          <div>
            <Controller
              control={control}
              name="streetId"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Label>Street *</Label>
                  <div
                    className={error ? "rounded-xl ring-2 ring-red-500" : ""}
                  >
                    <SingleSelect
                      value={field.value}
                      disabled={!selectedZoneId || loadingStreets}
                      loading={loadingStreets}
                      options={streets}
                      onChange={(value) =>
                        field.onChange(value ? Number(value) : undefined)
                      }
                      placeholder="— Select —"
                    />
                  </div>
                  <ErrorMessage message={error?.message} />
                </>
              )}
            />
          </div>

          {/* Floor */}
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

          <div className="lg:col-span-2">
            <Label>Pin Property Location</Label>
            <div
              className="mt-2 overflow-hidden rounded-xl border border-slate-200"
              onWheel={(e) => e.stopPropagation()} // ✅ stops modal from scrolling when on map
            >
              <MapPicker
                key="map-picker"
                initialLat={lat}
                initialLng={lng}
                onChange={(lat, lng) => {
                  setValue("latitude", lat);
                  setValue("longitude", lng);
                }}
              />
            </div>
          </div>

          {/* Latitude */}
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
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="e.g. 41.3275"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>

          {/* Longitude */}
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
                    value={field.value ?? ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    placeholder="e.g. 19.8187"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div>

          {/* Publish Georeference */}
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
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_BUSINESS_TYPE_OPTIONS}
                    onChange={field.onChange}
                    placeholder="— Select —"
                  />
                </>
              )}
            />
          </div>
          <div>
            <Controller
              control={control}
              name="expirationDate"
              render={({ field }) => (
                <>
                  <Label>Expiration Date</Label>
                  <input
                    type="date"
                    {...field}
                    value={field.value ?? ""}
                    className={inputClass}
                  />
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

      {/* Property Area */}
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

      {/* Property Division */}
      <Section title="Property Division">
        <div className="grid lg:grid-cols-2 gap-6">
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
                      value={field.value ?? ""}
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

      {/* Owner */}
      <Section title="Property Owner">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="flex justify-between gap-3 items-end">
            <Controller
              control={control}
              name="propertyOwnerId"
              render={({ field }) => (
                <div className="w-full">
                  <Label>Owner</Label>
                  <SingleSelect<number>
                    value={field.value}
                    options={propertyOwners}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
            <button
              type="button"
              onClick={() => setOwnerDrawerOpen(true)}
              className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all text-slate-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div>
            <Controller
              control={control}
              name="ownersTypology"
              render={({ field }) => (
                <>
                  <Label>Owner's Typology</Label>
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_OWNER_TYPOLOGY_OPTIONS}
                    onChange={field.onChange}
                    placeholder="— Select —"
                  />
                </>
              )}
            />
          </div>

          {/* <div>
            <Controller
              control={control}
              name="ownersPhoneNumber"
              render={({ field }) => (
                <>
                  <Label>Owner's Phone Number</Label>
                  <input
                    {...field}
                    placeholder="Owner phone number"
                    className={inputClass}
                  />
                </>
              )}
            />
          </div> */}
        </div>
      </Section>

      {/* Other */}
      <Section title="Property Other">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <Label>Communal Charge</Label>

            <Controller
              control={control}
              name="communalCharger"
              render={({ field }) => (
                <>
                  <BooleanSelect
                    field={field}
                    options={PROPERTY_ELEVATOR_OPTIONS}
                  />
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
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_DOCUMENTATION_OPTIONS}
                    onChange={field.onChange}
                    placeholder="— Select —"
                  />
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

      {/* More Features */}
      <Section title="More Features">
        <div className="grid lg:grid-cols-2 gap-6">
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

      <PropertyOwnerDrawer
        key={"createOwner"}
        onOpenChange={(open) => {
          setOwnerDrawerOpen(open);
        }}
        open={ownerDrawerOpen}
        onSave={() => fetchPropertyOwners()}
      />
    </div>
  );
};

export default PropertyForm;
