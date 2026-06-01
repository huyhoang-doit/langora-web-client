import { AppSidebar, MobileBottomNav } from "@/components/app-sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar />
      <main className="flex-grow flex flex-col overflow-hidden relative">
        {children}
      </main>
      <MobileBottomNav />
    </div>
  );
}
