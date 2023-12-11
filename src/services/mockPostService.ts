import useSWR from 'swr';
import useMutation from '@/hooks/useMutation';
import { AxiosError } from 'axios';
import { commonRequestGet, commonRequestPost } from '../axios/axiosRequest';

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

export interface MockAddPostError {
  message: string;
}

export interface MockAddPostBody {
  userId: number;
  title: string;
  body: string;
}

/**
 * @description mock post list
 */
export function useGetMockPost(params: { limit: number; skip: number }) {
  const { data, error, mutate } = useSWR<MockPostResponse, AxiosError<unknown>>(
    `${process.env.NEXT_PUBLIC_DUMMY}/posts?limit=${params.limit}&skip=${params.skip}`,
    commonRequestGet,
  );
  return {
    data,
    error: error?.response,
    isLoading: !data && !error,
    mutate,
  };
}

/**
 * @description mock post detail
 */
export function useGetMockPostDetail(params: { id: string }) {
  const { data, error, mutate } = useSWR<unknown, AxiosError<unknown>>(
    `${process.env.NEXT_PUBLIC_DUMMY}/posts/${params.id}`,
    commonRequestGet,
  );
  return {
    data,
    error: error?.response,
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
    MockAddPostError,
    MockAddPostBody
  >(`${process.env.NEXT_PUBLIC_DUMMY}/posts/add`, commonRequestPost);
  return { data, error, isLoading, mutation };
}
