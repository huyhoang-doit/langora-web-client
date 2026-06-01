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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const stats = [
  { icon: BookOpen, label: "Words Learned", value: "1,250", trend: "+48 this week", color: "text-primary" },
  { icon: Flame, label: "Current Streak", value: "15 Days", progress: 75 },
  { icon: PenLine, label: "Writing Score", value: "8.5/10", note: "Advanced Level" },
  { icon: Timer, label: "Study Time", value: "12h 30m", note: "Target: 15h" },
];

const weeklyData = [
  { day: "MON", pct: 40 },
  { day: "TUE", pct: 60 },
  { day: "WED", pct: 35 },
  { day: "THU", pct: 85 },
  { day: "FRI", pct: 70 },
  { day: "SAT", pct: 95 },
  { day: "SUN", pct: 50 },
];

const aiRecs = [
  { type: "Targeted Lesson", title: "Advanced Tenses", desc: "Master conditional structures in professional contexts." },
  { type: "Vocabulary Pack", title: "Business English", desc: "24 new idioms for corporate negotiation." },
  { type: "AI Writing Task", title: "Reflect on your day", desc: "Practice descriptive adjectives and past participles." },
];

const grammarAreas = [
  { name: "Tenses", pct: 65, note: "Focus on Past Perfect Continuous usage.", color: "bg-primary" },
  { name: "Articles", pct: 42, note: "Review definite vs indefinite article rules.", color: "bg-destructive" },
  { name: "Prepositions", pct: 78, note: "Strong performance. Keep practicing phrasal verbs.", color: "bg-primary" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* TopAppBar */}
      <header className="flex justify-between items-center w-full px-6 h-16 bg-background/80 backdrop-blur-xl border-b sticky top-0 z-30 flex-shrink-0">
        <div className="flex items-center gap-6">
          <h2 className="font-bold text-xl md:hidden text-foreground">Langora</h2>
          <div className="hidden md:flex relative items-center">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground" />
            <Input
              className="w-64 pl-9 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
              placeholder="Quick search..."
              type="text"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r pr-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <BookMarked className="w-5 h-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium group-hover:text-primary transition-colors">Hoang</p>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Pro Member</p>
            </div>
            <Avatar className="h-10 w-10 ring-2 ring-border group-hover:ring-primary transition-all">
              <AvatarFallback className="bg-muted text-foreground">👤</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Scrollable Content Area */}
      <div className="flex-grow overflow-y-auto scrollbar-thin p-6">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Welcome Card + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Welcome Card */}
            <Card className="lg:col-span-4 ai-glow overflow-hidden relative group border-border">
              <CardContent className="p-6">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-foreground">Hi Hoang 👋</h3>
                    <p className="text-muted-foreground max-w-xl">
                      You've completed 85% of your daily goal. Continue your learning streak and unlock the{" "}
                      <span className="text-primary font-bold">Polyglot Badge</span> today.
                    </p>
                  </div>
                  <Button className="font-bold hover:shadow-[0_0_20px_rgba(168,240,106,0.3)] transition-all flex items-center gap-2 self-start md:self-center">
                    Continue Learning
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                {/* Decorative */}
                <div className="absolute -right-16 -bottom-16 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Globe className="w-64 h-64 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            {stats.map(({ icon: Icon, label, value, trend, progress, note, color }) => (
              <Card key={label} className="flex flex-col gap-3 hover:border-primary/50 transition-colors">
                <CardContent className="p-5 flex flex-col h-full gap-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{label}</p>
                    <p className="text-xl font-semibold text-foreground">{value}</p>
                  </div>
                  {trend && (
                    <div className="text-[10px] text-primary font-bold flex items-center gap-1 mt-auto">
                      <TrendingUp className="w-3 h-3" />
                      {trend}
                    </div>
                  )}
                  {progress !== undefined && (
                    <div className="mt-auto">
                      <Progress value={progress} className="h-1 bg-muted" indicatorClassName="bg-primary" />
                    </div>
                  )}
                  {note && (
                    <p className="text-[10px] text-muted-foreground font-bold mt-auto italic">{note}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Middle: Progress Chart + AI Recs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Learning Progress Chart */}
            <Card className="lg:col-span-2 flex flex-col">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg">Learning Progress</CardTitle>
                  <CardDescription>Weekly activity overview</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="h-7 text-xs">Weekly</Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">Monthly</Button>
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex items-end justify-between h-48 pt-6 gap-4">
                {weeklyData.map(({ day, pct }) => (
                  <div key={day} className="flex flex-col items-center gap-2 w-full group">
                    <div
                      className="w-full bg-primary/20 rounded-t-lg group-hover:bg-primary/40 transition-colors relative"
                      style={{ height: `${pct}%` }}
                    >
                      {pct === 95 && (
                        <div className="absolute inset-x-0 bottom-0 bg-primary h-1.5 shadow-[0_0_10px_rgba(168,240,106,0.5)]" />
                      )}
                      {pct !== 95 && (
                        <div className="absolute inset-x-0 bottom-0 bg-primary h-0.5" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground">{day}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="relative overflow-hidden border-primary/30 ai-glow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-primary">
                  <Sparkles className="w-4 h-4" />
                  <CardTitle className="text-xs font-bold uppercase tracking-wider">AI Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiRecs.map(({ type, title, desc }) => (
                  <div key={title} className="cursor-pointer p-3 rounded-lg hover:bg-muted transition-colors">
                    <p className="text-[10px] text-primary font-bold uppercase mb-1">{type}</p>
                    <p className="text-sm text-foreground font-bold">{title}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{desc}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                  Refresh Recommendations
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom: Grammar Focus + Daily Progress */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-6">
            {/* Grammar Focus Areas */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Grammar Focus Areas</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {grammarAreas.map(({ name, pct, note, color }) => (
                  <div key={name} className="p-4 rounded-lg bg-muted/50 border border-border hover:border-primary/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-foreground">{name}</span>
                      <span className="text-xs text-muted-foreground">{pct}%</span>
                    </div>
                    <Progress value={pct} className="h-1 mb-3 bg-background" indicatorClassName={color} />
                    <p className="text-[10px] text-muted-foreground leading-tight">{note}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Daily Goal Progress */}
            <Card className="flex flex-col items-center text-center">
              <CardHeader className="w-full pb-0 text-left">
                <CardTitle className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Daily Progress</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center pt-6 w-full">
                {/* Progress Ring */}
                <div className="relative w-40 h-40 mb-6">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      cx="50" cy="50" fill="transparent" r="40" strokeWidth="8"
                    />
                    <circle
                      cx="50" cy="50" fill="transparent" r="40"
                      stroke="hsl(var(--primary))"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="37.68"
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 0.35s", stroke: "var(--color-primary)" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-semibold text-foreground">85%</span>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase">Complete</span>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-foreground">Experience Points</span>
                    <span className="text-primary">850 / 1000 XP</span>
                  </div>
                  <Progress value={85} className="h-3 p-0.5" indicatorClassName="bg-primary shadow-[0_0_8px_rgba(168,240,106,0.3)] rounded-full" />
                  <p className="text-[10px] text-muted-foreground italic mt-2">Just 150 XP more to reach Level 12!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating AI Button */}
      <div className="fixed bottom-20 right-6 md:bottom-10 md:right-10 z-40">
        <Button size="icon" className="w-14 h-14 rounded-full shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 transition-all group">
          <Bot className="w-6 h-6 group-hover:hidden" />
          <Sparkles className="w-6 h-6 hidden group-hover:block animate-pulse" />
        </Button>
      </div>
    </div>
  );
}
