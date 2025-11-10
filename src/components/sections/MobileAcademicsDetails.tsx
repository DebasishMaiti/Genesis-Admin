import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, GraduationCap } from "lucide-react";
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

interface MobileAcademicsDetailsProps {
  classData: ClassData;
}

export function MobileAcademicsDetails({ classData }: MobileAcademicsDetailsProps) {
  const isEnrolled = false; // Mock enrollment status

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground p-6">
        <Badge variant="secondary" className="mb-2">
          {classData.board}
        </Badge>
        <h1 className="text-2xl font-bold mb-2">{classData.title}</h1>
        <p className="text-primary-foreground/90 text-sm mb-4">{classData.description}</p>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            <span className="font-medium">{classData.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{classData.students.toLocaleString()} students</span>
          </div>
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span>{classData.teachers} teachers</span>
          </div>
        </div>
      </div>

      {/* Subjects Content */}
      <div className="p-4 space-y-3">
        {classData.subjects.map((subject) => (
          <SubjectCard key={subject.id} {...subject} isEnrolled={isEnrolled} />
        ))}
      </div>

      {/* Sticky Bottom Price Card */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Price</p>
            <p className="text-2xl font-bold text-primary">₹{classData.price.toLocaleString()}</p>
          </div>
          <Button size="lg" className="px-8">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}
