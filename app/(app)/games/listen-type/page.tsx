"use client";

import Link from "next/link";
import { ArrowLeft, Timer, Volume2, RotateCcw, Keyboard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ListenTypePage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="listen-type-game-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/games">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Listening Typing</h2>
            <p className="text-xs text-muted-foreground">Listen and type the spelling accurately</p>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-sm border px-3 py-1 bg-muted/40 rounded-lg">
          <Timer className="w-4 h-4 text-primary" /> 00:40
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 flex flex-col items-center justify-center gap-8 scrollbar-thin">
        <div className="w-full max-w-md space-y-6 text-center">
          <Card className="p-8 bg-card/50 border border-border">
            <CardContent className="p-0 space-y-6">
              <Button size="lg" className="w-20 h-20 rounded-full mx-auto flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
                <Volume2 className="w-8 h-8" />
              </Button>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest block">Level: B2 • Business</span>
                <p className="text-xs text-muted-foreground mt-1">Click the button above to play the audio sample</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <div className="relative">
              <Keyboard className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input 
                className="w-full bg-muted/50 pl-12 pr-4 py-7 border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary text-center font-bold text-lg"
                placeholder="Type the word here..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer controls */}
      <footer className="border-t py-4 px-6 flex justify-between items-center bg-muted/20 flex-shrink-0">
        <Button variant="ghost" size="sm" className="font-bold text-xs gap-1.5"><RotateCcw className="w-3.5 h-3.5" /> Repeat</Button>
        <Link href="/games/result">
          <Button size="sm" className="font-bold text-xs">Verify Spelling</Button>
        </Link>
      </footer>
    </div>
  );
}
