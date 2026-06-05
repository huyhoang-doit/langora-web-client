"use client";

import Link from "next/link";
import { ArrowLeft, Bot, Sparkles, Target, Compass, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AICoachPage() {
  const objectives = [
    { label: "Grammar accuracy goal", value: "85%", desc: "Current: 78%" },
    { label: "Vocabulary range target", value: "B2 Upper-Intermediate", desc: "Current: B1 Core" },
    { label: "Weekly speaking minutes", value: "45 minutes", desc: "Current: 22 minutes" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-coach-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/ora">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Coach</h2>
          <p className="text-xs text-muted-foreground">Personalized evaluation remarks and path corrections</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-start">
              <span className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <Bot className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide flex items-center gap-1">
                  <Sparkles className="w-4 h-4" /> Coach Diagnostic
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                  "Hi Hoang! You've made significant progress in business Idioms. However, your conditional structures show a high error frequency in your essays. Let's aim to complete 2 grammar quizzes this weekend to stabilize this trend."
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-4 h-4 text-primary" /> Active Objectives
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {objectives.map((obj) => (
                <Card key={obj.label} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-5 flex flex-col justify-center items-center text-center">
                    <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">{obj.label}</span>
                    <span className="text-lg font-extrabold text-primary my-1">{obj.value}</span>
                    <span className="text-[10px] text-muted-foreground font-semibold">{obj.desc}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
