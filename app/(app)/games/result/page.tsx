"use client";

import Link from "next/link";
import { ArrowLeft, Award, Trophy, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GameResultPage() {
  const stats = [
    { label: "Accuracy", value: "85%", desc: "17/20 Words correct" },
    { label: "Experience Gain", value: "+120 XP", desc: "Bonus streak included" },
    { label: "Completion Time", value: "02m 45s", desc: "Target was 04m 00s" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="game-result-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/games">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Session Performance</h2>
          <p className="text-xs text-muted-foreground">Results from your gamified study session</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-xl text-center space-y-8">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-primary/10 rounded-full border border-primary/20 flex items-center justify-center mx-auto text-primary animate-bounce">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-foreground">Congratulations!</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">You performed exceptionally in matching words. You've earned bonus XP for completing the test quickly.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ label, value, desc }) => (
              <Card key={label} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-5 flex flex-col items-center text-center">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{label}</span>
                  <span className="text-xl font-extrabold text-primary my-1">{value}</span>
                  <span className="text-[10px] text-muted-foreground font-semibold">{desc}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4 max-w-sm mx-auto pt-4">
            <Link href="/games" className="flex-1">
              <Button variant="outline" className="w-full py-6 rounded-xl font-bold border-border flex items-center justify-center gap-1.5">
                <RefreshCw className="w-4 h-4" /> Play Again
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button className="w-full py-6 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(168,240,106,0.3)] transition-all flex items-center justify-center gap-1.5">
                Done <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
