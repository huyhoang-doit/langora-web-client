"use client";

import Link from "next/link";
import { ArrowLeft, Save, Globe, Target, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { UserService } from "@/services/user.service";
import { learningService } from "@/services/learning.service";
import { UserLearningProfile } from "@/types/user";
import { Language, Level } from "@/types/learning";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LearningPreferencesPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserLearningProfile | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelsLoading, setLevelsLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Form State
  const [targetLanguageId, setTargetLanguageId] = useState("");
  const [currentLevelId, setCurrentLevelId] = useState("");
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState("20");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, languagesRes] = await Promise.all([
          UserService.getLearningProfile(),
          learningService.getLanguages()
        ]);
        
        if (languagesRes.success && languagesRes.data) {
          setLanguages(languagesRes.data);
        }
        
        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
          if (profileRes.data.targetLanguageId) setTargetLanguageId(profileRes.data.targetLanguageId);
          if (profileRes.data.currentLevelId) setCurrentLevelId(profileRes.data.currentLevelId);
          if (profileRes.data.dailyGoalMinutes) setDailyGoalMinutes(profileRes.data.dailyGoalMinutes.toString());
        }
      } catch (error) {
        console.error("Failed to load learning profile", error);
        toast.error("Failed to load preferences");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchLevels = async () => {
      if (!targetLanguageId) {
        setLevels([]);
        return;
      }
      try {
        setLevelsLoading(true);
        const levelsRes = await learningService.getLevels(targetLanguageId);
        if (levelsRes.success && levelsRes.data) {
          setLevels(levelsRes.data);
        }
      } catch (error) {
        console.error("Failed to load levels", error);
      } finally {
        setLevelsLoading(false);
      }
    };

    fetchLevels();
  }, [targetLanguageId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await UserService.updateLearningProfile({
        targetLanguageId,
        currentLevelId,
        dailyGoalMinutes: Number(dailyGoalMinutes)
      });
      if (res.success) {
        toast.success("Learning preferences saved successfully!");
        router.push("/profile");
      }
    } catch (error) {
      console.error("Failed to save preferences", error);
      toast.error("Failed to save preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-background" id="learning-preferences-page">
      {/* Header */}
      <header className="flex items-center gap-4 px-6 h-16 bg-background/80 backdrop-blur-xl border-b-2 border-border/60 sticky top-0 z-30 flex-shrink-0">
        <Link href="/profile">
          <Button variant="ghost" size="icon" className="btn-edu w-9 h-9 border-2 border-border bg-transparent text-foreground hover:bg-muted flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-black text-foreground text-heading">Learning Preferences</h2>
          <p className="text-xs text-muted-foreground font-semibold">Adjust target languages and daily study goals</p>
        </div>
      </header>

      {/* Content */}
      <div className="flex-grow overflow-y-auto p-6 scrollbar-thin">
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSave}>
              {/* Target Language Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 flex items-center gap-1.5 text-heading">
                  <Globe className="w-4 h-4 text-primary" /> Target Language
                </label>
                <Select 
                  value={targetLanguageId} 
                  onValueChange={(val) => {
                    setTargetLanguageId(val);
                    setCurrentLevelId(""); // Reset level when language changes
                  }}
                >
                  <SelectTrigger className="w-full bg-muted/30 border-2 border-border rounded-xl px-6 h-12 text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-bold text-heading">
                    <SelectValue placeholder="Select Target Language" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-border rounded-xl shadow-lg">
                    {languages.map(lang => (
                      <SelectItem key={lang.id} value={lang.id} className="py-3 pl-6 pr-10 text-sm font-bold cursor-pointer">
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Current Level Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 flex items-center gap-1.5 text-heading">
                  <GraduationCap className="w-4 h-4 text-primary" /> Current Level
                </label>
                <Select 
                  value={currentLevelId} 
                  onValueChange={setCurrentLevelId} 
                  disabled={!targetLanguageId || levelsLoading}
                >
                  <SelectTrigger className="w-full bg-muted/30 border-2 border-border rounded-xl px-6 h-12 text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-bold text-heading">
                    <SelectValue placeholder={levelsLoading ? "Loading levels..." : "Select Current Level"} />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-border rounded-xl shadow-lg">
                    {levels.map(level => (
                      <SelectItem key={level.id} value={level.id} className="py-3 pl-6 pr-10 text-sm font-bold cursor-pointer">
                        {level.name} ({level.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Daily Goal Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-black text-muted-foreground block uppercase tracking-widest ml-1 flex items-center gap-1.5 text-heading">
                  <Target className="w-4 h-4 text-primary" /> Daily Study Target
                </label>
                <Select value={dailyGoalMinutes} onValueChange={setDailyGoalMinutes}>
                  <SelectTrigger className="w-full bg-muted/30 border-2 border-border rounded-xl px-6 h-12 text-foreground focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm font-bold text-heading">
                    <SelectValue placeholder="Select Daily Goal" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-border rounded-xl shadow-lg">
                    <SelectItem value="5" className="py-3 pl-6 pr-10 text-sm font-bold cursor-pointer">Casual (5 mins / day)</SelectItem>
                    <SelectItem value="10" className="py-3 pl-6 pr-10 text-sm font-bold cursor-pointer">Regular (10 mins / day)</SelectItem>
                    <SelectItem value="20" className="py-3 pl-6 pr-10 text-sm font-bold cursor-pointer">Serious (20 mins / day)</SelectItem>
                    <SelectItem value="30" className="py-3 pl-6 pr-10 text-sm font-bold cursor-pointer">Intense (30 mins / day)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end pt-2">
                <Button 
                  type="submit" 
                  disabled={saving || !targetLanguageId || !currentLevelId}
                  className="btn-edu h-10 px-5 text-xs border-2 bg-primary text-primary-foreground hover:bg-primary/95 gap-1.5"
                >
                  {saving ? "Saving..." : "Save Preferences"} {!saving && <Save className="w-4 h-4" />}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
