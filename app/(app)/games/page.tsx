"use client";

import Link from "next/link";
import { Gamepad2, Award, Zap, Shuffle, Music, Flame } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GameHubPage() {
  const games = [
    { id: "match-word", name: "Match Word", desc: "Connect words with their correct meaning under a time limit.", icon: Shuffle, color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
    { id: "fill-blank", name: "Fill in the Blank", desc: "Complete sentences by selecting or typing the missing vocabulary.", icon: Zap, color: "text-primary bg-primary/10 border-primary/20" },
    { id: "listen-type", name: "Listening Typing", desc: "Listen to natural pronunciations and type the spelling accurately.", icon: Music, color: "text-pink-500 bg-pink-500/10 border-pink-500/20" },
    { id: "challenge", name: "Vocabulary Challenge", desc: "Answer consecutive quick questions to hit high streaks and gain bonus XP.", icon: Flame, color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="game-hub-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">Game Hub</h2>
          <p className="text-xs text-muted-foreground">Practice vocabulary through gamified sessions</p>
        </div>
        <Link href="/games/result">
          <Button variant="ghost" size="sm" className="font-bold gap-1 border">
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
                <Card key={gm.id} className="hover:border-primary/50 transition-colors flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <span className={`w-10 h-10 rounded-lg flex items-center justify-center border ${gm.color}`}>
                        <Icon className="w-5 h-5" />
                      </span>
                    </div>
                    <CardTitle className="text-base font-bold text-foreground mt-4">{gm.name}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground">{gm.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6 flex justify-end">
                    <Link href={`/games/${gm.id}`}>
                      <Button size="sm" className="font-bold text-xs">
                        Play Game
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
