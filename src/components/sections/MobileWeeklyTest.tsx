import { useState, useCallback } from "react";
import { WeeklyTestCard } from "@/components/cards/WeeklyTestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { WeeklyTestFilterSidebar } from "./WeeklyTestFilterSidebar";

interface WeeklyTest {
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

interface MobileWeeklyTestProps {
  initialTests: WeeklyTest[];
}

export function MobileWeeklyTest({ initialTests }: MobileWeeklyTestProps) {
  const [tests, setTests] = useState<WeeklyTest[]>(initialTests);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const loadMoreTests = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTests: WeeklyTest[] = initialTests.map((test, index) => ({
      ...test,
      id: `${test.id}-${tests.length + index}`,
      title: `${test.title} - Week ${Math.floor(tests.length / initialTests.length) + 2}`,
    }));
    
    setTests(prev => [...prev, ...newTests]);
    
    if (tests.length >= 30) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [tests.length, initialTests, loading]);

  return (
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search weekly tests..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <WeeklyTestFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
              <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </WeeklyTestFilterSidebar>
          </div>
        </div>
      </section>

      {/* Tests List with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={tests.length}
            next={loadMoreTests}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more tests...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available tests!
                </p>
              </div>
            }
            className="space-y-4"
          >
            {tests.map((test) => (
              <WeeklyTestCard key={test.id} {...test} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}