export interface WritingTopic {
  id: string;
  title: string;
  description?: string;
  levelId?: string;
  languageId: string;
  imageUrl?: string;
  isActive: boolean;
  displayOrder: number;
}

export interface WritingContentType {
  id: string;
  code: string; // VD: ESSAY, EMAIL, STORY
  name: string;
  iconUrl?: string;
  description?: string;
  displayOrder: number;
}

export interface WritingExercise {
  id: string;
  topicId: string;
  contentTypeId: string;
  title: string;
  description?: string;
  scenario?: string;
  timeLimitMinutes?: number;
  wordCountTarget?: number;
  totalSentences: number;
  levelId: string;
  sentences?: WritingExerciseSentence[];
}

export interface WritingExerciseSentence {
  id: string;
  exerciseId: string;
  originalText: string;
  translation?: string;
  hint?: string;
  orderIndex: number;
}

export interface WritingSession {
  id: string;
  userId: string;
  exerciseId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  startedAt: string;
  completedAt?: string;
  score?: number;
  exercise?: WritingExercise;
  answers?: any[];
}

export interface SentenceAnswerRequest {
  sentenceId: string;
  userAnswer: string;
  timeSpentSeconds?: number;
}

export interface WritingAiFeedback {
  id: string;
  sessionId: string;
  sentenceId: string;
  overallScore: number;
  grammarScore: number;
  vocabularyScore: number;
  coherenceScore: number;
  feedbackText: string;
  corrections?: any; // JSON
}

export interface WritingAchievement {
  id: string;
  userId: string;
  achievementType: string;
  title: string;
  description?: string;
  unlockedAt: string;
}
