/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AddOpportunityDTO,
  OpportunityResponseDTO,
} from "../../types/opportunities";
import { axiosInstance, ENDPOINTS, TBaseResponse } from "../axios";

export const OpportunitieService = {
  async getOpportunityById(
    id: number,
  ): Promise<TBaseResponse<OpportunityResponseDTO>> {
    return axiosInstance.get(ENDPOINTS.opportunities.getById(id));
  },

  async createOpportunity(
    row: AddOpportunityDTO,
  ): Promise<TBaseResponse<boolean>> {
    const BOOLEAN_FIELDS = ["elevator"]; // only real booleans

    const normalizedRow = Object.fromEntries(
      Object.entries(row).map(([key, value]) => {
        if (value == null) return [key, value];

        // ✅ only convert known boolean fields
        if (BOOLEAN_FIELDS.includes(key)) {
          if (value === "yes") return [key, true];
          if (value === "no") return [key, false];
          return [key, Boolean(value)];
        }

        if (Array.isArray(value)) {
          return [key, value.join(",")];
        }

        if (!isNaN(value as any) && value !== "") {
          return [key, Number(value)];
        }

        return [key, value];
      }),
    );

    return axiosInstance.post(ENDPOINTS.opportunities.create, normalizedRow);
  },
};
