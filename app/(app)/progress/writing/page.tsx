"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WritingProgressPage() {
  const stats = [
    { label: "Essays Submitted", value: "14 Articles", desc: "Since onboarding" },
    { label: "Grammar Accuracy", value: "88%", desc: "Weighted average score" },
    { label: "Syntax Complexity", value: "65/100", desc: "Relative clauses usage index" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-progress-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/progress">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Writing Progress</h2>
          <p className="text-xs text-muted-foreground font-semibold">Grammar and complexity diagnostics</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map(({ label, value, desc }) => (
              <div key={label} className="card-edu card-edu-interactive p-5 bg-card flex flex-col justify-center items-center text-center transition-all">
                <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest text-heading">{label}</span>
                <span className="text-2xl font-black text-primary my-1.5 text-heading">{value}</span>
                <span className="text-[9px] text-muted-foreground font-bold text-learning">{desc}</span>
              </div>
            ))}
          </div>

          {/* Diagnostic Banner with Ora */}
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-start">
            <span className="text-3xl animate-bounce flex-shrink-0">🐲</span>
            <div className="flex-1 space-y-2">
              <h3 className="text-sm font-black text-primary uppercase tracking-widest text-heading flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 animate-pulse" /> Coherence Diagnostics
              </h3>
              <div className="space-y-2 text-xs text-muted-foreground leading-relaxed text-learning font-semibold">
                <p>Your spelling and typo rates are very low (less than 1 error per 200 words). Your main areas for structural improvement remain "Conditional Inversions" and using varied transitional adverbs (e.g. "consequently", "subsequently").</p>
                <div className="p-3 bg-primary/10 border-2 border-primary/20 rounded-xl font-bold text-foreground text-learning">
                  🎯 Next target: Incorporate complex grammar structures in your next essay draft.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
