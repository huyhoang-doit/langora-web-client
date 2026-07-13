"use client";

import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VocabularySearchPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="vocabulary-search-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">Lexicon Lookup</h2>
          <p className="text-xs text-muted-foreground font-semibold">Search and add words to your notebook</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-8 pt-8">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              className="w-full bg-card pl-12 pr-4 h-14 border-2 border-border focus-visible:border-primary rounded-2xl text-learning font-semibold"
              placeholder="Search meaning, spelling, or topic..."
              type="text"
            />
          </div>

          {/* Quick recommendations */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest text-heading">Recent Searches</h4>
            <div className="flex flex-wrap gap-2">
              {["serendipity", "lucid", "eloquent", "pragmatic"].map((word) => (
                <button 
                  key={word} 
                  className="px-3.5 py-1.5 card-edu card-edu-interactive bg-card/45 hover:bg-primary/5 hover:border-primary/40 rounded-full text-xs font-bold text-heading text-muted-foreground hover:text-foreground transition-all"
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
