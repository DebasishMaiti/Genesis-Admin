import { Star, Users, Clock } from "lucide-react";
import { Card, CardContent} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id: string;
  title: string;
  thumb: string;
  category: string;
  rating: number;
  lessons: number;
  price: number;
  href: string;
}

export function CourseCard({ title, category, rating, lessons, price, href }: CourseCardProps) {
  return (
    <Card className="group overflow-hidden bg-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="relative overflow-hidden aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/40 rounded"></div>
          </div>
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-2 py-1">
            {category}
          </Badge>
          <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/95 backdrop-blur-sm px-2 py-1 rounded-md border">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-foreground">{rating}</span>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="font-semibold text-lg leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{lessons} lessons</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Live</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              ₹{price.toLocaleString()}
            </div>
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6">
              <a href={href}>Enroll Now</a>
            </Button>
          </div>
        </CardContent>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Full width image on top with fixed aspect ratio */}
        <div className="w-full aspect-[16/10] bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
          <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-primary/40 rounded"></div>
          </div>
        </div>
        
        {/* Content below */}
        <div className="p-4">
          <h3 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              {category}
            </Badge>
            <span>Available</span>
          </div>

          <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>({rating})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{lessons} lessons</span>
            </div>
          </div>

          <div className="text-2xl font-bold text-primary mb-4">
            ₹{price.toLocaleString()}/course
          </div>

          <div className="flex gap-3">
            <Button asChild className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
              <a href={href}>Enroll Now</a>
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}