"use client";

import Link from "next/link";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/auth.store";
import { useSidebarStore } from "@/stores/sidebar.store";
import { ThemeToggle } from "./theme-toggle";
import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { sidebarNavItems, sidebarBottomItems } from "@/config/sidebar-items";
import { LanguageSelector } from "@/components/language-selector";
import { CustomizeAlert } from "@/components/customize/customize-alert";
import { useState } from "react";
import { toast } from "sonner";
import { ImageLogoWeb } from "@/components/image-logo-web";
import { Home, Map, BookOpen, Bot, User, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarTooltip } from "@/components/sidebar-tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";

// ─── AppSidebar ───────────────────────────────────────────────────────────────

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const { clearAuth } = useAuthStore();
  const router = useRouter();
  const { isCollapsed, toggle } = useSidebarStore();

  return (
    <TooltipProvider delayDuration={300}>
      <>
        <aside
          className={cn(
            "hidden md:flex h-screen flex-shrink-0 flex-col bg-sidebar border-r-2 border-border/80 overflow-y-auto overflow-x-hidden scrollbar-thin relative",
            "transition-all duration-300 ease-in-out",
            isCollapsed ? "w-[68px] p-3" : "w-72 p-6",
          )}
        >
          {/* ── Logo area ── */}
          <div className={cn("flex-shrink-0 mb-8", isCollapsed ? "flex justify-center" : "")}>
            {isCollapsed ? (
              <SidebarTooltip label="Home" collapsed={isCollapsed}>
                <Link href="/" aria-label="Home">
                  <ImageLogoWeb variant="small" className="w-10 h-10" />
                </Link>
              </SidebarTooltip>
            ) : (
              <div className="flex items-center justify-between px-1">
                <Link href="/">
                  <ImageLogoWeb variant="big" />
                </Link>
              </div>
            )}
          </div>

          {/* Language selector — only when expanded */}
          {!isCollapsed && (
            <div className="flex items-center justify-between px-3 pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                {t("common.language")}
              </span>
              <LanguageSelector variant="compact" />
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-grow flex flex-col gap-1.5">
            {sidebarNavItems
              .filter((item) => !item.hide)
              .map(({ href, icon: Icon, label, i18nKey }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                const displayLabel = i18nKey ? t(label) : label;
                return (
                  <SidebarTooltip key={href} label={displayLabel} collapsed={isCollapsed}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl text-sm font-bold transition-all duration-200 border-2",
                        isCollapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5",
                        isActive
                          ? "text-primary bg-primary/5 border-primary/20 shadow-[0_4px_0_0_rgba(99,102,241,0.1)] translate-y-[-2px]"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent",
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 flex-shrink-0",
                          isActive ? "text-primary" : "text-muted-foreground",
                        )}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      {!isCollapsed && (
                        <span className="text-heading">{displayLabel}</span>
                      )}
                    </Link>
                  </SidebarTooltip>
                );
              })}
          </nav>

          {/* Bottom section */}
          <div className="mt-auto flex flex-col gap-1.5 border-t-2 border-border/60 pt-4 flex-shrink-0">
            {sidebarBottomItems
              .filter((item) => !item.hide)
              .map(({ href, icon: Icon, label, i18nKey }) => {
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                const displayLabel = i18nKey ? t(label) : label;
                return (
                  <SidebarTooltip key={href} label={displayLabel} collapsed={isCollapsed}>
                    <Link
                      href={href}
                      className={cn(
                        "flex items-center gap-3 rounded-xl text-sm font-bold transition-all duration-200 border-2",
                        isCollapsed ? "px-0 py-2.5 justify-center" : "px-3 py-2.5",
                        isActive
                          ? "text-primary bg-primary/5 border-primary/20 shadow-[0_4px_0_0_rgba(99,102,241,0.1)] translate-y-[-2px]"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border-transparent",
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="text-heading">{displayLabel}</span>
                      )}
                    </Link>
                  </SidebarTooltip>
                );
              })}

            {/* Theme toggle */}
            <SidebarTooltip label={t("common.theme")} collapsed={isCollapsed}>
              <div
                className={cn(
                  "flex items-center py-2",
                  isCollapsed ? "justify-center" : "justify-between px-3",
                )}
              >
                {!isCollapsed && (
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {t("common.theme")}
                  </span>
                )}
                <ThemeToggle />
              </div>
            </SidebarTooltip>

            {/* Logout */}
            <SidebarTooltip label={t("common.logout")} collapsed={isCollapsed}>
              <button
                onClick={() => setLogoutOpen(true)}
                className={cn(
                  "flex items-center gap-3 rounded-xl text-sm font-bold text-destructive",
                  "hover:bg-destructive/10 border-2 border-transparent hover:border-destructive/10",
                  "transition-all duration-200 cursor-pointer",
                  isCollapsed
                    ? "px-0 py-2.5 justify-center w-full"
                    : "px-3 py-2.5 w-full text-left",
                )}
              >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="text-heading">{t("common.logout")}</span>
                )}
              </button>
            </SidebarTooltip>
          </div>
        </aside>

        <CustomizeAlert
          open={logoutOpen}
          onOpenChange={setLogoutOpen}
          variant="destructive"
          title={t("common.logout_confirm_title")}
          description={t("common.logout_confirm_desc")}
          confirmLabel={t("common.logout")}
          cancelLabel={t("common.cancel")}
          onConfirm={async () => {
            try {
              // await AuthService.logout();
            } catch (e) {
              console.error(e);
            } finally {
              clearAuth();
              if (typeof window !== "undefined") {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
              }
              toast.success("Logged out successfully", {
                description: "See you next time!",
              });
              setLogoutOpen(false);
              router.push("/login");
            }
          }}
          showOra={true}
        />
      </>
    </TooltipProvider>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();

  const mobileItems = [
    { href: "/dashboard", label: "Home", hide: false },
    { href: "/learn", label: "Learn", hide: true },
    { href: "/vocabulary", label: "Vocab", hide: true },
    { href: "/ora", label: "Ora", hide: true },
    { href: "/profile", label: "Profile", hide: false },
  ];

  const getEmoji = (label: string) => {
    switch (label) {
      case "Home":
        return <Home />;
      case "Learn":
        return <Map />;
      case "Vocab":
        return <BookOpen />;
      case "Ora":
        return <Bot />;
      case "Profile":
        return <User />;
      default:
        return <Target />;
    }
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass bg-background/85 border-t-2 border-border/80 h-16 flex items-center justify-around px-2">
      {mobileItems
        .filter((item) => !item.hide)
        .map(({ href, label }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
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
              <span className="text-[8px] font-black uppercase tracking-wider text-heading">
                {label}
              </span>
            </Link>
          );
        })}

      {/* Theme Toggle cho Mobile */}
      <div className="flex flex-col items-center gap-0.5 text-muted-foreground border-l-2 border-border/60 pl-2">
        <ThemeToggle />
        <span className="text-[8px] font-black uppercase tracking-wider text-heading mt-[-2px]">
          Theme
        </span>
      </div>
    </div>
  );
}
