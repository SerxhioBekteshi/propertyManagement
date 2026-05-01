import { LookupFilterOperation } from "../../../assets/enums";
import { FilterMapping } from "../../../hooks/usePagedList";
import { PropertyFiltersDTO } from "../../../types/properties";

export const INITIAL_FILTERS: PropertyFiltersDTO = {
  orderBy: "newest",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterMappings: FilterMapping<any>[] = [
  {
    key: "businessType",
    column: "businessType",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "minPrice",
    column: "price",
    operation: LookupFilterOperation.MoreOrEquals,
  },
  {
    key: "maxPrice",
    column: "price",
    operation: LookupFilterOperation.LessOrEquals,
  },
  {
    key: "bedrooms",
    column: "bedrooms",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "bathrooms",
    column: "bathrooms",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "propertyType",
    column: "propertyType",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "cityId",
    column: "cityId",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "zoneId",
    column: "zoneId",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "availability",
    column: "availability",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "agentId",
    column: "agentId",
    operation: LookupFilterOperation.Equals,
  },
  {
    key: "propertyOwnerId",
    column: "propertyOwnerId",
    operation: LookupFilterOperation.Equals,
  },
];
