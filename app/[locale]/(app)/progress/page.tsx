"use client";

import Link from "next/link";
import { BookOpen, PenLine, SpellCheck, Trophy, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProgressPage() {
  const sections = [
    { href: "/progress/vocabulary", name: "Vocabulary Mastery", value: "1,250 / 2,000 words", pct: 62, icon: BookOpen, desc: "Detailed mastery ratios and forgotten words analysis." },
    { href: "/progress/writing", name: "Writing Fluency", value: "8.5 Average Score", pct: 85, icon: PenLine, desc: "Grammar, syntax complexity, and spelling trend diagnostics." },
    { href: "/progress/grammar", name: "Grammar Competence", value: "24/36 structures", pct: 66, icon: SpellCheck, desc: "Quiz accuracy ratios and targeted weakness modules." },
    { href: "/progress/achievements", name: "Achievements & Badges", value: "12 unlocked", pct: 50, icon: Trophy, desc: "Huy hiệu & Thành tích unlocked during sessions." },
    { href: "/progress/streak", name: "Streak Calendar", value: "15-day Active Streak", pct: 75, icon: Calendar, desc: "Verify daily learning continuity calendar." },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="progress-overview-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Progress & Analytics</h2>
          <p className="text-xs text-muted-foreground font-semibold">Detailed reports of your linguistic performance</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <div key={sec.name} className="card-edu card-edu-interactive p-6 bg-card flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-black text-foreground text-heading">{sec.name}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground mt-2 font-semibold text-learning">{sec.desc}</p>
                    </div>
                  </div>
                  <div className="pt-6 space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase text-heading">
                        <span>{sec.value}</span>
                        <span className="text-primary">{sec.pct}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border-2 border-border/40">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" 
                          style={{ width: `${sec.pct}%` }} 
                        />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Link href={sec.href}>
                        <Button size="sm" variant="outline" className="btn-edu h-9 px-4 text-xs border-2 bg-transparent text-primary hover:bg-primary/5 border-primary/20">
                          View Report <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
