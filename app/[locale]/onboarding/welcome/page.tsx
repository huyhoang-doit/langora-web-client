"use client";

import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/language-selector";
import ImageLogoWeb from "@/components/image-logo-web";

export default function OnboardingWelcomePage() {
  const t = useTranslations("onboarding");

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-welcome-page">
      <div className="flex items-center gap-2 absolute top-6 right-6 z-50">
        <LanguageSelector variant="compact" />
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[500px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10 text-center">
        <header className="mb-8 flex flex-col items-center justify-center">
          <Link href="/" className="inline-block mb-4 hover:opacity-80 transition-opacity">
            <ImageLogoWeb variant="big" textClassName="text-xl" />
          </Link>
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary text-heading">{t("welcome.step")}</span>
          </div>
          <h1 className="text-3xl font-black text-foreground mb-4 text-heading leading-[1.1]">
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">{t("welcome.title")}</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed font-semibold text-learning">
            {t("welcome.desc")}
          </p>
        </header>

        <div className="my-8 py-6 border-y-2 border-border/80 flex justify-around items-center">
          <div className="text-center">
            <div className="text-2xl font-black text-primary text-heading">{t("welcome.time_val")}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider mt-0.5">{t("welcome.time_lbl")}</div>
          </div>
          <div className="w-[2px] h-10 bg-border/80" />
          <div className="text-center">
            <div className="text-2xl font-black text-primary text-heading">{t("welcome.flow_val")}</div>
            <div className="text-[10px] text-muted-foreground uppercase font-black tracking-wider mt-0.5">{t("welcome.flow_lbl")}</div>
          </div>
        </div>

        <Link href="/onboarding/select-language" className="block w-full">
          <Button className="btn-edu rounded-full w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
            {t("welcome.start_btn")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-6 text-center">
        <p className="text-xs text-muted-foreground/60 font-semibold">{t("welcome.copyright")}</p>
      </div>
    </main>
  );
}
