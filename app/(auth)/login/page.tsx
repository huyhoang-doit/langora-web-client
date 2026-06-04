"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff, Globe, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen text-foreground bg-background">
      {/* Theme Toggle Absolute */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Left Side: AI Illustration */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-card/20 overflow-hidden flex-col justify-center items-center border-r border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,240,106,0.08),transparent_70%)] pointer-events-none" />

        <div className="z-10 w-full max-w-xl px-12">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-6 hover:opacity-80 transition-opacity">
              <img src="/big-logo.png" className="h-12 w-auto scale-150 origin-left select-none" alt="Langora Logo" />
            </Link>

            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Unlock Clarity with{" "}
              <span className="text-primary">Langora</span>.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Experience a technical approach to language mastery. Engineered for deep focus
              and AI-powered cognitive mapping.
            </p>
          </div>

          {/* Abstract Dashboard Mockup */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
            <div className="relative glass-strong rounded-xl p-6 border border-border overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/40" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
                </div>
                <div className="h-1.5 w-32 bg-border rounded-full" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                {/* Bar chart mockup */}
                <div className="space-y-3">
                  <div className="h-24 w-full bg-muted/50 rounded-lg flex items-end p-3">
                    <div className="flex items-end space-x-1 w-full justify-around h-full">
                      {[20, 45, 70, 90, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-2 rounded-t-sm bg-primary"
                          style={{
                            height: `${h}%`,
                            opacity: 0.3 + (h / 100) * 0.7,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="h-3 w-3/4 bg-border rounded-full" />
                  <div className="h-3 w-1/2 bg-border rounded-full" />
                </div>
                {/* Progress ring mockup */}
                <div className="space-y-3">
                  <div className="h-40 w-full bg-muted/50 rounded-lg relative flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-[6px] border-border" />
                    <div
                      className="absolute w-24 h-24 rounded-full border-[6px] border-primary border-t-transparent border-r-transparent"
                      style={{ transform: "rotate(-45deg)" }}
                    />
                    <span className="absolute text-xl font-bold text-primary">84%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating AI badge */}
            <div className="absolute -top-10 -right-6 glass p-3 rounded-xl shadow-xl border border-primary/20 animate-bounce" style={{ animationDuration: "3s" }}>
              <div className="flex items-center space-x-2">
                <div className="p-1.5 bg-primary/10 rounded-lg">
                  <BarChart2 className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-primary uppercase tracking-tight">AI Pulse</div>
                  <div className="text-xs font-medium text-foreground">Optimizing Vocab...</div>
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
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <img src="/big-logo.png" className="h-10 w-auto scale-150 origin-center select-none" alt="Langora Logo" />
            </Link>
          </div>

          <header className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
              Chào mừng trở lại
            </h2>
            <p className="text-muted-foreground">Sign in to continue your linguistic journey.</p>
          </header>

          <div className="space-y-6">
            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 flex items-center justify-center gap-2">
                <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                Google
              </Button>
              <Button variant="outline" className="h-12 flex items-center justify-center gap-2">
                <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 dark:invert" />
                GitHub
              </Button>
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-border" />
              <span className="flex-shrink mx-4 text-xs text-muted-foreground uppercase tracking-widest">hoặc</span>
              <div className="flex-grow border-t border-border" />
            </div>

            {/* Login Form */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-medium text-muted-foreground mb-1.5 ml-1" htmlFor="email">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1">
                  <label className="block text-xs font-medium text-muted-foreground" htmlFor="password">
                    Mật khẩu
                  </label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-muted/50 border-border rounded-xl px-4 py-6 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary pr-12"
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
                  className="w-4 h-4 rounded border-border bg-muted accent-primary cursor-pointer"
                />
                <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer select-none">
                  Remember me for 30 days
                </label>
              </div>

              <Button
                type="submit"
                className="w-full py-6 rounded-xl font-bold mt-2 hover:shadow-[0_0_20px_rgba(168,240,106,0.3)]"
              >
                Đăng nhập vào Langora
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Bạn chưa có tài khoản?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline">
                Sign up now
              </Link>
            </p>
          </div>

          <footer className="mt-10 text-center">
            <p className="text-xs text-muted-foreground/60">
              © 2024 Langora. Engineered for cognitive clarity.
            </p>
          </footer>
        </div>
      </section>
    </main>
  );
}
