"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff, Globe, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { ImageLogoWeb } from "@/components/image-logo-web";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { useAuthStore } from "@/stores/auth.store";
import { useLearningStore } from "@/stores/learning.store";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const t = useTranslations();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await AuthService.login({ email, password });
      
      // Theo cấu trúc API response chuẩn, res sẽ có field success (hoặc res.data)
      // Tùy theo logic API thực tế, giả định Interceptor trả về data chuẩn
      if (res.success && res.data?.accessToken) {
        const profileRes = await UserService.getProfile();
        if (profileRes.data) {
          setAuth(profileRes.data);
          
          // Fetch and store learning profile
          try {
            const lpRes = await UserService.getLearningProfile();
            if (lpRes.data) {
              useLearningStore.getState().setProfile(lpRes.data);
            }
          } catch (e) {
            console.error("Could not fetch learning profile during login", e);
          }

          toast.success(res.message || "Login Successful");
          router.push("/dashboard");
        } else {
          toast.error("Failed to fetch profile");
        }
      } else {
        toast.error("Login succeeded but no token was returned.");
      }
    } catch (error: any) {
      toast.error(error?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              <ImageLogoWeb variant="big" textClassName="text-xl" />
            </Link>

            <h1 className="text-5xl font-black text-foreground mb-6 leading-tight text-heading">
              {t("auth.login_hero_title")}{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Langora</span>.
            </h1>

          </div>

          {/* Hero Image */}
          <div className="relative group flex justify-center">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-[3rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
            <div className="relative w-full max-w-[450px] flex justify-center items-center">
              <Image
                src="/ora/ora-login.png"
                alt="Ora Writing"
                width={700}
                height={700}
                className="w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-4 transition-transform duration-500 z-10"
                priority
              />
            </div>

            {/* Floating AI badge */}
            {/* <div className="absolute -bottom-4 -right-4 lg:-right-10 glass card-edu p-4 shadow-xl animate-bounce z-20" style={{ animationDuration: "3s" }}>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <BarChart2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-primary uppercase tracking-tight text-heading">{t("auth.login_ai_pulse")}</div>
                  <div className="text-sm font-bold text-foreground">{t("auth.login_optimizing_vocab")}</div>
                </div>
              </div>
            </div> */}
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
              <ImageLogoWeb variant="big" textClassName="text-xl" />
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
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-xs font-bold text-muted-foreground mb-1.5 ml-1 uppercase tracking-wider" htmlFor="email">
                  {t("auth.email_label")}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.email_placeholder")}
                  className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary font-medium"
                  required
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("auth.password_placeholder")}
                    className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-6 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-1 focus-visible:ring-primary pr-12 font-medium"
                    required
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

              <div className="hidden sm:block">
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                >
                  {loading ? "..." : t("auth.login_button")}
                </Button>
              </div>

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
