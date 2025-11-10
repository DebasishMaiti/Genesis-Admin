import { Calendar, Download, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface UpdateCardProps {
  id: string;
  title: string;
  dateISO: string;
  link: string;
  pdf?: string;
}

export function UpdateCard({ title, dateISO, link, pdf }: UpdateCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            {formatDate(dateISO)}
          </Badge>
          {pdf && (
            <Button size="sm" variant="ghost" asChild>
              <a href={pdf} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>

        <h3 className="font-semibold text-lg leading-tight line-clamp-3 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={link}>
            Read More
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}