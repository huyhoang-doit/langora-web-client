"use client";

import { useState, useEffect } from "react";
import { Filter, Layers, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { writingService } from "@/services/writing.service";
import { UserService } from "@/services/user.service";
import { useLearningStore } from "@/stores/learning.store";
import { WritingTopic, WritingExercise, WritingContentType } from "@/types/writing";

import { TopicSelector } from "./_components/topic-selector";
import { ContentTypeSelector } from "./_components/content-type-selector";
import { ExerciseList } from "./_components/exercise-list";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

export default function WritingHubPage() {
  const t = useTranslations();
  const router = useRouter();

  // Master data
  const [topics, setTopics] = useState<WritingTopic[]>([]);
  const [contentTypes, setContentTypes] = useState<WritingContentType[]>([]);
  const [masterLoading, setMasterLoading] = useState(true);

  // Selection state
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [activeContentType, setActiveContentType] = useState<string | null>(null);
  const [targetLanguageId, setTargetLanguageId] = useState<string>("en");
  const [learningLevelId, setLearningLevelId] = useState<string | null>(null);
  // Exercises
  const [exercises, setExercises] = useState<WritingExercise[]>([]);
  const [exercisesLoading, setExercisesLoading] = useState(false);

  // 1. Initial Load: Fetch Topics & Content Types
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setMasterLoading(true);
        let langId = "en";
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

        if (!currentProfile || !currentProfile.targetLanguageId || !currentProfile.currentLevelId) {
          toast.error("Failed to load learning profile. Please select a language and level");
          router.push("/profile");
          return;
        }

        langId = currentProfile.targetLanguageId;
        setLearningLevelId(currentProfile.currentLevelId);
        setTargetLanguageId(langId);

        const [topicsRes, contentTypesRes] = await Promise.all([
          writingService.getTopics(langId),
          writingService.getContentTypes(langId)
        ]);

        if (topicsRes.success && topicsRes.data) {
          setTopics(topicsRes.data);
          if (topicsRes.data.length > 0) {
            setActiveTopic(topicsRes.data[0].id);
          }
        }
        if (contentTypesRes.success && contentTypesRes.data) {
          setContentTypes(contentTypesRes.data);
          if (contentTypesRes.data.length > 0) {
            setActiveContentType(contentTypesRes.data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to load writing master data:", error);
      } finally {
        setMasterLoading(false);
      }
    };

    fetchMasterData();
  }, []);

  // 2. Fetch Exercises when both selections are present
  useEffect(() => {
    const fetchExercises = async () => {
      if (!activeTopic || !activeContentType) {
        setExercises([]);
        return;
      }

      if (!learningLevelId) {
        setExercises([]);
        return;
      }

      try {
        setExercisesLoading(true);
        const res = await writingService.getExercises(targetLanguageId, learningLevelId, activeTopic, activeContentType,);
        if (res.success && res.data) {
          setExercises(res.data);
        } else {
          setExercises([]);
        }
      } catch (error) {
        console.error("Failed to load exercises:", error);
        setExercises([]);
      } finally {
        setExercisesLoading(false);
      }
    };

    fetchExercises();
  }, [activeTopic, activeContentType]);

  const hasSelection = activeTopic !== null && activeContentType !== null;

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

          {masterLoading ? (
            <div className="space-y-6">
              <div className="h-20 bg-muted/50 rounded-2xl animate-pulse"></div>
              <div className="h-20 bg-muted/50 rounded-2xl animate-pulse"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Topics Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Filter className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">1. Select a Topic</h3>
                </div>
                <TopicSelector
                  topics={topics}
                  activeTopic={activeTopic}
                  onSelect={setActiveTopic}
                />
              </div>

              {/* Content Type Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Layers className="w-4 h-4" />
                  <h3 className="text-sm font-bold uppercase tracking-wider">2. Select Content Type</h3>
                </div>
                <ContentTypeSelector
                  contentTypes={contentTypes}
                  activeContentType={activeContentType}
                  onSelect={setActiveContentType}
                />
              </div>
            </div>
          )}

          {/* Exercises Grid */}
          <div className="space-y-4 pt-4 border-t-2 border-border/50">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Available Exercises
            </h3>

            <ExerciseList
              exercises={exercises}
              loading={exercisesLoading}
              hasSelection={hasSelection}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
