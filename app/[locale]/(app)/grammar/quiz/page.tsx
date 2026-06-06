"use client";

import Link from "next/link";
import { ArrowLeft, Timer, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GrammarQuizPage() {
  const currentQuestion = {
    num: 2,
    total: 10,
    text: "Hardly ________ the slides when the client called to cancel the meeting.",
    options: [
      "I had sent",
      "had I sent",
      "I did send",
      "did I sent",
    ],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="grammar-quiz-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/grammar">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Grammar Quiz</h2>
            <p className="text-xs text-muted-foreground font-semibold">Question {currentQuestion.num} of {currentQuestion.total}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs border-2 border-border/60 px-3 py-1 bg-muted/40 rounded-full font-bold">
          <Timer className="w-4 h-4 text-primary" /> 00:20
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-xl space-y-6">
          <div className="card-edu p-8 bg-card text-center">
            <p className="text-base text-foreground font-semibold leading-relaxed text-learning">
              "Hardly <span className="underline decoration-primary decoration-2 underline-offset-4 text-primary font-black">          </span> the slides when the client called to cancel the meeting."
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt}
                className="w-full p-4 card-edu card-edu-interactive bg-card text-left font-bold text-sm text-learning transition-all"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t-2 border-border/60 py-4 px-6 flex justify-between items-center bg-background flex-shrink-0">
        <Button variant="ghost" size="sm" className="btn-edu h-9 px-4 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-foreground text-xs font-bold rounded-full">
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </Button>
        <Link href="/grammar">
          <Button size="sm" className="btn-edu h-9 px-4 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold flex items-center gap-1 rounded-full">
            Check Answer <Check className="w-3.5 h-3.5 stroke-[3]" />
          </Button>
        </Link>
      </footer>
    </div>
  );
}
