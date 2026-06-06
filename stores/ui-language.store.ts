import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageStore {
  locale: string;
  setLocale: (locale: string) => void;
  targetLanguage: string;
  setTargetLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      locale: "en",
      setLocale: (locale: string) => set({ locale }),
      targetLanguage: "en",
      setTargetLanguage: (language: string) => set({ targetLanguage: language }),
    }),
    {
      name: "langora-language",
    }
  )
);
