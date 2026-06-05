"use client";

import Link from "next/link";
import { ArrowLeft, HelpCircle, Timer, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MatchWordPage() {
  const leftColumn = ["Synergy", "Komorebi", "Petrichor", "Ubiquitous"];
  const rightColumn = [
    "Sunlight filtering through leaves",
    "Cooperative combined effect",
    "Present everywhere",
    "Smell after rain",
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="match-word-game-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Match Word</h2>
            <p className="text-xs text-muted-foreground">Match cards correctly</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm border px-3 py-1 bg-muted/40 rounded-lg">
          <Timer className="w-4 h-4 text-primary" /> 00:45
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex items-center justify-center scrollbar-thin">
        <div className="w-full max-w-2xl grid grid-cols-2 gap-8">
          {/* Words */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-center mb-1">Words</h4>
            {leftColumn.map((item) => (
              <button
                key={item}
                className="w-full p-4 rounded-xl border border-border bg-card/50 hover:border-primary text-center font-bold text-sm cursor-pointer active:scale-[0.98] transition-all"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Meanings */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider text-center mb-1">Definitions</h4>
            {rightColumn.map((item) => (
              <button
                key={item}
                className="w-full p-4 rounded-xl border border-border bg-card/50 hover:border-primary text-center font-bold text-xs cursor-pointer active:scale-[0.98] transition-all min-h-[58px]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t py-4 px-6 flex justify-between items-center bg-muted/20 flex-shrink-0">
        <Button variant="ghost" size="sm" className="font-bold text-xs gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Restart</Button>
        <Link href="/games/result">
          <Button size="sm" className="font-bold text-xs">Submit Answers</Button>
        </Link>
      </footer>
    </div>
  );
}
