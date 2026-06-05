"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MasteredWordsPage() {
  const masteredWords = [
    { word: "Petrichor", phonetic: "/ˈpet.rɪ.kɔːr/", definition: "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.", date: "Mastered 3 days ago" },
    { word: "Synergy", phonetic: "/ˈsɪn.ə.dʒi/", definition: "The interaction or cooperation of two or more organizations to produce a combined effect greater than the sum of their separate effects.", date: "Mastered 1 week ago" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="mastered-words-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Mastered Lexicon</h2>
          <p className="text-xs text-muted-foreground font-semibold">Words with over 90% retention rate</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {masteredWords.map((item) => (
            <div key={item.word} className="card-edu card-edu-interactive p-5 bg-card flex justify-between items-start gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg text-primary text-heading">{item.word}</span>
                  <span className="text-xs text-muted-foreground italic font-medium">{item.phonetic}</span>
                  <span className="text-[9px] font-black text-emerald-600 bg-emerald-500/5 border-2 border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 text-heading">
                    <CheckCircle className="w-3 h-3 fill-current" /> Mastered
                  </span>
                </div>
                <p className="text-xs text-foreground leading-relaxed text-learning font-semibold">{item.definition}</p>
                <p className="text-[10px] text-muted-foreground pt-1 font-bold">{item.date}</p>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-primary rounded-full flex items-center justify-center p-0">
                  <Volume2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
