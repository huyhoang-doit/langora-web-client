"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ScenarioPageProps {
  params: Promise<{ id: string }>;
}

export default function ScenarioDetailPage({ params }: ScenarioPageProps) {
  const { id } = use(params);

  const scenarioInfo = {
    title: `Scenario #${id}: Requesting feedback from coworker`,
    desc: "Draft a concise, professional message asking your colleague to review your presentation slide deck. Try to incorporate words like 'feedback', 'synergy', and 'review'.",
    target: "80-120 words",
    level: "B2",
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id={`scenario-detail-${id}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/writing/practice">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Scenario Practice</h2>
            <p className="text-xs text-muted-foreground font-semibold">{scenarioInfo.title}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Writing Prompt Card with Mascot */}
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-start">
            <span className="text-3xl animate-bounce flex-shrink-0">🐲</span>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-primary uppercase tracking-widest text-heading flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 animate-pulse" /> Writing Prompt
                </h3>
                <span className="text-[9px] text-muted-foreground font-bold bg-muted border-2 border-border/40 px-2 py-0.5 rounded-full text-heading uppercase">
                  {scenarioInfo.target}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold text-learning">{scenarioInfo.desc}</p>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-4">
            <label className="text-xs font-black text-muted-foreground uppercase tracking-widest text-heading block">Your Response</label>
            <Textarea 
              className="w-full bg-card border-2 border-border focus-visible:border-primary rounded-2xl h-64 p-5 text-foreground text-learning font-semibold text-sm leading-relaxed" 
              placeholder="Start drafting your message here..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/writing/practice">
              <Button variant="outline" className="btn-edu h-10 px-6 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-foreground text-xs font-bold rounded-full">
                Save Draft
              </Button>
            </Link>
            <Link href={`/writing/review/${id}`}>
              <Button className="btn-edu h-10 px-6 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold gap-1.5 rounded-full">
                Submit for Evaluation <Send className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
