/**
 * ora-message-bubble.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Thành phần: Bong bóng tin nhắn đơn lẻ trong khung chat.
 *
 * Hai kiểu bong bóng:
 *   - Người dùng (isUser = true): bong bóng màu primary, căn phải.
 *   - Ora AI    (isUser = false): bong bóng nền mờ, avatar mascot bên trái,
 *                                  nội dung được render qua OraMarkdown.
 *
 * Bong bóng streaming (OraStreamingBubble) hiển thị khi AI đang trả lời:
 *   - Có chữ: hiển thị nội dung đang stream + con trỏ nhấp nháy.
 *   - Chưa có chữ: hiển thị 3 chấm nhảy (đang chờ chunk đầu tiên).
 */

import Image from "next/image";
import { cn } from "@/lib/utils";
import { OraChatEntry } from "@/types/ora-chat";
import { OraMarkdown } from "./ora-markdown";

// ─── Con trỏ nhấp nháy khi AI đang gõ ────────────────────────────────────────

/** Thanh dọc nhỏ nhấp nháy — chỉ hiển thị trong lúc streaming. */
function TypingCursor() {
  return (
    <span
      className="inline-block w-[2px] h-[1em] bg-foreground/70 ml-[2px] align-middle animate-[blink_0.9s_step-end_infinite]"
      aria-hidden
    />
  );
}

// ─── Avatar mascot Ora ────────────────────────────────────────────────────────

/** Avatar tròn nhỏ của Ora — dùng chung cho cả bong bóng thường và streaming. */
function OraAvatar() {
  return (
    <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
      <Image
        src="/ora/ora-streak-2.png"
        alt="Ora"
        fill
        className="object-contain p-0.5"
      />
    </div>
  );
}

// ─── Bong bóng tin nhắn thông thường ─────────────────────────────────────────

interface MessageBubbleProps {
  /** Dữ liệu tin nhắn cần hiển thị. */
  message: OraChatEntry;
}

export function OraMessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-2.5 items-end",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar chỉ hiển thị với tin nhắn AI */}
      {!isUser && <OraAvatar />}

      {/* Nội dung bong bóng */}
      <div
        className={cn(
          "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
          "transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-1",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md font-semibold"
            : "bg-muted/70 text-foreground rounded-bl-md border border-border/40"
        )}
      >
        {/* Tin nhắn AI qua markdown-lite, tin nhắn người dùng là plain text */}
        {isUser ? message.content : <OraMarkdown content={message.content} />}
      </div>
    </div>
  );
}

// ─── Bong bóng streaming (AI đang gõ) ────────────────────────────────────────

interface StreamingBubbleProps {
  /** Nội dung đã nhận được cho đến thời điểm hiện tại (có thể rỗng). */
  content: string;
}

export function OraStreamingBubble({ content }: StreamingBubbleProps) {
  return (
    <div className="flex gap-2.5 items-end">
      <OraAvatar />

      <div className="max-w-[78%] px-3.5 py-2.5 rounded-2xl rounded-bl-md text-sm leading-relaxed bg-muted/70 text-foreground border border-border/40 animate-in fade-in-0 slide-in-from-bottom-1">
        {content ? (
          <>
            {/* Nội dung đang stream + con trỏ nhấp nháy */}
            <OraMarkdown content={content} />
            <TypingCursor />
          </>
        ) : (
          /* Ba chấm nhảy — chờ chunk đầu tiên từ backend */
          <span className="flex items-center gap-1 py-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 animate-bounce [animation-delay:300ms]" />
          </span>
        )}
      </div>
    </div>
  );
}
