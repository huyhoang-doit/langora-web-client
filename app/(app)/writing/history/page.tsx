"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Award, Star, History, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WritingHistoryPage() {
  const history = [
    { id: "1", title: "Requesting feedback from coworker", score: "8.5/10", date: "June 5, 2026", status: "Evaluated" },
    { id: "2", title: "Introduction letter to IT manager", score: "7.0/10", date: "May 28, 2026", status: "Evaluated" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-history-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-foreground">Writing History</h2>
          <p className="text-xs text-muted-foreground">Review previous evaluations and revisions</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {history.map((item) => (
            <Card key={item.id} className="hover:border-primary/50 transition-colors">
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-foreground">{item.title}</span>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded">
                      {item.score}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.date} • {item.status}
                  </p>
                </div>

                <Link href={`/writing/review/${item.id}`}>
                  <Button size="sm" variant="outline" className="font-bold text-xs gap-1.5">
                    View Evaluation <Eye className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
