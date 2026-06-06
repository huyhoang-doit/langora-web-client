"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageLogoWeb from "@/components/image-logo-web";

export default function VocabularyReviewPage() {
  const dueReview = [
    { word: "Ubiquitous", phonetic: "/juːˈbɪk.wɪ.təs/", due: "Overdue by 2 hours", level: "C1" },
    { word: "Komorebi", phonetic: "/ko-mo-re-bi/", due: "Due now", level: "N1" },
    { word: "Ephemeral", phonetic: "/ɪˈfem.ər.əl/", due: "Due in 1 hour", level: "B1" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="vocabulary-review-page">
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/vocabulary">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Vocabulary Review</h2>
            <p className="text-xs text-muted-foreground font-semibold">Smart Revision spaced repetition schedule</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* SRS Banner with Mascot */}
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-start md:items-center justify-between flex-col md:flex-row">
            <div className="flex gap-4 items-start">
              <ImageLogoWeb variant="mascot" className="animate-bounce flex-shrink-0 w-10 h-10" />
              <div>
                <h3 className="text-sm font-black text-primary uppercase tracking-widest text-heading flex items-center gap-1.5 mb-1">
                  <Star className="w-4 h-4 animate-pulse" /> SRS Review Ready
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-semibold text-learning">
                  You have <span className="text-foreground font-bold">5 words</span> scheduled for review right now based on your retention rate. Let's practice with Ora!
                </p>
              </div>
            </div>
            <Link href="/vocabulary/flashcard" className="w-full md:w-auto flex-shrink-0">
              <Button className="btn-edu w-full md:w-auto border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold flex items-center justify-center gap-2">
                Start Review Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest text-heading">Due Reviews</h3>
            <div className="space-y-3">
              {dueReview.map((item) => (
                <div key={item.word} className="card-edu card-edu-interactive p-5 bg-card flex justify-between items-center gap-4 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg text-primary text-heading">{item.word}</span>
                      <span className="text-xs text-muted-foreground italic font-medium">{item.phonetic}</span>
                    </div>
                    <p className="text-[10px] text-destructive font-bold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {item.due}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="btn-edu h-8 px-4 border-2 border-border/60 bg-transparent text-foreground hover:bg-muted text-xs font-bold rounded-full">
                    Practice
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
