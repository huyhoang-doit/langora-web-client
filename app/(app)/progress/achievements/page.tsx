"use client";

import Link from "next/link";
import { ArrowLeft, Award, Trophy, Compass, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/progress">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Achievements</h2>
          <p className="text-xs text-muted-foreground">Unlocked badges and awards</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach) => (
              <Card key={ach.name} className={`hover:border-primary/50 transition-colors ${ach.unlocked ? "border-primary/20 bg-primary/5" : ""}`}>
                <CardContent className="p-5 flex gap-4 items-start">
                  <span className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 ${
                    ach.unlocked ? "text-primary bg-primary/10 border-primary/20" : "text-muted-foreground bg-muted/40 border-border"
                  }`}>
                    {ach.unlocked ? <Trophy className="w-6 h-6 animate-pulse" /> : <Award className="w-6 h-6" />}
                  </span>
                  <div className="space-y-1">
                    <span className="font-bold text-sm block text-foreground">{ach.name}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{ach.desc}</p>
                    {ach.unlocked ? (
                      <span className="text-[10px] text-primary font-bold block pt-1">Unlocked {ach.date}</span>
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-semibold block pt-1">Target: {ach.requirement}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
