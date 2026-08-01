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

export interface LoginHistory {
  id: string;
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  failureReason?: string;
  loggedAt: string; // ISO 8601 string
}

export interface UserPreference {
  id: string;
  theme: 'LIGHT' | 'DARK' | 'SYSTEM';
  languageUi: string;
  timezone: string;
  emailNotificationEnabled: boolean;
  pushNotificationEnabled: boolean;
  reminderEnabled: boolean;
  updatedAt: string;
}

export interface UserPreferenceUpdateRequest {
  theme?: string;
  languageUi?: string;
  timezone?: string;
  emailNotificationEnabled?: boolean;
  pushNotificationEnabled?: boolean;
  reminderEnabled?: boolean;
}

export interface UserDevice {
  id: string;
  deviceType: 'MOBILE' | 'TABLET' | 'WEB';
  deviceToken: string;
  deviceName?: string;
  operatingSystem?: string;
  appVersion?: string;
  isActive: boolean;
  lastActiveAt: string;
}

export interface UserDeviceRegisterRequest {
  deviceToken: string;
  deviceType?: 'MOBILE' | 'TABLET' | 'WEB';
  deviceName?: string;
  operatingSystem?: string;
  appVersion?: string;
}

export interface UserLearningProfile {
  id: string;
  targetLanguageId?: string;
  currentLevelId?: string;
  learningGoal?: 'HOBBY' | 'CAREER' | 'TRAVEL' | 'EDUCATION';
  targetExam?: string;
  dailyGoalMinutes?: number;
  dailyGoalWords?: number;
  proficiency?: 'BEGINNER' | 'ELEMENTARY' | 'INTERMEDIATE' | 'UPPER_INTERMEDIATE' | 'ADVANCED';
  startDate?: string;
  isActive: boolean;
  updatedAt: string;
}

export interface UserLearningProfileUpdateRequest {
  targetLanguageId?: string;
  currentLevelId?: string;
  learningGoal?: 'HOBBY' | 'CAREER' | 'TRAVEL' | 'EDUCATION';
  targetExam?: string;
  dailyGoalMinutes?: number;
  dailyGoalWords?: number;
}

export interface UserLearningGoal {
  id: string;
  targetLanguageId?: string;
  goalTitle?: string;
  targetWords?: number;
  targetLessons?: number;
  targetDays?: number;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  completed: boolean;
  updatedAt: string;
}

export interface UserLearningGoalUpdateRequest {
  targetLanguageId?: string;
  goalTitle?: string;
  targetWords?: number;
  targetLessons?: number;
  targetDays?: number;
  startDate?: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
}
