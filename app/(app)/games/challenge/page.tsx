"use client";

import Link from "next/link";
import { ArrowLeft, Timer, Flame, Award, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VocabularyChallengePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="vocabulary-challenge-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Lexical Challenge</h2>
            <p className="text-xs text-muted-foreground">Rapid-fire vocabulary drill</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono text-sm border px-3 py-1 bg-muted/40 rounded-lg text-amber-500 border-amber-500/20">
            <Flame className="w-4 h-4" /> 12 Streak
          </div>
          <div className="flex items-center gap-1 text-rose-500 font-mono text-sm">
            <Heart className="w-4 h-4 fill-current" /> 3
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md space-y-6">
          <Card className="p-8 bg-card/50 border border-border text-center">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block mb-2">Question 13</span>
            <p className="text-xl text-foreground font-bold leading-relaxed">
              What is the definition of "Komorebi"?
            </p>
          </Card>

          <div className="space-y-3">
            {[
              "Smell of earth after rain",
              "Sunlight filtering through tree leaves",
              "Cooperation producing greater combined effect",
              "Continuous movement to seek new lands",
            ].map((opt, i) => (
              <button
                key={i}
                className="w-full p-4 rounded-xl border border-border bg-card/30 hover:border-primary hover:bg-primary/5 text-left font-bold text-sm cursor-pointer active:scale-[0.98] transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
