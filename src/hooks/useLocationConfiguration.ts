import { useEffect, useState } from "react";
import { IOption } from "../types";
import { LocationConfigurationService } from "../lib/ListConfiguration";
import { useFormContext, useWatch } from "react-hook-form";

// ── PARALLEL (no form context needed) ─────────────────────────
export const useLocationConfigBase = (
  options: {
    open?: boolean;
    fetch?: {
      divisions?: boolean;
      cities?: boolean;
      zones?: boolean;
      streets?: boolean;
      propertyOwners?: boolean;
    };
  } = {},
) => {
  const { open, fetch = {} } = options;

  const [divisions, setDivisions] = useState<IOption<number>[]>([]);
  const [cities, setCities] = useState<IOption<number>[]>([]);
  const [zones, setZones] = useState<IOption<number>[]>([]);
  const [streets, setStreets] = useState<IOption<number>[]>([]);
  const [propertyOwners, setPropertyOwners] = useState<IOption<number>[]>([]);

  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingZones, setLoadingZones] = useState(false);
  const [loadingStreets, setLoadingStreets] = useState(false);
  const [loadingPropertyOwners, setLoadingPropertyOwners] = useState(false);

  useEffect(() => {
    if (open === false) return;

    const run = async () => {
      const calls: Promise<void>[] = [];

      if (fetch.divisions)
        calls.push(
          (async () => {
            setLoadingDivisions(true);
            try {
              const res = await LocationConfigurationService.getDivisions();
              setDivisions(res.data ?? []);
            } finally {
              setLoadingDivisions(false);
            }
          })(),
        );

      if (fetch.cities)
        calls.push(
          (async () => {
            setLoadingCities(true);
            try {
              const res = await LocationConfigurationService.getCities();
              setCities(res.data ?? []);
            } finally {
              setLoadingCities(false);
            }
          })(),
        );

      if (fetch.zones)
        calls.push(
          (async () => {
            setLoadingZones(true);
            try {
              const res = await LocationConfigurationService.getZones();
              setZones(res.data ?? []);
            } finally {
              setLoadingZones(false);
            }
          })(),
        );

      if (fetch.streets)
        calls.push(
          (async () => {
            setLoadingStreets(true);
            try {
              const res = await LocationConfigurationService.getStreets();
              setStreets(res.data ?? []);
            } finally {
              setLoadingStreets(false);
            }
          })(),
        );

      if (fetch.propertyOwners)
        calls.push(
          (async () => {
            setLoadingPropertyOwners(true);
            try {
              const res =
                await LocationConfigurationService.getPropertyOwners();
              setPropertyOwners(res.data ?? []);
            } finally {
              setLoadingPropertyOwners(false);
            }
          })(),
        );

      await Promise.all(calls);
    };

    run();
  }, [open]);

  return {
    divisions,
    cities,
    zones,
    streets,
    propertyOwners,
    loadingDivisions,
    loadingCities,
    loadingZones,
    loadingStreets,
    loadingPropertyOwners,
  };
};

// ── DEPENDENT (inside forms, chained by selection) ─────────────
export const useLocationConfigDependant = (
  options: {
    fetch?: {
      divisions?: boolean;
      cities?: boolean;
      zones?: boolean;
      streets?: boolean;
      propertyOwners?: boolean;
    };
  } = {},
) => {
  const { fetch = {} } = options;
  const { setValue, control } = useFormContext();

  const selectedCountry = useWatch({ control, name: "country" });
  const selectedDivisionId = useWatch({ control, name: "divisionId" });
  const selectedCityId = useWatch({ control, name: "cityId" });
  const selectedZoneId = useWatch({ control, name: "zoneId" });

  const [divisions, setDivisions] = useState<IOption<number>[]>([]);
  const [cities, setCities] = useState<IOption<number>[]>([]);
  const [zones, setZones] = useState<IOption<number>[]>([]);
  const [streets, setStreets] = useState<IOption<number>[]>([]);
  const [propertyOwners, setPropertyOwners] = useState<IOption<number>[]>([]);

  const [loadingDivisions, setLoadingDivisions] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingZones, setLoadingZones] = useState(false);
  const [loadingStreets, setLoadingStreets] = useState(false);
  const [loadingPropertyOwners, setLoadingPropertyOwners] = useState(false);

  useEffect(() => {
    if (!fetch.divisions) return;
    if (!selectedCountry) {
      setDivisions([]);
      setCities([]);
      setZones([]);
      setStreets([]);
      return;
    }
    const run = async () => {
      setLoadingDivisions(true);
      setValue("divisionId", undefined);
      setValue("cityId", undefined);
      setValue("zoneId", undefined);
      setValue("streetId", undefined);
      setCities([]);
      setZones([]);
      setStreets([]);
      try {
        const res =
          await LocationConfigurationService.getDivisions(selectedCountry);
        setDivisions(res.data ?? []);
      } finally {
        setLoadingDivisions(false);
      }
    };
    run();
  }, [selectedCountry]);

  useEffect(() => {
    if (!fetch.cities) return;
    if (!selectedDivisionId) {
      setCities([]);
      setZones([]);
      setStreets([]);
      return;
    }
    const run = async () => {
      setLoadingCities(true);
      setValue("cityId", undefined);
      setValue("zoneId", undefined);
      setValue("streetId", undefined);
      setZones([]);
      setStreets([]);
      try {
        const res =
          await LocationConfigurationService.getCities(selectedDivisionId);
        setCities(res.data ?? []);
      } finally {
        setLoadingCities(false);
      }
    };
    run();
  }, [selectedDivisionId]);

  useEffect(() => {
    if (!fetch.zones) return;
    if (!selectedCityId) {
      setZones([]);
      setStreets([]);
      return;
    }
    const run = async () => {
      setLoadingZones(true);
      setValue("zoneId", undefined);
      setValue("streetId", undefined);
      setStreets([]);
      try {
        const res = await LocationConfigurationService.getZones(selectedCityId);
        setZones(res.data ?? []);
      } finally {
        setLoadingZones(false);
      }
    };
    run();
  }, [selectedCityId]);

  useEffect(() => {
    if (!fetch.streets) return;
    if (!selectedZoneId) {
      setStreets([]);
      return;
    }
    const run = async () => {
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
    run();
  }, [selectedZoneId]);

  useEffect(() => {
    if (!fetch.propertyOwners) return;
    const run = async () => {
      setLoadingPropertyOwners(true);
      try {
        const res = await LocationConfigurationService.getPropertyOwners();
        setPropertyOwners(res.data ?? []);
      } finally {
        setLoadingPropertyOwners(false);
      }
    };
    run();
  }, []);

  return {
    divisions,
    cities,
    zones,
    streets,
    propertyOwners,
    loadingDivisions,
    loadingCities,
    loadingZones,
    loadingStreets,
    loadingPropertyOwners,
    selectedCountry,
    selectedDivisionId,
    selectedCityId,
    selectedZoneId,
  };
};
