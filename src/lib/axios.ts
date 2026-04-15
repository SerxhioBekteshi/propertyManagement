import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { eHttpResponse, eLocalStorage } from "../assets/enums";
import { enqueueSnackbar } from "notistack";
// import { enqueueSnackbar } from "notistack";

interface IApiError {
  Result?: boolean;
  StatusCode?: number;
  Errors?: string;
}

export type TBaseResponse<T> = {
  data: T;
  result: boolean;
};

interface IAxiosRequestConfigRetry extends AxiosRequestConfig {
  _retry: boolean;
  _noAuth: boolean;
}

export const axiosInstance = Axios.create({
  baseURL: `${import.meta.env.VITE_APP_BACKEND_API_URL}api/`,
});

export const setHeaderToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const refreshAccessToken = async () => {
  const refreshTokenLS = localStorage.getItem(eLocalStorage.RefreshToken);
  if (!refreshTokenLS) {
    throw new Error("No refresh token in local storage");
  }

  try {
    const response: {
      accessToken: string;
      refreshToken: string;
    } = await axiosInstance.post(`${ENDPOINTS.token.refresh}`, {
      accessToken: localStorage.getItem(eLocalStorage.AccessToken),
      refreshToken: refreshTokenLS,
    });
    // if (response.status === 401) {
    //   clearSession();
    //   throw new Error("Refresh token expired or invalid");
    // }

    if (!response) {
      throw new Error("Failed to refresh token");
    }

    const { accessToken, refreshToken } = response;

    if (!accessToken) {
      clearSession();
      throw new Error("No access token received");
    }

    localStorage.setItem(eLocalStorage.AccessToken, accessToken);
    localStorage.setItem(eLocalStorage.RefreshToken, refreshToken);
    setHeaderToken(accessToken);
    return accessToken;
  } catch (err) {
    clearSession();
    throw err;
  }
};

export const clearSession = () => {
  window.location.href = "/";
};
export const removeHeaderToken = () => {
  //client.defaults.headers.common.Authorization = null;
  delete axiosInstance.defaults.headers.common.Authorization;
};

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem(eLocalStorage.AccessToken);
  if (accessToken && !config.headers.authorization) {
    config.headers.authorization = `Bearer ${accessToken}`;
  }
  config.headers.Accept = "application/json";
  return config;
};

axiosInstance.interceptors.request.use(authRequestInterceptor);

//handle 401 statuses and other
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error: AxiosError) => {
    const originalRequest: IAxiosRequestConfigRetry =
      error.config as IAxiosRequestConfigRetry;

    if (originalRequest._noAuth) {
      throw error.response;
    }
    if (error.response) {
      if (
        error.response &&
        error.response.status === eHttpResponse.Unauthorized &&
        !originalRequest._retry
        //  &&  !originalRequest.url?.includes("/oauth/token")
      ) {
        originalRequest._retry = true;

        try {
          await refreshAccessToken();
          return axiosInstance(originalRequest);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_error) {
          clearSession();
        }
      } else {
        const statusCode = error.response?.status;
        if (statusCode === eHttpResponse.InternalServerError)
          enqueueSnackbar({
            variant: "error",
            message: "Something went wrong. Please try again later",
          });
        else if (statusCode === eHttpResponse.NotFound)
          enqueueSnackbar({
            variant: "error",
            message: "Not Found",
          });
        else {
          enqueueSnackbar({
            variant: "error",
            message:
              (error.response?.data as IApiError)?.Errors ?? error.message,
          });
        }
      }
    }

    return Promise.reject(error);
  },
);

export const ENDPOINTS = {
  auth: {
    me: "Authentication/me",
    login: "Authentication/login",
  },
  token: {
    refresh: "token/refresh",
  },
  properties: {
    list: "Properties/get-all",
    create: `Properties/create`,
  },
};
