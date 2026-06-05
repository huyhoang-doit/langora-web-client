"use client";

import Link from "next/link";
import { ArrowLeft, Trophy, Medal, Flame } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function LeaderboardPage() {
  const users = [
    { rank: 1, name: "Hoang", xp: "2,450 XP", streak: "15 days", active: true },
    { rank: 2, name: "Minh Tri", xp: "2,120 XP", streak: "12 days", active: false },
    { rank: 3, name: "Phuong Anh", xp: "1,980 XP", streak: "8 days", active: false },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="leaderboard-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/community">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Weekly Leaderboard</h2>
          <p className="text-xs text-muted-foreground">Compete with other polyglots and top learners</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-4 pt-4">
          {users.map((usr) => (
            <Card key={usr.rank} className={`hover:border-primary/50 transition-colors ${usr.active ? "border-primary/20 bg-primary/5" : ""}`}>
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Rank Node */}
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border flex-shrink-0 ${
                    usr.rank === 1 ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                    usr.rank === 2 ? "bg-slate-400/10 border-slate-400/20 text-slate-400" :
                    "bg-orange-500/10 border-orange-500/20 text-orange-500"
                  }`}>
                    {usr.rank === 1 ? <Trophy className="w-4 h-4" /> : usr.rank}
                  </span>

                  <Avatar className="h-9 w-9 flex-shrink-0">
                    <AvatarFallback className="bg-muted text-xs">👤</AvatarFallback>
                  </Avatar>

                  <div>
                    <span className="font-bold text-sm text-foreground block">{usr.name}</span>
                    <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1"><Flame className="w-3.5 h-3.5 text-amber-500" /> {usr.streak}</span>
                  </div>
                </div>

                <span className="text-sm font-extrabold text-primary">{usr.xp}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
