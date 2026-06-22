"use client";

import Link from "next/link";
import { Award, Zap, Shuffle, Music, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GameHubPage() {
  const games = [
    { id: "match-word", name: "Match Word", desc: "Connect words with their correct meaning under a time limit.", icon: Shuffle, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    { id: "fill-blank", name: "Fill in the Blank", desc: "Complete sentences by selecting or typing the missing vocabulary.", icon: Zap, color: "text-primary bg-primary/10 border-primary/20" },
    { id: "listen-type", name: "Listening Typing", desc: "Listen to natural pronunciations and type the spelling accurately.", icon: Music, color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
    { id: "challenge", name: "Vocabulary Challenge", desc: "Answer consecutive quick questions to hit high streaks and gain bonus XP.", icon: Flame, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="game-hub-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Game Hub</h2>
          <p className="text-xs text-muted-foreground font-semibold">Practice vocabulary through gamified sessions</p>
        </div>
        <Link href="/games/result">
          <Button variant="ghost" size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-transparent text-foreground hover:bg-muted gap-1 border-border">
            <Award className="w-4 h-4" /> Game Results
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((gm) => {
              const Icon = gm.icon;
              return (
                <div key={gm.id} className="card-edu card-edu-interactive p-6 bg-card flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 ${gm.color}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                    <div>
                      <h3 className="text-base font-black text-foreground text-heading">{gm.name}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground mt-2 font-medium text-learning">{gm.desc}</p>
                    </div>
                  </div>
                  <div className="pt-6 flex justify-end">
                    <Link href={`/games/${gm.id}`}>
                      <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        Play Game
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
