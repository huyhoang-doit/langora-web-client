"use client";

import Link from "next/link";
import Image from "next/image";
import { Loader2, Sparkles, ArrowRight, ArrowLeft, Zap, BookOpen, Trophy, HelpCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSelector } from "@/components/language-selector";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { ImageLogoWeb } from "@/components/image-logo-web";
import { AuthService } from "@/services/auth.service";
import { UserService } from "@/services/user.service";
import { useAuthStore } from "@/stores/auth.store";
import { useLearningStore } from "@/stores/learning.store";
import { useGoogleLogin } from '@react-oauth/google';
import { learningService } from "@/services/learning.service";
import { Language, Level } from "@/types/learning";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [targetLanguageId, setTargetLanguageId] = useState("");
  const [currentLevelId, setCurrentLevelId] = useState("");
  const [name, setName] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const t = useTranslations();

  // Fetch data language
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const res = await learningService.getLanguages();
        if (res.success && res.data) {
          setLanguages(res.data);
        }
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLanguages();
  }, []);

  // Fetch data level
  useEffect(() => {

    // If language === "", return
    if (targetLanguageId === "") {
      return;
    }

    const fetchLevels = async () => {
      try {
        setLoading(true);
        const res = await learningService.getLevels(targetLanguageId);
        if (res.success && res.data) {
          setLevels(res.data);
        }
      } catch (error) {
        console.error("Error fetching levels:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLevels();
  }, [targetLanguageId]);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (credentialResponse: any) => {
      try {
        setLoading(true);
        const token = credentialResponse.credential || credentialResponse.access_token;
        const res = await AuthService.googleLogin({
          idToken: token,
          targetLanguageId: targetLanguageId,
          currentLevelId: currentLevelId
        });

        if (res.success && res.data?.accessToken) {
          const profileRes = await UserService.getProfile();
          if (profileRes.data) {
            setAuth(profileRes.data);

            try {
              const lpRes = await UserService.getLearningProfile();
              if (lpRes.data) {
                useLearningStore.getState().setProfile(lpRes.data);
              }
            } catch (lpErr) {
              console.log("No learning profile found, will require onboarding");
            }

            toast.success(t("auth.login_success"));
            router.push("/dashboard");
          }
        }
      } catch (err: any) {
        toast.error(err.message || t("auth.login_error"));
        console.error("Google login failed", err);
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      toast.error(t("auth.login_error"));
      console.log("Login Failed");
    },
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await AuthService.register({
        fullName: name,
        email,
        password,
        targetLanguageId: targetLanguageId,
        currentLevelId: currentLevelId
      });
      console.log("res:-----", res)
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
            console.error("Could not fetch learning profile during register", e);
          }

          toast.success(res.message || "Registration Successful");
          router.push("/dashboard");
        } else {
          toast.error("Failed to fetch profile");
        }
      } else {
        toast.success(res.message || "Registration Successful. Please log in.");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <main className="flex min-h-screen text-foreground bg-background">
      {/* Theme Toggle Absolute */}
      <div className="flex items-center gap-2 absolute top-6 right-6 z-50">
        <LanguageSelector variant="compact" />
        <ThemeToggle />
      </div>

      {/* Left Side: Illustration */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-card/20 overflow-hidden flex-col justify-center items-center border-r-2 border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,217,86,0.08),transparent_50%)] pointer-events-none" />

        <div className="z-10 w-full max-w-xl px-12">
          <div className="mb-10">
            <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
              <ImageLogoWeb variant="big" textClassName="text-xl" />
            </Link>
            <h1 className="text-5xl font-black text-foreground leading-tight max-w-md text-heading">
              {t("auth.register_hero_title")}
              <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Langora</span>.

            </h1>
          </div>

          {/* Hero Image */}
          <div className="relative group flex justify-center mt-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-transparent rounded-[3rem] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
            <div className="relative w-full max-w-[450px] flex justify-center items-center">
              <Image
                src="/ora/ora-register.png"
                alt="Ora Registration"
                width={700}
                height={700}
                className="w-full h-auto object-contain drop-shadow-2xl hover:-translate-y-4 transition-transform duration-500 z-10"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 md:px-12 bg-background relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-6 left-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <ImageLogoWeb variant="big" textClassName="text-base" />
          </Link>
        </div>

        <div className="w-full max-w-[480px] card-edu bg-card p-8 md:p-10 shadow-sm my-10">

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="mb-8 text-center flex flex-col items-center">
                <h1 className="text-2xl font-black text-foreground mb-2 text-heading leading-tight">
                  {t("onboarding.language.title")}
                </h1>
                <p className="text-muted-foreground text-sm font-semibold text-learning">
                  {t("onboarding.language.desc")}
                </p>
              </header>

              <div className="space-y-3 mb-8">
                {languages.map(({ id, code, name, nativeName, flagIconUrl, status }) => (
                  <button
                    key={id}
                    onClick={() => {
                      if (status === 'ACTIVE') {
                        setTargetLanguageId(id);
                      }
                    }}
                    className={`card-edu w-full text-left p-4 flex justify-between items-center group relative transition-all ${status === 'INACTIVE' ? "opacity-60 cursor-not-allowed bg-card/45" : "card-edu-interactive cursor-pointer"
                      } ${targetLanguageId === id ? "!border-primary !bg-primary/10 shadow-md ring-2 ring-primary/30 scale-[1.01]" : "bg-card/45"}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* flag icon */}
                      {flagIconUrl && (
                        <Image
                          src={flagIconUrl || ''}
                          alt={name}
                          width={24}
                          height={24}
                          className="rounded-sm"
                        />
                      )}
                      {/* language name and native name */}
                      <div>
                        <span className="font-black text-sm block text-heading text-foreground">
                          {name}{" "}
                          <span className="text-xs text-muted-foreground font-semibold">({nativeName})</span>
                          {status === 'INACTIVE' && (
                            <span className="ml-2 text-[9px] uppercase font-black tracking-widest bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded-full">
                              Soon
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    {status !== 'INACTIVE' && <ArrowRight className={`w-4 h-4 transition-colors flex-shrink-0 ml-2 ${targetLanguageId === id ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={nextStep}
                  disabled={!targetLanguageId}
                  className="btn-edu w-full py-6 border-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {t("onboarding.language.continue")}
                </Button>
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground font-medium">
                {t("auth.register_have_account")}{" "}
                <Link href="/login" className="text-primary hover:underline font-bold">
                  {t("auth.register_sign_in")}
                </Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="mb-8 text-center flex flex-col items-center">

                <h1 className="text-2xl font-black text-foreground mb-2 text-heading leading-tight">
                  {t("onboarding.level.title")}
                </h1>
                <p className="text-muted-foreground text-sm font-semibold text-learning">
                  {t("onboarding.level.desc")}
                </p>
              </header>

              <div className="space-y-3 mb-8">
                {levels.map(({ id, code, name, description }) => (
                  <button
                    key={code}
                    onClick={() => setCurrentLevelId(id)}
                    className={`card-edu w-full text-left p-4 flex justify-between items-center group cursor-pointer transition-all
                      } ${currentLevelId === id ? "!border-primary !bg-primary/10 shadow-md ring-2 ring-primary/30 scale-[1.01]" : "card-edu-interactive"}`}
                  >
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="font-black text-sm block text-heading text-foreground">{name}</span>
                        <span className="text-xs text-muted-foreground mt-0.5 block leading-relaxed text-learning">{description}</span>
                      </div>
                    </div>
                    <ArrowRight className={`w-4 h-4 transition-colors flex-shrink-0 ml-2 ${currentLevelId === id ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-edu w-full py-6 border-2 bg-transparent text-foreground hover:bg-muted flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> {t("onboarding.level.back")}
                </Button>
                <Button
                  onClick={nextStep}
                  disabled={!currentLevelId}
                  className="btn-edu w-full py-6 border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                >
                  {t("onboarding.level.continue")}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <header className="mb-6 flex items-center">
                <div>
                  <h2 className="text-3xl font-black text-foreground mb-1 tracking-tight text-heading">{t("auth.register_title")}</h2>
                  <p className="text-muted-foreground text-sm font-medium">{t("auth.register_subtitle")}</p>
                </div>
              </header>

              <form className="space-y-4" onSubmit={handleRegister}>
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="name">
                    {t("auth.name_label")}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("auth.name_placeholder")}
                    className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-5 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 font-medium"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="email">
                    {t("auth.email_label")}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("auth.email_placeholder")}
                    className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-5 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 font-medium"
                    required
                  />
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="password">
                      {t("auth.password_label")}
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t("auth.password_placeholder")}
                        className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-5 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 pr-12 font-medium"
                        required
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground px-2 cursor-pointer hover:text-foreground hover:bg-transparent"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider ml-1" htmlFor="confirm-password">
                      {t("auth.confirm_label")}
                    </label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder={t("auth.confirm_placeholder")}
                        className="w-full bg-muted/30 border-2 border-border rounded-xl px-4 py-5 text-foreground focus-visible:ring-1 focus-visible:ring-primary placeholder:text-muted-foreground/60 pr-12 font-medium"
                        required
                      />
                      <div
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground px-2 cursor-pointer hover:text-foreground hover:bg-transparent"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : t("auth.register_button")}
                </Button>

                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="btn-edu w-full py-6 border-2 bg-transparent text-foreground hover:bg-muted flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> {t("onboarding.level.back")}
                </Button>
              </form>

              {/* Divider */}
              <div className="my-5 flex items-center gap-4">
                <div className="h-px bg-border flex-grow" />
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t("auth.register_or")}</span>
                <div className="h-px bg-border flex-grow" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="btn-edu h-12 flex items-center justify-center gap-2 border-2 text-sm"
                  onClick={() => loginWithGoogle()}
                >
                  <img src="/icons/google.svg" alt="Google" className="w-5 h-5" />
                  Google
                </Button>
                <Button variant="outline" className="btn-edu h-12 flex items-center justify-center gap-2 border-2 text-sm" disabled>
                  <img src="/icons/github.svg" alt="GitHub" className="w-5 h-5 dark:invert" />
                  GitHub
                </Button>
              </div>
            </div>
          )}

        </div>

        <div className="absolute bottom-6 text-center px-4 space-y-3">
          <p className="text-xs text-muted-foreground/60 font-semibold">{t("auth.copyright")}</p>
        </div>
      </section>
    </main>
  );
}
