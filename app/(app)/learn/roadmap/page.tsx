"use client";

import Link from "next/link";
import { ArrowLeft, Flag, Star, Award, Circle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/learn">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Language Roadmap</h2>
          <p className="text-xs text-muted-foreground">AI adaptive roadmap</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto py-8">
          <div className="relative border-l-2 border-border pl-8 ml-4 space-y-12">
            {steps.map((step) => {
              const isActive = step.status === "active";
              const isCompleted = step.status === "completed";

              return (
                <div key={step.code} className="relative group">
                  {/* Timeline Node */}
                  <div className={`absolute -left-[41px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-background transition-all ${
                    isCompleted ? "border-primary bg-primary/10 text-primary" :
                    isActive ? "border-primary bg-primary text-primary-foreground animate-pulse shadow-[0_0_10px_rgba(168,240,106,0.5)]" :
                    "border-border text-muted-foreground"
                  }`}>
                    {isCompleted ? <Award className="w-3.5 h-3.5" /> :
                     isActive ? <Star className="w-3.5 h-3.5" /> :
                     <Circle className="w-3 h-3" />}
                  </div>

                  <Card className={`hover:border-primary/50 transition-all ${isActive ? "border-primary/40 bg-primary/5 shadow-sm" : ""}`}>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-base text-foreground capitalize">{step.label}</h3>
                        {isActive && (
                          <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">Active Path</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">Core modules you need to master:</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {step.topics.map((t) => (
                          <span key={t} className="text-[10px] font-semibold border bg-muted/40 text-muted-foreground px-2 py-0.5 rounded">
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
                            className="font-bold text-xs"
                          >
                            {isCompleted ? "Review Level" : isActive ? "Continue Path" : "Locked"}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
