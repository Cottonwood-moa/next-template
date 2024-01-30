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