"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, BookOpen, Sparkles, CheckCircle2, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface GrammarDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function GrammarDetailPage({ params }: GrammarDetailPageProps) {
  const { id } = use(params);

  const grammarInfo = {
    title: id.replace(/-/g, " ").replace(/(^\w|\s\w)/g, (m) => m.toUpperCase()),
    desc: `Detailed syntactic study and rules regarding ${id.replace(/-/g, " ")}.`,
    level: "Intermediate/Advanced",
    formula: "Subject + Aux + Verb Structure",
    examples: [
      { sentence: "Under no circumstances should you open this door.", type: "Correct Inversion" },
      { sentence: "If I had known, I would have answered.", type: "Correct Conditional" },
    ],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id={`grammar-detail-${id}`}>
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/grammar/lessons">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">{grammarInfo.title}</h2>
          <p className="text-xs text-muted-foreground">Level: {grammarInfo.level}</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Rule Definition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
              <p className="text-foreground">{grammarInfo.desc}</p>
              
              <div className="p-4 bg-muted/40 border border-border rounded-xl font-mono text-xs text-foreground">
                <span className="text-[10px] font-bold text-primary block uppercase mb-1">Standard Formula</span>
                {grammarInfo.formula}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-bold">Correct Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {grammarInfo.examples.map((ex, i) => (
                <div key={i} className="p-4 bg-muted/20 border border-border rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs md:text-sm text-foreground font-semibold">"{ex.sentence}"</p>
                    <span className="text-[9px] font-bold text-primary uppercase mt-1 block">{ex.type}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Link href="/grammar/quiz">
              <Button size="sm" className="font-bold text-xs gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
                Practice Structure <Play className="w-3 h-3 fill-current" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
