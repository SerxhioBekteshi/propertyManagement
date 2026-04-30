import { BaseAuditableDTO } from "../database";

export type OpportunityResponseDTO = BaseAuditableDTO & {
  id: number;

  title?: string;
  amount?: number;

  propertyOwnerId?: number;
  propertyOwnerName?: string | null;

  agentId?: number;
  agentName?: string | null;

  salesStage?: string;
  country?: string;

  cityId?: number;
  cityName?: string | null;

  priceFrom?: number;
  businessType?: string;
  availability?: string;
  paymentType?: string;
  mainLeadSource?: string;
  leadSource?: string;
  expectedCloseDate?: string; // ISO date string

  divisionId?: number;
  divisionName?: string | null;

  zoneId?: number;
  zoneName?: string | null;

  priceTo?: number;
  propertyType?: string;
  documentation?: string;

  description?: string;
  rentalTime?: string;

  floor?: number;
  furnished?: string;
  elevator?: boolean;

  //More Features
  withViewTo?: string;
  equipment?: string;
  infrastructures?: string;
  surroundings?: string;

  bedroomsFrom?: number;
  bedroomsTo?: number;
  bathroomsFrom?: number;
  bathroomsTo?: number;
  minimalArea?: number;
  maximalArea?: number;
};

export type AddOpportunityDTO = Omit<
  OpportunityResponseDTO,
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
  | "propertyOwnerName"
> & {};
