import axiosInstance from '@/config/axios';
import { ApiResponse } from '@/types/api';
import { Language, Level } from '@/types/learning';

export const learningService = {
  getLanguages: async (): Promise<ApiResponse<Language[]>> => {
    return axiosInstance.get('/languages') as unknown as Promise<ApiResponse<Language[]>>;
  },
  
  getLevels: async (languageId?: string): Promise<ApiResponse<Level[]>> => {
    return axiosInstance.get('/levels', { params: { languageId } }) as unknown as Promise<ApiResponse<Level[]>>;
  }
};
