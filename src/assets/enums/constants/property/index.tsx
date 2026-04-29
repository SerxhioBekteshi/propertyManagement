import { IOption } from "../../../../types";

/**
 * DEFAULT "SELECT"
 */
export const DEFAULT_SELECT_OPTION: IOption<""> = {
  value: "",
  label: "— Select an option —",
};

/**
 * Helper to prepend default option
 */
export const withDefault = <T extends string>(
  options: IOption<T>[],
): IOption<T | "">[] => {
  return [DEFAULT_SELECT_OPTION, ...options];
};

export const withDefaultBoolean = (
  options: IOption<boolean>[],
): IOption<boolean | null>[] => {
  return [{ value: null, label: "— Select an option —" }, ...options];
};

/**
 * BASE YES / NO
 */
export const YES_NO_OPTIONS: IOption<boolean>[] = [
  { value: true, label: "Yes" },
  { value: false, label: "No" },
];

/**
 * 1. STATUS
 */
export const PROPERTY_STATUS_OPTIONS = withDefault([
  { value: "Used", label: "Used" },
  { value: "New", label: "New" },
  { value: "Under Construction", label: "Under Construction" },
  { value: "In Project", label: "In Project" },
  { value: "To Demolish or Rebuild", label: "To Demolish or Rebuild" },
  { value: "For Refurbishment", label: "For Refurbishment" },
  { value: "Refurbished", label: "Refurbished" },
]);

/**
 * 2. MAIN TYPE
 */
export const PROPERTY_MAIN_TYPE_OPTIONS = withDefault([
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
  { value: "Land", label: "Land" },
]);

/**
 * 3. AVAILABILITY
 */
export const PROPERTY_AVAILABILITY_OPTIONS = withDefault([
  { value: "Available", label: "Available" },
  { value: "Reserved", label: "Reserved" },
  { value: "Rented", label: "Rented" },
  { value: "In negotiation", label: "In Negotiation" },
  { value: "Withdrawn", label: "Withdrawn" },
  { value: "In evaluation", label: "In Evaluation" },
  { value: "Withdrawn by owner", label: "Withdrawn by Owner" },
  { value: "Closed", label: "Closed" },
]);

/**
 * 4. FURNISHED
 */
export const PROPERTY_FURNISHED_OPTIONS = withDefault([
  { value: "Fully furnished", label: "Fully Furnished" },
  { value: "Semi furnished", label: "Semi Furnished" },
  { value: "Not furnished", label: "Not Furnished" },
]);

/**
 * 5. PROPERTY TYPE
 */
export const PROPERTY_TYPE_OPTIONS = withDefault([
  { value: "Apartment", label: "Apartment" },
  { value: "Duplex", label: "Duplex" },
  { value: "Penthouse", label: "Penthouse" },
  { value: "Studio", label: "Studio" },
  { value: "Building", label: "Building" },
  { value: "bar_restaurant", label: "Bar / Restaurant" },
  { value: "Hotel", label: "Hotel" },
  { value: "Multipurpose Space", label: "Multipurpose Space" },
  { value: "Parking", label: "Parking" },
  { value: "House", label: "House" },
  { value: "Land", label: "Land" },
  { value: "Industrial Land", label: "Industrial Land" },
  { value: "Commercial Land", label: "Commercial Land" },
  { value: "Shop", label: "Shop" },
  { value: "Villa", label: "Villa" },
  { value: "Commercial", label: "Commercial" },
  { value: "Office", label: "Office" },
  { value: "Warehouse", label: "Warehouse" },
  { value: "Aparthotel", label: "Apart-Hotel" },
  { value: "Bungalow", label: "Bungalow" },
  { value: "Factory", label: "Factory" },
  { value: "Industrial", label: "Industrial" },
  { value: "Pavilion", label: "Pavilion" },
  { value: "Rural Land", label: "Rural Land" },
  { value: "Urban Land", label: "Urban Land" },
  { value: "Beach Area", label: "Beach Area" },
  { value: "Business", label: "Business" },
]);

/**
 * 6. ELEVATOR
 */
export const PROPERTY_ELEVATOR_OPTIONS = withDefaultBoolean(YES_NO_OPTIONS);

/**
 * 8. BEING LIVED
 */
export const PROPERTY_BEING_LIVED_OPTIONS = withDefaultBoolean(YES_NO_OPTIONS);

/**
 * 9. PARKING
 */
export const PROPERTY_PARKING_OPTIONS = withDefaultBoolean(YES_NO_OPTIONS);

/**
 * 10. ORIENTATION
 */
export const PROPERTY_ORIENTATION_OPTIONS = withDefault([
  { value: "North", label: "North" },
  { value: "South", label: "South" },
  { value: "East", label: "East" },
  { value: "West", label: "West" },
]);

export const COUNTRY_OPTIONS = withDefault([
  { value: "AL", label: "Albania" },
  { value: "GR", label: "Greece" },
]);
/**
 * 12. BUSINESS TYPE
 */
export const PROPERTY_BUSINESS_TYPE_OPTIONS = withDefault([
  { value: "Sale", label: "For Sale" },
  { value: "Rent", label: "To Rent" },
]);

/**
 * 13. OWNER TYPOLOGY
 */
export const PROPERTY_OWNER_TYPOLOGY_OPTIONS = withDefault([
  { value: "Owner", label: "Owner" },
  { value: "Clering", label: "Clearing" }, // typo kept
  { value: "Builder", label: "Builder" },
]);

/**
 * 14. DOCUMENTATION
 */
