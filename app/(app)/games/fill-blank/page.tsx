"use client";

import Link from "next/link";
import { ArrowLeft, Timer, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FillBlankPage() {
  const currentSentence = {
    text: "The company's strategy relies on building ________ with local distributors to expand market reach.",
    options: ["discord", "isolation", "synergy", "redundancy"],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="fill-blank-game-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Fill in the Blank</h2>
            <p className="text-xs text-muted-foreground font-semibold">Select the correct word to complete the context</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-primary/20 bg-primary/5 text-primary font-bold text-xs text-heading">
          <Timer className="w-3.5 h-3.5" /> 00:30
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-xl space-y-6">
          <div className="card-edu p-8 bg-card text-center relative overflow-hidden">
            <p className="text-lg text-foreground font-semibold leading-relaxed text-learning">
              "The company's strategy relies on building <span className="underline decoration-primary decoration-2 underline-offset-4 font-bold text-primary px-2">          </span> with local distributors to expand market reach."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentSentence.options.map((opt) => (
              <button
                key={opt}
                className="p-4 card-edu card-edu-interactive bg-card/40 hover:bg-primary/5 text-center font-bold text-sm cursor-pointer capitalize transition-all text-learning"
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Mascot hint */}
          <div className="card-edu p-4 bg-primary/5 border-primary/20 flex gap-3 items-center">
            <span className="text-2xl flex-shrink-0 animate-bounce">🐲</span>
            <div className="text-xs">
              <span className="font-black text-primary text-heading block">Ora's Companion Tip</span>
              <span className="text-muted-foreground font-semibold">"Look for a word that describes cooperative interaction where the combined effect is greater than the sum of individual efforts."</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t-2 border-border/60 py-4 px-6 flex justify-between items-center bg-muted/20 flex-shrink-0">
        <Button variant="ghost" size="sm" className="btn-edu border-2 border-border bg-transparent text-foreground hover:bg-muted font-bold text-xs h-9 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </Button>
        <Link href="/games/result">
          <Button size="sm" className="btn-edu border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs h-9 flex items-center gap-1">
            Check Answer <Check className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </footer>
    </div>
  );
}
