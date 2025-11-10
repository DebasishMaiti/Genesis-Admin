import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  AlertCircle,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Edit,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

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
  mcqs: MCQ[];
}

export default function AdminEditMcq() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const seriesId = params.id as string;
 
  const mode = searchParams.get('mode') || 'view';

  const [series, setSeries] = useState<MCQSeries | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [editingMcq, setEditingMcq] = useState<MCQ | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 
  useEffect(() => {
    const mockSeries: MCQSeries[] = [
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
        status: 'published',
        mcqs: [
          {
            id: '1-1',
            question: 'What is the capital of France?',
            options: ['London', 'Berlin', 'Paris', 'Madrid'],
            correctAnswer: 2,
            explanation: 'Paris is the capital and most populous city of France.'
          },
          {
            id: '1-2',
            question: 'Which of the following is not a programming language?',
            options: ['Python', 'Java', 'HTML', 'C++'],
            correctAnswer: 2,
            explanation: 'HTML is a markup language, not a programming language.'
          },
          {
            id: '1-3',
            question: 'What is 2 + 2?',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1,
            explanation: 'Basic arithmetic: 2 + 2 = 4'
          }
        ]
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
        status: 'published',
        mcqs: [
          {
            id: '2-1',
            question: 'What is the square root of 64?',
            options: ['6', '7', '8', '9'],
            correctAnswer: 2,
            explanation: '8 × 8 = 64, so the square root is 8.'
          }
        ]
      }
    ];

    const foundSeries = mockSeries.find(s => s.id === seriesId);
    setSeries(foundSeries || null);
    setLoading(false);
  }, [seriesId]);
 
  const isEditMode = mode === 'edit';

  const handleSeriesUpdate = (field: keyof MCQSeries, value: any) => {
    if (series && isEditMode) {
      setSeries({ ...series, [field]: value });
    }
  };

  const validateMcq = (mcq: MCQ): boolean => {
    const errs: string[] = [];
    if (!mcq.question.trim()) errs.push('Question is required');
    if (mcq.options.some(opt => !opt.trim())) errs.push('All options must be filled');
    if (mcq.correctAnswer === -1) errs.push('Correct answer must be selected');
    if (!mcq.explanation.trim()) errs.push('Explanation is required');
    return errs.length === 0;
  };

  const handleSaveMcq = () => {
    if (!editingMcq || !series || !isEditMode) return;

    if (!validateMcq(editingMcq)) {
      setErrors(['Please fill all required fields for the MCQ']);
      return;
    }

    const updatedMcqs = editingMcq.id 
      ? series.mcqs.map(mcq => mcq.id === editingMcq.id ? editingMcq : mcq)
      : [...series.mcqs, { ...editingMcq, id: `${series.id}-${Date.now()}` }];

    setSeries({
      ...series,
      mcqs: updatedMcqs,
      mcqCount: updatedMcqs.length
    });

    setEditingMcq(null);
    setIsEditModalOpen(false);
    setErrors([]);
    setSuccessMessage(editingMcq.id ? 'MCQ updated successfully!' : 'MCQ added successfully!');
  };

  const handleDeleteMcq = (mcqId: string) => {
    if (!series || !isEditMode) return;
    
    const updatedMcqs = series.mcqs.filter(mcq => mcq.id !== mcqId);
    setSeries({
      ...series,
      mcqs: updatedMcqs,
      mcqCount: updatedMcqs.length
    });
    setSuccessMessage('MCQ deleted successfully!');
  };

  const handleAddNewMcq = () => {
    if (!isEditMode) return;
    
    setEditingMcq({
      id: '',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: -1,
      explanation: ''
    });
    setIsEditModalOpen(true);
    setErrors([]);
  };

  const handleEditMcq = (mcq: MCQ) => {
    if (!isEditMode) return;
    
    setEditingMcq({ ...mcq });
    setIsEditModalOpen(true);
    setErrors([]);
  };

  const handleViewMcq = (mcq: MCQ) => {
    setEditingMcq({ ...mcq });
    setIsEditModalOpen(true);
    setErrors([]);
  };

  const handleSaveSeries = async () => {
    if (!series || !isEditMode) return;

    setSaving(true);
    setErrors([]);
 
    const seriesErrors = [];
    if (!series.title.trim()) seriesErrors.push('Series title is required');
    if (!series.description.trim()) seriesErrors.push('Description is required');
    if (!series.category) seriesErrors.push('Category is required');
    if (series.mcqs.length === 0) seriesErrors.push('At least one MCQ is required');

    if (seriesErrors.length > 0) {
      setErrors(seriesErrors);
      setSaving(false);
      return;
    }
 
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving series:', series);
      setSuccessMessage('Series updated successfully!');
    } catch (error) {
      setErrors(['Failed to save series. Please try again.']);
    } finally {
      setSaving(false);
    }
  };

  const switchToEditMode = () => {
    navigate(`/mcq/${seriesId}?mode=edit`);
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      SSC: 'bg-blue-100 text-blue-800',
      Banking: 'bg-purple-100 text-purple-800',
      UPSC: 'bg-orange-100 text-orange-800',
      Mathematics: 'bg-green-100 text-green-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

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

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto p-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!series) {
    return (
      <Layout>
        <div className="container mx-auto p-4 text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Series Not Found</h1>
          <p className="text-muted-foreground mb-4">The requested MCQ series could not be found.</p>
          <Button onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">
                  {isEditMode ? 'Edit MCQ Series' : 'View MCQ Series'}
                </h1>
                <Badge variant={isEditMode ? "default" : "secondary"}>
                  {isEditMode ? 'Edit Mode' : 'View Mode'}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                {isEditMode 
                  ? `Manage questions and settings for ${series.title}`
                  : `Viewing details for ${series.title}`
                }
              </p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {!isEditMode ? (
              <Button onClick={switchToEditMode} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit Series
              </Button>
            ) : (
              <Button 
                onClick={handleSaveSeries} 
                disabled={saving}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            )}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <Alert className="border-green-600 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Error Message */}
        {errors.length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {/* Series Details */}
        <Card>
          <CardHeader>
            <CardTitle>Series Information</CardTitle>
            <CardDescription>
              {isEditMode 
                ? 'Update basic information about this MCQ series'
                : 'Basic information about this MCQ series'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Title Field */}
              {isEditMode ? (
                <div>
                  <Label htmlFor="title">Series Title</Label>
                  <Input
                    id="title"
                    value={series.title}
                    onChange={(e) => handleSeriesUpdate('title', e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Series Title</Label>
                  <div className="mt-1 text-sm">{series.title}</div>
                </div>
              )}
              
              {/* Category Field */}
              {isEditMode ? (
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={series.category} onValueChange={(v) => handleSeriesUpdate('category', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SSC">SSC</SelectItem>
                      <SelectItem value="Banking">Banking</SelectItem>
                      <SelectItem value="UPSC">UPSC</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Category</Label>
                  <div className="mt-1">
                    <Badge className={getCategoryColor(series.category)}>
                      {series.category}
                    </Badge>
                  </div>
                </div>
              )}
            </div>

            {/* Description Field */}
            {isEditMode ? (
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={series.description}
                  onChange={(e) => handleSeriesUpdate('description', e.target.value)}
                  rows={3}
                />
              </div>
            ) : (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <div className="mt-1 text-sm">{series.description}</div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Type Field */}
              {isEditMode ? (
                <div>
                  <Label htmlFor="type">Series Type</Label>
                  <Select value={series.type} onValueChange={(v) => handleSeriesUpdate('type', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mock Test">Mock Test</SelectItem>
                      <SelectItem value="Practice Test">Practice Test</SelectItem>
                      <SelectItem value="Chapter Wise">Chapter Wise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Series Type</Label>
                  <div className="mt-1 text-sm">{series.type}</div>
                </div>
              )}
              
              {/* Duration Field */}
              {isEditMode ? (
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Select value={series.duration} onValueChange={(v) => handleSeriesUpdate('duration', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 Hour">1 Hour</SelectItem>
                      <SelectItem value="2 Hours">2 Hours</SelectItem>
                      <SelectItem value="3 Hours">3 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Duration</Label>
                  <div className="mt-1 text-sm">{series.duration}</div>
                </div>
              )}
              
              {/* Language Field */}
              {isEditMode ? (
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select value={series.language} onValueChange={(v) => handleSeriesUpdate('language', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Hindi">Hindi</SelectItem>
                      <SelectItem value="Bilingual">Bilingual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Language</Label>
                  <div className="mt-1 text-sm">{series.language}</div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price Field */}
              {isEditMode ? (
                <div>
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={series.price}
                    onChange={(e) => handleSeriesUpdate('price', Number(e.target.value))}
                  />
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Price</Label>
                  <div className="mt-1 text-sm">₹{series.price}</div>
                </div>
              )}
              
              {/* Status Field */}
              {isEditMode ? (
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={series.status} onValueChange={(v) => handleSeriesUpdate('status', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(series.status)}</div>
                </div>
              )}
            </div>

            {/* Read-only fields for both modes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Total Questions</Label>
                <div className="mt-1 text-sm">{series.mcqCount}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Created Date</Label>
                <div className="mt-1 text-sm">{new Date(series.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MCQs Management */}
        <Card>
          <CardHeader>
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <CardTitle>MCQ Questions ({series.mcqCount})</CardTitle>
                <CardDescription>
                  {isEditMode 
                    ? 'Manage all questions in this series'
                    : 'All questions in this series'
                  }
                </CardDescription>
              </div>
              {isEditMode && (
                <Button onClick={handleAddNewMcq} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New MCQ
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {series.mcqs.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No questions added yet.</p>
                {isEditMode && (
                  <Button variant="outline" onClick={handleAddNewMcq} className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Question
                  </Button>
                )}
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Question</TableHead>
                      <TableHead className="hidden md:table-cell">Correct Answer</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {series.mcqs.map((mcq, index) => (
                      <TableRow key={mcq.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="font-medium line-clamp-2">{mcq.question}</div>
                          <div className="text-sm text-muted-foreground md:hidden">
                            Correct: {mcq.options[mcq.correctAnswer]}
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            {mcq.options[mcq.correctAnswer]}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {isEditMode ? (
                              <>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditMcq(mcq)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteMcq(mcq.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewMcq(mcq)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit/View MCQ Modal */}
        {isEditModalOpen && editingMcq && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {isEditMode 
                        ? (editingMcq.id ? 'Edit MCQ' : 'Add New MCQ')
                        : 'View MCQ'
                      }
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsEditModalOpen(false);
                        setEditingMcq(null);
                      }}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="edit-question">Question</Label>
                    {isEditMode ? (
                      <Textarea
                        id="edit-question"
                        value={editingMcq.question}
                        onChange={(e) => setEditingMcq({ ...editingMcq, question: e.target.value })}
                        rows={3}
                        placeholder="Enter the question..."
                      />
                    ) : (
                      <div className="mt-1 p-3 border rounded-md bg-gray-50">
                        {editingMcq.question}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label>Options {isEditMode && '(select correct answer)'}</Label>
                    {isEditMode ? (
                      <RadioGroup
                        value={editingMcq.correctAnswer.toString()}
                        onValueChange={(v) => setEditingMcq({ ...editingMcq, correctAnswer: parseInt(v) })}
                      >
                        {editingMcq.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-3 p-2 rounded-lg border-none">
                            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...editingMcq.options];
                                newOptions[index] = e.target.value;
                                setEditingMcq({ ...editingMcq, options: newOptions });
                              }}
                              placeholder={`Option ${index + 1}`}
                              className="flex-1"
                            />
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <div className="space-y-2">
                        {editingMcq.options.map((option, index) => (
                          <div
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${
                              index === editingMcq.correctAnswer
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full border ${
                              index === editingMcq.correctAnswer
                                ? 'border-green-500 bg-green-500'
                                : 'border-gray-400'
                            }`} />
                            <span className={index === editingMcq.correctAnswer ? 'font-medium text-green-800' : ''}>
                              {option}
                            </span>
                            {index === editingMcq.correctAnswer && (
                              <Badge className="bg-green-100 text-green-800 ml-auto">
                                Correct
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="edit-explanation">Explanation</Label>
                    {isEditMode ? (
                      <Textarea
                        id="edit-explanation"
                        value={editingMcq.explanation}
                        onChange={(e) => setEditingMcq({ ...editingMcq, explanation: e.target.value })}
                        rows={3}
                        placeholder="Explain why this answer is correct..."
                      />
                    ) : (
                      <div className="mt-1 p-3 border rounded-md bg-gray-50">
                        {editingMcq.explanation}
                      </div>
                    )}
                  </div>

                  {isEditMode && (
                    <div className="flex gap-3 pt-4">
                      <Button onClick={handleSaveMcq} className="flex-1">
                        <Save className="mr-2 h-4 w-4" />
                        {editingMcq.id ? 'Update MCQ' : 'Add MCQ'}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsEditModalOpen(false);
                          setEditingMcq(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}