export type Option<T extends string = string> = {
  value: T;
  label: string;
};

/**
 * DEFAULT "SELECT"
 */
export const DEFAULT_SELECT_OPTION: Option<""> = {
  value: "",
  label: "— Select an option —",
};

/**
 * Helper to prepend default option
 */
export const withDefault = <T extends string>(
  options: Option<T>[],
): Option<T | "">[] => {
  return [DEFAULT_SELECT_OPTION, ...options];
};

/**
 * BASE YES / NO
 */
export const YES_NO_OPTIONS: Option[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/**
 * EXTENDED YES / NO EXAMPLES
 */
export const YES_NO_IN_PROGRESS_OPTIONS: Option[] = [
  ...YES_NO_OPTIONS,
  { value: "in_progress", label: "In Progress" },
];

/**
 * 1. STATUS
 */
export const PROPERTY_STATUS_OPTIONS = withDefault([
  { value: "used", label: "Used" },
  { value: "new", label: "New" },
  { value: "under_construction", label: "Under Construction" },
  { value: "in_project", label: "In Project" },
  { value: "to_demolish_or_rebuild", label: "To Demolish or Rebuild" },
  { value: "for_refurbishment", label: "For Refurbishment" },
  { value: "refurbished", label: "Refurbished" },
]);

/**
 * 2. MAIN TYPE
 */
export const PROPERTY_MAIN_TYPE_OPTIONS = withDefault([
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "land", label: "Land" },
  { value: "industrial", label: "Industrial" },
  { value: "business", label: "Business" },
]);

/**
 * 3. AVAILABILITY
 */
export const PROPERTY_AVAILABILITY_OPTIONS = withDefault([
  { value: "available", label: "Available" },
  { value: "reserved", label: "Reserved" },
  { value: "rented", label: "Rented" },
  { value: "in_negotiation", label: "In Negotiation" },
  { value: "withdrawn", label: "Withdrawn" },
  { value: "in_evaluation", label: "In Evaluation" },
  { value: "withdrawn_by_owner", label: "Withdrawn by Owner" },
  { value: "closed", label: "Closed" },
]);

/**
 * 4. FURNISHED
 */
export const PROPERTY_FURNISHED_OPTIONS = withDefault([
  { value: "fully_furnished", label: "Fully Furnished" },
  { value: "semi_furnished", label: "Semi Furnished" },
  { value: "not_furnished", label: "Not Furnished" },
]);

/**
 * 5. PROPERTY TYPE
 */
export const PROPERTY_TYPE_OPTIONS = withDefault([
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "penthouse", label: "Penthouse" },
  { value: "studio", label: "Studio" },
  { value: "building", label: "Building" },
  { value: "bar_restaurant", label: "Bar / Restaurant" },
  { value: "hotel", label: "Hotel" },
  { value: "multipurpose_space", label: "Multipurpose Space" },
  { value: "parking", label: "Parking" },
  { value: "house", label: "House" },
  { value: "land", label: "Land" },
  { value: "industrial_land", label: "Industrial Land" },
  { value: "commercial_land", label: "Commercial Land" },
  { value: "shop", label: "Shop" },
  { value: "villa", label: "Villa" },
  { value: "commercial", label: "Commercial" },
  { value: "office", label: "Office" },
  { value: "warehouse", label: "Warehouse" },
  { value: "aparthotel", label: "Apart-Hotel" },
  { value: "bungalow", label: "Bungalow" },
  { value: "factory", label: "Factory" },
  { value: "industrial", label: "Industrial" },
  { value: "pavilion", label: "Pavilion" },
  { value: "rural_land", label: "Rural Land" },
  { value: "urban_land", label: "Urban Land" },
  { value: "beach_area", label: "Beach Area" },
  { value: "business", label: "Business" },
]);

/**
 * 6. ELEVATOR
 */
export const PROPERTY_ELEVATOR_OPTIONS = withDefault(YES_NO_OPTIONS);

/**
 * 8. BEING LIVED
 */
export const PROPERTY_BEING_LIVED_OPTIONS = withDefault(YES_NO_OPTIONS);

/**
 * 9. PARKING
 */
export const PROPERTY_PARKING_OPTIONS = withDefault(YES_NO_OPTIONS);

/**
 * 10. ORIENTATION
 */
export const PROPERTY_ORIENTATION_OPTIONS = withDefault([
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
]);

/**
 * 11. DIVISION
 */
export const PROPERTY_DIVISION_OPTIONS = withDefault([
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "mixed", label: "Mixed" },
]);

/**
 * 12. BUSINESS TYPE
 */
export const PROPERTY_BUSINESS_TYPE_OPTIONS = withDefault([
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "To Rent" },
]);

/**
 * 13. OWNER TYPOLOGY
 */
export const PROPERTY_OWNER_TYPOLOGY_OPTIONS = withDefault([
  { value: "owner", label: "Owner" },
  { value: "clering", label: "Clearing" }, // typo kept
  { value: "builder", label: "Builder" },
]);

/**
 * 14. DOCUMENTATION
 */
export const PROPERTY_DOCUMENTATION_OPTIONS = withDefault([
  ...YES_NO_OPTIONS,
  { value: "in_progress", label: "In Progress" },
]);

/**
 * CITIES
 */
export const albanianCities = [
  "Tirana",
  "Durrës",
  "Vlorë",
  "Shkodër",
  "Elbasan",
  "Fier",
  "Korçë",
  "Berat",
  "Sarandë",
  "Lushnjë",
  "Kavajë",
  "Gjirokastër",
  "Pogradec",
  "Lezhë",
];

export const greekCities = [
  "Athens",
  "Thessaloniki",
  "Patras",
  "Heraklion",
  "Larissa",
  "Volos",
  "Ioannina",
  "Rhodes",
  "Chania",
  "Santorini",
  "Mykonos",
  "Corfu",
  "Nafplio",
  "Katerini",
];
