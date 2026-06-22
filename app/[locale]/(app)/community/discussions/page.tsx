"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, Plus, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImageLogoWeb from "@/components/image-logo-web";

export default function DiscussionsPage() {
  const discussions = [
    { title: "Best strategies to reach IELTS Speaking Band 8.0+", author: "Hoang", replies: 24, views: 180 },
    { title: "Reviewing Japanese N2 Grammar patterns regarding conditionals", author: "Yuki", replies: 15, views: 95 },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="community-discussions-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/community">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-lg font-black text-foreground text-heading">Discussions</h2>
            <p className="text-xs text-muted-foreground font-semibold">Join language discussions and ask questions</p>
          </div>
        </div>
        <Button size="sm" className="btn-edu border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/95 font-bold text-xs h-9 gap-1.5">
          <Plus className="w-3.5 h-3.5" /> Start Discussion
        </Button>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4 pt-4">
          {/* Welcome Banner with Mascot */}
          <div className="card-edu p-4 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent border-primary/20 flex gap-4 items-center">
            <ImageLogoWeb variant="mascot" className="animate-bounce w-10 h-10" />
            <div>
              <span className="font-black text-primary text-heading block">Ora's Community Guideline</span>
              <span className="text-xs text-muted-foreground font-semibold">"Share your learning hacks or ask grammar questions here. Helping others is a great way to reinforce your own knowledge!"</span>
            </div>
          </div>

          {discussions.map((disc, i) => (
            <div key={i} className="card-edu card-edu-interactive p-5 flex justify-between items-center gap-4 bg-card cursor-pointer">
              <div className="space-y-1">
                <span className="font-black text-base text-foreground block hover:text-primary transition-colors cursor-pointer text-heading">{disc.title}</span>
                <span className="text-[10px] text-muted-foreground font-semibold block mt-0.5">By {disc.author}</span>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground font-semibold flex-shrink-0">
                <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {disc.replies}</span>
                <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {disc.views}</span>
                <Button variant="ghost" size="icon" className="btn-edu w-8 h-8 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center p-0 rounded-full">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
