import { useState, useCallback } from "react";
import {
  Plus,
  Edit,
  Star,
  Users,
  Calculator,
  Microscope,
  Globe,
  BookOpen,
  Video,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { useNavigate } from "react-router-dom";

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
    "id": "c1",
    "slug": "cbse-class-10",
    "board": "CBSE",
    "class": "Class 10",
    "title": "CBSE Class 10",
    "description": "Comprehensive course covering all CBSE Class 10 subjects with live classes, expert teachers, and complete study materials.",
    "rating": 4.8,
    "students": 1250,
    "teachers": 8,
    "price": 24999,
    "validityDays": 365,
    "subjects": [
      {
        "id": "math",
        "name": "Mathematics",
        "icon": "Calculator",
        "totalChapters": 5,
        "completedChapters": 0,
        "chapters": [
          {
            "id": "ch1",
            "title": "Real Numbers",
            "totalClasses": 10,
            "classes": [
              {
                "id": "cls1",
                "title": "Introduction to Real Numbers",
                "instructor": "Dr. Amit Kumar",
                "duration": 60,
                "liveSchedule": {
                  "date": "2025-10-15",
                  "time": "10:00 AM",
                  "status": "upcoming"
                },
                "enrolledStudents": 450,
                "isFree": true
              },
              {
                "id": "cls2",
                "title": "Euclid's Division Lemma",
                "instructor": "Dr. Amit Kumar",
                "duration": 75,
                "liveSchedule": {
                  "date": "2025-10-10",
                  "time": "10:00 AM",
                  "status": "completed"
                },
                "recordedVideo": {
                  "url": "/videos/euclid-division.mp4",
                  "duration": "1:15:30",
                  "views": 1230
                },
                "enrolledStudents": 450
              }
            ]
          }
        ]
      },
      {
        "id": "science",
        "name": "Science",
        "icon": "Microscope",
        "totalChapters": 16,
        "completedChapters": 0,
        "chapters": [
          {
            "id": "ch3",
            "title": "Chemical Reactions and Equations",
            "totalClasses": 1,
            "classes": [
              {
                "id": "cls4",
                "title": "Types of Chemical Reactions",
                "instructor": "Dr. Priya Patel",
                "duration": 90,
                "liveSchedule": {
                  "date": "2025-10-18",
                  "time": "11:00 AM",
                  "status": "upcoming"
                },
                "enrolledStudents": 480,
                "isFree": true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "c2",
    slug: "cbse-class-9",
    board: "CBSE",
    class: "Class 9",
    title: "CBSE Class 9",
    description: "Complete CBSE Class 9 curriculum with interactive learning.",
    rating: 4.6,
    students: 980,
    teachers: 6,
    price: 22999,
    validityDays: 365,
    subjects: []
  },
  {
    id: "c3",
    slug: "icse-class-10",
    board: "ICSE",
    class: "Class 10",
    title: "ICSE Class 10",
    description: "ICSE board comprehensive course for Class 10 students.",
    rating: 4.7,
    students: 1100,
    teachers: 7,
    price: 26999,
    validityDays: 365,
    subjects: []
  }
];

export default function AdminAcademics() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<TuitionClass[]>(demoData);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const loadMoreClasses = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newBatch = demoData.map((c, i) => ({
      ...c,
      id: `${c.id}-${classes.length + i}`,
      slug: `${c.slug}-${classes.length + i}`,
    }));
    setClasses((prev) => [...prev, ...newBatch]);
    if (classes.length + newBatch.length >= 50) setHasMore(false);
    setLoading(false);
  }, [classes.length, loading]);

  const handleSort = (value: string) => {
    const sorted = [...classes].sort((a, b) => {
      switch (value) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "students":
          return b.students - a.students;
        default:
          return 0;
      }
    });
    setClasses(sorted);
  };

  const handleEdit = (classData: TuitionClass) => {
    navigate(`/academics/${classData.id}`, { state: { classData } });
  };

  const toggleRowExpansion = (classId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(classId)) {
      newExpanded.delete(classId);
    } else {
      newExpanded.add(classId);
    }
    setExpandedRows(newExpanded);
  };

  const getSubjectIcon = (iconName: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch(iconName) {
      case 'Calculator': return <Calculator {...iconProps} />;
      case 'Microscope': return <Microscope {...iconProps} />;
      case 'Globe': return <Globe {...iconProps} />;
      default: return <BookOpen {...iconProps} />;
    }
  };

  const getStatusBadge = (status: 'upcoming' | 'completed') => {
    return status === 'upcoming' 
      ? <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">Upcoming</Badge>
      : <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">Completed</Badge>;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Academics</h1>
              <p className="text-gray-600 mt-1">Manage all academic classes and course content</p>
            </div>
            
            <div className="flex gap-3">
              <Select onValueChange={handleSort}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by popularity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="students">Most Students</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Class
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-left font-semibold text-gray-900">Class Title</th>
                      <th className="p-4 text-left font-semibold text-gray-900">Board</th>
                      <th className="p-4 text-left font-semibold text-gray-900">Class</th>
                      <th className="p-4 text-left font-semibold text-gray-900">Rating</th>
                      <th className="p-4 text-center font-semibold text-gray-900">Students</th>
                      <th className="p-4 text-center font-semibold text-gray-900">Teachers</th>
                      <th className="p-4 text-right font-semibold text-gray-900">Price</th>
                      <th className="p-4 text-right font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((classData) => (
                      <>
                        {/* Main Class Row */}
                        <tr key={classData.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4">
                            <button
                              onClick={() => toggleRowExpansion(classData.id)}
                              className="flex items-center gap-2 hover:bg-gray-100 rounded p-1"
                            >
                              {expandedRows.has(classData.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                              <span className="font-semibold text-gray-900">{classData.title}</span>
                            </button>
                          </td>
                          <td className="p-4 text-sm text-gray-700">{classData.board}</td>
                          <td className="p-4 text-sm text-gray-700">{classData.class}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{classData.rating}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Users className="w-4 h-4 text-blue-500" />
                              <span>{classData.students}</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Users className="w-4 h-4 text-green-500" />
                              <span>{classData.teachers}</span>
                            </div>
                          </td>
                          <td className="p-4 text-right font-semibold">₹{classData.price.toLocaleString()}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2 justify-end">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(classData)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>

                        {/* Expanded Details Row */}
                        {expandedRows.has(classData.id) && (
                          <tr className="bg-gray-50">
                            <td colSpan={8} className="p-4">
                              <div className="space-y-4">
                                {/* Class Description */}
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                                  <p className="text-sm text-gray-600">{classData.description}</p>
                                </div>

                                {/* Subjects Table */}
                                {classData.subjects && classData.subjects.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold text-gray-900 mb-3">Subjects & Chapters</h4>
                                    <div className="overflow-x-auto">
                                      <table className="w-full text-sm">
                                        <thead className="bg-gray-100">
                                          <tr>
                                            <th className="p-3 text-left">Subject</th>
                                            <th className="p-3 text-left">Chapters</th>
                                            <th className="p-3 text-left">Total Classes</th>
                                            <th className="p-3 text-left">Classes</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {classData.subjects.map((subject) => (
                                            <tr key={subject.id} className="border-b border-gray-200">
                                              <td className="p-3">
                                                <div className="flex items-center gap-2">
                                                  {getSubjectIcon(subject.icon)}
                                                  <span className="font-medium">{subject.name}</span>
                                                </div>
                                              </td>
                                              <td className="p-3">
                                                <div className="space-y-2">
                                                  {subject.chapters.map((chapter) => (
                                                    <div key={chapter.id} className="flex items-center justify-between">
                                                      <span className="text-gray-700">{chapter.title}</span>
                                                      <Badge variant="secondary" className="ml-2">
                                                        {chapter.classes.length}/{chapter.totalClasses}
                                                      </Badge>
                                                    </div>
                                                  ))}
                                                </div>
                                              </td>
                                              <td className="p-3">
                                                {subject.chapters.reduce((total, chapter) => total + chapter.totalClasses, 0)}
                                              </td>
                                              <td className="p-3">
                                                <div className="space-y-2 max-w-md">
                                                  {subject.chapters.flatMap(chapter => 
                                                    chapter.classes.map(cls => (
                                                      <div key={cls.id} className="flex items-center justify-between p-2 bg-white rounded border">
                                                        <div className="flex-1">
                                                          <div className="flex items-center gap-2">
                                                            <Video className="w-3 h-3 text-green-600" />
                                                            <span className="font-medium text-sm">{cls.title}</span>
                                                            {cls.isFree && (
                                                              <Badge className="bg-green-100 text-green-800 text-xs">Free</Badge>
                                                            )}
                                                          </div>
                                                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                                            <span>{cls.instructor}</span>
                                                            <span>{cls.duration}min</span>
                                                            <span>{cls.enrolledStudents} students</span>
                                                          </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                          {getStatusBadge(cls.liveSchedule.status)}
                                                          <span className="text-xs text-gray-500">
                                                            {cls.liveSchedule.date} {cls.liveSchedule.time}
                                                          </span>
                                                        </div>
                                                      </div>
                                                    ))
                                                  )}
                                                </div>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                )}

                                {(!classData.subjects || classData.subjects.length === 0) && (
                                  <div className="text-center py-4 text-gray-500">
                                    <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                    <p>No subjects added yet</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table> 
              </div>

              {classes.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No classes found</h3>
                  <p className="text-gray-500 mt-1">Create your first class to get started</p>
                </div>
              )}
            </CardContent>
          </Card>

          {hasMore && classes.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={loadMoreClasses} 
                disabled={loading}
                variant="outline"
                className="flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Classes'
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}