import { Link } from "@/i18n/navigation";
import { BookOpen, Clock, FileText, ChevronRight, Gem, Coins, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WritingExercise } from "@/types/writing";

export function ExerciseCard({ exercise }: { exercise: WritingExercise }) {
  // Use summary or a snippet of content if description is not available
  const displayDescription = exercise.description || exercise.summary || exercise.content || "No description available.";

  return (
    <div className="card-edu card-edu-interactive p-5 bg-card flex flex-col h-full relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>

      <div className="flex-grow space-y-4 relative z-10">
        <div className="flex justify-between items-start gap-2">
          <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            {exercise.levelName && (
              <Badge variant="outline" className="bg-background border font-bold uppercase tracking-wider text-[10px]">
                {exercise.levelName}
              </Badge>
            )}
            {exercise.contentTypeName && (
              <Badge variant="secondary" className="border font-bold uppercase tracking-wider text-[10px] bg-secondary/50 text-secondary-foreground">
                {exercise.contentTypeName}
              </Badge>
            )}
          </div>
        </div>

        <div>
          {exercise.topicName && (
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
              <Layers className="w-3 h-3" /> {exercise.topicName}
            </p>
          )}
          <h4 className="text-lg font-black text-foreground text-heading line-clamp-2 group-hover:text-primary transition-colors leading-tight">
            {exercise.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2 font-medium leading-relaxed">
            {displayDescription}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-bold text-muted-foreground bg-muted/30 p-2.5 rounded-xl border border-border/50">
          {(exercise.estimatedMinutes || exercise.timeLimitMinutes) && (
            <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded-md border shadow-sm">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>{exercise.estimatedMinutes || exercise.timeLimitMinutes} min</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded-md border shadow-sm">
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>{exercise.totalSentences} sentences</span>
          </div>

          {exercise.wordCountTarget && (
            <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded-md border shadow-sm">
              <FileText className="w-3.5 h-3.5 text-indigo-500" />
              <span>{exercise.wordCountTarget} words</span>
            </div>
          )}

          {exercise.xpReward && (
            <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded-md border shadow-sm">
              <Gem className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-amber-600 dark:text-amber-400">{exercise.xpReward} XP</span>
            </div>
          )}

          {exercise.creditsReward && (
            <div className="flex items-center gap-1.5 bg-background px-2 py-1 rounded-md border shadow-sm">
              <Coins className="w-3.5 h-3.5 text-yellow-500" />
              <span className="text-yellow-600 dark:text-yellow-400">+{exercise.creditsReward}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 relative z-10">
        <Link href={`/writing/${exercise.id}`} className="block w-full">
          <Button size="sm" className="btn-edu w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2">
            Start Writing <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
