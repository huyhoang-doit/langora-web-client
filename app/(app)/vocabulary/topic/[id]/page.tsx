"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, BookOpen, Volume2, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
      <header className="flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/vocabulary/topics">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">{topicInfo.title}</h2>
            <p className="text-xs text-muted-foreground">{topicInfo.desc}</p>
          </div>
        </div>
        <Link href="/vocabulary/flashcard">
          <Button size="sm" className="font-bold flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
            Study Flashcards <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {topicInfo.words.map((item) => (
            <Card key={item.word} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-primary">{item.word}</span>
                    <span className="text-xs text-muted-foreground italic">{item.phonetic}</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{item.definition}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border hover:text-primary"><Volume2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border hover:text-primary"><Plus className="w-4 h-4" /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
