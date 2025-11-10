import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TuitionCardProps {
  id: string;
  board: string;
  class: string;
  title: string;
  subjects: string[];
  thumb: string;
  rating: number;
  students: number;
  teachers: number;
  price: number;
  href: string;
}

export function TuitionCard({
  board,
  class:
  title,
  subjects,
  rating,
  students,
  teachers,
  price,
  href,
}: TuitionCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(href);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Header Image */}
        <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Board Badge */}
            <Badge variant="secondary" className="text-xs px-2 py-1 w-fit">
              {board}
            </Badge>

            {/* Class Title */}
            <div>
              <h3 className="font-bold text-foreground text-lg line-clamp-1">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                {subjects.slice(0, 3).join(", ")}
                {subjects.length > 3 && ` +${subjects.length - 3} more`}
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{students} students</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{teachers} teachers</span>
              </div>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="text-xl font-bold text-primary">
                ₹{price.toLocaleString()}
              </div>
              <Button 
                size="sm"
                className="text-xs px-4"
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-primary" />
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Board Badge */}
            <Badge variant="secondary" className="text-xs px-2 py-1 w-fit">
              {board}
            </Badge>

            {/* Class Title */}
            <div>
              <h3 className="font-bold text-foreground text-base line-clamp-1">
                {title}
              </h3>
              <p className="text-muted-foreground text-xs mt-1 line-clamp-2">
                {subjects.slice(0, 3).join(", ")}
                {subjects.length > 3 && ` +${subjects.length - 3}`}
              </p>
            </div>

            {/* Stats */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{students}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <GraduationCap className="h-3 w-3" />
                <span>{teachers} expert teachers</span>
              </div>
            </div>

            {/* Price and Button */}
            <div className="flex items-center justify-between pt-2 border-t">
              <div className="text-lg font-bold text-primary">
                ₹{price.toLocaleString()}
              </div>
              <Button 
                size="sm"
                className="text-xs"
              >
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}