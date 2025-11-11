import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, Save, BookOpen, Clock, Users, DollarSign, CheckCircle, Eye, Edit, ArrowLeft } from "lucide-react";

interface ClassFormData {
  id: string;
  title: string;
  instructor: string;
  duration: number;
  isFree: boolean;
  liveSchedule?: {
    date: string;
    time: string;
    status: "upcoming" | "completed" | "cancelled";
  };
  recordedVideo?: {
    url: string;
    duration: string;
    views: number;
  };
  enrolledStudents: number;
}

interface ChapterFormData {
  id: string;
  title: string;
  totalClasses: number;
  classes: ClassFormData[];
}

interface SubjectFormData {
  id: string;
  name: string;
  icon: string;
  totalChapters: number;
  completedChapters: number;
  chapters: ChapterFormData[];
}

interface CourseFormData {
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
  enrolledDate: string;
  expiryDate: string;
  progress: number;
  subjects: SubjectFormData[];
}

const mockCourseData: CourseFormData = {
  id: "1",
  slug: "spoken-english",
  board: "Language",
  class: "Professional",
  title: "Spoken English Masterclass",
  description: "Master English speaking skills with our comprehensive course covering grammar, vocabulary, pronunciation, and real-world conversation practice. Perfect for beginners and intermediate learners.",
  rating: 4.8,
  students: 2340,
  teachers: 5,
  price: 4999,
  validityDays: 180,
  enrolledDate: "2025-09-01",
  expiryDate: "2026-02-28",
  progress: 25,
  subjects: [
    {
      id: "grammar",
      name: "Grammar Fundamentals",
      icon: "BookOpen",
      totalChapters: 3,
      completedChapters: 1,
      chapters: [
        {
          id: "ch1",
          title: "Tenses and Sentence Structure",
          totalClasses: 10,
          classes: [
            {
              id: "cls1",
              title: "Introduction to English Tenses",
              instructor: "Ms. Sarah Johnson",
              duration: 60,
              liveSchedule: {
                date: "2025-10-15",
                time: "6:00 PM",
                status: "upcoming"
              },
              enrolledStudents: 580,
              isFree: true
            },
            {
              id: "cls2",
              title: "Present Tense Forms",
              instructor: "Ms. Sarah Johnson",
              duration: 75,
              liveSchedule: {
                date: "2025-10-17",
                time: "6:00 PM",
                status: "upcoming"
              },
              enrolledStudents: 575,
              isFree: false
            },
            {
              id: "cls3",
              title: "Past Tense Usage",
              instructor: "Ms. Sarah Johnson",
              duration: 60,
              liveSchedule: {
                date: "2025-10-10",
                time: "6:00 PM",
                status: "completed"
              },
              recordedVideo: {
                url: "/videos/past-tense.mp4",
                duration: "1:02:15",
                views: 820
              },
              enrolledStudents: 570,
              isFree: true
            }
          ]
        },
        {
          id: "ch2",
          title: "Articles and Prepositions",
          totalClasses: 8,
          classes: [
            {
              id: "cls11",
              title: "Understanding Articles (A, An, The)",
              instructor: "Ms. Sarah Johnson",
              duration: 60,
              liveSchedule: {
                date: "2025-11-02",
                time: "6:00 PM",
                status: "upcoming"
              },
              enrolledStudents: 530,
              isFree: true
            }
          ]
        },
        {
          id: "ch3",
          title: "Parts of Speech",
          totalClasses: 12,
          classes: [
            {
              id: "cls21",
              title: "Introduction to Parts of Speech",
              instructor: "Mr. David Miller",
              duration: 60,
              liveSchedule: {
                date: "2025-11-22",
                time: "7:00 PM",
                status: "upcoming"
              },
              enrolledStudents: 480,
              isFree: true
            }
          ]
        }
      ]
    },
    {
      id: "vocabulary",
      name: "Vocabulary Building",
      icon: "BookOpen",
      totalChapters: 2,
      completedChapters: 0,
      chapters: [
        {
          id: "ch4",
          title: "Everyday Vocabulary",
          totalClasses: 6,
          classes: [
            {
              id: "cls31",
              title: "Common Phrases and Expressions",
              instructor: "Mr. David Miller",
              duration: 45,
              enrolledStudents: 420,
              isFree: true
            }
          ]
        }
      ]
    }
  ]
};

