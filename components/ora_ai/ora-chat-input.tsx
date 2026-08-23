"use client";

/**
 * ora-chat-input.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Thành phần: Thanh nhập liệu phía dưới khung chat.
 *
 * Bao gồm:
 *   - Ô input text (uncontrolled via ref — tránh re-render mỗi lần gõ phím).
 *   - Nút gửi (Send) — xoay màu xanh khi có thể bấm, xám khi đang streaming.
 *   - Xử lý phím Enter để gửi tin nhắn.
 *   - Tự focus vào ô input khi panel vừa mở.
 */

import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface OraChatInputProps {
  /** Có đang chờ AI trả lời không — tắt input khi true. */
  isStreaming: boolean;
  /** Panel có đang mở không — dùng để auto-focus. */
  isOpen: boolean;
  /** Callback khi người dùng gửi tin nhắn. */
  onSend: (content: string) => void;
}

export function OraChatInput({ isStreaming, isOpen, onSend }: OraChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Tự focus vào ô input mỗi khi panel được mở
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = () => {
    const val = inputRef.current?.value ?? "";
    if (!val.trim() || isStreaming) return;
    onSend(val.trim());
    // Xóa ô input sau khi gửi
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Gửi khi nhấn Enter (không kết hợp Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-3 border-t-2 border-border/50 bg-background/40 flex-shrink-0">
      {/* Ô nhập liệu — uncontrolled để tránh re-render mỗi keystroke */}
      <input
        ref={inputRef}
        id="ora-chat-input"
        type="text"
        defaultValue=""
        onKeyDown={handleKeyDown}
        placeholder="Hỏi Ora bất cứ điều gì..."
        disabled={isStreaming}
        className="
          flex-1 text-sm bg-muted/50 border-2 border-border/40 rounded-xl
          px-3.5 py-2 outline-none placeholder:text-muted-foreground/60
          focus:border-primary/50 focus:bg-background
          disabled:opacity-50 transition-all duration-200
          font-medium
        "
      />

      {/* Nút gửi */}
      <button
        id="ora-chat-send"
        onClick={handleSend}
        disabled={isStreaming}
        aria-label="Gửi tin nhắn"
        className={cn(
          "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
          "transition-all duration-200 cursor-pointer",
          !isStreaming
            ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-md"
            : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
        )}
      >
        <Send className="w-4 h-4" />
      </button>
    </div>
  );
}
