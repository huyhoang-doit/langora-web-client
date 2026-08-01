"use client";

import Link from "next/link";
import { useState } from "react";
import { KeyRound, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";
import { ImageLogoWeb } from "@/components/image-logo-web";
import { AuthService } from "@/services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    
    try {
      setLoading(true);
      const res = await AuthService.forgotPassword({ email });
      if (res.success) {
        setIsSuccess(true);
        toast.success("Password reset link sent to your email!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="forgot-password-page">
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
          <h2 className="text-2xl font-black text-foreground mb-2 tracking-tight text-heading">Forgot Password</h2>
          <p className="text-muted-foreground text-sm font-medium">
            {isSuccess 
              ? "Check your email for a link to reset your password. If it doesn't appear within a few minutes, check your spam folder."
              : "Enter your email and we'll send you instructions to reset your password."}
          </p>
        </header>

        {!isSuccess ? (
          <form className="space-y-5" onSubmit={handleForgotPassword}>
            {/* Email */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 font-medium"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
              Send Reset Link
            </Button>
          </form>
        ) : (
          <Button
            className="btn-edu w-full py-6 text-sm border-2 bg-muted text-foreground hover:bg-muted/80 mt-2"
            onClick={() => setIsSuccess(false)}
          >
            Try another email
          </Button>
        )}

        <div className="mt-8 pt-6 border-t-2 border-border/60 text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-bold">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-semibold">© 2024 Langora. Engineered for cognitive clarity.</p>
      </div>
    </main>
  );
}
