import { useLanguageStore } from "@/stores/ui-language.store";

export function useLanguage() {
  const { locale, setLocale, targetLanguage, setTargetLanguage } =
    useLanguageStore();

  return {
    locale,
    setLocale,
    targetLanguage,
    setTargetLanguage,
  };
}
