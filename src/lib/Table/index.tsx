import { axiosInstance } from "../axios";

export const BaseTableService = {
  async getAllItems<T>(
    controller: string,
    page = 1,
    size = 10,
    filters: Record<string, string> = {},
  ): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams({
      PageNumber: String(page),
      PageSize: String(size),
      ...filters,
    });
    const response = await axiosInstance.post(`/v1/${controller}?${params}`);
    return response;
  },
};
