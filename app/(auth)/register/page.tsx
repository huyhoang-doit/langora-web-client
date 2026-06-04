"use client";

import Link from "next/link";
import { Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen text-foreground bg-background">
      {/* Theme Toggle Absolute */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side: Illustration */}
      <section className="hidden lg:flex lg:w-1/2 bg-card/20 relative items-center justify-center p-16 overflow-hidden border-r border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,217,86,0.08),transparent_50%)] pointer-events-none" />
        <div className="relative z-10 w-full max-w-xl flex flex-col items-start">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <img src="/big-logo.png" className="h-12 w-auto scale-150 origin-left select-none" alt="Langora Logo" />
            </Link>
            <h1 className="text-5xl font-bold text-foreground leading-tight max-w-md">
              Engineered for cognitive clarity.
            </h1>
          </div>

          {/* Dashboard Illustration */}
          <div className="w-full glass-strong rounded-xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/40" />
                <div className="w-3 h-3 rounded-full bg-primary/40" />
                <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
              </div>
              <div className="h-2 w-32 bg-border rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-36 bg-muted/50 rounded-lg animate-pulse" />
              <div className="space-y-4">
                {[0.2, 0, 0].map((opacity, i) => (
                  <div
                    key={i}
                    className="h-10 rounded-lg bg-primary"
                    style={{ opacity: 0.2 - i * 0.05 }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-6 h-16 bg-muted/30 rounded-lg flex items-center px-4">
              <div className="flex -space-x-2">
                {["#bcc7dd", "#a8f06a", "#e7ffee"].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background" style={{ background: c }} />
                ))}
              </div>
              <div className="ml-4 h-2 w-48 bg-border rounded-full" />
            </div>
          </div>

          <p className="mt-8 text-muted-foreground text-sm max-w-sm leading-relaxed">
            Join 10,000+ learners mastering languages through linguistic precision and AI-driven insights.
          </p>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 bg-background relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <img src="/big-logo.png" className="h-8 w-auto scale-150 origin-left select-none" alt="Langora Logo" />
          </Link>
        </div>

        <div className="w-full max-w-[480px] glass rounded-xl p-8 md:p-10 shadow-sm my-10">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Create Account</h2>
            <p className="text-muted-foreground text-sm">Start your linguistic journey with precision.</p>
          </header>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider" htmlFor="name">
                Full Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60"
              />
            </div>

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

            {/* Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider" htmlFor="confirm-password">
                  Confirm
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60"
                />
              </div>
            </div>

            {/* Language Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider" htmlFor="language">
                Learning Language
              </label>
              <div className="relative">
                <select
                  id="language"
                  className="appearance-none w-full bg-muted/50 border border-border rounded-xl px-4 py-3 text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer text-sm"
                >
                  <option value="english">English</option>
                  <option value="japanese">Japanese</option>
                  <option value="chinese">Chinese</option>
                  <option value="vietnamese">Vietnamese</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60">▼</div>
              </div>
            </div>

            {/* AI Preview */}
            <div className="mt-2 p-4 bg-primary/10 rounded-xl border border-primary/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <span className="text-xs font-bold text-primary block uppercase tracking-widest">
                  AI Onboarding Preview
                </span>
                <p className="text-muted-foreground text-xs mt-0.5">AI will personalize your learning journey.</p>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-6 rounded-xl font-bold mt-2 hover:shadow-[0_0_20px_rgba(168,240,106,0.3)]"
            >
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-border flex-grow" />
            <span className="text-xs font-semibold text-muted-foreground uppercase">Or join with</span>
            <div className="h-px bg-border flex-grow" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-12 flex items-center justify-center gap-2">
              <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
              Google
            </Button>
            <Button variant="outline" className="h-12 flex items-center justify-center gap-2">
              <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 dark:invert" />
              GitHub
            </Button>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline font-semibold">
              Sign in
            </Link>
          </p>
        </div>

        <div className="absolute bottom-6 text-center px-4">
          <p className="text-xs text-muted-foreground/60">© 2024 Langora. Engineered for cognitive clarity.</p>
        </div>
      </section>
    </main>
  );
}
