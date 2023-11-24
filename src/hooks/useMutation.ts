import { useState } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseMutationState<T, F> {
  isLoading: boolean;
  data?: T;
  error?: AxiosResponse<F>;
}

export default function useMutation<T, F>(
  url: string,
  fetcher: (
    url: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>,
) {
  const [state, setState] = useState<UseMutationState<T, F>>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  async function mutation(body: unknown, config: AxiosRequestConfig = {}) {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetcher(url, body, config);
      const axiosResTypeAssertion = res as AxiosResponse<T>;
      setState((prev) => ({ ...prev, data: axiosResTypeAssertion.data }));
    } catch (error) {
      const axiosErrorTypeAssertion = error as AxiosError<F>;
      setState((prev) => ({
        ...prev,
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
