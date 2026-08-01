"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { UserService } from "@/services/user.service";
import { Loader2 } from "lucide-react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isInitialized, isAuthenticated, setAuth, setInitialized, clearAuth } = useAuthStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      // Nếu đã được khởi tạo rồi thì bỏ qua
      if (isInitialized) {
        if (!isAuthenticated) {
          router.push("/login");
        }
        return;
      }

      // Kiểm tra có token trong localStorage không
      const token = localStorage.getItem("access_token");
      if (!token) {
        if (isMounted) {
          clearAuth();
          router.push("/login");
        }
        return;
      }

      // Nếu có token nhưng chưa có dữ liệu user, tiến hành lấy profile
      try {
        const res = await UserService.getProfile();
        if (res.data && isMounted) {
          setAuth(res.data);
        }
      } catch (error) {
        // Lỗi này có thể do token hết hạn (401). 
        // Axios interceptor đã tự động force logout và nhảy trang,
        // nhưng chúng ta vẫn gọi clearAuth() để đảm bảo dọn dẹp state ở client.
        if (isMounted) {
          clearAuth();
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [isInitialized, isAuthenticated, router, setAuth, clearAuth]);

  // Tránh hydration mismatch
  if (!isHydrated) {
    return null;
  }

  // Trong lúc chờ gọi API kiểm tra token, hiển thị màn hình loading
  if (!isInitialized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium animate-pulse">
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  // Nếu đã khởi tạo nhưng không đăng nhập, return null (sẽ bị redirect ngay)
  if (!isAuthenticated) {
    return null;
  }

  // Nếu tất cả ok, render giao diện
  return <>{children}</>;
}
