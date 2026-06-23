export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  meta: any | null;
  errors: any[] | null;
  timestamp: string;
}
export interface PageMeta {
  page: number;
  limit: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PageMeta;
  message?: string;
}
