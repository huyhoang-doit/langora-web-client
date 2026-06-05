"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, AlertTriangle, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewPageProps {
  params: Promise<{ id: string }>;
}

export default function WritingReviewPage({ params }: ReviewPageProps) {
  const { id } = use(params);

  const reviewInfo = {
    title: `Evaluation: Requesting feedback from coworker`,
    score: "8.5/10",
    summary: "Strong vocabulary integration and clear coherence. Minor grammatical tense inconsistencies noticed in the introductory sentence.",
    errors: [
      { type: "Grammar", line: "Line 2", original: "I had send you the slides", correction: "I sent you the slides / I have sent you the slides", rule: "Use past simple or present perfect for completed actions." },
      { type: "Style", line: "Line 4", original: "I want you to check them", correction: "I would appreciate your feedback / if you could review them", rule: "Use polite conditional structures in workplace correspondence." },
    ],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id={`writing-review-${id}`}>
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">AI Evaluation</h2>
          <p className="text-xs text-muted-foreground font-semibold">{reviewInfo.title}</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Score Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-1 card-edu border-primary/20 bg-primary/5 flex flex-col justify-center items-center p-6 text-center">
              <span className="text-[9px] text-primary uppercase font-black tracking-widest text-heading mb-2">Overall Score</span>
              <span className="text-4xl font-black text-primary text-heading">{reviewInfo.score}</span>
              <span className="text-[9px] text-muted-foreground mt-2 font-black uppercase text-heading">Advanced Level</span>
            </div>

            <div className="sm:col-span-2 card-edu flex flex-col justify-center bg-card p-6 gap-2">
              <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest text-heading flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" /> AI Coach Remarks
              </span>
              <p className="text-xs text-foreground leading-relaxed text-learning font-semibold">{reviewInfo.summary}</p>
            </div>
          </div>

          {/* Corrections List */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest text-heading flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Corrections Required
            </h3>
            <div className="space-y-4">
              {reviewInfo.errors.map((err, i) => (
                <div key={i} className="card-edu card-edu-interactive p-5 bg-card space-y-3 transition-all">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-black text-destructive bg-destructive/5 border-2 border-destructive/20 px-2.5 py-0.5 rounded-full text-heading">
                      {err.type} • {err.line}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono p-3 bg-muted/40 border-2 border-border/40 rounded-2xl">
                    <div>
                      <span className="text-[9px] font-black text-muted-foreground block uppercase mb-1.5 text-heading">Original</span>
                      <span className="text-destructive font-semibold line-through text-learning">{err.original}</span>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l-2 border-border/60 pt-3 md:pt-0 md:pl-4">
                      <span className="text-[9px] font-black text-primary block uppercase mb-1.5 text-heading">Correction</span>
                      <span className="text-primary font-semibold text-learning">{err.correction}</span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground italic leading-relaxed pt-1 text-learning">
                    <span className="font-bold text-foreground">Grammar Note:</span> {err.rule}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Link href="/writing/practice">
              <Button variant="outline" className="btn-edu h-10 px-6 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-foreground text-xs font-bold rounded-full">
                Choose another prompt
              </Button>
            </Link>
            <Link href="/writing/editor">
              <Button className="btn-edu h-10 px-6 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold flex items-center gap-1.5 rounded-full">
                Edit Draft <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
