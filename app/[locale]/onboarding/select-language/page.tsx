"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function OnboardingSelectLanguagePage() {
  const languages = [
    { code: "english", label: "English", native: "Tiếng Anh", desc: "Learn grammar, professional vocab, or prep for IELTS/TOEIC." },
    { code: "japanese", label: "Japanese", native: "日本語", desc: "Master kanji, JLPT vocabulary, and natural speaking." },
    { code: "chinese", label: "Chinese", native: "中文", desc: "Practice tones, HSK vocab, and characters (Coming Soon)." },
  ];

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-select-language-page">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[500px] card-edu bg-card p-8 md:p-10 shadow-sm relative z-10">
        <header className="mb-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-1.5 rounded-full mb-6 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary text-heading">Onboarding Step 2 of 6</span>
          </div>
          <h1 className="text-2xl font-black text-foreground mb-2 text-heading">What language do you want to learn?</h1>
          <p className="text-muted-foreground text-sm font-medium">Select your target language. You can change this later.</p>
        </header>

        <div className="space-y-4 mb-8">
          {languages.map(({ code, label, native, desc }) => (
            <button
              key={code}
              className="w-full text-left p-4 card-edu card-edu-interactive bg-card/45 hover:bg-muted/10 flex justify-between items-center group cursor-pointer"
            >
              <div>
                <span className="font-black text-sm block text-heading text-foreground">{label} <span className="text-xs text-muted-foreground font-normal">({native})</span></span>
                <span className="text-xs text-muted-foreground mt-1 block font-medium leading-relaxed">{desc}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <Link href="/onboarding/welcome" className="flex-1">
            <Button variant="outline" className="btn-edu w-full py-6 text-sm border-2 bg-transparent text-foreground hover:bg-muted">
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
            </Button>
          </Link>
          <Link href="/onboarding/learning-goal" className="flex-1">
            <Button className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90">
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
