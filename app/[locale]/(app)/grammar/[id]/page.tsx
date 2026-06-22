"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, CheckCircle2, Play } from "lucide-react";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/grammar/lessons">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">{grammarInfo.title}</h2>
          <p className="text-xs text-muted-foreground font-semibold">Level: {grammarInfo.level}</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Rule Card */}
          <div className="card-edu p-6 bg-card">
            <h3 className="text-sm font-black text-foreground uppercase tracking-widest text-heading mb-4">Rule Definition</h3>
            <div className="space-y-4 text-xs md:text-sm text-muted-foreground leading-relaxed">
              <p className="text-foreground text-learning font-semibold">{grammarInfo.desc}</p>
              
              <div className="p-4 bg-primary/5 border-2 border-primary/20 rounded-2xl font-mono text-xs text-foreground">
                <span className="text-[9px] font-black text-primary block uppercase mb-1.5 text-heading">Standard Formula</span>
                <span className="font-semibold text-learning">{grammarInfo.formula}</span>
              </div>
            </div>
          </div>

          {/* Examples Card */}
          <div className="card-edu p-6 bg-card">
            <h3 className="text-sm font-black text-foreground uppercase tracking-widest text-heading mb-4">Correct Examples</h3>
            <div className="space-y-3">
              {grammarInfo.examples.map((ex, i) => (
                <div key={i} className="p-4 bg-card hover:bg-primary/5 border-2 border-border/60 hover:border-primary/30 rounded-2xl flex items-center justify-between gap-4 transition-all">
                  <div>
                    <p className="text-xs md:text-sm text-foreground font-bold text-learning">"{ex.sentence}"</p>
                    <span className="text-[9px] font-black text-primary uppercase mt-1 block text-heading">{ex.type}</span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3">
            <Link href="/grammar/quiz">
              <Button size="sm" className="btn-edu h-10 px-6 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold flex items-center gap-1.5 rounded-full">
                Practice Structure <Play className="w-3 h-3 fill-current" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
