import { useEffect, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import Section from "../../../components/section";
import { SingleSelect } from "../../../components/single-select";
import {
  COUNTRY_OPTIONS,
  PROPERTY_AVAILABILITY_OPTIONS,
  PROPERTY_BUSINESS_TYPE_OPTIONS,
  PROPERTY_DOCUMENTATION_OPTIONS,
  PROPERTY_ELEVATOR_OPTIONS,
  // PROPERTY_EQUIPMENT_OPTIONS,
  PROPERTY_FURNISHED_OPTIONS,
  // PROPERTY_INFRASTRUCTURE_OPTIONS,
  PROPERTY_MAIN_LEAD_SOURCE_OPTIONS,
  PROPERTY_STATUS_OPTIONS,
  // PROPERTY_SURROUNDINGS_OPTIONS,
  PROPERTY_TYPE_OPTIONS,
  // PROPERTY_VIEW_OPTIONS,
} from "../../../assets/enums/constants/property";
import {
  LEAD_SOURCE_OPTIONS,
  PAYMENT_TYPE_OPTIONS,
  RENTAL_TIME_OPTIONS,
  SALES_STAGE_OPTIONS,
} from "../../../assets/enums/constants/opportunity";
import { IOption } from "../../../types";
// import { MultiSelect } from "../../../components/multi-select";
import BooleanSelect from "../../../components/boolean-select";
import Label from "../../../components/label";

interface IOpportunityFormProps {
  propertyOwners: IOption<number>[];
}

const inputClass =
  "w-full px-3 py-2.5 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent placeholder-slate-400 transition-all";

const OpportunityForm = (props: IOpportunityFormProps) => {
  const { propertyOwners } = props;

  const { control, setValue } = useFormContext();

  const selectedCountry = useWatch({ control, name: "country" });
  const selectedDivisionId = useWatch({ control, name: "divisionId" });
  const selectedCityId = useWatch({ control, name: "cityId" });

  const [divisions, setDivisions] = useState<IOption<number>[]>([]);
  const [cities, setCities] = useState<IOption<number>[]>([]);
  const [zones, setZones] = useState<IOption<number>[]>([]);

  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingZones, setLoadingZones] = useState(false);

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

  return (
    <div className="space-y-8">
      <Section title="Opportunity Details">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <div>
                  <Label>Potential Title </Label>
                  <input
                    {...field}
                    className={inputClass}
                    placeholder="Title"
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="propertyOwnerId"
              render={({ field }) => (
                <div>
                  <Label>Contact Name </Label>
                  <SingleSelect
                    value={field.value}
                    options={propertyOwners}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="salesStage"
              render={({ field }) => (
                <div>
                  <Label>Sales Stage </Label>
                  <SingleSelect
                    value={field.value}
                    options={SALES_STAGE_OPTIONS}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="expectedCloseDate"
              render={({ field }) => (
                <div>
                  <Label>Expected Close Date</Label>
                  <input type="date" {...field} className={inputClass} />
                </div>
              )}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <div>
                  <Label>Amount (€)</Label>
                  <input
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    className={inputClass}
                    placeholder="Amount"
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="paymentType"
              render={({ field }) => (
                <div>
                  <Label>Payment Type *</Label>
                  <SingleSelect
                    value={field.value}
                    options={PAYMENT_TYPE_OPTIONS}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="mainLeadSource"
              render={({ field }) => (
                <div>
                  <Label>Main Lead Source </Label>
                  <SingleSelect
                    value={field.value}
                    options={PROPERTY_MAIN_LEAD_SOURCE_OPTIONS}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="leadSource"
              render={({ field }) => (
                <div>
                  <Label>Lead Source</Label>
                  <SingleSelect
                    value={field.value}
                    options={LEAD_SOURCE_OPTIONS}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />
          </div>
        </div>
      </Section>

      {/* ===================== LOCATION ===================== */}
      <Section title="Potentials Location" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-5">
          {/* LEFT */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <div>
                  <Label>Country</Label>
                  <SingleSelect
                    options={COUNTRY_OPTIONS}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="cityId"
              render={({ field }) => (
                <div>
                  <Label>City *</Label>
                  <SingleSelect
                    value={field.value}
                    disabled={!selectedDivisionId || loadingCities}
                    loading={loadingCities}
                    options={cities}
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                  />
                </div>
              )}
            />
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="divisionId"
              render={({ field }) => (
                <div>
                  <Label>Division *</Label>
                  <SingleSelect
                    value={field.value}
                    disabled={!selectedCountry || loadingDivisions}
                    loading={loadingDivisions}
                    options={divisions}
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="zoneId"
              render={({ field }) => (
                <div>
                  <Label>Zone *</Label>
                  <SingleSelect
                    value={field.value}
                    disabled={!selectedCityId || loadingZones}
                    loading={loadingZones}
                    options={zones}
                    onChange={(value) =>
                      field.onChange(value ? Number(value) : undefined)
                    }
                  />
                </div>
              )}
            />
          </div>
        </div>
      </Section>

      {/* Property Price */}
      <Section title="Main Properties Filters" className="mt-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <div>
            <Controller
              control={control}
              name="priceFrom"
              render={({ field }) => (
                <>
                  <Label>Price From (€)</Label>
                  <input
                    type="number"
                    {...field}
                    placeholder="Price From"
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
            />{" "}
          </div>
          <div>
            {" "}
            <Controller
              control={control}
              name="priceTo"
              render={({ field }) => (
                <>
                  <Label>Price To (€)</Label>
                  <input
                    type="number"
                    {...field}
                    placeholder="Price To"
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
          {(
            [
              { name: "bedroomsFrom", label: "Bedrooms From" },
              { name: "bedroomsTo", label: "Bedrooms To" },
              { name: "bathroomsFrom", label: "Bathrooms From" },
              { name: "bathroomsTo", label: "BathroomsTo" },
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
                      placeholder={label}
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

          <div>
            <Controller
              control={control}
              name="minimalArea"
              render={({ field }) => (
                <>
                  <Label>Minimal Area</Label>
                  <input
                    placeholder="Minimal Area"
                    type="number"
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
          <div>
            <Controller
              control={control}
              name="maximalArea"
              render={({ field }) => (
                <>
                  <Label>Maximal Area</Label>
                  <input
                    type="number"
                    {...field}
                    value={field.value ?? ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : undefined,
                      )
                    }
                    className={inputClass}
                    placeholder="Maximal Area"
                  />
                </>
              )}
            />
          </div>
        </div>
      </Section>

      <Section title="Other Information" className="mt-6">
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
                  />
                </>
              )}
            />
          </div>
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
                  />
                </>
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
          <Controller
            control={control}
            name="floor"
            render={({ field }) => (
              <div>
                <Label>Floor</Label>
                <input
                  {...field}
                  className={inputClass}
                  value={field.value ?? ""}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  type="number"
                  placeholder="Floor"
                />
              </div>
            )}
          />
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
        </div>
      </Section>

      {/* More Features */}
      {/* <Section title="More Features">
        <div className="grid lg:grid-cols-2 gap-6">
          <Controller
            control={control}
            name="withViewTo"
            render={({ field }) => (
              <div>
                <Label>View To</Label>
                <MultiSelect
                  options={PROPERTY_VIEW_OPTIONS}
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                        ? field.value.split(",")
                        : []
                  }
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
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                        ? field.value.split(",")
                        : []
                  }
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
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                        ? field.value.split(",")
                        : []
                  }
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
                  value={
                    Array.isArray(field.value)
                      ? field.value
                      : field.value
                        ? field.value.split(",")
                        : []
                  }
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </div>
      </Section> */}

      {/* More Features */}
      <Section title="Description Details">
        <div className="grid lg:grid-cols-1 gap-6">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <div>
                <Label>Description</Label>
                <textarea
                  {...field}
                  rows={3}
                  placeholder="Description"
                  className={inputClass}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="rentalTime"
            render={({ field }) => (
              <div>
                <Label>Rental Time</Label>
                <SingleSelect
                  options={RENTAL_TIME_OPTIONS}
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

export default OpportunityForm;
