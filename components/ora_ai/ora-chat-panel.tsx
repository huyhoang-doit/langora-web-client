"use client";

/**
 * ora-chat-panel.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Thành phần CHÍNH: Khung chat nổi của Ora AI.
 *
 * Chịu trách nhiệm:
 *   - Lắp ghép các thành phần con (Header, Messages, StarterPrompts, Input).
 *   - Kết nối với hook `useOraChat` để lấy state và hành động.
 *   - Tự cuộn xuống cuối mỗi khi có tin nhắn mới hoặc chunk streaming mới.
 *   - Hiển thị / ẩn theo prop `isOpen`.
 *
 * Cây component:
 *   OraChatPanel
 *   ├── [Header]         — avatar Ora, tên, trạng thái, nút đặt lại & đóng
 *   ├── [Messages]       — danh sách OraMessageBubble + OraStreamingBubble
 *   ├── [StarterPrompts] — gợi ý nhanh (chỉ hiện khi chưa có cuộc trò chuyện)
 *   └── OraChatInput     — thanh nhập liệu + nút gửi
 */

import { useRef, useEffect } from "react";
import Image from "next/image";
import { X, Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOraChat } from "@/hooks/use-ora-chat";
import { OraMessageBubble, OraStreamingBubble } from "./ora-message-bubble";
import { OraChatInput } from "./ora-chat-input";

// ─── Gợi ý câu hỏi ban đầu ───────────────────────────────────────────────────

/** Danh sách câu hỏi gợi ý hiển thị khi cuộc trò chuyện còn trống. */
const STARTER_PROMPTS = [
  "Tư vấn giúp tôi lộ trình học tiếng Anh 🗺️",
  "Giúp tôi chấm và sửa lỗi bài Writing ✍️",
  "Giải đáp giúp tôi thắc mắc về ngữ pháp 📚",
  "Gợi ý cho tôi một chủ đề luyện viết hôm nay 🎯",
];

// ─── Props ────────────────────────────────────────────────────────────────────

interface OraChatPanelProps {
  /** Khung chat có đang hiển thị không. */
  isOpen: boolean;
  /** Callback khi người dùng nhấn nút đóng (X). */
  onClose: () => void;
}

// ─── Component chính ──────────────────────────────────────────────────────────

export function OraChatPanel({ isOpen, onClose }: OraChatPanelProps) {
  const { messages, isStreaming, streamingContent, sendMessage, clearHistory } =
    useOraChat();

  // Ref đến phần tử cuối danh sách tin nhắn — dùng để auto-scroll
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự cuộn xuống cuối mỗi khi có tin nhắn mới hoặc chunk streaming mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  // Không render khi panel đang đóng
  if (!isOpen) return null;

  // Chỉ hiển thị gợi ý khi chưa có cuộc trò chuyện thực sự (chỉ có welcome)
  const showStarters = messages.length <= 1 && !isStreaming;

  return (
    <div
      className={cn(
        // Vị trí & kích thước — góc phải phía trên bong bóng mascot
        "fixed bottom-24 right-5 z-50",
        "w-[350px] h-[500px] sm:w-[380px] sm:h-[520px]",
        // Giao diện
        "flex flex-col rounded-2xl overflow-hidden",
        "bg-card border-2 border-border/60",
        "shadow-2xl shadow-black/20",
        // Hiệu ứng xuất hiện
        "animate-in fade-in-0 slide-in-from-bottom-4 zoom-in-95 duration-300"
      )}
    >
      {/* ── Header: Avatar + Tên + Trạng thái + Nút hành động ── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-purple-500/5 border-b-2 border-border/50 flex-shrink-0">
        {/* Avatar mascot Ora (lớn hơn so với avatar trong bong bóng) */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/10 border-2 border-primary/30 flex-shrink-0">
          <Image
            src="/ora/ora-streak-2.png"
            alt="Ora AI"
            fill
            className="object-contain p-0.5"
          />
        </div>

        {/* Tên & trạng thái kết nối */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm text-heading text-foreground">
              Ora AI
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          </div>
          <div className="flex items-center gap-1.5">
            {/* Chấm trạng thái: vàng khi đang gõ, xanh khi sẵn sàng */}
            <span
              className={cn(
                "w-2 h-2 rounded-full flex-shrink-0 transition-colors animate-pulse",
                isStreaming ? "bg-yellow-400" : "bg-green-500"
              )}
            />
            <span className="text-xs text-muted-foreground font-semibold text-heading truncate">
              {isStreaming ? "Ora đang gõ..." : "Trợ lý học ngôn ngữ AI"}
            </span>
          </div>
        </div>

        {/* Nút hành động: Cuộc trò chuyện mới & Đóng */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={clearHistory}
            aria-label="Cuộc trò chuyện mới"
            title="Cuộc trò chuyện mới"
            className="w-8 h-8 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Đóng chat"
            className="w-8 h-8 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Danh sách tin nhắn ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {/* Render từng tin nhắn đã hoàn chỉnh */}
        {messages.map((msg) => (
          <OraMessageBubble key={msg.id} message={msg} />
        ))}

        {/* Bong bóng streaming — xuất hiện khi AI đang trả lời */}
        {isStreaming && <OraStreamingBubble content={streamingContent} />}

        {/* Phần tử ảo để auto-scroll xuống cuối */}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Gợi ý câu hỏi ban đầu ── */}
      {showStarters && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-thin flex-nowrap">
          {STARTER_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="
                flex-shrink-0 text-xs font-bold text-heading
                px-3 py-1.5 rounded-xl border-2 border-primary/20
                bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/40
                transition-all duration-200 cursor-pointer whitespace-nowrap
              "
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* ── Thanh nhập liệu ── */}
      <OraChatInput
        isStreaming={isStreaming}
        isOpen={isOpen}
        onSend={sendMessage}
      />
    </div>
  );
}
