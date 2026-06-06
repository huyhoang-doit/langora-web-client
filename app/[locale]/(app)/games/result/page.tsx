"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, RefreshCw } from "lucide-react";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/games">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Session Performance</h2>
          <p className="text-xs text-muted-foreground font-semibold">Results from your gamified study session</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-xl text-center space-y-8">
          <div className="space-y-3">
            <div className="text-6xl animate-bounce mb-2">🐲</div>
            <h2 className="text-2xl font-black text-foreground text-heading">Congratulations!</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto font-semibold">
              Ora is super proud of you! You performed exceptionally in matching words and earned bonus XP for completing the test quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ label, value, desc }) => (
              <div key={label} className="card-edu p-5 flex flex-col items-center text-center bg-card">
                <span className="text-[10px] text-primary uppercase font-black tracking-widest text-heading">{label}</span>
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 my-1 text-heading">
                  {value}
                </span>
                <span className="text-[10px] text-muted-foreground font-semibold">{desc}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-4 max-w-sm mx-auto pt-4">
            <Link href="/games" className="flex-1">
              <Button variant="outline" className="btn-edu w-full border-2 border-border bg-transparent text-foreground hover:bg-muted font-bold text-sm h-12 flex items-center justify-center gap-1.5">
                <RefreshCw className="w-4 h-4" /> Play Again
              </Button>
            </Link>
            <Link href="/dashboard" className="flex-1">
              <Button className="btn-edu w-full border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-sm h-12 flex items-center justify-center gap-1.5">
                Done <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
