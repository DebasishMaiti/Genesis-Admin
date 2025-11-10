import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, FileText, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TestSeriesCardProps {
  id: string;
  title: string;
  category: string;
  type: string;
  thumb: string;
  rating: number;
  tests: number;
  attempts: number;
  price: number;
  duration: string;
  language: string;
  href: string;
}

export function TestSeriesCard({
  title,
  category,
  type,
  rating,
  tests,
  attempts,
  price,
  duration,
  language,
  href
}: TestSeriesCardProps) {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(href);
  };

  const handleStartTestClick = () => {
    navigate(href);
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
            <FileText className="w-8 h-8 text-primary/60" />
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-xs">
              {category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {type}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            <span className="text-xs text-muted-foreground">({attempts} attempts)</span>
          </div>
          
          <h3 className="font-semibold text-sm mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>{tests} Tests</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{duration}</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Language: {language}</span>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <span>{attempts}+</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-bold text-primary">
              ₹{price.toLocaleString()}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={handleDetailsClick}
            >
              Details
            </Button>
            <Button 
              size="sm" 
              className="flex-1 text-xs"
              onClick={handleStartTestClick}
            >
              Start Test
            </Button>
          </div>
        </CardContent>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-primary/60" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="secondary" className="text-xs">
                  {category}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {type}
                </Badge>
              </div>
              
              <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                {title}
              </h3>
              
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{rating}</span>
                <span className="text-xs text-muted-foreground">• {attempts} attempts</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-3">
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  <span>{tests} Tests</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-3 mb-3">
            <div className="text-lg font-bold text-primary">
              ₹{price.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">
              {language}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 text-xs"
              onClick={handleDetailsClick}
            >
              Details
            </Button>
            <Button 
              size="sm" 
              className="flex-1 text-xs"
              onClick={handleStartTestClick}
            >
              Start Test
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}