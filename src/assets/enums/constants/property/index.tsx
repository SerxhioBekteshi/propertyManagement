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

export const PROPERTY_VIEW_OPTIONS = withDefault([
  { value: "sea", label: "Sea" },
  { value: "lake", label: "Lake" },
  { value: "mountains", label: "Mountains" },
  { value: "river", label: "River" },
  { value: "city", label: "City" },
  { value: "beach", label: "Beach" },
  { value: "countryside", label: "Countryside" },
  { value: "garden", label: "Garden" },
  { value: "dam", label: "Dam" },
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
  { value: "coldCall", label: "Cold Call" },
  { value: "socialMedia", label: "Social Media" },
  { value: "c21Website", label: "C21 Website" },
  { value: "century21Master", label: "Century 21 Master" },
  { value: "portals", label: "Portals" },
  { value: "office", label: "Office" },
  { value: "offlineMarketing", label: "Offline Marketing" },
  { value: "soi", label: "Sphere of Influence" },
  { value: "outdoorProspecting", label: "Outdoor Prospecting" },
  { value: "brokerContacts", label: "Broker Contacts" },
]);
