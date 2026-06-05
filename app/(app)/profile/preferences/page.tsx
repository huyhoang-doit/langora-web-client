"use client";

import Link from "next/link";
import { ArrowLeft, Save, Globe, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LearningPreferencesPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="learning-preferences-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Learning Preferences</h2>
          <p className="text-xs text-muted-foreground">Adjust target languages and daily study goals</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            {/* Target Language Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-primary" /> Target Language
              </label>
              <div className="relative">
                <select className="appearance-none w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer text-xs font-semibold">
                  <option value="english">English (British / Academic)</option>
                  <option value="japanese">Japanese (JLPT Track)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60 text-xs">▼</div>
              </div>
            </div>

            {/* Daily Goal Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground block uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-4 h-4 text-primary" /> Daily Study Target
              </label>
              <div className="relative">
                <select className="appearance-none w-full bg-muted/50 border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all cursor-pointer text-xs font-semibold">
                  <option value="casual">Casual (20 XP / day - 5 mins)</option>
                  <option value="regular">Regular (50 XP / day - 10 mins)</option>
                  <option value="serious">Serious (100 XP / day - 20 mins)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground/60 text-xs">▼</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button className="font-bold text-xs gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all">
                Save Preferences <Save className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
