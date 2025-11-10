import { useState, useCallback } from "react";
import { WeeklyTestCard } from "@/components/cards/WeeklyTestCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

interface DesktopWeeklyTestProps {
  initialTests: WeeklyTest[];
  totalTests: number;
}

export function DesktopWeeklyTest({ initialTests, totalTests }: DesktopWeeklyTestProps) {
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
    <div className="min-h-screen bg-background hidden md:block">
      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Weekly Test Series
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Challenge yourself with our comprehensive weekly tests and track your progress.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search by category, difficulty, or test name..." 
                  className="pl-12 h-12 text-base border-2 focus:border-primary"
                />
              </div>
              <WeeklyTestFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
                <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </WeeklyTestFilterSidebar>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                All Tests
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                This Week
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Easy Level
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Free Tests
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Section */}
      <section className="py-8">
        <div className="container">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Available Weekly Tests</h2>
              <p className="text-muted-foreground">
                Showing {tests.length} of {totalTests} tests
              </p>
            </div>
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Sort by latest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest Tests</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="difficulty">Difficulty Level</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tests Grid with Infinite Scroll */}
          <InfiniteScroll
            dataLength={tests.length}
            next={loadMoreTests}
            hasMore={hasMore}
            loader={
              <div className="col-span-full flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more tests...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available tests!
                </p>
              </div>
            }
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
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