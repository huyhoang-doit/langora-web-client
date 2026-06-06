"use client";

import Link from "next/link";
import { ArrowLeft, Timer, Volume2, RotateCcw, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageLogoWeb from "@/components/image-logo-web";

export default function ListenTypePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="listen-type-game-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Listening Typing</h2>
            <p className="text-xs text-muted-foreground font-semibold">Listen and type the spelling accurately</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-primary/20 bg-primary/5 text-primary font-bold text-xs text-heading">
          <Timer className="w-3.5 h-3.5" /> 00:40
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="card-edu p-8 bg-card relative overflow-hidden">
            <div className="space-y-6">
              <Button size="lg" className="btn-edu w-20 h-20 rounded-full mx-auto flex items-center justify-center border-2 border-primary bg-primary text-primary-foreground hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/25">
                <Volume2 className="w-8 h-8 animate-pulse" />
              </Button>
              <div>
                <span className="text-[10px] text-primary uppercase font-black tracking-widest block text-heading">Level: B2 • Business English</span>
                <p className="text-xs text-muted-foreground font-semibold mt-1 text-learning">Click the button above to play the audio sample</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Keyboard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                className="w-full bg-card border-2 border-border focus-visible:border-primary pl-12 pr-4 h-14 rounded-2xl text-center font-bold text-lg text-learning"
                placeholder="Type the word here..."
              />
            </div>
          </div>

          {/* AI Ora Companion Hint */}
          <div className="card-edu p-4 bg-primary/5 border-primary/20 flex gap-3 items-center text-left">
            <ImageLogoWeb variant="mascot" className="flex-shrink-0 animate-bounce w-8 h-8" />
            <div className="text-xs">
              <span className="font-black text-primary text-heading block">Ora's Companion Tip</span>
              <span className="text-muted-foreground font-semibold">"Need help? Press the play button. You can replay the audio sample as many times as you need!"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t-2 border-border/60 py-4 px-6 flex justify-between items-center bg-muted/20 flex-shrink-0">
        <Button variant="ghost" size="sm" className="btn-edu border-2 border-border bg-transparent text-foreground hover:bg-muted font-bold text-xs h-9 gap-1.5">
          <RotateCcw className="w-3.5 h-3.5" /> Repeat
        </Button>
        <Link href="/games/result">
          <Button size="sm" className="btn-edu border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs h-9">
            Verify Spelling
          </Button>
        </Link>
      </footer>
    </div>
  );
}
