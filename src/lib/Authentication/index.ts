import { TLoginPayload, TLoginResponse, TUserResponse } from "../../types/auth";
import { axiosInstance, ENDPOINTS } from "../axios";

export const AuthenticationService = {
  async login(params: TLoginPayload): Promise<TLoginResponse> {
    const res = await axiosInstance.post(ENDPOINTS.auth.login, params);
    return res.data;
  },

  async getMe(): Promise<TUserResponse> {
    const res = await axiosInstance.get(ENDPOINTS.auth.me);
    return res.data;
  },
};
