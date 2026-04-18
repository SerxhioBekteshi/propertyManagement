import { LookupRepositoryDTO, PagedListResponse } from "../../types";
import { axiosInstance } from "../axios";

export class BaseTableService {
  static async getAllItems<T>(
    controller: string,
    body: LookupRepositoryDTO,
  ): Promise<PagedListResponse<T>> {
    return axiosInstance.post(controller, body);
  }
}
