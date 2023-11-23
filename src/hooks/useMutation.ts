import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';

interface UseMutationState<T> {
  isLoading: boolean;
  data?: T;
  error?: object;
}

export default function useMutation<T>(
  url: string,
  fetcher: (url: string, body: unknown, config?: AxiosRequestConfig) => Promise<T>
) {
  const [state, setState] = useState<UseMutationState<T>>({
    isLoading: false,
    data: undefined,
    error: undefined,
  });

  async function mutation(body: unknown, config: AxiosRequestConfig = {}){
    console.log('하이킥 url', url, fetcher, body);
    setState((prev) => ({...prev, isLoading: true}));
    const res = await fetcher(url, body, config);
    setState((prev) => ({...prev, data: res, isLoading: false}));
    console.log('하이킥 useMutation res', res);
  }

  return {data: state.data, isLoading: state.isLoading, mutation};
}
