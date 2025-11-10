import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, HelpCircle, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface QuizCardProps {
  id: string;
  title: string;
  category: string;
  questions: number;
  time: string;
  difficulty: string;
  points: number;
  href: string;
}
export function QuizCard({
  title,
  questions,
  time,
  difficulty,
  points,
  href
}: QuizCardProps) {
  const navigate = useNavigate();
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'hard':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  return <>
      {/* Mobile Layout */}
      <Card className="md:hidden hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            
          </div>
          
          <div className="space-y-2 text-sm text-muted-foreground flex-grow">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{questions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Time: {time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>{points} Points</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
                Difficulty: {difficulty}
              </span>
            </div>
          </div>
          
          <Button className="w-full mt-4 bg-primary hover:bg-primary/90" size="sm" onClick={() => navigate(href)}>
            Start Quiz
          </Button>
        </CardContent>
      </Card>

      {/* Desktop Layout */}
      <Card className="hidden md:block hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
            
          </div>
          
          <div className="space-y-3 text-sm text-muted-foreground flex-grow">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{questions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Time: {time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>{points} Points</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`font-medium ${getDifficultyColor(difficulty)}`}>
                Difficulty: {difficulty}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6">
            <Button variant="outline" className="flex-1" onClick={() => navigate(href)}>
              View Details
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => navigate(href)}>
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </>;
}