"use client";

import Link from "next/link";
import { Sparkles, KeyRound, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="forgot-password-page">
      {/* Theme Toggle Absolute */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.05),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[460px] glass rounded-xl p-8 md:p-10 shadow-sm relative z-10">
        <header className="mb-8 text-center">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src="/big-logo.png" className="h-10 w-auto select-none" alt="Langora Logo" />
          </Link>
          <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Forgot Password</h2>
          <p className="text-muted-foreground text-sm">Enter your email and we'll send you instructions to reset your password.</p>
        </header>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider" htmlFor="email">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6 rounded-xl font-bold mt-2 hover:shadow-[0_0_20px_rgba(168,240,106,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <KeyRound className="w-4 h-4" />
            Send Reset Link
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60">© 2024 Langora. Engineered for cognitive clarity.</p>
      </div>
    </main>
  );
}
