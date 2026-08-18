export interface WritingTopic {
  id: string;
  name: string;
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
  languageId: string;
  topicId: string;
  topicName?: string;
  contentTypeId: string;
  contentTypeName?: string;
  title: string;
  description?: string;
  summary?: string | null;
  content?: string;
  thumbnailUrl?: string | null;
  levelName?: string;
  scenario?: string;
  timeLimitMinutes?: number;
  estimatedMinutes?: number | null;
  wordCountTarget?: number;
  totalSentences: number;
  creditsReward?: number;
  xpReward?: number;
  levelId: string;
  isActive?: boolean;
  sentences?: WritingExerciseSentenceResponse[];
}

export interface WritingExerciseSentence {
  id: string;
  exerciseId: string;
  originalText: string;
  content?: string; // Tạm thời để support code cũ
  translation?: string;
  hint?: string;
  suggestions?: {
    vocab?: string[];
    grammar?: string[];
  };
  orderIndex: number;
}

export interface WritingExerciseSentenceResponse {
  id: string;
  exerciseId: string;
  sentenceOrder: number;
  sourceText: string;
  targetText: string;
  vocabularyHints: string[];
  grammarHints: string[];
  difficultyScore: number;
  createdAt: string;
  updatedAt: string;
}

export interface WritingSession {
  id: string;
  userId: string;
  exerciseId: string;
  status: 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED';
  startedAt: string;
  completedAt?: string;
  totalScore?: number;
  grammarScore?: number;
  vocabularyScore?: number;
  fluencyScore?: number;
  accuracyScore?: number;
  submittedAt?: string;
  exercise?: WritingExercise;
  answers?: any[];
}

export interface SentenceAnswerRequest {
  // Bắt buộc
  sentenceId: string;
  userAnswer: string;
  // Context câu — lấy từ WritingExerciseSentenceResponse
  sourceText?: string;
  targetText?: string;
  vocabularyHints?: string[];
  grammarHints?: string[];
  difficultyScore?: number;
  // Tùy chọn
  timeSpentSeconds?: number;
}

export interface CorrectionItem {
  word: string;
  correction: string;
  explanation: string;
}

export interface WritingAiFeedback {
  // Identity
  id: string;
  sessionId: string;
  sentenceId: string;
  // Context câu
  originalSentence: string | null;
  userAnswer: string | null;
  // Điểm số (0.0 – 10.0)
  aiScore: number | null;
  grammarScore: number | null;
  vocabularyScore: number | null;
  fluencyScore: number | null;
  accuracyScore: number | null;
  // Feedback text
  overallFeedback: string | null;
  grammarFeedback: string | null;
  vocabularyFeedback: string | null;
  fluencyFeedback: string | null;
  // Gợi ý cải thiện
  suggestedAnswer: string | null;
  corrections: CorrectionItem[];
  // Meta
  aiProvider: string | null;
  aiModel: string | null;
  processingTimeMs: number | null;
  createdAt: string | null;
}

export interface WritingAchievement {
  id: string;
  userId: string;
  achievementType: string;
  title: string;
  description?: string;
  unlockedAt: string;
}
