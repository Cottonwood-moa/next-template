import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// TODO 알맞게 변경 필요
export interface ApiResponse<T = unknown> {
  code: number;
  http_status_code: number;
  result: T;
  success: boolean;
  version: string;
}

// TODO 알맞게 변경 필요
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
  // 공통 에러코드 처리
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
        default:
          console.log(apiErrorRes.error);
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
