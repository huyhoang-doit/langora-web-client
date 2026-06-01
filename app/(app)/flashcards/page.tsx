"use client";

import { useState, useCallback } from "react";
import { Volume2, Undo2, Flag, Bell, BookMarked, Zap } from "lucide-react";
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
      sentence: "彼女の笑顔は儚いものだった。",
      translation: "Her smile was a fleeting thing.",
      deck: "Emotions & Feelings",
    },
  },
  {
    front: { kanji: "木枯らし", reading: "Kogarashi", tag: "N1 Vocabulary" },
    back: {
      word: "Kogarashi",
      meaning: '"Cold wintry wind"',
      sentence: "木枯らしが街を吹き抜けた。",
      translation: "A cold wintry wind blew through the city.",
      deck: "Nature & Atmosphere",
    },
  },
];

const ratings = [
  { label: "Again", time: "< 1m", color: "text-red-400", hoverBorder: "hover:border-red-500/50", hoverBg: "hover:bg-red-900/20", key: "again" },
  { label: "Hard", time: "2d", color: "text-orange-400", hoverBorder: "hover:border-orange-500/50", hoverBg: "hover:bg-orange-900/20", key: "hard" },
  { label: "Good", time: "4d", color: "text-blue-400", hoverBorder: "hover:border-blue-500/50", hoverBg: "hover:bg-blue-900/20", key: "good" },
  { label: "Easy", time: "7d", color: "text-primary-foreground", hoverBorder: "", hoverBg: "", key: "easy", featured: true },
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
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header Top Bar */}
      <header className="h-16 flex justify-between items-center px-8 bg-background/80 backdrop-blur-xl border-b z-10 flex-shrink-0">
        <div className="flex items-center gap-5">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Today's Review</span>
          <div className="flex items-center gap-3">
            <Progress value={progress} className="w-48 h-2 bg-muted" indicatorClassName="bg-primary" />
            <span className="text-xs font-semibold text-primary">{reviewed}/{total} cards</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{xp} XP</span>
            {xpAnimation && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-primary font-bold text-sm animate-bounce pointer-events-none">
                +15 XP
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full">
            <BookMarked className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Card Stage */}
      <div className="flex-grow flex flex-col items-center justify-center p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ai-radial-glow pointer-events-none" />

        {/* 3D Flip Card */}
        <div
          className="w-full max-w-2xl perspective-1000 cursor-pointer"
          onClick={handleFlip}
          style={{ height: "min(400px, 50vw)" }}
        >
          <div
            className={`card-inner relative w-full h-full shadow-2xl rounded-[32px] ${isFlipped ? "card-flipped" : ""}`}
          >
            {/* Front Face */}
            <div className="card-face absolute inset-0 w-full h-full glass-strong rounded-[32px] flex flex-col items-center justify-center p-10">
              <div className="absolute top-5 left-5 flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  {currentCard.front.tag}
                </Badge>
              </div>
              <h2 className="text-7xl font-bold text-foreground mb-3 tracking-tight">
                {currentCard.front.kanji}
              </h2>
              <p className="text-2xl text-muted-foreground opacity-60">{currentCard.front.reading}</p>
              <div className="mt-8 flex items-center gap-2 text-muted-foreground">
                <span className="text-sm">👆</span>
                <span className="text-xs font-medium uppercase tracking-widest opacity-40">Tap to reveal</span>
              </div>
            </div>

            {/* Back Face */}
            <div className="card-face card-back absolute inset-0 w-full h-full glass-strong rounded-[32px] flex flex-col p-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">{currentCard.back.word}</h3>
                  <p className="text-lg text-foreground italic">{currentCard.back.meaning}</p>
                </div>
                <Button
                  size="icon"
                  className="w-14 h-14 bg-primary text-primary-foreground rounded-full hover:scale-110 active:scale-95 transition-all flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Volume2 className="w-6 h-6" />
                </Button>
              </div>
              <div className="space-y-4 flex-grow">
                <div className="p-4 bg-muted/20 rounded-xl border border-border/50">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2 opacity-50">Example Sentence</p>
                  <p className="text-sm text-foreground leading-relaxed mb-2">
                    {currentCard.back.sentence.split(currentCard.back.word).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-primary">{currentCard.back.word}</span>}
                      </span>
                    ))}
                  </p>
                  <p className="text-xs text-muted-foreground italic">{currentCard.back.translation}</p>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 text-muted-foreground text-xs opacity-60">
                <span>ℹ️</span>
                <span>Added from "{currentCard.back.deck}" deck</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="mt-8 w-full max-w-2xl">
          <div className="grid grid-cols-4 gap-4">
            {ratings.map(({ label, time, color, hoverBorder, hoverBg, key, featured }) => (
              <button
                key={key}
                onClick={() => handleRating(key)}
                className={`flex flex-col items-center gap-1.5 p-4 rounded-2xl transition-all border active:scale-95 ${
                  featured
                    ? "bg-primary border-transparent hover:brightness-110 text-primary-foreground"
                    : `bg-muted/30 border-border ${hoverBorder} ${hoverBg}`
                }`}
              >
                <span className={`font-bold text-xl ${featured ? "text-primary-foreground" : color}`}>{label}</span>
                <span className={`text-xs uppercase tracking-tighter ${featured ? "text-primary-foreground opacity-80" : "text-muted-foreground opacity-60"}`}>{time}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex justify-center items-center gap-6">
            <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Undo2 className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Undo</span>
            </Button>
            <div className="w-1 h-1 rounded-full bg-border" />
            <Button variant="ghost" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Flag className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wider">Flag Card</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
