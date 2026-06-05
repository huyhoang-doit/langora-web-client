"use client";

import Link from "next/link";
import { Search, Bell, BookMarked, Volume2, Plus, Zap, ArrowRight, FolderOpen, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function VocabularyPage() {
  const vocabularyWords = [
    {
      word: "Synergy",
      phonetic: "/ˈsɪn.ə.dʒi/",
      level: "B2",
      topic: "Business",
      definition: "The interaction or cooperation of two or more organizations to produce a combined effect greater than the sum of their separate effects.",
      mastery: 85,
      difficulty: "Easy",
      difficultyColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      difficultyDot: "bg-emerald-500",
    },
    {
      word: "Komorebi",
      phonetic: "/ko-mo-re-bi/",
      level: "N1",
      topic: "Culture",
      definition: "Sunlight that filters through the leaves of trees, creating a dappled effect on the ground.",
      mastery: 42,
      difficulty: "Hard",
      difficultyColor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      difficultyDot: "bg-rose-500",
    },
    {
      word: "Wanderlust",
      phonetic: "/ˈwɒn.də.lʌst/",
      level: "B1",
      topic: "Travel",
      definition: "A strong desire to travel and explore the world.",
      mastery: 68,
      difficulty: "Medium",
      difficultyColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      difficultyDot: "bg-blue-500",
    },
    {
      word: "Ubiquitous",
      phonetic: "/juːˈbɪk.wɪ.təs/",
      level: "C1",
      topic: "Tech",
      definition: "Present, appearing, or found everywhere.",
      mastery: 15,
      difficulty: "Hard",
      difficultyColor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
      difficultyDot: "bg-rose-500",
    },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-sans" id="vocabulary-lab-page">
      {/* Header */}
      <header className="flex flex-col px-8 py-5 gap-4 border-b-2 border-border sticky top-0 bg-background/80 backdrop-blur-xl z-10 flex-shrink-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-foreground tracking-tight">Vocabulary Lab</h2>
            <p className="text-xs text-muted-foreground">Manage and master your curated lexicon</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-72 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                className="w-full bg-muted/50 pl-9 border-2 border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary py-5 text-xs"
                placeholder="Search specific words..."
                type="text"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
              <BookMarked className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 flex-wrap sm:flex-nowrap">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap">Filters:</span>
          
          <Select defaultValue="all-levels">
            <SelectTrigger className="w-[140px] h-8 text-[10px] font-bold rounded-full bg-muted/50 border-2 border-border">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-levels">Level: All</SelectItem>
              <SelectItem value="a1">A1 - Beginner</SelectItem>
              <SelectItem value="b1">B1 - Intermediate</SelectItem>
              <SelectItem value="b2">B2 - Upper Int.</SelectItem>
              <SelectItem value="c1">C1 - Advanced</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="business">
            <SelectTrigger className="w-[140px] h-8 text-[10px] font-bold rounded-full bg-muted/50 border-2 border-border">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Topic: Business</SelectItem>
              <SelectItem value="travel">Topic: Travel</SelectItem>
              <SelectItem value="tech">Topic: Tech</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-5 w-px bg-border mx-1" />
          <Link href="/vocabulary/topics">
            <Button size="sm" variant="outline" className="btn-edu h-8 text-[10px] font-black border-2">
              <FolderOpen className="w-3.5 h-3.5" /> View Topics
            </Button>
          </Link>
          <Link href="/vocabulary/ai-generator">
            <Button size="sm" className="btn-edu h-8 text-[10px] font-black">
              ✨ AI Generator
            </Button>
          </Link>
        </div>
      </header>

      {/* Vocabulary Grid Content */}
      <div className="flex-1 overflow-y-auto p-8 scrollbar-thin">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vocabularyWords.map((word) => (
              <div
                key={word.word}
                className="card-edu card-edu-interactive p-5 flex flex-col gap-4 bg-card"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[9px] font-bold uppercase tracking-wide bg-muted border-2 border-border/40 text-muted-foreground">
                    {word.level} • {word.topic}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border-2 border-border/40 text-muted-foreground hover:text-primary">
                      <Volume2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Word Content */}
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-indigo-500 tracking-tight">{word.word}</h3>
                  <p className="text-xs text-muted-foreground italic">{word.phonetic}</p>
                  <p className="text-xs text-foreground leading-relaxed line-clamp-3 pt-1 text-learning">{word.definition}</p>
                </div>

                {/* Mastery Progress */}
                <div className="mt-auto pt-2 space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-muted-foreground">Mastery</span>
                    <span className="text-indigo-500">{word.mastery}%</span>
                  </div>
                  <Progress value={word.mastery} className="h-1.5 bg-muted" indicatorClassName="bg-indigo-500" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-border/40">
                  <span className={`flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full border-2 ${word.difficultyColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${word.difficultyDot}`} />
                    {word.difficulty}
                  </span>
                  <Link href="/vocabulary/flashcard">
                    <Button size="sm" className="btn-edu h-8 px-4 text-[10px] font-black border-2">
                      Practice
                    </Button>
                  </Link>
                </div>
              </div>
            ))}

            {/* Weekly Milestone Card */}
            <div className="card-edu col-span-1 sm:col-span-2 p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent relative overflow-hidden group">
              <div className="flex justify-between items-start relative z-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase">Weekly Milestone</span>
                  <h4 className="font-black text-lg text-foreground">You've mastered 24 words!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">Your retention rate is currently estimated at 82%. Keep it up to stabilize the memory curves.</p>
                </div>
                <div className="p-3 bg-indigo-500/10 border-2 border-indigo-500/20 text-indigo-500 rounded-full animate-pulse">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              
              <div className="mt-6 space-y-2 relative z-10">
                <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase">
                  <span>Target: 30 Words</span>
                  <span>80% Complete</span>
                </div>
                <Progress value={80} className="h-2 bg-muted" indicatorClassName="bg-indigo-500" />
              </div>
              
              {/* Mascot decoration */}
              <div className="absolute right-6 bottom-[-20px] opacity-10 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none">
                <span className="text-7xl select-none">🐲</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
