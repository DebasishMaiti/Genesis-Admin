import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { QuizCard } from "@/components/cards/QuizCard";
import { DailyQuizFilterSidebar } from "@/components/sections/DailyQuizFilterSidebar";
import { Search, Filter } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

interface QuizItem {
  id: string;
  title: string;
  category: string;
  questions: number;
  time: string;
  difficulty: string;
  points: number;
  href: string;
}

interface DesktopDailyQuizProps {
  initialQuizzes: QuizItem[];
  totalQuizzes: number;
}

export function DesktopDailyQuiz({
  initialQuizzes,
  totalQuizzes
}: DesktopDailyQuizProps) {
  const [quizzes, setQuizzes] = useState<QuizItem[]>(initialQuizzes);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const loadMoreQuizzes = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    // Simulate loading more quizzes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newQuizzes = Array.from({ length: 6 }, (_, i) => ({
      id: `quiz_${quizzes.length + i + 1}`,
      title: `Sample Quiz ${quizzes.length + i + 1}`,
      category: "General",
      questions: 20 + Math.floor(Math.random() * 10),
      time: `${20 + Math.floor(Math.random() * 20)} mins`,
      difficulty: ["Easy", "Medium", "Hard"][Math.floor(Math.random() * 3)],
      points: 50 + Math.floor(Math.random() * 50),
      href: `/quiz/sample-${quizzes.length + i + 1}`
    }));
    
    setQuizzes(prev => [...prev, ...newQuizzes]);
    setLoading(false);
    
    if (quizzes.length + newQuizzes.length >= 30) {
      setHasMore(false);
    }
  }, [quizzes.length, loading]);

  return (
    <div className="min-h-screen bg-background hidden md:block">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Daily Quiz
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your knowledge with our daily practice questions and improve your preparation.
              Challenge yourself with quizzes across various subjects.
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search quizzes..." 
                  className="pl-12 h-14 text-lg border-2 focus:border-primary rounded-xl"
                />
              </div>
              <DailyQuizFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
                <Button className="h-14 px-6 bg-primary hover:bg-primary/90 rounded-xl">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </DailyQuizFilterSidebar>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {["General Knowledge", "Current Affairs", "Mathematics", "English", "Science"].map((tag) => (
                <Badge 
                  key={tag}
                  variant="secondary" 
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quizzes Section */}
      <section className="py-16">
        <div className="container max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <p className="text-muted-foreground">
              Showing {quizzes.length} of {totalQuizzes} quizzes
            </p>
            <Select defaultValue="latest">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="difficulty">Difficulty</SelectItem>
                <SelectItem value="questions">Questions Count</SelectItem>
                <SelectItem value="time">Duration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <InfiniteScroll
            dataLength={quizzes.length}
            next={loadMoreQuizzes}
            hasMore={hasMore}
            loader={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-64 bg-muted animate-pulse rounded-lg"></div>
                ))}
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">🎉 You've seen all available quizzes!</p>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} {...quiz} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}