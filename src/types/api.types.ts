export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  error?: string;
  detail?: string;
}

export interface PaginationInfo {
  total: number;
  limit: number;
  offset?: number;
  returned?: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination: PaginationInfo;
}
