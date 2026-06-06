"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageLogoWeb from "@/components/image-logo-web";

export default function AICoachPage() {
  const objectives = [
    { label: "Grammar accuracy goal", value: "85%", desc: "Current: 78%" },
    { label: "Vocabulary range target", value: "B2 Upper-Intermediate", desc: "Current: B1 Core" },
    { label: "Weekly speaking minutes", value: "45 minutes", desc: "Current: 22 minutes" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-coach-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/ora">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">AI Coach</h2>
          <p className="text-xs text-muted-foreground font-semibold">Personalized evaluation remarks and path corrections</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex flex-col sm:flex-row gap-4 items-start">
            <ImageLogoWeb variant="mascot" className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center flex-shrink-0 w-6 h-6" />
            <div>
              <h3 className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-1.5 text-heading">
                <Sparkles className="w-4 h-4 animate-pulse" /> Coach Diagnostic
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 font-bold text-learning">
                "Hi Hoang! You've made significant progress in business Idioms. However, your conditional structures show a high error frequency in your essays. Let's aim to complete 2 grammar quizzes this weekend to stabilize this trend."
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-1.5 text-heading">
              <Target className="w-4 h-4 text-primary" /> Active Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {objectives.map((obj) => (
                <div key={obj.label} className="card-edu p-5 flex flex-col justify-center items-center text-center bg-card">
                  <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest text-heading">{obj.label}</span>
                  <span className="text-lg font-black text-primary my-1 text-heading">{obj.value}</span>
                  <span className="text-[10px] text-muted-foreground font-bold text-learning">{obj.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
