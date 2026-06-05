"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function OnboardingCurrentLevelPage() {
  const levels = [
    { code: "beginner", label: "Absolute Beginner", desc: "I am starting from scratch. I don't know basic vocabulary or grammar yet." },
    { code: "intermediate", label: "Intermediate Learner", desc: "I can construct basic paragraphs and comprehend slow conversations." },
    { code: "advanced", label: "Advanced Speaker", desc: "I communicate fluently but need to master complex grammar and style structures." },
    { code: "unsure", label: "I am not sure (Recommend Placement Test)", desc: "Take a 5-minute AI assessment to test your reading, vocab, and syntax." },
  ];

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-current-level-page">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[500px] glass rounded-xl p-8 md:p-10 shadow-sm relative z-10">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full mb-6 mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Onboarding Step 4 of 6</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Estimate your current level</h1>
          <p className="text-muted-foreground text-sm">This helps us feed the right content to your AI recommendations.</p>
        </header>

        <div className="space-y-4 mb-8">
          {levels.map(({ code, label, desc }) => (
            <button
              key={code}
              className="w-full text-left p-4 rounded-xl border border-border bg-card/45 hover:border-primary/50 hover:bg-muted/30 transition-all flex justify-between items-center group cursor-pointer"
            >
              <div>
                <span className="font-bold text-sm block">{label}</span>
                <span className="text-xs text-muted-foreground mt-0.5 block">{desc}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <Link href="/onboarding/learning-goal" className="flex-1">
            <Button variant="outline" className="w-full py-6 rounded-xl font-bold border-border">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </Button>
          </Link>
          <Link href="/onboarding/placement-test" className="flex-1">
            <Button className="w-full py-6 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,240,106,0.25)] transition-all">
              Continue
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
