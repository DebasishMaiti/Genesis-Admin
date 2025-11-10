import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, Lock, Play } from "lucide-react";
import { CountdownTimer } from "@/components/ui/countdown-timer";
interface ClassCardProps {
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
  isEnrolled?: boolean;
}
export function ClassCard({
  title,
  instructor,
  duration,
  liveSchedule,
  recordedVideo,
  enrolledStudents,
  isFree = false,
  isEnrolled = false
}: ClassCardProps) {
  const isLocked = !isFree && !isEnrolled;
  const getStatusBadge = () => {
    if (liveSchedule.status === "live") {
      return <Badge className="bg-red-500 hover:bg-red-600 text-white">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
            Live Now
          </div>
        </Badge>;
    }
    return null;
  };
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };
  return <Card className="p-4 hover:shadow-md transition-shadow relative">
      {isLocked}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h4 className="font-semibold text-foreground line-clamp-2 text-sm">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">{instructor}</p>
          </div>
          {getStatusBadge()}
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(liveSchedule.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {liveSchedule.time} ({duration} mins)
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{enrolledStudents.toLocaleString()} enrolled</span>
          </div>
        </div>

        {liveSchedule.status === "upcoming" && <div className="pt-2 border-t">
            <CountdownTimer targetDate={liveSchedule.date} targetTime={liveSchedule.time} />
          </div>}

        {liveSchedule.status === "completed" && recordedVideo && <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Play className="h-3.5 w-3.5" />
                {recordedVideo.duration}
              </span>
              <span>{recordedVideo.views.toLocaleString()} views</span>
            </div>
          </div>}

        <Button className="w-full" size="sm" variant={liveSchedule.status === "live" ? "default" : "outline"} disabled={isLocked}>
          {isLocked ? <>
              <Lock className="h-4 w-4 mr-2" />
              Enroll to Access
            </> : liveSchedule.status === "completed" && recordedVideo ? <>
              <Play className="h-4 w-4 mr-2" />
              Watch Recording
            </> : <>
              <Video className="h-4 w-4 mr-2" />
              {liveSchedule.status === "live" ? "Join Now" : "Set Reminder"}
            </>}
        </Button>
      </div>
    </Card>;
}