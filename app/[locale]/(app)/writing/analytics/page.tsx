"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WritingAnalyticsPage() {
  const metrics = [
    { label: "Vocabulary Diversity", value: "72/100", desc: "Use of diverse synonyms and collocations." },
    { label: "Grammar Accuracy", value: "88/100", desc: "Correct tense selections and verb agreement." },
    { label: "Sentence Complexity", value: "65/100", desc: "Integration of compound and relative clauses." },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-analytics-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Writing Analytics</h2>
          <p className="text-xs text-muted-foreground font-semibold">Grammar and complexity trend charts</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m) => (
              <div key={m.label} className="card-edu p-5 text-center flex flex-col items-center justify-center bg-card">
                <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest text-heading">{m.label}</span>
                <span className="text-2xl font-black text-primary my-2 text-heading">{m.value}</span>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold text-learning">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-1.5 text-primary text-heading">
              <Sparkles className="w-4 h-4" /> AI Diagnostics
            </h3>
            <div className="space-y-3 text-xs leading-relaxed text-muted-foreground font-medium text-learning">
              <p>Your spelling accuracy has improved by 14% over the last 30 days. However, your sentence structures remain mostly simple compound sentences.</p>
              <p className="font-bold text-foreground">Next target: Practice introducing relative clauses with 'who', 'which', and 'whose' to increase complexity scores.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
