"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { UserService } from "@/services/user.service";
import { Loader2 } from "lucide-react";

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isInitialized, isAuthenticated, setAuth, setInitialized, clearAuth } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const checkGuest = async () => {
      if (isInitialized) {
        if (isAuthenticated) {
          router.push("/dashboard");
        }
        return;
      }

      const token = localStorage.getItem("access_token");
      if (!token) {
        if (isMounted) {
          clearAuth();
        }
        return;
      }

      try {
        const res = await UserService.getProfile();
        if (res.data && isMounted) {
          setAuth(res.data);
          router.push("/dashboard");
        }
      } catch (error) {
        if (isMounted) {
          clearAuth();
        }
      }
    };

    checkGuest();

    return () => {
      isMounted = false;
    };
  }, [isInitialized, isAuthenticated, router, setAuth, clearAuth]);

  // Nếu chưa khởi tạo mà có token trong localStorage thì đợi (tránh load giao diện login)
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (!isInitialized && token) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">
            Checking session...
          </p>
        </div>
      </div>
    );
  }

  // Nếu đã xác định là đã đăng nhập thì return null để chờ chuyển hướng
  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
