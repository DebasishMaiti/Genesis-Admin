import { useState } from "react";
import {
  Plus,
  Edit,
  Eye,
  Users,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
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

  const handleSort = (value: string) => {
    const sorted = [...classes].sort((a, b) => {
      switch (value) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "students":
          return b.students - a.students;
        default:
          return 0
      }
    });
    setClasses(sorted);
  };

  const handleView = (classData: TuitionClass) => {
    navigate(`/academics/${classData.id}`, { state: { classData, viewMode: true } });
  };

  const handleEdit = (classData: TuitionClass) => {
    navigate(`/academics/${classData.id}`, { state: { classData, viewMode: false } });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">Admin Academics</h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">Manage all academic classes and course content</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Select onValueChange={handleSort}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by popularity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="students">Most Students</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button className="flex items-center justify-center gap-2 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Add Class
              </Button>
            </div>
          </div>

          {/* Desktop Table View */}
          <Card className="hidden lg:block">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-left font-semibold text-gray-900">Class Title</th>
                      <th className="p-4 text-left font-semibold text-gray-900">Board</th>
                      <th className="p-4 text-left font-semibold text-gray-900">Class</th>
                      <th className="p-4 text-center font-semibold text-gray-900">Students</th>
                      <th className="p-4 text-center font-semibold text-gray-900">Teachers</th>
                      <th className="p-4 text-right font-semibold text-gray-900">Price</th>
                      <th className="p-4 text-right font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((classData) => (
                      <tr key={classData.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-4">
                          <span className="font-semibold text-gray-900">{classData.title}</span>
                        </td>
                        <td className="p-4 text-sm text-gray-700">{classData.board}</td>
                        <td className="p-4 text-sm text-gray-700">{classData.class}</td>
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
                              onClick={() => handleView(classData)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
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

          {/* Mobile/Tablet Card View */}
          <div className="lg:hidden space-y-4">
            {classes.length === 0 ? (
              <Card>
                <CardContent className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700">No classes found</h3>
                  <p className="text-gray-500 mt-1">Create your first class to get started</p>
                </CardContent>
              </Card>
            ) : (
              classes.map((classData) => (
                <Card key={classData.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Title and Board/Class */}
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                          {classData.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {classData.board} • {classData.class}
                        </p>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Students</p>
                            <p className="font-semibold text-sm">{classData.students}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-gray-500">Teachers</p>
                            <p className="font-semibold text-sm">{classData.teachers}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center text-purple-500 font-bold text-lg">
                            ₹
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="font-semibold text-sm">₹{classData.price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(classData)}
                          className="flex-1 text-green-700 bg-green-50 hover:bg-green-100 border-green-200"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(classData)}
                          className="flex-1 text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}