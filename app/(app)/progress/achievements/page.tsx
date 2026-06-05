"use client";

import Link from "next/link";
import { ArrowLeft, Award, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AchievementsPage() {
  const achievements = [
    { name: "First Steps", desc: "Completed onboarding and estimated target level.", unlocked: true, date: "June 1, 2026" },
    { name: "Vocabulary Builder", desc: "Mastered over 100 new words in SRS.", unlocked: true, date: "June 3, 2026" },
    { name: "Grammar Master", desc: "Scored 100% in a B1 level grammar quiz.", unlocked: false, requirement: "Score 10/10 in B1 quiz" },
    { name: "Polyglot Legend", desc: "Maintain an active streak of 30 days.", unlocked: false, requirement: "30-day streak required" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="achievements-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/progress">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Achievements</h2>
          <p className="text-xs text-muted-foreground font-semibold">Unlocked badges and awards</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach) => (
              <div
                key={ach.name}
                className={`card-edu card-edu-interactive p-5 bg-card flex gap-4 items-start transition-all ${
                  ach.unlocked ? "border-primary/40 bg-primary/5" : ""
                }`}
              >
                <span className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center flex-shrink-0 ${
                  ach.unlocked
                    ? "text-primary bg-primary/10 border-primary/20"
                    : "text-muted-foreground bg-muted/40 border-border/60"
                }`}>
                  {ach.unlocked
                    ? <Trophy className="w-6 h-6 animate-pulse" />
                    : <Award className="w-6 h-6" />
                  }
                </span>
                <div className="space-y-1">
                  <span className="font-black text-sm block text-foreground text-heading">{ach.name}</span>
                  <p className="text-xs text-muted-foreground leading-relaxed text-learning font-semibold">{ach.desc}</p>
                  {ach.unlocked ? (
                    <span className="text-[9px] text-primary font-black block pt-1 text-heading uppercase tracking-wide">
                      🏆 Unlocked {ach.date}
                    </span>
                  ) : (
                    <span className="text-[9px] text-muted-foreground font-bold block pt-1 uppercase tracking-wide text-heading">
                      🔒 Target: {ach.requirement}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
