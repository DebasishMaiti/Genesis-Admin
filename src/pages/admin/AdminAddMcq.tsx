import { useState, useEffect, useRef } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  AlertCircle,
  Plus,
  Trash2,
  Save,
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MCQ {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MCQSeries {
  title: string;
  description: string;
  category: string;
  type: string;
  price: number;
  duration: string;
  language: string;
  totalQuestions?: number;
  difficulty?: string;
}

export default function AdminAddMcq() {
  const [series, setSeries] = useState<MCQSeries>({
    title: '',
    description: '',
    category: '',
    type: '',
    price: 0,
    duration: '',
    language: '',
    totalQuestions: 0,
    difficulty: 'Medium'
  });

  const [mcqs, setMcqs] = useState<MCQ[]>([]);
  const [currentMcq, setCurrentMcq] = useState<MCQ>({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: -1,
    explanation: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const questionRef = useRef<HTMLTextAreaElement>(null);

  const categories = [
    'SSC',
    'UPSC',
    'Banking',
    'Railway',
    'Defense',
    'State PSC',
    'General Knowledge',
    'Science',
    'Mathematics',
    'Technology',
  ];

  const examTypes = [
    'Mock Test',
    'Practice Set',
    'Previous Year Paper',
    'Topic Wise Test',
    'Full Syllabus Test'
  ];

  const languages = [
    'English',
    'Hindi',
    'Bilingual',
    'Regional'
  ];

  const difficultyLevels = [
    'Easy',
    'Medium',
    'Hard',
    'Mixed'
  ];

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, [currentMcq.question]);

 
  useEffect(() => {
    setSeries(prev => ({
      ...prev,
      totalQuestions: mcqs.length
    }));
  }, [mcqs.length]);

  const validateCurrentMcq = (): boolean => {
    const errs: string[] = [];
    if (!currentMcq.question.trim()) errs.push('Question is required');
    if (currentMcq.options.some((opt) => !opt.trim()))
      errs.push('All 4 options must be filled');
    if (currentMcq.correctAnswer === -1)
      errs.push('Select the correct answer');
    if (!currentMcq.explanation.trim())
      errs.push('Explanation is required');
    setErrors(errs);
    return errs.length === 0;
  };

  const addMcq = () => {
    if (!validateCurrentMcq()) return;

    setMcqs((prev) => [...prev, { ...currentMcq }]);
    setCurrentMcq({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: -1,
      explanation: '',
    });
    setErrors([]);
    setSuccessMessage('MCQ added! You can add another.');
    saveDraft();
  };

  const removeMcq = (index: number) => {
    setMcqs((prev) => prev.filter((_, i) => i !== index));
    saveDraft();
  };

  const saveDraft = () => {
    console.log('Saving draft...');
  };

  const submitSeries = () => {
    if (!series.title || !series.description || !series.category || !series.type || !series.duration || !series.language) {
      alert('Please fill in all series details');
      return;
    }
    if (mcqs.length === 0) {
      alert('Add at least one MCQ');
      return;
    }

    const payload = { 
      series: {
        ...series,
        totalQuestions: mcqs.length
      }, 
      mcqs 
    };
    
    console.log('Final Submission:', payload);
    alert(`Series "${series.title}" with ${mcqs.length} MCQs submitted!`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 max-w-5xl space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Add MCQ Series
        </h1>

        {/* Success Message */}
        {successMessage && (
          <Alert className="border-green-600 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Series Form */}
        <Card>
          <CardHeader>
            <CardTitle>MCQ Series Details</CardTitle>
            <CardDescription>
              Complete information about the test series
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Series Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., SSC CGL Mock Test Series 2025"
                  value={series.title}
                  onChange={(e) =>
                    setSeries({ ...series, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={series.category}
                  onValueChange={(v) => setSeries({ ...series, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the test series..."
                value={series.description}
                onChange={(e) =>
                  setSeries({ ...series, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Exam Type *</Label>
                <Select
                  value={series.type}
                  onValueChange={(v) => setSeries({ ...series, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">
                  Price (₹) *
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="999"
                    value={series.price}
                    onChange={(e) =>
                      setSeries({ ...series, price: Number(e.target.value) })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">
                  Duration *
                </Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="duration"
                    placeholder="3 Hours"
                    value={series.duration}
                    onChange={(e) =>
                      setSeries({ ...series, duration: e.target.value })
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select
                  value={series.language}
                  onValueChange={(v) => setSeries({ ...series, language: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalQuestions">Total Questions</Label>
                <Input
                  id="totalQuestions"
                  type="number"
                  value={mcqs.length}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Auto-calculated from added MCQs
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select
                  value={series.difficulty}
                  onValueChange={(v) => setSeries({ ...series, difficulty: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficultyLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add MCQ Form */}
        <Card>
          <CardHeader>
            <CardTitle>Add New MCQ</CardTitle>
            <CardDescription>
              Fill in the question, 4 options, correct answer, and explanation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {errors.length > 0 && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div>
              <Label htmlFor="question">Question</Label>
              <Textarea
                ref={questionRef}
                id="question"
                placeholder="What is the capital of France?"
                value={currentMcq.question}
                onChange={(e) =>
                  setCurrentMcq({ ...currentMcq, question: e.target.value })
                }
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="space-y-4">
              <Label>Options (select correct one)</Label>
              <RadioGroup
                value={currentMcq.correctAnswer.toString()}
                onValueChange={(v) =>
                  setCurrentMcq({
                    ...currentMcq,
                    correctAnswer: parseInt(v),
                  })
                }
              >
                {currentMcq.options.map((opt, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                  >
                    <RadioGroupItem value={idx.toString()} id={`opt-${idx}`} />
                    <Input
                      placeholder={`Option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...currentMcq.options];
                        newOpts[idx] = e.target.value;
                        setCurrentMcq({ ...currentMcq, options: newOpts });
                      }}
                      className="flex-1"
                    />
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="explanation">Explanation</Label>
              <Textarea
                id="explanation"
                placeholder="Paris is the capital because..."
                value={currentMcq.explanation}
                onChange={(e) =>
                  setCurrentMcq({
                    ...currentMcq,
                    explanation: e.target.value,
                  })
                }
                rows={3}
                className="resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={addMcq} className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Add This MCQ
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentMcq({
                    question: '',
                    options: ['', '', '', ''],
                    correctAnswer: -1,
                    explanation: '',
                  })
                }
                type="button"
              >
                Clear Form
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview Added MCQs */}
        {mcqs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>
                Added MCQs ({mcqs.length}) —{' '}
                <span className="text-sm font-normal text-muted-foreground">
                  Click trash to remove
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mcqs.map((mcq, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 space-y-3 relative hover:shadow-sm transition-shadow"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 text-red-500 hover:bg-red-50"
                    onClick={() => removeMcq(idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <p className="font-semibold text-lg">
                    Q{idx + 1}: {mcq.question}
                  </p>

                  <ol className="space-y-1 text-sm">
                    {mcq.options.map((opt, i) => (
                      <li
                        key={i}
                        className={`flex items-center gap-2 ${
                          i === mcq.correctAnswer
                            ? 'text-green-600 font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <span className="font-mono text-xs">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                        {i === mcq.correctAnswer && (
                          <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            Correct
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>

                  <details className="text-sm text-muted-foreground mt-2">
                    <summary className="cursor-pointer font-medium text-foreground">
                      View Explanation
                    </summary>
                    <p className="mt-1 italic">{mcq.explanation}</p>
                  </details>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button
            variant="secondary"
            size="lg"
            onClick={saveDraft}
            className="flex-1 sm:flex-initial min-w-[180px]"
          >
            <FileText className="mr-2 h-5 w-5" />
            Save as Draft
          </Button>

          <Button
            size="lg"
            onClick={submitSeries}
            disabled={mcqs.length === 0}
            className="flex-1 sm:flex-initial min-w-[180px]"
          >
            <Save className="mr-2 h-5 w-5" />
            Publish Series ({mcqs.length} MCQs)
          </Button>
        </div>
      </div>
    </Layout>
  );
}