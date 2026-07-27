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
    mainImageIntoImageUrls?: boolean,
  ): Promise<TBaseResponse<PropertyResponseDTO>> {
    return axiosInstance.get(
      ENDPOINTS.properties.getById(id, mainImageIntoImageUrls),
    );
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
    row.fileUrls?.forEach((item: any) => {
      formData.append("fileUrls", item.file);
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

    const fileFields = new Set([
      "imageUrls",
      "privateImageUrls",
      "fileUrls",
      "existingImageUrls",
      "existingPrivateImageUrls",
      "existingFileUrls",
      "mainImage",
    ]);

    Object.entries(row).forEach(([key, value]) => {
      if (fileFields.has(key)) return;
      if (value === undefined || value === null) return;

      if (typeof value === "boolean") {
        formData.append(key, value ? "true" : "false");
      } else {
        formData.append(key, String(value));
      }
    });

    if (row.mainImage && typeof row.mainImage !== "string") {
      formData.append("mainImage", row.mainImage as File);
    }
    // new uploads — plain File[] now, no wrapper
    row.imageUrls?.forEach((file: File) => {
      formData.append("imageUrls", file);
    });
    row.privateImageUrls?.forEach((file: File) => {
      formData.append("privateImageUrls", file);
    });
    row.fileUrls?.forEach((file: File) => {
      formData.append("fileUrls", file);
    });

    // existing URLs to keep — repeated keys, binds to List<string> on the backend
    row.existingImageUrls?.forEach((url: string) => {
      formData.append("existingImageUrls", url);
    });
    row.existingPrivateImageUrls?.forEach((url: string) => {
      formData.append("existingPrivateImageUrls", url);
    });
    row.existingFileUrls?.forEach((url: string) => {
      formData.append("existingFileUrls", url);
    });

    return axiosInstance.put(ENDPOINTS.properties.update(id), formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};
