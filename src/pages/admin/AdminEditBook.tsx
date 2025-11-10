import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ArrowLeft, Edit3, Save, X } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";

interface BookFormData {
  title: string;
  author: string;
  subject: string;
  category: string;
  type: string;
  price: string;
  language: string;
  edition: string;
  publication: string;
  thumb: File | null | string;
}

interface Book extends BookFormData {
  id: string;
  rating: number;
  pages: number;
  originalPrice?: number;
  href: string;
  thumb: string;
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
    price: "599",
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
    price: "399",
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
    price: "699",
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
    price: "799",
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
    price: "299",
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
    price: "1299",
    originalPrice: 1599,
    language: "English",
    edition: "Latest Edition",
    publication: "Genesis Publications",
    href: "/books/ssc-chsl-package",
  },
];

export default function AdminEditBook() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const isEditMode = searchParams.get("edit") === "true";

  const [formData, setFormData] = useState<BookFormData>({
    title: "",
    author: "",
    subject: "",
    category: "",
    type: "",
    price: "",
    language: "",
    edition: "",
    publication: "",
    thumb: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const book = books.find((b) => b.id === id);
    if (!book) {
      toast.error("Book not found");
      navigate("/book");
      return;
    }

    setFormData({
      title: book.title,
      author: book.author,
      subject: book.subject,
      category: book.category,
      type: book.type,
      price: book.price,
      language: book.language,
      edition: book.edition,
      publication: book.publication,
      thumb: book.thumb,
    });
    setLoading(false);
  }, [id, navigate]);

  const handleInputChange = (name: keyof Omit<BookFormData, "thumb">, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, thumb: file }));
  };

  const handleSave = () => {
    const index = books.findIndex((b) => b.id === id);
    if (index !== -1) {
      const updated = {
        ...books[index],
        title: formData.title,
        author: formData.author,
        subject: formData.subject,
        category: formData.category,
        type: formData.type,
        price: formData.price,
        language: formData.language,
        edition: formData.edition,
        publication: formData.publication,
        thumb: typeof formData.thumb === "string" ? formData.thumb : formData.thumb ? URL.createObjectURL(formData.thumb) : books[index].thumb,
      };
      books[index] = updated as Book;
    }
    toast.success("Book updated successfully!");
    setSearchParams({});
  };

  const toggleEditMode = () => {
    setSearchParams(isEditMode ? {} : { edit: "true" });
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg">Loading...</p>
        </div>
      </Layout>
    );
  }

  const currentBook = books.find((b) => b.id === id)!;

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden max-w-4xl mx-auto">
            <CardHeader className="bg-primary text-white pb-6 pt-6 sm:pb-8 sm:pt-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/20"
                    onClick={() => navigate("/book")}
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </Button>
                  <CardTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    {isEditMode ? "Edit Book" : "Book Details"}
                  </CardTitle>
                </div>

                <div className="flex gap-2">
                  {isEditMode ? (
                    <>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={toggleEditMode}
                        className="flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={toggleEditMode}
                      className="flex items-center gap-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-3">
                  
                  {isEditMode ? (
                    <div className="flex items-center gap-3">
                      {typeof formData.thumb === "string" && (
                        <img
                          src={formData.thumb}
                          alt="Thumb"
                          className="w-24 h-24 object-cover rounded-lg border"
                        />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="h-11"
                      />
                    </div>
                  ) : (
                    <img
                      src={currentBook.thumb}
                      alt={currentBook.title}
                      className="w-full max-w-xs md:max-w-none h-48 object-cover rounded-lg border"
                    />
                  )}
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant="secondary" className="text-sm">
                      {currentBook.category}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {currentBook.type}
                    </Badge>
                    <Badge variant="default" className="text-sm">
                      {currentBook.rating} stars
                    </Badge>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">₹{currentBook.price}</span>
                    {currentBook.originalPrice && (
                      <span className="text-lg line-through text-muted-foreground">
                        ₹{currentBook.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <p>{currentBook.pages} pages</p>
                    <p>{currentBook.language} • {currentBook.edition}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Title", key: "title" },
                    { label: "Author", key: "author" },
                    { label: "Subject", key: "subject" },
                    { label: "Category", key: "category" },
                    { label: "Type", key: "type" },
                    { label: "Language", key: "language" },
                    { label: "Edition", key: "edition" },
                    { label: "Publication", key: "publication" },
                  ].map(({ label, key }) => (
                    <div key={key} className="space-y-2">
                      <Label>{label}</Label>
                      {isEditMode ? (
                        <Input
                          value={formData[key as keyof Omit<BookFormData, "thumb">]}
                          onChange={(e) => handleInputChange(key as keyof Omit<BookFormData, "thumb">, e.target.value)}
                          className="h-11 rounded-xl border-2 border-gray-200 focus:border-red-500"
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                      ) : (
                        <p className="text-foreground font-medium">
                          {formData[key as keyof Omit<BookFormData, "thumb">] || "-"}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Price</Label>
                  {isEditMode ? (
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="h-11 rounded-xl border-2 border-gray-200 focus:border-red-500 w-full md:w-48"
                    />
                  ) : (
                    <p className="text-foreground font-medium">₹{formData.price}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}