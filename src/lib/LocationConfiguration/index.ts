import { IOption } from "../../types";
import {
  CreateCityDTO,
  CreateDivionDTO,
  CreateZoneDTO,
} from "../../types/main-location-configuration";
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

  async getAgents(): Promise<TBaseResponse<IOption<number>[]>> {
    return axiosInstance.get(ENDPOINTS.locationConfigurationList.agents);
  },

  async addCity(payload: CreateCityDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.cities.create, payload);
  },

  async addZone(payload: CreateZoneDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.zones.create, payload);
  },

  async addDivision(payload: CreateDivionDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.division.create, payload);
  },
};
