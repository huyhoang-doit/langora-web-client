"use client";

import Link from "next/link";
import { ArrowLeft, Mic, Square, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoiceConversationPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-voice-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/ora">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Voice Session</h2>
          <p className="text-xs text-muted-foreground font-semibold">Interactive spoken simulation with Ora</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md text-center space-y-6">
          {/* Waveform Visualization Mock */}
          <div className="w-full h-44 card-edu bg-gradient-to-tr from-indigo-500/10 via-blue-500/5 to-transparent flex items-center justify-center gap-1.5 p-6 relative overflow-hidden group">
            {/* Visualizer bars */}
            {[40, 60, 20, 80, 50, 90, 30, 70, 40, 60, 20, 80].map((h, i) => (
              <span 
                key={i} 
                className="w-1.5 bg-primary rounded-full transition-all animate-pulse" 
                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s`, animationDuration: "1.2s" }} 
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-primary uppercase font-black tracking-widest flex items-center justify-center gap-1.5 text-heading">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" /> Ora is Listening
            </span>
            <p className="text-sm text-muted-foreground italic font-semibold text-learning">"I am prepared when you are. Tell me about your goals."</p>
          </div>

          {/* Micro controls */}
          <div className="flex gap-4 justify-center pt-4">
            <Button size="icon" className="btn-edu w-16 h-16 rounded-full border-2 bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center">
              <Mic className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="outline" className="btn-edu w-16 h-16 rounded-full border-2 bg-transparent text-foreground hover:bg-destructive/10 hover:text-destructive border-border">
              <Square className="w-5 h-5 fill-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
