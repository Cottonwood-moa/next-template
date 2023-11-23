import { AxiosRequestConfig } from 'axios';
import axiosInstance from './axiosInstance';

export const commonRequestGet = (
  url: string,
  config: AxiosRequestConfig = {},
) => {
  console.log('하이킥 fetcher', url, config);
  return axiosInstance.get(url, config).then((res) => res.data);
};

export const commonRequestPost = (
  url: string,
  body: unknown,
  config: AxiosRequestConfig = {},
) => {
  console.log('하이킥 fetcher', url, config);
  return axiosInstance.post(url, body, config).then((res) => res.data);
};

export const errorRequestGet = (url: string, config: AxiosRequestConfig = {}) => {
  console.log('하이킥 fetcher', url, config);
  return axiosInstance.get(url, config).then((res) => res.data);
};

