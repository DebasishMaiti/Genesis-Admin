import { useState, useCallback } from "react";
import { GovernmentExamCard } from "@/components/cards/GovernmentExamCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GovernmentExamFilterSidebar } from "./GovernmentExamFilterSidebar";

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

interface DesktopGovernmentExamProps {
  initialExams: GovernmentExam[];
  totalExams: number;
}

export function DesktopGovernmentExam({ initialExams, totalExams }: DesktopGovernmentExamProps) {
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
    <div className="min-h-screen bg-background hidden md:block">
      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Government Exam Preparation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive preparation programs for SSC, Banking, Railways, Defence, and other competitive exams.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search for exams..." 
                  className="pl-12 h-12 text-base border-2 focus:border-primary"
                />
              </div>
              <GovernmentExamFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
                <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </GovernmentExamFilterSidebar>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                All Exams
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                SSC
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Banking
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Railways
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Defence
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Insurance
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Exams Section */}
      <section className="py-8">
        <div className="container">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">All Exams</h2>
              <p className="text-muted-foreground">
                Showing {exams.length} of {totalExams} government exams
              </p>
            </div>
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Sort by popularity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Exams Grid with Infinite Scroll */}
          <InfiniteScroll
            dataLength={exams.length}
            next={loadMoreExams}
            hasMore={hasMore}
            loader={
              <div className="col-span-full flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more exams...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available exams!
                </p>
              </div>
            }
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
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
