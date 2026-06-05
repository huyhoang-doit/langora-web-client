"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Calendar, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StreakCalendarPage() {
  const days = [
    { date: "June 1", completed: true },
    { date: "June 2", completed: true },
    { date: "June 3", completed: true },
    { date: "June 4", completed: true },
    { date: "June 5", completed: true },
    { date: "June 6", completed: false },
    { date: "June 7", completed: false },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="streak-calendar-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/progress">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Streak Calendar</h2>
            <p className="text-xs text-muted-foreground">Monitor daily learning habits</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-sm border px-3 py-1 bg-muted/40 rounded-lg text-amber-500 border-amber-500/20">
          <Flame className="w-4 h-4 animate-bounce" /> 15 Days Active
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 text-center space-y-3">
              <h3 className="text-lg font-bold text-primary flex items-center justify-center gap-1.5">
                <Sparkles className="w-5 h-5" /> 15-Day Milestone Reached!
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                You are performing at the top 10% of B2 learners. Keep practicing daily to maintain memory degradation stability.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"><Calendar className="w-4 h-4" /> June Activity</h4>
            <div className="grid grid-cols-7 gap-3 text-center">
              {days.map((day) => (
                <div key={day.date} className="space-y-2">
                  <div className={`aspect-square w-full rounded-xl border flex items-center justify-center font-bold text-sm ${
                    day.completed ? "bg-primary border-primary text-primary-foreground shadow-[0_0_8px_rgba(168,240,106,0.3)]" : "bg-card/40 border-border text-muted-foreground"
                  }`}>
                    {day.completed ? "✓" : ""}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-semibold">{day.date.split(" ")[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
