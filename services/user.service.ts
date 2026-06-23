import axiosInstance from '@/config/axios';
import { ApiResponse } from '@/types/api';
import {
  Profile,
  UserDevicePayload,
  UserLearningGoalPayload,
  UserPreferencesPayload,
} from '@/types/user';

export const UserService = {
  getProfile: async (): Promise<ApiResponse<Profile>> => {
    return axiosInstance.get('/user-profiles/me') as unknown as Promise<ApiResponse<Profile>>;
  },

  updateProfile: async (payload: Partial<Profile>): Promise<ApiResponse<Profile>> => {
    return axiosInstance.put('/user-profiles/me', payload) as unknown as Promise<ApiResponse<Profile>>;
  },

  updateAvatar: async (file: File): Promise<ApiResponse<Profile>> => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.put('/user-profiles/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }) as unknown as Promise<ApiResponse<Profile>>;
  },

  updatePreferences: async (payload: UserPreferencesPayload): Promise<ApiResponse<null>> => {
    return axiosInstance.put('/user-preferences/me', payload) as unknown as Promise<ApiResponse<null>>;
  },

  registerDevice: async (payload: UserDevicePayload): Promise<ApiResponse<null>> => {
    return axiosInstance.post('/user-devices', payload) as unknown as Promise<ApiResponse<null>>;
  },

  updateLearningGoals: async (payload: UserLearningGoalPayload): Promise<ApiResponse<null>> => {
    return axiosInstance.put('/user-learning-goals/me', payload) as unknown as Promise<ApiResponse<null>>;
  },
};
