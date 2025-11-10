import { useState, useCallback } from "react";
import { GovernmentExamCard } from "@/components/cards/GovernmentExamCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

interface GovernmentExam {
  id: string;
  category: string;
  examName: string;
  title: string;
  subjects: string[];
  thumb: string;
  rating: number;
  students: number;
  teachers: number;
  price: number;
  href: string;
}

interface MobileGovernmentExamProps {
  initialExams: GovernmentExam[];
}

export function MobileGovernmentExam({ initialExams }: MobileGovernmentExamProps) {
  const [exams, setExams] = useState<GovernmentExam[]>(initialExams);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const loadMoreExams = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newExams: GovernmentExam[] = initialExams.map((exam, index) => ({
      ...exam,
      id: `${exam.id}-${exams.length + index}`,
    }));
    
    setExams(prev => [...prev, ...newExams]);
    
    if (exams.length >= 30) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [exams.length, initialExams, loading]);

  return (
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for exams..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Exams Grid with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={exams.length}
            next={loadMoreExams}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more exams...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available exams!
                </p>
              </div>
            }
            className="space-y-4"
          >
            {exams.map((exam) => (
              <GovernmentExamCard key={exam.id} {...exam} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}
