"use client";

import Link from "next/link";
import { ArrowLeft, Award, CheckCircle, Volume2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MasteredWordsPage() {
  const masteredWords = [
    { word: "Petrichor", phonetic: "/ˈpet.rɪ.kɔːr/", definition: "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.", date: "Mastered 3 days ago" },
    { word: "Synergy", phonetic: "/ˈsɪn.ə.dʒi/", definition: "The interaction or cooperation of two or more organizations to produce a combined effect greater than the sum of their separate effects.", date: "Mastered 1 week ago" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="mastered-words-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Mastered Lexicon</h2>
          <p className="text-xs text-muted-foreground">Words with over 90% retention rate</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {masteredWords.map((item) => (
            <Card key={item.word} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-primary">{item.word}</span>
                    <span className="text-xs text-muted-foreground italic">{item.phonetic}</span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Mastered
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{item.definition}</p>
                  <p className="text-[10px] text-muted-foreground pt-1">{item.date}</p>
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border hover:text-primary"><Volume2 className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
