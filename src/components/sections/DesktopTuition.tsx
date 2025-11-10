import { useState, useCallback } from "react";
import { TuitionCard } from "@/components/cards/TuitionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { TuitionFilterSidebar } from "./TuitionFilterSidebar";

interface TuitionClass {
  id: string;
  board: string;
  class: string;
  title: string;
  subjects: string[];
  thumb: string;
  rating: number;
  students: number;
  teachers: number;
  price: number;
  href: string;
}

interface DesktopTuitionProps {
  initialClasses: TuitionClass[];
  totalClasses: number;
}

export function DesktopTuition({ initialClasses, totalClasses }: DesktopTuitionProps) {
  const [classes, setClasses] = useState<TuitionClass[]>(initialClasses);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const loadMoreClasses = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newClasses: TuitionClass[] = initialClasses.map((classItem, index) => ({
      ...classItem,
      id: `${classItem.id}-${classes.length + index}`,
    }));
    
    setClasses(prev => [...prev, ...newClasses]);
    
    if (classes.length >= 30) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [classes.length, initialClasses, loading]);

  return (
    <div className="min-h-screen bg-background hidden md:block">
      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Academic Classes by Board & Standard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your board and class to explore comprehensive course packages.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search by class, board, or subject..." 
                  className="pl-12 h-12 text-base border-2 focus:border-primary"
                />
              </div>
              <TuitionFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
                <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </TuitionFilterSidebar>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                All Classes
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Board Wise
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Class Wise
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Subjects
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-8">
        <div className="container">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Available Classes</h2>
              <p className="text-muted-foreground">
                Showing {classes.length} of {totalClasses} academic programs
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

          {/* Classes Grid with Infinite Scroll */}
          <InfiniteScroll
            dataLength={classes.length}
            next={loadMoreClasses}
            hasMore={hasMore}
            loader={
              <div className="col-span-full flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more classes...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available classes!
                </p>
              </div>
            }
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {classes.map((tuitionClass) => (
              <TuitionCard key={tuitionClass.id} {...tuitionClass} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}