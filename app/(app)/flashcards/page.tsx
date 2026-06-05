"use client";

import Link from "next/link";
import React, { useState, useCallback } from "react";
import { Volume2, Undo2, Flag, Bell, BookMarked, Zap, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const cards = [
  {
    front: { kanji: "木漏れ日", reading: "Komorebi", tag: "N1 Vocabulary" },
    back: {
      word: "Komorebi",
      meaning: '"Sunlight filtering through trees"',
      sentence: "森の中を歩くと、美しい木漏れ日が見えた。",
      translation: "Walking through the forest, I saw the beautiful sunlight filtering through the trees.",
      deck: "Nature & Atmosphere",
    },
  },
  {
    front: { kanji: "儚い", reading: "Hakanai", tag: "N2 Vocabulary" },
    back: {
      word: "Hakanai",
      meaning: '"Fleeting, ephemeral, transient"',
      sentence: "彼女の笑顔 là 儚いものだった。",
      translation: "Her smile was a fleeting thing.",
      deck: "Emotions & Feelings",
    },
  },
];

const ratings = [
  { label: "Again", time: "< 1m", color: "text-rose-500", border: "border-rose-500/20 hover:border-rose-500/50 bg-rose-500/5", key: "again" },
  { label: "Hard", time: "2d", color: "text-amber-500", border: "border-amber-500/20 hover:border-amber-500/50 bg-amber-500/5", key: "hard" },
  { label: "Good", time: "4d", color: "text-blue-500", border: "border-blue-500/20 hover:border-blue-500/50 bg-blue-500/5", key: "good" },
  { label: "Easy", time: "7d", color: "text-indigo-500", border: "border-indigo-500/20 hover:border-indigo-500/50 bg-indigo-500/5", key: "easy", featured: true },
];

export default function FlashcardsPage() {
  const [cardIndex, setCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [xp, setXp] = useState(340);
  const [reviewed, setReviewed] = useState(12);
  const [xpAnimation, setXpAnimation] = useState(false);

  const currentCard = cards[cardIndex % cards.length];
  const total = 45;
  const progress = Math.round((reviewed / total) * 100);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleRating = useCallback((key: string) => {
    if (key === "easy" || key === "good") {
      setXp((prev) => prev + 15);
      setXpAnimation(true);
      setTimeout(() => setXpAnimation(false), 1200);
    }
    setReviewed((prev) => prev + 1);
    setIsFlipped(false);
    setTimeout(() => setCardIndex((prev) => prev + 1), 300);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-sans" id="flashcards-page">
      {/* Header Top Bar */}
      <header className="h-20 flex justify-between items-center px-8 bg-background/80 backdrop-blur-xl border-b-2 border-border z-10 flex-shrink-0">
        <div className="flex items-center gap-5">
          <Link href="/vocabulary">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border-2 border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="w-48 h-2 bg-muted" indicatorClassName="bg-indigo-500" />
            <span className="text-xs font-bold text-indigo-500">{reviewed}/{total} cards reviewed</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2 bg-indigo-500/10 border-2 border-indigo-500/20 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-black text-indigo-500">{xp} XP</span>
            {xpAnimation && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-indigo-500 font-bold text-sm animate-bounce pointer-events-none">
                +15 XP
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Card Stage */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ai-radial-glow pointer-events-none" />

        {/* 3D Flip Card */}
        <div
          className="w-[380px] h-[240px] perspective cursor-pointer relative"
          onClick={handleFlip}
        >
          <div
            className={`card-inner relative w-full h-full duration-500 transform style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* Front Face */}
            <div className="card-face absolute inset-0 w-full h-full backface-hidden card-edu bg-card p-8 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mb-3 bg-indigo-500/10 border-2 border-indigo-500/20 px-2 py-0.5 rounded">
                {currentCard.front.tag}
              </span>
              <h2 className="text-4xl font-black text-foreground mb-1 tracking-tight">
                {currentCard.front.kanji}
              </h2>
              <p className="text-sm text-muted-foreground italic">{currentCard.front.reading}</p>
              
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 mt-6 font-semibold uppercase tracking-wider">
                <RefreshCw className="w-3.5 h-3.5" /> Tap to reveal
              </div>
            </div>

            {/* Back Face */}
            <div className="card-face card-back absolute inset-0 w-full h-full backface-hidden rotate-y-180 card-edu border-indigo-500/30 bg-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-indigo-500 leading-tight">{currentCard.back.word}</h3>
                    <p className="text-xs text-foreground font-semibold italic">{currentCard.back.meaning}</p>
                  </div>
                  <Button
                    size="icon"
                    className="w-10 h-10 bg-indigo-500 text-white rounded-full hover:scale-105 active:scale-95 transition-all flex-shrink-0 border-2 border-indigo-600 shadow-[0_3px_0_#312e81]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 bg-muted/40 border-2 border-border/40 rounded-xl space-y-1">
                  <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">Example</span>
                  <p className="text-xs text-foreground font-medium leading-relaxed">{currentCard.back.sentence}</p>
                  <p className="text-[10px] text-muted-foreground italic leading-relaxed">{currentCard.back.translation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="mt-12 w-full max-w-xl">
          <div className="grid grid-cols-4 gap-4">
            {ratings.map(({ label, time, color, border, key, featured }) => (
              <button
                key={key}
                onClick={() => handleRating(key)}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-[16px] border-2 active:scale-95 transition-all cursor-pointer ${
                  featured
                    ? "bg-indigo-500 border-indigo-600 text-white hover:bg-indigo-600 shadow-[0_4px_0_#312e81]"
                    : `border-border hover:border-primary/45 bg-muted/30`
                }`}
              >
                <span className={`font-bold text-sm ${featured ? "text-white" : color}`}>{label}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${featured ? "text-white/80" : "text-muted-foreground/60"}`}>{time}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center items-center gap-6 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            <button className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer">
              <Undo2 className="w-4 h-4" /> Undo
            </button>
            <div className="w-1.5 h-1.5 rounded-full bg-border" />
            <button className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer">
              <Flag className="w-4 h-4" /> Flag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
