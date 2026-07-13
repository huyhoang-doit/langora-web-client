"use client";

import Link from "next/link";
import { ArrowLeft, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageLogoWeb from "@/components/image-logo-web";

export default function AIVocabularyGeneratorPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ai-vocab-generator-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/vocabulary">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-lg font-black text-foreground text-heading">AI Vocabulary Generator</h2>
          <p className="text-xs text-muted-foreground font-semibold">Compile lists with specific themes using LLMs</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-2xl mx-auto space-y-6 pt-6">
          {/* AI Banner with Mascot */}
          <div className="card-edu p-6 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-start">
            <ImageLogoWeb variant="mascot" className="animate-bounce flex-shrink-0 w-10 h-10" />
            <div>
              <h3 className="text-sm font-black text-primary uppercase tracking-widest text-heading flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 animate-pulse" /> Generate Custom Lexicons
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed font-semibold text-learning">
                Type a topic (e.g., "Airport customs", "Job interview in IT", "Japanese N2 verbs related to weather") and Ora will synthesize 10-20 customized vocabulary cards with definitions and phonetics.
              </p>
            </div>
          </div>

          {/* Prompt Generator Input */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input 
                className="flex-grow bg-card border-2 border-border focus-visible:border-primary h-14 rounded-2xl pl-6 pr-4 text-learning font-semibold"
                placeholder="E.g., Idioms about negotiations or agreement..."
              />
              <Button className="btn-edu h-14 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold flex items-center gap-2">
                <Wand2 className="w-4 h-4" /> Generate
              </Button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 pt-1">
              {["Weather adjectives", "Academic IELTS Task 2", "Daily shopping JLPT", "Hospital greetings"].map((item) => (
                <button 
                  key={item} 
                  className="px-3.5 py-1.5 card-edu card-edu-interactive bg-card/45 hover:bg-primary/5 hover:border-primary/40 rounded-full text-xs font-bold text-heading text-muted-foreground hover:text-foreground transition-all"
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
