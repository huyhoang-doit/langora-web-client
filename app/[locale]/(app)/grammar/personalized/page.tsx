"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageLogoWeb from "@/components/image-logo-web";

export default function PersonalizedQuizPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="personalized-grammar-quiz-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/grammar">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Personalized Quiz</h2>
          <p className="text-xs text-muted-foreground font-semibold">Targeted exercise based on your mistake patterns</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl border-2 border-primary/20 flex items-center justify-center mx-auto text-primary relative">
            <ImageLogoWeb variant="mascot" className="animate-bounce w-12 h-12" />
            <Sparkles className="w-5 h-5 absolute -top-1 -right-1 text-yellow-500 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-black text-foreground text-heading">Diagnostic Drill Ready</h3>
            <p className="text-xs text-muted-foreground leading-relaxed font-semibold text-learning">
              Ora has compiled <span className="text-primary font-bold">5 custom questions</span> targeting your common mistakes in "Present Perfect" and "Workplace Inversions" from your essay submissions.
            </p>
          </div>

          <div className="card-edu bg-card p-5 text-left space-y-3">
            <h4 className="text-xs font-black text-foreground uppercase tracking-widest text-heading">Target Areas:</h4>
            <ul className="space-y-2 text-xs text-muted-foreground text-learning font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                Past Participle Auxiliary 'have'
              </li>
              <li className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </span>
                Negative Adverb Inversion structures
              </li>
            </ul>
          </div>

          <Button className="btn-edu w-full h-12 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold flex items-center justify-center gap-2 rounded-full">
            <Wand2 className="w-4 h-4" /> Start Custom Practice
          </Button>
        </div>
      </div>
    </div>
  );
}
