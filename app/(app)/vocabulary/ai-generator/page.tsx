"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2, RefreshCw, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AIVocabularyGeneratorPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ai-vocab-generator-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">AI Vocabulary Generator</h2>
          <p className="text-xs text-muted-foreground">Compile lists with specific themes using LLMs</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-2xl mx-auto space-y-6 pt-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex gap-4 items-start">
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wide">Generate Custom Lexicons</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Type a topic (e.g., "Airport customs", "Job interview in IT", "Japanese N2 verbs related to weather") and AI will synthesize 10-20 customized vocabulary cards with definitions and phonetics.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Generator Input */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input 
                className="flex-grow bg-muted/50 border-border rounded-xl px-4 py-6 focus-visible:ring-1 focus-visible:ring-primary text-sm"
                placeholder="E.g., Idioms about negotiations or agreement..."
              />
              <Button className="rounded-xl px-6 font-bold hover:shadow-[0_0_15px_rgba(168,240,106,0.3)] flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> Generate
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Weather adjectives", "Academic IELTS Task 2", "Daily shopping JLPT", "Hospital greetings"].map((item) => (
                <button 
                  key={item} 
                  className="px-3 py-1.5 rounded-lg border bg-muted/20 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer active:scale-95 transition-all"
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
