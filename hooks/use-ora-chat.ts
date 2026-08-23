"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { OraChatEntry, OraChatMessage } from "@/types/ora-chat";
import {
  sendOraChatStream,
  saveChatHistory,
  loadChatHistory,
  clearChatHistory,
} from "@/services/ora-chat.service";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildWelcome(): OraChatEntry {
  return {
    id: "welcome",
    role: "assistant",
    content:
      "Hey there! 👋 I'm **Ora**, your AI language companion.\nI'm here to help you learn, practice, and grow. What shall we work on today?",
    timestamp: new Date(),
  };
}

/** Generate a guaranteed-unique ID using crypto (no timestamp collision risk). */
function uid(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

/** Returns true if the message is the static welcome message (should not be persisted). */
function isWelcome(m: OraChatEntry): boolean {
  return m.id === "welcome" || m.id.startsWith("welcome-");
}

// ─── Hook interface ────────────────────────────────────────────────────────────

export interface UseOraChatReturn {
  /** All messages to render (welcome + conversation history). */
  messages: OraChatEntry[];
  /** True while the AI is streaming a response. */
  isStreaming: boolean;
  /** Partial text currently being streamed in; resets to "" when done. */
  streamingContent: string;
  /** Send a new user message and start streaming the AI reply. */
  sendMessage: (content: string) => void;
  /** Clear chat history and reset to the welcome message. */
  clearHistory: () => void;
}

/**
 * `useOraChat` — stateless chat state management.
 *
 * - History lives in `sessionStorage` (survives F5, wiped on tab close).
 * - Every `sendMessage` call forwards the FULL history to the backend.
 * - SSE stream chunks feed `streamingContent` for a smooth typing effect.
 * - When streaming finishes, the completed AI entry is committed to `messages`.
 *
 * React Strict Mode safety:
 * - IDs use `crypto.randomUUID()` — collision-proof.
 * - A `committedRef` flag prevents the `onDone` callback from appending
 *   the same AI entry twice if React re-invokes the setState updater.
 * - Side effects (saveChatHistory) are called OUTSIDE setState callbacks.
 */
export function useOraChat(): UseOraChatReturn {
  const [messages, setMessages] = useState<OraChatEntry[]>(() => [
    buildWelcome(),
  ]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");

  /**
   * Mirrors `messages` so async callbacks always see the latest list
   * without stale closures.
   */
  const messagesRef = useRef<OraChatEntry[]>(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  /** Raw text accumulator for the current SSE stream. */
  const streamBufferRef = useRef("");

  /**
   * Guards the `onDone` commit path against being executed more than once
   * per streaming session. Reset to false at the start of each `sendMessage`.
   *
   * Why: React Strict Mode in dev calls functional `setState` updaters twice
   * to detect side effects. Without this guard, the AI entry is appended twice.
   */
  const committedRef = useRef(false);

  // ── Restore history from sessionStorage on mount ───────────────────────────
  useEffect(() => {
    const stored = loadChatHistory();
    if (stored.length === 0) return;
    const restored: OraChatEntry[] = stored.map((m) => ({
      id: uid(m.role),
      role: m.role,
      content: m.content,
      timestamp: new Date(),
    }));
    setMessages([buildWelcome(), ...restored]);
  }, []);

  // ── sendMessage ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(
    (content: string) => {
      const trimmed = content.trim();
      if (!trimmed || isStreaming) return;

      // Reset committed guard for this new streaming session
      committedRef.current = false;
      streamBufferRef.current = "";

      // Build and append user entry immediately for snappy UI
      const userEntry: OraChatEntry = {
        id: uid("user"),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };
      const nextMessages = [...messagesRef.current, userEntry];
      setMessages(nextMessages);
      setIsStreaming(true);
      setStreamingContent("");

      // Wire-format history to send (exclude the static welcome message)
      const wireHistory: OraChatMessage[] = nextMessages
        .filter((m) => !isWelcome(m))
        .map((m) => ({ role: m.role, content: m.content }));

      // Start SSE stream
      sendOraChatStream(
        wireHistory,

        // onChunk — accumulate chunks into buffer + streaming state
        (chunk) => {
          streamBufferRef.current += chunk;
          setStreamingContent((prev) => prev + chunk);
        },

        // onDone — commit the completed AI reply
        () => {
          // Guard: skip if already committed (React Strict Mode double-invoke protection)
          if (committedRef.current) return;
          committedRef.current = true;

          const fullReply = streamBufferRef.current;
          streamBufferRef.current = "";

          const aiEntry: OraChatEntry = {
            id: uid("ai"),               // crypto UUID — collision-proof
            role: "assistant",
            content: fullReply || "…",
            timestamp: new Date(),
          };

          // Append AI entry — pure setState, NO side effects here
          setMessages((current) => {
            // Extra safety: skip if somehow already present (should never happen)
            if (current.some((m) => m.id === aiEntry.id)) return current;
            return [...current, aiEntry];
          });

          // Persist history OUTSIDE setState to avoid Strict Mode double-call
          const toSave: OraChatMessage[] = [
            ...messagesRef.current.filter((m) => !isWelcome(m)),
            { role: aiEntry.role, content: aiEntry.content },
          ];
          saveChatHistory(toSave);

          setStreamingContent("");
          setIsStreaming(false);
        },

        // onError
        (err) => {
          console.error("[OraChat] Stream error:", err.message);
          if (committedRef.current) return;
          committedRef.current = true;

          setMessages((current) => [
            ...current,
            {
              id: uid("err"),
              role: "assistant",
              content: "Oops! Something went wrong. Please try again. 🙏",
              timestamp: new Date(),
            },
          ]);
          setStreamingContent("");
          setIsStreaming(false);
        }
      );
    },
    [isStreaming]
  );

  // ── clearHistory ───────────────────────────────────────────────────────────
  const clearHistory = useCallback(() => {
    clearChatHistory();
    committedRef.current = false;
    streamBufferRef.current = "";
    setStreamingContent("");
    setIsStreaming(false);
    setMessages([{ ...buildWelcome(), id: uid("welcome") }]);
  }, []);

  return { messages, isStreaming, streamingContent, sendMessage, clearHistory };
}
