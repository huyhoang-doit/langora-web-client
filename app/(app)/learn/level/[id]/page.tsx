"use client";

import Link from "next/link";
import React, { use } from "react";
import { ArrowLeft, Clock, Play, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LevelPageProps {
  params: Promise<{ id: string }>;
}

export default function LevelDetailPage({ params }: LevelPageProps) {
  const { id } = use(params);

  const levelInfo = {
    code: id.toUpperCase(),
    title: `Level ${id.toUpperCase()} - Intermediate Studies`,
    progress: 40,
    lessons: [
      { id: "1", title: "Conditional Sentence Type 1", time: "10 mins", completed: true },
      { id: "2", title: "Introduction to Present Perfect", time: "15 mins", completed: true },
      { id: "3", title: "Conditional Sentence Type 2", time: "12 mins", completed: false },
      { id: "4", title: "Passive Voice in Professional Contexts", time: "20 mins", completed: false },
    ],
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id={`level-detail-${id}`}>
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/learn">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">{levelInfo.title}</h2>
          <p className="text-xs text-muted-foreground font-semibold">Level completion: {levelInfo.progress}%</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1 text-heading">Lessons in this Level</h3>
          
          <div className="space-y-4">
            {levelInfo.lessons.map((lsn) => (
              <div key={lsn.id} className="card-edu card-edu-interactive p-5 bg-card flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {lsn.completed ? (
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-border/80 flex-shrink-0" />
                  )}
                  <div className="text-heading">
                    <span className="font-black text-sm block">{lsn.title}</span>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5 font-bold">
                      <Clock className="w-3.5 h-3.5" /> {lsn.time}
                    </span>
                  </div>
                </div>

                <Link href={`/learn/lesson/${lsn.id}`} className="flex-shrink-0">
                  <Button 
                    size="sm" 
                    variant={lsn.completed ? "outline" : "default"}
                    className={`btn-edu h-8 px-4 text-[10px] font-black border-2 ${
                      lsn.completed 
                        ? "bg-transparent text-foreground hover:bg-muted" 
                        : "bg-primary text-primary-foreground hover:bg-primary/95"
                    } gap-1.5`}
                  >
                    <Play className="w-3 h-3 fill-current" /> {lsn.completed ? "Review" : "Start"}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
