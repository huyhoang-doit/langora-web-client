"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import Link from "next/link";
import { 
  ArrowLeft, FileText, LayoutList, Play, Save, CheckCircle2, Clock, Zap, BookOpen, PenLine, Award, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MOCK_WRITING_EXERCISES, getMockAiFeedback } from "@/lib/mock-data/writing";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function WritingSessionPage() {
  const params = useParams();
  const router = useRouter();
  const sessionId = params.sessionId as string;
  const exerciseId = sessionId.replace("-session", "");
  
  const exercise = MOCK_WRITING_EXERCISES.find(e => e.id === exerciseId);
  
  const [mode, setMode] = useState<"full" | "sentence">("full");
  const [fullText, setFullText] = useState("");
  const [sentenceAnswers, setSentenceAnswers] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  
  // Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const feedback = getMockAiFeedback();
  
  // Timer mock
  const [timeLeft, setTimeLeft] = useState((exercise?.timeLimitMinutes || 20) * 60);

  useEffect(() => {
    if (showFeedback) return; // Stop timer if submitted
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showFeedback]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Draft saved automatically.");
    }, 1000);
  };

  const handleSubmit = () => {
    if (mode === "full" && fullText.trim().length < 10) {
      toast.error("Please write something before submitting.");
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowFeedback(true);
      toast.success("AI has finished evaluating your work!");
    }, 2000);
  };

  if (!exercise) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-xl font-bold text-destructive">Session Not Found</h2>
        <Link href="/writing"><Button className="mt-4">Back to Hub</Button></Link>
      </div>
    );
  }

  const wordCount = mode === "full" 
    ? fullText.trim().split(/\s+/).filter(w => w.length > 0).length
    : Object.values(sentenceAnswers).join(" ").trim().split(/\s+/).filter(w => w.length > 0).length;

  const scorePercentage = (feedback.score / 9) * 100;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-background" id="writing-session-page">
      {/* Header */}
      <header className="flex justify-between items-center px-4 md:px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 flex-shrink-0">
        <div className="flex items-center gap-4">
          <Link href={`/writing/${exerciseId}`}>
            <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="hidden md:block">
            <h2 className="text-lg font-black text-foreground text-heading">{exercise.title}</h2>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-0.5">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-primary" /> {formatTime(timeLeft)} left</span>
              <span className="flex items-center gap-1"><FileText className="w-3 h-3 text-primary" /> {wordCount} / {exercise.wordCountTarget} words</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-muted p-1 rounded-xl flex">
            <button 
              onClick={() => setMode("full")}
              disabled={showFeedback}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${mode === "full" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"} disabled:opacity-50`}
            >
              <FileText className="w-3.5 h-3.5" /> Full Text
            </button>
            <button 
              onClick={() => setMode("sentence")}
              disabled={showFeedback}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${mode === "sentence" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"} disabled:opacity-50`}
            >
              <LayoutList className="w-3.5 h-3.5" /> By Sentence
            </button>
          </div>
          {!showFeedback && (
            <>
              <Button onClick={handleSave} disabled={isSaving} variant="outline" size="icon" className="btn-edu w-9 h-9 border-2 hidden sm:flex">
                <Save className={`w-4 h-4 ${isSaving ? "animate-pulse text-primary" : ""}`} />
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting} className="btn-edu h-9 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5">
                {isSubmitting ? <span className="animate-pulse">Analyzing...</span> : <>Submit to AI <Zap className="w-3.5 h-3.5 fill-current" /></>}
              </Button>
            </>
          )}
          {showFeedback && (
            <Link href="/writing">
              <Button variant="outline" className="btn-edu h-9 px-4 text-xs border-2 flex items-center gap-1.5">
                Finish <CheckCircle2 className="w-3.5 h-3.5" />
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Workspace */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel: Editor Area */}
        <div className="w-full md:w-1/2 lg:w-[60%] border-r-2 border-border/60 bg-background overflow-y-auto p-6 scrollbar-thin flex flex-col relative">
          
          {/* Prompt Area at the Top */}
          <div className="mb-6 card-edu p-5 bg-muted/20 border-2 border-border/50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Context / Yêu cầu
            </h3>
            <p className="text-sm font-medium text-foreground leading-relaxed mb-4">{exercise.description}</p>
            
            {mode === "full" && (
              <div className="p-4 bg-background rounded-lg border border-border mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Đoạn tiếng Việt cần dịch:</h4>
                <p className="text-sm font-medium text-foreground leading-relaxed">
                  {exercise.sentences.map(s => s.content).join(" ")}
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
                  className="flex-grow min-h-[300px] resize-none bg-background border-2 border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary text-base leading-relaxed font-medium p-4 disabled:opacity-70"
                />
              </div>
            ) : (
              <div className="space-y-6 pb-12">
                {exercise.sentences.map((s, idx) => (
                  <div key={s.id} className="space-y-3 p-4 bg-muted/10 rounded-xl border border-border/50">
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium text-foreground">{s.content}</p>
                    </div>
                    <Textarea 
                      value={sentenceAnswers[s.id] || ""}
                      onChange={(e) => setSentenceAnswers({...sentenceAnswers, [s.id]: e.target.value})}
                      disabled={showFeedback || isSubmitting}
                      placeholder="Translate this sentence into English..."
                      className="min-h-[80px] resize-y bg-background border-2 border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary text-base font-medium p-3 disabled:opacity-70"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submitting Overlay */}
          {isSubmitting && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
              <h3 className="text-lg font-black text-foreground">AI is evaluating...</h3>
              <p className="text-sm text-muted-foreground mt-1">Please wait a moment.</p>
            </div>
          )}

        </div>

        {/* Right Panel: AI Feedback Area */}
        <div className="w-full md:w-1/2 lg:w-[40%] bg-muted/10 overflow-y-auto p-6 scrollbar-thin relative">
          
          {!showFeedback ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
              <Zap className="w-16 h-16 text-muted-foreground" />
              <div>
                <h3 className="text-lg font-black text-foreground">AI Feedback Analysis</h3>
                <p className="text-sm font-medium text-muted-foreground max-w-xs mx-auto mt-2">
                  Complete your translation and submit to see AI feedback, grammar corrections, and scoring here.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
              {/* Header Score */}
              <div className="card-edu p-6 bg-card border-primary/30 flex items-center gap-6">
                <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center relative bg-background shadow-lg flex-shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="289" strokeDashoffset={289 - (289 * scorePercentage) / 100} className="text-primary transition-all duration-1000 ease-out" strokeLinecap="round" />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-foreground">{feedback.score}</span>
                    <span className="text-[8px] uppercase font-bold text-muted-foreground tracking-wider">Band</span>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 font-bold mb-2">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Evaluated
                  </Badge>
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    {feedback.overallComment}
                  </p>
                </div>
              </div>

              {/* Detail Scores */}
              <div className="grid grid-cols-1 gap-4">
                <div className="card-edu p-4 bg-card flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center flex-shrink-0">
                    <PenLine className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-foreground">Grammar</span>
                      <span className="text-sm font-black">{feedback.grammarScore}</span>
                    </div>
                    <Progress value={(feedback.grammarScore / 9) * 100} className="h-1.5" />
                  </div>
                </div>

                <div className="card-edu p-4 bg-card flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-foreground">Vocabulary</span>
                      <span className="text-sm font-black">{feedback.vocabularyScore}</span>
                    </div>
                    <Progress value={(feedback.vocabularyScore / 9) * 100} className="h-1.5" />
                  </div>
                </div>

                <div className="card-edu p-4 bg-card flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-foreground">Coherence</span>
                      <span className="text-sm font-black">{feedback.coherenceScore}</span>
                    </div>
                    <Progress value={(feedback.coherenceScore / 9) * 100} className="h-1.5" />
                  </div>
                </div>
              </div>

              {/* Improvements */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-primary" /> Key Improvements
                </h3>
                <div className="card-edu p-5 bg-card">
                  <ul className="space-y-3">
                    {feedback.improvements.map((imp, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ChevronRight className="w-3 h-3" />
                        </div>
                        <p className="text-xs font-medium text-foreground">{imp}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
