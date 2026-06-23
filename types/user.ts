export interface Profile {
  id: string;
  email: string;
  fullName?: string;
  displayName?: string;
  avatarUrl?: string;
  dateOfBirth?: string;
  gender?: string;
  countryCode?: string;
  timezone?: string;
  bio?: string;
  roles: string[];
  permissions: string[];
}

export interface UserPreferencesPayload {
  theme: string;
  language: string;
}

export interface UserDevicePayload {
  deviceToken: string;
  deviceType: 'IOS' | 'ANDROID' | 'WEB';
}

export interface UserLearningGoalPayload {
  targetLevel: string;
  dailyGoalMinutes: number;
}
