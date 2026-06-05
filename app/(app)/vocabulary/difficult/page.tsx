"use client";

import Link from "next/link";
import { ArrowLeft, Flame, AlertCircle, Volume2, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function DifficultWordsPage() {
  const difficultWords = [
    { word: "Ubiquitous", phonetic: "/juːˈbɪk.wɪ.təs/", definition: "Present, appearing, or found everywhere.", mastery: 15 },
    { word: "Discrepancy", phonetic: "/dɪsˈkrep.ən.si/", definition: "An illogical lack of compatibility or similarity between two or more facts.", mastery: 28 },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="difficult-words-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Difficult Lexicon</h2>
          <p className="text-xs text-muted-foreground">Words requiring targeted attention</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-6 flex gap-4 items-start">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-destructive uppercase tracking-wide">Weakness Analysis</h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  These words have a retention rate below 30%. They will appear more frequently in your daily flashcard reviews and writing tasks.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {difficultWords.map((item) => (
              <Card key={item.word} className="hover:border-destructive/50 transition-colors">
                <CardContent className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-foreground">{item.word}</span>
                      <span className="text-xs text-muted-foreground italic">{item.phonetic}</span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{item.definition}</p>
                    
                    <div className="w-44 pt-2 space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground">
                        <span>Mastery</span>
                        <span className="text-destructive">{item.mastery}%</span>
                      </div>
                      <Progress value={item.mastery} className="h-1 bg-muted" indicatorClassName="bg-destructive" />
                    </div>
                  </div>

                  <div className="flex gap-2 self-end sm:self-center">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border"><Volume2 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
