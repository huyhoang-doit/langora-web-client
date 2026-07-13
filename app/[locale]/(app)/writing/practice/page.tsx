"use client";

import Link from "next/link";
import { ArrowLeft, PenLine } from "lucide-react";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Scenario Writing</h2>
          <p className="text-xs text-muted-foreground font-semibold">Select a prompt to practice composition</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {scenarios.map((scn) => (
            <div key={scn.id} className="card-edu card-edu-interactive p-5 bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1 flex-grow text-heading">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-base text-foreground">{scn.title}</span>
                  <span className="text-[10px] font-black text-primary uppercase bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full">{scn.level}</span>
                  <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full border border-border/40 font-bold">{scn.words}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed max-w-xl pt-1 font-medium text-learning">{scn.desc}</p>
              </div>

              <Link href={`/writing/scenario/${scn.id}`} className="self-end sm:self-center">
                <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 gap-1">
                  Start <PenLine className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
