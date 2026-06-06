"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { LogOut } from "lucide-react";
import { sidebarNavItems, sidebarBottomItems } from "@/config/sidebar-items";
import { LanguageSelector } from "@/components/language-selector";

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <aside className="hidden md:flex h-screen w-72 flex-shrink-0 flex-col p-6 gap-2 bg-sidebar border-r-2 border-border/80 overflow-y-auto scrollbar-thin">
      {/* Logo */}
      <Link href="/" >
        <div className="flex items-center gap-3 mb-8 px-1 flex-shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-xl">
            🐲
          </div>
          <div>
            <h1 className="text-lg font-black text-primary leading-none tracking-tight text-heading">Langora</h1>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 font-bold">
              AI Language Lab
            </p>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between px-3 pb-2">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("common.language")}</span>
        <LanguageSelector variant="compact" />
      </div>

      {/* Navigation */}
      <nav className="flex-grow flex flex-col gap-2">
        {sidebarNavItems.map(({ href, icon: Icon, label, i18nKey }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const displayLabel = i18nKey ? t(label) : label;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${isActive
                ? "text-primary bg-primary/5 border-primary/20 shadow-[0_4px_0_0_rgba(99,102,241,0.1)] translate-y-[-2px]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent"
                }`}
            >
              <Icon
                className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-heading">{displayLabel}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="mt-auto flex flex-col gap-2 border-t-2 border-border/60 pt-4 flex-shrink-0">
        {sidebarBottomItems.map(({ href, icon: Icon, label, i18nKey }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          const displayLabel = i18nKey ? t(label) : label;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 border-2 ${isActive
                ? "text-primary bg-primary/5 border-primary/20 shadow-[0_4px_0_0_rgba(99,102,241,0.1)] translate-y-[-2px]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-heading">{displayLabel}</span>
            </Link>
          );
        })}
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("common.theme")}</span>
          <ThemeToggle />
        </div>

        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-destructive hover:text-destructive hover:bg-destructive/10 border-2 border-transparent hover:border-destructive/10 transition-all duration-200 w-full text-left cursor-pointer">
          <LogOut className="w-5 h-5" />
          <span className="text-heading">{t("common.logout")}</span>
        </button>
      </div>
    </aside>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const mobileItems = [
    { href: "/dashboard", label: "Home" },
    { href: "/learn", label: "Learn" },
    { href: "/vocabulary", label: "Vocab" },
    { href: "/ora", label: "Ora" },
    { href: "/profile", label: "Profile" },
  ];

  const getEmoji = (label: string) => {
    switch (label) {
      case "Home": return "🏠";
      case "Learn": return "🗺️";
      case "Vocab": return "📚";
      case "Ora": return "🐲";
      case "Profile": return "👤";
      default: return "🎯";
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass bg-background/85 border-t-2 border-border/80 h-16 flex items-center justify-around px-2">
      {mobileItems.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${isActive
              ? "text-primary bg-primary/10 border border-primary/20 shadow-[0_2px_0_0_rgba(99,102,241,0.08)]"
              : "text-muted-foreground"
              }`}
          >
            <span className="text-base">{getEmoji(label)}</span>
            <span className="text-[8px] font-black uppercase tracking-wider text-heading">{label}</span>
          </Link>
        );
      })}

      {/* Theme Toggle cho Mobile */}
      <div className="flex flex-col items-center gap-0.5 text-muted-foreground border-l-2 border-border/60 pl-2">
        <ThemeToggle />
        <span className="text-[8px] font-black uppercase tracking-wider text-heading mt-[-2px]">Theme</span>
      </div>
    </div>
  );
}
