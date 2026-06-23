"use client";

import Link from "next/link";
import { ArrowLeft, Clock, FileText, Target, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MOCK_WRITING_EXERCISES } from "@/lib/mock-data/writing";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.exerciseId as string;
  const [loading, setLoading] = useState(false);

  const exercise = MOCK_WRITING_EXERCISES.find(e => e.id === exerciseId);

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <h2 className="text-xl font-bold text-destructive mb-2">Exercise Not Found</h2>
        <p className="text-muted-foreground mb-6">The exercise you are looking for does not exist.</p>
        <Link href="/writing">
          <Button className="btn-edu border-2 bg-primary text-primary-foreground hover:bg-primary/90">
            Back to Writing Hub
          </Button>
        </Link>
      </div>
    );
  }

  const handleStartSession = () => {
    setLoading(true);
    // Simulate API call to create session: POST /api/v1/writing-sessions
    setTimeout(() => {
      toast.success("Session started successfully!");
      // Mock sessionId = exerciseId + "-session"
      router.push(`/writing/session/${exerciseId}-session`);
    }, 800);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="exercise-detail-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Exercise Details</h2>
          <p className="text-xs text-muted-foreground font-semibold">Review requirements before starting</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-3xl mx-auto space-y-8 pt-4">
          
          {/* Main Info Card */}
          <div className="card-edu p-8 bg-card relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-2xl md:text-3xl font-black text-foreground text-heading leading-tight">
                  {exercise.title}
                </h1>
                <Badge variant="outline" className="bg-background border-2 border-primary/30 text-primary font-bold px-3 py-1 whitespace-nowrap">
                  {exercise.level}
                </Badge>
              </div>

              <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">
                {exercise.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-border/60">
                <div className="bg-muted/30 p-4 rounded-xl border-2 border-border/50 text-center space-y-2">
                  <div className="mx-auto w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Time Limit</p>
                  <p className="font-black text-foreground text-heading">{exercise.timeLimitMinutes} min</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border-2 border-border/50 text-center space-y-2">
                  <div className="mx-auto w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Word Target</p>
                  <p className="font-black text-foreground text-heading">~ {exercise.wordCountTarget}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-xl border-2 border-border/50 text-center space-y-2 col-span-2 sm:col-span-1">
                  <div className="mx-auto w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Sentences</p>
                  <p className="font-black text-foreground text-heading">{exercise.sentences.length} parts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines / Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Structural Guidelines
            </h3>
            <div className="card-edu p-6 bg-card space-y-4">
              {exercise.sentences.map((s) => (
                <div key={s.id} className="flex gap-4 p-3 rounded-xl hover:bg-muted/30 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {s.order}
                  </div>
                  <p className="text-sm font-medium text-foreground">{s.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 pb-12 flex justify-center">
            <Button 
              onClick={handleStartSession} 
              disabled={loading}
              className="btn-edu h-14 px-12 text-base border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 w-full sm:w-auto shadow-[0_4px_0_0_rgba(99,102,241,0.2)] hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Play className="w-5 h-5 fill-current" />
              {loading ? "Preparing Session..." : "Start Writing Now"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
