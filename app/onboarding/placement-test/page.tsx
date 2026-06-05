"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, Volume2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Progress } from "@/components/ui/progress";

export default function OnboardingPlacementTestPage() {
  const currentQuestion = {
    num: 3,
    total: 5,
    instruction: "Choose the word that best fits the sentence below:",
    sentence: "The project team worked in perfect ________, completing the assignment ahead of schedule.",
    options: ["discord", "synergy", "isolation", "discrepancy"],
  };

  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-placement-test-page">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[550px] glass rounded-xl p-8 md:p-10 shadow-sm relative z-10">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-primary uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Placement Test
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Question {currentQuestion.num} of {currentQuestion.total}</span>
          </div>
          <Progress value={60} className="h-1.5 bg-muted" indicatorClassName="bg-primary" />
        </header>

        {/* Question Area */}
        <div className="my-8 space-y-4">
          <p className="text-sm text-muted-foreground font-medium">{currentQuestion.instruction}</p>
          <div className="p-6 bg-muted/40 border border-border rounded-xl">
            <p className="text-base text-foreground font-medium leading-relaxed">
              "The project team worked in perfect <span className="underline decoration-primary decoration-2 underline-offset-4">          </span>, completing the assignment ahead of schedule."
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt}
              className="p-4 rounded-xl border border-border bg-card/40 hover:border-primary hover:bg-primary/5 transition-all font-semibold text-sm text-center cursor-pointer capitalize active:scale-95"
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <Link href="/onboarding/current-level" className="flex-1">
            <Button variant="outline" className="w-full py-6 rounded-xl font-bold border-border">
              <ArrowLeft className="w-4 h-4 mr-2" /> Quit Test
            </Button>
          </Link>
          <Link href="/onboarding/result" className="flex-1">
            <Button className="w-full py-6 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,240,106,0.25)] transition-all flex items-center justify-center gap-2">
              Next Question
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
