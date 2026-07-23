import { IOption } from "../../types";
import {
  CreateUpdateCityDTO,
  CreateUpdateZoneDTO,
  CreateUpdateStreetDTO,
  CreateUpdateDivisionDTO,
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

  async addCity(payload: CreateUpdateCityDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.cities.create, payload);
  },

  async updateCity(
    id: number,
    payload: CreateUpdateCityDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.put(ENDPOINTS.cities.update(id), payload);
  },

  async addZone(payload: CreateUpdateZoneDTO): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.zones.create, payload);
  },

  async updateZone(
    id: number,
    payload: CreateUpdateZoneDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.put(ENDPOINTS.zones.update(id), payload);
  },

  async addStreet(
    payload: CreateUpdateStreetDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.streets.create, payload);
  },

  async updateStreet(
    id: number,
    payload: CreateUpdateStreetDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.put(ENDPOINTS.streets.update(id), payload);
  },

  async addDivision(
    payload: CreateUpdateDivisionDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.division.create, payload);
  },

  async updateDivision(
    id: number,
    payload: CreateUpdateDivisionDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.put(ENDPOINTS.division.update(id), payload);
  },
};
