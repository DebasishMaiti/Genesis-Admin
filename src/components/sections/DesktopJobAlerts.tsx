import { useState, useCallback } from "react";
import { JobAlertCard } from "@/components/cards/JobAlertCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Loader2 } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { JobAlertsFilterSidebar } from "./JobAlertsFilterSidebar";

interface JobAlert {
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

interface DesktopJobAlertsProps {
  initialAlerts: JobAlert[];
  totalAlerts: number;
}

export function DesktopJobAlerts({ initialAlerts, totalAlerts }: DesktopJobAlertsProps) {
  const [alerts, setAlerts] = useState<JobAlert[]>(initialAlerts);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const loadMoreAlerts = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newAlerts: JobAlert[] = initialAlerts.map((alert, index) => ({
      ...alert,
      id: `${alert.id}-${alerts.length + index}`,
      title: `${alert.title} - Extended`,
    }));
    
    setAlerts(prev => [...prev, ...newAlerts]);
    
    if (alerts.length >= 30) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [alerts.length, initialAlerts, loading]);

  return (
    <div className="min-h-screen bg-background hidden md:block">
      {/* Hero Section */}
      <section className="bg-background py-12">
        <div className="container">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Latest Job Alerts
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest government and private job opportunities across India.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search by job title, department, or location..." 
                  className="pl-12 h-12 text-base border-2 focus:border-primary"
                />
              </div>
              <JobAlertsFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
                <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </JobAlertsFilterSidebar>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="secondary" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                All Jobs
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Government
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Banking
              </Badge>
              <Badge variant="outline" className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                Active Applications
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Job Alerts Section */}
      <section className="py-8">
        <div className="container">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Available Job Opportunities</h2>
              <p className="text-muted-foreground">
                Showing {alerts.length} of {totalAlerts} job alerts
              </p>
            </div>
            <Select>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Sort by deadline" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deadline">Application Deadline</SelectItem>
                <SelectItem value="latest">Latest Posted</SelectItem>
                <SelectItem value="positions">Most Positions</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Alerts Grid with Infinite Scroll */}
          <InfiniteScroll
            dataLength={alerts.length}
            next={loadMoreAlerts}
            hasMore={hasMore}
            loader={
              <div className="col-span-full flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more job alerts...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available job alerts!
                </p>
              </div>
            }
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            {alerts.map((alert) => (
              <JobAlertCard key={alert.id} {...alert} />
            ))}
          </InfiniteScroll>
        </div>
      </section>
    </div>
  );
}