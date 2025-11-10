import { Calendar} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  id: string;
  title: string;
  dateISO: string;
  desc: string;
  href: string;
}

export function EventCard({ title, dateISO, desc, href }: EventCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-subtle">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formatDate(dateISO)}</span>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {desc}
          </p>
        </div>

        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={href}>Learn More</a>
        </Button>
      </CardContent>
    </Card>
  );
}