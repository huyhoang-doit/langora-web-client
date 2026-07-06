"use client";

import Link from "next/link";
import { ArrowLeft, Clock, FileText, Target, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { writingService } from "@/services/writing.service";
import { UserService } from "@/services/user.service";
import { useLearningStore } from "@/stores/learning.store";
import { WritingExercise } from "@/types/writing";

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.exerciseId as string;
  console.log("exer", exerciseId)
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [exercise, setExercise] = useState<WritingExercise | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        setFetchLoading(true);

        // 1. Get user profile from store or fetch fallback
        let currentProfile = useLearningStore.getState().profile;
        if (!currentProfile) {
          try {
            const profileRes = await UserService.getLearningProfile();
            if (profileRes.data) {
              currentProfile = profileRes.data;
              useLearningStore.getState().setProfile(profileRes.data);
            }
          } catch (e) {
            console.error("Failed to fetch profile fallback", e);
          }
        }

        if (!currentProfile || !currentProfile.targetLanguageId) {
          toast.error("Failed to load learning profile.");
          router.push("/profile");
          return;
        }

        const langId = currentProfile.targetLanguageId;

        // 2. Fetch exercise details
        const res = await writingService.getExerciseById(langId, exerciseId);
        if (res.success && res.data) {
          setExercise(res.data);
        }
      } catch (error) {
        console.error("Failed to load exercise details:", error);
      } finally {
        setFetchLoading(false);
      }
    };
    fetchExercise();
  }, [exerciseId]);

  if (fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-muted-foreground font-medium">Loading exercise details...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <h2 className="text-xl font-bold text-destructive mb-2">Exercise Not Found</h2>
        <p className="text-muted-foreground mb-6">The exercise you are looking for does not exist.</p>
        <Link href="/writing">
          <Button className="btn-edu px-8 h-12 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 font-black uppercase tracking-wide">
            Back to Writing Hub
          </Button>
        </Link>
      </div>
    );
  }

  const handleStartSession = async () => {
    try {
      setLoading(true);
      const res = await writingService.createSession(exerciseId);
      if (res.success && res.data) {
        toast.success("Session started successfully!");
        router.push(`/writing/session/${res.data.id}`);
      } else {
        toast.error("Failed to start session.");
      }
    } catch (error) {
      console.error("Error starting session:", error);
      toast.error("An error occurred while starting the session.");
    } finally {
      setLoading(false);
    }
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
      <div className="flex-grow overflow-y-auto p-4 md:p-6 scrollbar-thin">
        <div className="max-w-2xl mx-auto space-y-6 pt-2">

          {/* Main Info Card */}
          <div className="card-edu p-5 md:p-6 bg-card relative overflow-hidden border-2 border-border/50">
            <div className="relative z-10 space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  {exercise.topicName && (
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">{exercise.topicName}</p>
                  )}
                  <h1 className="text-xl md:text-2xl font-black text-foreground text-heading leading-tight">
                    {exercise.title}
                  </h1>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="outline" className="bg-background border-2 border-primary/30 text-primary font-bold px-2 py-0.5 whitespace-nowrap text-xs">
                    {exercise.levelName || exercise.levelId}
                  </Badge>
                  {exercise.contentTypeName && (
                    <Badge variant="secondary" className="border-2 font-bold uppercase tracking-wider text-xs px-2 py-0.5 whitespace-nowrap bg-secondary/50 text-secondary-foreground">
                      {exercise.contentTypeName}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {exercise.description || exercise.summary || exercise.content || "No description provided."}
              </p>

              <div className="flex flex-wrap gap-3 pt-3 border-t-2 border-border/60">
                {(exercise.timeLimitMinutes || exercise.estimatedMinutes) && (
                  <div className="bg-muted/30 px-4 py-2 rounded-lg border border-border/50 flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Time Limit</p>
                      <p className="text-sm font-black text-foreground">{exercise.timeLimitMinutes || exercise.estimatedMinutes} min</p>
                    </div>
                  </div>
                )}
                <div className="bg-muted/30 px-4 py-2 rounded-lg border border-border/50 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-green-500/10 text-green-500 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Word Target</p>
                    <p className="text-sm font-black text-foreground">~ {exercise.wordCountTarget}</p>
                  </div>
                </div>
                <div className="bg-muted/30 px-4 py-2 rounded-lg border border-border/50 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-wider">Sentences</p>
                    <p className="text-sm font-black text-foreground">{exercise.sentences?.length || exercise.totalSentences || 0} parts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines / Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              Source Text (Đoạn cần dịch)
            </h3>
            <div className="card-edu p-5 bg-card border-2 border-border/50">
              <p className="text-base font-medium text-foreground leading-relaxed whitespace-pre-wrap">
                {exercise.sentences?.length ? exercise.sentences.map(s => s.sourceText).join("\n") : (exercise.content || exercise.scenario || "No source text provided.")}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 pb-8 flex justify-center">
            <Button
              onClick={handleStartSession}
              disabled={loading}
              className="btn-edu h-12 px-10 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 w-full sm:w-auto shadow-[0_4px_0_0_rgba(99,102,241,0.2)] hover:translate-y-1 hover:shadow-none transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              {loading ? "Preparing Session..." : "Start Writing Now"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
