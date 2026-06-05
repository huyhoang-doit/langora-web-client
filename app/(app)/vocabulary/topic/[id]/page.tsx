"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, Volume2, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopicDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TopicDetailPage({ params }: TopicDetailPageProps) {
  const { id } = use(params);

  const topicInfo = {
    title: `${id.charAt(0).toUpperCase() + id.slice(1)} Vocabulary Core`,
    desc: `Curated words and phrases specifically selected for the ${id} domain.`,
    words: [
      { word: "Synergy", phonetic: "/ˈsɪn.ə.dʒi/", definition: "Cooperation of two or more entities to produce a combined effect greater than the sum of parts." },
      { word: "Mitigate", phonetic: "/ˈmɪt.ɪ.ɡeɪt/", definition: "Make something bad less severe, serious, or painful." },
      { word: "Viable", phonetic: "/ˈvaɪ.ə.bəl/", definition: "Capable of working successfully; feasible." },
    ],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id={`topic-detail-${id}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/vocabulary/topics">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">{topicInfo.title}</h2>
            <p className="text-xs text-muted-foreground font-semibold">{topicInfo.desc}</p>
          </div>
        </div>
        <Link href="/vocabulary/flashcard">
          <Button size="sm" className="btn-edu h-9 px-4 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold flex items-center gap-1.5 rounded-full">
            Study Flashcards <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {topicInfo.words.map((item) => (
            <div key={item.word} className="card-edu card-edu-interactive p-5 bg-card flex justify-between items-start gap-4 transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg text-primary text-heading">{item.word}</span>
                  <span className="text-xs text-muted-foreground italic font-medium">{item.phonetic}</span>
                </div>
                <p className="text-xs text-foreground leading-relaxed text-learning font-semibold">{item.definition}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-primary rounded-full flex items-center justify-center p-0">
                  <Volume2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-primary rounded-full flex items-center justify-center p-0">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
