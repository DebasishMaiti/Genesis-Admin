import { useState, useCallback } from "react";
import { TestSeriesCard } from "@/components/cards/TestSeriesCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TestSeriesFilterSidebar } from "./TestSeriesFilterSidebar";

interface TestSeries {
  id: string;
  title: string;
  category: string;
  type: string;
  thumb: string;
  rating: number;
  tests: number;
  attempts: number;
  price: number;
  duration: string;
  language: string;
  href: string;
}

interface MobileTestSeriesProps {
  initialTestSeries: TestSeries[];
}

export function MobileTestSeries({ initialTestSeries }: MobileTestSeriesProps) {
  const [testSeries, setTestSeries] = useState<TestSeries[]>(initialTestSeries);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Simulate loading more test series
  const loadMoreTestSeries = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate more test series (in real app, this would be an API call)
    const newTestSeries: TestSeries[] = initialTestSeries.map((series, index) => ({
      ...series,
      id: `${series.id}-${testSeries.length + index}`,
      title: `${series.title} - Level ${Math.floor(testSeries.length / initialTestSeries.length) + 2}`,
    }));
    
    setTestSeries(prev => [...prev, ...newTestSeries]);
    
    // Stop loading more after 5 batches (30 test series total)
    if (testSeries.length >= 30) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [testSeries.length, initialTestSeries, loading]);

  return (
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search test series..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <TestSeriesFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
              <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </TestSeriesFilterSidebar>
          </div>
        </div>
      </section>

      {/* Test Series List with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={testSeries.length}
            next={loadMoreTestSeries}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more test series...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available test series!
                </p>
              </div>
            }
            className="space-y-4"
          >
            {testSeries.map((series) => (
              <TestSeriesCard key={series.id} {...series} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}