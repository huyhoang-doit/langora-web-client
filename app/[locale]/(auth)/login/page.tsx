"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Globe, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "next-intl";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations();

  return (
    <main className="flex min-h-screen text-foreground bg-background">
      {/* Theme Toggle Absolute */}
      <div className="flex items-center gap-2 absolute top-6 right-6 z-50">
        <LanguageSelector variant="compact" />
        <ThemeToggle />
      </div>

      {/* Left Side: AI Illustration */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-card/20 overflow-hidden flex-col justify-center items-center border-r-2 border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,240,106,0.08),transparent_70%)] pointer-events-none" />

        <div className="z-10 w-full max-w-xl px-12">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg">🐲</div>
                <span className="text-xl font-black text-primary text-heading tracking-tight">Langora</span>
              </div>
            </Link>

            <h1 className="text-5xl font-black text-foreground mb-6 leading-tight text-heading">
              {t("auth.login_hero_title")}{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Langora</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              {t("auth.login_hero_desc")}
            </p>
          </div>

          {/* Abstract Dashboard Mockup */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative card-edu p-6 overflow-hidden bg-card">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/40" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                </div>
                <div className="h-2 w-32 bg-border/40 rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* Bar chart mockup */}
                <div className="space-y-3">
                  <div className="h-28 w-full bg-muted/50 rounded-xl flex items-end p-3 border-2 border-border/40">
                    <div className="flex items-end space-x-1.5 w-full justify-around h-full">
                      {[20, 45, 70, 90, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-2.5 rounded-t bg-gradient-to-t from-indigo-500 to-blue-500"
                          style={{
                            height: `${h}%`,
                            opacity: 0.3 + (h / 100) * 0.7,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-3 w-3/4 bg-border/40 rounded-full" />
                  <div className="h-3 w-1/2 bg-border/40 rounded-full" />
                </div>
                {/* Progress ring mockup */}
                <div className="space-y-3">
                  <div className="h-28 w-full bg-muted/50 rounded-xl relative flex items-center justify-center border-2 border-border/40">
                    <div className="w-16 h-16 rounded-full border-[6px] border-border/40" />
                    <div
                      className="absolute w-16 h-16 rounded-full border-[6px] border-primary border-t-transparent border-r-transparent"
                      style={{ transform: "rotate(-45deg)" }}
                    />
                    <span className="absolute text-sm font-black text-primary text-heading">84%</span>
                  </div>
                  <div className="h-3 w-full bg-border/40 rounded-full" />
                </div>
              </div>
            </div>

            {/* Floating AI badge */}
            <div className="absolute -top-10 -right-6 glass card-edu p-3 shadow-xl animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <BarChart2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-primary uppercase tracking-tight text-heading">{t("auth.login_ai_pulse")}</div>
                  <div className="text-xs font-semibold text-foreground">{t("auth.login_optimizing_vocab")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 flex items-center justify-center bg-background px-6 md:px-12 relative">
        {/* Subtle orbs */}
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-muted-foreground/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-[440px] z-20">
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-10">
            <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg">🐲</div>
              <span className="text-xl font-black text-primary text-heading tracking-tight">Langora</span>
            </Link>
          </div>

          <header className="mb-8">
            <h2 className="text-3xl font-black text-foreground mb-2 tracking-tight text-heading">
              {t("auth.login_title")}
            </h2>
            <p className="text-muted-foreground text-sm font-medium">{t("auth.login_subtitle")}</p>
          </header>

          <div className="space-y-6">
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="btn-edu h-12 flex items-center justify-center gap-2 border-2 text-sm">
                <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                Google
              </Button>
              <Button variant="outline" className="btn-edu h-12 flex items-center justify-center gap-2 border-2 text-sm">
                <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 dark:invert" />
                GitHub
              </Button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t-2 border-border/60" />
              <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase tracking-widest font-bold">{t("auth.login_or")}</span>
              <div className="flex-grow border-t-2 border-border/60" />
            </div>

            {/* Login Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1.5 ml-1 uppercase tracking-wider" htmlFor="email">
                  {t("auth.email_label")}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("auth.email_placeholder")}
                  className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary font-medium"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider" htmlFor="password">
                    {t("auth.password_label")}
                  </label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline font-bold">
                    {t("auth.login_forgot_password")}
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("auth.password_placeholder")}
                    className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary pr-12 font-medium"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground hover:bg-transparent"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2 py-1">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 border-border bg-muted accent-primary cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer select-none font-semibold">
                  {t("auth.login_remember_me")}
                </label>
              </div>

              <Link href="/dashboard" className="hidden sm:block">
                <Button
                  type="submit"
                  className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                >
                  {t("auth.login_button")}
                </Button>
              </Link>

            </form>

            <p className="text-center text-sm text-muted-foreground mt-4 font-medium">
              {t("auth.login_no_account")}{" "}
              <Link href="/register" className="text-primary font-bold hover:underline">
                {t("auth.login_sign_up")}
              </Link>
            </p>
          </div>

          <footer className="mt-10 text-center space-y-4">
            <div className="flex justify-center">

            </div>
            <p className="text-xs text-muted-foreground/60 font-semibold">
              {t("auth.copyright")}
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
