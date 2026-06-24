"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import Link from "next/link";
import { 
  ArrowLeft, FileText, LayoutList, Play, Save, CheckCircle2, Clock, Zap, BookOpen, PenLine, Award, ChevronRight, Sparkles
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
  const [submittingSentences, setSubmittingSentences] = useState<Record<string, boolean>>({});
  const [sentenceFeedbacks, setSentenceFeedbacks] = useState<Record<string, { score: number; comment: string; }>>({});
  const [showFullSuggest, setShowFullSuggest] = useState(false);
  const [showSentenceSuggest, setShowSentenceSuggest] = useState<Record<string, boolean>>({});
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

  const handleSentenceSubmit = (id: string) => {
    if (!sentenceAnswers[id] || sentenceAnswers[id].trim().length < 5) {
      toast.error("Please provide a valid translation first.");
      return;
    }
    
    setSubmittingSentences(prev => ({...prev, [id]: true}));
    setShowSentenceSuggest(prev => ({...prev, [id]: false})); // hide suggestions on submit
    setTimeout(() => {
      setSubmittingSentences(prev => ({...prev, [id]: false}));
      setSentenceFeedbacks(prev => ({
        ...prev, 
        [id]: { 
          score: 8.5, 
          comment: "Good translation! You could also use 'Due to health issues' to sound more native." 
        }
      }));
      toast.success("Sentence evaluated!");
    }, 1200);
  };

  const allVocabSuggestions = exercise?.sentences.flatMap(s => s.suggestions?.vocab || []) || [];
  const allGrammarSuggestions = exercise?.sentences.flatMap(s => s.suggestions?.grammar || []) || [];

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
        <div className="w-full md:w-1/2 lg:w-[60%] border-r-2 border-border/60 bg-background overflow-y-auto p-4 md:p-5 scrollbar-thin flex flex-col relative">
          
          {/* Prompt Area at the Top */}
          <div className="mb-4 card-edu p-4 bg-muted/20 border-2 border-border/50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Context / Yêu cầu
            </h3>
            <p className="text-sm font-medium text-foreground leading-relaxed mb-3">{exercise.description}</p>
            
            {mode === "full" && (
              <div className="p-3 bg-background rounded-lg border border-border mt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">Đoạn tiếng Việt cần dịch:</h4>
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
                
                {/* Actions below Textarea */}
                {!showFeedback && (
                  <div className="flex justify-end gap-3 mt-4 relative">
                    {showFullSuggest && (
                      <div className="absolute bottom-full mb-3 right-0 w-80 bg-background text-foreground border-2 border-primary ring-4 ring-primary/20 rounded-xl p-4 z-50 animate-in fade-in zoom-in-95">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Vocabulary Hints</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {allVocabSuggestions.slice(0, 8).map((v, i) => <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[10px]">{v}</Badge>)}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-500 mb-2 flex items-center gap-1.5"><PenLine className="w-3.5 h-3.5" /> Grammar Hints</h4>
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
                      variant="outline" 
                      onClick={() => setShowFullSuggest(!showFullSuggest)}
                      className={`btn-edu h-10 px-6 text-sm border-2 flex items-center gap-2 ${showFullSuggest ? "bg-primary/10 border-primary text-primary" : "text-primary hover:bg-primary/10"}`}
                    >
                      <Sparkles className="w-4 h-4 fill-current" /> Gợi ý
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting} 
                      className="btn-edu h-10 px-6 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2"
                    >
                      {isSubmitting ? <span className="animate-pulse">Analyzing...</span> : <>Submit to AI <Zap className="w-4 h-4 fill-current" /></>}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 pb-8">
                {exercise.sentences.map((s, idx) => (
                  <div key={s.id} className="space-y-2 p-3 bg-muted/10 rounded-xl border border-border/50">
                    <div className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium text-foreground leading-relaxed">{s.content}</p>
                    </div>
                    <Textarea 
                      value={sentenceAnswers[s.id] || ""}
                      onChange={(e) => setSentenceAnswers({...sentenceAnswers, [s.id]: e.target.value})}
                      disabled={submittingSentences[s.id]}
                      placeholder="Translate this sentence into English..."
                      className="min-h-[60px] resize-y bg-background border-2 border-border rounded-xl focus-visible:ring-1 focus-visible:ring-primary text-base font-medium p-3 disabled:opacity-70"
                    />
                    
                    {/* Sentence Action & Feedback */}
                    <div className="flex flex-col gap-2 relative">
                      {showSentenceSuggest[s.id] && s.suggestions && (
                        <div className="absolute bottom-full mb-3 right-0 w-72 bg-background text-foreground border-2 border-primary ring-4 ring-primary/20 rounded-xl p-3 z-50 animate-in fade-in zoom-in-95">
                          <div className="space-y-3">
                            {s.suggestions.vocab && s.suggestions.vocab.length > 0 && (
                              <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1.5 flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> Vocabulary</h4>
                                <div className="flex flex-wrap gap-1">
                                  {s.suggestions.vocab.map((v, i) => <Badge key={i} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0">{v}</Badge>)}
                                </div>
                              </div>
                            )}
                            {s.suggestions.grammar && s.suggestions.grammar.length > 0 && (
                              <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-wider text-pink-500 mb-1.5 flex items-center gap-1.5"><PenLine className="w-3 h-3" /> Grammar Structure</h4>
                                <ul className="space-y-1">
                                  {s.suggestions.grammar.map((g, i) => (
                                    <li key={i} className="text-[10px] font-medium bg-muted/50 p-1.5 rounded-lg border border-border/50">{g}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline"
                          onClick={() => setShowSentenceSuggest(prev => ({...prev, [s.id]: !prev[s.id]}))}
                          className={`btn-edu h-8 px-3 text-xs border-2 flex items-center gap-1.5 ${showSentenceSuggest[s.id] ? "bg-primary/10 border-primary text-primary" : "text-primary hover:bg-primary/10"}`}
                        >
                          <Sparkles className="w-3 h-3 fill-current" /> Gợi ý
                        </Button>
                        <Button 
                          onClick={() => handleSentenceSubmit(s.id)}
                          disabled={submittingSentences[s.id]}
                          className="btn-edu h-8 px-4 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-1.5"
                        >
                          {submittingSentences[s.id] ? "Checking..." : <>Evaluate <Zap className="w-3 h-3 fill-current" /></>}
                        </Button>
                      </div>

                      {sentenceFeedbacks[s.id] && (
                        <div className="p-2.5 bg-green-500/10 border border-green-500/20 rounded-lg animate-in fade-in zoom-in-95">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-xs font-bold text-green-700">Band: {sentenceFeedbacks[s.id].score}</span>
                          </div>
                          <p className="text-xs text-green-800 font-medium">
                            {sentenceFeedbacks[s.id].comment}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Panel: AI Feedback Area */}
        <div className="w-full md:w-1/2 lg:w-[40%] bg-muted/10 overflow-y-auto p-4 md:p-5 scrollbar-thin relative">
          
          {!showFeedback ? (
            <div className={`h-full flex flex-col items-center justify-center text-center space-y-3 transition-opacity ${isSubmitting ? 'opacity-100' : 'opacity-50'}`}>
              {isSubmitting ? (
                <>
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-2"></div>
                  <div>
                    <h3 className="text-base font-black text-foreground">AI is evaluating...</h3>
                    <p className="text-xs font-medium text-muted-foreground max-w-xs mx-auto mt-1">
                      Please wait a moment while AI analyzes your translation.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Zap className="w-12 h-12 text-muted-foreground" />
                  <div>
                    <h3 className="text-base font-black text-foreground">AI Feedback Analysis</h3>
                    <p className="text-xs font-medium text-muted-foreground max-w-xs mx-auto mt-1">
                      Complete your translation and submit to see AI feedback, grammar corrections, and scoring here.
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500 fade-in">
              {/* Header Score */}
              <div className="card-edu p-4 md:p-5 bg-card border-primary/30 flex items-center gap-4 md:gap-5">
                <div className="w-20 h-20 rounded-full border-4 border-primary/20 flex items-center justify-center relative bg-background shadow-lg flex-shrink-0">
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
                    <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="289" strokeDashoffset={289 - (289 * scorePercentage) / 100} className="text-primary transition-all duration-1000 ease-out" strokeLinecap="round" />
                  </svg>
                  <div className="flex flex-col items-center">
                    <span className="text-xl font-black text-foreground">{feedback.score}</span>
                    <span className="text-[7px] uppercase font-bold text-muted-foreground tracking-wider">Band</span>
                  </div>
                </div>
                <div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 font-bold mb-1.5 text-[10px] px-2 py-0">
                    <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Evaluated
                  </Badge>
                  <p className="text-xs font-medium text-foreground leading-relaxed">
                    {feedback.overallComment}
                  </p>
                </div>
              </div>

              {/* Detail Scores */}
              <div className="grid grid-cols-1 gap-3">
                <div className="card-edu p-3 md:p-4 bg-card flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 rounded-md bg-pink-500/10 text-pink-500 flex items-center justify-center flex-shrink-0">
                    <PenLine className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-foreground">Grammar</span>
                      <span className="text-xs font-black">{feedback.grammarScore}</span>
                    </div>
                    <Progress value={(feedback.grammarScore / 9) * 100} className="h-1.5" />
                  </div>
                </div>

                <div className="card-edu p-3 md:p-4 bg-card flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 rounded-md bg-purple-500/10 text-purple-500 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-foreground">Vocabulary</span>
                      <span className="text-xs font-black">{feedback.vocabularyScore}</span>
                    </div>
                    <Progress value={(feedback.vocabularyScore / 9) * 100} className="h-1.5" />
                  </div>
                </div>

                <div className="card-edu p-3 md:p-4 bg-card flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 rounded-md bg-cyan-500/10 text-cyan-500 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs font-bold text-foreground">Coherence</span>
                      <span className="text-xs font-black">{feedback.coherenceScore}</span>
                    </div>
                    <Progress value={(feedback.coherenceScore / 9) * 100} className="h-1.5" />
                  </div>
                </div>
              </div>

              {/* Improvements */}
              <div className="space-y-2.5">
                <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-primary" /> Key Improvements
                </h3>
                <div className="card-edu p-3 md:p-4 bg-card">
                  <ul className="space-y-2">
                    {feedback.improvements.map((imp, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <ChevronRight className="w-2.5 h-2.5" />
                        </div>
                        <p className="text-[11px] font-medium text-foreground">{imp}</p>
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
