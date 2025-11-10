import { useState, useCallback } from "react";
import { BookCard } from "@/components/cards/BookCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Loader2 } from "lucide-react";
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

interface MobileBooksProps {
  initialBooks: Book[];
}

export function MobileBooks({ initialBooks }: MobileBooksProps) {
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
    
    // Stop loading more after 5 batches (30 books total)
    if (books.length >= 30) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [books.length, initialBooks, loading]);

  return (
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search books..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <BooksFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
              <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </BooksFilterSidebar>
          </div>
        </div>
      </section>

      {/* Books List with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={books.length}
            next={loadMoreBooks}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more books...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available books!
                </p>
              </div>
            }
            className="space-y-4"
          >
            {books.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}