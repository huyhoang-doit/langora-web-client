"use client";

import Link from "next/link";
import { Users, MessageSquare, Trophy, ThumbsUp, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function CommunityPage() {
  const posts = [
    { author: "Minh Tri", role: "IELTS Learner", text: "Just achieved my daily streak goal! Studying conditional type 3 structures today. The AI remarks really helped with tense consistency.", likes: 12, comments: 4 },
    { author: "Phuong Anh", role: "Business English", text: "Does anyone have a good flashcard list for corporate negotiations? Would love to match deck templates.", likes: 8, comments: 7 },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="community-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold text-foreground">Community Feed</h2>
          <p className="text-xs text-muted-foreground">Interact with fellow language learners</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/community/discussions">
            <Button size="sm" variant="outline" className="font-bold text-xs gap-1 border-primary/20 text-primary hover:bg-primary/5">
              <MessageSquare className="w-3.5 h-3.5" /> Discussions
            </Button>
          </Link>
          <Link href="/community/leaderboard">
            <Button size="sm" className="font-bold text-xs gap-1 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)]">
              <Trophy className="w-3.5 h-3.5" /> Leaderboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6">
          {posts.map((post, i) => (
            <Card key={i} className="hover:border-primary/30 transition-all">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-muted text-xs">👤</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-bold text-xs block text-foreground">{post.author}</span>
                    <span className="text-[9px] text-primary font-bold uppercase tracking-wider block">{post.role}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-foreground leading-relaxed">{post.text}</p>

                <div className="flex items-center gap-4 pt-3 border-t border-border text-xs text-muted-foreground font-semibold">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><ThumbsUp className="w-4 h-4" /> {post.likes}</button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"><MessageSquare className="w-4 h-4" /> {post.comments}</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
