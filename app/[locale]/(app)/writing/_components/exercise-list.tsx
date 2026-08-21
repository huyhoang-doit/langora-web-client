import { BookOpen } from "lucide-react";
import { WritingExercise } from "@/types/writing";
import { ExerciseCard } from "./exercise-card";

interface ExerciseListProps {
  exercises: WritingExercise[];
  loading: boolean;
  hasSelection: boolean;
}

export function ExerciseList({ exercises, loading, hasSelection }: ExerciseListProps) {
  if (!hasSelection) {
    return (
      <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 border border-dashed border-border rounded-xl">
        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <h4 className="text-lg font-black text-heading mb-2 text-foreground">Select to start</h4>
        <p className="font-medium text-sm">Please select both a topic and a content type to view exercises.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="card-edu p-5 h-48 flex flex-col justify-between animate-pulse bg-card">
            <div className="space-y-4">
              <div className="h-6 w-3/4 bg-muted rounded"></div>
              <div className="h-4 w-full bg-muted rounded"></div>
              <div className="h-4 w-2/3 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="col-span-full py-12 text-center text-muted-foreground bg-muted/20 border border-dashed border-border rounded-xl">
        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
        <h4 className="text-lg font-black text-heading mb-2 text-foreground">No Exercises Found</h4>
        <p className="font-medium text-sm">We couldn't find any exercises for this combination.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exercises.map((ex) => (
        <ExerciseCard key={ex.id} exercise={ex} />
      ))}
    </div>
  );
}
