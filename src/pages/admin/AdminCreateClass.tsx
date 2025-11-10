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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BookOpen, GraduationCap, FileText } from 'lucide-react';
import Layout from '@/components/layout/Layout';
 
const subjectsData = [
  {
    id: "sub1",
    name: "Quantitative Aptitude",
    chapters: [
      { id: "ch1", title: "Number System" },
      { id: "ch2", title: "Percentage" },
      { id: "ch3", title: "Ratio & Proportion" },
      { id: "ch4", title: "Data Interpretation" },
    ],
  },
  {
    id: "sub2",
    name: "General Intelligence",
    chapters: [
      { id: "ch5", title: "Analogies" },
      { id: "ch6", title: "Coding-Decoding" },
    ],
  },
  {
    id: "sub3",
    name: "English Language",
    chapters: [
      { id: "ch7", title: "Grammar Basics" },
      { id: "ch8", title: "Vocabulary" },
    ],
  },
  {
    id: "sub4",
    name: "General Awareness",
    chapters: [
      { id: "ch9", title: "Indian History" },
      { id: "ch10", title: "Indian Polity" },
    ],
  },
];
 
interface SubjectFormData {
  subjectName: string;
  icon: string;
}

interface ChapterFormData {
  subject: string;
  chapterTitle: string;
}

interface ClassFormData {
  subject: string;
  chapter: string;
  classTitle: string;
  teacher: string;
  date: string;
  time: string;
  duration: string;
}

