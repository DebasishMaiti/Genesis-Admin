import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import {
  Search,
  Filter,
  Plus,
  FileText,
  Users,
  BarChart3,
  Eye,
  Edit
} from "lucide-react";

interface MCQSeries {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  price: number;
  duration: string;
  language: string;
  mcqCount: number;
  createdAt: string;
  status: 'published' | 'draft' | 'archived';
}

export default function AdminMcq() {
  const [series, setSeries] = useState<MCQSeries[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData: MCQSeries[] = [
      {
        id: '1',
        title: 'SSC CGL Mock Test Series 2025',
        description: 'Complete SSC CGL preparation test series',
        category: 'SSC',
        type: 'Mock Test',
        price: 999,
        duration: '3 Hours',
        language: 'Bilingual',
        mcqCount: 150,
        createdAt: '2024-01-15',
        status: 'published'
      },
      {
        id: '2',
        title: 'Banking PO Quantitative Aptitude',
        description: 'Quantitative aptitude practice for banking exams',
        category: 'Banking',
        type: 'Practice Test',
        price: 599,
        duration: '2 Hours',
        language: 'English',
        mcqCount: 100,
        createdAt: '2024-01-10',
        status: 'published'
      },
      {
        id: '3',
        title: 'UPSC Prelims GS Paper 1',
        description: 'General Studies paper 1 mock tests',
        category: 'UPSC',
        type: 'Mock Test',
        price: 1299,
        duration: '2 Hours',
        language: 'Hindi',
        mcqCount: 200,
        createdAt: '2024-01-08',
        status: 'draft'
      },
      {
        id: '4',
        title: 'Mathematics Chapter Wise Tests',
        description: 'Class 12 mathematics chapter-wise practice',
        category: 'Mathematics',
        type: 'Chapter Wise',
        price: 0,
        duration: '1 Hour',
        language: 'Bilingual',
        mcqCount: 75,
        createdAt: '2024-01-05',
        status: 'published'
      }
    ];

    setSeries(mockData);
    setLoading(false);
  }, []);

  const filteredSeries = series.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         s.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || s.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalMCQs = series.reduce((sum, s) => sum + s.mcqCount, 0);
  const publishedSeries = series.filter(s => s.status === 'published').length;
  const draftSeries = series.filter(s => s.status === 'draft').length;

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return (
      <Badge className={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      SSC: 'bg-blue-100 text-blue-800',
      Banking: 'bg-purple-100 text-purple-800',
      UPSC: 'bg-orange-100 text-orange-800',
      Mathematics: 'bg-green-100 text-green-800',
      Science: 'bg-red-100 text-red-800',
      'General Knowledge': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">MCQ Management</h1>
            <p className="text-muted-foreground">
              Manage all your MCQ series and questions
            </p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => navigate('/mcq-add')}>
            <Plus className="h-4 w-4" />
            Add New Series
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total MCQs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMCQs}</div>
              <p className="text-xs text-muted-foreground">Across all series</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Series</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedSeries}</div>
              <p className="text-xs text-muted-foreground">Active series</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Series</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftSeries}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>MCQ Series</CardTitle>
            <CardDescription>Manage and monitor all your MCQ test series</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search series..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="SSC">SSC</SelectItem>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="UPSC">UPSC</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Series Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="hidden lg:table-cell">Type</TableHead>
                    <TableHead>MCQs</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSeries.map((s) => (
                    <TableRow
                      key={s.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => navigate(`/mcq/${s.id}?mode=view`)}
                    >
                      <TableCell className="font-medium">{s.title}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(s.category)}>{s.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{s.type}</TableCell>
                      <TableCell>{s.mcqCount}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getStatusBadge(s.status)}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/mcq/${s.id}?mode=view`)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/mcq/${s.id}?mode=edit`)}
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

            {/* Mobile Cards */}
            <div className="md:hidden space-y-3">
              {filteredSeries.map((s) => (
                <div
                  key={s.id}
                  className="rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/mcq/${s.id}?mode=view`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{s.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-3">
                    <Badge className={getCategoryColor(s.category)}>{s.category}</Badge>
                    <span>• {s.type}</span>
                    <span>• {s.mcqCount} MCQs</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div>{getStatusBadge(s.status)}</div>
                    <div className="text-muted-foreground">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/mcq/${s.id}?mode=view`);
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/mcq/${s.id}?mode=edit`);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredSeries.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No MCQ series found matching your filters.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}