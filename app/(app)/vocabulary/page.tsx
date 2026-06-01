import { Search, Bell, BookMarked, Volume2, Plus, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const vocabularyWords = [
  {
    word: "Synergy",
    phonetic: "/ˈsɪn.ə.dʒi/",
    level: "B2",
    topic: "Business",
    definition: "The interaction or cooperation of two or more organizations to produce a combined effect greater than the sum of their separate effects.",
    mastery: 85,
    difficulty: "Easy",
    difficultyColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    difficultyDot: "bg-emerald-500",
  },
  {
    word: "Komorebi",
    phonetic: "/ko-mo-re-bi/",
    level: "N1",
    topic: "Culture",
    definition: "Sunlight that filters through the leaves of trees, creating a dappled effect on the ground.",
    mastery: 42,
    difficulty: "Hard",
    difficultyColor: "text-destructive bg-destructive/10 border-destructive/20",
    difficultyDot: "bg-destructive",
  },
  {
    word: "Wanderlust",
    phonetic: "/ˈwɒn.də.lʌst/",
    level: "B1",
    topic: "Travel",
    definition: "A strong desire to travel and explore the world.",
    mastery: 68,
    difficulty: "Medium",
    difficultyColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    difficultyDot: "bg-blue-400",
  },
  {
    word: "Ubiquitous",
    phonetic: "/juːˈbɪk.wɪ.təs/",
    level: "C1",
    topic: "Tech",
    definition: "Present, appearing, or found everywhere.",
    mastery: 15,
    difficulty: "Hard",
    difficultyColor: "text-destructive bg-destructive/10 border-destructive/20",
    difficultyDot: "bg-destructive",
  },
  {
    word: "Petrichor",
    phonetic: "/ˈpet.rɪ.kɔːr/",
    level: "A2",
    topic: "Basic",
    definition: "A pleasant smell that frequently accompanies the first rain after a long period of warm, dry weather.",
    mastery: 95,
    difficulty: "Easy",
    difficultyColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    difficultyDot: "bg-emerald-500",
  },
  {
    word: "Ephemeral",
    phonetic: "/ɪˈfem.ər.əl/",
    level: "B1",
    topic: "Food",
    definition: "Lasting for a very short time.",
    mastery: 30,
    difficulty: "Medium",
    difficultyColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    difficultyDot: "bg-blue-400",
  },
];

export default function VocabularyPage() {
  return (
    <div className="flex flex-col h-full overflow-hidden bg-background">
      {/* Header */}
      <header className="flex flex-col px-6 py-4 gap-4 border-b sticky top-0 bg-background/80 backdrop-blur-xl z-10 flex-shrink-0">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground">Vocabulary Lab</h2>
            <p className="text-sm text-muted-foreground">Manage and master your curated lexicon</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative w-72 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                className="w-full bg-muted/50 pl-9 border-border focus-visible:ring-1 focus-visible:ring-primary"
                placeholder="Search specific words..."
                type="text"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <BookMarked className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider whitespace-nowrap">Filters:</span>
          
          <Select defaultValue="all-levels">
            <SelectTrigger className="w-[140px] h-8 text-xs rounded-full bg-muted/50 border-border">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-levels">Level: All</SelectItem>
              <SelectItem value="a1">A1 - Beginner</SelectItem>
              <SelectItem value="a2">A2 - Elementary</SelectItem>
              <SelectItem value="b1">B1 - Intermediate</SelectItem>
              <SelectItem value="b2">B2 - Upper Int.</SelectItem>
              <SelectItem value="c1">C1 - Advanced</SelectItem>
              <SelectItem value="c2">C2 - Mastery</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="business">
            <SelectTrigger className="w-[140px] h-8 text-xs rounded-full bg-muted/50 border-border">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="business">Topic: Business</SelectItem>
              <SelectItem value="travel">Topic: Travel</SelectItem>
              <SelectItem value="science">Topic: Science</SelectItem>
              <SelectItem value="tech">Topic: Technology</SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="japanese">
            <SelectTrigger className="w-[160px] h-8 text-xs rounded-full bg-muted/50 border-border">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="japanese">Language: Japanese</SelectItem>
              <SelectItem value="english">Language: English</SelectItem>
            </SelectContent>
          </Select>

          <div className="h-5 w-px bg-border mx-1" />
          <Button size="sm" className="h-8 rounded-full text-xs font-bold whitespace-nowrap gap-1">
            <Plus className="w-3.5 h-3.5" />
            Add New Word
          </Button>
        </div>
      </header>

      {/* Vocabulary Grid Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {vocabularyWords.map((word) => (
            <Card
              key={word.word}
              className="group overflow-hidden hover:border-primary hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-pointer bg-card/60 backdrop-blur-md"
            >
              <CardContent className="p-5 flex flex-col gap-3">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-[10px] uppercase tracking-tight bg-muted text-muted-foreground">
                    {word.level} • {word.topic}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-muted-foreground hover:text-primary">
                      <Volume2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full text-muted-foreground hover:text-primary">
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Word Content */}
                <div className="mt-1">
                  <h3 className="text-xl font-bold text-primary">{word.word}</h3>
                  <p className="text-sm text-muted-foreground italic mb-2">{word.phonetic}</p>
                  <p className="text-sm text-foreground line-clamp-2 leading-relaxed">{word.definition}</p>
                </div>

                {/* Mastery Progress */}
                <div className="mt-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-muted-foreground font-semibold">Mastery</span>
                    <span className="text-[10px] text-primary font-semibold">{word.mastery}%</span>
                  </div>
                  <Progress value={word.mastery} className="h-1 bg-muted" indicatorClassName="bg-primary" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-1">
                  <span className={`flex items-center gap-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${word.difficultyColor}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${word.difficultyDot}`} />
                    {word.difficulty}
                  </span>
                  <Button size="sm" className="h-7 text-xs font-bold active:scale-95 transition-all">
                    {word.mastery >= 90 ? "Review" : "Learn"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Weekly Milestone Card — spans 2 columns */}
          <Card className="col-span-1 sm:col-span-2 relative overflow-hidden bg-muted/20 border-border">
            <CardContent className="p-5 flex flex-col gap-3 h-full">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-lg text-foreground">Weekly Milestone</h4>
                  <p className="text-sm text-muted-foreground">You've mastered 24 new words this week</p>
                </div>
                <div className="p-2.5 bg-primary/20 rounded-full border border-primary/20 text-primary animate-pulse">
                  <Zap className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-end gap-6 flex-1">
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
                    <span>Target: 30 Words</span>
                    <span>80% Complete</span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-primary rounded-full shadow-[0_0_12px_rgba(168,240,106,0.3)] transition-all duration-1000" style={{ width: "80%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
      <Button 
        size="icon" 
        className="fixed bottom-20 right-6 md:bottom-10 md:right-10 w-14 h-14 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform z-40 group"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      </Button>
    </div>
  );
}
