export interface LoginPayload {
  email: string;
  password?: string;
}

export interface GoogleLoginPayload {
  idToken: string;
  targetLanguageId?: string;
  currentLevelId?: string;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  fullName: string;
  targetLanguageId?: string;
  currentLevelId?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  authenticated: boolean;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface EmailVerificationPayload {
  token: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword?: string;
}
