import { useState, useCallback } from "react";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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

interface DesktopCoursesProps {
  initialCourses: Course[];
  totalCourses: number;
}

export function DesktopCourses({ initialCourses, totalCourses }: DesktopCoursesProps) {
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
    <div className="min-h-screen bg-background hidden md:block">
      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Discover Quality Courses
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect course for your competitive exam preparation
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search courses..." 
                  className="pl-12 h-12 text-base border-2 focus:border-primary"
                />
              </div>
              <FilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
                <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </FilterSidebar>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                All Courses
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Live Classes
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Most Popular
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Latest
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-8">
        <div className="container">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Available Courses</h2>
              <p className="text-muted-foreground">
                Showing {courses.length} of {totalCourses} courses
              </p>
            </div>
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Sort by popularity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="latest">Latest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Courses Grid with Infinite Scroll */}
          <InfiniteScroll
            dataLength={courses.length}
            next={loadMoreCourses}
            hasMore={hasMore}
            loader={
              <div className="col-span-full flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more courses...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available courses!
                </p>
              </div>
            }
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
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