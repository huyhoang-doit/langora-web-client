"use client";

import Link from "next/link";
import { ArrowLeft, Compass, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OraRecommendationPage() {
  const recommendations = [
    { type: "Targeted Lesson", title: "Conditional Sentence Type 3", desc: "Perfect your past hypothetical expressions.", route: "/learn/lesson/3" },
    { type: "Vocabulary Drill", title: "Business & Negotiation Idioms", desc: "Review 12 key negotiation expressions.", route: "/vocabulary/topics" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-recommendations-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/ora">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">AI Recommendations</h2>
          <p className="text-xs text-muted-foreground font-semibold">Daily personalized suggestions based on your profile</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6 pt-4">
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-start">
            <Compass className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-black text-primary uppercase tracking-widest text-heading">Path Optimization</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1.5 font-bold text-learning">
                Based on your performance in writing and grammar, Ora has computed that these specific modules will yield the highest long-term improvement.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1 text-heading">Today's Suggestions</h3>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <div key={i} className="card-edu card-edu-interactive p-5 bg-card flex justify-between items-center gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black text-primary uppercase bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">
                      {rec.type}
                    </span>
                    <h4 className="font-black text-sm text-foreground pt-1.5 text-heading">{rec.title}</h4>
                    <p className="text-xs text-muted-foreground font-medium text-learning">{rec.desc}</p>
                  </div>

                  <Link href={rec.route} className="flex-shrink-0">
                    <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
