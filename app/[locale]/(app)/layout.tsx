import { AppSidebar, MobileBottomNav } from "@/components/app-sidebar";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AuthGuard>
        <AppSidebar />
        <main className="flex-grow flex flex-col overflow-hidden relative">
          {children}
        </main>
        <MobileBottomNav />
      </AuthGuard>
    </div>
  );
}
