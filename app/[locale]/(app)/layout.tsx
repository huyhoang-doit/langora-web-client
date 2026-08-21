"use client";

import { usePathname } from "next/navigation";
import { AppSidebar, MobileBottomNav } from "@/components/app-sidebar";
import { AuthGuard } from "@/components/auth/auth-guard";
import { AppTopbar } from "@/components/app-topbar";

/**
 * Paths (locale-stripped) where the shared AppTopbar should NOT render.
 * Writing exercise/session pages have their own contextual headers.
 */
const TOPBAR_HIDDEN_PATHS = ["/writing/", "/writing"];

function useShowTopbar(): boolean {
  const pathname = usePathname();
  const withoutLocale = pathname.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, "");
  // Hide on /writing/[exerciseId] and /writing/session/... but keep on /writing (hub)
  const hideOnDeep =
    withoutLocale.startsWith("/writing/");
  return !hideOnDeep;
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const showTopbar = useShowTopbar();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AuthGuard>
        <AppSidebar />
        <div className="flex-grow flex flex-col overflow-hidden relative">
          {showTopbar && <AppTopbar />}
          <main className="flex-grow flex flex-col overflow-hidden relative">
            {children}
          </main>
        </div>
        <MobileBottomNav />
      </AuthGuard>
    </div>
  );
}
