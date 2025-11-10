import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BookOpen, 
  X, 
  ArrowLeft, 
  Loader2, 
  ChevronDown, 
  Edit3,
  Check,
  Users,
  DollarSign,
  
} from "lucide-react";
import Layout from "@/components/layout/Layout";

// Mock Data (same as list page)
interface Exam {
  id: string;
  category: string;
  examName: string;
  title: string;
  subjects: string[];
  rating: number;
  students: number;
  teachers: number;
  price: number;
  href: string;
}

const examsData: { list: Exam[] } = {
  list: [
    {
      id: "ge1",
      category: "SSC",
      examName: "SSC CGL",
      title: "SSC CGL (Combined Graduate Level)",
      subjects: ["Quantitative Aptitude", "English", "General Awareness", "Reasoning"],
      rating: 4.8,
      students: 15420,
      teachers: 12,
      price: 12999,
      href: "/government-exam/ssc-cgl"
    },
    {
      id: "ge2",
      category: "SSCx",
      examName: "SSC CHSL",
      title: "SSC CHSL (Combined Higher Secondary Level)",
      subjects: ["Quantitative Aptitude", "English", "General Awareness", "Reasoning"],
      rating: 4.7,
      students: 12340,
      teachers: 10,
      price: 10999,
      href: "/government-exam/ssc-chsl"
    },
    {
      id: "ge3",
      category: "Banking",
      examName: "IBPS PO",
      title: "IBPS PO (Probationary Officer)",
      subjects: ["Quantitative Aptitude", "English", "Reasoning", "General Awareness", "Computer Knowledge"],
      rating: 4.9,
      students: 18750,
      teachers: 15,
      price: 14999,
      href: "/government-exam/ibps-po"
    },
    {
      id: "ge4",
      category: "Banking",
      examName: "SBI Clerk",
      title: "SBI Clerk",
      subjects: ["Quantitative Aptitude", "English", "Reasoning", "General Awareness", "Computer Knowledge"],
      rating: 4.6,
      students: 14200,
      teachers: 12,
      price: 11999,
      href: "/government-exam/sbi-clerk"
    },
    {
      id: "ge5",
      category: "Railways",
      examName: "RRB NTPC",
      title: "RRB NTPC (Non-Technical Popular Categories)",
      subjects: ["Mathematics", "General Intelligence", "General Awareness", "General Science"],
      rating: 4.7,
      students: 13560,
      teachers: 11,
      price: 10999,
      href: "/government-exam/rrb-ntpc"
    },
    {
      id: "ge6",
      category: "Railways",
      examName: "RRB Group D",
      title: "RRB Group D",
      subjects: ["Mathematics", "General Intelligence", "General Awareness", "General Science"],
      rating: 4.5,
      students: 11230,
      teachers: 9,
      price: 9999,
      href: "/government-exam/rrb-group-d"
    },
    {
      id: "ge7",
      category: "Defence",
      examName: "NDA",
      title: "NDA (National Defence Academy)",
      subjects: ["Mathematics", "General Ability Test", "English", "General Knowledge"],
      rating: 4.8,
      students: 9840,
      teachers: 10,
      price: 13999,
      href: "/government-exam/nda"
    },
    {
      id: "ge8",
      category: "Defence",
      examName: "CDS",
      title: "CDS (Combined Defence Services)",
      subjects: ["English", "General Knowledge", "Elementary Mathematics"],
      rating: 4.7,
      students: 8520,
      teachers: 9,
      price: 12999,
      href: "/government-exam/cds"
    },
    {
      id: "ge9",
      category: "Insurance",
      examName: "LIC AAO",
      title: "LIC AAO (Assistant Administrative Officer)",
      subjects: ["Reasoning", "English", "General Knowledge", "Quantitative Aptitude"],
      rating: 4.6,
      students: 7890,
      teachers: 8,
      price: 11999,
      href: "/government-exam/lic-aao"
    },
    {
      id: "ge10",
      category: "Teaching",
      examName: "CTET",
      title: "CTET (Central Teacher Eligibility Test)",
      subjects: ["Child Development", "Language I", "Language II", "Mathematics", "Environmental Studies"],
      rating: 4.5,
      students: 10450,
      teachers: 10,
      price: 9999,
      href: "/government-exam/ctet"
    },
    {
      id: "ge11",
      category: "State PSC",
      examName: "MPSC",
      title: "MPSC (Maharashtra Public Service Commission)",
      subjects: ["General Studies", "CSAT", "Optional Subject", "Current Affairs"],
      rating: 4.7,
      students: 6780,
      teachers: 8,
      price: 14999,
      href: "/government-exam/mpsc"
    },
    {
      id: "ge12",
      category: "UPSC",
      examName: "UPSC CSE",
      title: "UPSC Civil Services Examination",
      subjects: ["General Studies", "CSAT", "Optional Subject", "Essay", "Ethics"],
      rating: 4.9,
      students: 8920,
      teachers: 14,
      price: 24999,
      href: "/government-exam/upsc-cse"
    }
  ]
};

