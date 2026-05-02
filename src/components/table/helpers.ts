/* eslint-disable @typescript-eslint/no-explicit-any */

export const buildDynamicFilterParams = (
  filterMappings?: FilterMapping[],
  filters?: any,
) => {
  if (!filterMappings || !filters) return;

  const params: Record<string, string> = {};
  filterMappings.forEach((mapping) => {
    const {
      filterKey,
      paramKey,
      defaultValue,
      lookupArray,
      lookupField = "id",
      lookupReturnField = "id",
      transform,
      isBoolean,
      booleanCondition,
      isDate,
    } = mapping;

    const filterValue = filters[filterKey];

    if (defaultValue !== undefined && filterValue === defaultValue) {
      return;
    }

    if (
      filterValue === null ||
      filterValue === undefined ||
      filterValue === ""
    ) {
      return;
    }

    if (typeof filterValue === "number" && filterValue === 0) {
      return;
    }

    let finalValue: string;

    if (transform) {
      finalValue = transform(filterValue);
    } else if (lookupArray && lookupArray.length > 0) {
      const matchedItem = lookupArray.find(
        (item) => item[lookupField].toString() === filterValue,
      );
      if (matchedItem) {
        finalValue = String(matchedItem[lookupReturnField]);
      } else {
        return; // Skip if no match found
      }
    } else {
      finalValue = String(filterValue);
    }

    if (finalValue && finalValue.trim() !== "") {
      params[paramKey] = isBoolean
        ? booleanCondition && booleanCondition(filterValue)
          ? "True"
          : "False"
        : isDate
          ? finalValue
          : finalValue;
    }
  });
  return params;
};

export const buildFilterSearchParams = (
  searchTerm: string,
  callback?: any,
): Record<string, string> => {
  const params: Record<string, string> = {};

  if (searchTerm.trim()) {
    params.SearchKey = searchTerm.trim();
  }

  if (callback) {
    callback(params);
  }

  return params;
};
