import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface DailyQuizFilterSidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const filterData = {
  categories: ["All", "General Knowledge", "Current Affairs", "Mathematics", "English", "Reasoning", "Science", "History", "Geography", "Polity", "Economics"],
  difficulties: ["All", "Easy", "Medium", "Hard"],
  durations: ["All", "Under 20 mins", "20-30 mins", "30-45 mins", "Above 45 mins"],
  pointRanges: ["All", "Under 50 points", "50-70 points", "70-90 points", "Above 90 points"]
};

export function DailyQuizFilterSidebar({ 
  children, 
  isOpen, 
  onOpenChange 
}: DailyQuizFilterSidebarProps) {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    difficulty: "All", 
    duration: "All",
    pointRange: "All"
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", filters);
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "All",
      difficulty: "All",
      duration: "All", 
      pointRange: "All"
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader>
          <SheetTitle>Filter Daily Quizzes</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Search */}
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <Input
              placeholder="Search quiz topics..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {filterData.categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-sm font-medium mb-2 block">Difficulty</label>
            <Select value={filters.difficulty} onValueChange={(value) => handleFilterChange("difficulty", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {filterData.difficulties.map((difficulty) => (
                  <SelectItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium mb-2 block">Duration</label>
            <Select value={filters.duration} onValueChange={(value) => handleFilterChange("duration", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                {filterData.durations.map((duration) => (
                  <SelectItem key={duration} value={duration}>
                    {duration}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Point Range */}
          <div>
            <label className="text-sm font-medium mb-2 block">Points</label>
            <Select value={filters.pointRange} onValueChange={(value) => handleFilterChange("pointRange", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select point range" />
              </SelectTrigger>
              <SelectContent>
                {filterData.pointRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-4">
            <Button onClick={handleApplyFilters} className="w-full">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleResetFilters} className="w-full">
              Reset
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}