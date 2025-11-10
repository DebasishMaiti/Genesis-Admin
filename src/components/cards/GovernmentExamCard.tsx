import { Card } from "@/components/ui/card";
import { Star, Users, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GovernmentExamCardProps {
  id: string;
  category: string;
  examName: string;
  title: string;
  subjects: string[];
  thumb: string;
  rating: number;
  students: number;
  teachers: number;
  price: number;
  href: string;
}

export function GovernmentExamCard({
  category,
  examName,
  title,
  subjects,
  rating,
  students,
  teachers,
  price,
}: GovernmentExamCardProps) {
  const navigate = useNavigate();

  // Generate slug from category and name
  const slug = category.toLowerCase() === 'ssc' ? 'ssc-cgl' : 'ibps-po';

  const handleCardClick = () => {
    navigate(`/government-exam/${slug}`);
  };

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50"
      onClick={handleCardClick}
    >
      {/* Card Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        {/* Category Badge */}
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-semibold px-3 py-1">
          {category}
        </Badge>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Exam Name */}
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-1">
          {examName}
        </h3>

        {/* Full Title */}
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2 min-h-[2.5rem]">
          {title}
        </p>

        {/* Subjects */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {subjects.slice(0, 2).map((subject, idx) => (
              <span 
                key={idx}
                className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded"
              >
                {subject}
              </span>
            ))}
            {subjects.length > 2 && (
              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                +{subjects.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2 text-sm mb-3 pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span className="text-xs">{students.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-xs">
            <GraduationCap className="w-4 h-4" />
            <span>{teachers} expert teachers</span>
          </div>
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <div className="text-xl font-bold text-primary">
              ₹{price.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Complete Package</div>
          </div>
          <Button 
            size="sm"
            className="text-xs"
          >
            View
          </Button>
        </div>
      </div>
    </Card>
  );
}
