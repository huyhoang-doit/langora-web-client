"use client";

import Link from "next/link";
import { ArrowLeft, PenLine, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/progress">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Writing Progress</h2>
          <p className="text-xs text-muted-foreground">Grammar and complexity diagnostics</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map(({ label, value, desc }) => (
              <Card key={label} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-5 flex flex-col justify-center items-center text-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{label}</span>
                  <span className="text-2xl font-black text-primary my-1">{value}</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">{desc}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-primary">
                <Sparkles className="w-4 h-4" /> Coherence Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>Your spelling and typo rates are very low (less than 1 error per 200 words). Your main areas for structural improvement remain "Conditional Inversions" and using varied transitional adverbs (e.g. "consequently", "subsequently").</p>
              <p className="font-semibold text-foreground">Next target: Incorporate complex grammar structures in your next essay draft.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
