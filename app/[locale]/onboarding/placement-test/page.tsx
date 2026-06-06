"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Progress } from "@/components/ui/progress";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/language-selector";

export default function OnboardingPlacementTestPage() {
  const t = useTranslations("onboarding");

  const currentQuestion = {
    num: 3,
    total: 5,
    sentence: "The project team worked in perfect ________, completing the assignment ahead of schedule.",
    options: ["discord", "synergy", "isolation", "discrepancy"],
  };

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-placement-test-page">
      <div className="flex items-center gap-2 absolute top-6 right-6 z-50">
        <LanguageSelector variant="compact" />
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[560px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10">
        {/* Header Progress */}
        <header className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> {t("placement.title")}
            </span>
            <span className="text-xs text-muted-foreground font-semibold">
              {t("placement.question_progress", {
                current: currentQuestion.num,
                total: currentQuestion.total,
              })}
            </span>
          </div>
          <Progress value={(currentQuestion.num / currentQuestion.total) * 100} className="h-2 bg-muted rounded-full" indicatorClassName="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full" />
        </header>

        {/* Ora Companion */}
        <div className="mb-6 p-4 bg-primary/5 border-2 border-primary/15 rounded-2xl flex items-center gap-3">
          <span className="text-2xl flex-shrink-0">🐲</span>
          <p className="text-xs text-muted-foreground font-semibold text-learning leading-relaxed">
            {t("placement.instruction")}
          </p>
        </div>

        {/* Question */}
        <div className="mb-6">
          <div className="p-5 bg-muted/40 border-2 border-border rounded-2xl">
            <p className="text-sm text-foreground font-semibold leading-relaxed text-learning">
              &ldquo;The project team worked in perfect{" "}
              <span className="inline-block min-w-[80px] border-b-2 border-primary mx-1 pb-0.5 text-primary font-black">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              , completing the assignment ahead of schedule.&rdquo;
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt}
              className="card-edu card-edu-interactive p-4 text-center font-black text-sm capitalize cursor-pointer text-heading hover:text-primary transition-colors"
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/onboarding/current-level" className="flex-1">
            <Button variant="outline" className="btn-edu w-full py-6 border-2 bg-transparent text-foreground hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> {t("placement.quit")}
            </Button>
          </Link>
          <Link href="/onboarding/result" className="flex-1">
            <Button className="btn-edu w-full py-6 border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
              {t("placement.next")} <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
