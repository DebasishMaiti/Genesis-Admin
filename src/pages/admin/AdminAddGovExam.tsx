import { useState } from 'react';
import { Button } from "@/components/ui/button";
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
import { BookOpen, X, ChevronDown } from 'lucide-react';
import Layout from '@/components/layout/Layout';

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
  category: string;
  examName: string;
  title: string;
  subjects: string[];
  students: string;
  teachers: string;
  price: string;
  studyMaterials: File[]; 
}

export default function AdminAddGovExam() { 
  const [examFormData, setExamFormData] = useState<ExamFormData>({
    category: '',
    examName: '',
    title: '',
    subjects: [],
    students: '',
    teachers: '',
    price: '',
    studyMaterials: [], 
  });
 
  const [isSubjectsOpen, setIsSubjectsOpen] = useState(false);
 
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
 
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     setExamFormData((prev) => ({
  //       ...prev,
  //       studyMaterials: [...prev.studyMaterials, ...Array.from(files)],  
  //     }));
  //   }
  // };
 
  // const removeFile = (fileName: string) => {
  //   setExamFormData((prev) => ({
  //     ...prev,
  //     studyMaterials: prev.studyMaterials.filter((file) => file.name !== fileName),
  //   }));
  // };
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New Exam Created:', examFormData);
    alert('Exam created successfully!');
   
    setExamFormData({
      category: '',
      examName: '',
      title: '',
      subjects: [],
      students: '',
      teachers: '',
      price: '',
      studyMaterials: [],
    });
    setIsSubjectsOpen(false);
  };

  const removeSubject = (subject: string) => {
    setExamFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((s) => s !== subject),
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden max-w-4xl mx-auto">
            <CardHeader className="bg-primary text-white pb-8 pt-8">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <BookOpen className="w-6 h-6" />
                Create New Government Exam
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold text-gray-700">
                      Exam Category
                    </Label>
                    <Select
                      value={examFormData.category}
                      onValueChange={(value) => handleInputChange('category', value)}
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="examName" className="text-sm font-semibold text-gray-700">
                      Exam Name
                    </Label>
                    <Input
                      id="examName"
                      placeholder="e.g., SSC CGL"
                      value={examFormData.examName}
                      onChange={(e) => handleInputChange('examName', e.target.value)}
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-700">
                    Exam Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., SSC Combined Graduate Level"
                    value={examFormData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="h-12 rounded-xl"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    Subjects
                  </Label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsSubjectsOpen(!isSubjectsOpen)}
                      className="w-full h-12 rounded-xl border-2 border-gray-200 bg-white px-4 text-left text-sm text-gray-700 flex items-center justify-between"
                    >
                      {examFormData.subjects.length > 0
                        ? `${examFormData.subjects.length} subject(s) selected`
                        : 'Select subjects'}
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
                            className="ml-2 focus:outline-none"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="studyMaterials" className="text-sm font-semibold text-gray-700">
                    Study Materials
                  </Label>
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
                            className="ml-2 focus:outline-none"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="teachers" className="text-sm font-semibold text-gray-700">
                      Number of Teachers
                    </Label>
                    <Input
                      type="number"
                      id="teachers"
                      placeholder="e.g., 10"
                      value={examFormData.teachers}
                      onChange={(e) => handleInputChange('teachers', e.target.value)}
                      min="0"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-sm font-semibold text-gray-700">
                      Price (INR)
                    </Label>
                    <Input
                      type="number"
                      id="price"
                      placeholder="e.g., 12999"
                      value={examFormData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      min="0"
                      className="h-12 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="h-12 px-8 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Create Exam
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