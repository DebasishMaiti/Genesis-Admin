import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

interface JobAlertsFilterSidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JobAlertsFilterSidebar({ children, isOpen, onOpenChange }: JobAlertsFilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedQualification, setSelectedQualification] = useState<string[]>([]);
  const [positionsRange, setPositionsRange] = useState([0, 50000]);

  const categories = [
    "SSC", "Banking", "Railways", "UPSC", "Insurance", "Defence", "Private", "Teaching"
  ];

  const jobTypes = ["Government", "Private", "PSU", "Semi-Government"];

  const statuses = ["Active", "Closing Soon", "Closed"];

  const qualifications = [
    "10th Pass",
    "12th Pass", 
    "Bachelor's Degree",
    "Master's Degree",
    "Diploma",
    "Any Graduate"
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleJobTypeChange = (jobType: string, checked: boolean) => {
    if (checked) {
      setSelectedJobTypes([...selectedJobTypes, jobType]);
    } else {
      setSelectedJobTypes(selectedJobTypes.filter(jt => jt !== jobType));
    }
  };

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setSelectedStatus([...selectedStatus, status]);
    } else {
      setSelectedStatus(selectedStatus.filter(s => s !== status));
    }
  };

  const handleQualificationChange = (qualification: string, checked: boolean) => {
    if (checked) {
      setSelectedQualification([...selectedQualification, qualification]);
    } else {
      setSelectedQualification(selectedQualification.filter(q => q !== qualification));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedJobTypes([]);
    setSelectedStatus([]);
    setSelectedQualification([]);
    setPositionsRange([0, 50000]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <SheetTitle>Filter Job Alerts</SheetTitle>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        </SheetHeader>

        <div className="space-y-6">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Category</h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Job Type Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Job Type</h3>
            <div className="space-y-3">
              {jobTypes.map((jobType) => (
                <div key={jobType} className="flex items-center space-x-2">
                  <Checkbox
                    id={`jobtype-${jobType}`}
                    checked={selectedJobTypes.includes(jobType)}
                    onCheckedChange={(checked) => handleJobTypeChange(jobType, checked as boolean)}
                  />
                  <Label htmlFor={`jobtype-${jobType}`} className="text-sm font-normal">
                    {jobType}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Application Status Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Application Status</h3>
            <div className="space-y-3">
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${status}`}
                    checked={selectedStatus.includes(status)}
                    onCheckedChange={(checked) => handleStatusChange(status, checked as boolean)}
                  />
                  <Label htmlFor={`status-${status}`} className="text-sm font-normal">
                    {status}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Qualification Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Qualification</h3>
            <div className="space-y-3">
              {qualifications.map((qualification) => (
                <div key={qualification} className="flex items-center space-x-2">
                  <Checkbox
                    id={`qualification-${qualification}`}
                    checked={selectedQualification.includes(qualification)}
                    onCheckedChange={(checked) => handleQualificationChange(qualification, checked as boolean)}
                  />
                  <Label htmlFor={`qualification-${qualification}`} className="text-sm font-normal">
                    {qualification}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Number of Positions Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Number of Positions</h3>
            <div className="px-2">
              <Slider
                value={positionsRange}
                onValueChange={setPositionsRange}
                max={50000}
                min={0}
                step={1000}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{positionsRange[0]}</span>
                <span>{positionsRange[1]}+ Posts</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Apply Filters Button */}
          <div className="pt-4">
            <Button className="w-full bg-primary hover:bg-primary/90" onClick={() => onOpenChange(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}