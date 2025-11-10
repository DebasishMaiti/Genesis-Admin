import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuizCard } from "@/components/cards/QuizCard";
import { DailyQuizFilterSidebar } from "@/components/sections/DailyQuizFilterSidebar";
import { Search, Filter, Loader2 } from "lucide-react";
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

interface MobileDailyQuizProps {
  initialQuizzes: QuizItem[];
}

export function MobileDailyQuiz({
  initialQuizzes
}: MobileDailyQuizProps) {
  const [quizzes, setQuizzes] = useState<QuizItem[]>(initialQuizzes);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const loadMoreQuizzes = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    // Simulate loading more quizzes
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newQuizzes = Array.from({ length: 4 }, (_, i) => ({
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
    
    if (quizzes.length + newQuizzes.length >= 20) {
      setHasMore(false);
    }
  }, [quizzes.length, loading]);

  return (
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search quizzes..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <DailyQuizFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
              <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </DailyQuizFilterSidebar>
          </div>
        </div>
      </section>

      {/* Quizzes List with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={quizzes.length}
            next={loadMoreQuizzes}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
            endMessage={
              <div className="text-center py-6">
                <p className="text-muted-foreground text-sm">🎉 You've seen all available quizzes!</p>
              </div>
            }
          >
            <div className="space-y-4">
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