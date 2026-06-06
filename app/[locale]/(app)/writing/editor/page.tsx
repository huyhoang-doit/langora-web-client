"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2, CornerDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AIWritingEditorPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ai-writing-editor-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/writing">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-black text-foreground text-heading">AI Workspace</h2>
            <p className="text-xs text-muted-foreground font-semibold">Interactive writing notebook</p>
          </div>
        </div>
        <Link href="/writing/review/new-doc">
          <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 flex items-center gap-1">
            Evaluate Composition <Sparkles className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-hidden flex flex-col md:flex-row">
        {/* Editor Area */}
        <div className="flex-grow p-6 flex flex-col gap-4 overflow-y-auto">
          <div className="flex justify-between items-center">
            <input 
              type="text" 
              placeholder="Untitled Document" 
              className="text-2xl font-black bg-transparent border-none outline-none focus:ring-0 text-foreground w-full placeholder:text-muted-foreground/30 text-heading"
            />
          </div>
          <Textarea 
            className="flex-grow bg-transparent border-none shadow-none resize-none focus-visible:ring-0 text-sm md:text-base leading-relaxed text-foreground p-0 min-h-[350px] outline-none text-learning font-medium" 
            placeholder="Start typing your essay or copy-paste text here. Press the AI button to polish..."
          />
        </div>

        {/* Sidebar Recommendation Assistant */}
        <div className="w-full md:w-80 border-t-2 md:border-t-0 md:border-l-2 border-border/60 bg-card/10 p-6 overflow-y-auto flex-shrink-0 space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-black uppercase tracking-widest text-heading">AI Copilot Suggestions</h4>
          </div>

          <div className="space-y-4">
            <div className="card-edu p-4 bg-card space-y-2">
              <span className="text-[9px] font-black text-primary uppercase bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full text-heading">Vocabulary Boost</span>
              <p className="text-xs font-bold text-foreground">Change "give feedback" to:</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/40 p-2 rounded-lg border border-border/40">
                <CornerDownRight className="w-3 h-3 flex-shrink-0" /> "provide constructive remarks"
              </div>
            </div>

            <div className="card-edu p-4 bg-card space-y-2">
              <span className="text-[9px] font-black text-amber-500 uppercase bg-amber-500/10 border-2 border-amber-500/20 px-2 py-0.5 rounded-full text-heading">Grammar Warning</span>
              <p className="text-xs text-muted-foreground leading-relaxed font-semibold">Ensure third-person singular verbs end in "s". Check subject-verb agreement on line 4.</p>
            </div>
          </div>

          <Button variant="outline" className="btn-edu w-full py-5 text-xs border-2 bg-transparent text-primary hover:bg-primary/5 border-primary/25">
            <Wand2 className="w-3.5 h-3.5" /> Auto-Format Style
          </Button>
        </div>
      </div>
    </div>
  );
}
