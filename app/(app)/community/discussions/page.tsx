"use client";

import Link from "next/link";
import { ArrowLeft, MessageSquare, Plus, ChevronRight, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DiscussionsPage() {
  const discussions = [
    { title: "Best strategies to reach IELTS Speaking Band 8.0+", author: "Hoang", replies: 24, views: 180 },
    { title: "Reviewing Japanese N2 Grammar patterns regarding conditionals", author: "Yuki", replies: 15, views: 95 },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="community-discussions-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/community">
            <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold text-foreground">Discussions</h2>
            <p className="text-xs text-muted-foreground">Join language discussions and ask questions</p>
          </div>
        </div>
        <Button size="sm" className="font-bold text-xs gap-1.5 hover:shadow-[0_0_12px_rgba(168,240,106,0.3)]">
          <Plus className="w-3.5 h-3.5" /> Start Discussion
        </Button>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4 pt-4">
          {discussions.map((disc, i) => (
            <Card key={i} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex justify-between items-center gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-base text-foreground block hover:text-primary transition-colors cursor-pointer">{disc.title}</span>
                  <span className="text-[10px] text-muted-foreground font-semibold block mt-0.5">By {disc.author}</span>
                </div>

                <div className="flex items-center gap-6 text-xs text-muted-foreground font-semibold flex-shrink-0">
                  <span className="flex items-center gap-1"><MessageSquare className="w-4 h-4" /> {disc.replies}</span>
                  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> {disc.views}</span>
                  <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
