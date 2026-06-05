"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Play, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OraDailyChallengePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-daily-challenge-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/ora">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-black text-foreground text-heading">Daily Challenge</h2>
            <p className="text-xs text-muted-foreground font-semibold">Keep your streak active with today's drill</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-black text-xs border-2 px-3 py-1 bg-amber-500/10 rounded-full text-amber-500 border-amber-500/20 text-heading">
          <Flame className="w-4 h-4 text-amber-500" /> 15 Streak
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full border-2 border-amber-500/20 flex items-center justify-center mx-auto text-amber-500 animate-pulse">
            <Award className="w-8 h-8" />
          </div>

          <div className="card-edu p-6 bg-gradient-to-br from-indigo-500/10 to-transparent space-y-4">
            <h3 className="text-xl font-black text-foreground text-heading">Today's Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-semibold text-learning">
              Complete a 5-sentence spelling and translation task. Earn <span className="text-primary font-black">+50 XP</span> and secure your streak for today.
            </p>
          </div>

          <Button className="btn-edu w-full py-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-current" /> Start Mission
          </Button>
        </div>
      </div>
    </div>
  );
}
