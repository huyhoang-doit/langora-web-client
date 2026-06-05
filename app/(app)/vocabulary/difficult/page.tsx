"use client";

import Link from "next/link";
import { ArrowLeft, AlertCircle, Volume2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DifficultWordsPage() {
  const difficultWords = [
    { word: "Ubiquitous", phonetic: "/juːˈbɪk.wɪ.təs/", definition: "Present, appearing, or found everywhere.", mastery: 15 },
    { word: "Discrepancy", phonetic: "/dɪsˈkrep.ən.si/", definition: "An illogical lack of compatibility or similarity between two or more facts.", mastery: 28 },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="difficult-words-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Difficult Lexicon</h2>
          <p className="text-xs text-muted-foreground font-semibold">Words requiring targeted attention</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Warning Card with Mascot */}
          <div className="card-edu p-6 bg-destructive/5 border-destructive/20 flex gap-4 items-start">
            <span className="text-3xl animate-bounce flex-shrink-0">🐲</span>
            <div>
              <h3 className="text-sm font-black text-destructive uppercase tracking-widest text-heading flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> Weakness Analysis
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold text-learning">
                These words have a retention rate below 30%. Ora will schedule them more frequently in your daily flashcard reviews and writing prompts until you master them!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {difficultWords.map((item) => (
              <div 
                key={item.word} 
                className="card-edu card-edu-interactive p-5 bg-card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-primary text-heading">{item.word}</span>
                    <span className="text-xs text-muted-foreground italic font-medium">{item.phonetic}</span>
                  </div>
                  <p className="text-xs text-foreground leading-relaxed text-learning font-semibold">{item.definition}</p>
                  
                  <div className="w-44 pt-2 space-y-1.5">
                    <div className="flex justify-between items-center text-[9px] font-black text-heading">
                      <span className="text-muted-foreground uppercase">Mastery</span>
                      <span className="text-destructive font-black">{item.mastery}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden border-2 border-border/40">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-orange-400" 
                        style={{ width: `${item.mastery}%` }} 
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 self-end sm:self-center flex-shrink-0">
                  <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-primary rounded-full flex items-center justify-center p-0">
                    <Volume2 className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-destructive/20 bg-transparent text-destructive hover:bg-destructive/5 rounded-full flex items-center justify-center p-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
