"use client";

import Link from "next/link";
import React, { useState, useCallback } from "react";
import { Volume2, Undo2, Flag, Zap, ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    front: { kanji: "木漏れ日", reading: "Komorebi", tag: "N1 Vocabulary" },
    back: {
      word: "Komorebi",
      meaning: '"Sunlight filtering through trees"',
      sentence: "森の中を歩くと, 美しい木漏れ日が見えた。",
      translation: "Walking through the forest, I saw the beautiful sunlight filtering through the trees.",
      deck: "Nature & Atmosphere",
    },
  },
  {
    front: { kanji: "儚い", reading: "Hakanai", tag: "N2 Vocabulary" },
    back: {
      word: "Hakanai",
      meaning: '"Fleeting, ephemeral, transient"',
      sentence: "彼女の笑顔は儚いものだった。",
      translation: "Her smile was a fleeting thing.",
      deck: "Emotions & Feelings",
    },
  },
];

const ratings = [
  { label: "Again", time: "< 1m", color: "text-rose-500", key: "again" },
  { label: "Hard", time: "2d", color: "text-amber-500", key: "hard" },
  { label: "Good", time: "4d", color: "text-blue-500", key: "good" },
  { label: "Easy", time: "7d", color: "text-indigo-500", key: "easy", featured: true },
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
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-48 h-2.5 bg-muted rounded-full overflow-hidden border-2 border-border/40">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <span className="text-xs font-black text-primary text-heading">{reviewed}/{total} cards</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-3 py-1 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-black text-primary text-heading">{xp} XP</span>
            {xpAnimation && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-black text-sm animate-bounce pointer-events-none text-heading">
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
          className="w-[380px] h-[240px] perspective-1000 cursor-pointer relative"
          onClick={handleFlip}
        >
          <div
            className={`card-inner relative w-full h-full duration-500 transform style-preserve-3d ${isFlipped ? "card-flipped" : ""}`}
          >
            {/* Front Face */}
            <div className="card-face absolute inset-0 w-full h-full backface-hidden card-edu bg-card p-8 flex flex-col items-center justify-center text-center">
              <span className="text-[9px] font-black text-primary uppercase tracking-widest mb-3 bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">
                {currentCard.front.tag}
              </span>
              <h2 className="text-4xl font-black text-foreground mb-1 tracking-tight text-heading">
                {currentCard.front.kanji}
              </h2>
              <p className="text-sm text-muted-foreground italic font-medium">{currentCard.front.reading}</p>
              
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground/60 mt-6 font-black uppercase tracking-wider text-heading">
                <RefreshCw className="w-3.5 h-3.5" /> Tap to reveal
              </div>
            </div>

            {/* Back Face */}
            <div className="card-face card-back absolute inset-0 w-full h-full backface-hidden card-flipped card-edu bg-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-black text-primary leading-tight text-heading">{currentCard.back.word}</h3>
                    <p className="text-xs text-foreground font-bold italic mt-0.5">{currentCard.back.meaning}</p>
                  </div>
                  <Button
                    size="icon"
                    className="btn-edu w-10 h-10 border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0 flex items-center justify-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Speak logic
                    }}
                  >
                    <Volume2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-3 bg-muted/40 border-2 border-border/40 rounded-xl space-y-1 text-learning">
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest block text-heading">Example</span>
                  <p className="text-xs text-foreground font-semibold leading-relaxed">{currentCard.back.sentence}</p>
                  <p className="text-[10px] text-muted-foreground italic leading-relaxed">{currentCard.back.translation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="mt-12 w-full max-w-xl">
          <div className="grid grid-cols-4 gap-4">
            {ratings.map(({ label, time, color, key, featured }) => (
              <button
                key={key}
                onClick={() => handleRating(key)}
                className={`btn-edu flex flex-col items-center justify-center gap-0.5 p-4 h-auto border-2 ${
                  featured
                    ? "bg-primary text-primary-foreground border-primary-foreground/15 hover:bg-primary/95"
                    : "border-border hover:border-primary/45 bg-muted/30 text-foreground"
                }`}
              >
                <span className={`font-black text-sm text-heading ${featured ? "text-primary-foreground" : color}`}>{label}</span>
                <span className={`text-[9px] font-bold uppercase tracking-wider ${featured ? "text-primary-foreground/85" : "text-muted-foreground/60"}`}>{time}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center items-center gap-6 text-muted-foreground text-xs font-black uppercase tracking-wider text-heading">
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
