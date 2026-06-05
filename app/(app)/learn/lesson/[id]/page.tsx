"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, BookOpen, Brain, Sparkles, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/learn">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Lesson Workspace</h2>
          <p className="text-xs text-muted-foreground">{lessonInfo.title}</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="theory" className="space-y-6">
            <div className="flex justify-between items-center border-b pb-2">
              <TabsList className="bg-muted/50 rounded-lg p-1">
                <TabsTrigger value="theory" className="rounded-md px-4 py-2 text-xs font-bold">Theory</TabsTrigger>
                <TabsTrigger value="practice" className="rounded-md px-4 py-2 text-xs font-bold">Practice</TabsTrigger>
                <TabsTrigger value="ai-notes" className="rounded-md px-4 py-2 text-xs font-bold">AI Companion Notes</TabsTrigger>
              </TabsList>
              <Button size="sm" className="font-bold text-xs gap-1 hover:shadow-[0_0_12px_rgba(168,240,106,0.35)] transition-all">
                Mark as Completed <Check className="w-3.5 h-3.5" />
              </Button>
            </div>

            <TabsContent value="theory" className="space-y-6 outline-none">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Overview & Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-foreground">{lessonInfo.desc}</p>
                  <div className="space-y-3 pt-2">
                    {lessonInfo.points.map((pt, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <h4 className="font-bold text-sm text-foreground">Structural Formula</h4>
                  <div className="p-4 bg-muted/50 border border-border rounded-xl font-mono text-xs text-foreground leading-relaxed">
                    If + Past Perfect (had + V3), ... would have + V3<br />
                    Example: If I had studied harder, I would have passed the JLPT N2 exam last December.
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="practice" className="space-y-6 outline-none">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <Brain className="w-12 h-12 text-primary mx-auto" />
                  <h4 className="font-bold text-base text-foreground">Interactive Practice Ready</h4>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">Test your knowledge with 10 custom sentences. AI will score your answers immediately.</p>
                  <Button className="font-bold">Start Practice Session</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-notes" className="space-y-6 outline-none">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wide">AI Companion (Ora) Suggestions</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Based on your previous writing history, you often forget the auxiliary "have" in Type 3 conditional results. Make sure to double check your past participle structures in this exercise.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
