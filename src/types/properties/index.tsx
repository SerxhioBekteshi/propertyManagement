export interface PropertyFiltersDTO {
  // Row 1 in Image
  id?: string; // Label: "Reference" (Maps to Property ID)
  businessType: string; // Label: "Business Type" (Options: Sale/Rent)
  minPrice: string; // Label: "Min Price"
  maxPrice: string; // Label: "Max Price"
  bedrooms: string; // Label: "Bedrooms"
  bathrooms: string; // Label: "Bathrooms"

  // Row 2 in Image
  propertyType: string; // Label: "Property Type"
  city: string; // Label: "City"
  zone: string; // Label: "Zone"
  availability: string; // Label: "Availability"
  agentId: string; // Label: "Assigned To" (Maps to DTO agentId)
  owner: string; // Label: "Owner"

  // Sort Logic
  orderBy: "newest" | "oldest" | "price_asc" | "price_desc";
}

export type AddPropertyDTO = Omit<
  PropertyResponseDTO,
  "id" | "agentId" | "lastModifiedBy"
>;

export type PropertyResponseDTO = {
  id: number;

  // Core
  title: string;
  description: string;
  comments?: string;

  // Classification, property information
  status: string;
  mainType: string;
  availability: string;
  furnished: string;
  exclusive: boolean;
  publishToPortal: boolean;

  propertyType: string;
  elevator: "yes" | "no";
  beingLived: "yes" | "no";
  parking: "yes" | "no";
  portalsToPublish: string[];
  propertyOrientation: "North" | "South" | "East" | "West";

  //Location
  country: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  division?: string;
  zone?: string;
  floor?: number;
  publishGeoreference: boolean;

  //Price, business type
  businessType: "sale" | "rent";
  price: number;
  priceForM2?: number;
  priceUponRequest: boolean;

  // Areas
  interiorArea?: number;
  grossArea?: number;
  landArea?: number;
  balconyArea?: number;
  commonArea?: number;

  // Divisions
  bedrooms: number;
  bathrooms: number;
  otherRooms: number;
  livingRoom: number;

  //property Owner
  owner: string;
  agentId: string;
  ownersTypology: string;

  // Timeline and other Features
  documentation: "yes" | "no" | "in_progress";
  communalCharger?: "yes" | "no";
  yearOfConstruction?: number;
  yearOfRenovation?: number;

  //surroundings
  // withViewTo: string;
  // equipment: string;

  // System
  lastModifiedBy: string;
};
