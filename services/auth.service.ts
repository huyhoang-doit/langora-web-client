import axiosInstance, { clearTokens, setTokens } from '@/config/axios';
import { ApiResponse } from '@/types/api';
import {
  AuthResponse,
  EmailVerificationPayload,
  ForgotPasswordPayload,
  LoginPayload,
  RefreshTokenPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from '@/types/auth';

export const AuthService = {
  login: async (payload: LoginPayload): Promise<ApiResponse<AuthResponse>> => {
    const response = await axiosInstance.post('/auth/login', payload);
    const data = response as unknown as ApiResponse<AuthResponse>;
    if (data.success && data.data && data.data.accessToken) {
      setTokens(data.data.accessToken, data.data.refreshToken);
    }
    return data;
  },

  register: async (payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> => {
    const response = await axiosInstance.post('/auth/register', payload);
    const data = response as unknown as ApiResponse<AuthResponse>;
    if (data.success && data.data && data.data.accessToken) {
      setTokens(data.data.accessToken, data.data.refreshToken);
    }
    return data;
  },

  refreshToken: async (payload: RefreshTokenPayload): Promise<ApiResponse<AuthResponse>> => {
    return axiosInstance.post('/auth/refresh-token', payload) as unknown as Promise<ApiResponse<AuthResponse>>;
  },

  verifyEmail: async (payload: EmailVerificationPayload): Promise<ApiResponse<null>> => {
    return axiosInstance.post('/email-verifications', payload) as unknown as Promise<ApiResponse<null>>;
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<ApiResponse<null>> => {
    return axiosInstance.post('/password-resets/request', payload) as unknown as Promise<ApiResponse<null>>;
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<ApiResponse<null>> => {
    return axiosInstance.post('/password-resets/reset', payload) as unknown as Promise<ApiResponse<null>>;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post('/auth/logout');
    clearTokens();
    return response as unknown as ApiResponse<null>;
  },
};
