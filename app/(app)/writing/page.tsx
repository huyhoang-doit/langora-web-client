"use client";

import Link from "next/link";
import { PenLine, History, Sparkles, LineChart, FileText, ChevronRight, Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WritingHomePage() {
  const options = [
    { href: "/writing/editor", name: "AI Writing Workspace", desc: "A premium document editor integrated with real-time grammar feedback, vocab recommendations, and style polishing. (Notion + Grammarly style)", icon: FileText, cta: "Open Workspace" },
    { href: "/writing/practice", name: "Scenario Writing", desc: "Write short descriptive texts or essays based on tailored real-world contexts and situations.", icon: Sparkles, cta: "Explore Scenarios" },
    { href: "/writing/history", name: "Writing History", desc: "Review previous essays, grammar corrections, and track progression remarks.", icon: History, cta: "View History" },
    { href: "/writing/analytics", name: "Writing Analytics", desc: "Track sentence structural complexity, error trends, and vocabulary diversity progress.", icon: LineChart, cta: "View Analytics" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-home-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">Writing Labs</h2>
          <p className="text-xs text-muted-foreground">Develop native phrasing and composition skills</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main options grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {options.map((opt) => {
              const Icon = opt.icon;
              return (
                <Card key={opt.name} className="hover:border-primary/50 transition-colors flex flex-col justify-between">
                  <CardHeader className="pb-3">
                    <span className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </span>
                    <CardTitle className="text-base font-bold text-foreground mt-4">{opt.name}</CardTitle>
                    <CardDescription className="text-xs leading-relaxed text-muted-foreground">{opt.desc}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-6 flex justify-end">
                    <Link href={opt.href}>
                      <Button size="sm" className="font-bold text-xs gap-1">
                        {opt.cta} <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
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
