"use client";

import Link from "next/link";
import { BookOpen, Map, ChevronRight, Award, Compass, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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
      <header className="flex justify-between items-center w-full px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">Learning Labs</h2>
          <p className="text-xs text-muted-foreground">Master structure and fluency</p>
        </div>
        <Link href="/learn/roadmap">
          <Button size="sm" className="font-bold flex items-center gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
            <Map className="w-4 h-4" /> View Roadmap
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome/Overview */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-primary flex items-center gap-2 mb-1">
                  <Compass className="w-5 h-5" /> Path Recommendation
                </h3>
                <p className="text-sm text-muted-foreground max-w-xl">
                  Based on your B2 Placement Result, we recommend starting from <span className="text-foreground font-semibold">B1 - Intermediate</span> to solidify your grammar foundation.
                </p>
              </div>
              <Link href="/learn/level/b1">
                <Button className="font-bold">Resume B1 Path</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Level List */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Levels & Progression</h3>
            <div className="grid grid-cols-1 gap-4">
              {levels.map((lvl) => (
                <Card key={lvl.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-base text-foreground">{lvl.name}</span>
                        {lvl.progress === 100 && (
                          <span className="text-[10px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">Completed</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground max-w-md">{lvl.desc}</p>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto">
                      <div className="w-32 space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                          <span>Progress</span>
                          <span>{lvl.progress}%</span>
                        </div>
                        <Progress value={lvl.progress} className="h-1 bg-muted" indicatorClassName="bg-primary" />
                      </div>
                      <Link href={`/learn/level/${lvl.id}`} className="ml-auto sm:ml-0">
                        <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border hover:text-primary">
                          <ChevronRight className="w-4 h-4" />
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
    </div>
  );
}
