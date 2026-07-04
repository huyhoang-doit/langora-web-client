import axiosInstance from '@/config/axios';
import { ApiResponse } from '@/types/api';
import {
  WritingTopic, WritingContentType, WritingExercise, WritingSession,
  SentenceAnswerRequest, WritingAiFeedback, WritingAchievement
} from '@/types/writing';

export const writingService = {
  // --- Master Data ---
  getTopics: async (languageId: string, levelId?: string): Promise<ApiResponse<WritingTopic[]>> => {
    return axiosInstance.get(`/languages/${languageId}/writing-topics`, { params: { levelId } }) as unknown as Promise<ApiResponse<WritingTopic[]>>;
  },

  getContentTypes: async (languageId: string): Promise<ApiResponse<WritingContentType[]>> => {
    return axiosInstance.get(`/languages/${languageId}/writing-content-types`) as unknown as Promise<ApiResponse<WritingContentType[]>>;
  },

  // --- Exercises ---
  getExercises: async (languageId: string, levelId?: string, topicId?: string, contentTypeId?: string): Promise<ApiResponse<WritingExercise[]>> => {
    return axiosInstance.get(`/languages/${languageId}/writing-exercises`, { params: { topicId, contentTypeId, levelId } }) as unknown as Promise<ApiResponse<WritingExercise[]>>;
  },

  getExerciseById: async (languageId: string, id: string): Promise<ApiResponse<WritingExercise>> => {
    return axiosInstance.get(`/languages/${languageId}/writing-exercises/${id}`) as unknown as Promise<ApiResponse<WritingExercise>>;
  },

  // --- Sessions (Làm bài) ---
  createSession: async (exerciseId: string): Promise<ApiResponse<WritingSession>> => {
    return axiosInstance.post('/writing-sessions', { exerciseId }) as unknown as Promise<ApiResponse<WritingSession>>;
  },

  getSessionById: async (sessionId: string): Promise<ApiResponse<WritingSession>> => {
    return axiosInstance.get(`/writing-sessions/${sessionId}`) as unknown as Promise<ApiResponse<WritingSession>>;
  },

  updateSession: async (sessionId: string, data: any): Promise<ApiResponse<WritingSession>> => {
    return axiosInstance.put(`/writing-sessions/${sessionId}`, data) as unknown as Promise<ApiResponse<WritingSession>>;
  },

  submitSession: async (sessionId: string): Promise<ApiResponse<WritingSession>> => {
    return axiosInstance.post(`/writing-sessions/${sessionId}/submit`) as unknown as Promise<ApiResponse<WritingSession>>;
  },

  // --- Answers & Feedback ---
  submitSentenceAnswer: async (sessionId: string, data: SentenceAnswerRequest): Promise<ApiResponse<any>> => {
    return axiosInstance.post(`/writing-sessions/${sessionId}/sentence-answers`, data) as unknown as Promise<ApiResponse<any>>;
  },

  getAiFeedbacks: async (sessionId: string): Promise<ApiResponse<WritingAiFeedback[]>> => {
    return axiosInstance.get(`/writing-sessions/${sessionId}/ai-feedbacks`) as unknown as Promise<ApiResponse<WritingAiFeedback[]>>;
  },

  // --- Achievements ---
  getMyAchievements: async (): Promise<ApiResponse<WritingAchievement[]>> => {
    return axiosInstance.get('/writing-achievements/me') as unknown as Promise<ApiResponse<WritingAchievement[]>>;
  }
};
