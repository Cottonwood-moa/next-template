import { AxiosResponse } from 'axios';

export interface UseMutationState<T, F> {
  isLoading: boolean;
  data?: T;
  error?: AxiosResponse<F>;
}
