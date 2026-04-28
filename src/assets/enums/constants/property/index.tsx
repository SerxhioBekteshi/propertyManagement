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

/**
 * BASE YES / NO
 */
export const YES_NO_OPTIONS: IOption<string>[] = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

/**
 * EXTENDED YES / NO EXAMPLES
 */
export const YES_NO_IN_PROGRESS_OPTIONS: IOption<string>[] = [
  ...YES_NO_OPTIONS,
  { value: "in_progress", label: "In Progress" },
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
  ...YES_NO_OPTIONS,
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
  { value: "terrace", label: "Terrace" },
  { value: "garden", label: "Garden" },
  { value: "games_room", label: "Games Room" },
  { value: "gym", label: "Gym" },
  { value: "swimming_pool", label: "Swimming Pool" },
  { value: "private_pool", label: "Private Swimming Pool" },
  { value: "shared_pool", label: "Shared Swimming Pool" },
  { value: "tennis_court", label: "Tennis Court" },
  { value: "garage", label: "Garage" },
  { value: "outdoor_parking", label: "Outdoor Parking" },
  { value: "indoor_parking", label: "Indoor Parking" },
  { value: "storage_room", label: "Storage Room" },
  { value: "wine_cellar", label: "Wine Cellar" },
  { value: "cellar", label: "Cellar" },
  { value: "wardrobes", label: "Wardrobes" },
  { value: "bathtub", label: "Bathtub" },
  { value: "dryer", label: "Dryer" },
  { value: "assembly_room", label: "Assembly Room" },
  { value: "roof_garden", label: "Roof Garden" },
  { value: "disabled_access", label: "Disabled Access" },
  { value: "covered_terrace", label: "Covered Terrace" },
  { value: "playground", label: "Playground" },
  { value: "public_lighting", label: "Public Lighting" },
  { value: "none", label: "None" },
]);

export const PROPERTY_SURROUNDINGS_OPTIONS = withDefault([
  { value: "airport", label: "Airport" },
  { value: "city_center", label: "City Center" },
  { value: "countryside", label: "Countryside" },
  { value: "shopping_center", label: "Shopping Center" },
  { value: "train_station", label: "Train Station" },
  { value: "railway_station", label: "Railway Station" },
  { value: "subway", label: "Subway" },
  { value: "fire_station", label: "Fire Station" },
  { value: "police", label: "Police Station" },
  { value: "hospital", label: "Hospital" },
  { value: "public_library", label: "Public Library" },
  { value: "school", label: "School" },
  { value: "public_transport", label: "Public Transport" },
  { value: "supermarket", label: "Supermarket" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "green_areas", label: "Green Areas" },
  { value: "highway", label: "Highway" },
  { value: "market", label: "Market" },
  { value: "bank", label: "Bank" },
  { value: "commercial_area", label: "Commercial Area" },
  { value: "gym", label: "Gym" },
  { value: "playground", label: "Children's Playground" },
  { value: "taxi_rank", label: "Taxi Rank" },
  { value: "gas_station", label: "Gas Station" },
  { value: "sports_court", label: "Sports Court" },
  { value: "bicycle_stand", label: "Bicycle Stand" },
  { value: "near_beach", label: "Near the Beach" },
  { value: "swimming_pools", label: "Swimming Pools" },
  { value: "plot", label: "Plot" },
]);

export const PROPERTY_EQUIPMENT_OPTIONS = withDefault([
  { value: "air_conditioning", label: "Air Conditioning" },
  { value: "heating", label: "Heating" },
  { value: "central_heating", label: "Central Heating" },
  { value: "underfloor_heating", label: "Underfloor Heating" },
  { value: "fireplace", label: "Fireplace" },
  { value: "solar_panels", label: "Solar Panels" },
  { value: "double_glazing", label: "Double Glazing" },
  { value: "shutters", label: "Shutters" },
  { value: "security_door", label: "Security Door" },
  { value: "alarm_system", label: "Alarm System" },
  { value: "cctv", label: "CCTV" },
  { value: "intercom", label: "Intercom" },
  { value: "elevator", label: "Elevator" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "tv", label: "TV" },
  { value: "kitchen_appliances", label: "Kitchen Appliances" },
  { value: "oven", label: "Oven" },
  { value: "fridge", label: "Fridge" },
  { value: "dishwasher", label: "Dishwasher" },
  { value: "washing_machine", label: "Washing Machine" },
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
