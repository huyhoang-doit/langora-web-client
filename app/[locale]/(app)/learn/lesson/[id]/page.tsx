"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, Brain, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface LessonPageProps {
  params: Promise<{ id: string }>;
}

export default function LessonDetailPage({ params }: LessonPageProps) {
  const { id } = use(params);

  const lessonInfo = {
    title: `Lesson #${id}: Advanced Conditional Sentences`,
    desc: "Master structure, usage, and nuance of Type 2 & Type 3 conditionals in IELTS writing tasks.",
    points: [
      "Use Conditionals to describe hypothetical outcomes in academic writing.",
      "Understand the difference between past regrets and imaginary present scenarios.",
      "Practice correct auxiliary structures: 'would have', 'could have', and 'should have'.",
    ],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id={`lesson-detail-${id}`}>
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/learn">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Lesson Workspace</h2>
          <p className="text-xs text-muted-foreground font-semibold">{lessonInfo.title}</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="theory" className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center border-b-2 border-border/60 pb-3">
              <TabsList className="bg-muted/50 rounded-xl p-1 border-2 border-border/40">
                <TabsTrigger value="theory" className="rounded-lg px-4 py-2 text-xs font-black text-heading data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-2 border-transparent data-[state=active]:border-primary-foreground/15">Theory</TabsTrigger>
                <TabsTrigger value="practice" className="rounded-lg px-4 py-2 text-xs font-black text-heading data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-2 border-transparent data-[state=active]:border-primary-foreground/15">Practice</TabsTrigger>
                <TabsTrigger value="ai-notes" className="rounded-lg px-4 py-2 text-xs font-black text-heading data-[state=active]:bg-primary data-[state=active]:text-primary-foreground border-2 border-transparent data-[state=active]:border-primary-foreground/15">AI Notes</TabsTrigger>
              </TabsList>
              <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 flex items-center gap-1.5">
                Mark as Completed <Check className="w-3.5 h-3.5" />
              </Button>
            </div>

            <TabsContent value="theory" className="space-y-6 outline-none">
              <div className="card-edu p-6 bg-card space-y-4">
                <h4 className="text-lg font-black text-heading text-foreground">Overview & Rules</h4>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed font-semibold text-learning">
                  <p className="text-foreground font-black">{lessonInfo.desc}</p>
                  <div className="space-y-3 pt-2">
                    {lessonInfo.points.map((pt, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-primary/10 border-2 border-primary/20 text-primary flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5 text-heading">{i + 1}</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-edu p-6 bg-card space-y-4">
                <h4 className="font-black text-sm text-foreground text-heading">Structural Formula</h4>
                <div className="p-4 bg-muted/50 border-2 border-border/40 rounded-xl font-mono text-xs text-foreground leading-relaxed">
                  If + Past Perfect (had + V3), ... would have + V3<br />
                  Example: If I had studied harder, I would have passed the JLPT N2 exam last December.
                </div>
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6 outline-none">
              <div className="card-edu p-6 text-center bg-card space-y-4">
                <Brain className="w-12 h-12 text-primary mx-auto animate-pulse" />
                <h4 className="font-black text-base text-foreground text-heading">Interactive Practice Ready</h4>
                <p className="text-muted-foreground text-sm max-w-md mx-auto font-medium text-learning">Test your knowledge with 10 custom sentences. AI will score your answers immediately.</p>
                <Button className="btn-edu h-11 px-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/95">Start Practice Session</Button>
              </div>
            </TabsContent>

            <TabsContent value="ai-notes" className="space-y-6 outline-none">
              <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-widest text-heading">AI Companion (Ora) Suggestions</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed font-semibold text-learning">
                  Based on your previous writing history, you often forget the auxiliary "have" in Type 3 conditional results. Make sure to double check your past participle structures in this exercise.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
