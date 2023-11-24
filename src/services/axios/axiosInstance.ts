import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export interface ApiResponse<T = unknown> {
  code: number;
  http_status_code: number;
  result: T;
  success: boolean;
  version: string;
}

export interface ApiErrorResponse {
  error: boolean;
  error_code: number;
  http_status_code: number;
  error_message: string;
  message: string;
  version: string;
}

const axiosInstance = axios.create({
  // baseURL: import.meta.env.BASE_URL
});

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    console.log('axios instance config', config);
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const apiErrorRes = error.response?.data as ApiErrorResponse;

    if (apiErrorRes?.error) {
      switch (apiErrorRes.http_status_code) {
        case 200:
          break;
        case 201:
          break;
        case 202:
          break;
        case 203:
          break;
        default:
          console.log(apiErrorRes.error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;