"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, BookMarked, Volume2, Zap, FolderOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomizePagination } from "@/components/customize/customize-pagination";
import { CustomizeAlert } from "@/components/customize/customize-alert";
import ImageLogoWeb from "@/components/image-logo-web";

const ALL_WORDS = [
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
  {
    word: "Ephemeral",
    phonetic: "/ɪˈfem.ər.əl/",
    level: "C1",
    topic: "Literature",
    definition: "Lasting for a very short time; transitory.",
    mastery: 33,
    difficulty: "Hard",
    difficultyColor: "text-rose-500 bg-rose-500/10 border-rose-500/20",
    difficultyDot: "bg-rose-500",
  },
  {
    word: "Resilience",
    phonetic: "/rɪˈzɪl.i.əns/",
    level: "B2",
    topic: "Business",
    definition: "The capacity to recover quickly from difficulties; toughness.",
    mastery: 72,
    difficulty: "Medium",
    difficultyColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    difficultyDot: "bg-blue-500",
  },
  {
    word: "Serendipity",
    phonetic: "/ˌser.ənˈdɪp.ɪ.ti/",
    level: "B2",
    topic: "Culture",
    definition: "The occurrence of events by chance in a happy or beneficial way.",
    mastery: 55,
    difficulty: "Medium",
    difficultyColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    difficultyDot: "bg-blue-500",
  },
  {
    word: "Pragmatic",
    phonetic: "/præɡˈmæt.ɪk/",
    level: "B2",
    topic: "Business",
    definition: "Dealing with things sensibly and realistically in a way that is based on practical rather than theoretical considerations.",
    mastery: 90,
    difficulty: "Easy",
    difficultyColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    difficultyDot: "bg-emerald-500",
  },
];

const PAGE_SIZE = 4;