export default function AdminCreateClass() {
  const [subjectFormData, setSubjectFormData] = useState<SubjectFormData>({
    subjectName: '',
    icon: '',
  });

  const [chapterFormData, setChapterFormData] = useState<ChapterFormData>({
    subject: '',
    chapterTitle: '',
  });

  const [classFormData, setClassFormData] = useState<ClassFormData>({
    subject: '',
    chapter: '',
    classTitle: '',
    teacher: '',
    date: '',
    time: '',
    duration: '',
  });
 
  const allSubjects = subjectsData.map((s) => s.name);
 
  const chaptersForSubject = (subject: string) =>
    subjectsData.find((s) => s.name === subject)?.chapters.map((c) => c.title) || [];

  const handleSubjectInputChange = (name: keyof SubjectFormData, value: string) => {
    setSubjectFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChapterInputChange = (name: keyof ChapterFormData, value: string) => {
    setChapterFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'subject' ? { chapterTitle: '' } : {}),
    }));
  };

  const handleClassInputChange = (name: keyof ClassFormData, value: string) => {
    setClassFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'subject' ? { chapter: '' } : {}),
    }));
  };

  const handleSubjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subject submitted:', subjectFormData);
    setSubjectFormData({ subjectName: '', icon: '' });
  };

  const handleChapterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Chapter submitted:', chapterFormData);
    setChapterFormData({ subject: '', chapterTitle: '' });
  };

  const handleClassSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Class submitted:', classFormData);
    setClassFormData({
      subject: '',
      chapter: '',
      classTitle: '',
      teacher: '',
      date: '',
      time: '',
      duration: '',
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
   

          <Tabs defaultValue="subject" className="w-full max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm rounded-2xl p-2 mb-8 shadow-lg border border-red-100">
              <TabsTrigger
                value="subject"
                className="rounded-xl py-3 text-sm font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                Subject
              </TabsTrigger>
              <TabsTrigger
                value="chapter"
                className="rounded-xl py-3 text-sm font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Chapter
              </TabsTrigger>
              <TabsTrigger
                value="class"
                className="rounded-xl py-3 text-sm font-semibold transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Class
              </TabsTrigger>
            </TabsList>

            {/* Create Subject Tab - NO EXAM */}
            <TabsContent value="subject">
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-primary text-white pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <BookOpen className="w-6 h-6" />
                    Create New Subject
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubjectSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="subjectName" className="text-sm font-semibold text-gray-700">
                        Subject Name
                      </Label>
                      <Input
                        id="subjectName"
                        name="subjectName"
                        placeholder="e.g., Advanced Mathematics"
                        value={subjectFormData.subjectName}
                        onChange={(e) => handleSubjectInputChange('subjectName', e.target.value)}
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                        required
                      />
                    </div>
 
                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        className="h-12 px-8 rounded-xl bg-primary hover:from-red-700  text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Create Subject
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Create Chapter Tab - NO EXAM */}
            <TabsContent value="chapter">
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-primary text-white pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <FileText className="w-6 h-6" />
                    Create New Chapter
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleChapterSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="chapter-subject" className="text-sm font-semibold text-gray-700">
                        Subject
                      </Label>
                      <Select
                        name="subject"
                        value={chapterFormData.subject}
                        onValueChange={(value) => handleChapterInputChange('subject', value)}
                        required
                      >
                        <SelectTrigger
                          id="chapter-subject"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                        >
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {allSubjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chapterTitle" className="text-sm font-semibold text-gray-700">
                        Chapter Title
                      </Label>
                      <Input
                        id="chapterTitle"
                        name="chapterTitle"
                        placeholder="e.g., Introduction to Algebra"
                        value={chapterFormData.chapterTitle}
                        onChange={(e) => handleChapterInputChange('chapterTitle', e.target.value)}
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                        required
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        className="h-12 px-8 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Create Chapter
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Create Class Tab - NO EXAM */}
            <TabsContent value="class">
              <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden">
                <CardHeader className="bg-primary text-white pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold flex items-center gap-3">
                    <GraduationCap className="w-6 h-6" />
                    Schedule New Class
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleClassSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="class-subject" className="text-sm font-semibold text-gray-700">
                        Subject
                      </Label>
                      <Select
                        name="subject"
                        value={classFormData.subject}
                        onValueChange={(value) => handleClassInputChange('subject', value)}
                        required
                      >
                        <SelectTrigger
                          id="class-subject"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                        >
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {allSubjects.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class-chapter" className="text-sm font-semibold text-gray-700">
                        Chapter
                      </Label>
                      <Select
                        name="chapter"
                        value={classFormData.chapter}
                        onValueChange={(value) => handleClassInputChange('chapter', value)}
                        disabled={!classFormData.subject}
                        required
                      >
                        <SelectTrigger
                          id="class-chapter"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors disabled:opacity-50"
                        >
                          <SelectValue placeholder="Select chapter" />
                        </SelectTrigger>
                        <SelectContent>
                          {chaptersForSubject(classFormData.subject).map((chapter) => (
                            <SelectItem key={chapter} value={chapter}>
                              {chapter}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="classTitle" className="text-sm font-semibold text-gray-700">
                        Class Title
                      </Label>
                      <Input
                        id="classTitle"
                        name="classTitle"
                        placeholder="e.g., Advanced Problem Solving Session"
                        value={classFormData.classTitle}
                        onChange={(e) => handleClassInputChange('classTitle', e.target.value)}
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="teacher" className="text-sm font-semibold text-gray-700">
                        Teacher Name
                      </Label>
                      <Input
                        id="teacher"
                        name="teacher"
                        placeholder="e.g., Dr. Sarah Johnson"
                        value={classFormData.teacher}
                        onChange={(e) => handleClassInputChange('teacher', e.target.value)}
                        className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-sm font-semibold text-gray-700">
                          Date
                        </Label>
                        <Input
                          type="date"
                          id="date"
                          name="date"
                          value={classFormData.date}
                          onChange={(e) => handleClassInputChange('date', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-sm font-semibold text-gray-700">
                          Time
                        </Label>
                        <Input
                          type="time"
                          id="time"
                          name="time"
                          value={classFormData.time}
                          onChange={(e) => handleClassInputChange('time', e.target.value)}
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="duration" className="text-sm font-semibold text-gray-700">
                          Duration (min)
                        </Label>
                        <Input
                          type="number"
                          id="duration"
                          name="duration"
                          placeholder="60"
                          value={classFormData.duration}
                          onChange={(e) => handleClassInputChange('duration', e.target.value)}
                          min="30"
                          max="240"
                          className="h-12 rounded-xl border-2 border-gray-200 focus:border-red-500 transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        className="h-12 px-8 rounded-xl bg-primary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                      >
                        Schedule Class
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}