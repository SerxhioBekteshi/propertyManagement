import { IOption } from "../../assets/enums/constants/property";
import {
  CreateCityDTO,
  CreateDivionDTO,
  CreateZoneDTO,
} from "../../types/main-location-configuration";
import { axiosInstance, ENDPOINTS, TBaseResponse } from "../axios";

export const LocationConfigurationService = {
  async getCities(): Promise<TBaseResponse<IOption[]>> {
    const res = await axiosInstance.get(
      ENDPOINTS.locationConfigurationList.cities,
    );
    return res.data;
  },

  async getDivisions(): Promise<TBaseResponse<IOption[]>> {
    const res = await axiosInstance.get(
      ENDPOINTS.locationConfigurationList.divisions,
    );
    return res.data;
  },

  async addCity(payload: CreateCityDTO): Promise<TBaseResponse<boolean>> {
    const res = await axiosInstance.post(ENDPOINTS.cities.create, payload);
    return res.data;
  },

  async addZone(payload: CreateZoneDTO): Promise<TBaseResponse<boolean>> {
    const res = await axiosInstance.post(ENDPOINTS.zones.create, payload);
    return res.data;
  },

  async addDivision(payload: CreateDivionDTO): Promise<TBaseResponse<boolean>> {
    const res = await axiosInstance.post(ENDPOINTS.division.create, payload);
    return res.data;
  },
};
