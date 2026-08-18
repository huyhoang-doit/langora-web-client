"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { Link } from "@/i18n/navigation";
import {
  ArrowLeft, FileText, LayoutList, Save, CheckCircle2, Clock, Zap, BookOpen, PenLine, Award, ChevronRight, Sparkles,
  AlertCircle, TrendingUp, Lightbulb, MessageSquare, Target, Star, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { writingService } from "@/services/writing.service";
import { UserService } from "@/services/user.service";
import { useLearningStore } from "@/stores/learning.store";
import { WritingSession, WritingExercise, WritingAiFeedback } from "@/types/writing";
import ImageLogoWeb from "@/components/image-logo-web";

export default function WritingSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;

  const [sessionLoading, setSessionLoading] = useState(true);
  const [session, setSession] = useState<WritingSession | null>(null);
  const exercise = session?.exercise;

  const [mode, setMode] = useState<"full" | "sentence">("sentence");
  const [fullText, setFullText] = useState("");
  const [sentenceAnswers, setSentenceAnswers] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  // Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submittingSentences, setSubmittingSentences] = useState<Record<string, boolean>>({});
  const [sentenceFeedbacks, setSentenceFeedbacks] = useState<Record<string, WritingAiFeedback>>({});
  const [showFullSuggest, setShowFullSuggest] = useState(false);
  const [showSentenceSuggest, setShowSentenceSuggest] = useState<Record<string, boolean>>({});
  const [fullFeedback, setFullFeedback] = useState<WritingAiFeedback[] | null>(null);

  // Time tracking per sentence
  const [sentenceStartTimes, setSentenceStartTimes] = useState<Record<string, number>>({});

  // Câu đang hiện feedback bên phải (sentence mode)
  const [activeFeedbackSentenceId, setActiveFeedbackSentenceId] = useState<string | null>(null);

  // Timer mock
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setSessionLoading(true);
        const res = await writingService.getSessionById(sessionId);
        if (res.success && res.data) {
          let sessionData = res.data;

          if (sessionData.exerciseId && !sessionData.exercise) {
            let langId = useLearningStore.getState().profile?.targetLanguageId;
            if (!langId) {
              const profileRes = await UserService.getLearningProfile();
              if (profileRes.data) {
                useLearningStore.getState().setProfile(profileRes.data);
                langId = profileRes.data.targetLanguageId;
              }
            }
            if (langId) {
              const exerciseRes = await writingService.getExerciseById(langId, sessionData.exerciseId);
              if (exerciseRes.success && exerciseRes.data) {
                sessionData = { ...sessionData, exercise: exerciseRes.data };
              }
            }
          }

          setSession(sessionData);
          setTimeLeft((sessionData.exercise?.timeLimitMinutes || 20) * 60);

          // Khôi phục câu trả lời cũ (nếu có trong api)
          if (res.data.answers) {
            // Tuỳ thuộc format backend trả về, ví dụ có field content hoặc userAnswer
            // Logic ánh xạ nếu cần
          }
        }
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setSessionLoading(false);
      }
    };
    fetchSession();
  }, [sessionId]);

  useEffect(() => {
    if (showFeedback || !exercise) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showFeedback, exercise]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await writingService.updateSession(sessionId, { content: mode === 'full' ? fullText : JSON.stringify(sentenceAnswers) });
      toast.success("Draft saved.");
    } catch (error) {
      toast.error("Failed to save draft.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (mode === "full" && fullText.trim().length < 10) {
      toast.error("Please write something before submitting.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === "sentence") {
        const answers = Object.entries(sentenceAnswers).map(([id, text]) => {
          const sentence = exercise?.sentences?.find(s => s.id === id);
          const startTime = sentenceStartTimes[id];
          const timeSpentSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : undefined;
          return {
            sentenceId: id,
            userAnswer: text,
            sourceText: sentence?.sourceText,
            targetText: sentence?.targetText,
            vocabularyHints: sentence?.vocabularyHints,
            grammarHints: sentence?.grammarHints,
            difficultyScore: sentence?.difficultyScore,
            timeSpentSeconds,
          };
        });

        await writingService.bulkSubmitSentenceAnswers(sessionId, {
          submitSession: true,
          answers
        });

        toast.success("AI has finished evaluating your work!");
        router.push(`/writing/feedback/${sessionId}`);
        return;
      }

      // Existing logic for full mode
      // 1. Save latest content
      await writingService.updateSession(sessionId, { content: fullText, status: 'COMPLETED' });
      // 2. Submit session
      await writingService.submitSession(sessionId);
      // 3. Fetch AI feedbacks
      const fbRes = await writingService.getAiFeedbacks(sessionId);
      if (fbRes.success && fbRes.data) {
        setFullFeedback(fbRes.data);
      }

      setShowFeedback(true);
      toast.success("AI has finished evaluating your work!");
    } catch (error) {
      toast.error("An error occurred during submission.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSentenceSubmit = async (id: string) => {
    if (!sentenceAnswers[id] || sentenceAnswers[id].trim().length < 5) {
      toast.error("Please provide a valid translation first.");
      return;
    }

    const sentence = exercise?.sentences?.find(s => s.id === id);
    const startTime = sentenceStartTimes[id];
    const timeSpentSeconds = startTime ? Math.round((Date.now() - startTime) / 1000) : undefined;

    setSubmittingSentences(prev => ({ ...prev, [id]: true }));
    setShowSentenceSuggest(prev => ({ ...prev, [id]: false }));

    try {
      const res = await writingService.submitSentenceAnswer(sessionId, {
        sentenceId: id,
        userAnswer: sentenceAnswers[id],
        // Context từ WritingExerciseSentenceResponse
        sourceText: sentence?.sourceText,
        targetText: sentence?.targetText,
        vocabularyHints: sentence?.vocabularyHints,
        grammarHints: sentence?.grammarHints,
        difficultyScore: sentence?.difficultyScore,
        timeSpentSeconds,
      });

      if (res.success && res.data) {
        setSentenceFeedbacks(prev => ({
          ...prev,
          [id]: res.data as WritingAiFeedback
        }));
        // Hiển thị feedback bên right panel
        setActiveFeedbackSentenceId(id);
        toast.success("Sentence evaluated!");
      } else {
        // Fallback nếu backend không trả feedback trực tiếp
        const allFbRes = await writingService.getAiFeedbacks(sessionId);
        if (allFbRes.success && allFbRes.data) {
          const specificFb = allFbRes.data.find(f => f.sentenceId === id);
          if (specificFb) {
            setSentenceFeedbacks(prev => ({ ...prev, [id]: specificFb }));
            // Hiển thị feedback bên right panel
            setActiveFeedbackSentenceId(id);
            toast.success("Sentence evaluated!");
          }
        }
      }
    } catch (error) {
      toast.error("Failed to evaluate sentence.");
      console.error(error);
    } finally {
      setSubmittingSentences(prev => ({ ...prev, [id]: false }));
    }
  };

  const allVocabSuggestions = exercise?.sentences?.flatMap(s => s.vocabularyHints || []) || [];
  const allGrammarSuggestions = exercise?.sentences?.flatMap(s => s.grammarHints || []) || [];

  if (sessionLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] bg-background">
        <ImageLogoWeb variant="mascot" className="w-16 h-16 mb-4 animate-bounce" />
        <p className="text-muted-foreground font-medium text-xs md:text-sm text-learning text-heading">Ora đang chuẩn bị phòng học viết cho bạn...</p>
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <ImageLogoWeb variant="mascot" className="w-16 h-16 mb-4 grayscale" />
        <h2 className="text-lg font-bold text-destructive text-heading">Không tìm thấy bài tập</h2>
        <Link href="/writing">
          <Button variant="edu" size="edu" className="mt-4">
            Quay lại Hub
          </Button>
        </Link>
      </div>
    );
  }

  const wordCount = mode === "full"
    ? fullText.trim().split(/\s+/).filter(w => w.length > 0).length
    : Object.values(sentenceAnswers).join(" ").trim().split(/\s+/).filter(w => w.length > 0).length;

  const aggregatedFeedback = session?.totalScore !== undefined ? {
    score: session.totalScore,
    grammarScore: session.grammarScore || 0,
    vocabularyScore: session.vocabularyScore || 0,
    coherenceScore: session.fluencyScore || 0,
    overallComment: "Overall feedback is calculated based on your performance in this session.",
    improvements: fullFeedback?.map(f => f.overallFeedback).filter((v, i, a) => v && a.indexOf(v) === i) || []
  } : null;

  const scorePercentage = aggregatedFeedback ? (aggregatedFeedback.score / 9) * 100 : 0;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background" id="writing-session-page">
      {/* Header */}
      <header className="flex justify-between items-center px-4 h-14 bg-background/80 backdrop-blur-xl border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href={`/writing/${exercise?.id}`}>
            <Button variant="edu-outline" size="icon">
              <ArrowLeft className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <div className="hidden md:block">
            <h2 className="text-base font-bold text-foreground text-heading">{exercise.title}</h2>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" /> {formatTime(timeLeft)} left</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-primary" /> {wordCount} / {exercise.wordCountTarget} words</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-muted p-0.5 rounded-lg flex">
            <button
              onClick={() => setMode("full")}
              disabled={true}
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all ${mode === "full" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"} disabled:opacity-50`}
            >
              <FileText className="w-3 h-3" /> Full Text
            </button>
            <button
              onClick={() => setMode("sentence")}
              disabled={showFeedback}
              className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1.5 transition-all ${mode === "sentence" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"} disabled:opacity-50`}
            >
              <LayoutList className="w-3 h-3" /> By Sentence
            </button>
          </div>
          {/* {!showFeedback && (
            <>
              <Button onClick={handleSave} disabled={isSaving} variant="edu-outline" size="icon" className="hidden sm:flex">
                <Save className={`w-3.5 h-3.5 ${isSaving ? "animate-pulse text-primary" : ""}`} />
              </Button>
            </>
          )}
          {showFeedback && (
            <Link href="/writing">
              <Button variant="edu-outline" size="edu-sm">
                Finish <CheckCircle2 className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )} */}
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">

        {/* Left Panel: Editor Area */}
        <div className="w-full md:w-1/2 lg:w-[60%] border-r border-border bg-background overflow-y-auto p-3 md:p-4 scrollbar-thin flex flex-col relative">

          {/* Prompt Area at the Top */}
          <div className="mb-3 card-edu p-3 bg-muted/20 border border-border">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1.5 text-heading">
              <FileText className="w-3.5 h-3.5" /> Context / Yêu cầu
            </h3>
            <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed mb-2">{exercise.description}</p>

            {mode === "full" && (
              <div className="p-2.5 bg-background rounded-lg border border-border mt-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1 text-heading">Đoạn tiếng Việt cần dịch:</h4>
                <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed">
                  {exercise.sentences?.map(s => s.sourceText).join(" ")}
                </p>
              </div>
            )}
          </div>

          {/* Editor Area */}
          <div className="flex-grow flex flex-col">
            {mode === "full" ? (
              <div className="flex-grow flex flex-col h-full relative">
                <Textarea
                  value={fullText}
                  onChange={(e) => setFullText(e.target.value)}
                  disabled={showFeedback || isSubmitting}
                  placeholder="Type your English translation here..."
                  className="flex-grow min-h-[250px] resize-none bg-background border border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary text-xs md:text-sm leading-relaxed font-medium p-3 disabled:opacity-70"
                />

                {/* Actions below Textarea */}
                {!showFeedback && (
                  <div className="flex justify-end gap-2.5 mt-3 relative">
                    {showFullSuggest && (
                      <div className="absolute bottom-full mb-3 right-0 w-80 bg-background text-foreground border-2 border-primary ring-4 ring-primary/20 rounded-xl p-4 z-50 animate-in fade-in zoom-in-95">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5 text-heading"><BookOpen className="w-3.5 h-3.5" /> Vocabulary Hints</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {allVocabSuggestions.slice(0, 8).map((v, i) => <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px]">{v}</Badge>)}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2 flex items-center gap-1.5 text-heading"><PenLine className="w-3.5 h-3.5" /> Grammar Hints</h4>
                            <ul className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-thin pr-1">
                              {allGrammarSuggestions.slice(0, 5).map((g, i) => (
                                <li key={i} className="text-[11px] font-medium bg-muted/50 p-2 rounded-lg border border-border/50">{g}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                    <Button
                      variant={showFullSuggest ? "edu" : "edu-outline"}
                      size="edu-sm"
                      onClick={() => setShowFullSuggest(!showFullSuggest)}
                      className={showFullSuggest ? "bg-primary/10 border-primary text-primary" : ""}
                    >
                      <Sparkles className="w-3.5 h-3.5 fill-current" /> Gợi ý
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      variant="edu"
                      size="edu-sm"
                    >
                      {isSubmitting ? <span className="animate-pulse">Analyzing...</span> : <>Submit to AI <Zap className="w-3.5 h-3.5 fill-current" /></>}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-2.5 pb-6">
                {exercise.sentences?.map((s, idx) => (
                  <div key={s.id} className="space-y-1.5 p-2.5 bg-muted/10 rounded-xl border border-border/50">
                    <div className="flex items-start gap-1.5">
                      <span className="w-4.5 h-4.5 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-[9px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs md:text-sm font-medium text-foreground leading-relaxed">{s.sourceText}</p>
                    </div>
                    <Textarea
                      value={sentenceAnswers[s.id] || ""}
                      onChange={(e) => {
                        if (!sentenceAnswers[s.id] && e.target.value) {
                          setSentenceStartTimes(prev => ({ ...prev, [s.id]: Date.now() }));
                        }
                        setSentenceAnswers({ ...sentenceAnswers, [s.id]: e.target.value });
                      }}
                      disabled={submittingSentences[s.id]}
                      placeholder="Translate this sentence into English..."
                      className="min-h-[50px] resize-y bg-background border border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary text-xs md:text-sm font-medium p-2.5 disabled:opacity-70"
                    />

                    {/* Sentence Action & Feedback */}
                    <div className="flex flex-col gap-1.5 relative">
                      {showSentenceSuggest[s.id] && (s.vocabularyHints?.length > 0 || s.grammarHints?.length > 0) && (
                        <div className="absolute bottom-full mb-3 right-0 w-72 bg-background text-foreground border-2 border-primary ring-4 ring-primary/20 rounded-xl p-3 z-50 animate-in fade-in zoom-in-95">
                          <div className="space-y-3">
                            {s.vocabularyHints && s.vocabularyHints.length > 0 && (
                              <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> Vocabulary</h4>
                                <div className="flex flex-wrap gap-1">
                                  {s.vocabularyHints.map((v, i) => <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0">{v}</Badge>)}
                                </div>
                              </div>
                            )}
                            {s.grammarHints && s.grammarHints.length > 0 && (
                              <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-pink-500 mb-1.5 flex items-center gap-1.5"><PenLine className="w-3 h-3" /> Grammar Structure</h4>
                                <ul className="space-y-1">
                                  {s.grammarHints.map((g, i) => (
                                    <li key={i} className="text-[10px] font-medium bg-muted/50 p-1.5 rounded-lg border border-border/50">{g}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-1.5">
                        <Button
                          variant={showSentenceSuggest[s.id] ? "edu" : "edu-outline"}
                          size="edu-sm"
                          onClick={() => setShowSentenceSuggest(prev => ({ ...prev, [s.id]: !prev[s.id] }))}
                          className={showSentenceSuggest[s.id] ? "bg-primary/10 border-primary text-primary" : ""}
                        >
                          <Sparkles className="w-3.5 h-3.5 fill-current" /> Gợi ý
                        </Button>
                        <Button
                          onClick={() => handleSentenceSubmit(s.id)}
                          disabled={submittingSentences[s.id]}
                          variant="edu"
                          size="edu-sm"
                        >
                          {submittingSentences[s.id] ? "Checking..." : <>Evaluate <Zap className="w-3.5 h-3.5 fill-current" /></>}
                        </Button>
                      </div>

                      {/* Indicator: câu đã được evaluate */}
                      {sentenceFeedbacks[s.id] && (
                        <button
                          onClick={() => setActiveFeedbackSentenceId(s.id)}
                          className={`w-full flex items-center gap-2 px-2 py-1 rounded-lg border text-left transition-all ${activeFeedbackSentenceId === s.id
                            ? "bg-primary/10 border-primary/30 text-primary"
                            : "bg-green-500/5 border-green-500/20 text-green-700 hover:bg-green-500/10"
                            }`}
                        >
                          <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                          <span className="text-[10px] font-semibold">
                            {activeFeedbackSentenceId === s.id ? "Viewing feedback" : `AI Score: ${sentenceFeedbacks[s.id].aiScore ?? "—"}/10 — View feedback`}
                          </span>
                          {sentenceFeedbacks[s.id].aiScore != null && (
                            <span className={`ml-auto text-[9px] font-black ${(sentenceFeedbacks[s.id].aiScore ?? 0) >= 8 ? "text-green-600" :
                              (sentenceFeedbacks[s.id].aiScore ?? 0) >= 5 ? "text-yellow-600" : "text-red-500"
                              }`}>{sentenceFeedbacks[s.id].aiScore}/10</span>
                          )}
                        </button>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Panel: AI Feedback */}
        <div className="w-full md:w-1/2 lg:w-[40%] bg-muted/10 overflow-y-auto p-3 md:p-4 scrollbar-thin relative">

          {/* ── SENTENCE MODE: hiển thị feedback câu được chọn ── */}
          {mode === "sentence" ? (() => {
            const fb = activeFeedbackSentenceId ? sentenceFeedbacks[activeFeedbackSentenceId] : null;
            const submitting = activeFeedbackSentenceId ? submittingSentences[activeFeedbackSentenceId] : false;

            if (submitting) {
              return (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-heading text-foreground">AI đang chấm điểm...</h3>
                    <p className="text-[11px] font-medium text-muted-foreground max-w-xs mx-auto mt-1">Vui lòng chờ trong giây lát.</p>
                  </div>
                </div>
              );
            }

            if (!fb) {
              return (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-2.5 p-4 opacity-75">
                  <ImageLogoWeb variant="mascot" className="w-16 h-16 mb-1 animate-pulse" />
                  <div>
                    <h3 className="text-sm font-bold text-heading text-foreground">AI Feedback</h3>
                    <p className="text-[11px] font-medium text-muted-foreground max-w-xs mx-auto mt-1 text-learning">
                      Ora đang sẵn sàng chấm điểm bài viết của bạn. Hãy nhấn <span className="font-bold text-primary">Evaluate</span> ở bất kỳ câu nào để Ora bắt đầu đánh giá nhé!
                    </p>
                  </div>
                </div>
              );
            }

            // Tìm số thứ tự của câu
            const sentenceIdx = exercise?.sentences?.findIndex(s => s.id === activeFeedbackSentenceId) ?? -1;
            const sentenceObj = exercise?.sentences?.[sentenceIdx];

            return (
              <div className="space-y-2.5 animate-in fade-in slide-in-from-right-4 duration-300">

                {/* Header: câu số mấy */}
                <div className="flex items-center gap-1.5">
                  <span className="w-5.5 h-5.5 rounded-md bg-primary/10 text-primary flex items-center justify-center font-black text-[9px] flex-shrink-0">
                    {sentenceIdx + 1}
                  </span>
                  <p className="text-[10px] font-medium text-muted-foreground leading-snug line-clamp-2">
                    {sentenceObj?.sourceText}
                  </p>
                </div>

                {/* Score Header */}
                <div className="card-edu p-2.5 bg-card border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">AI Score</p>
                        <p className="text-lg font-black text-heading text-foreground leading-none">
                          {fb.aiScore ?? "—"}
                          <span className="text-xs font-semibold text-muted-foreground ml-0.5">/10</span>
                        </p>
                      </div>
                    </div>
                    {fb.aiModel && (
                      <Badge variant="outline" className="text-[8px] px-1 py-0 text-muted-foreground border-border/60">
                        {fb.aiModel}
                      </Badge>
                    )}
                  </div>

                  {/* Sub-scores 3 cols */}
                  {(fb.grammarScore != null || fb.vocabularyScore != null || fb.fluencyScore != null) && (
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { label: "Grammar", value: fb.grammarScore, color: "text-pink-500", bg: "bg-pink-500/10" },
                        { label: "Vocab", value: fb.vocabularyScore, color: "text-purple-500", bg: "bg-purple-500/10" },
                        { label: "Fluency", value: fb.fluencyScore, color: "text-cyan-500", bg: "bg-cyan-500/10" },
                      ].map(({ label, value, color, bg }) => (
                        <div key={label} className={`${bg} rounded-lg p-1.5 text-center`}>
                          <p className={`text-[8px] font-bold uppercase tracking-wider ${color}`}>{label}</p>
                          <p className="text-xs font-black text-foreground">{value ?? "—"}</p>
                          <Progress value={value != null ? (value / 10) * 100 : 0} className="h-0.5 mt-0.5" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {fb.overallFeedback && (
                  <div className="card-edu p-2.5 bg-card flex gap-2 items-start">
                    <MessageSquare className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-[11px] font-medium text-foreground leading-relaxed">{fb.overallFeedback}</p>
                  </div>
                )}

                {fb.grammarFeedback && (
                  <div className="card-edu p-2.5 bg-card flex gap-2 items-start border-pink-500/20">
                    <PenLine className="w-3 h-3 text-pink-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-pink-500 mb-0.5">Grammar</p>
                      <p className="text-[11px] font-medium text-foreground leading-relaxed">{fb.grammarFeedback}</p>
                    </div>
                  </div>
                )}

                {fb.vocabularyFeedback && (
                  <div className="card-edu p-2.5 bg-card flex gap-2 items-start border-purple-500/20">
                    <BookOpen className="w-3 h-3 text-purple-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-purple-500 mb-0.5">Vocabulary</p>
                      <p className="text-[11px] font-medium text-foreground leading-relaxed">{fb.vocabularyFeedback}</p>
                    </div>
                  </div>
                )}

                {fb.corrections?.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" /> Corrections
                    </p>
                    {fb.corrections.map((c, ci) => (
                      <div key={ci} className="card-edu p-2 bg-card">
                        <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                          <span className="text-[11px] line-through text-destructive font-semibold">{c.word}</span>
                          <ArrowRight className="w-2.5 h-2.5 text-muted-foreground flex-shrink-0" />
                          <span className="text-[11px] font-black text-green-600">{c.correction}</span>
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-snug">{c.explanation}</p>
                      </div>
                    ))}
                  </div>
                )}

                {fb.suggestedAnswer && (
                  <div className="card-edu p-2.5 bg-primary/5 border-primary/20">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-1">
                      <Lightbulb className="w-2.5 h-2.5" /> Suggested Answer
                    </p>
                    <p className="text-[11px] font-semibold text-foreground italic leading-relaxed">{fb.suggestedAnswer}</p>
                  </div>
                )}

              </div>
            );
          })() : (

            /* ── FULL TEXT MODE ── */
            !showFeedback ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-2.5 p-4 opacity-75">
                {isSubmitting ? (
                  <>
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-heading text-foreground">AI đang chấm điểm...</h3>
                      <p className="text-[11px] font-medium text-muted-foreground max-w-xs mx-auto mt-1">Vui lòng chờ trong giây lát.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <ImageLogoWeb variant="mascot" className="w-16 h-16 mb-1 animate-pulse" />
                    <div>
                      <h3 className="text-sm font-bold text-heading text-foreground">AI Feedback</h3>
                      <p className="text-[11px] font-medium text-muted-foreground max-w-xs mx-auto mt-1 text-learning">
                        Ora đang đợi bài viết hoàn chỉnh từ bạn. Hãy dịch đầy đủ và nhấn nút Submit để Ora chấm điểm nhé!
                      </p>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="space-y-3.5 animate-in slide-in-from-bottom-4 duration-500 fade-in">

                {/* ── Header Score Ring ── */}
                {aggregatedFeedback && (
                  <div className="card-edu p-3 md:p-4 bg-card border-primary/25">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center relative bg-background shadow-md flex-shrink-0">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/20" />
                          <circle
                            cx="50" cy="50" r="44" fill="none" stroke="url(#scoreGrad)" strokeWidth="8"
                            strokeDasharray="276" strokeDashoffset={276 - (276 * scorePercentage) / 100}
                            className="transition-all duration-1000 ease-out" strokeLinecap="round"
                          />
                          <defs>
                            <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#6366f1" />
                              <stop offset="50%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                          </defs>
                        </svg>
                        <div className="flex flex-col items-center">
                          <span className="text-lg font-black text-heading text-foreground">{aggregatedFeedback.score}</span>
                          <span className="text-[7px] uppercase font-bold text-muted-foreground tracking-wider">Band</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 font-bold mb-1.5 text-[9px] px-2 py-0">
                          <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Evaluated
                        </Badge>
                        <p className="text-xs font-medium text-foreground leading-relaxed">{aggregatedFeedback.overallComment}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── 4 Score Dimensions ── */}
                {aggregatedFeedback && (
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Grammar", score: aggregatedFeedback.grammarScore, icon: PenLine, color: "text-pink-500", bg: "bg-pink-500/10" },
                      { label: "Vocabulary", score: aggregatedFeedback.vocabularyScore, icon: BookOpen, color: "text-purple-500", bg: "bg-purple-500/10" },
                      { label: "Fluency", score: aggregatedFeedback.coherenceScore, icon: TrendingUp, color: "text-cyan-500", bg: "bg-cyan-500/10" },
                      { label: "Accuracy", score: aggregatedFeedback.grammarScore, icon: Target, color: "text-indigo-500", bg: "bg-indigo-500/10" },
                    ].map(({ label, score, icon: Icon, color, bg }) => (
                      <div key={label} className="card-edu p-2.5 bg-card">
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <div className={`w-5 h-5 rounded-md ${bg} ${color} flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-3 h-3" />
                          </div>
                          <span className="text-[9px] font-bold text-foreground">{label}</span>
                          <span className={`ml-auto text-xs font-black ${color}`}>{score ?? "—"}</span>
                        </div>
                        <Progress value={score != null ? (Number(score) / 10) * 100 : 0} className="h-1" />
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Key Improvements ── */}
                <div className="space-y-1.5">
                  <h3 className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Lightbulb className="w-3 h-3 text-primary" /> Key Improvements
                  </h3>
                  <div className="card-edu p-3 bg-card">
                    <ul className="space-y-1.5">
                      {(aggregatedFeedback?.improvements || ["Review your grammar and vocabulary usage for better fluency."]).map((imp, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ChevronRight className="w-2.5 h-2.5" />
                          </div>
                          <p className="text-[10px] md:text-[11px] font-medium text-foreground leading-relaxed">{imp}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
}
