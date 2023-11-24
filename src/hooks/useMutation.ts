/**
 * @description useSwr과 유사한 훅
 * GET 이 외의 METHOD에 사용한다.
 * *useSwr 은 GET 전용
 * @generic T => 요청 성공시 data의 반환타입
 * @generic F => 요청 실패시 AxiosError 내부 data의 반환타입
 * @generic B => mutation의 body 타입
 * @param {url} => 요청 주소
 * @param {fetcher} => 요청 함수 axiosrequest.ts 파일 참조
 *
 * 추가) useSwr은 에러 발생시에도 UI 에 표시되는 데이터의 안전을 보장하기 때문에 error가 발생해도 이전 data는 유지되지만
 * 다른 method는 요청 성공/실패 flag가 명확해야 하기 때문에 둘 중 하나만 가질 수 있게끔 작성되었다.
 * 요청에 성공한다면 data 존재, 에러가 발생하면 error 가 존재
 */
import { useState } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseMutationState<T, F> {
  isLoading: boolean;
  data?: T;
  error?: AxiosResponse<F>;
}

export default function useMutation<T, F, B>(
  url: string,
  fetcher: (
    url: string,
    body: B,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>,
) {
  const [state, setState] = useState<UseMutationState<T, F>>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  async function mutation(body: B, config: AxiosRequestConfig = {}) {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetcher(url, body, config);
      const axiosResTypeAssertion = res as AxiosResponse<T>;
      setState((prev) => ({
        ...prev,
        data: axiosResTypeAssertion.data,
        error: undefined,
      }));
    } catch (error) {
      const axiosErrorTypeAssertion = error as AxiosError<F>;
      setState((prev) => ({
        ...prev,
        data: undefined,
        error: axiosErrorTypeAssertion.response,
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }

  return {
    data: state.data,
    error: state.error,
    isLoading: state.isLoading,
    mutation,
  };
}