export default function AdminEditCourse() {
  const [formData, setFormData] = useState<CourseFormData>(mockCourseData);
  const [activeStep, setActiveStep] = useState(0);
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const mode = searchParams.get("mode") || "view";
  const isEditMode = mode === "edit";

  useEffect(() => {
    if (id) {
      setFormData(mockCourseData);
    }
  }, [id]);

  const updateBasicInfo = (field: keyof Omit<CourseFormData, 'subjects' | 'id'>, value: string | number) => {
    if (!isEditMode) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSubject = () => {
    if (!isEditMode) return;
    const newSubject: SubjectFormData = {
      id: `sub-${Date.now()}`,
      name: "New Subject",
      icon: "BookOpen",
      totalChapters: 0,
      completedChapters: 0,
      chapters: []
    };
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, newSubject]
    }));
  };

  const updateSubject = (subjectIndex: number, field: keyof Omit<SubjectFormData, 'chapters' | 'id'>, value: string | number) => {
    if (!isEditMode) return;
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex ? { ...subject, [field]: value } : subject
      )
    }));
  };

  const removeSubject = (subjectIndex: number) => {
    if (!isEditMode) return;
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== subjectIndex)
    }));
  };

  const addChapter = (subjectIndex: number) => {
    if (!isEditMode) return;
    const newChapter: ChapterFormData = {
      id: `ch-${Date.now()}`,
      title: "New Chapter",
      totalClasses: 0,
      classes: []
    };
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex
          ? { ...subject, chapters: [...subject.chapters, newChapter] }
          : subject
      )
    }));
  };

  const updateChapter = (subjectIndex: number, chapterIndex: number, field: keyof Omit<ChapterFormData, 'classes' | 'id'>, value: string | number) => {
    if (!isEditMode) return;
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex
          ? {
              ...subject,
              chapters: subject.chapters.map((chapter, j) =>
                j === chapterIndex ? { ...chapter, [field]: value } : chapter
              )
            }
          : subject
      )
    }));
  };

  const removeChapter = (subjectIndex: number, chapterIndex: number) => {
    if (!isEditMode) return;
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex
          ? {
              ...subject,
              chapters: subject.chapters.filter((_, j) => j !== chapterIndex)
            }
          : subject
      )
    }));
  };

  const addClass = (subjectIndex: number, chapterIndex: number) => {
    if (!isEditMode) return;
    const newClass: ClassFormData = {
      id: `cls-${Date.now()}`,
      title: "New Class",
      instructor: "Instructor Name",
      duration: 60,
      isFree: false,
      enrolledStudents: 0
    };
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex
          ? {
              ...subject,
              chapters: subject.chapters.map((chapter, j) =>
                j === chapterIndex
                  ? { ...chapter, classes: [...chapter.classes, newClass] }
                  : chapter
              )
            }
          : subject
      )
    }));
  };

  const updateClass = (
    subjectIndex: number,
    chapterIndex: number,
    classIndex: number,
    field: keyof ClassFormData,
    value: string | number | boolean
  ) => {
    if (!isEditMode) return;
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex
          ? {
              ...subject,
              chapters: subject.chapters.map((chapter, j) =>
                j === chapterIndex
                  ? {
                      ...chapter,
                      classes: chapter.classes.map((cls, k) =>
                        k === classIndex ? { ...cls, [field]: value } : cls
                      )
                    }
                  : chapter
              )
            }
          : subject
      )
    }));
  };

  const removeClass = (subjectIndex: number, chapterIndex: number, classIndex: number) => {
    if (!isEditMode) return;
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex
          ? {
              ...subject,
              chapters: subject.chapters.map((chapter, j) =>
                j === chapterIndex
                  ? {
                      ...chapter,
                      classes: chapter.classes.filter((_, k) => k !== classIndex)
                    }
                  : chapter
              )
            }
          : subject
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditMode) return;
    alert("Course updated successfully!");
    navigate("/course");
  };

  const toggleMode = () => {
    if (isEditMode) {
      navigate(`/course/${id}?mode=view`);
    } else {
      navigate(`/course/${id}?mode=edit`);
    }
  };

  const steps = [
    { title: "Basic Info", icon: <BookOpen className="w-4 h-4" /> },
    { title: "Subjects & Chapters", icon: <Users className="w-4 h-4" /> },
    { title: "Review", icon: <Save className="w-4 h-4" /> }
  ];

  const totalSubjects = formData.subjects.length;
  const totalChapters = formData.subjects.reduce((acc, s) => acc + s.chapters.length, 0);
  const totalClasses = formData.subjects.reduce((acc, s) => 
    acc + s.chapters.reduce((a, c) => a + c.classes.length, 0), 0
  );

  return (
    <Layout>
      <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        {/* Header with mode toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("courses")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditMode ? "Edit Course" : "View Course"} - {formData.title}
              </h1>
              <p className="text-gray-600">
                {isEditMode ? "Modify course details and structure" : "View course details and structure"}
              </p>
            </div>
          </div>
          <Button
            onClick={toggleMode}
            variant={isEditMode ? "outline" : "default"}
            className="flex items-center gap-2"
          >
            {isEditMode ? <Eye className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
            {isEditMode ? "Switch to View" : "Switch to Edit"}
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stepper - Only show in edit mode */}
          {isEditMode && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div
                      key={step.title}
                      className={`flex items-center space-x-3 ${
                        index < activeStep ? 'text-green-600' : 
                        index === activeStep ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                          index < activeStep ? 'bg-green-600 border-green-600 text-white' : 
                          index === activeStep ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-400'
                        }`}
                      >
                        {index < activeStep ? <CheckCircle className="w-5 h-5" /> : step.icon}
                      </div>
                      <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Basic Information */}
          {activeStep === 0 && (
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2">
                  <Label htmlFor="title" className="text-sm font-medium">Course Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateBasicInfo('title', e.target.value)}
                    className="mt-1 text-base"
                    readOnly={!isEditMode}
                  />
                </div>

                <div>
                  <Label htmlFor="slug" className="text-sm font-medium">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => updateBasicInfo('slug', e.target.value)}
                    className="mt-1"
                    readOnly={!isEditMode}
                  />
                </div>
 
                <div className="lg:col-span-2">
                  <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateBasicInfo('description', e.target.value)}
                    rows={4}
                    className="mt-1"
                    readOnly={!isEditMode}
                  />
                </div>

                <div>
                  <Label htmlFor="price" className="text-sm font-medium">Price (₹)</Label>
                  <div className="relative mt-1">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateBasicInfo('price', Number(e.target.value))}
                      className="pl-10"
                      readOnly={!isEditMode}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="validityDays" className="text-sm font-medium">Validity (Days)</Label>
                  <div className="relative mt-1">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="validityDays"
                      type="number"
                      value={formData.validityDays}
                      onChange={(e) => updateBasicInfo('validityDays', Number(e.target.value))}
                      className="pl-10"
                      readOnly={!isEditMode}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium">Teachers</Label>
                  <Input 
                    type="number" 
                    value={formData.teachers} 
                    onChange={(e) => updateBasicInfo('teachers', Number(e.target.value))} 
                    className="mt-1"
                    readOnly={!isEditMode}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Subjects, Chapters & Classes */}
          {activeStep === 1 && (
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="w-5 h-5" />
                  Subjects, Chapters & Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {formData.subjects.map((subject, subjectIndex) => (
                  <Accordion type="single" key={subject.id} defaultValue={subject.id} collapsible>
                    <AccordionItem value={subject.id}>
                      <AccordionTrigger className="hover:no-underline px-4 py-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-4 h-4" />
                            {isEditMode ? (
                              <Input
                                value={subject.name}
                                onChange={(e) => updateSubject(subjectIndex, 'name', e.target.value)}
                                className="h-8 w-64 text-sm"
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : (
                              <span className="font-semibold">{subject.name}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">
                              {subject.completedChapters}/{subject.totalChapters} Chapters
                            </Badge>
                            {isEditMode && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeSubject(subjectIndex);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pt-4 space-y-4">
                        {subject.chapters.map((chapter, chapterIndex) => (
                          <Card key={chapter.id} className="p-4 border-l-4 border-l-blue-500">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                {isEditMode ? (
                                  <Input
                                    value={chapter.title}
                                    onChange={(e) => updateChapter(subjectIndex, chapterIndex, 'title', e.target.value)}
                                    className="w-80 font-medium"
                                  />
                                ) : (
                                  <h4 className="font-semibold text-gray-900">{chapter.title}</h4>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">{chapter.classes.length} Classes</Badge>
                                {isEditMode && (
                                  <>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      onClick={() => addClass(subjectIndex, chapterIndex)}
                                    >
                                      <Plus className="w-4 h-4 mr-1" />
                                      Add Class
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      onClick={() => removeChapter(subjectIndex, chapterIndex)}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>

                            <div className="space-y-3">
                              {chapter.classes.map((cls, classIndex) => (
                                <div key={cls.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                  {isEditMode ? (
                                    <>
                                      <Input
                                        value={cls.title}
                                        onChange={(e) => updateClass(subjectIndex, chapterIndex, classIndex, 'title', e.target.value)}
                                        placeholder="Class Title"
                                        className="flex-1"
                                      />
                                      <Input
                                        value={cls.instructor}
                                        onChange={(e) => updateClass(subjectIndex, chapterIndex, classIndex, 'instructor', e.target.value)}
                                        placeholder="Instructor"
                                        className="w-40"
                                      />
                                      <Input
                                        type="number"
                                        value={cls.duration}
                                        onChange={(e) => updateClass(subjectIndex, chapterIndex, classIndex, 'duration', Number(e.target.value))}
                                        placeholder="Duration"
                                        className="w-24"
                                      />
                                      <div className="flex items-center gap-2">
                                        <Checkbox
                                          id={`free-${subjectIndex}-${chapterIndex}-${classIndex}`}
                                          checked={cls.isFree}
                                          onCheckedChange={(checked) => updateClass(subjectIndex, chapterIndex, classIndex, 'isFree', !!checked)}
                                        />
                                        <Label htmlFor={`free-${subjectIndex}-${chapterIndex}-${classIndex}`} className="text-sm">
                                          Free
                                        </Label>
                                      </div>
                                      <Input
                                        type="number"
                                        value={cls.enrolledStudents}
                                        onChange={(e) => updateClass(subjectIndex, chapterIndex, classIndex, 'enrolledStudents', Number(e.target.value))}
                                        placeholder="Students"
                                        className="w-24"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeClass(subjectIndex, chapterIndex, classIndex)}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <div className="flex-1">
                                        <div className="font-medium text-gray-900">{cls.title}</div>
                                        <div className="text-sm text-gray-600">by {cls.instructor}</div>
                                      </div>
                                      <Badge variant="outline">{cls.duration}min</Badge>
                                      <Badge variant={cls.isFree ? "default" : "secondary"}>
                                        {cls.isFree ? "Free" : "Paid"}
                                      </Badge>
                                      <div className="text-sm text-gray-600">{cls.enrolledStudents} students</div>
                                      {cls.liveSchedule && (
                                        <Badge variant="outline" className={
                                          cls.liveSchedule.status === 'upcoming' ? 'bg-blue-50 text-blue-700' :
                                          cls.liveSchedule.status === 'completed' ? 'bg-green-50 text-green-700' :
                                          'bg-red-50 text-red-700'
                                        }>
                                          {cls.liveSchedule.status}
                                        </Badge>
                                      )}
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </Card>
                        ))}
                        {isEditMode && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => addChapter(subjectIndex)}
                            className="w-full"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Chapter
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                {isEditMode && (
                  <Button type="button" variant="outline" onClick={addSubject} className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Subject
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Review */}
          {activeStep === 2 && (
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Save className="w-5 h-5" />
                  Review Changes
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Course Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Course Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    <div><strong>Title:</strong> {formData.title}</div>
                    <div><strong>Price:</strong> ₹{formData.price.toLocaleString()}</div>
                    <div><strong>Board:</strong> {formData.board}</div>
                    <div><strong>Class:</strong> {formData.class}</div>
                    <div><strong>Rating:</strong> {formData.rating}/5</div>
                    <div><strong>Students:</strong> {formData.students.toLocaleString()}</div>
                    <div><strong>Teachers:</strong> {formData.teachers}</div>
                    <div><strong>Validity:</strong> {formData.validityDays} days</div>
                    <div className="md:col-span-2"><strong>Description:</strong> {formData.description}</div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-green-600">{totalSubjects}</div>
                      <div className="text-sm text-gray-600">Subjects</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-blue-600">{totalChapters}</div>
                      <div className="text-sm text-gray-600">Chapters</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="text-3xl font-bold text-purple-600">{totalClasses}</div>
                      <div className="text-sm text-gray-600">Classes</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          {isEditMode && (
            <div className="flex justify-between items-center pt-6 border-t">
              <div>
                {activeStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Previous
                  </Button>
                )}
              </div>
              <div className="flex gap-3">
                {activeStep < 2 && (
                  <Button 
                    type="button" 
                    onClick={() => setActiveStep(activeStep + 1)}
                  >
                    {activeStep === 1 ? "Review Course" : "Next"}
                  </Button>
                )}
                {activeStep === 2 && (
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Update Course
                  </Button>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
}