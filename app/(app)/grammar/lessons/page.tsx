"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, ChevronRight, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/grammar">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Grammar Lessons</h2>
          <p className="text-xs text-muted-foreground">Select a rule to master</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {lessons.map((lsn) => (
            <Card key={lsn.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-foreground">{lsn.title}</span>
                    <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">{lsn.level}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> {lsn.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xl pt-1">{lsn.desc}</p>
                </div>

                <Link href={`/grammar/${lsn.id}`}>
                  <Button size="sm" className="font-bold text-xs gap-1.5 self-end sm:self-center">
                    Learn Rule <ChevronRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
