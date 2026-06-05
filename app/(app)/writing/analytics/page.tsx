"use client";

import Link from "next/link";
import { ArrowLeft, BarChart2, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Writing Analytics</h2>
          <p className="text-xs text-muted-foreground">Grammar and complexity trend charts</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((m) => (
              <Card key={m.label} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-5 text-center flex flex-col items-center justify-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{m.label}</span>
                  <span className="text-2xl font-black text-primary my-1">{m.value}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">{m.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5 text-primary">
                <Sparkles className="w-4 h-4" /> AI Diagnostics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
              <p>Your spelling accuracy has improved by 14% over the last 30 days. However, your sentence structures remain mostly simple compound sentences.</p>
              <p className="font-semibold text-foreground">Next target: Practice introducing relative clauses with 'who', 'which', and 'whose' to increase complexity scores.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
