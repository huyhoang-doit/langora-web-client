"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowLeft, RefreshCw, Volume2, Bookmark, Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FlashcardStudyPage() {
  const [flipped, setFlipped] = useState(false);

  const currentWord = {
    word: "Synergy",
    phonetic: "/ˈsɪn.ə.dʒi/",
    level: "B2",
    topic: "Business",
    definition: "The interaction or cooperation of two or more organizations to produce a combined effect greater than the sum of their separate effects.",
    example: "The merger created synergy between the marketing and sales teams.",
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="flashcard-study-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/vocabulary">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Flashcards</h2>
            <p className="text-xs text-muted-foreground">Active Recall study session</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border">
          <Bookmark className="w-4 h-4" />
        </Button>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        {/* Flashcard Component */}
        <div 
          onClick={() => setFlipped(!flipped)}
          className="w-full max-w-[400px] h-[260px] cursor-pointer perspective relative"
        >
          <div className={`w-full h-full duration-500 transform style-preserve-3d relative ${flipped ? "rotate-y-180" : ""}`}>
            {/* Front Side */}
            <Card className="absolute inset-0 w-full h-full backface-hidden flex flex-col items-center justify-center p-6 border-border bg-card/75 shadow-lg select-none">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 bg-muted px-2 py-0.5 rounded">
                {currentWord.level} • {currentWord.topic}
              </span>
              <h2 className="text-4xl font-extrabold text-primary mb-2">{currentWord.word}</h2>
              <p className="text-sm text-muted-foreground italic mb-4">{currentWord.phonetic}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-4">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} /> Click to flip
              </div>
            </Card>

            {/* Back Side */}
            <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col justify-between p-6 border-primary/30 bg-card/90 shadow-2xl select-none">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-lg text-primary">{currentWord.word}</h3>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border"><Volume2 className="w-4 h-4" /></Button>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-medium">{currentWord.definition}</p>
                <p className="text-xs text-muted-foreground italic leading-relaxed">"{currentWord.example}"</p>
              </div>

              <div className="text-[10px] text-muted-foreground/60 text-center flex items-center justify-center gap-2">
                <RefreshCw className="w-3 h-3" /> Click to hide
              </div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-6 w-full max-w-[400px] justify-center">
          <Button variant="outline" className="flex-1 py-6 rounded-xl font-bold border-destructive/20 text-destructive hover:bg-destructive/10 flex items-center justify-center gap-2">
            <X className="w-4 h-4" /> Forgot
          </Button>
          <Button className="flex-1 py-6 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(168,240,106,0.3)] flex items-center justify-center gap-2">
            <Check className="w-4 h-4" /> Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
