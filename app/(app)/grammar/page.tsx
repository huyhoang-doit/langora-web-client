"use client";

import Link from "next/link";
import { SpellCheck, BookOpen, AlertTriangle, Award, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">Grammar Labs</h2>
          <p className="text-xs text-muted-foreground">Perfect your sentence mechanics and structural accuracy</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
