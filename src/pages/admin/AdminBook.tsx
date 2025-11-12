import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SortAsc, Plus, Eye, Edit } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Layout from "@/components/layout/Layout";

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

const books: Book[] = [
  {
    id: "book-1",
    title: "SSC CGL Complete Guide 2024",
    author: "Dr. R.K. Sharma",
    subject: "General Studies",
    category: "SSC",
    type: "Physical Book",
    thumb: "/assets/ssc-cgl.jpg",
    rating: 4.8,
    pages: 850,
    price: 599,
    originalPrice: 799,
    language: "English",
    edition: "Latest Edition",
    publication: "Genesis Publications",
    href: "/books/ssc-cgl-complete-guide",
  },
  {
    id: "book-2",
    title: "Banking Exam Master Guide",
    author: "Prof. A.K. Singh",
    subject: "Banking Awareness",
    category: "Banking",
    type: "E-Book",
    thumb: "/assets/bank-po.jpg",
    rating: 4.7,
    pages: 650,
    price: 399,
    originalPrice: 499,
    language: "English",
    edition: "2024 Edition",
    publication: "Genesis Publications",
    href: "/books/banking-exam-master",
  },
  {
    id: "book-3",
    title: "Quantitative Aptitude for Competitive Exams",
    author: "Dr. M.K. Pandey",
    subject: "Mathematics",
    category: "General",
    type: "Physical Book",
    thumb: "/assets/ssc-cgl.jpg",
    rating: 4.9,
    pages: 750,
    price: 699,
    originalPrice: 899,
    language: "English",
    edition: "Revised Edition",
    publication: "Genesis Publications",
    href: "/books/quantitative-aptitude",
  },
  {
    id: "book-4",
    title: "English Language & Comprehension",
    author: "Dr. S.P. Bakshi",
    subject: "English",
    category: "General",
    type: "Combo Pack",
    thumb: "/assets/bank-po.jpg",
    rating: 4.6,
    pages: 500,
    price: 799,
    originalPrice: 999,
    language: "English",
    edition: "Latest Edition",
    publication: "Genesis Publications",
    href: "/books/english-comprehension",
  },
  {
    id: "book-5",
    title: "General Knowledge Encyclopedia",
    author: "Team Genesis",
    subject: "General Knowledge",
    category: "General",
    type: "E-Book",
    thumb: "/assets/ssc-cgl.jpg",
    rating: 4.5,
    pages: 1200,
    price: 299,
    originalPrice: 399,
    language: "Hindi",
    edition: "2024 Edition",
    publication: "Genesis Publications",
    href: "/books/gk-encyclopedia",
  },
  {
    id: "book-6",
    title: "SSC CHSL Complete Package",
    author: "Dr. R.S. Aggarwal",
    subject: "All Subjects",
    category: "SSC",
    type: "Combo Pack",
    thumb: "/assets/bank-po.jpg",
    rating: 4.7,
    pages: 950,
    price: 1299,
    originalPrice: 1599,
    language: "English",
    edition: "Latest Edition",
    publication: "Genesis Publications",
    href: "/books/ssc-chsl-package",
  },
];

export default function AdminBook() {
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<string>("newest");

  const handleAddBook = useCallback(() => {
    navigate("/book-add");
  }, [navigate]);

 

  return (
    <Layout>
      <div className="hidden md:block min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-semibold text-foreground">
              Available Books
            </h2>

            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
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

              <Button onClick={handleAddBook} size="sm" className="bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Add Book
              </Button>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="px-4 py-3">Title</TableHead>
                  <TableHead className="px-4 py-3">Author</TableHead>
                  <TableHead className="hidden lg:table-cell px-4 py-3">
                    Category
                  </TableHead>
                  <TableHead className="hidden xl:table-cell px-4 py-3">
                    Type
                  </TableHead>
                  <TableHead className="text-right px-4 py-3">Price</TableHead>
                  <TableHead className="text-center px-4 py-3">Rating</TableHead>
                  <TableHead className="px-4 py-3 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {books.map((book) => (
                  <TableRow
                    key={book.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => navigate(`/book/${book.id}`)}
                  >
                    <TableCell className="font-medium px-4 py-3">
                      {book.title}
                    </TableCell>
                    <TableCell className="px-4 py-3">{book.author}</TableCell>
                    <TableCell className="hidden lg:table-cell px-4 py-3">
                      <Badge variant="secondary">{book.category}</Badge>
                    </TableCell>
                    <TableCell className="hidden xl:table-cell px-4 py-3">
                      {book.type}
                    </TableCell>
                    <TableCell className="text-right px-4 py-3">
                      {book.originalPrice && (
                        <span className="line-through text-muted-foreground mr-1">
                          ₹{book.originalPrice}
                        </span>
                      )}
                      <span className="font-semibold">₹{book.price}</span>
                    </TableCell>
                    <TableCell className="text-center px-4 py-3">
                      <Badge variant="outline">{book.rating} stars</Badge>
                    </TableCell>
                    <TableCell
                      className="px-4 py-3 text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-center gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book/${book.id}`);
                          }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"

                        >
                          <Eye className="h-4 w-4" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/book/${book.id}?edit=true`);
                          }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="md:hidden min-h-screen bg-background py-8 mt-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-xl font-semibold text-foreground">
              Available Books
            </h2>

            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36">
                  <SortAsc className="h-4 w-4 mr-1" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="price-low">Low to High</SelectItem>
                  <SelectItem value="price-high">High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleAddBook} size="sm" className="bg-blue-700">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <div className="flex gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-2 pr-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {book.author}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">{book.category}</Badge>
                      <Badge variant="outline">{book.type}</Badge>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div>
                        {book.originalPrice && (
                          <span className="line-through text-muted-foreground text-sm mr-1">
                            ₹{book.originalPrice}
                          </span>
                        )}
                        <span className="font-semibold">₹{book.price}</span>
                      </div>
                      <Badge variant="outline">{book.rating} stars</Badge>
                    </div>

                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/book/${book.id}`);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/book/${book.id}?edit=true`);
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}