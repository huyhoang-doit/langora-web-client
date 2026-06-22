"use client";

import Link from "next/link";
import { History, Sparkles, LineChart, FileText, ChevronRight } from "lucide-react";
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
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Writing Labs</h2>
          <p className="text-xs text-muted-foreground font-semibold">Develop native phrasing and composition skills</p>
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
                <div key={opt.name} className="card-edu card-edu-interactive p-6 bg-card flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="text-base font-black text-foreground text-heading">{opt.name}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground mt-2 font-medium text-learning">{opt.desc}</p>
                    </div>
                  </div>
                  <div className="pt-6 flex justify-end">
                    <Link href={opt.href}>
                      <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1">
                        {opt.cta} <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
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
