"use client";

import Link from "next/link";
import { ArrowRight, BrainCircuit, BookOpen, PenLine, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/language-selector";
import ImageLogoWeb from "@/components/image-logo-web";
import { PartyPopper } from 'lucide-react';

export default function OnboardingResultPage() {
  const t = useTranslations("onboarding");

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-result-page">
      <div className="flex items-center gap-2 absolute top-6 right-6 z-50">
        <LanguageSelector variant="compact" />
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[500px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10 text-center">

        {/* Ora Celebrate */}
        <div className="flex justify-center items-end gap-2 mb-4">
          <PartyPopper className="w-8 h-8 text-amber-500 animate-bounce" style={{ animationDelay: "0.1s" }} />
          <ImageLogoWeb variant="mascot" className="w-16 h-16" />
          <PartyPopper className="w-8 h-8 text-amber-500 animate-bounce" style={{ animationDelay: "0.2s" }} />
        </div>

        <header className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-primary/20 shadow-[0_4px_0_0_rgba(99,102,241,0.25)]">
            <BrainCircuit className="w-8 h-8 text-primary" />
          </div>
          <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">
            {t("result.complete")}
          </span>
          <h1 className="text-3xl font-black text-foreground text-heading">
            <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              {t("result.level", { level: "B2" })}
            </span>
          </h1>
          <p className="text-muted-foreground text-sm mt-2 text-learning font-semibold">
            {t("result.proficiency")}
          </p>
        </header>

        {/* Level breakdown */}
        <div className="my-6 space-y-3 text-left">
          <div className="card-edu p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="text-xs font-black block text-heading">{t("result.vocab_mastery", { percent: 68 })}</span>
              <span className="text-[10px] text-muted-foreground text-learning">{t("result.vocab_desc")}</span>
            </div>
          </div>
          <div className="card-edu p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border-2 border-indigo-500/20 flex items-center justify-center flex-shrink-0">
              <PenLine className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <span className="text-xs font-black block text-heading">{t("result.writing_coherence", { percent: 74 })}</span>
              <span className="text-[10px] text-muted-foreground text-learning">{t("result.writing_desc")}</span>
            </div>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="mb-8 p-4 bg-primary/5 border-2 border-primary/20 rounded-2xl text-left flex gap-3">
          <Sparkle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black text-primary block uppercase tracking-wide text-heading mb-1">
              {t("result.ai_recommendation")}
            </span>
            <p className="text-muted-foreground text-xs leading-relaxed text-learning">
              {t("result.ai_desc")}
            </p>
          </div>
        </div>

        <Link href="/dashboard" className="block w-full">
          <Button className="btn-edu w-full py-6 border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
            {t("result.enter_dashboard")}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
