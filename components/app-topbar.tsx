"use client";

import Link from "next/link";
import { Bell, BookMarked, User, LogOut, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/stores/auth.store";
import { useSidebarStore } from "@/stores/sidebar.store";
import { CustomizeAlert } from "@/components/customize/customize-alert";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

/**
 * AppTopbar — shared top navigation bar for all (app) pages.
 *
 * Renders a sticky header with:
 * - Page title slot (driven by current pathname via the `title` + `subtitle` props)
 * - Bell & BookMarked action buttons
 * - User avatar dropdown (profile link + logout)
 *
 * Usage: rendered once in (app)/layout.tsx so every page automatically gets it.
 */
export function AppTopbar() {
  const t = useTranslations();
  const { user, clearAuth } = useAuthStore();
  const { toggle: toggleSidebar } = useSidebarStore();
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const userName = user?.displayName || user?.fullName || "Student";
  const userInitials = userName.substring(0, 2).toUpperCase();
  const isPro = user?.roles?.includes("PRO");

  const handleLogout = async () => {
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
  };

  return (
    <>
      <header className="flex justify-between items-center w-full px-4 md:px-6 h-16 md:h-20 bg-background/80 backdrop-blur-xl border-b-2 border-border sticky top-0 z-30 flex-shrink-0">
        {/* Left: sidebar toggle + title */}
        <div className="flex items-center gap-3">
          {/* Sidebar toggle — only visible on md+ where sidebar exists */}
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="hidden md:flex w-8 h-8 rounded-lg border-2 border-border/50 items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer flex-shrink-0"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-lg md:text-xl font-black text-foreground tracking-tight text-heading">
              Langora Workspace
            </h2>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest hidden sm:block">
              Target: English B2
            </p>
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Icon actions */}
          <div className="flex items-center gap-1 border-r-2 pr-3 md:pr-4 border-border">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-full"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-primary rounded-full"
              aria-label="Bookmarks"
            >
              <BookMarked className="w-5 h-5" />
            </Button>
          </div>

          {/* Avatar dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer group">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold group-hover:text-primary transition-colors text-heading">
                    {userName}
                  </p>
                  <p className="text-[9px] text-primary font-bold uppercase tracking-widest text-heading">
                    {isPro ? "Pro Member" : "Free Member"}
                  </p>
                </div>
                <Avatar className="h-9 w-9 md:h-10 md:w-10 border-2 border-border group-hover:border-primary transition-all">
                  <AvatarImage
                    src={user?.avatarUrl}
                    alt={userName}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-muted text-foreground font-bold text-sm">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 mt-2 rounded-xl border-2 border-border shadow-md font-sans"
            >
              <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-primary/10 focus:text-primary">
                <Link href="/profile" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-border/60" />
              <DropdownMenuItem
                onSelect={() => setLogoutOpen(true)}
                className="cursor-pointer font-bold text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Logout confirmation dialog */}
      <CustomizeAlert
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        variant="destructive"
        title={t("common.logout_confirm_title")}
        description={t("common.logout_confirm_desc")}
        confirmLabel={t("common.logout")}
        cancelLabel={t("common.cancel")}
        onConfirm={handleLogout}
        showOra={true}
      />
    </>
  );
}
