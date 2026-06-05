"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, PenLine, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WritingPracticePage() {
  const scenarios = [
    { id: "1", title: "Reflecting on your daily routine", desc: "Write a short paragraph about your morning routine using descriptive present perfect and frequency adjectives.", level: "B1", words: "50-80 words" },
    { id: "2", title: "Applying for an IT job position", desc: "Draft a formal email introducing yourself to the hiring manager, mentioning previous professional experiences.", level: "B2", words: "120-150 words" },
    { id: "3", title: "Analyzing graphs in IELTS Academic", desc: "Summarize visual information presented in a chart depicting population growth rates.", level: "C1", words: "150-180 words" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-practice-scenarios-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Scenario Writing</h2>
          <p className="text-xs text-muted-foreground">Select a prompt to practice composition</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {scenarios.map((scn) => (
            <Card key={scn.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1 flex-grow">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-base text-foreground">{scn.title}</span>
                    <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">{scn.level}</span>
                    <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded font-semibold">{scn.words}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-xl pt-1">{scn.desc}</p>
                </div>

                <Link href={`/writing/scenario/${scn.id}`}>
                  <Button size="sm" className="font-bold text-xs gap-1 self-end sm:self-center">
                    Start <PenLine className="w-3.5 h-3.5" />
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
