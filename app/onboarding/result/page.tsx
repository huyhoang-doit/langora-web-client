"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, BrainCircuit, BookOpen, PenLine, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function OnboardingResultPage() {
  return (
    <main className="flex min-h-screen text-foreground bg-background relative items-center justify-center px-6 md:px-12" id="onboarding-result-page">
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,217,86,0.06),transparent_50%)] pointer-events-none" />

      <div className="w-full max-w-[500px] glass rounded-xl p-8 md:p-10 shadow-sm relative z-10 text-center">
        <header className="mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 animate-pulse">
            <BrainCircuit className="w-8 h-8 text-primary" />
          </div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-2">AI Assessment Complete</span>
          <h1 className="text-3xl font-black text-foreground">Your Level: B2</h1>
          <p className="text-muted-foreground text-sm mt-2">Upper-Intermediate proficiency in English</p>
        </header>

        {/* Level breakdown */}
        <div className="my-6 space-y-3 text-left">
          <div className="p-4 bg-muted/40 border border-border rounded-xl flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <span className="text-xs font-bold block">Vocabulary mastery: 68%</span>
              <span className="text-[10px] text-muted-foreground">Strong in general business, moderate in science.</span>
            </div>
          </div>
          <div className="p-4 bg-muted/40 border border-border rounded-xl flex items-center gap-3">
            <PenLine className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
              <span className="text-xs font-bold block">Writing coherence: 74%</span>
              <span className="text-[10px] text-muted-foreground">Clear logical flow. Minor errors in complex tenses.</span>
            </div>
          </div>
        </div>

        {/* AI Suggestion */}
        <div className="mb-8 p-4 bg-primary/10 border border-primary/25 rounded-xl text-left flex gap-3">
          <Sparkle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-bold text-primary block uppercase tracking-wide">AI Recommendation</span>
            <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
              We've created a custom roadmap for you. We suggest focusing on "Conditional Structures" in grammar and "Negotiation Idioms" in vocabulary.
            </p>
          </div>
        </div>

        <Link href="/dashboard" className="block w-full">
          <Button className="w-full py-6 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,240,106,0.35)] transition-all flex items-center justify-center gap-2">
            Enter My Dashboard
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </main>
  );
}
