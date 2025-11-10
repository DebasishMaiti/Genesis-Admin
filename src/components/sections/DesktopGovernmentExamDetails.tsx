import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, GraduationCap, Check, Share2, Calendar, Play } from "lucide-react";
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

interface DesktopGovernmentExamDetailsProps {
  examData: ExamData;
}

export function DesktopGovernmentExamDetails({ examData }: DesktopGovernmentExamDetailsProps) {
  const [activeTab, setActiveTab] = useState("classes");
  const [mockTestTab, setMockTestTab] = useState("pyp");
  const isEnrolled = false;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container py-12">
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary">{examData.category}</Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{examData.rating}</span>
              <span className="text-primary-foreground/70 ml-1">
                ({examData.students.toLocaleString()} students)
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3">{examData.title}</h1>
          <p className="text-lg text-primary-foreground/90 max-w-3xl">{examData.description}</p>
          <div className="flex items-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <span>{examData.teachers} Expert Teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{examData.validityDays} Days Validity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Content - 2/3 */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start">
                <TabsTrigger value="classes">Live Classes</TabsTrigger>
                <TabsTrigger value="tests">Mock Tests</TabsTrigger>
                <TabsTrigger value="materials">Study Materials</TabsTrigger>
              </TabsList>

              <TabsContent value="tests" className="mt-6">
                <Tabs value={mockTestTab} onValueChange={setMockTestTab}>
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="pyp">
                        Previous Year Papers ({examData.mockTests.pyp.length})
                      </TabsTrigger>
                      <TabsTrigger value="mcq">
                        MCQ Tests ({examData.mockTests.mcq.length})
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="pyp" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {examData.mockTests.pyp.map((test) => (
                        <MockTestCard key={test.id} {...test} type="pyp" isLocked={!isEnrolled} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="mcq" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {examData.mockTests.mcq.map((test) => (
                        <MockTestCard key={test.id} {...test} type="mcq" isLocked={!isEnrolled} />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="classes" className="mt-6">
                <div className="space-y-4">
                  {examData.subjects.map((subject) => (
                    <SubjectCard key={subject.id} {...subject} isEnrolled={isEnrolled} />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="materials" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {examData.studyMaterials.map((material) => (
                    <StudyMaterialCard key={material.id} {...material} isLocked={!isEnrolled} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar - 1/3 */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Intro Video Card */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-muted relative group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white font-medium">{examData.introVideo?.title || "Introduction to " + examData.examName}</p>
                    <p className="text-white/80 text-sm">{examData.introVideo?.duration || "5:30"}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">
                    {examData.introVideo?.description || `Get an overview of the ${examData.examName} course structure, exam pattern, and what you'll learn in this comprehensive preparation package.`}
                  </p>
                </div>
              </Card>

              {/* Price Card */}
              <Card className="p-6">
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary mb-1">
                    ₹{examData.price.toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground">Complete Package</p>
                </div>

                <Button size="lg" className="w-full mb-4">
                  Enroll Now
                </Button>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Valid for {examData.validityDays} days from purchase
                  </p>
                </div>
              </Card>

              {/* Features Card */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">This package includes:</h3>
                <div className="space-y-3">
                  {examData.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Share Card */}
              <Card className="p-6">
                <Button variant="outline" className="w-full" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share this course
                </Button>
              </Card>

              {/* Stats Card */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Course Stats</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Students</span>
                    <span className="font-medium">{examData.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mock Tests</span>
                    <span className="font-medium">
                      {examData.mockTests.pyp.length + examData.mockTests.mcq.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subjects</span>
                    <span className="font-medium">{examData.subjects.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Study Materials</span>
                    <span className="font-medium">{examData.studyMaterials.length}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
