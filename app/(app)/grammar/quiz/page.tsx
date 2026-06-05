"use client";

import Link from "next/link";
import { ArrowLeft, Timer, RotateCcw, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/grammar">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Grammar Quiz</h2>
            <p className="text-xs text-muted-foreground">Question {currentQuestion.num} of {currentQuestion.total}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm border px-3 py-1 bg-muted/40 rounded-lg">
          <Timer className="w-4 h-4 text-primary" /> 00:20
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-xl space-y-6">
          <Card className="p-8 bg-card/50 border border-border text-center">
            <p className="text-lg text-foreground font-bold leading-relaxed">
              "Hardly <span className="underline decoration-primary decoration-2 underline-offset-4 text-primary font-extrabold">          </span> the slides when the client called to cancel the meeting."
            </p>
          </Card>

          <div className="grid grid-cols-1 gap-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt}
                className="w-full p-4 rounded-xl border border-border bg-card/30 hover:border-primary hover:bg-primary/5 text-left font-bold text-sm cursor-pointer active:scale-[0.98] transition-all"
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
        <Link href="/grammar">
          <Button size="sm" className="font-bold text-xs flex items-center gap-1">Check Answer <Check className="w-3.5 h-3.5" /></Button>
        </Link>
      </footer>
    </div>
  );
}
