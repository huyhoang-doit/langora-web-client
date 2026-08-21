"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { OraChatBubble } from "./ora-chat-bubble";
import { OraChatPanel } from "./ora-chat-panel";

/**
 * Routes (path segments, locale-agnostic) where the Ora chat widget
 * should NOT be displayed.
 */
const HIDDEN_ON_PATHS = [
  "/writing",
];

/**
 * Returns true if the current pathname matches any of the hidden routes.
 * Strips the leading locale segment (e.g. /en, /vi) before matching.
 */
function useIsHidden(): boolean {
  const pathname = usePathname();
  // Remove leading locale prefix: /en/writing/... → /writing/...
  const withoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, "");
  return HIDDEN_ON_PATHS.some(
    (route) => withoutLocale === route || withoutLocale.startsWith(route + "/"),
  );
}

/**
 * OraAIAssistant — the main floating AI chat widget.
 *
 * Drop this into any layout to show the Ora mascot bubble in the bottom-right
 * corner of the screen. Clicking it toggles the chat panel.
 * Automatically hidden on writing-related routes.
 */
export function OraAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const isHidden = useIsHidden();

  if (isHidden) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat panel — renders above the bubble */}
      <OraChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />

      {/* Floating mascot bubble */}
      <OraChatBubble
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
      />
    </div>
  );
}
