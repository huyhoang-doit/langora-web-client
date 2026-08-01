"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "@/i18n/navigation";
import { ImageLogoWeb } from "@/components/image-logo-web";

export default function ResetPasswordPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
    }
  }, [token]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await AuthService.resetPassword({ token, newPassword: password });
      if (res.success) {
        setIsSuccess(true);
        toast.success("Password has been reset successfully!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to reset password. Token might be expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="reset-password-page">
      {/* Theme Toggle Absolute */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.05),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[460px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10">
        <header className="mb-8 text-center">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <ImageLogoWeb variant="big" />
          </Link>
          <h2 className="text-2xl font-black text-foreground mb-2 tracking-tight text-heading">Reset Password</h2>
          <p className="text-muted-foreground text-sm font-medium">Create a new, strong password for your account.</p>
        </header>

        {!isSuccess ? (
          <form className="space-y-5" onSubmit={handleResetPassword}>
            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1 text-heading" htmlFor="password">
                New Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1 text-heading" htmlFor="confirm-password">
                Confirm Password
              </label>
              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary font-medium"
              />
            </div>

            <Button
              type="submit"
              disabled={loading || !token}
              className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
              Reset Password
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-heading">Success!</h3>
            <p className="text-muted-foreground">Your password has been changed successfully.</p>
            <Button
              onClick={() => router.push("/login")}
              className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-6"
            >
              Continue to Login
            </Button>
          </div>
        )}

        {!isSuccess && (
          <div className="mt-8 pt-6 border-t-2 border-border/60 text-center">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-bold">
              Back to Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-semibold">© 2024 Langora. Engineered for cognitive clarity.</p>
      </div>
    </main>
  );
}
