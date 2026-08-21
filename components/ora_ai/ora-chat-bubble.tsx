"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface OraChatBubbleProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function OraChatBubble({ isOpen, onClick, className }: OraChatBubbleProps) {
  return (
    <div className={cn("relative flex flex-col items-center", className)}>
      {/* Tooltip label */}
      {!isOpen && (
        <div
          className="
            absolute bottom-full mb-3 right-0
            bg-card text-foreground text-xs font-bold text-heading
            px-3 py-1.5 rounded-xl border-2 border-border/60
            shadow-sm whitespace-nowrap
            animate-in fade-in-0 slide-in-from-bottom-2 duration-300
          "
        >
          Chat with Ora ✨
          <span
            className="
              absolute -bottom-1.5 right-5
              w-3 h-3 bg-card border-b-2 border-r-2 border-border/60
              rotate-45 block
            "
          />
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={onClick}
        aria-label={isOpen ? "Close Ora chat" : "Open Ora chat"}
        className={cn(
          "relative group w-16 h-16 rounded-full cursor-pointer select-none",
          "transition-all duration-300 ease-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isOpen
            ? "scale-90 rotate-6"
            : "hover:scale-110 hover:-translate-y-1",
        )}
      >
        {/* Pulsing ring */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <span className="absolute inset-1 rounded-full bg-primary/10" />
          </>
        )}

        {/* Mascot image */}
        <div
          className={cn(
            "relative w-16 h-16 rounded-full overflow-hidden",
            "shadow-sm border-2 border-primary/30",
            "transition-all duration-300",
            isOpen
              ? "bg-primary/10 border-primary/50"
              : "bg-gradient-to-br from-primary/15 to-purple-500/10 group-hover:border-primary/60 group-hover:shadow-sm",
          )}
        >
          <Image
            src="/ora/ora-streak-2.png"
            alt="Ora AI mascot"
            fill
            className={cn(
              "object-contain p-0.5 transition-all duration-300",
              isOpen ? "scale-90 opacity-80" : "group-hover:scale-105",
            )}
            priority
          />
        </div>
      </button>
    </div>
  );
}
