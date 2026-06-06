"use client";

import Link from "next/link";
import { ArrowLeft, Flame, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageLogoWeb from "@/components/image-logo-web";

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
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/progress">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Streak Calendar</h2>
            <p className="text-xs text-muted-foreground font-semibold">Monitor daily learning habits</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs border-2 border-amber-500/20 px-3 py-1 bg-amber-500/5 rounded-full text-amber-600 font-bold">
          <Flame className="w-4 h-4 animate-bounce" /> 15 Days Active
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-6">
          {/* Milestone Banner with Ora */}
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-center">
            <ImageLogoWeb variant="mascot" className="animate-bounce flex-shrink-0 w-12 h-12" />
            <div className="text-center flex-1">
              <h3 className="text-base font-black text-primary text-heading mb-1">15-Day Milestone Reached!</h3>
              <p className="text-xs text-muted-foreground leading-relaxed text-learning font-semibold">
                You are performing at the top 10% of B2 learners. Keep practicing daily to maintain memory degradation stability.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest text-heading flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> June Activity
            </h4>
            <div className="grid grid-cols-7 gap-3 text-center">
              {days.map((day) => (
                <div key={day.date} className="space-y-2">
                  <div className={`aspect-square w-full rounded-2xl border-2 flex items-center justify-center font-black text-sm transition-all ${
                    day.completed
                      ? "bg-primary border-primary text-primary-foreground shadow-[0_4px_0_0_rgba(99,102,241,0.25)] translate-y-[-2px]"
                      : "bg-card border-border/60 text-muted-foreground"
                  }`}>
                    {day.completed ? "✓" : ""}
                  </div>
                  <span className="text-[10px] text-muted-foreground font-bold text-heading">{day.date.split(" ")[1]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
