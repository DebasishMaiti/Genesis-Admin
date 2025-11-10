import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';
import Layout from '@/components/layout/Layout';

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
  pdf: File | null;
}

export default function AdminAddBook() {
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    author: '',
    subject: '',
    category: '',
    type: '',
    price: '',
    language: '',
    edition: '',
    publication: '',
    pdf: null,
  });

  const handleInputChange = (name: keyof BookFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, thumb: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Book submitted:', formData);
    setFormData({
      title: '',
      author: '',
      subject: '',
      category: '',
      type: '',
      price: '',
      language: '',
      edition: '',
      publication: '',
      pdf: null,
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden max-w-3xl mx-auto">
            <CardHeader className="bg-primary text-white pb-8 pt-8">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Add New Book
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                    Book Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., SSC CGL Complete Guide 2024"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author" className="text-sm font-semibold text-gray-700">
                    Author
                  </Label>
                  <Input
                    id="author"
                    name="author"
                    placeholder="e.g., Dr. R.K. Sharma"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    required
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="e.g., General Studies"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                      Category
                    </Label>
                    <Input
                      id="category"
                      name="category"
                      placeholder="e.g., SSC"
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm font-semibold text-gray-700">
                      Type
                    </Label>
                    <Input
                      id="type"
                      name="type"
                      placeholder="e.g., Physical Book"
                      value={formData.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-sm font-semibold text-gray-700">
                      Language
                    </Label>
                    <Input
                      id="language"
                      name="language"
                      placeholder="e.g., English"
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                      Price
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="e.g., 599"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    />
                  </div>
                                   
                  <div className="space-y-2">
                    <Label htmlFor="edition" className="text-sm font-semibold text-gray-700">
                      Edition
                    </Label>
                    <Input
                      id="edition"
                      name="edition"
                      placeholder="e.g., Latest Edition"
                      value={formData.edition}
                      onChange={(e) => handleInputChange('edition', e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="publication" className="text-sm font-semibold text-gray-700">
                      Publication
                    </Label>
                    <Input
                      id="publication"
                      name="publication"
                      placeholder="e.g., Genesis Publications"
                      value={formData.publication}
                      onChange={(e) => handleInputChange('publication', e.target.value)}
                      className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdf" className="text-sm font-semibold text-gray-700">
                    Upload File
                  </Label>
                  <Input
                    id="pdf"
                    name="pdf"
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                  />
                </div>
 
                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="h-12 px-8 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Add Book
                  </Button>
                </div>

              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}