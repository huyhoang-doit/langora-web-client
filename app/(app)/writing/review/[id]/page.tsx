"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, CheckCircle2, AlertTriangle, Sparkles, RefreshCw, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Evaluation</h2>
          <p className="text-xs text-muted-foreground">{reviewInfo.title}</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Score Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="sm:col-span-1 border-primary/20 bg-primary/5 flex flex-col justify-center items-center p-6 text-center">
              <span className="text-[10px] text-primary uppercase font-bold tracking-wider mb-2">Overall Score</span>
              <span className="text-4xl font-black text-primary">{reviewInfo.score}</span>
              <span className="text-[10px] text-muted-foreground mt-2 font-bold uppercase">Advanced Level</span>
            </Card>

            <Card className="sm:col-span-2 flex flex-col justify-center">
              <CardContent className="p-6 space-y-2">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">AI Coach Remarks</span>
                <p className="text-sm text-foreground leading-relaxed">{reviewInfo.summary}</p>
              </CardContent>
            </Card>
          </div>

          {/* Corrections List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Corrections Required
            </h3>
            <div className="space-y-4">
              {reviewInfo.errors.map((err, i) => (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-destructive bg-destructive/10 border border-destructive/20 px-2 py-0.5 rounded">
                        {err.type} • {err.line}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono p-3 bg-muted/40 rounded-xl">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground block uppercase mb-1">Original</span>
                        <span className="text-destructive font-semibold line-through">{err.original}</span>
                      </div>
                      <div className="border-t md:border-t-0 md:border-l border-border pt-3 md:pt-0 md:pl-4">
                        <span className="text-[10px] font-bold text-primary block uppercase mb-1">Correction</span>
                        <span className="text-primary font-semibold">{err.correction}</span>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground italic leading-relaxed pt-1">
                      <span className="font-semibold text-foreground">Grammar Note:</span> {err.rule}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-end pt-4">
            <Link href="/writing/practice">
              <Button variant="outline" className="font-bold text-xs">Choose another prompt</Button>
            </Link>
            <Link href="/writing/editor">
              <Button className="font-bold text-xs gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
                Edit Draft <RefreshCw className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
