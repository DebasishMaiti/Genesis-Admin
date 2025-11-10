import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, GraduationCap, Calendar, Share2 } from "lucide-react";
import { SubjectCard } from "@/components/cards/SubjectCard";

interface ClassData {
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
  subjects: any[];
}

interface DesktopAcademicsDetailsProps {
  classData: ClassData;
}

export function DesktopAcademicsDetails({ classData }: DesktopAcademicsDetailsProps) {
  const isEnrolled = false; // Mock enrollment status

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-12">
          <Badge variant="secondary" className="mb-3">
            {classData.board}
          </Badge>
          <h1 className="text-4xl font-bold mb-3">{classData.title}</h1>
          <p className="text-primary-foreground/90 text-lg mb-6 max-w-3xl">
            {classData.description}
          </p>

          <div className="flex items-center gap-6 text-base">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 fill-current" />
              <span className="font-medium">{classData.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>{classData.students.toLocaleString()} students enrolled</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <span>{classData.teachers} expert teachers</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{classData.validityDays} days validity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Subjects */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold mb-4">Course Subjects</h2>
            {classData.subjects.map((subject) => (
              <SubjectCard key={subject.id} {...subject} isEnrolled={isEnrolled} />
            ))}
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Price Card */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Course Price</p>
                    <p className="text-3xl font-bold text-primary">₹{classData.price.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Valid for {classData.validityDays} days
                    </p>
                  </div>
                  <Button className="w-full" size="lg">
                    Enroll Now
                  </Button>
                </div>
              </Card>

              {/* Share Card */}
              <Card className="p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share this course
                </h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Copy Link
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
