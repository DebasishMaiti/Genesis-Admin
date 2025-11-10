import { useState, useCallback } from "react";
import { BookCard } from "@/components/cards/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InfiniteScroll from "react-infinite-scroll-component";
import { BooksFilterSidebar } from "./BooksFilterSidebar";

interface Book {
  id: string;
  title: string;
  author: string;
  subject: string;
  category: string;
  type: string;
  thumb: string;
  rating: number;
  pages: number;
  price: number;
  originalPrice?: number;
  language: string;
  edition: string;
  publication: string;
  href: string;
}

interface DesktopBooksProps {
  initialBooks: Book[];
  totalBooks: number;
}

export function DesktopBooks({ initialBooks, totalBooks }: DesktopBooksProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  // Simulate loading more books
  const loadMoreBooks = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate more books (in real app, this would be an API call)
    const newBooks: Book[] = initialBooks.map((book, index) => ({
      ...book,
      id: `${book.id}-${books.length + index}`,
      title: `${book.title} - Volume ${Math.floor(books.length / initialBooks.length) + 2}`,
    }));
    
    setBooks(prev => [...prev, ...newBooks]);
    
    // Stop loading more after reaching total
    if (books.length >= totalBooks - initialBooks.length) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [books.length, initialBooks, loading, totalBooks]);

  const filterTags = [
    { label: "SSC", count: 45 },
    { label: "Banking", count: 32 },
    { label: "English", count: 28 },
    { label: "Mathematics", count: 35 },
    { label: "E-Book", count: 22 },
  ];

  return (
    <div className="min-h-screen bg-background hidden md:block">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
              Books & Study Material
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive collection of books and study materials for competitive exams. 
              Get expert-authored content for better preparation.
            </p>
            
            {/* Search Bar */}
            <div className="flex gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search books, authors, subjects..." 
                  className="pl-12 h-14 text-lg border-2 focus:border-primary rounded-xl"
                />
              </div>
              <BooksFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
                <Button className="h-14 px-6 bg-primary hover:bg-primary/90 rounded-xl">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </Button>
              </BooksFilterSidebar>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              {filterTags.map((tag) => (
                <Badge 
                  key={tag.label}
                  variant="secondary" 
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tag.label} ({tag.count})
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                Available Books
              </h2>
              <p className="text-muted-foreground">
                Showing {books.length} of {totalBooks} books
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select defaultValue="newest">
                <SelectTrigger className="w-48">
                  <SortAsc className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Books Grid with Infinite Scroll */}
          <InfiniteScroll
            dataLength={books.length}
            next={loadMoreBooks}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8 col-span-full">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more books...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8 col-span-full">
                <p className="text-muted-foreground">
                  You've seen all available books!
                </p>
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}