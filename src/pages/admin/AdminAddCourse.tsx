'use client';

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Save, BookOpen, DollarSign, Clock, Trash2 } from "lucide-react";

interface NewSubjectFormData {
  name: string;
}

interface NewCourseFormData {
  title: string;
  slug: string;
  description: string;
  price: number;
  validityDays: number;
  subjects: NewSubjectFormData[];
}

const availableSubjects = [
  { value: "math", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "english", label: "English" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "computer", label: "Computer Science" },
  { value: "economics", label: "Economics" },
];

export default function AdminAddCourse() {
  const [formData, setFormData] = useState<NewCourseFormData>({
    title: "",
    slug: "",
    description: "",
    price: 0,
    validityDays: 0,
    subjects: [],
  });

  const [activeStep, setActiveStep] = useState(0);
  const [checkedSubjects, setCheckedSubjects] = useState<Set<string>>(new Set());

  const updateBasicInfo = (field: keyof Omit<NewCourseFormData, 'subjects'>, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleSubject = (value: string, checked: boolean) => {
    const newChecked = new Set(checkedSubjects);
    if (checked) {
      newChecked.add(value);
    } else {
      newChecked.delete(value);
    }
    setCheckedSubjects(newChecked);
  };

  const addSelectedSubjects = () => {
    const newSubjects = Array.from(checkedSubjects).map(value => {
      const subject = availableSubjects.find(s => s.value === value);
      return { name: subject?.label || "" };
    }).filter(s => s.name);

    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects.filter(s => !newSubjects.some(ns => ns.name === s.name)), ...newSubjects]
    }));

    setCheckedSubjects(new Set());
  };

  const removeSubject = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Course created successfully!");
  };

  const steps = [
    { title: "Basic Info", icon: <BookOpen className="w-4 h-4" /> },
    { title: "Subjects", icon: <BookOpen className="w-4 h-4" /> },
    { title: "Review", icon: <Save className="w-4 h-4" /> }
  ];

  return (
    <Layout>
      <div className="container mx-auto py-4 px-4 sm:py-6 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 mt-10">
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

          {activeStep >= 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="w-4 h-4" />
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
                  <Label htmlFor="price">Price (INR) *</Label>
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

          {activeStep >= 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="w-4 h-4" />
                  Select Subjects
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-700">Available Subjects</h3>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addSelectedSubjects}
                      disabled={checkedSubjects.size === 0}
                      className="h-8"
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Selected
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-4 bg-muted/30 rounded-lg max-h-96 overflow-y-auto">
                    {availableSubjects
                      .filter(subject => !formData.subjects.some(s => s.name === subject.label))
                      .map(subject => (
                        <div
                          key={subject.value}
                          className="flex items-center space-x-2 p-2 rounded hover:bg-muted transition-colors"
                        >
                          <Checkbox
                            id={`subject-${subject.value}`}
                            checked={checkedSubjects.has(subject.value)}
                            onCheckedChange={(checked) => toggleSubject(subject.value, !!checked)}
                          />
                          <Label
                            htmlFor={`subject-${subject.value}`}
                            className="text-sm font-medium cursor-pointer flex-1"
                          >
                            {subject.label}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>

                {formData.subjects.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-700">Added Subjects ({formData.subjects.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {formData.subjects.map((subject, index) => (
                        <Card key={index} className="p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">{subject.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubject(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

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
                <Button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  disabled={formData.subjects.length === 0}
                  className="w-full sm:w-auto"
                >
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