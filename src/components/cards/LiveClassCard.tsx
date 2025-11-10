import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Video, Lock } from "lucide-react";
import { CountdownTimer } from "@/components/ui/countdown-timer";

interface LiveClassCardProps {
  id: string;
  title: string;
  instructor: string;
  subject: string;
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "live" | "completed";
  enrolledStudents: number;
  isLocked?: boolean;
}

export function LiveClassCard({
  title,
  instructor,
  subject,
  date,
  time,
  duration,
  status,
  enrolledStudents,
  isLocked = false,
}: LiveClassCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "live":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
              Live Now
            </div>
          </Badge>
        );
      case "upcoming":
        return <Badge variant="outline">Upcoming</Badge>;
      case "completed":
        return <Badge variant="secondary">Completed</Badge>;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card className="p-4 hover:shadow-md transition-shadow relative">
      {isLocked && (
        <div className="absolute top-3 right-3 bg-background/95 p-1.5 rounded-full">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-foreground line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{instructor}</p>
          </div>
          {getStatusBadge()}
        </div>

        <Badge variant="outline" className="text-xs">
          {subject}
        </Badge>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              {time} ({duration} mins)
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{enrolledStudents.toLocaleString()} enrolled</span>
          </div>
        </div>

        {status === "upcoming" && (
          <div className="pt-2 border-t">
            <CountdownTimer targetDate={date} targetTime={time} />
          </div>
        )}

        <Button 
          className="w-full" 
          size="sm" 
          variant={status === "live" ? "default" : "outline"}
          disabled={isLocked}
        >
          {isLocked ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Enroll to Access
            </>
          ) : (
            <>
              <Video className="h-4 w-4 mr-2" />
              {status === "live" ? "Join Now" : status === "upcoming" ? "Set Reminder" : "Watch Recording"}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
