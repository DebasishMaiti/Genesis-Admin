import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  BookOpen,
  Video,
  Users,
  Calculator,
  Microscope,
  Globe,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/layout/Layout';

interface LiveSchedule {
  date: string;
  time: string;
  status: 'upcoming' | 'completed';
}
interface RecordedVideo {
  url: string;
  duration: string;
  views: number;
}
interface Class {
  id: string;
  title: string;
  instructor: string;
  duration: number;
  liveSchedule: LiveSchedule;
  recordedVideo?: RecordedVideo;
  enrolledStudents: number;
  isFree?: boolean;
}
interface Chapter {
  id: string;
  title: string;
  totalClasses: number;
  classes: Class[];
}
interface Subject {
  id: string;
  name: string;
  icon: string;
  totalChapters: number;
  completedChapters: number;
  chapters: Chapter[];
}
interface TuitionClass {
  id: string;
  slug: string;
  board: string;
  class: string;
  title: string;
  description: string;
  rating: number;
  students: number;
  teachers: number;
  price: number;
  validityDays: number;
  subjects: Subject[];
}

const demoData: TuitionClass[] = [
  {
    id: 'c1',
    slug: 'cbse-class-10',
    board: 'CBSE',
    class: 'Class 10',
    title: 'CBSE Class 10',
    description:
      'Comprehensive course covering all CBSE Class 10 subjects with live classes, expert teachers, and complete study materials.',
    rating: 4.8,
    students: 1250,
    teachers: 8,
    price: 24999,
    validityDays: 365,
    subjects: [
      {
        id: 'math',
        name: 'Mathematics',
        icon: 'Calculator',
        totalChapters: 5,
        completedChapters: 0,
        chapters: [
          {
            id: 'ch1',
            title: 'Real Numbers',
            totalClasses: 10,
            classes: [
              {
                id: 'cls1',
                title: 'Introduction to Real Numbers',
                instructor: 'Dr. Amit Kumar',
                duration: 60,
                liveSchedule: {
                  date: '2025-10-15',
                  time: '10:00 AM',
                  status: 'upcoming',
                },
                enrolledStudents: 450,
                isFree: true,
              },
              {
                id: 'cls2',
                title: "Euclid's Division Lemma",
                instructor: 'Dr. Amit Kumar',
                duration: 75,
                liveSchedule: {
                  date: '2025-10-10',
                  time: '10:00 AM',
                  status: 'completed',
                },
                recordedVideo: {
                  url: '/videos/euclid-division.mp4',
                  duration: '1:15:30',
                  views: 1230,
                },
                enrolledStudents: 450,
              },
            ],
          },
        ],
      },
      {
        id: 'science',
        name: 'Science',
        icon: 'Microscope',
        totalChapters: 16,
        completedChapters: 0,
        chapters: [
          {
            id: 'ch3',
            title: 'Chemical Reactions and Equations',
            totalClasses: 1,
            classes: [
              {
                id: 'cls4',
                title: 'Types of Chemical Reactions',
                instructor: 'Dr. Priya Patel',
                duration: 90,
                liveSchedule: {
                  date: '2025-10-18',
                  time: '11:00 AM',
                  status: 'upcoming',
                },
                enrolledStudents: 480,
                isFree: true,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'c2',
    slug: 'cbse-class-9',
    board: 'CBSE',
    class: 'Class 9',
    title: 'CBSE Class 9',
    description: 'Complete CBSE Class 9 curriculum with interactive learning.',
    rating: 4.6,
    students: 980,
    teachers: 6,
    price: 22999,
    validityDays: 365,
    subjects: [],
  },
  {
    id: 'c3',
    slug: 'icse-class-10',
    board: 'ICSE',
    class: 'Class 10',
    title: 'ICSE Class 10',
    description: 'ICSE board comprehensive course for Class 10 students.',
    rating: 4.7,
    students: 1100,
    teachers: 7,
    price: 26999,
    validityDays: 365,
    subjects: [],
  },
];

export default function AdminEditAcademics() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const passedClass = location.state?.classData as TuitionClass | undefined;

  const [currentClass, setCurrentClass] = useState<TuitionClass | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [openSubjectDialog, setOpenSubjectDialog] = useState(false);
  const [openChapterDialog, setOpenChapterDialog] = useState(false);
  const [openTuitionClassDialog, setOpenTuitionClassDialog] = useState(false);

  const [subjectName, setSubjectName] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [totalClasses, setTotalClasses] = useState(1);
  const [tuitionClassData, setTuitionClassData] = useState({
    title: '',
    instructor: '',
    duration: 60,
    date: '',
    time: '',
    isFree: false,
    enrolledStudents: 0,
  });

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);

  useEffect(() => {
    const loadClassData = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      let found: TuitionClass | undefined;

      if (passedClass && passedClass.id === id) {
        found = passedClass;
      } else {
        found = demoData.find((c) => c.id === id);
      }

      setCurrentClass(found ?? null);
      setIsLoading(false);
    };

    loadClassData();
  }, [id, passedClass]);

  const getSubjectIcon = (iconName: string) => {
    const iconProps = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'Calculator':
        return <Calculator {...iconProps} />;
      case 'Microscope':
        return <Microscope {...iconProps} />;
      case 'Globe':
        return <Globe {...iconProps} />;
      default:
        return <BookOpen {...iconProps} />;
    }
  };

  const getStatusBadge = (status: 'upcoming' | 'completed') => {
    return status === 'upcoming' ? (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
        Upcoming
      </Badge>
    ) : (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
        Completed
      </Badge>
    );
  };

  const addSubject = () => {
    if (!subjectName.trim() || !currentClass) return;

    const newSubject: Subject = {
      id: `sub-${Date.now()}`,
      name: subjectName.trim(),
      icon: 'BookOpen',
      totalChapters: 0,
      completedChapters: 0,
      chapters: [],
    };

    setCurrentClass((prev) =>
      prev ? { ...prev, subjects: [...prev.subjects, newSubject] } : null
    );

    setSubjectName('');
    setOpenSubjectDialog(false);
  };

  const addChapter = () => {
    if (!chapterTitle.trim() || !selectedSubjectId || !currentClass) return;

    const newChapter: Chapter = {
      id: `ch-${Date.now()}`,
      title: chapterTitle,
      totalClasses: totalClasses,
      classes: [],
    };

    setCurrentClass((prev) =>
      prev
        ? {
            ...prev,
            subjects: prev.subjects.map((subject) =>
              subject.id === selectedSubjectId
                ? {
                    ...subject,
                    chapters: [...subject.chapters, newChapter],
                    totalChapters: subject.totalChapters + 1,
                  }
                : subject
            ),
          }
        : null
    );

    setChapterTitle('');
    setTotalClasses(1);
    setOpenChapterDialog(false);
    setSelectedSubjectId(null);
  };

  const addTuitionClass = () => {
    if (!tuitionClassData.title || !selectedChapterId || !currentClass) return;

    const newClass: Class = {
      id: `cls-${Date.now()}`,
      title: tuitionClassData.title,
      instructor: tuitionClassData.instructor,
      duration: tuitionClassData.duration,
      liveSchedule: {
        date: tuitionClassData.date,
        time: tuitionClassData.time,
        status:
          new Date(tuitionClassData.date) > new Date() ? 'upcoming' : 'completed',
      },
      enrolledStudents: tuitionClassData.enrolledStudents,
      isFree: tuitionClassData.isFree,
    };

    setCurrentClass((prev) =>
      prev
        ? {
            ...prev,
            subjects: prev.subjects.map((subject) => ({
              ...subject,
              chapters: subject.chapters.map((chapter) =>
                chapter.id === selectedChapterId
                  ? { ...chapter, classes: [...chapter.classes, newClass] }
                  : chapter
              ),
            })),
          }
        : null
    );

    setTuitionClassData({
      title: '',
      instructor: '',
      duration: 60,
      date: '',
      time: '',
      isFree: false,
      enrolledStudents: 0,
    });
    setOpenTuitionClassDialog(false);
    setSelectedChapterId(null);
  };

  const deleteSubject = (subjectId: string) => {
    if (!confirm('Delete subject and all its chapters?')) return;
    setCurrentClass((prev) =>
      prev ? { ...prev, subjects: prev.subjects.filter((s) => s.id !== subjectId) } : null
    );
  };

  const deleteChapter = (subjectId: string, chapterId: string) => {
    if (!confirm('Delete chapter and all its classes?')) return;
    setCurrentClass((prev) =>
      prev
        ? {
            ...prev,
            subjects: prev.subjects.map((subject) =>
              subject.id === subjectId
                ? {
                    ...subject,
                    chapters: subject.chapters.filter((ch) => ch.id !== chapterId),
                    totalChapters: subject.totalChapters - 1,
                  }
                : subject
            ),
          }
        : null
    );
  };

  const deleteTuitionClass = (subjectId: string, chapterId: string, classId: string) => {
    if (!confirm('Delete this tuition class?')) return;
    setCurrentClass((prev) =>
      prev
        ? {
            ...prev,
            subjects: prev.subjects.map((subject) =>
              subject.id === subjectId
                ? {
                    ...subject,
                    chapters: subject.chapters.map((chapter) =>
                      chapter.id === chapterId
                        ? {
                            ...chapter,
                            classes: chapter.classes.filter((cls) => cls.id !== classId),
                          }
                        : chapter
                    ),
                  }
                : subject
            ),
          }
        : null
    );
  };

  const handleSave = () => {
    alert('Changes saved successfully!');
    navigate('/academics');
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading class data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!currentClass) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Class not found</h3>
            <p className="text-gray-500 mt-1">The requested class could not be found.</p>
            <Button onClick={() => navigate('/academics')} className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Academics
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/academics')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Edit Class</h1>
                <p className="text-gray-600 mt-1">Manage subjects, chapters, and tuition classes</p>
              </div>
            </div>

            <Button onClick={handleSave} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Users className="w-8 h-8" />
                {currentClass.title} ({currentClass.board} {currentClass.class})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <Label className="text-gray-500">Rating</Label>
                  <p className="font-semibold text-lg flex items-center gap-1">
                   
                    {currentClass.rating}
                  </p>
                </div>
                <div>
                  <Label className="text-gray-500">Students</Label>
                  <p className="font-semibold text-lg">{currentClass.students}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Teachers</Label>
                  <p className="font-semibold text-lg">{currentClass.teachers}</p>
                </div>
                <div>
                  <Label className="text-gray-500">Price</Label>
                  <p className="font-semibold text-lg">₹{currentClass.price.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Subjects</h2>
              <Dialog open={openSubjectDialog} onOpenChange={setOpenSubjectDialog}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Subject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Subject</DialogTitle>
                  </DialogHeader>
                  <div className="mt-4">
                    <Label>Subject Name</Label>
                    <Input
                      value={subjectName}
                      onChange={(e) => setSubjectName(e.target.value)}
                      placeholder="e.g., Mathematics"
                      onKeyDown={(e) => e.key === 'Enter' && addSubject()}
                    />
                    <Button onClick={addSubject} className="w-full mt-4">
                      Create Subject
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {currentClass.subjects.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No subjects yet</h3>
                  <p className="text-gray-500 mt-1">Start by adding a subject</p>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="single" collapsible className="w-full space-y-4">
                {currentClass.subjects.map((subject) => (
                  <AccordionItem key={subject.id} value={subject.id} className="border rounded-lg">
                    <AccordionTrigger className="hover:no-underline px-6 py-4">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          {getSubjectIcon(subject.icon)}
                          <span className="font-semibold text-lg">{subject.name}</span>
                          <Badge variant="secondary">{subject.chapters.length} chapters</Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteSubject(subject.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-semibold text-gray-900">Chapters</h4>
                          <Dialog
                            open={openChapterDialog && selectedSubjectId === subject.id}
                            onOpenChange={(open) => {
                              if (!open) setSelectedSubjectId(null);
                              setOpenChapterDialog(open);
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedSubjectId(subject.id);
                                  setOpenChapterDialog(true);
                                }}
                              >
                                <Plus className="w-4 h-4 mr-1" /> Add Chapter
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Add Chapter to {subject.name}</DialogTitle>
                              </DialogHeader>
                              <div className="mt-4 space-y-4">
                                <div>
                                  <Label>Chapter Title</Label>
                                  <Input
                                    value={chapterTitle}
                                    onChange={(e) => setChapterTitle(e.target.value)}
                                    placeholder="e.g., Real Numbers"
                                  />
                                </div>
                                <div>
                                  <Label>Total Planned Classes</Label>
                                  <Input
                                    type="number"
                                    value={totalClasses}
                                    onChange={(e) => setTotalClasses(parseInt(e.target.value) || 1)}
                                    min="1"
                                  />
                                </div>
                                <Button onClick={addChapter} className="w-full">
                                  Create Chapter
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>

                        {subject.chapters.length === 0 ? (
                          <p className="text-sm text-gray-500 italic text-center py-4">
                            No chapters yet
                          </p>
                        ) : (
                          <div className="space-y-3">
                            {subject.chapters.map((chapter) => (
                              <Card key={chapter.id} className="overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-indigo-50 to-indigo-100 py-3">
                                  <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                      <BookOpen className="w-5 h-5 text-indigo-600" />
                                      <div>
                                        <CardTitle className="text-lg">{chapter.title}</CardTitle>
                                        <p className="text-sm text-gray-600">
                                          {chapter.classes.length} of {chapter.totalClasses} classes added
                                        </p>
                                      </div>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => deleteChapter(subject.id, chapter.id)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent className="p-0">
                                  <Accordion type="single" collapsible>
                                    <AccordionItem value={chapter.id} className="border-b-0">
                                      <AccordionTrigger className="px-4 py-3 hover:bg-gray-50">
                                        <div className="flex items-center justify-between w-full pr-2">
                                          <div className="flex items-center gap-2">
                                            <Video className="w-4 h-4 text-green-600" />
                                            <span className="font-medium">
                                              Tuition Classes ({chapter.classes.length})
                                            </span>
                                          </div>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent className="px-4 pb-4">
                                        <div className="space-y-3">
                                          {chapter.classes.length === 0 ? (
                                            <p className="text-sm text-gray-500 italic text-center py-2">
                                              No classes yet
                                            </p>
                                          ) : (
                                            chapter.classes.map((tClass) => (
                                              <div
                                                key={tClass.id}
                                                className="flex items-center justify-between p-3 bg-white border rounded-lg"
                                              >
                                                <div className="flex-1">
                                                  <div className="flex items-center gap-2 mb-1">
                                                    <span className="font-medium">{tClass.title}</span>
                                                    {tClass.isFree && (
                                                      <Badge className="bg-green-100 text-green-800 text-xs">
                                                        Free
                                                      </Badge>
                                                    )}
                                                    {getStatusBadge(tClass.liveSchedule.status)}
                                                  </div>
                                                  <div className="flex items-center gap-4 text-xs text-gray-600">
                                                    <span>{tClass.instructor}</span>
                                                    <span>{tClass.duration} min</span>
                                                    <span>{tClass.enrolledStudents} students</span>
                                                    <span>
                                                      {tClass.liveSchedule.date} {tClass.liveSchedule.time}
                                                    </span>
                                                  </div>
                                                </div>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-7 w-7 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                  onClick={() =>
                                                    deleteTuitionClass(subject.id, chapter.id, tClass.id)
                                                  }
                                                >
                                                  <Trash2 className="w-3 h-3" />
                                                </Button>
                                              </div>
                                            ))
                                          )}

                                          <Dialog
                                            open={
                                              openTuitionClassDialog && selectedChapterId === chapter.id
                                            }
                                            onOpenChange={(open) => {
                                              if (!open) {
                                                setSelectedChapterId(null);
                                                setTuitionClassData({
                                                  title: '',
                                                  instructor: '',
                                                  duration: 60,
                                                  date: '',
                                                  time: '',
                                                  isFree: false,
                                                  enrolledStudents: 0,
                                                });
                                              }
                                              setOpenTuitionClassDialog(open);
                                            }}
                                          >
                                            <DialogTrigger asChild>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => {
                                                  setSelectedChapterId(chapter.id);
                                                  setOpenTuitionClassDialog(true);
                                                }}
                                              >
                                                <Plus className="w-4 h-4 mr-1" /> Add Tuition Class
                                              </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md">
                                              <DialogHeader>
                                                <DialogTitle>Add Tuition Class</DialogTitle>
                                              </DialogHeader>
                                              <div className="space-y-3 mt-4">
                                                <div>
                                                  <Label>Class Title *</Label>
                                                  <Input
                                                    value={tuitionClassData.title}
                                                    onChange={(e) =>
                                                      setTuitionClassData({
                                                        ...tuitionClassData,
                                                        title: e.target.value,
                                                      })
                                                    }
                                                    placeholder="e.g., Introduction to Real Numbers"
                                                  />
                                                </div>
                                                <div>
                                                  <Label>Instructor *</Label>
                                                  <Input
                                                    value={tuitionClassData.instructor}
                                                    onChange={(e) =>
                                                      setTuitionClassData({
                                                        ...tuitionClassData,
                                                        instructor: e.target.value,
                                                      })
                                                    }
                                                    placeholder="e.g., Dr. Amit Kumar"
                                                  />
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                  <div>
                                                    <Label>Duration (min) *</Label>
                                                    <Input
                                                      type="number"
                                                      value={tuitionClassData.duration}
                                                      onChange={(e) =>
                                                        setTuitionClassData({
                                                          ...tuitionClassData,
                                                          duration: parseInt(e.target.value) || 60,
                                                        })
                                                      }
                                                    />
                                                  </div>
                                                  <div>
                                                    <Label>Enrolled Students</Label>
                                                    <Input
                                                      type="number"
                                                      value={tuitionClassData.enrolledStudents}
                                                      onChange={(e) =>
                                                        setTuitionClassData({
                                                          ...tuitionClassData,
                                                          enrolledStudents: parseInt(e.target.value) || 0,
                                                        })
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                  <div>
                                                    <Label>Date *</Label>
                                                    <Input
                                                      type="date"
                                                      value={tuitionClassData.date}
                                                      onChange={(e) =>
                                                        setTuitionClassData({
                                                          ...tuitionClassData,
                                                          date: e.target.value,
                                                        })
                                                      }
                                                    />
                                                  </div>
                                                  <div>
                                                    <Label>Time *</Label>
                                                    <Input
                                                      type="time"
                                                      value={tuitionClassData.time}
                                                      onChange={(e) =>
                                                        setTuitionClassData({
                                                          ...tuitionClassData,
                                                          time: e.target.value,
                                                        })
                                                      }
                                                    />
                                                  </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                  <input
                                                    type="checkbox"
                                                    id="isFree"
                                                    checked={tuitionClassData.isFree}
                                                    onChange={(e) =>
                                                      setTuitionClassData({
                                                        ...tuitionClassData,
                                                        isFree: e.target.checked,
                                                      })
                                                    }
                                                    className="rounded"
                                                  />
                                                  <Label htmlFor="isFree">Free Class</Label>
                                                </div>
                                                <Button onClick={addTuitionClass} className="w-full">
                                                  Add Class
                                                </Button>
                                              </div>
                                            </DialogContent>
                                          </Dialog>
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}