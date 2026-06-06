"use client";

import Link from "next/link";
import { Clock, Eye, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WritingHistoryPage() {
  const history = [
    { id: "1", title: "Requesting feedback from coworker", score: "8.5/10", date: "June 5, 2026", status: "Evaluated" },
    { id: "2", title: "Introduction letter to IT manager", score: "7.0/10", date: "May 28, 2026", status: "Evaluated" },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-history-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Writing History</h2>
          <p className="text-xs text-muted-foreground font-semibold">Review previous evaluations and revisions</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-4">
          {history.map((item) => (
            <div key={item.id} className="card-edu card-edu-interactive p-5 bg-card flex items-center justify-between gap-4">
              <div className="space-y-1 text-heading">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-black text-base text-foreground">{item.title}</span>
                  <span className="text-[10px] font-black text-primary bg-primary/10 border-2 border-primary/20 px-2 py-0.5 rounded-full">
                    {item.score}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                  <Clock className="w-3.5 h-3.5" /> {item.date} • {item.status}
                </p>
              </div>

              <Link href={`/writing/review/${item.id}`} className="flex-shrink-0">
                <Button size="sm" variant="outline" className="btn-edu h-9 px-4 text-xs border-2 bg-transparent text-foreground hover:bg-muted gap-1.5">
                  View Evaluation <Eye className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
