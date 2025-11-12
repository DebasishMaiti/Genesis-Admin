import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {Clock, Edit, Eye } from "lucide-react";

interface Course {
  id: number;
  title: string;
  category: string;
  lessons: number;
  price: number;
  href: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: "Complete SSC CGL Preparation Course",
    category: "SSC",
 
    lessons: 120,
    price: 4999,
    href: `/user/course/1`,
  },
  {
    id: 2,
    title: "Banking PO & Clerk Exam Masterclass",
    category: "Banking",
 
    lessons: 95,
    price: 3999,
    href: `/user/course/2`,
  },
  {
    id: 3,
    title: "UPSC Civil Services Foundation",
    category: "UPSC",

    lessons: 200,
    price: 12999,
    href: `/user/course/3`,
  },
  {
    id: 4,
    title: "Railway Group D Complete Course",
    category: "Railways",
    lessons: 80,
    price: 2999,
    href: `/user/course/4`,
  },
  {
    id: 5,
    title: "State PSC Comprehensive Package",
    category: "State PSC",
    lessons: 150,
    price: 6999,
    href: `/user/course/5`,
  },
  {
    id: 6,
    title: "Defence Services Preparation Kit",
    category: "Defence",
    lessons: 110,
    price: 5499,
    href: `/user/course/6`,
  },
];

export default function AdminCourse() {
  const navigate = useNavigate();

  const goToEdit = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(`/course/${id}?mode=edit`);
  };

  const goToView = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    navigate(`/course/${id}?mode=view`);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                Courses
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage all courses – edit, view, or add new ones.
              </p>
            </div>
            <Button
              onClick={() => navigate("/course-add")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add New Course
            </Button>
          </div>

          {/* Result count */}
          <p className="mb-4 text-sm text-gray-600">
            Showing <span className="font-semibold">{courses.length}</span> courses
          </p>

          {/* DESKTOP TABLE */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lessons
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{c.title}</div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge className="bg-primary/10 text-primary">{c.category}</Badge>
                      </td>
 
                      {/* Lessons */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-gray-400" />
                          {c.lessons}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ₹{c.price.toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={(e) => goToView(e, c.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            onClick={(e) => goToEdit(e, c.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* MOBILE  */}
          <div className="lg:hidden space-y-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                      {c.title}
                    </h3>
                    <Badge className="ml-2 bg-primary/10 text-primary text-xs">
                      {c.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
 
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {c.lessons} lessons
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">
                    ₹{c.price.toLocaleString()}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={(e) => goToView(e, c.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => goToEdit(e, c.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}