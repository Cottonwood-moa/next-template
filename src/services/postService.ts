import { AxiosRequestConfig } from 'axios';
import useSWR from 'swr';
import useMutation from '@/hooks/useMutation';
import { commonRequestGet, commonRequestPost } from './axios/axiosRequest';

interface Post {
  id: string;
  title: string;
  content: string;
  tag: string[];
}
/**
 * @description 포스트 리스트를 반환한다.
 * params를 컴포넌트 state로 관리하면 state가 변경되면 usePost 가 호출된다.
 */
export function useGetPost(
  params: { page: number },
  config: AxiosRequestConfig = {},
) {
  const { data, error, mutate } = useSWR<Post>(
    [`/api/post?page=${params.page}`, config],
    commonRequestGet,
  );
  return { data, isLoading: !data && !error, mutate };
}

/**
 * @param {{id: string}} paths 경로에 들어갈 요청 값
 * @returns 포스트 상세 정보를 반환한다.
 */
export function useGetPostDetail(paths: { id: number }) {
  const { data, error, mutate } = useSWR<unknown>(
    [`/api/post/${paths.id}`],
    commonRequestGet,
  );
  return { user: data, isLoading: !data && !error, mutate };
}
