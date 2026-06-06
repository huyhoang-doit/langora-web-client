"use client";

import Link from "next/link";
import { Sparkles, Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="verify-email-page">
      {/* Theme Toggle Absolute */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.05),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[460px] glass rounded-xl p-8 md:p-10 shadow-sm relative z-10 text-center">
        <header className="mb-8">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <img src="/big-logo.png" className="h-10 w-auto select-none" alt="Langora Logo" />
          </Link>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">Verify Email</h2>
          <p className="text-muted-foreground text-sm">We've sent a verification link to your email address. Please click the link to verify your account.</p>
        </header>

        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">Didn't receive the email? Check your spam folder or request a new link.</p>
          <Button
            variant="outline"
            className="w-full py-6 rounded-xl font-bold border-primary/20 text-primary hover:bg-primary/10 transition-all"
          >
            Resend Verification Link
          </Button>

          <Link href="/login" className="block w-full">
            <Button
              className="w-full py-6 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,240,106,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Continue to Login
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60">© 2024 Langora. Engineered for cognitive clarity.</p>
      </div>
    </main>
  );
}