export default function VocabularyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [words, setWords] = useState(ALL_WORDS);

  const totalPages = Math.ceil(words.length / PAGE_SIZE);
  const paginatedWords = words.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    setWords((prev) => prev.filter((w) => w.word !== deleteTarget));
    setDeleteTarget(null);
    // Adjust page if needed after deletion
    const newTotal = Math.ceil((words.length - 1) / PAGE_SIZE);
    if (currentPage > newTotal) setCurrentPage(Math.max(1, newTotal));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background font-sans" id="vocabulary-lab-page">
      {/* Header */}
      <header className="flex flex-col px-8 py-5 gap-4 border-b-2 border-border/60 sticky top-0 bg-background/80 backdrop-blur-xl z-10 flex-shrink-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-xl font-black text-foreground tracking-tight text-heading">Vocabulary Lab</h2>
            <p className="text-xs text-muted-foreground font-semibold">Manage and master your curated lexicon</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-72 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                className="w-full bg-muted/30 pl-9 border-2 border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary py-5 text-xs font-semibold"
                placeholder="Search specific words..."
                type="text"
              />
            </div>
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-muted-foreground hover:text-primary flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-muted-foreground hover:text-primary flex items-center justify-center">
              <BookMarked className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 flex-wrap sm:flex-nowrap">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest whitespace-nowrap text-heading">Filters:</span>

          <Select defaultValue="all-levels">
            <SelectTrigger className="w-[140px] h-8 text-[10px] font-black rounded-full bg-muted/50 border-2 border-border">
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
            <SelectTrigger className="w-[140px] h-8 text-[10px] font-black rounded-full bg-muted/50 border-2 border-border">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Topic: Business</SelectItem>
              <SelectItem value="travel">Topic: Travel</SelectItem>
              <SelectItem value="tech">Topic: Tech</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-5 w-[2px] bg-border/80 mx-1" />
          <Link href="/vocabulary/topics">
            <Button size="sm" variant="outline" className="btn-edu h-8 text-[10px] font-black border-2 bg-transparent text-foreground hover:bg-muted">
              <FolderOpen className="w-3.5 h-3.5" /> View Topics
            </Button>
          </Link>
          <Link href="/vocabulary/ai-generator">
            <Button size="sm" className="btn-edu h-8 text-[10px] font-black border-2 bg-primary text-primary-foreground hover:bg-primary/95">
              ✨ AI Generator
            </Button>
          </Link>
        </div>
      </header>

      {/* Vocabulary Grid Content */}
      <div className="flex-grow overflow-y-auto p-8 scrollbar-thin">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {paginatedWords.map((word) => (
              <div
                key={word.word}
                className="card-edu card-edu-interactive p-5 flex flex-col gap-4 bg-card"
              >
                {/* Header */}
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-muted border-2 border-border/40 text-muted-foreground">
                    {word.level} • {word.topic}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border/40 bg-transparent text-muted-foreground hover:text-primary flex items-center justify-center">
                      <Volume2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(word.word)}
                      className="btn-edu w-8 h-8 border-2 border-destructive/20 bg-transparent text-destructive/50 hover:text-destructive hover:border-destructive/40 hover:bg-destructive/5 flex items-center justify-center"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Word Content */}
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-indigo-500 tracking-tight text-heading">{word.word}</h3>
                  <p className="text-xs text-muted-foreground italic font-medium">{word.phonetic}</p>
                  <p className="text-xs text-foreground leading-relaxed line-clamp-3 pt-1 text-learning font-medium">{word.definition}</p>
                </div>

                {/* Mastery Progress */}
                <div className="mt-auto pt-2 space-y-1.5">
                  <div className="flex justify-between items-center text-[9px] font-black text-heading">
                    <span className="text-muted-foreground">Mastery</span>
                    <span className="text-indigo-500">{word.mastery}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden border-2 border-border/40">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400"
                      style={{ width: `${word.mastery}%` }}
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t-2 border-border/40">
                  <span className={`flex items-center gap-1.5 text-[9px] font-black px-2 py-0.5 rounded-full border-2 ${word.difficultyColor} text-heading`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${word.difficultyDot}`} />
                    {word.difficulty}
                  </span>
                  <Link href="/vocabulary/flashcard">
                    <Button size="sm" className="btn-edu h-8 px-4 text-[10px] font-black border-2 bg-primary text-primary-foreground hover:bg-primary/95">
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
                  <span className="text-[10px] font-black text-indigo-500 uppercase text-heading">Weekly Milestone</span>
                  <h4 className="font-black text-lg text-foreground text-heading">You've mastered 24 words!</h4>
                  <p className="text-xs text-muted-foreground max-w-sm leading-relaxed font-medium">Your retention rate is currently estimated at 82%. Keep it up to stabilize the memory curves.</p>
                </div>
                <div className="p-3 bg-indigo-500/10 border-2 border-indigo-500/20 text-indigo-500 rounded-full animate-pulse flex-shrink-0 flex items-center justify-center w-11 h-11">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-6 space-y-2 relative z-10">
                <div className="flex justify-between text-[9px] font-black text-muted-foreground uppercase text-heading">
                  <span>Target: 30 Words</span>
                  <span>80% Complete</span>
                </div>
                <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border-2 border-border/40">
                  <div className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400" style={{ width: "80%" }} />
                </div>
              </div>

              {/* Mascot decoration */}
              <div className="absolute right-6 bottom-[-20px] opacity-10 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none">
                <ImageLogoWeb variant="mascot" className="select-none w-24 h-24" />
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="pt-4 pb-2">
            <CustomizePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(p) => {
                setCurrentPage(p);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              siblingCount={1}
              showEdges={true}
            />
            <p className="text-center text-[10px] text-muted-foreground font-semibold mt-3">
              Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, words.length)} of {words.length} words
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Alert */}
      <CustomizeAlert
        open={!!deleteTarget}
        onOpenChange={(open) => { if (!open) setDeleteTarget(null); }}
        variant="destructive"
        title={`Delete "${deleteTarget}"?`}
        description="This word and its learning progress will be permanently removed. You can re-add it later from the AI Generator."
        confirmLabel="Delete word"
        cancelLabel="Keep it"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
