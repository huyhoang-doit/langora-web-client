"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, BookOpen, Compass, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OraRecommendationPage() {
  const recommendations = [
    { type: "Targeted Lesson", title: "Conditional Sentence Type 3", desc: "Perfect your past hypothetical expressions.", route: "/learn/lesson/3" },
    { type: "Vocabulary Drill", title: "Business & Negotiation Idioms", desc: "Review 12 key negotiation expressions.", route: "/vocabulary/topics" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-recommendations-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/ora">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Recommendations</h2>
          <p className="text-xs text-muted-foreground">Daily personalized suggestions based on your profile</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6 pt-4">
          <Card className="border-primary/25 bg-primary/5">
            <CardContent className="p-6 flex gap-4 items-start">
              <Compass className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Path Optimization</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Based on your performance in writing and grammar, Ora has computed that these specific modules will yield the highest long-term improvement.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Today's Suggestions</h3>
            <div className="space-y-3">
              {recommendations.map((rec, i) => (
                <Card key={i} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                        {rec.type}
                      </span>
                      <h4 className="font-bold text-sm text-foreground pt-1">{rec.title}</h4>
                      <p className="text-xs text-muted-foreground">{rec.desc}</p>
                    </div>

                    <Link href={rec.route}>
                      <Button size="sm" variant="ghost" className="w-8 h-8 rounded-full border border-border hover:text-primary">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
