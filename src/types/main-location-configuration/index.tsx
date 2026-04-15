export interface ZonesResponseDTO {
  id: number;
  name: string;
  city: string;
  cityId: number;
}

export interface CitiesResponseDTO {
  id: number;
  name: string;
  division: string;
  divisionId: number;
}

export interface DivisionsResponseDTO {
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
