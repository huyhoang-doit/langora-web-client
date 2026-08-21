"use client";

import { Link } from "@/i18n/navigation";
import { ArrowLeft, CheckCircle2, Award, BookOpen, PenLine, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { writingService } from "@/services/writing.service";
import { WritingAiFeedback, WritingSession } from "@/types/writing";

export default function WritingFeedbackPage() {
  const params = useParams();
  const sessionId = params.sessionId as string;
  
  const [loading, setLoading] = useState(true);
  const [fullFeedback, setFullFeedback] = useState<WritingAiFeedback[] | null>(null);
  const [session, setSession] = useState<WritingSession | null>(null);

  useEffect(() => {
    const fetchFeedbacksAndSession = async () => {
      try {
        const [resFb, resSession] = await Promise.all([
          writingService.getAiFeedbacks(sessionId),
          writingService.getSessionById(sessionId)
        ]);
        if (resFb.success && resFb.data) {
          setFullFeedback(resFb.data);
        }
        if (resSession.success && resSession.data) {
          setSession(resSession.data);
        }
      } catch (error) {
        console.error("Failed to load feedbacks or session:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeedbacksAndSession();
  }, [sessionId]);

  const aggregatedFeedback = session ? {
    score: (session.totalScore || 0).toFixed(1),
    grammarScore: (session.grammarScore || 0).toFixed(1),
    vocabularyScore: (session.vocabularyScore || 0).toFixed(1),
    coherenceScore: (session.fluencyScore || 0).toFixed(1), // Mapping fluency to coherence for UI compatibility
    overallComment: "Overall feedback is calculated based on your performance in this session.",
    improvements: fullFeedback?.map(f => f.overallFeedback).filter((v, i, a) => v && a.indexOf(v) === i) || []
  } : null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-black text-foreground">AI is evaluating your work...</h2>
          <p className="text-sm text-muted-foreground mt-2">Checking grammar, vocabulary, and coherence.</p>
        </div>
      </div>
    );
  }

  const scorePercentage = aggregatedFeedback ? (Number(aggregatedFeedback.score) / 9) * 100 : 0; // Assuming IELTS scale of 9

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-feedback-page">
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 bg-background/80 backdrop-blur-xl border-b border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/writing">
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-black text-foreground text-heading">Evaluation Results</h2>
            <p className="text-xs text-muted-foreground font-semibold">AI Feedback & Scoring</p>
          </div>
        </div>
        <Link href="/writing">
          <Button size="sm" className="btn-edu px-4 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5 hidden sm:flex">
            Try Another Exercise
          </Button>
        </Link>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto space-y-8 pt-4">
          
          {/* Main Score Card */}
          <div className="card-edu p-6 bg-card relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border-primary/30">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <div className="w-32 h-32 rounded-full border border-primary/20 flex items-center justify-center relative bg-background shadow-xl">
                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                  <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="289" strokeDashoffset={289 - (289 * scorePercentage) / 100} className="text-primary transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-black text-foreground">{aggregatedFeedback?.score || 0}</span>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">Overall Band</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex-grow space-y-4 text-center md:text-left w-full">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 font-bold px-3 py-1">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                </Badge>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-bold px-3 py-1">
                  IELTS Academic
                </Badge>
              </div>
              <p className="text-base font-medium text-foreground leading-relaxed">
                {aggregatedFeedback?.overallComment || "No feedback available."}
              </p>
            </div>
          </div>

          {/* Detailed Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Grammar */}
            <div className="card-edu p-5 bg-card space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center">
                    <PenLine className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-foreground">Grammar</h3>
                </div>
                <span className="text-lg font-black">{aggregatedFeedback?.grammarScore || 0}</span>
              </div>
              <Progress value={((Number(aggregatedFeedback?.grammarScore) || 0) / 9) * 100} className="h-2 bg-muted" />
            </div>

            {/* Vocabulary */}
            <div className="card-edu p-5 bg-card space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-foreground">Vocabulary</h3>
                </div>
                <span className="text-lg font-black">{aggregatedFeedback?.vocabularyScore || 0}</span>
              </div>
              <Progress value={((Number(aggregatedFeedback?.vocabularyScore) || 0) / 9) * 100} className="h-2 bg-muted" />
            </div>

            {/* Coherence */}
            <div className="card-edu p-5 bg-card space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-foreground">Coherence</h3>
                </div>
                <span className="text-lg font-black">{aggregatedFeedback?.coherenceScore || 0}</span>
              </div>
              <Progress value={((Number(aggregatedFeedback?.coherenceScore) || 0) / 9) * 100} className="h-2 bg-muted" />
            </div>
          </div>

          {/* Actionable Improvements */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              Actionable Improvements
            </h3>
            <div className="card-edu p-5 bg-card">
              <ul className="space-y-4">
                {(aggregatedFeedback?.improvements || []).length > 0 ? aggregatedFeedback?.improvements.map((imp, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{imp}</p>
                  </li>
                )) : (
                  <li className="flex gap-4 items-start">
                    <p className="text-sm font-medium text-muted-foreground">No specific improvements to suggest.</p>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="pt-8 pb-12 sm:hidden">
            <Link href="/writing">
              <Button size="sm" className="btn-edu w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center">
                Try Another Exercise
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
