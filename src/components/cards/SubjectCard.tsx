import { Card } from "@/components/ui/card";
import { ChevronRight, Calculator, Brain, BookOpen, Globe } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ClassCard } from "./ClassCard";
interface ClassLesson {
  id: string;
  title: string;
  instructor: string;
  duration: number;
  liveSchedule: {
    date: string;
    time: string;
    status: "upcoming" | "live" | "completed";
  };
  recordedVideo?: {
    url: string;
    duration: string;
    views: number;
  } | null;
  enrolledStudents: number;
  isFree?: boolean;
}
interface Chapter {
  id: string;
  title: string;
  totalClasses: number;
  classes: ClassLesson[];
}
interface SubjectCardProps {
  id: string;
  name: string;
  icon: string;
  totalChapters: number;
  completedChapters: number;
  chapters: Chapter[];
  isEnrolled?: boolean;
}
const iconMap: Record<string, any> = {
  Calculator,
  Brain,
  BookOpen,
  Globe
};
export function SubjectCard({
  name,
  icon,
  totalChapters,
  completedChapters,
  chapters,
  isEnrolled = false
}: SubjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = iconMap[icon] || BookOpen;
  return <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="overflow-hidden">
        <CollapsibleTrigger className="w-full">
          <div className="p-4 hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground">{name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedChapters}/{totalChapters} Chapters
                  </p>
                </div>
              </div>
              <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
            </div>
            
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t divide-y">
            {chapters.map(chapter => <div key={chapter.id}>
                <div className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-foreground">
                        {chapter.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span>{chapter.totalClasses} classes</span>
                        {chapter.classes && chapter.classes.length > 0 && <>
                            <span>•</span>
                            <span className="text-primary font-medium">
                              {chapter.classes.length} scheduled
                            </span>
                          </>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Classes for this chapter */}
                {chapter.classes && chapter.classes.length > 0 && <div className="p-4 bg-background space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {chapter.classes.map(classLesson => <ClassCard key={classLesson.id} {...classLesson} isEnrolled={isEnrolled} />)}
                    </div>
                  </div>}

                {chapter.classes && chapter.classes.length === 0 && <div className="p-4 bg-background">
                    <p className="text-sm text-muted-foreground text-center">
                      No classes scheduled yet
                    </p>
                  </div>}
              </div>)}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>;
}