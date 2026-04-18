import { AddPropertyDTO, PropertyResponseDTO } from "../../types/properties";
import { axiosInstance, ENDPOINTS, TBaseResponse } from "../axios";

export const PropertiesService = {
  async getProperties(): Promise<TBaseResponse<PropertyResponseDTO[]>> {
    return await axiosInstance.get(ENDPOINTS.properties.getAll);
  },

  async createProperty(row: AddPropertyDTO): Promise<TBaseResponse<boolean>> {
    return await axiosInstance.post(ENDPOINTS.properties.create, row);
  },
};
