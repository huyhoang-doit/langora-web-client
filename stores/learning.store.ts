import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserLearningProfile } from '@/types/user';

export interface LearningState {
  profile: UserLearningProfile | null;
  setProfile: (profile: UserLearningProfile) => void;
  clearProfile: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile) => set({ profile }),
      clearProfile: () => set({ profile: null }),
    }),
    {
      name: 'learning-profile-storage',
    }
  )
);
