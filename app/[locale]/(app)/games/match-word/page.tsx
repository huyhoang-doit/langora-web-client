"use client";

import Link from "next/link";
import { ArrowLeft, Timer, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageLogoWeb from "@/components/image-logo-web";

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
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Match Word</h2>
            <p className="text-xs text-muted-foreground font-semibold">Match cards correctly</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-primary/20 bg-primary/5 text-primary font-bold text-xs text-heading">
          <Timer className="w-3.5 h-3.5" /> 00:45
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-6 scrollbar-thin">
        <div className="w-full max-w-2xl grid grid-cols-2 gap-8">
          {/* Words */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-wider text-center mb-1 text-heading">Words</h4>
            {leftColumn.map((item, idx) => {
              const isSelected = idx === 0; // Simulate first word selected
              return (
                <button
                  key={item}
                  className={`w-full p-4 card-edu ${
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-[0_4px_0_0_rgba(99,102,241,0.25)] translate-y-[-2px]" 
                      : "card-edu-interactive bg-card/40 hover:bg-primary/5"
                  } text-center font-bold text-sm cursor-pointer transition-all text-learning`}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Meanings */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-wider text-center mb-1 text-heading">Definitions</h4>
            {rightColumn.map((item, idx) => {
              const isSelected = idx === 1; // Simulate second definition selected
              return (
                <button
                  key={item}
                  className={`w-full p-4 card-edu ${
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-[0_4px_0_0_rgba(99,102,241,0.25)] translate-y-[-2px]" 
                      : "card-edu-interactive bg-card/40 hover:bg-primary/5"
                  } text-center font-bold text-xs cursor-pointer transition-all min-h-[58px] text-learning`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Ora Companion Hint */}
        <div className="w-full max-w-2xl card-edu p-4 bg-primary/5 border-primary/20 flex gap-3 items-center">
          <ImageLogoWeb variant="mascot" className="flex-shrink-0 animate-bounce w-8 h-8" />
          <div className="text-xs">
            <span className="font-black text-primary text-heading block">Ora's Companion Tip</span>
            <span className="text-muted-foreground font-semibold">"Select a word card, then click its corresponding definition card to match them up!"</span>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t-2 border-border/60 py-4 px-6 flex justify-between items-center bg-muted/20 flex-shrink-0">
        <Button variant="ghost" size="sm" className="btn-edu border-2 border-border bg-transparent text-foreground hover:bg-muted font-bold text-xs h-9 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Restart
        </Button>
        <Link href="/games/result">
          <Button size="sm" className="btn-edu border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs h-9">
            Submit Answers
          </Button>
        </Link>
      </footer>
    </div>
  );
}
