"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft, GraduationCap, Briefcase, Plane, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslations } from "next-intl";
import { LanguageSelector } from "@/components/language-selector";

export default function OnboardingLearningGoalPage() {
  const t = useTranslations("onboarding");

  const goals = [
    { code: "ielts", icon: GraduationCap, label: t("goal.ielts_label"), desc: t("goal.ielts_desc") },
    { code: "toeic", icon: Award, label: t("goal.toeic_label"), desc: t("goal.toeic_desc") },
    { code: "business", icon: Briefcase, label: t("goal.business_label"), desc: t("goal.business_desc") },
    { code: "travel", icon: Plane, label: t("goal.travel_label"), desc: t("goal.travel_desc") },
  ];

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-learning-goal-page">
      <div className="flex items-center gap-2 absolute top-6 right-6 z-50">
        <LanguageSelector variant="compact" />
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[520px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10">
        <header className="mb-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary text-heading">{t("goal.step")}</span>
          </div>
          <h1 className="text-2xl font-black text-foreground mb-2 text-heading leading-tight">{t("goal.title")}</h1>
          <p className="text-muted-foreground text-sm font-semibold text-learning">{t("goal.desc")}</p>
        </header>

        <div className="space-y-3 mb-8">
          {goals.map(({ code, icon: Icon, label, desc }) => (
            <button
              key={code}
              className="card-edu card-edu-interactive w-full text-left p-4 bg-card/45 flex justify-between items-center group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="font-black text-sm block text-heading text-foreground">{label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5 block leading-relaxed text-learning">{desc}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <Link href="/onboarding/select-language" className="flex-1">
            <Button variant="outline" className="btn-edu w-full py-6 border-2 bg-transparent text-foreground hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> {t("goal.back")}
            </Button>
          </Link>
          <Link href="/onboarding/current-level" className="flex-1">
            <Button className="btn-edu w-full py-6 border-2 bg-primary text-primary-foreground hover:bg-primary/90">
              {t("goal.continue")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
