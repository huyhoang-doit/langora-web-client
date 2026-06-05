"use client";

import Link from "next/link";
import { ArrowLeft, Timer, RotateCcw, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FillBlankPage() {
  const currentSentence = {
    text: "The company's strategy relies on building ________ with local distributors to expand market reach.",
    options: ["discord", "isolation", "synergy", "redundancy"],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="fill-blank-game-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Fill in the Blank</h2>
            <p className="text-xs text-muted-foreground">Select the correct word to complete the context</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm border px-3 py-1 bg-muted/40 rounded-lg">
          <Timer className="w-4 h-4 text-primary" /> 00:30
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-xl space-y-6">
          <Card className="p-8 bg-card/50 border border-border">
            <CardContent className="p-0 text-center">
              <p className="text-lg text-foreground font-medium leading-relaxed">
                "The company's strategy relies on building <span className="underline decoration-primary decoration-2 underline-offset-4 font-bold text-primary">          </span> with local distributors to expand market reach."
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {currentSentence.options.map((opt) => (
              <button
                key={opt}
                className="p-4 rounded-xl border border-border bg-card/30 hover:border-primary hover:bg-primary/5 text-center font-bold text-sm cursor-pointer capitalize active:scale-95 transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t py-4 px-6 flex justify-between items-center bg-muted/20 flex-shrink-0">
        <Button variant="ghost" size="sm" className="font-bold text-xs gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Reset</Button>
        <Link href="/games/result">
          <Button size="sm" className="font-bold text-xs flex items-center gap-1">Check Answer <Check className="w-3.5 h-3.5" /></Button>
        </Link>
      </footer>
    </div>
  );
}
