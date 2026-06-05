"use client";

import Link from "next/link";
import { Map, ChevronRight, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LearningHomePage() {
  const levels = [
    { id: "a1", name: "A1 - Elementary", desc: "Basic vocabulary and simple sentence structures.", progress: 100 },
    { id: "a2", name: "A2 - Upper Elementary", desc: "Routine expressions and direct exchanges of info.", progress: 85 },
    { id: "b1", name: "B1 - Intermediate", desc: "Standard text comprehension and personal interest topics.", progress: 40 },
    { id: "b2", name: "B2 - Upper Intermediate", desc: "Complex text, concrete/abstract subjects, and spontaneous discussion.", progress: 0 },
    { id: "c1", name: "C1 - Advanced", desc: "Demanding texts, flexible social/academic use of language.", progress: 0 },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="learning-home-page">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Learning Labs</h2>
          <p className="text-xs text-muted-foreground font-semibold">Master structure and fluency</p>
        </div>
        <Link href="/learn/roadmap">
          <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Map className="w-4 h-4" /> View Roadmap
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome/Overview */}
          <div className="card-edu p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-primary/5 border-primary/20">
            <div>
              <h3 className="text-lg font-black text-primary flex items-center gap-2 mb-1 text-heading">
                <Compass className="w-5 h-5 animate-spin-slow" /> Path Recommendation
              </h3>
              <p className="text-sm text-muted-foreground max-w-xl font-medium leading-relaxed">
                Based on your B2 Placement Result, we recommend starting from <span className="text-foreground font-bold">B1 - Intermediate</span> to solidify your grammar foundation.
              </p>
            </div>
            <Link href="/learn/level/b1">
              <Button className="btn-edu h-11 px-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0">Resume B1 Path</Button>
            </Link>
          </div>

          {/* Level List */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1 text-heading">Levels & Progression</h3>
            <div className="grid grid-cols-1 gap-4">
              {levels.map((lvl) => (
                <div key={lvl.id} className="card-edu card-edu-interactive p-5 bg-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-base text-foreground text-heading">{lvl.name}</span>
                      {lvl.progress === 100 && (
                        <span className="text-[10px] font-black text-primary uppercase bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">Completed</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground max-w-md font-medium text-learning">{lvl.desc}</p>
                  </div>

                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="w-32 space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                        <span>Progress</span>
                        <span>{lvl.progress}%</span>
                      </div>
                      <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border-2 border-border/40">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" 
                          style={{ width: `${lvl.progress}%` }} 
                        />
                      </div>
                    </div>
                    <Link href={`/learn/level/${lvl.id}`} className="ml-auto sm:ml-0">
                      <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full border-2 border-border hover:text-primary hover:border-primary/40 bg-transparent flex items-center justify-center">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
