"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, Sparkles, BookOpen, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <header className="flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/writing/practice">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Scenario Practice</h2>
            <p className="text-xs text-muted-foreground">{scenarioInfo.title}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-bold text-primary flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Writing Prompt
                </CardTitle>
                <span className="text-[10px] text-muted-foreground font-semibold bg-muted px-2 py-0.5 rounded">{scenarioInfo.target}</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground leading-relaxed">{scenarioInfo.desc}</p>
            </CardContent>
          </Card>

          {/* Textarea */}
          <div className="space-y-4">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">Your Response</label>
            <Textarea 
              className="w-full bg-muted/30 border-border rounded-xl h-64 p-5 text-foreground focus-visible:ring-1 focus-visible:ring-primary text-sm leading-relaxed" 
              placeholder="Start drafting your message here..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link href="/writing/practice">
              <Button variant="outline" className="font-bold text-xs">Save Draft</Button>
            </Link>
            <Link href={`/writing/review/${id}`}>
              <Button className="font-bold text-xs gap-1.5 hover:shadow-[0_0_15px_rgba(168,240,106,0.3)] transition-all">
                Submit for Evaluation <Send className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
