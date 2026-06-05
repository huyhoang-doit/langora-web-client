"use client";

import Link from "next/link";
import { LineChart, BookOpen, PenLine, SpellCheck, Trophy, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">Progress & Analytics</h2>
          <p className="text-xs text-muted-foreground">Detailed reports of your linguistic performance</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <Card key={sec.name} className="hover:border-primary/50 transition-colors flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </span>
                    <CardTitle className="text-base font-bold text-foreground mt-4">{sec.name}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground">{sec.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6 space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                        <span>{sec.value}</span>
                        <span>{sec.pct}%</span>
                      </div>
                      <Progress value={sec.pct} className="h-1 bg-muted" indicatorClassName="bg-primary" />
                    </div>
                    <div className="flex justify-end">
                      <Link href={sec.href}>
                        <Button size="sm" variant="outline" className="font-bold text-xs gap-1 border-primary/20 text-primary hover:bg-primary/5">
                          View Report <ChevronRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
