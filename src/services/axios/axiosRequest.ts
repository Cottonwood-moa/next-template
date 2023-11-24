import { AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';

export const commonRequestGet = (
  url: string,
  config: AxiosRequestConfig = {},
) => axiosInstance.get(url, config).then((res) => res.data);

export const commonRequestPost = (
  url: string,
  body: unknown,
  config: AxiosRequestConfig = {},
) => axiosInstance.post(url, body, config);
