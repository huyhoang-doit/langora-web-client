"use client";

import Link from "next/link";
import { ArrowLeft, Star, Award, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LanguageRoadmapPage() {
  const steps = [
    { code: "a1", label: "A1 - Elementary", status: "completed", topics: ["Basic Greetings", "Simple Sentences", "Present Tense"] },
    { code: "a2", label: "A2 - Upper Elementary", status: "completed", topics: ["Daily routines", "Past Tense", "Asking Directions"] },
    { code: "b1", label: "B1 - Intermediate", status: "active", topics: ["Conditional sentences", "Complex vocabulary", "Opinions & Reasons"] },
    { code: "b2", label: "B2 - Upper Intermediate", status: "locked", topics: ["Abstract subjects", "Idioms", "Academic essay outline"] },
    { code: "c1", label: "C1 - Advanced", status: "locked", topics: ["Professional syntax", "Flexible discussion", "Style variations"] },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="language-roadmap-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/learn">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Language Roadmap</h2>
          <p className="text-xs text-muted-foreground font-semibold">AI adaptive roadmap</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto py-8">
          <div className="relative border-l-2 border-border/60 pl-8 ml-4 space-y-12">
            {steps.map((step) => {
              const isActive = step.status === "active";
              const isCompleted = step.status === "completed";

              return (
                <div key={step.code} className="relative group">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-background transition-all ${
                    isCompleted ? "border-primary bg-primary/10 text-primary" :
                    isActive ? "border-primary bg-primary text-primary-foreground animate-pulse" :
                    "border-border text-muted-foreground"
                  }`}>
                    {isCompleted ? <Award className="w-3.5 h-3.5" /> :
                     isActive ? <Star className="w-3.5 h-3.5" /> :
                     <Circle className="w-3 h-3" />}
                  </div>

                  <div className={`card-edu ${isActive ? "card-edu-interactive border-primary/40 bg-primary/5 shadow-md" : "bg-card"} p-5`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-base text-foreground capitalize text-heading">{step.label}</h3>
                      {isActive && (
                        <span className="text-[10px] font-black text-primary uppercase bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">Active Path</span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-4 font-semibold">Core modules you need to master:</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {step.topics.map((t) => (
                        <span key={t} className="text-[10px] font-bold border-2 bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex justify-end">
                      <Link href={`/learn/level/${step.code}`}>
                        <Button 
                          size="sm" 
                          variant={isActive ? "default" : "outline"} 
                          disabled={step.status === "locked"}
                          className={`btn-edu h-8 text-[10px] font-black border-2 ${
                            isActive 
                              ? "bg-primary text-primary-foreground hover:bg-primary/95" 
                              : "bg-transparent text-foreground hover:bg-muted"
                          }`}
                        >
                          {isCompleted ? "Review Level" : isActive ? "Continue Path" : "Locked"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
