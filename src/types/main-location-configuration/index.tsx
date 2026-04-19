import { BaseAuditableDTO } from "../database";

export interface ZonesResponseDTO extends BaseAuditableDTO {
  id: number;
  name: string;
  city: string;
}

export interface CitiesResponseDTO extends BaseAuditableDTO {
  id: number;
  name: string;
  division: string;
}

export interface DivisionsResponseDTO extends BaseAuditableDTO {
  id: number;
  name: string;
  country: string;
}

export interface CreateCityDTO {
  name: string;
  divisionId: number;
}

export interface CreateZoneDTO {
  name: string;
  cityId: number;
}

export interface CreateDivionDTO {
  name: string;
  country: string;
}
