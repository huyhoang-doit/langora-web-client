"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2, Star, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PersonalizedQuizPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="personalized-grammar-quiz-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/grammar">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Personalized Quiz</h2>
          <p className="text-xs text-muted-foreground">Targeted exercise based on your mistake patterns</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full border border-primary/20 flex items-center justify-center mx-auto text-primary animate-pulse">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-black text-foreground">Diagnostic Drill Ready</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ora has compiled <span className="text-primary font-bold">5 custom questions</span> targeting your common mistakes in "Present Perfect" and "Workplace Inversions" from your essay submissions.
            </p>
          </div>

          <Card className="border-border bg-muted/10">
            <CardContent className="p-5 text-left space-y-3">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">Target Areas:</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary" /> Past Participle Auxiliary 'have'</li>
                <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-primary" /> Negative Adverb Inversion structures</li>
              </ul>
            </CardContent>
          </Card>

          <Button className="w-full py-6 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(168,240,106,0.3)] transition-all flex items-center justify-center gap-2">
            <Wand2 className="w-4 h-4" /> Start Custom Practice
          </Button>
        </div>
      </div>
    </div>
  );
}
