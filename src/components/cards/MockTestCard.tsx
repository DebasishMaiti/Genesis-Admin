import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Target, Users, Lock } from "lucide-react";

interface MockTestCardProps {
  id: string;
  title: string;
  questions: number;
  duration: number;
  marks: number;
  attempted: number;
  type: "pyp" | "mcq";
  year?: number;
  difficulty?: string;
  averageScore?: number;
  isLocked: boolean;
}

export function MockTestCard({
  title,
  questions,
  duration,
  marks,
  attempted,
  type,
  year,
  difficulty,
  averageScore,
  isLocked,
}: MockTestCardProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff?.toLowerCase()) {
      case "easy":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "hard":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground line-clamp-2">{title}</h3>
            <div className="flex items-center gap-2 mt-1">
              {type === "pyp" && year && (
                <Badge variant="outline" className="text-xs">
                  {year}
                </Badge>
              )}
              {type === "mcq" && difficulty && (
                <Badge variant="outline" className={`text-xs ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </Badge>
              )}
            </div>
          </div>
          {isLocked && <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{questions} Questions</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{duration} mins</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>{marks} Marks</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{attempted.toLocaleString()}</span>
          </div>
        </div>

        {averageScore && (
          <div className="text-xs text-muted-foreground">
            Avg Score: <span className="font-medium text-foreground">{averageScore}/{marks}</span>
          </div>
        )}

        <Button className="w-full" size="sm" disabled={isLocked}>
          {isLocked ? "Enroll to Access" : "Start Test"}
        </Button>
      </div>
    </Card>
  );
}
