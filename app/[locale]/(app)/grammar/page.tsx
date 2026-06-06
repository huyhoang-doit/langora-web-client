"use client";

import Link from "next/link";
import { BookOpen, Award, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GrammarHomePage() {
  const options = [
    { href: "/grammar/lessons", name: "Grammar Lessons", desc: "A comprehensive library of grammar rules, structures, and detailed usage examples.", icon: BookOpen, cta: "Open Lessons" },
    { href: "/grammar/quiz", name: "Grammar Quizzes", desc: "Standard practice tests grouped by levels (A1 to C1) to evaluate specific structures.", icon: Award, cta: "Take Quizzes" },
    { href: "/grammar/personalized", name: "Personalized Quizzes", desc: "Auto-generated grammar practices focused specifically on your past errors and weak spots.", icon: Zap, cta: "Start Personalized" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="grammar-home-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Grammar Labs</h2>
          <p className="text-xs text-muted-foreground font-semibold">Perfect your sentence mechanics and structural accuracy</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                      <p className="text-xs leading-relaxed text-muted-foreground mt-2 font-semibold text-learning">{opt.desc}</p>
                    </div>
                  </div>
                  <div className="pt-6 flex justify-end">
                    <Link href={opt.href}>
                      <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 flex items-center gap-1">
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
