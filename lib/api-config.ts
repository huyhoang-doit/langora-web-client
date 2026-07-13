/**
 * API Configuration for Langora
 *
 * IMPORTANT: When backend API is ready, integrate language headers:
 *
 * 1. UPDATE API_BASE_URL with your backend endpoint
 * 2. ADD HEADERS for language context:
 *    - X-Language-UI: Current UI language (en, vi, ja, zh)
 *    - X-Language-Target: User's target learning language (en, vi, ja, zh)
 *
 * 3. SYNC USER PROFILE AFTER LOGIN:
 *    In the login/auth flow, call GET /profile to fetch:
 *    {
 *      "id": "user_id",
 *      "name": "User Name",
 *      "uiLanguage": "vi",        // UI language preference
 *      "targetLanguage": "ja"      // Target learning language
 *    }
 *    Then update store:
 *    ```
 *    const { locale, setLocale, targetLanguage, setTargetLanguage } = useLanguageStore();
 *    setLocale(userProfile.uiLanguage);
 *    setTargetLanguage(userProfile.targetLanguage);
 *    ```
 *
 * 4. PERSIST TO BACKEND:
 *    When user changes language, update via API:
 *    PUT /profile { uiLanguage: "en", targetLanguage: "ja" }
 */

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export function getAPIHeaders(locale: string, targetLanguage: string) {
  return {
    "Content-Type": "application/json",
    "X-Language-UI": locale,
    "X-Language-Target": targetLanguage,
    // Authorization header will be added by fetch interceptor when user is logged in
  };
}

/**
 * Example fetch wrapper (add to your API util file):
 *
 * import { useLanguageStore } from "@/stores/ui-language.store";
 *
 * export async function apiFetch(
 *   endpoint: string,
 *   options: RequestInit = {}
 * ) {
 *   const { locale, targetLanguage } = useLanguageStore.getState();
 *
 *   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
 *     ...options,
 *     headers: {
 *       ...getAPIHeaders(locale, targetLanguage),
 *       ...options.headers,
 *     },
 *   });
 *
 *   if (!response.ok) {
 *     throw new Error(`API Error: ${response.status}`);
 *   }
 *
 *   return response.json();
 * }
 */
