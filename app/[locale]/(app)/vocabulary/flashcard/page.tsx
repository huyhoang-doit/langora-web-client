"use client";

import Link from "next/link";
import React, { useState } from "react";
import { ArrowLeft, RefreshCw, Volume2, Bookmark, Check, X } from "lucide-react";
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
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/vocabulary">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Flashcards</h2>
            <p className="text-xs text-muted-foreground font-semibold">Active Recall study session</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        {/* Flashcard Component */}
        <div 
          onClick={() => setFlipped(!flipped)}
          className="w-full max-w-[400px] h-[260px] cursor-pointer perspective-1000 relative"
        >
          <div className={`w-full h-full card-inner relative ${flipped ? "card-flipped" : ""}`}>
            {/* Front Side */}
            <div className="card-face absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 card-edu bg-card select-none">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-3 bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">
                {currentWord.level} • {currentWord.topic}
              </span>
              <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 mb-2 text-heading">{currentWord.word}</h2>
              <p className="text-sm text-muted-foreground italic mb-4 font-semibold">{currentWord.phonetic}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground/60 mt-4 font-semibold">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "10s" }} /> Click to flip
              </div>
            </div>

            {/* Back Side */}
            <div className="card-face card-back absolute inset-0 w-full h-full flex flex-col justify-between p-6 card-edu border-primary/35 bg-card shadow-lg select-none">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="font-black text-xl text-primary text-heading">{currentWord.word}</h3>
                  <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-primary rounded-full flex items-center justify-center p-0">
                    <Volume2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <p className="text-sm text-foreground leading-relaxed font-semibold text-learning">{currentWord.definition}</p>
                <p className="text-xs text-muted-foreground italic leading-relaxed">"{currentWord.example}"</p>
              </div>

              <div className="text-[10px] text-muted-foreground/60 text-center flex items-center justify-center gap-2 font-semibold">
                <RefreshCw className="w-3 h-3" /> Click to hide
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full max-w-[400px] justify-center">
          <Button variant="outline" className="btn-edu flex-1 border-2 border-destructive/30 text-destructive bg-transparent hover:bg-destructive/10 font-bold h-12 flex items-center justify-center gap-1.5">
            <X className="w-4 h-4" /> Forgot
          </Button>
          <Button className="btn-edu flex-1 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold h-12 flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4" /> Got it
          </Button>
        </div>
      </div>
    </div>
  );
}
