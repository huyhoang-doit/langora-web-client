"use client";

import Link from "next/link";
import { ArrowLeft, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GrammarLessonsPage() {
  const lessons = [
    { id: "perfect-continuous", title: "Present Perfect Continuous", desc: "Express ongoing actions started in the past and continuing into the present.", level: "B1", time: "15 min" },
    { id: "conditionals", title: "Conditional Sentence Type 3", desc: "Hypothesizing about past scenarios and imaginary outcomes.", level: "B2", time: "18 min" },
    { id: "inversion", title: "Grammatical Inversion", desc: "Structuring sentences with negative adverbials for emphasis in formal writing.", level: "C1", time: "22 min" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="grammar-lessons-list-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/grammar">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Grammar Lessons</h2>
          <p className="text-xs text-muted-foreground font-semibold">Select a rule to master</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {lessons.map((lsn) => (
            <div key={lsn.id} className="card-edu card-edu-interactive p-5 bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-black text-base text-foreground text-heading">{lsn.title}</span>
                  <span className="text-[9px] font-black text-primary uppercase bg-primary/5 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">
                    {lsn.level}
                  </span>
                  <span className="text-[9px] text-muted-foreground bg-muted/50 border-2 border-border/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {lsn.time}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl pt-1 text-learning font-semibold">{lsn.desc}</p>
              </div>

              <Link href={`/grammar/${lsn.id}`} className="self-end sm:self-center">
                <Button size="sm" className="btn-edu h-8 px-4 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold gap-1 rounded-full">
                  Learn Rule <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
