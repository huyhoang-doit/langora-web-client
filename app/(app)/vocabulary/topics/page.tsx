"use client";

import Link from "next/link";
import { BookOpen, FolderOpen, ArrowLeft, ChevronRight, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VocabularyTopicsPage() {
  const topics = [
    { id: "business", name: "Business & Negotiation", count: 48, desc: "Essential vocabulary for corporate settings, contract signing, and strategy discussions." },
    { id: "tech", name: "Technology & AI", count: 32, desc: "Idioms, phrasal verbs, and professional jargon in computer science and software development." },
    { id: "ielts-academic", name: "IELTS Academic Core", count: 120, desc: "High-yield academic words designed to raise coherence and vocabulary band scores." },
    { id: "travel", name: "Travel & Hospitality", count: 24, desc: "Conversational vocabulary for flights, checking in, and local experiences." },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="vocabulary-topics-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Vocabulary Topics</h2>
          <p className="text-xs text-muted-foreground">Select a theme to focus on</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((tpc) => (
              <Card key={tpc.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex flex-col justify-between h-full gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <FolderOpen className="w-5 h-5" />
                      </span>
                      <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                        {tpc.count} Words
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-foreground mt-2">{tpc.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tpc.desc}</p>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Link href={`/vocabulary/topic/${tpc.id}`}>
                      <Button size="sm" className="font-bold text-xs gap-1">
                        Explore Topic <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
