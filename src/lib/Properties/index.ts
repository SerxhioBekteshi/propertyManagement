import { AddPropertyDTO, PropertyResponseDTO } from "../../types/properties";
import { axiosInstance, ENDPOINTS, TBaseResponse } from "../axios";

export const PropertiesService = {
  async getProperties(): Promise<TBaseResponse<PropertyResponseDTO[]>> {
    return axiosInstance.get(ENDPOINTS.properties.getAll);
  },

  async getPropertyById(
    id: number,
  ): Promise<TBaseResponse<PropertyResponseDTO>> {
    return axiosInstance.get(ENDPOINTS.properties.getById(id));
  },

  async createProperty(row: AddPropertyDTO): Promise<TBaseResponse<boolean>> {
    const formData = new FormData();

    Object.entries(row).forEach(([key, value]) => {
      if (key === "images") return;
      if (value === undefined || value === null) return;

      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, String(value));
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    row.images?.forEach((item: any) => {
      formData.append("images", item.file);
    });
    return axiosInstance.post(ENDPOINTS.properties.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
