"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen text-foreground bg-background">
      {/* Theme Toggle Absolute */}
      <div className="flex items-center gap-2 absolute top-6 right-6 z-50">
        <LanguageSelector variant="compact" />
        <ThemeToggle />
      </div>

      {/* Left Side: Illustration */}
      <section className="hidden lg:flex lg:w-1/2 bg-card/20 relative items-center justify-center p-16 overflow-hidden border-r-2 border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,217,86,0.08),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 w-full max-w-xl flex flex-col items-start">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-lg">🐲</div>
                <span className="text-xl font-black text-primary text-heading tracking-tight">Langora</span>
              </div>
            </Link>
            <h1 className="text-5xl font-black text-foreground leading-tight max-w-md text-heading mt-4">
              Engineered for cognitive clarity.
            </h1>
          </div>

          {/* Dashboard Illustration */}
          <div className="w-full card-edu p-6 bg-card relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/40" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
              </div>
              <div className="h-2 w-32 bg-border/40 rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-36 bg-muted/50 rounded-xl border-2 border-border/40 animate-pulse" />
              <div className="space-y-4">
                {[0.2, 0.15, 0.1].map((opacity, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-xl bg-primary border-2 border-primary-foreground/10"
                    style={{ opacity }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 h-16 bg-muted/30 rounded-xl border-2 border-border/40 flex items-center px-4">
              <div className="flex -space-x-2">
                {["#bcc7dd", "#a8f06a", "#e7ffee"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background" style={{ background: c }} />
                ))}
              </div>
              <div className="ml-4 h-2 w-48 bg-border/40 rounded-full" />
            </div>
          </div>

          <p className="mt-8 text-muted-foreground text-sm max-w-sm leading-relaxed font-semibold">
            Join 10,000+ learners mastering languages through linguistic precision and AI-driven insights.
          </p>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 bg-background relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link href="/" className="hover:opacity-80 transition-opacity flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-base">🐲</div>
            <span className="text-base font-black text-primary text-heading tracking-tight">Langora</span>
          </Link>
        </div>

        <div className="w-full max-w-[480px] card-edu bg-card p-8 md:p-10 shadow-sm my-10">
          <header className="mb-8">
            <h2 className="text-3xl font-black text-foreground mb-2 tracking-tight text-heading">Create Account</h2>
            <p className="text-muted-foreground text-sm font-medium">Start your linguistic journey with precision.</p>
          </header>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 font-medium"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 font-medium"
              />
            </div>

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 font-medium"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="confirm-password">
                  Confirm
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 font-medium"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-border flex-grow" />
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Or join with</span>
            <div className="h-px bg-border flex-grow" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="btn-edu h-12 flex items-center justify-center gap-2 border-2 text-sm">
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
              Google
            </Button>
            <Button variant="outline" className="btn-edu h-12 flex items-center justify-center gap-2 border-2 text-sm">
              <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 dark:invert" />
              GitHub
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-bold">
              Sign in
            </Link>
          </p>
        </div>

        <div className="absolute bottom-6 text-center px-4 space-y-3">
          <p className="text-xs text-muted-foreground/60 font-semibold">© 2024 Langora. Engineered for cognitive clarity.</p>
        </div>
      </section>
    </main>
  );
}
