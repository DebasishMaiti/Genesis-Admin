import { useState, useCallback } from "react";
import { JobAlertCard } from "@/components/cards/JobAlertCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface MobileJobAlertsProps {
  initialAlerts: JobAlert[];
}

export function MobileJobAlerts({ initialAlerts }: MobileJobAlertsProps) {
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
    <div className="min-h-screen bg-background md:hidden">
      {/* Search Bar Only */}
      <section className="bg-background py-4">
        <div className="px-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search job alerts..." 
                className="pl-12 h-12 text-base border-2 focus:border-primary rounded-xl"
              />
            </div>
            <JobAlertsFilterSidebar isOpen={filterOpen} onOpenChange={setFilterOpen}>
              <Button className="h-12 px-4 bg-primary hover:bg-primary/90 rounded-xl">
                <Filter className="h-5 w-5" />
              </Button>
            </JobAlertsFilterSidebar>
          </div>
        </div>
      </section>

      {/* Job Alerts List with Infinite Scroll */}
      <section className="py-4">
        <div className="px-4">
          <InfiniteScroll
            dataLength={alerts.length}
            next={loadMoreAlerts}
            hasMore={hasMore}
            loader={
              <div className="flex justify-center py-8">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading more job alerts...</span>
                </div>
              </div>
            }
            endMessage={
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all available job alerts!
                </p>
              </div>
            }
            className="space-y-4"
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