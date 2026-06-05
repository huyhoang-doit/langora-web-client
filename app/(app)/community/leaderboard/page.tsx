"use client";

import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function LeaderboardPage() {
  const users = [
    { rank: 1, name: "Hoang", xp: "2,450 XP", streak: "15 days", active: true },
    { rank: 2, name: "Minh Tri", xp: "2,120 XP", streak: "12 days", active: false },
    { rank: 3, name: "Phuong Anh", xp: "1,980 XP", streak: "8 days", active: false },
    { rank: 4, name: "Sarah Connor", xp: "1,750 XP", streak: "5 days", active: false },
    { rank: 5, name: "Alex Mercer", xp: "1,620 XP", streak: "3 days", active: false },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="leaderboard-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/community">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Weekly Leaderboard</h2>
          <p className="text-xs text-muted-foreground font-semibold">Compete with other polyglots and top learners</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          {/* Podium for Top 3 */}
          <div className="grid grid-cols-3 gap-4 items-end pt-4 pb-2">
            {/* Rank 2 (Left) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">🥈</div>
              <div className="card-edu p-4 bg-slate-300/5 border-slate-300 text-center w-full relative">
                <Avatar className="h-10 w-10 mx-auto border-2 border-slate-300 mb-2">
                  <AvatarFallback className="bg-muted text-xs">👤</AvatarFallback>
                </Avatar>
                <span className="font-black text-xs block truncate text-heading">Minh Tri</span>
                <span className="text-[10px] font-black text-slate-400 block text-heading">2,120 XP</span>
              </div>
            </div>

            {/* Rank 1 (Middle - Higher) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl animate-bounce">👑</div>
              <div className="card-edu p-5 bg-amber-500/5 border-amber-500 text-center w-full relative shadow-lg">
                <Avatar className="h-12 w-12 mx-auto border-2 border-amber-500 mb-2">
                  <AvatarFallback className="bg-muted text-xs">👤</AvatarFallback>
                </Avatar>
                <span className="font-black text-sm block truncate text-heading">Hoang</span>
                <span className="text-xs font-black text-amber-500 block text-heading">2,450 XP</span>
                <span className="absolute -top-3 -right-3 text-lg">🔥</span>
              </div>
            </div>

            {/* Rank 3 (Right) */}
            <div className="flex flex-col items-center space-y-2">
              <div className="text-3xl">🥉</div>
              <div className="card-edu p-4 bg-orange-500/5 border-orange-500 text-center w-full relative">
                <Avatar className="h-10 w-10 mx-auto border-2 border-orange-500 mb-2">
                  <AvatarFallback className="bg-muted text-xs">👤</AvatarFallback>
                </Avatar>
                <span className="font-black text-xs block truncate text-heading">Phuong Anh</span>
                <span className="text-[10px] font-black text-orange-400 block text-heading">1,980 XP</span>
              </div>
            </div>
          </div>

          {/* Main Leaderboard List */}
          <div className="card-edu bg-card p-4 space-y-3">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-wider px-2 text-heading mb-2">
              Standings
            </h3>
            {users.map((usr) => {
              const isFirst = usr.rank === 1;
              const isSecond = usr.rank === 2;
              const isThird = usr.rank === 3;

              return (
                <div 
                  key={usr.rank} 
                  className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all ${
                    usr.active 
                      ? "border-primary bg-primary/5 shadow-[0_3px_0_0_rgba(99,102,241,0.15)]" 
                      : "border-transparent hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs border flex-shrink-0 ${
                      isFirst ? "bg-amber-500/10 border-amber-500/20 text-amber-600" :
                      isSecond ? "bg-slate-400/10 border-slate-400/20 text-slate-500" :
                      isThird ? "bg-orange-500/10 border-orange-500/20 text-orange-600" :
                      "bg-muted border-border text-muted-foreground"
                    }`}>
                      {usr.rank}
                    </span>

                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className="bg-muted text-[10px]">👤</AvatarFallback>
                    </Avatar>

                    <div>
                      <span className="font-black text-sm text-foreground block text-heading">{usr.name}</span>
                      <span className="text-[9px] text-muted-foreground font-bold flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-500 fill-current" /> {usr.streak}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-primary text-heading">{usr.xp}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
