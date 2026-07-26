/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddUpdatePropertyDTO,
  PropertyResponseDTO,
} from "../../types/properties";
import { CreateUpdatePropertyOwnerDTO } from "../../types/properties/propertyOwner";
import { axiosInstance, ENDPOINTS, TBaseResponse } from "../axios";

export const PropertiesService = {
  async getProperties(): Promise<TBaseResponse<PropertyResponseDTO[]>> {
    return axiosInstance.get(ENDPOINTS.properties.getAll);
  },

  async createPropertyOwner(
    payload: CreateUpdatePropertyOwnerDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.post(ENDPOINTS.properties.createOwner, payload);
  },

  async updatePropertyOwner(
    id: number,
    payload: CreateUpdatePropertyOwnerDTO,
  ): Promise<TBaseResponse<boolean>> {
    return axiosInstance.put(ENDPOINTS.properties.updateOwner(id), payload);
  },

  async getPropertyById(
    id: number,
  ): Promise<TBaseResponse<PropertyResponseDTO>> {
    return axiosInstance.get(ENDPOINTS.properties.getById(id));
  },

  async createProperty(
    row: AddUpdatePropertyDTO,
  ): Promise<TBaseResponse<boolean>> {
    const formData = new FormData();

    Object.entries(row).forEach(([key, value]) => {
      if (
        key === "imageUrls" ||
        key === "privateImageUrls" ||
        key === "files" ||
        key === "mainImage"
      )
        return;
      if (value === undefined || value === null) return;

      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, String(value));
      }
    });
    if (row.mainImage) {
      formData.append("mainImage", row.mainImage);
    }
    row.imageUrls?.forEach((item: any) => {
      formData.append("imageUrls", item.file);
    });
    row.privateImageUrls?.forEach((item: any) => {
      formData.append("privateImageUrls", item.file);
    });
    row.files?.forEach((item: any) => {
      formData.append("files", item.file);
    });
    return axiosInstance.post(ENDPOINTS.properties.create, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  async updateProperty(
    id: number,
    row: AddUpdatePropertyDTO,
  ): Promise<TBaseResponse<boolean>> {
    const formData = new FormData();

    Object.entries(row).forEach(([key, value]) => {
      if (
        key === "imageUrls" ||
        key === "privateImageUrls" ||
        key === "files" ||
        key === "mainImage"
      )
        return;
      if (value === undefined || value === null) return;

      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, String(value));
      }
    });
    if (row.mainImage) {
      formData.append("mainImage", row.mainImage);
    }
    row.imageUrls?.forEach((item: any) => {
      formData.append("imageUrls", item.file);
    });
    row.privateImageUrls?.forEach((item: any) => {
      formData.append("privateImageUrls", item.file);
    });
    row.files?.forEach((item: any) => {
      formData.append("files", item.file);
    });
    return axiosInstance.put(ENDPOINTS.properties.update(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
