import React from 'react';
import { Users, BookOpen, Edit, PlusCircle, ChevronDown, ChevronUp, FileText, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';

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

export const examsData: { list: Exam[] } = {
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
      href: "/gov-exam/ssc-cgl"
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
      href: "/gov-exam/ssc-chsl"
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
      href: "/gov-exam/ibps-po"
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
      href: "/gov-exam/sbi-clerk"
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
      href: "/gov-exam/rrb-ntpc"
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
      href: "/gov-exam/rrb-group-d"
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
      href: "/gov-exam/nda"
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
      href: "/gov-exam/cds"
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
      href: "/gov-exam/lic-aao"
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
      href: "/gov-exam/ctet"
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
      href: "/gov-exam/mpsc"
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
      href: "/gov-exam/upsc-cse"
    }
  ]
};

export default function AdminGovExam() {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = React.useState<Set<string>>(new Set());

  const toggleRow = (examId: string) => {
    const newSet = new Set(expandedRows);
    if (newSet.has(examId)) {
      newSet.delete(examId);
    } else {
      newSet.add(examId);
    }
    setExpandedRows(newSet);
  };

  const handleView = (e: React.MouseEvent, examId: string) => {
    e.stopPropagation();
 navigate(`/gov-exam/${examId}?view=true`);
  };

  const handleEdit = (e: React.MouseEvent, examId: string) => {
    e.stopPropagation();
    navigate(`/gov-exam/${examId}?edit=true`);
  };

  const handleAddMockTest = (e: React.MouseEvent, examId: string) => {
    e.stopPropagation();
    navigate(`/mock-add/${examId}`);
  };

  const handleAddStudyMaterial = (e: React.MouseEvent, examId: string) => {
    e.stopPropagation();
    navigate(`/study-material-add/${examId}`);
  };

  const handleAddNewExam = () => {
    navigate('/gov-exam-add')
  };
                         
  return (
    <Layout>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-7">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Government Exams
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage all government exam courses and mock tests
            </p>
          </div>
          <button
            onClick={handleAddNewExam}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Exam
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-600">
            Showing <span className="font-semibold text-gray-900">{examsData.list.length}</span> exams
          </p>
        </div>

        <div className="hidden lg:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Teachers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {examsData.list.map((exam) => (
                  <tr
                    key={exam.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{exam.examName}</div>
                        <div className="text-sm text-gray-500">{exam.title}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {exam.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        {exam.students.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4 text-gray-400" />
                        {exam.teachers}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ₹{exam.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {exam.subjects.slice(0, 2).map((subject, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                            {subject}
                          </span>
                        ))}
                        {exam.subjects.length > 2 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
                            +{exam.subjects.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => handleView(e, exam.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                          title="View Public Page"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button
                          onClick={(e) => handleEdit(e, exam.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors"
                          title="Edit Exam"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleAddMockTest(e, exam.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Mock
                        </button>
                        <button
                          onClick={(e) => handleAddStudyMaterial(e, exam.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Study
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:hidden space-y-4">
          {examsData.list.map((exam) => {
            const isExpanded = expandedRows.has(exam.id);
            return (
              <div
                key={exam.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-4 cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-gray-900">{exam.examName}</h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {exam.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{exam.title}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {exam.students.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {exam.teachers}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleRow(exam.id);
                      }}
                      className="ml-2 p-1 rounded-full hover:bg-gray-100"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-200">
                    <div className="mt-3 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Price</p>
                        <p className="text-sm font-medium text-gray-900">₹{exam.price.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">Subjects</p>
                        <div className="flex flex-wrap gap-1">
                          {exam.subjects.map((subject, idx) => (
                            <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {subject}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <button
                          onClick={(e) => handleView(e, exam.id)}
                          className="flex justify-center items-center gap-1 px-3 py-2 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button
                          onClick={(e) => handleEdit(e, exam.id)}
                          className="flex justify-center items-center gap-1 px-3 py-2 text-xs font-medium text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={(e) => handleAddMockTest(e, exam.id)}
                          className="flex justify-center items-center gap-1 px-3 py-2 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
                        >
                          <PlusCircle className="w-3.5 h-3.5" />
                          Mock
                        </button>
                        <button
                          onClick={(e) => handleAddStudyMaterial(e, exam.id)}
                          className="flex justify-center items-center gap-1 px-3 py-2 text-xs font-medium text-purple-700 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Study
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {examsData.list.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No exams found</h3>
            <p className="text-gray-600">Click "Add New Exam" to create one.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}