"use client";

import Link from "next/link";
import { ArrowLeft, Mic, MicOff, Volume2, Square, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function VoiceConversationPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="ora-voice-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/ora">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Voice Session</h2>
          <p className="text-xs text-muted-foreground">Interactive spoken simulation with Ora</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md text-center space-y-6">
          {/* Waveform Visualization Mock */}
          <div className="w-full h-44 bg-card/40 border border-border rounded-2xl flex items-center justify-center gap-1.5 p-6 relative overflow-hidden group">
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
            <span className="text-[10px] text-primary uppercase font-bold tracking-widest flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Ora is Listening
            </span>
            <p className="text-sm text-muted-foreground italic">"I am prepared when you are. Tell me about your goals."</p>
          </div>

          {/* Micro controls */}
          <div className="flex gap-4 justify-center pt-4">
            <Button size="icon" className="w-16 h-16 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
              <Mic className="w-6 h-6" />
            </Button>
            <Button size="icon" variant="outline" className="w-16 h-16 rounded-full border-border hover:bg-destructive/10 hover:text-destructive">
              <Square className="w-5 h-5 fill-current" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
