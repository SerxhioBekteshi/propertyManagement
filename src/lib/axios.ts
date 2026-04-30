import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { eHttpResponse, eLocalStorage } from "../assets/enums";
import { enqueueSnackbar } from "notistack";

export interface IApiError {
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
      console.log(error, "ERROR");
      const statusCode = error.response?.status;

      if (
        statusCode === eHttpResponse.Unauthorized &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          await refreshAccessToken();
          return axiosInstance(originalRequest);
        } catch (_error) {
          clearSession(); // only clears on actual 401 + failed refresh
          return Promise.reject(_error);
        }
      }

      // Handle other errors — just show snackbar, no logout
      if (statusCode === eHttpResponse.InternalServerError) {
        enqueueSnackbar({
          variant: "error",
          message: "Something went wrong. Please try again later",
        });
      } else if (statusCode === eHttpResponse.NotFound) {
        enqueueSnackbar({ variant: "error", message: "Not Found" });
      } else if (statusCode !== eHttpResponse.Unauthorized) {
        enqueueSnackbar({
          variant: "error",
          message: (error.response?.data as IApiError)?.Errors ?? error.message,
        });
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
    getAll: "Property/get-all",
    create: `Property/create`,
    getById: (id: number) => `Property/${id}`,
    createOwner: "Property/create/owner",
    contacts: "Property/owners/get-all",
  },
  opportunities: {
    getAll(zoneName?: string) {
      return `Opportunity/get-all?zone=${zoneName}`;
    },
    create: `Opportunity/create`,
    getById: (id: number) => `Opportunity/${id}`,
  },
  locationConfigurationList: {
    cities(divisionId?: number) {
      return `List/cities/${divisionId ?? ""}`;
    },
    divisions(country?: string) {
      return `List/divisions/${country ?? ""}`;
    },
    zones(cityId?: number) {
      return `List/zones/${cityId ?? ""}`;
    },
    streets(zoneId?: number) {
      return `List/streets/${zoneId ?? ""}`;
    },
    agents: "/List/agents",
    propertyOwners: "/List/propertyOwners",
  },
  cities: {
    create: "City/create",
    getAll: "City/get-all",
  },
  zones: {
    create: "Zones/create",
    getAll: "Zones/get-all",
  },
  streets: {
    create: "Street/create",
    getAll: "Street/get-all",
  },
  division: {
    create: "Division/create",
    getAll: "Division/get-all",
  },
};
