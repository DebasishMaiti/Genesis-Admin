import { useState, useCallback } from "react";
import { TuitionCard } from "@/components/cards/TuitionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface MobileTuitionProps {
  initialClasses: TuitionClass[];
}

export function MobileTuition({ initialClasses }: MobileTuitionProps) {
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
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search by class, board, or subject..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <TuitionFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
              <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </TuitionFilterSidebar>
          </div>
        </div>
      </section>

      {/* Classes List with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={classes.length}
            next={loadMoreClasses}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more classes...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available classes!
                </p>
              </div>
            }
            className="space-y-4"
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