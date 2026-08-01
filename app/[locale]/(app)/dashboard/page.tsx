"use client";

import Link from "next/link";
import {
  BookOpen,
  Flame,
  PenLine,
  Timer,
  Sparkles,
  Globe,
  TrendingUp,
  ArrowRight,
  Bell,
  BookMarked,
  Bot,
  Search,
  CheckCircle,
  Trophy,
  Award,
  Zap,
  Heart,
  ChevronRight,
  Rocket,
  RefreshCw,
  Lock,
  BarChart2,
  User,
  LogOut
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ImageLogoWeb } from "@/components/image-logo-web";
import { useAuthStore } from "@/stores/auth.store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { CustomizeAlert } from "@/components/customize/customize-alert";
import { toast } from "sonner";

export default function DashboardPage() {
  const t = useTranslations();
  const stats = [
    { label: t("stats.words_mastered"), value: "1,250", icon: BookOpen, color: "text-indigo-500" },
    { label: t("stats.daily_streak"), value: "15 Days", icon: Flame, color: "text-amber-500" },
    { label: t("stats.writing_band"), value: "8.5", icon: PenLine, color: "text-pink-500" },
    { label: t("stats.study_time"), value: "12h 30m", icon: Timer, color: "text-cyan-500" },
  ];
  const { user, clearAuth } = useAuthStore();
  const userName = user?.displayName || user?.fullName || "Student";
  const userInitials = userName.substring(0, 2).toUpperCase();
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-full overflow-hidden bg-background font-sans" id="langora-dashboard">
        {/* Top Bar */}
        <header className="flex justify-between items-center w-full px-8 h-20 bg-background/80 backdrop-blur-xl border-b-2 border-border sticky top-0 z-30 flex-shrink-0">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-xl font-black text-foreground tracking-tight">Langora Workspace</h2>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Target: English B2</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r-2 pr-4 border-border">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full">
                <BookMarked className="w-5 h-5" />
              </Button>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer group">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold group-hover:text-primary transition-colors">{userName}</p>
                    <p className="text-[9px] text-primary font-bold uppercase tracking-widest">
                      {user?.roles?.includes("PRO") ? "Pro Member" : "Free Member"}
                    </p>
                  </div>
                  <Avatar className="h-10 w-10 border-2 border-border group-hover:border-primary transition-all">
                    <AvatarImage src={user?.avatarUrl} alt={userName} className="object-cover" />
                    <AvatarFallback className="bg-muted text-foreground font-bold">{userInitials}</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 mt-2 rounded-xl border-2 border-border shadow-md font-sans">
                <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-primary/10 focus:text-primary">
                  <Link href="/profile" className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border/60" />
                <DropdownMenuItem
                  onSelect={() => setLogoutOpen(true)}
                  className="cursor-pointer font-bold text-destructive focus:bg-destructive/10 focus:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Grid Content */}
        <div className="flex-grow overflow-y-auto p-8 scrollbar-thin space-y-8">
          <div className="max-w-6xl mx-auto space-y-8">

            {/* 1. Welcome Hero (Linear + Headspace vibe) */}
            <div className="relative overflow-hidden rounded-[24px] border-2 border-indigo-500/20 bg-gradient-to-r from-indigo-500/10 via-blue-500/5 to-transparent p-8 md:p-10 group">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-indigo-500/15 border-2 border-indigo-500/30 px-3 py-1 rounded-full text-indigo-500 text-[10px] font-bold uppercase tracking-widest">
                    <Sparkles className="w-3 h-3" /> Learning Path Active
                  </div>
                  <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                    Welcome back, <span className="text-indigo-500">{userName}</span>!
                  </h1>
                  <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
                    Ora has optimized your modules for today. You are <span className="text-indigo-500 font-bold">85%</span> of the way to completing your daily milestone. Continue now to secure your streak!
                  </p>
                </div>
                <Link href="/learn/lesson/3">
                  <Button className="btn-edu text-indigo-600 hover:text-indigo-700 bg-white hover:bg-white/95 border-2 shadow-[0_4px_0_currentColor] active:translate-y-0.5 active:shadow-[0_0px_0_currentColor] text-sm font-bold flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" /> Continue Journey
                  </Button>
                </Link>
              </div>
              {/* Background Mascot Illustration */}
              <div className="absolute right-50 bottom-[-100px] opacity-30 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none">
                <span className="text-[120px] select-none">
                  <ImageLogoWeb variant="mascot" className="w-80 h-80" />
                </span>
              </div>
            </div>

            {/* Core Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((st) => {
                const Icon = st.icon;
                return (
                  <div key={st.label} className="card-edu p-6 flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">{st.label}</span>
                      <Icon className={`w-4 h-4 ${st.color}`} />
                    </div>
                    <span className="text-2xl font-black text-foreground tracking-tight">{st.value}</span>
                  </div>
                );
              })}
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Side: Missions, learning path, review, writing */}
              <div className="lg:col-span-2 space-y-8">

                {/* 2. Daily Mission */}
                <div className="card-edu p-6 space-y-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" /> Daily Missions
                  </h3>
                  <div className="space-y-3">
                    {[
                      { text: "Learn 5 new Business Idioms", done: true },
                      { text: "Complete 1 Scenario Writing practice", done: false },
                      { text: "Take the Daily AI speaking drill with Ora", done: false },
                    ].map((task, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-muted/30 border-2 border-border/40 rounded-2xl">
                        {task.done ? (
                          <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-border flex-shrink-0" />
                        )}
                        <span className={`text-xs md:text-sm font-bold ${task.done ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Continue Learning Path */}
                <div className="card-edu p-6 space-y-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      <span className="">Continue Learning</span>
                    </div>
                  </h3>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 bg-indigo-500/5 border-2 border-indigo-500/20 rounded-2xl">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-indigo-500 uppercase">Current Lesson • Level B2</span>
                      <h4 className="font-black text-base text-foreground">Advanced Conditionals Inversions</h4>
                      <p className="text-xs text-muted-foreground">Master "Hardly had I..." and negative adverbials.</p>
                    </div>
                    <Link href="/learn/lesson/3">
                      <Button size="sm" className="btn-edu text-xs font-bold text-indigo-500 hover:text-indigo-600 bg-white border-2 flex items-center gap-1.5">
                        <Rocket className="w-3 h-3" /> Start Lesson
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* 4. Vocabulary Review */}
                <div className="card-edu p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-emerald-500" />
                        <span className="">Vocabulary Review</span>
                      </div>
                    </h3>
                    <Link href="/vocabulary/review" className="text-xs text-indigo-500 font-bold hover:underline">
                      View list
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { word: "Synergy", count: "Review due now", status: "Overdue" },
                      { word: "Ubiquitous", count: "Review due in 1 hour", status: "Active" },
                    ].map((v, i) => (
                      <div key={i} className="p-4 border-2 border-border rounded-xl flex justify-between items-center bg-card">
                        <div>
                          <span className="font-bold text-sm text-foreground block">{v.word}</span>
                          <span className="text-[10px] text-muted-foreground font-semibold">{v.count}</span>
                        </div>
                        <Link href="/vocabulary/flashcard">
                          <Button size="sm" variant="outline" className="btn-edu h-8 px-3 text-[10px] font-black border-2">
                            Practice
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Writing Practice */}
                <div className="card-edu p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <PenLine className="w-4 h-4 text-pink-500" />
                        <span className="">Writing Practice</span>
                      </div>
                    </h3>
                    <Link href="/writing/practice" className="text-xs text-indigo-500 font-bold hover:underline">
                      Explore Prompts
                    </Link>
                  </div>
                  <div className="p-5 border-2 border-border/60 rounded-2xl space-y-3 bg-card">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <h4 className="font-black text-sm text-foreground">Write a formal feedback email to a colleague</h4>
                      <span className="text-[9px] font-bold text-indigo-500 bg-indigo-500/10 border-2 border-indigo-500/20 px-2 py-0.5 rounded">IELTS Task 1</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Draft a concise 80-word email using appropriate conditional forms and vocabulary.</p>
                    <div className="flex justify-end pt-2">
                      <Link href="/writing/scenario/1">
                        <Button size="sm" className="btn-edu text-[10px] font-black flex items-center gap-1.5">
                          <PenLine className="w-3 h-3" /> Start Essay
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Side: AI Coach, Weekly progress, achievements */}
              <div className="space-y-8">

                {/* 6. AI Coach Insights (Ora Companion Card) */}
                <div className="card-edu p-6 border-indigo-500/30 bg-gradient-to-b from-indigo-500/5 to-transparent space-y-4">
                  <div className="flex items-center gap-2 text-indigo-500">
                    <ImageLogoWeb variant="mascot" className="w-12 h-12" />
                    <div>
                      <h3 className="text-xs font-black uppercase tracking-wider">AI Coach Insights</h3>
                      <p className="text-[9px] text-muted-foreground font-bold">Ora Companion feedback</p>
                    </div>
                  </div>
                  <div className="p-4 bg-muted/40 border-2 border-border/40 rounded-xl space-y-2 text-xs text-muted-foreground leading-relaxed">
                    <p className="text-foreground font-bold">"Hey Hoang!"</p>
                    <p>I noticed you are very consistent in vocabulary lessons, but your written essays shows occasional errors in past participles.</p>
                    <p className="font-bold text-indigo-500">Let's practice a custom grammar quiz today to resolve this.</p>
                  </div>
                  <Link href="/grammar/personalized" className="block w-full">
                    <Button className="w-full btn-edu text-xs font-bold bg-indigo-500 text-white hover:bg-indigo-600 border-2 shadow-[0_4px_0_#312e81] flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4" /> Start Custom Quiz
                    </Button>
                  </Link>
                </div>

                {/* 7. Weekly Progress (Linear vibe chart/dots) */}
                <div className="card-edu p-6 space-y-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-500" /> Weekly Activity
                  </h3>
                  <div className="h-32 flex items-end justify-between gap-2 pt-4">
                    {[
                      { day: "M", pct: 40 },
                      { day: "T", pct: 60 },
                      { day: "W", pct: 35 },
                      { day: "T", pct: 85 },
                      { day: "F", pct: 70 },
                      { day: "S", pct: 95 },
                      { day: "S", pct: 50 },
                    ].map((d, i) => (
                      <div key={`${d.day}-${i}`} className="flex flex-col items-center gap-2 w-full group">
                        <div className="w-full bg-indigo-500/10 border-2 border-border/40 rounded-t-xl relative flex items-end" style={{ height: "80px" }}>
                          <div
                            className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg transition-all group-hover:from-indigo-500"
                            style={{ height: `${d.pct}%` }}
                          />
                        </div>
                        <span className="text-[9px] font-bold text-muted-foreground">{d.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 8. Achievements */}
                <div className="card-edu p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-500" />
                        <span className="">Achievements</span>
                      </div>
                    </h3>
                    <Link href="/progress/achievements" className="text-xs text-indigo-500 font-bold hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "First Steps", desc: "Completed onboarding tests", unlocked: true },
                      { name: "Grammar Titan", desc: "Scored 100% in Conditional Quiz", unlocked: false },
                    ].map((ach, i) => (
                      <div key={i} className={`p-3 border-2 border-border rounded-xl flex items-center gap-3 bg-card ${ach.unlocked ? "border-indigo-500/20 bg-indigo-500/5" : ""}`}>
                        <div className="flex-shrink-0">{ach.unlocked ? <Trophy className="w-5 h-5 text-amber-500" /> : <Lock className="w-5 h-5 text-muted-foreground/50" />}</div>
                        <div>
                          <span className="font-bold text-xs text-foreground block">{ach.name}</span>
                          <span className="text-[9px] text-muted-foreground">{ach.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 9. Learning Analytics (Mini Card) */}
                <div className="card-edu p-6 space-y-4">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-blue-500" /> Analytics Digest
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Average Accuracy</span>
                      <span className="font-bold text-foreground">82%</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Vocabulary diversity</span>
                      <span className="font-bold text-foreground">High Range</span>
                    </div>
                    <Link href="/progress" className="block w-full pt-2">
                      <Button variant="outline" className="w-full btn-edu h-10 text-xs border-2 font-bold">
                        View Detailed Reports
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

      <CustomizeAlert
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        variant="destructive"
        title={t("common.logout_confirm_title")}
        description={t("common.logout_confirm_desc")}
        confirmLabel={t("common.logout")}
        cancelLabel={t("common.cancel")}
        onConfirm={async () => {
          try {
            // await AuthService.logout(); 
          } catch (e) {
            console.error(e);
          } finally {
            clearAuth();
            if (typeof window !== "undefined") {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
            }
            toast.success("Logged out successfully", {
              description: "See you next time!",
            });
            setLogoutOpen(false);
            router.push("/login");
          }
        }}
        showOra={false}
      />
    </>
  );
}