export const PROPERTY_DOCUMENTATION_OPTIONS = withDefault([
  { value: "yes", label: "Yes" },
  { value: "false", label: "No" },
  { value: "in_progress", label: "In Progress" },
]);

export const PROPERTY_VIEW_OPTIONS = withDefault([
  { value: "Sea", label: "Sea" },
  { value: "Lake", label: "Lake" },
  { value: "Mountains", label: "Mountains" },
  { value: "River", label: "River" },
  { value: "City", label: "City" },
  { value: "Beach", label: "Beach" },
  { value: "Countryside", label: "Countryside" },
  { value: "Garden", label: "Garden" },
  { value: "Dam", label: "Dam" },
]);

export const PROPERTY_INFRASTRUCTURE_OPTIONS = withDefault([
  { value: "Terrace", label: "Terrace" },
  { value: "Garden", label: "Garden" },
  { value: "Games Room", label: "Games Room" },
  { value: "Gym", label: "Gym" },
  { value: "Swimming Pool", label: "Swimming Pool" },
  { value: "Private Swimming Pool", label: "Private Swimming Pool" },
  { value: "Shared Swimming Pool", label: "Shared Swimming Pool" },
  { value: "Tennis Court", label: "Tennis Court" },
  { value: "Garage", label: "Garage" },
  { value: "Outdoor Parking", label: "Outdoor Parking" },
  { value: "Indoor Parking", label: "Indoor Parking" },
  { value: "Storage Room", label: "Storage Room" },
  { value: "Wine Cellar", label: "Wine Cellar" },
  { value: "Cellar", label: "Cellar" },
  { value: "Wardrobes", label: "Wardrobes" },
  { value: "Bathtub", label: "Bathtub" },
  { value: "Dryer", label: "Dryer" },
  { value: "Assembly Room", label: "Assembly Room" },
  { value: "Roof Garden", label: "Roof Garden" },
  { value: "Disabled Access", label: "Disabled Access" },
  { value: "Covered Terrace", label: "Covered Terrace" },
  { value: "Playground", label: "Playground" },
  { value: "Public Lighting", label: "Public Lighting" },
  { value: "None", label: "None" },
]);

export const PROPERTY_SURROUNDINGS_OPTIONS = withDefault([
  { value: "Airport", label: "Airport" },
  { value: "City Center", label: "City Center" },
  { value: "Countryside", label: "Countryside" },
  { value: "Shopping Center", label: "Shopping Center" },
  { value: "Train Station", label: "Train Station" },
  { value: "Railway Station", label: "Railway Station" },
  { value: "Subway", label: "Subway" },
  { value: "Fire Station", label: "Fire Station" },
  { value: "Police Station", label: "Police Station" },
  { value: "Hospital", label: "Hospital" },
  { value: "Public Library", label: "Public Library" },
  { value: "School", label: "School" },
  { value: "Public Transport", label: "Public Transport" },
  { value: "Supermarket", label: "Supermarket" },
  { value: "Pharmacy", label: "Pharmacy" },
  { value: "Green Areas", label: "Green Areas" },
  { value: "Highway", label: "Highway" },
  { value: "Market", label: "Market" },
  { value: "Bank", label: "Bank" },
  { value: "Commercial Area", label: "Commercial Area" },
  { value: "Gym", label: "Gym" },
  { value: "Children's Playground", label: "Children's Playground" },
  { value: "Taxi Rank", label: "Taxi Rank" },
  { value: "Gas Station", label: "Gas Station" },
  { value: "Sports Court", label: "Sports Court" },
  { value: "Bicycle Stand", label: "Bicycle Stand" },
  { value: "Near the Beach", label: "Near the Beach" },
  { value: "Swimming Pools", label: "Swimming Pools" },
  { value: "Plot", label: "Plot" },
]);
export const PROPERTY_EQUIPMENT_OPTIONS = withDefault([
  { value: "Air Conditioning", label: "Air Conditioning" },
  { value: "Heating", label: "Heating" },
  { value: "Central Heating", label: "Central Heating" },
  { value: "Underfloor Heating", label: "Underfloor Heating" },
  { value: "Fireplace", label: "Fireplace" },
  { value: "Solar Panels", label: "Solar Panels" },
  { value: "Double Glazing", label: "Double Glazing" },
  { value: "Shutters", label: "Shutters" },
  { value: "Security Door", label: "Security Door" },
  { value: "Alarm System", label: "Alarm System" },
  { value: "CCTV", label: "CCTV" },
  { value: "Intercom", label: "Intercom" },
  { value: "Elevator", label: "Elevator" },
  { value: "Wi-Fi", label: "Wi-Fi" },
  { value: "TV", label: "TV" },
  { value: "Kitchen Appliances", label: "Kitchen Appliances" },
  { value: "Oven", label: "Oven" },
  { value: "Fridge", label: "Fridge" },
  { value: "Dishwasher", label: "Dishwasher" },
  { value: "Washing Machine", label: "Washing Machine" },
]);

export const PROPERTY_MAIN_LEAD_SOURCE_OPTIONS = withDefault([
  { value: "Cold Call", label: "Cold Call" },
  { value: "Social Media", label: "Social Media" },
  { value: "C21 Website", label: "C21 Website" },
  { value: "Century 21 Master", label: "Century 21 Master" },
  { value: "Portals", label: "Portals" },
  { value: "Office", label: "Office" },
  { value: "Offline Marketing", label: "Offline Marketing" },
  { value: "Soi", label: "Sphere of Influence" },
  { value: "Outdoor Prospecting", label: "Outdoor Prospecting" },
  { value: "Broker Contacts", label: "Broker Contacts" },
]);
