"use client";

import { Link } from "@/i18n/navigation";
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
import ImageLogoWeb from "@/components/image-logo-web";

export default function ExerciseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const exerciseId = params.exerciseId as string;
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
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] p-6 text-center bg-background">
        <ImageLogoWeb variant="mascot" className="w-16 h-16 mb-4 animate-bounce" />
        <p className="text-muted-foreground font-medium text-xs md:text-sm text-learning text-heading">Ora đang tải thông tin bài tập cho bạn...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <ImageLogoWeb variant="mascot" className="w-16 h-16 mb-4 grayscale" />
        <h2 className="text-lg font-bold text-destructive mb-2 text-heading">Không tìm thấy bài tập</h2>
        <p className="text-muted-foreground mb-4 text-xs md:text-sm text-learning">Ora tìm mãi nhưng không thấy bài tập này đâu...</p>
        <Link href="/writing">
          <Button variant="edu" size="edu">
            Quay lại Hub
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
      <header className="flex items-center gap-3 px-4 md:px-6 h-14 bg-background/80 backdrop-blur-xl border-b border-border sticky top-0 z-30 flex-shrink-0">
        <Link href="/writing">
          <Button variant="edu-outline" size="icon">
            <ArrowLeft className="w-3.5 h-3.5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-base md:text-lg font-bold text-foreground text-heading">Chi tiết bài tập</h2>
          <p className="text-[10px] md:text-xs text-muted-foreground font-medium">Xem yêu cầu bài tập trước khi bắt đầu</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-4 md:p-6 scrollbar-thin">
        <div className="max-w-2xl mx-auto space-y-4 pt-1">

          {/* Main Info Card */}
          <div className="card-edu p-4 md:p-5 bg-card relative overflow-hidden border border-border">
            <div className="relative z-10 space-y-3">
              <div className="flex justify-between items-start gap-4">
                <div>
                  {exercise.topicName && (
                    <p className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">{exercise.topicName}</p>
                  )}
                  <h1 className="text-lg md:text-xl font-bold text-foreground text-heading leading-tight">
                    {exercise.title}
                  </h1>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant="outline" className="bg-background border border-primary/30 text-primary font-bold px-2 py-0.5 whitespace-nowrap text-[10px]">
                    {exercise.levelName || exercise.levelId}
                  </Badge>
                  {exercise.contentTypeName && (
                    <Badge variant="secondary" className="border font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 whitespace-nowrap bg-secondary/50 text-secondary-foreground">
                      {exercise.contentTypeName}
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">
                {exercise.description || exercise.summary || exercise.content || "Không có mô tả chi tiết."}
              </p>

              <div className="flex flex-wrap gap-2.5 pt-3 border-t border-border">
                {(exercise.timeLimitMinutes || exercise.estimatedMinutes) && (
                  <div className="bg-muted/30 px-3 py-1.5 rounded-lg border border-border flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Clock className="w-3 h-3" />
                    </div>
                    <div>
                      <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-wider">Thời gian</p>
                      <p className="text-xs font-bold text-foreground">{exercise.timeLimitMinutes || exercise.estimatedMinutes} phút</p>
                    </div>
                  </div>
                )}

                <div className="bg-muted/30 px-3 py-1.5 rounded-lg border border-border flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-orange-500/10 text-orange-500 flex items-center justify-center">
                    <Target className="w-3 h-3" />
                  </div>
                  <div>
                    <p className="text-[8px] uppercase font-bold text-muted-foreground tracking-wider">Số câu</p>
                    <p className="text-xs font-bold text-foreground">{exercise.sentences?.length || exercise.totalSentences || 0} câu</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ora Advice Card */}
          <div className="card-edu p-3.5 bg-primary/5 border-primary/20 flex gap-3.5 items-center">
            <ImageLogoWeb variant="mascot" className="w-12 h-12 flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-heading text-primary flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Lời khuyên từ Ora
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 text-learning">
                Bài tập này có {exercise.sentences?.length || exercise.totalSentences || 0} câu cần dịch. Hãy chú ý dịch cẩn thận, sử dụng các gợi ý từ vựng và cấu trúc ngữ pháp để đạt điểm số tối đa nhé!
              </p>
            </div>
          </div>

          {/* Guidelines / Breakdown */}
          <div className="space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 text-heading">
              Đoạn tiếng Việt cần dịch
            </h3>
            <div className="card-edu p-4 bg-card border border-border">
              <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed whitespace-pre-wrap">
                {exercise.sentences?.length ? exercise.sentences.map(s => s.sourceText).join("\n") : (exercise.content || exercise.scenario || "Không có văn bản gốc.")}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-1 pb-6 flex justify-center">
            <Button
              onClick={handleStartSession}
              disabled={loading}
              variant="edu"
              size="edu"
              className="w-full sm:w-auto"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {loading ? "Đang chuẩn bị..." : "Bắt đầu viết ngay"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
