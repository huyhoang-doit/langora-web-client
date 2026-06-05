"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2, FileText, CheckCircle2, ChevronRight, CornerDownRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function AIWritingEditorPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ai-writing-editor-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/writing">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">AI Workspace</h2>
            <p className="text-xs text-muted-foreground">Interactive writing notebook</p>
          </div>
        </div>
        <Link href="/writing/review/new-doc">
          <Button size="sm" className="font-bold flex items-center gap-1 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
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
              className="text-2xl font-black bg-transparent border-none outline-none focus:ring-0 text-foreground w-full placeholder:text-muted-foreground/30"
            />
          </div>
          <Textarea 
            className="flex-grow bg-transparent border-none shadow-none resize-none focus-visible:ring-0 text-sm md:text-base leading-relaxed text-foreground p-0 min-h-[350px] outline-none" 
            placeholder="Start typing your essay or copy-paste text here. Press the AI button to polish..."
          />
        </div>

        {/* Sidebar Recommendation Assistant */}
        <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-border bg-card/10 p-6 overflow-y-auto flex-shrink-0 space-y-6">
          <div className="flex items-center gap-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <h4 className="text-xs font-bold uppercase tracking-wider">AI Copilot Suggestions</h4>
          </div>

          <div className="space-y-4">
            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 space-y-2">
                <span className="text-[9px] font-bold text-primary uppercase bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">Vocabulary Boost</span>
                <p className="text-xs font-medium text-foreground">Change "give feedback" to:</p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono bg-muted/40 p-2 rounded">
                  <CornerDownRight className="w-3 h-3" /> "provide constructive remarks"
                </div>
              </CardContent>
            </Card>

            <Card className="hover:border-primary/30 transition-colors">
              <CardContent className="p-4 space-y-2">
                <span className="text-[9px] font-bold text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">Grammar Warning</span>
                <p className="text-xs text-muted-foreground leading-relaxed">Ensure third-person singular verbs end in "s". Check subject-verb agreement on line 4.</p>
              </CardContent>
            </Card>
          </div>

          <Button variant="outline" className="w-full py-5 rounded-xl font-bold text-xs gap-1 border-primary/20 text-primary hover:bg-primary/5">
            <Wand2 className="w-3.5 h-3.5" /> Auto-Format Style
          </Button>
        </div>
      </div>
    </div>
  );
}
