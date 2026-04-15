import { PropertyResponseDTO } from "../../types/database";
import { AddPropertyDTO } from "../../types/properties";
import { axiosInstance, ENDPOINTS, TBaseResponse } from "../axios";

export const PropertiesService = {
  async getProperties(): Promise<TBaseResponse<PropertyResponseDTO[]>> {
    const res = await axiosInstance.get(ENDPOINTS.properties.list);
    return res.data;
  },

  async createStory(row: AddPropertyDTO): Promise<boolean> {
    const res = await axiosInstance.post(ENDPOINTS.properties.create, row);
    return res.data;
  },
};
