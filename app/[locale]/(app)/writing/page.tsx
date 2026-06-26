"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { BookOpen, PenLine, BarChart, Mail, Clock, FileText, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { writingService } from "@/services/writing.service";
import { UserService } from "@/services/user.service";
import { WritingTopic, WritingExercise } from "@/types/writing";

export default function WritingHubPage() {
  const t = useTranslations();
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [topics, setTopics] = useState<WritingTopic[]>([]);
  const [exercises, setExercises] = useState<WritingExercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch user learning profile to get targetLanguageId
        let langId = "en"; // Default fallback
        const profileRes = await UserService.getLearningProfile();
        if (profileRes.success && profileRes.data && profileRes.data.targetLanguageId) {
          langId = profileRes.data.targetLanguageId;
        }

        // 2. Fetch topics & exercises
        const [topicsRes, exercisesRes] = await Promise.all([
          writingService.getTopics(langId),
          writingService.getExercises()
        ]);
        
        if (topicsRes.success && topicsRes.data) {
          setTopics(topicsRes.data);
        }
        if (exercisesRes.success && exercisesRes.data) {
          setExercises(exercisesRes.data);
        }
      } catch (error) {
        console.error("Failed to load writing data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const filteredExercises = activeTopic 
    ? exercises.filter(ex => ex.topicId === activeTopic)
    : exercises;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "BarChart": return <BarChart className="w-4 h-4" />;
      case "PenLine": return <PenLine className="w-4 h-4" />;
      case "Mail": return <Mail className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="writing-hub-page">
      {/* Header */}
      <header className="flex justify-between items-center px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Writing Practice</h2>
          <p className="text-xs text-muted-foreground font-semibold">Select an exercise to start writing and get AI feedback</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-5xl mx-auto space-y-8">
          
          {/* Topics Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Filter by Topic</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={activeTopic === null ? "default" : "outline"}
                className={`rounded-xl border-2 font-bold ${activeTopic === null ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-card text-foreground"}`}
                onClick={() => setActiveTopic(null)}
              >
                All Topics
              </Button>
              {topics.map(topic => (
                <Button 
                  key={topic.id}
                  variant={activeTopic === topic.id ? "default" : "outline"}
                  className={`rounded-xl border-2 font-bold flex items-center gap-2 ${activeTopic === topic.id ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-card text-foreground"}`}
                  onClick={() => setActiveTopic(topic.id)}
                >
                  {getIcon(topic.imageUrl)} {topic.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Exercises Grid */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Available Exercises
            </h3>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="card-edu p-6 h-48 flex flex-col justify-between animate-pulse bg-card">
                    <div className="space-y-4">
                      <div className="h-6 w-3/4 bg-muted rounded"></div>
                      <div className="h-4 w-full bg-muted rounded"></div>
                      <div className="h-4 w-2/3 bg-muted rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredExercises.length === 0 ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="font-bold">No exercises found for this topic.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((ex) => (
                  <div key={ex.id} className="card-edu card-edu-interactive p-6 bg-card flex flex-col h-full relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    
                    <div className="flex-grow space-y-4 relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <Badge variant="outline" className="bg-background border-2 font-bold uppercase tracking-wider text-[10px]">
                          {ex.levelId}
                        </Badge>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-black text-foreground text-heading line-clamp-1 group-hover:text-primary transition-colors">{ex.title}</h4>
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2 font-medium">{ex.description}</p>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground bg-muted/30 p-2 rounded-lg border border-border/50">
                        {ex.timeLimitMinutes && (
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span>{ex.timeLimitMinutes} min</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-primary" />
                          <span>{ex.wordCountTarget} words</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 relative z-10">
                      <Link href={`/writing/${ex.id}`} className="block w-full">
                        <Button className="btn-edu w-full h-10 text-sm border-2 bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
                          View Details <ChevronRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
