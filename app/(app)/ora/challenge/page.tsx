"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Flame, Play, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OraDailyChallengePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-daily-challenge-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/ora">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Daily Challenge</h2>
            <p className="text-xs text-muted-foreground">Keep your streak active with today's drill</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-sm border px-3 py-1 bg-muted/40 rounded-lg text-amber-500 border-amber-500/20">
          <Flame className="w-4 h-4" /> 15 Streak
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md text-center space-y-6">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center justify-center mx-auto text-amber-500 animate-pulse">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-black text-foreground">Today's Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Complete a 5-sentence spelling and translation task. Earn <span className="text-primary font-bold">+50 XP</span> and secure your streak for today.
            </p>
          </div>

          <Button className="w-full py-6 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(168,240,106,0.3)] transition-all flex items-center justify-center gap-2">
            <Play className="w-4 h-4 fill-current" /> Start Mission
          </Button>
        </div>
      </div>
    </div>
  );
}
