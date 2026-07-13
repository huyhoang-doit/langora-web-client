import { create } from 'zustand';
import { Profile } from '@/types/user';

export interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  setAuth: (user: Profile) => void;
  clearAuth: () => void;
  setInitialized: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  setAuth: (user) => set({ user, isAuthenticated: true, isInitialized: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false, isInitialized: true }),
  setInitialized: (status) => set({ isInitialized: status }),
}));
