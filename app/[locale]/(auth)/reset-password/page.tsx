"use client";

import Link from "next/link";
import { Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "next-intl";

export default function ResetPasswordPage() {
  const t = useTranslations();

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="reset-password-page">
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
          <h2 className="text-2xl font-bold text-foreground mb-2 tracking-tight">{t("auth.reset_title")}</h2>
          <p className="text-muted-foreground text-sm">{t("auth.reset_subtitle")}</p>
        </header>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider" htmlFor="password">
              {t("auth.reset_new_password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder={t("auth.password_placeholder")}
              className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider" htmlFor="confirm-password">
              {t("auth.confirm_label")}
            </label>
            <Input
              id="confirm-password"
              type="password"
              placeholder={t("auth.confirm_placeholder")}
              className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6 rounded-xl font-bold mt-2 hover:shadow-[0_0_20px_rgba(168,240,106,0.3)] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {t("auth.reset_button")}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-medium">
            {t("auth.reset_ready_to_signin")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60">{t("auth.copyright")}</p>
      </div>
    </main>
  );
}
