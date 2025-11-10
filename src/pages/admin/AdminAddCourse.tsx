import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Plus, Trash2, Save, BookOpen, Clock, Users, DollarSign } from "lucide-react";

interface NewClassFormData {
  title: string;
  instructor: string;
  duration: number;
  isFree: boolean;
}

interface NewChapterFormData {
  title: string;
  classes: NewClassFormData[];
}

interface NewSubjectFormData {
  name: string;
  icon: string;
  chapters: NewChapterFormData[];
}

interface NewCourseFormData {
  title: string;
  slug: string;
  board: string;
  class: string;
  description: string;
  price: number;
  validityDays: number;
  subjects: NewSubjectFormData[];
}

export default function AdminAddCourse() {
  const [formData, setFormData] = useState<NewCourseFormData>({
    title: "",
    slug: "",
    board: "",
    class: "",
    description: "",
    price: 0,
    validityDays: 0,
    subjects: [],
  });

  const [activeStep, setActiveStep] = useState(0);

  const updateBasicInfo = (field: keyof Omit<NewCourseFormData, 'subjects'>, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: "", icon: "BookOpen", chapters: [] }]
    }));
  };

  const updateSubject = (index: number, field: keyof Omit<NewSubjectFormData, 'chapters'>, value: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === index ? { ...subject, [field]: value } : subject
      )
    }));
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const addChapter = (subjectIndex: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) =>
        i === subjectIndex
          ? { ...subject, chapters: [...subject.chapters, { title: "", classes: [] }] }
          : subject
      )
    }));
  };

  const updateChapter = (subjectIndex: number, chapterIndex: number, field: keyof NewChapterFormData, value: string) => {
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
                      classes: [...chapter.classes, { title: "", instructor: "", duration: 60, isFree: false }]
                    }
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
    field: keyof NewClassFormData,
    value: string | number | boolean
  ) => {
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
    alert("Course created successfully!");
  };

  const steps = [
    { title: "Basic Info", icon: <BookOpen className="w-4 h-4" /> },
    { title: "Subjects & Chapters", icon: <Users className="w-4 h-4" /> },
    { title: "Review", icon: <Save className="w-4 h-4" /> }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
 

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mt-10">
          {/* Stepper */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                {steps.map((step, index) => (
                  <div
                    key={step.title}
                    className={`flex-1 flex items-center space-x-2 ${
                      index < activeStep ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index <= activeStep
                          ? 'bg-green-600 text-white'
                          : 'bg-muted border border-border'
                      }`}
                    >
                      {step.icon}
                    </div>
                    <span className="text-xs sm:text-sm font-medium hidden sm:block">{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Step 1: Basic Information */}
          {activeStep >= 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateBasicInfo('title', e.target.value)}
                    placeholder="e.g., Spoken English"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => updateBasicInfo('slug', e.target.value)}
                    placeholder="spoken-english"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="board">Board *</Label>
                  <Select value={formData.board} onValueChange={(v) => updateBasicInfo('board', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select board" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ICSE">ICSE</SelectItem>
                      <SelectItem value="Language">Language</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="class">Class *</Label>
                  <Select value={formData.class} onValueChange={(v) => updateBasicInfo('class', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class 1">Class 1</SelectItem>
                      <SelectItem value="Class 10">Class 10</SelectItem>
                      <SelectItem value="Professional">Professional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateBasicInfo('description', e.target.value)}
                    placeholder="Describe your course..."
                    rows={4}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => updateBasicInfo('price', Number(e.target.value))}
                      className="pl-10 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="validityDays">Validity (Days) *</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="validityDays"
                      type="number"
                      value={formData.validityDays}
                      onChange={(e) => updateBasicInfo('validityDays', Number(e.target.value))}
                      className="pl-10 text-sm sm:text-base"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Subjects, Chapters & Classes */}
          {activeStep >= 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Subjects, Chapters & Classes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {formData.subjects.map((subject, subjectIndex) => (
                  <Accordion type="single" key={subjectIndex} defaultValue={`subject-${subjectIndex}`}>
                    <AccordionItem value={`subject-${subjectIndex}`}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-2 sm:gap-0">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <BookOpen className="w-4 h-4" />
                            <Input
                              value={subject.name}
                              onChange={(e) => updateSubject(subjectIndex, 'name', e.target.value)}
                              placeholder="Subject Name"
                              className="h-8 w-full sm:w-48 text-sm sm:text-base"
                            />
                          </div>
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
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        {subject.chapters.map((chapter, chapterIndex) => (
                          <Card key={chapterIndex} className="p-3 sm:p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                              <Input
                                value={chapter.title}
                                onChange={(e) => updateChapter(subjectIndex, chapterIndex, 'title', e.target.value)}
                                placeholder="Chapter Title"
                                className="w-full sm:w-64 text-sm sm:text-base"
                              />
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeChapter(subjectIndex, chapterIndex)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="space-y-3">
                              {chapter.classes.map((cls, classIndex) => (
                                <div key={classIndex} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 bg-muted/30 rounded-lg">
                                  <Input
                                    value={cls.title}
                                    onChange={(e) => updateClass(subjectIndex, chapterIndex, classIndex, 'title', e.target.value)}
                                    placeholder="Class Title"
                                    className="w-full sm:flex-1 text-sm sm:text-base"
                                  />
                                  <Input
                                    value={cls.instructor}
                                    onChange={(e) => updateClass(subjectIndex, chapterIndex, classIndex, 'instructor', e.target.value)}
                                    placeholder="Instructor"
                                    className="w-full sm:w-32 text-sm sm:text-base"
                                  />
                                  <Input
                                    type="number"
                                    value={cls.duration}
                                    onChange={(e) => updateClass(subjectIndex, chapterIndex, classIndex, 'duration', Number(e.target.value))}
                                    placeholder="Duration"
                                    className="w-full sm:w-20 text-sm sm:text-base"
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
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeClass(subjectIndex, chapterIndex, classIndex)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => addClass(subjectIndex, chapterIndex)}
                                className="w-full"
                              >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Class
                              </Button>
                            </div>
                          </Card>
                        ))}
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
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                <Button type="button" variant="outline" onClick={addSubject} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subject
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-2">
            {activeStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveStep(activeStep - 1)}
                className="w-full sm:w-auto"
              >
                Previous
              </Button>
            )}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {activeStep < 1 && (
                <Button
                  type="button"
                  onClick={() => setActiveStep(activeStep + 1)}
                  disabled={!formData.title || !formData.description}
                  className="w-full sm:w-auto"
                >
                  Next
                </Button>
              )}
              {activeStep === 1 && (
                <Button type="button" onClick={() => setActiveStep(2)} className="w-full sm:w-auto">
                  Review
                </Button>
              )}
              {activeStep === 2 && (
                <Button type="submit" className="w-full sm:w-auto">
                  <Save className="w-4 h-4 mr-2" />
                  Create Course
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}