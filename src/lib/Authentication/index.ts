import { TLoginPayload, TLoginResponse, TUserResponse } from "../../types/auth";
import { axiosInstance, ENDPOINTS } from "../axios";

export const AuthenticationService = {
  async login(params: TLoginPayload): Promise<TLoginResponse> {
    return axiosInstance.post(ENDPOINTS.auth.login, params);
  },

  async getMe(): Promise<TUserResponse> {
    return axiosInstance.get(ENDPOINTS.auth.me);
  },
};
