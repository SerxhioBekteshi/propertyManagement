import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import Label from "../../../components/label";
import { SingleSelect } from "../../../components/single-select";
import { COUNTRY_OPTIONS } from "../../../assets/enums/constants/property";
import { LocationConfigurationService } from "../../../lib/ListConfiguration";
import { IOption } from "../../../types";

/**
 * Encapsulates the Country -> Division -> City -> Zone cascade:
 * - fetches each level's options when its parent changes
 * - clears child fields when the user actually changes a parent
 * - does NOT clear children on the very first population (edit mode),
 *   so existing server values (e.g. zoneId) survive the initial load
 */
const LocationCascadeFields = () => {
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

  const isCountryInitial = useRef(true);
  const isDivisionInitial = useRef(true);
  const isCityInitial = useRef(true);

  // Fetch divisions when country changes
  useEffect(() => {
    if (!selectedCountry) {
      if (!isCountryInitial.current) {
        setValue("divisionId", undefined);
        setValue("cityId", undefined);
        setValue("zoneId", undefined, {
          shouldValidate: true,
          shouldTouch: true,
        });
        setDivisions([]);
        setCities([]);
        setZones([]);
      }
      isCountryInitial.current = false;
      return;
    }

    const wasInitial = isCountryInitial.current;
    isCountryInitial.current = false;

    const fetch = async () => {
      setLoadingDivisions(true);
      if (!wasInitial) {
        setValue("divisionId", undefined);
        setValue("cityId", undefined);
        setValue("zoneId", undefined, {
          shouldValidate: true,
          shouldTouch: true,
        });
        setCities([]);
        setZones([]);
      }
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
      if (!isDivisionInitial.current) {
        setValue("cityId", undefined);
        setValue("zoneId", undefined, {
          shouldValidate: true,
          shouldTouch: true,
        });
        setCities([]);
        setZones([]);
      }
      isDivisionInitial.current = false;
      return;
    }

    const wasInitial = isDivisionInitial.current;
    isDivisionInitial.current = false;

    const fetch = async () => {
      setLoadingCities(true);
      if (!wasInitial) {
        setValue("cityId", undefined);
        setValue("zoneId", undefined, {
          shouldValidate: true,
          shouldTouch: true,
        });
        setZones([]);
      }
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
      if (!isCityInitial.current) {
        setValue("zoneId", undefined, {
          shouldValidate: true,
          shouldTouch: true,
        });
        setZones([]);
      }
      isCityInitial.current = false;
      return;
    }

    const wasInitial = isCityInitial.current;
    isCityInitial.current = false;

    const fetch = async () => {
      setLoadingZones(true);
      if (!wasInitial) {
        setValue("zoneId", undefined, {
          shouldValidate: true,
          shouldTouch: true,
        });
      }
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
    <>
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

      <div>
        <Controller
          control={control}
          name="zoneId"
          render={({ field, fieldState: { error } }) => (
            <div>
              <Label>Zone *</Label>
              <div className={error ? "rounded-xl ring-2 ring-red-500" : ""}>
                <SingleSelect<number>
                  value={field.value}
                  disabled={!selectedCityId || loadingZones}
                  loading={loadingZones}
                  options={zones}
                  onChange={(value) =>
                    field.onChange(value ? Number(value) : undefined)
                  }
                  placeholder="— Select —"
                />
              </div>
              {error?.message && (
                <p className="text-xs text-red-500 mt-1">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>
    </>
  );
};

export default LocationCascadeFields;
