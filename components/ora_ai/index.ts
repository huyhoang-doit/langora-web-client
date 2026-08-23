/**
 * index.ts — Barrel export cho module ora_ai
 * ─────────────────────────────────────────────────────────────────────────────
 * Cấu trúc thư mục:
 *
 *   ora-ai-assistant.tsx   — Điểm vào chính: widget nổi góc phải + logic ẩn/hiện
 *   ora-chat-bubble.tsx    — Bong bóng mascot Ora (nút bấm để mở chat)
 *   ora-chat-panel.tsx     — Khung chat chính (ghép các thành phần con)
 *   ora-message-bubble.tsx — Bong bóng tin nhắn (thường + streaming)
 *   ora-chat-input.tsx     — Thanh nhập liệu + nút gửi
 *   ora-markdown.tsx       — Bộ render markdown nhẹ cho tin nhắn AI
 */

// Widget tổng — dùng cái này khi nhúng vào layout
export { OraAIAssistant } from "./ora-ai-assistant";

// Các thành phần con (dùng khi cần tùy chỉnh riêng)
export { OraChatBubble } from "./ora-chat-bubble";
export { OraChatPanel } from "./ora-chat-panel";
export { OraMessageBubble, OraStreamingBubble } from "./ora-message-bubble";
export { OraChatInput } from "./ora-chat-input";
export { OraMarkdown } from "./ora-markdown";

