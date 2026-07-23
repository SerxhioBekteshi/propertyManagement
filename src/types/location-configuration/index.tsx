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

export interface StreetsResponseDTO extends BaseAuditableDTO {
  id: number;
  name: string;
  zone: string;
}

export interface CreateUpdateCityDTO {
  name: string;
  divisionId: number;
}

export interface CreateUpdateZoneDTO {
  name: string;
  cityId: number;
}

export interface CreateUpdateDivisionDTO {
  name: string;
  country: string;
}

export interface CreateUpdateStreetDTO {
  name: string;
  zoneId: number | null | undefined;
}
