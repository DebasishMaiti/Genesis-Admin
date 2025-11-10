import { useState, useCallback } from "react";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FilterSidebar } from "./FilterSidebar";

interface Course {
  id: string;
  title: string;
  thumb: string;
  category: string;
  rating: number;
  lessons: number;
  price: number;
  href: string;
}

interface MobileCoursesProps {
  initialCourses: Course[];
}

export function MobileCourses({ initialCourses }: MobileCoursesProps) {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Simulate loading more courses
  const loadMoreCourses = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate more courses (in real app, this would be an API call)
    const newCourses: Course[] = initialCourses.map((course, index) => ({
      ...course,
      id: `${course.id}-${courses.length + index}`,
      title: `${course.title} - Batch ${Math.floor(courses.length / initialCourses.length) + 2}`,
    }));
    
    setCourses(prev => [...prev, ...newCourses]);
    
    // Stop loading more after 5 batches (30 courses total)
    if (courses.length >= 30) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [courses.length, initialCourses, loading]);
  return (
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search courses..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <FilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
              <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </FilterSidebar>
          </div>
        </div>
      </section>

      {/* Courses List with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={courses.length}
            next={loadMoreCourses}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more courses...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available courses!
                </p>
              </div>
            }
            className="space-y-4"
          >
            {courses.map((course) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}