import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, HelpCircle, Trophy, Calendar, Star, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WeeklyTestCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: number;
  time: string;
  difficulty: string;
  points: number;
  thumb: string;
  price: number;
  rating: number;
  testDate: string;
  syllabus: string;
  href: string;
}

export function WeeklyTestCard({
  title,
  category,
  description,
  questions,
  time,
  difficulty,
  points,
  price,
  rating,
  testDate,
  syllabus,
  href
}: WeeklyTestCardProps) {
  const navigate = useNavigate();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'hard':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Mobile Layout */}
      <Card className="md:hidden hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {category}
                </Badge>
                <Badge className={`text-xs px-2 py-1 ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-foreground leading-tight">{title}</h3>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-2">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          
          <div className="space-y-2 text-sm text-muted-foreground flex-grow">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{questions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>{points} Points</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Test Date: {formatDate(testDate)}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="text-lg font-bold text-primary">₹{price}</div>
            <Button className="bg-primary hover:bg-primary/90" size="sm" onClick={() => navigate(href)}>
              Take Test
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Layout */}
      <Card className="hidden md:block hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {category}
                </Badge>
                <Badge className={`px-3 py-1 ${getDifficultyColor(difficulty)}`}>
                  {difficulty}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground ml-4">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span>{questions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>{points} Points</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(testDate)}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Syllabus:</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">{syllabus}</p>
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="text-2xl font-bold text-primary">₹{price}</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigate(href)}>
                View Details
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate(href)}>
                Take Test
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}