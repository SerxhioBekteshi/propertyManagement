import { IOption } from "../../types";
import {
  CreateCityDTO,
  CreateDivionDTO,
  CreateStreetDTO,
  CreateZoneDTO,
} from "../../types/location-configuration";
import { axiosInstance, ENDPOINTS, TBaseResponse } from "../axios";

export const LocationConfigurationService = {
  async getCities(
    divisionId?: number,
  ): Promise<TBaseResponse<IOption<number>[]>> {
    return axiosInstance.get(
      ENDPOINTS.locationConfigurationList.cities(divisionId),
    );
  },

  async getDivisions(
    country?: string,
  ): Promise<TBaseResponse<IOption<number>[]>> {
    return axiosInstance.get(
      ENDPOINTS.locationConfigurationList.divisions(country),
    );
  },

  async getZones(cityId?: number): Promise<TBaseResponse<IOption<number>[]>> {
    return axiosInstance.get(ENDPOINTS.locationConfigurationList.zones(cityId));
  },

  async getStreets(zoneId?: number): Promise<TBaseResponse<IOption<number>[]>> {
    return axiosInstance.get(
      ENDPOINTS.locationConfigurationList.streets(zoneId),
    );
  },

  async getAgents(): Promise<TBaseResponse<IOption<number>[]>> {
    return axiosInstance.get(ENDPOINTS.locationConfigurationList.agents);
  },

  async getPropertyOwners(): Promise<TBaseResponse<IOption<number>[]>> {
    return axiosInstance.get(
      ENDPOINTS.locationConfigurationList.propertyOwners,
    );
  },

  async addCity(payload: CreateCityDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.cities.create, payload);
  },

  async addZone(payload: CreateZoneDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.zones.create, payload);
  },

  async addStreet(payload: CreateStreetDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.streets.create, payload);
  },

  async addDivision(payload: CreateDivionDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.division.create, payload);
  },
};
