import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Users, GraduationCap } from "lucide-react";
import { MockTestCard } from "@/components/cards/MockTestCard";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { StudyMaterialCard } from "@/components/cards/StudyMaterialCard";

interface ExamData {
  id: string;
  slug: string;
  category: string;
  examName: string;
  title: string;
  description: string;
  rating: number;
  students: number;
  teachers: number;
  price: number;
  validityDays: number;
  features: string[];
  mockTests: {
    pyp: any[];
    mcq: any[];
  };
  subjects: any[];
  liveClasses: any[];
  studyMaterials: any[];
  introVideo?: {
    title: string;
    thumbnail: string;
    duration: string;
    description: string;
  };
}

interface MobileGovernmentExamDetailsProps {
  examData: ExamData;
}

export function MobileGovernmentExamDetails({ examData }: MobileGovernmentExamDetailsProps) {
  const [activeTab, setActiveTab] = useState("classes");
  const [mockTestTab, setMockTestTab] = useState("pyp");
  const isEnrolled = false; // Mock enrollment status

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground p-6">
        <Badge variant="secondary" className="mb-2">
          {examData.category}
        </Badge>
        <h1 className="text-2xl font-bold mb-2">{examData.examName}</h1>
        <p className="text-primary-foreground/90 text-sm mb-4">{examData.description}</p>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{examData.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{examData.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span>{examData.teachers} teachers</span>
          </div>
        </div>
      </div>

      {/* Sticky Tabs */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none h-auto p-0 bg-transparent overflow-x-auto">
            <TabsTrigger value="classes" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary whitespace-nowrap">
              Live Classes
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary whitespace-nowrap">
              Mock Tests
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex-1 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary whitespace-nowrap">
              Study Materials
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === "tests" && (
          <div className="space-y-4">
            <Tabs value={mockTestTab} onValueChange={setMockTestTab}>
              <TabsList className="w-full">
                <TabsTrigger value="pyp" className="flex-1">
                  PYP ({examData.mockTests.pyp.length})
                </TabsTrigger>
                <TabsTrigger value="mcq" className="flex-1">
                  MCQ Tests ({examData.mockTests.mcq.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pyp" className="space-y-3 mt-4">
                {examData.mockTests.pyp.map((test) => (
                  <MockTestCard key={test.id} {...test} type="pyp" isLocked={!isEnrolled} />
                ))}
              </TabsContent>

              <TabsContent value="mcq" className="space-y-3 mt-4">
                {examData.mockTests.mcq.map((test) => (
                  <MockTestCard key={test.id} {...test} type="mcq" isLocked={!isEnrolled} />
                ))}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeTab === "classes" && (
          <div className="space-y-3">
            {examData.subjects.map((subject) => (
              <SubjectCard key={subject.id} {...subject} isEnrolled={isEnrolled} />
            ))}
          </div>
        )}

        {activeTab === "materials" && (
          <div className="space-y-3">
            {examData.studyMaterials.map((material) => (
              <StudyMaterialCard key={material.id} {...material} isLocked={!isEnrolled} />
            ))}
          </div>
        )}
      </div>

      {/* Sticky Bottom Price Card */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Price</p>
            <p className="text-2xl font-bold text-primary">₹{examData.price.toLocaleString()}</p>
          </div>
          <Button size="lg" className="px-8">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
