"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { X, Send, Sparkles, RotateCcw, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ─── Starter prompts ──────────────────────────────────────────────────────────

const STARTER_PROMPTS = [
  "Help me learn Vietnamese vocabulary 🇻🇳",
  "Give me a grammar tip for today 📚",
  "How do I improve my pronunciation? 🗣️",
  "Quiz me on what I've learned! 🎯",
];

// ─── Simulated AI response (replace with real API later) ──────────────────────

async function fetchAIResponse(messages: Message[]): Promise<string> {
  // Simulate network delay – replace this with your actual API call
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));

  const lastMsg = messages[messages.length - 1]?.content.toLowerCase() ?? "";

  if (lastMsg.includes("vocabulary") || lastMsg.includes("vocab")) {
    return "Great choice! 🌟 Here are 3 useful Vietnamese words for today:\n\n• **xin chào** (sin chow) – Hello\n• **cảm ơn** (cam uhn) – Thank you\n• **bạn** (ban) – Friend\n\nWould you like to practice these with a quick quiz?";
  }
  if (lastMsg.includes("grammar")) {
    return "Here's a quick grammar tip! 💡\n\nVietnamese is a **tonal language** with 6 tones. The same word can mean completely different things depending on tone.\n\nFor example: **ma** can mean ghost, cheek, rice seedling, or tomb depending on the tone mark. Ready to practice tones?";
  }
  if (lastMsg.includes("pronunciation")) {
    return "Pronunciation is all about consistent practice! 🎵\n\nMy top tips:\n1. **Listen** to native speakers daily\n2. **Record** yourself and compare\n3. **Focus** on tones — they change meaning!\n\nShall I guide you through a pronunciation exercise?";
  }
  if (lastMsg.includes("quiz") || lastMsg.includes("test")) {
    return "Let's do a quick quiz! 🎯\n\nTranslate this to Vietnamese:\n**\"I want to learn\"**\n\nHint: Think about the subject pronoun + verb pattern in Vietnamese! Type your answer and I'll check it!";
  }
  return "I'm Ora, your AI language companion! ✨ I'm here to help you learn languages faster and smarter. What would you like to work on today?\n\n• Vocabulary building\n• Grammar practice\n• Pronunciation tips\n• Culture & context";
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div
      className={cn(
        "flex gap-2.5 items-end",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
          <Image
            src="/ora/ora-streak-2.png"
            alt="Ora"
            fill
            className="object-contain p-0.5"
          />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          "max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed",
          "transition-all duration-200 animate-in fade-in-0 slide-in-from-bottom-1",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md font-semibold"
            : "bg-muted/70 text-foreground rounded-bl-md border border-border/40",
        )}
      >
        {/* Render markdown-like bold */}
        <span
          dangerouslySetInnerHTML={{
            __html: message.content
              .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n/g, "<br/>"),
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Chat Panel ──────────────────────────────────────────────────────────

interface OraChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OraChatPanel({ isOpen, onClose }: OraChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey there! 👋 I'm **Ora**, your AI language companion.\nI'm here to help you learn, practice, and grow. What shall we work on today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opening
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const updatedMessages = [...messages, userMsg];
      const response = await fetchAIResponse(updatedMessages);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Oops! Something went wrong. Please try again. 🙏",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "assistant",
        content:
          "Hey there! 👋 I'm **Ora**, your AI language companion.\nI'm here to help you learn, practice, and grow. What shall we work on today?",
        timestamp: new Date(),
      },
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        // Position & size
        "fixed bottom-24 right-5 z-50",
        "w-[350px] h-[500px] sm:w-[380px] sm:h-[520px]",
        // Visual
        "flex flex-col rounded-2xl overflow-hidden",
        "bg-card border-2 border-border/60",
        // Animation
        "animate-in fade-in-0 slide-in-from-bottom-4 zoom-in-95 duration-300",
      )}
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 via-primary/5 to-purple-500/5 border-b-2 border-border/50 flex-shrink-0">
        {/* Mascot */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-purple-500/10 border-2 border-primary/30 flex-shrink-0">
          <Image
            src="/ora/ora-streak-2.png"
            alt="Ora AI"
            fill
            className="object-contain p-0.5"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-sm text-heading text-foreground">
              Ora (Demo UI)
            </span>
            <Sparkles className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 animate-pulse" />
            <span className="text-xs text-muted-foreground font-semibold text-heading truncate">
              AI Language Companion (Demo)
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={resetConversation}
            aria-label="Reset conversation"
            className="w-8 h-8 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="w-8 h-8 rounded-lg hover:bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-2.5 items-end">
            <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gradient-to-br from-primary/20 to-purple-500/10 border border-primary/20">
              <Image
                src="/ora/ora-streak-2.png"
                alt="Ora"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div className="bg-muted/70 border border-border/40 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
              <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
              <span className="text-xs text-muted-foreground font-semibold">
                Ora is thinking...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Starter prompts ── */}
      {messages.length <= 1 && !isLoading && (
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

      {/* ── Input ── */}
      <div className="flex items-center gap-2 px-3 py-3 border-t-2 border-border/50 bg-background/40 flex-shrink-0">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Ora anything... (Demo with mock data)"
          disabled={isLoading}
          className="
            flex-1 text-sm bg-muted/50 border-2 border-border/40 rounded-xl
            px-3.5 py-2 outline-none placeholder:text-muted-foreground/60
            focus:border-primary/50 focus:bg-background
            disabled:opacity-50 transition-all duration-200
            font-medium
          "
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
            "transition-all duration-200 cursor-pointer",
            input.trim() && !isLoading
              ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 shadow-md"
              : "bg-muted text-muted-foreground cursor-not-allowed opacity-50",
          )}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
