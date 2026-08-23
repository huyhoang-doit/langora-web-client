// ─── Ora AI Chat Types ────────────────────────────────────────────────────────

/**
 * A single message in the conversation history.
 * Mirrors the Spring AI `MessageType` roles.
 */
export interface OraChatMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Request body sent to the backend on every chat call.
 * The entire conversation history is included so the backend stays stateless.
 */
export interface OraChatRequest {
  /** Full conversation history — newest message is always the last element. */
  messages: OraChatMessage[];
  /**
   * Optional client-generated key for analytics / logging on the backend.
   * Never used for state — the backend treats every request as fresh.
   */
  sessionKey?: string;
}

/**
 * The in-memory + persisted representation of a single chat turn.
 * Adds UI-only fields (id, timestamp) on top of the wire format.
 */
export interface OraChatEntry {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
