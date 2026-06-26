import axiosInstance from '@/config/axios';
import { ApiResponse } from '@/types/api';
import {
  Profile,
  UserPreference,
  UserPreferenceUpdateRequest,
  UserDevice,
  UserDeviceRegisterRequest,
  UserLearningProfile,
  UserLearningProfileUpdateRequest,
  UserLearningGoal,
  UserLearningGoalUpdateRequest,
} from '@/types/user';

export const UserService = {
  // --- Profile ---
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

  // --- Preferences ---
  getPreferences: async (): Promise<ApiResponse<UserPreference>> => {
    return axiosInstance.get('/user-preferences/me') as unknown as Promise<ApiResponse<UserPreference>>;
  },

  updatePreferences: async (payload: UserPreferenceUpdateRequest): Promise<ApiResponse<UserPreference>> => {
    return axiosInstance.put('/user-preferences/me', payload) as unknown as Promise<ApiResponse<UserPreference>>;
  },

  // --- Devices ---
  getDevices: async (): Promise<ApiResponse<UserDevice[]>> => {
    return axiosInstance.get('/user-devices') as unknown as Promise<ApiResponse<UserDevice[]>>;
  },

  registerDevice: async (payload: UserDeviceRegisterRequest): Promise<ApiResponse<UserDevice>> => {
    return axiosInstance.post('/user-devices', payload) as unknown as Promise<ApiResponse<UserDevice>>;
  },

  // --- Learning Profiles ---
  getLearningProfile: async (): Promise<ApiResponse<UserLearningProfile>> => {
    return axiosInstance.get('/user-learning-profiles/me') as unknown as Promise<ApiResponse<UserLearningProfile>>;
  },

  updateLearningProfile: async (payload: UserLearningProfileUpdateRequest): Promise<ApiResponse<UserLearningProfile>> => {
    return axiosInstance.put('/user-learning-profiles/me', payload) as unknown as Promise<ApiResponse<UserLearningProfile>>;
  },

  // --- Learning Goals ---
  getLearningGoals: async (): Promise<ApiResponse<UserLearningGoal>> => {
    return axiosInstance.get('/user-learning-goals/me') as unknown as Promise<ApiResponse<UserLearningGoal>>;
  },

  updateLearningGoals: async (payload: UserLearningGoalUpdateRequest): Promise<ApiResponse<UserLearningGoal>> => {
    return axiosInstance.put('/user-learning-goals/me', payload) as unknown as Promise<ApiResponse<UserLearningGoal>>;
  },
};
