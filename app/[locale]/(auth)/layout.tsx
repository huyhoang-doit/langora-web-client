import { GuestGuard } from "@/components/auth/guest-guard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GuestGuard>
        {children}
      </GuestGuard>
    </div>
  );
}
