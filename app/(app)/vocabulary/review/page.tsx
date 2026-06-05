"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Award, Star, Volume2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VocabularyReviewPage() {
  const dueReview = [
    { word: "Ubiquitous", phonetic: "/juːˈbɪk.wɪ.təs/", due: "Overdue by 2 hours", level: "C1" },
    { word: "Komorebi", phonetic: "/ko-mo-re-bi/", due: "Due now", level: "N1" },
    { word: "Ephemeral", phonetic: "/ɪˈfem.ər.əl/", due: "Due in 1 hour", level: "B1" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="vocabulary-review-page">
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/vocabulary">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Vocabulary Review</h2>
            <p className="text-xs text-muted-foreground">Smart Revision spaced repetition schedule</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-1">
                  <Star className="w-5 h-5" /> SRS Review Ready
                </h3>
                <p className="text-sm text-muted-foreground max-w-xl">
                  You have <span className="text-foreground font-semibold">5 words</span> scheduled for review right now based on your retention rate.
                </p>
              </div>
              <Link href="/vocabulary/flashcard">
                <Button className="font-bold flex items-center gap-1.5">
                  Start Review Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Due Reviews</h3>
            <div className="space-y-3">
              {dueReview.map((item) => (
                <Card key={item.word} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 flex justify-between items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-foreground">{item.word}</span>
                        <span className="text-xs text-muted-foreground italic">{item.phonetic}</span>
                      </div>
                      <p className="text-xs text-destructive font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {item.due}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="font-bold text-xs">
                      Practice
                    </Button>
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
