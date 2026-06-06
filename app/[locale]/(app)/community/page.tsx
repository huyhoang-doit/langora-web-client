"use client";

import Link from "next/link";
import { MessageSquare, Trophy, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from 'lucide-react';

export default function CommunityPage() {
  const posts = [
    { author: "Minh Tri", role: "IELTS Learner", text: "Just achieved my daily streak goal! Studying conditional type 3 structures today. The AI remarks really helped with tense consistency.", likes: 12, comments: 4 },
    { author: "Phuong Anh", role: "Business English", text: "Does anyone have a good flashcard list for corporate negotiations? Would love to match deck templates.", likes: 8, comments: 7 },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="community-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Community Feed</h2>
          <p className="text-xs text-muted-foreground font-semibold">Interact with fellow language learners</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/community/discussions">
            <Button size="sm" variant="outline" className="btn-edu h-9 px-4 text-xs border-2 bg-transparent text-primary hover:bg-primary/5 border-primary/25">
              <MessageSquare className="w-3.5 h-3.5" /> Discussions
            </Button>
          </Link>
          <Link href="/community/leaderboard">
            <Button size="sm" className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Trophy className="w-3.5 h-3.5" /> Leaderboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6">
          {posts.map((post, i) => (
            <div key={i} className="card-edu p-5 bg-card space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border-2 border-border/60">
                  <AvatarFallback className="bg-muted text-xs font-black"><User className="w-4 h-4 text-muted-foreground mx-auto" /></AvatarFallback>
                </Avatar>
                <div>
                  <span className="font-black text-xs block text-foreground text-heading">{post.author}</span>
                  <span className="text-[9px] text-primary font-black uppercase tracking-widest block text-heading mt-0.5">{post.role}</span>
                </div>
              </div>

              <p className="text-xs md:text-sm text-foreground leading-relaxed font-medium text-learning">{post.text}</p>

              <div className="flex items-center gap-4 pt-3 border-t-2 border-border/60 text-xs text-muted-foreground font-bold">
                <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><ThumbsUp className="w-4 h-4" /> {post.likes}</button>
                <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><MessageSquare className="w-4 h-4" /> {post.comments}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
