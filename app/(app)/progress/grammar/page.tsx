"use client";

import Link from "next/link";
import { ArrowLeft, SpellCheck, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GrammarProgressPage() {
  const stats = [
    { label: "Lessons Completed", value: "24 Modules", desc: "Out of 36 standard levels" },
    { label: "Quiz Accuracy", value: "82%", desc: "Average correct answer ratio" },
    { label: "Active Practice", value: "4 Rules", desc: "Currently under weakness focus" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="grammar-progress-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/progress">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Grammar Progress</h2>
          <p className="text-xs text-muted-foreground">Quiz scores and structure mastery</p>
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
                <Sparkles className="w-4 h-4" /> Grammatical Diagnostic
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>You have achieved 100% completion in A1 & A2 modules. Your B1 conditional structure quiz answers show a 68% accuracy rate, triggering a personalized diagnostic recommendation.</p>
              <p className="font-semibold text-foreground">Next target: Practice Conditional Sentences Type 3 quiz modules.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
