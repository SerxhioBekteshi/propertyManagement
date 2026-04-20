import { BaseAuditableDTO } from "../database";

export interface PropertyFiltersDTO {
  businessType?: string; // Label: "Business Type" (Options: Sale/Rent)
  minPrice?: number; // Label: "Min Price"
  maxPrice?: number; // Label: "Max Price"
  bedrooms?: number; // Label: "Bedrooms"
  bathrooms?: number; // Label: "Bathrooms"

  // Row 2 in Image
  propertyType?: string; // Label: "Property Type"
  cityId?: number; // Label: "City"
  zoneId?: number; // Label: "Zone"
  availability?: string; // Label: "Availability"
  agentId?: number; // Label: "Assigned To" (Maps to DTO agentId)
  owner?: string; // Label: "Owner"

  // Sort Logic
  orderBy: "newest" | "oldest" | "price_asc" | "price_desc";
}

export type AddPropertyDTO = Omit<
  PropertyResponseDTO,
  | "id"
  | "agentId"
  | "agent"
  | "createdDateTime"
  | "createdBy"
  | "modifiedDateTime"
  | "modifiedBy"
  | "zone"
  | "division"
  | "city"
  | "imageUrls"
  | "mainImage"
  | "propertyOwnerId"
  | "properyOwner"
> & {
  images?: File[];
};

export type PropertyResponseDTO = BaseAuditableDTO & {
  id: number;

  // Core
  title: string;
  description: string;
  comments?: string;

  // Classification, property information
  status?: string;
  mainType?: string;
  availability?: string;
  furnished?: string;
  exclusive?: boolean;
  publishToPortal?: boolean;

  propertyType?: string;
  elevator?: boolean;
  beingLived?: boolean;
  parking?: boolean;
  portalsToPublish?: string;
  propertyOrientation?: "North" | "South" | "East" | "West";

  //Location
  country?: string;
  cityId?: number;
  cityName?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  divisionId?: number;
  divisionName?: string;
  zoneId?: number;
  zoneName?: string;
  floor?: number;
  publishGeoreference?: boolean;

  //Price, business type
  businessType: "sale" | "rent";
  price: number;
  priceForM2?: number;
  priceUponRequest?: boolean;

  // Areas
  interiorArea?: number;
  grossArea?: number;
  landArea?: number;
  balconyArea?: number;
  commonArea?: number;

  // Divisions
  bedrooms?: number;
  bathrooms?: number;
  otherRooms?: number;
  livingRoom?: number;

  //property Owner
  // owner?: string;
  agentId?: number;
  agent?: string;
  propertyOwnerId?: number;
  propertyOwner?: ProperyOwnerDTO;
  ownersTypology?: string;

  // Timeline and other Features
  documentation?: "yes" | "no" | "in_progress";
  communalCharger?: boolean;
  yearOfConstruction?: number;
  yearOfRenovation?: number;

  //More Features
  withViewTo?: string;
  equipment?: string;
  infrastructures?: string;
  surroundings?: string;

  imageUrls?: string[];
  mainImage?: string;
};

export interface ProperyOwnerDTO {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
  nationality?: string;
  assignedToId?: number;
  mainLeadSource?: string;
  ssn?: string;
}

export type CreatePropertyOwnerDTO = ProperyOwnerDTO;
