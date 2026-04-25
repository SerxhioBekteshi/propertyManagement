import { BaseAuditableDTO } from "../database";
import { ProperyOwnerDTO } from "./propertyOwner";

export interface PropertyFiltersDTO {
  businessType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;

  // Row 2 in Image
  propertyType?: string;
  cityId?: number;
  zoneId?: number;
  availability?: string;
  agentId?: number;
  owner?: string;

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
  | "zoneName"
  | "divisionName"
  | "cityName"
  | "streetName"
  | "imageUrls"
  | "privateImageUrls"
  | "fileUrls"
  | "properyOwner"
> & {
  images?: File[];
  privateImages?: File[];
  files?: File[];
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

  streetId?: number;
  streetName?: string;

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

  bedrooms?: number;
  bathrooms?: number;
  otherRooms?: number;
  livingRoom?: number;

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
  privateImageUrls?: string[];
  fileUrls?: string[];

  mainImage?: File | null;
};
