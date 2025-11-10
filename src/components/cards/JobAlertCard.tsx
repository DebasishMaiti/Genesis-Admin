import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, GraduationCap, Briefcase, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface JobAlertCardProps {
  id: string;
  title: string;
  department: string;
  category: string;
  description: string;
  positions: number;
  location: string;
  qualification: string;
  experience: string;
  salary: string;
  thumb: string;
  applicationDeadline: string;
  examDate: string;
  status: string;
  jobType: string;
  href: string;
}

export function JobAlertCard({
  title,
  department,
  category,
  description,
  positions,
  location,
  qualification,
  experience,
  salary,
  applicationDeadline,
  status,
  jobType,
  href
}: JobAlertCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'text-green-600 bg-green-50';
      case 'closing soon':
        return 'text-orange-600 bg-orange-50';
      case 'closed':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getJobTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'government':
        return 'text-blue-600 bg-blue-50';
      case 'private':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatPositions = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K+ Posts`;
    }
    return `${count} Posts`;
  };

  return (
    <>
      {/* Mobile Layout */}
      <Card className="md:hidden hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs px-2 py-1">
                  {category}
                </Badge>
                <Badge className={`text-xs px-2 py-1 ${getJobTypeColor(jobType)}`}>
                  {jobType}
                </Badge>
                <Badge className={`text-xs px-2 py-1 ${getStatusColor(status)}`}>
                  {status}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-foreground leading-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{department}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          
          <div className="space-y-2 text-sm text-muted-foreground flex-grow">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{formatPositions(positions)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>{salary}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Apply by: {formatDate(applicationDeadline)}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" className="flex-1" size="sm" onClick={() => navigate(href)}>
              View Details
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" size="sm" onClick={() => navigate(href)}>
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Desktop Layout */}
      <Card className="hidden md:block hover:shadow-lg transition-shadow h-full">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="px-3 py-1">
                  {category}
                </Badge>
                <Badge className={`px-3 py-1 ${getJobTypeColor(jobType)}`}>
                  {jobType}
                </Badge>
                <Badge className={`px-3 py-1 ${getStatusColor(status)}`}>
                  {status}
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{department}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{formatPositions(positions)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>{qualification}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>{experience}</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <DollarSign className="h-4 w-4" />
              <span className="font-medium">Salary: {salary}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Deadline: {formatDate(applicationDeadline)}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-auto">
            <Button variant="outline" className="flex-1" onClick={() => navigate(href)}>
              View Details
            </Button>
            <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => navigate(href)}>
              Apply Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}