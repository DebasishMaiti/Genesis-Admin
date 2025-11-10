import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  id: string;
  name: string;
  avatar: string;
  text: string;
}

export function TestimonialCard({ name, text }: TestimonialCardProps) {
  return (
    <Card className="border-0 shadow-md h-full bg-gradient-subtle">
      <CardContent className="p-6 space-y-4 h-full flex flex-col">
        <Quote className="h-8 w-8 text-primary/30" />
        
        <p className="text-muted-foreground italic flex-1">
          "{text}"
        </p>

        <div className="flex items-center space-x-3 pt-4 border-t">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground font-medium text-sm">
              {name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">Student</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}