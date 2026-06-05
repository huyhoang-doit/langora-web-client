"use client";

import Link from "next/link";
import { FolderOpen, ArrowLeft, ChevronRight } from "lucide-react";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Vocabulary Topics</h2>
          <p className="text-xs text-muted-foreground font-semibold">Select a theme to focus on</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map((tpc) => (
              <div key={tpc.id} className="card-edu card-edu-interactive p-6 bg-card flex flex-col justify-between h-full gap-4 transition-all">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary">
                      <FolderOpen className="w-5 h-5" />
                    </span>
                    <span className="text-[9px] font-black text-primary uppercase bg-primary/5 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">
                      {tpc.count} Words
                    </span>
                  </div>
                  <h3 className="font-black text-base text-foreground mt-2 text-heading">{tpc.name}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 text-learning font-semibold">{tpc.desc}</p>
                </div>

                <div className="flex justify-end pt-2">
                  <Link href={`/vocabulary/topic/${tpc.id}`}>
                    <Button size="sm" className="btn-edu h-8 px-4 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-bold gap-1 rounded-full">
                      Explore Topic <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
