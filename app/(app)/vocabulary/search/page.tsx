"use client";

import Link from "next/link";
import { ArrowLeft, Search, Volume2, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function VocabularySearchPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="vocabulary-search-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Lexicon Lookup</h2>
          <p className="text-xs text-muted-foreground">Search and add words to your notebook</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-8 pt-8">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              className="w-full bg-muted/50 pl-12 pr-4 py-7 border-border rounded-2xl focus-visible:ring-1 focus-visible:ring-primary text-base"
              placeholder="Search meaning, spelling, or topic..."
              type="text"
            />
          </div>

          {/* Quick recommendations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent Searches</h4>
            <div className="flex flex-wrap gap-2">
              {["serendipity", "lucid", "eloquent", "pragmatic"].map((word) => (
                <button 
                  key={word} 
                  className="px-3.5 py-1.5 rounded-full border bg-muted/40 hover:bg-muted text-xs font-semibold cursor-pointer active:scale-95 transition-all text-muted-foreground hover:text-foreground"
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
