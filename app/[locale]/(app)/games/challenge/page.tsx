"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VocabularyChallengePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="vocabulary-challenge-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Lexical Challenge</h2>
            <p className="text-xs text-muted-foreground font-semibold">Rapid-fire vocabulary drill</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-amber-500/20 bg-amber-500/5 text-amber-600 font-bold text-xs text-heading">
            <Flame className="w-3.5 h-3.5 fill-current" /> 12 Streak
          </div>
          <div className="flex items-center gap-1 px-3 py-1 rounded-full border-2 border-rose-500/20 bg-rose-500/5 text-rose-500 font-bold text-xs text-heading">
            <Heart className="w-3.5 h-3.5 fill-current" /> 3 Lives
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md space-y-6">
          <div className="card-edu p-8 bg-card text-center relative overflow-hidden">
            <span className="text-[10px] text-primary uppercase font-black tracking-widest block mb-2 text-heading">Question 13 of 20</span>
            <p className="text-xl text-foreground font-black leading-relaxed text-learning">
              What is the definition of "Komorebi"?
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Smell of earth after rain",
              "Sunlight filtering through tree leaves",
              "Cooperation producing greater combined effect",
              "Continuous movement to seek new lands",
            ].map((opt, i) => (
              <button
                key={i}
                className="w-full p-4 card-edu card-edu-interactive bg-card/40 hover:bg-primary/5 text-left font-bold text-sm cursor-pointer transition-all text-learning"
              >
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-border bg-background mr-3 text-xs font-black text-heading text-muted-foreground group-hover:border-primary/40 group-hover:text-primary">
                  {i + 1}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* AI Ora Companion Hint */}
          <div className="card-edu p-4 bg-primary/5 border-primary/20 flex gap-3 items-center">
            <span className="text-2xl flex-shrink-0 animate-bounce">🐲</span>
            <div className="text-xs">
              <span className="font-black text-primary text-heading block">Ora's Companion Tip</span>
              <span className="text-muted-foreground font-semibold">"This word has Japanese origins and describes a beautiful forest light effect!"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t-2 border-border/60 py-4 px-6 flex justify-between items-center bg-muted/20 flex-shrink-0">
        <Button variant="ghost" size="sm" className="btn-edu border-2 border-border bg-transparent text-foreground hover:bg-muted font-bold text-xs h-9">
          Skip
        </Button>
        <Link href="/games/result">
          <Button size="sm" className="btn-edu border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs h-9">
            Submit Answer
          </Button>
        </Link>
      </footer>
    </div>
  );
}
