"use client";

import { useState } from "react";
import { ChevronDown, Globe } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { useLanguageStore } from "@/stores/ui-language.store";

export const languages = [
  { code: "en", label: "English", flag: "🇺🇸", short: "EN" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳", short: "VI" },
  { code: "ja", label: "日本語", flag: "🇯🇵", short: "JA" },
  { code: "zh", label: "中文", flag: "🇨🇳", short: "ZH" },
];

export type Language = (typeof languages)[number];

interface LanguageSelectorProps {
  /** compact: small chip for navbar/sidebar — full: expanded row list */
  variant?: "compact" | "full";
  /** Optional class for the trigger button */
  className?: string;
}

export function LanguageSelector({
  variant = "compact",
  className = "",
}: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { locale, setLocale } = useLanguageStore();
  const [open, setOpen] = useState(false);

  const selected = languages.find((l) => l.code === locale) || languages[0];

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  /* ---------- FULL variant: inline stacked list (sidebar use) ---------- */
  if (variant === "full") {
    return (
      <div className="space-y-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
              selected.code === lang.code
                ? "bg-primary/10 text-primary border-primary/20 shadow-[0_2px_0_0_rgba(99,102,241,0.1)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent"
            }`}
          >
            <span className="text-base leading-none">{lang.flag}</span>
            <span className="text-heading flex-1 text-left">{lang.label}</span>
            {selected.code === lang.code && (
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    );
  }

  /* ---------- COMPACT variant: dropdown chip (navbar / auth use) ---------- */
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-border/60 bg-muted/30 hover:bg-primary/5 hover:border-primary/30 transition-all text-xs font-black text-foreground ${className}`}
        title="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-base leading-none">{selected.flag}</span>
        <span className="hidden sm:inline text-xs font-black uppercase tracking-wide">
          {selected.short}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute top-full right-0 mt-2 w-48 card-edu bg-card p-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150 z-50"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={selected.code === lang.code}
              onClick={() => {
                handleLanguageChange(lang.code);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all text-left border-2 ${
                selected.code === lang.code
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5 border-transparent"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <div className="flex-1">
                <div className="font-black text-xs uppercase tracking-wide text-heading">
                  {lang.label}
                </div>
              </div>
              {selected.code === lang.code && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
