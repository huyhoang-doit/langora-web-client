"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthService } from "@/services/auth.service";
import { ImageLogoWeb } from "@/components/image-logo-web";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email address...");
  const hasCalled = useRef(false);

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Invalid or missing verification token.");
        return;
      }

      if (hasCalled.current) return;
      hasCalled.current = true;

      try {
        const res = await AuthService.verifyEmail({ token });
        if (res.success) {
          setStatus("success");
          setMessage("Your email has been successfully verified!");
        } else {
          setStatus("error");
          setMessage(res.message || "Verification failed. Please try again.");
        }
      } catch (error: any) {
        setStatus("error");
        setMessage(error?.message || "An error occurred during verification.");
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="verify-email-page">
      {/* Theme Toggle Absolute */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.05),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[460px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10 text-center">
        <div className="mb-8">
          <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
            <ImageLogoWeb variant="big" />
          </Link>
          <h2 className="text-2xl font-black text-foreground mb-2 tracking-tight text-heading">Email Verification</h2>
        </div>

        <div className="py-6 space-y-6">
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <p className="text-muted-foreground font-medium">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <p className="text-foreground font-bold text-lg">{message}</p>
              <Link href="/login" className="w-full mt-4 block">
                <Button className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
                  Continue to Login <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10" />
              </div>
              <p className="text-destructive font-bold text-lg">{message}</p>
              <Link href="/login" className="w-full mt-4 block">
                <Button className="btn-edu w-full py-6 text-sm border-2 bg-muted text-foreground hover:bg-muted/80">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-semibold">© 2024 Langora. Engineered for cognitive clarity.</p>
      </div>
    </main>
  );
}