const ALL_SUBJECTS = [
  "Quantitative Aptitude",
  "English",
  "General Awareness",
  "Reasoning",
  "Mathematics",
  "General Intelligence",
  "General Science",
  "Computer Knowledge",
  "Child Development",
  "Language I",
  "Language II",
  "Environmental Studies",
  "General Studies",
  "CSAT",
  "Optional Subject",
  "Current Affairs",
  "Essay",
  "Ethics",
  "Elementary Mathematics",
  "General Ability Test",
  "Indian History",
  "Indian Polity"
];

interface ExamFormData {
  id?: string;
  category: string;
  examName: string;
  title: string;
  subjects: string[];
  students: string;
  teachers: string;
  price: string;
  studyMaterials: File[];
}

export default function AdminEditGovExam() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams(); // Read query params
  const navigate = useNavigate();

  const [currentMode, setCurrentMode] = useState<'view' | 'edit'>('view');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);

  const [examFormData, setExamFormData] = useState<ExamFormData>({
    category: "",
    examName: "",
    title: "",
    subjects: [],
    students: "",
    teachers: "",
    price: "",
    studyMaterials: [],
  });

  // Set mode based on query params: ?edit=true or ?view=true
  useEffect(() => {
    const edit = searchParams.get("edit");
    const view = searchParams.get("view");

    if (edit === "true") {
      setCurrentMode("edit");
    } else if (view === "true") {
      setCurrentMode("view");
    }
    // Default is 'view'
  }, [searchParams]);

  // Load exam data
  useEffect(() => {
    if (!id) {
      setError("No exam ID provided");
      setLoading(false);
      return;
    }

    const loadExam = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const exam = examsData.list.find(ex => ex.id === id);
        if (!exam) {
          setError("Exam not found");
          return;
        }

        setExamFormData({
          id: exam.id,
          category: exam.category,
          examName: exam.examName,
          title: exam.title,
          subjects: exam.subjects,
          students: exam.students.toString(),
          teachers: exam.teachers.toString(),
          price: exam.price.toString(),
          studyMaterials: [],
        });
      } catch (err) {
        setError("Failed to load exam data");
      } finally {
        setLoading(false);
      }
    };

    loadExam();
  }, [id]);

  const handleInputChange = (name: keyof ExamFormData, value: string) => {
    setExamFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectToggle = (subject: string) => {
    setExamFormData((prev) => {
      const subjects = prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];
      return { ...prev, subjects };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Max 10MB.`);
        return false;
      }
      return true;
    });
    setExamFormData((prev) => ({
      ...prev,
      studyMaterials: [...prev.studyMaterials, ...validFiles],
    }));
  };

  const removeFile = (fileName: string) => {
    setExamFormData((prev) => ({
      ...prev,
      studyMaterials: prev.studyMaterials.filter((f) => f.name !== fileName),
    }));
  };

  const removeSubject = (subject: string) => {
    setExamFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s !== subject),
    }));
  };

  const isFormValid = () => {
    return (
      examFormData.category &&
      examFormData.examName.trim() &&
      examFormData.title.trim() &&
      examFormData.subjects.length > 0 &&
      Number(examFormData.students) >= 0 &&
      Number(examFormData.teachers) >= 0 &&
      Number(examFormData.price) > 0
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill all required fields.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Updated Exam:", examFormData);
      alert("Exam updated successfully!");
      setCurrentMode('view');
      setExamFormData((prev) => ({ ...prev, studyMaterials: [] }));
      // Update URL to ?view=true after save
      navigate(`?view=true`, { replace: true });
    } catch (err) {
      setError("Failed to update exam.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    const exam = examsData.list.find(ex => ex.id === id);
    if (exam) {
      setExamFormData({
        id: exam.id,
        category: exam.category,
        examName: exam.examName,
        title: exam.title,
        subjects: exam.subjects,
        students: exam.students.toString(),
        teachers: exam.teachers.toString(),
        price: exam.price.toString(),
        studyMaterials: [],
      });
    }
    setCurrentMode('view');
    setIsSubjectsOpen(false);
    navigate(`?view=true`, { replace: true });
  };

  const startEditing = () => {
    setCurrentMode('edit');
    navigate(`?edit=true`, { replace: true });
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
            <p className="text-lg font-medium text-muted-foreground">Loading exam...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <X className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold">Error</h3>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button onClick={() => navigate('/gov-exam')} className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Exams
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate('/gov-exam')}
              className="mb-4 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Exams
            </Button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {examFormData.category}
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {currentMode === 'view' ? 'View' : 'Edit'} Exam Details
                </h1>
              </div>

              <div className="flex gap-2">
               {currentMode === 'view' && (
                <Button
                  type="button"
                  onClick={startEditing}
                  className={`${buttonVariants({ variant: "outline" })} border-gray-300 text-gray-800 hover:bg-gray-100`}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              )}

                {currentMode === 'edit' && (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    > 
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      form="editForm"
                      disabled={saving || !isFormValid()}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden max-w-4xl mx-auto">
            <CardHeader className="bg-primary text-white pb-8 pt-8">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                {examFormData.examName}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form id="editForm" onSubmit={handleSubmit} className="space-y-6">
                {/* Category and Exam Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                      Exam Category
                    </Label>
                    {currentMode === 'view' ? (
                      <p className="text-sm font-medium">{examFormData.category}</p>
                    ) : (
                      <Select
                        value={examFormData.category}
                        onValueChange={(value) => handleInputChange("category", value)}
                        required
                      >
                        <SelectTrigger id="category" className="h-12 rounded-xl">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SSC">SSC</SelectItem>
                          <SelectItem value="UPSC">UPSC</SelectItem>
                          <SelectItem value="Banking">Banking</SelectItem>
                          <SelectItem value="Railways">Railways</SelectItem>
                          <SelectItem value="Defence">Defence</SelectItem>
                          <SelectItem value="Insurance">Insurance</SelectItem>
                          <SelectItem value="Teaching">Teaching</SelectItem>
                          <SelectItem value="State PSC">State PSC</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="examName" className="text-sm font-semibold text-gray-700">
                      Exam Name
                    </Label>
                    {currentMode === 'view' ? (
                      <p className="text-sm font-medium">{examFormData.examName}</p>
                    ) : (
                      <Input
                        id="examName"
                        value={examFormData.examName}
                        onChange={(e) => handleInputChange("examName", e.target.value)}
                        className="h-12 rounded-xl"
                        required
                      />
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                    Exam Title
                  </Label>
                  {currentMode === 'view' ? (
                    <p className="text-sm font-medium">{examFormData.title}</p>
                  ) : (
                    <Input
                      id="title"
                      value={examFormData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="h-12 rounded-xl"
                      required
                    />
                  )}
                </div>

                {/* Subjects */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Subjects
                  </Label>
                  {currentMode === 'view' ? (
                    <div className="flex flex-wrap gap-2">
                      {examFormData.subjects.map((subject) => (
                        <span key={subject} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
                          className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 text-left text-sm text-gray-700 flex items-center justify-between"
                        >
                          <span>
                            {examFormData.subjects.length > 0
                              ? `${examFormData.subjects.length} subject(s) selected`
                              : "Select subjects"}
                          </span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${isSubjectsOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isSubjectsOpen && (
                          <div className="absolute z-10 mt-2 w-full bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                            {ALL_SUBJECTS.map((subject) => (
                              <label
                                key={subject}
                                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  checked={examFormData.subjects.includes(subject)}
                                  onChange={() => handleSubjectToggle(subject)}
                                  className="h-4 w-4 text-red-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm">{subject}</span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                      {examFormData.subjects.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {examFormData.subjects.map((subject) => (
                            <div
                              key={subject}
                              className="flex items-center bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full"
                            >
                              {subject}
                              <button
                                type="button"
                                onClick={() => removeSubject(subject)}
                                className="ml-2"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Study Materials */}
                <div className="space-y-2">
                  <Label htmlFor="studyMaterials" className="text-sm font-semibold text-gray-700">
                    Study Materials
                  </Label>
                  {currentMode === 'view' ? (
                    <p className="text-sm text-gray-500">No files uploaded</p>
                  ) : (
                    <>
                      <Input
                        id="studyMaterials"
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                        onChange={handleFileChange}
                        className="h-12 rounded-xl"
                      />
                      {examFormData.studyMaterials.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {examFormData.studyMaterials.map((file) => (
                            <div
                              key={file.name}
                              className="flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                            >
                              {file.name}
                              <button
                                type="button"
                                onClick={() => removeFile(file.name)}
                                className="ml-2"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Students
                    </Label>
                    {currentMode === 'view' ? (
                      <p className="text-sm font-medium">{Number(examFormData.students).toLocaleString()}</p>
                    ) : (
                      <Input
                        type="number"
                        value={examFormData.students}
                        onChange={(e) => handleInputChange("students", e.target.value)}
                        min="0"
                        className="h-12 rounded-xl"
                        required
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Teachers
                    </Label>
                    {currentMode === 'view' ? (
                      <p className="text-sm font-medium">{examFormData.teachers}</p>
                    ) : (
                      <Input
                        type="number"
                        value={examFormData.teachers}
                        onChange={(e) => handleInputChange("teachers", e.target.value)}
                        min="0"
                        className="h-12 rounded-xl"
                        required
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price (INR)
                    </Label>
                    {currentMode === 'view' ? (
                      <p className="text-sm font-medium">₹{Number(examFormData.price).toLocaleString()}</p>
                    ) : (
                      <Input
                        type="number"
                        value={examFormData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        min="0"
                        className="h-12 rounded-xl"
                        required
                      />
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}