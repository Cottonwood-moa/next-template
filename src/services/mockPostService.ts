import useSWR from 'swr';
import useMutation from '@/hooks/useMutation';
import { AxiosError, AxiosResponse } from 'axios';
import { commonRequestGet, commonRequestPost } from './axios/axiosRequest';

export interface MockPostResponse {
  posts: MockPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface MockPost {
  id?: number;
  title: string;
  body: string;
  userId: number;
  tags?: string[];
  reactions?: number;
}

export interface MockAddPostResponse {
  body: string;
  id: number;
  title: string;
  userId: number;
}

/**
 * @description mock post list
 */
export function useGetMockPost() {
  const { data, error, mutate } = useSWR<MockPostResponse, AxiosError<unknown>>(
    'https://dummyjson.com/posts',
    commonRequestGet,
  );
  return {
    data,
    error: error?.response as AxiosResponse,
    isLoading: !data && !error,
    mutate,
  };
}

/**
 * @description mock post add
 */
export function usePostMockPost() {
  const { data, error, isLoading, mutation } = useMutation<
    MockAddPostResponse,
    { message: 'string' }
  >('https://dummyjson.com/posts/add', commonRequestPost);
  return { data, error, isLoading, mutation };
}
