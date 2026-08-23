import { OraChatMessage } from "@/types/ora-chat";
import { API_BASE_URL, getAccessToken } from "@/config/axios";

/**
 * Đặt `true` khi dùng mock stream để dev offline (chưa có backend).
 * Chuyển thành `false` khi endpoint `/ora/chat/stream` của backend đã sẵn sàng.
 */
const USE_MOCK_STREAM = false;

// ==============================================================================
// SessionStorage helpers
// ==============================================================================

const STORAGE_KEY = "ora_chat_history";

/** Persist the full conversation history to sessionStorage (tab-scoped). */
export function saveChatHistory(messages: OraChatMessage[]): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // Quota exceeded or private mode — silently ignore
  }
}

/** Load conversation history from sessionStorage. Returns [] if nothing saved. */
export function loadChatHistory(): OraChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as OraChatMessage[];
  } catch {
    return [];
  }
}

/** Erase conversation history from sessionStorage. */
export function clearChatHistory(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}


// ==============================================================================
// Mock streaming (development / pre-backend)
// ==============================================================================

/** Simulate SSE by yielding the response character-by-character with a delay. */
async function mockStream(
  messages: OraChatMessage[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): Promise<void> {
  const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() ?? "";

  let reply =
    "I'm **Ora**, your AI language companion! ✨ Ask me anything about vocabulary, grammar, or pronunciation.";

  if (lastUserMsg.includes("vocab") || lastUserMsg.includes("từ vựng")) {
    reply =
      "Great choice! 🌟 Here are 3 useful words:\n\n• **xin chào** – Hello\n• **cảm ơn** – Thank you\n• **bạn bè** – Friends\n\nWant a quick quiz?";
  } else if (lastUserMsg.includes("grammar") || lastUserMsg.includes("ngữ pháp")) {
    reply =
      "Quick grammar tip! 💡\n\nVietnamese is **SVO** (Subject–Verb–Object) like English, but tones change meaning completely.\n\nFor example: **ma** can mean ghost, cheek, or rice seedling. Ready to practice?";
  } else if (lastUserMsg.includes("quiz") || lastUserMsg.includes("test")) {
    reply =
      "Let's quiz! 🎯\n\nTranslate: **\"I want to learn Vietnamese\"**\n\nHint: *Tôi muốn học tiếng Việt*. Type your answer!";
  }

  // Simulate streaming chunk-by-chunk
  const words = reply.split("");
  for (const char of words) {
    await new Promise((r) => setTimeout(r, 18));
    onChunk(char);
  }
  onDone();
}

// ==============================================================================
// Real SSE streaming via fetch
// ==============================================================================

/**
 * Call the backend streaming endpoint and pipe chunks back via callbacks.
 *
 * Backend contract:
 *   POST /ora/chat/stream
 *   Content-Type: application/json
 *   Response: text/event-stream
 *   Each SSE event: `data: <text_chunk>\n\n`
 *   Terminal event: `data: [DONE]\n\n`
 */
async function realStream(
  messages: OraChatMessage[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): Promise<void> {
  const token = getAccessToken();

  const sessionKey = (() => {
    if (typeof window === "undefined") return "ora-ssr";
    const stored = sessionStorage.getItem("ora_session_key");
    if (stored) return stored;
    const newKey = `ora-chat-${crypto.randomUUID()}`;
    sessionStorage.setItem("ora_session_key", newKey);
    return newKey;
  })();

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/ora/chat/stream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ messages, sessionKey }),
    });
  } catch (networkErr) {
    onError(new Error("Network error — please check your connection."));
    return;
  }

  if (!response.ok) {
    onError(new Error(`Backend error: ${response.status} ${response.statusText}`));
    return;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    onError(new Error("No response body from backend."));
    return;
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let isDone = false;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // ── SSE line-by-line parser ──────────────────────────────────────────
      // Spring AI sends each token as a separate line: "data:chunk\n"
      // (single \n per event, NOT \n\n). We split on \n and keep the last
      // potentially incomplete line in the buffer for the next read cycle.
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? ""; // last element may be incomplete

      for (const raw of lines) {
        const line = raw.trim();

        // Skip blank lines and non-data SSE fields (event:, id:, retry:)
        if (!line || !line.startsWith("data:")) continue;

        // Strip the "data:" prefix — handle both "data:text" and "data: text"
        const payload = line.slice("data:".length).trimStart();

        if (payload === "[DONE]") {
          isDone = true;
          onDone();
          return;
        }

        if (payload === "") {
          // An empty `data:` line represents a paragraph break in the content
          onChunk("\n");
        } else {
          onChunk(payload);
        }
      }
    }
  } catch (readErr) {
    onError(new Error("Stream interrupted."));
  } finally {
    reader.cancel();
    if (!isDone) onDone();
  }
}

// ==============================================================================
// Public API
// ==============================================================================

/**
 * Send a message (with full history) to Ora AI and stream the response.
 *
 * @param messages - Full conversation history including the new user message.
 * @param onChunk  - Called for every text chunk received from the stream.
 * @param onDone   - Called when the stream is complete.
 * @param onError  - Called if the request fails.
 */
export async function sendOraChatStream(
  messages: OraChatMessage[],
  onChunk: (chunk: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): Promise<void> {
  if (USE_MOCK_STREAM) {
    return mockStream(messages, onChunk, onDone, onError);
  }
  return realStream(messages, onChunk, onDone, onError);
}
