import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";

interface WeeklyTestFilterSidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WeeklyTestFilterSidebar({ children, isOpen, onOpenChange }: WeeklyTestFilterSidebarProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);

  const categories = [
    "SSC", "Banking", "CET", "Insurance", "Railways", "Defence", "Teaching", "MBA"
  ];

  const difficulties = ["Easy", "Medium", "Hard"];

  const durations = [
    "30-60 minutes",
    "60-90 minutes", 
    "90-120 minutes",
    "120+ minutes"
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleDifficultyChange = (difficulty: string, checked: boolean) => {
    if (checked) {
      setSelectedDifficulty([...selectedDifficulty, difficulty]);
    } else {
      setSelectedDifficulty(selectedDifficulty.filter(d => d !== difficulty));
    }
  };

  const handleDurationChange = (duration: string, checked: boolean) => {
    if (checked) {
      setSelectedDuration([...selectedDuration, duration]);
    } else {
      setSelectedDuration(selectedDuration.filter(d => d !== duration));
    }
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedDifficulty([]);
    setPriceRange([0, 500]);
    setSelectedDuration([]);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <SheetTitle>Filter Weekly Tests</SheetTitle>
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

          {/* Difficulty Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Difficulty Level</h3>
            <div className="space-y-3">
              {difficulties.map((difficulty) => (
                <div key={difficulty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`difficulty-${difficulty}`}
                    checked={selectedDifficulty.includes(difficulty)}
                    onCheckedChange={(checked) => handleDifficultyChange(difficulty, checked as boolean)}
                  />
                  <Label htmlFor={`difficulty-${difficulty}`} className="text-sm font-normal">
                    {difficulty}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Duration Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Test Duration</h3>
            <div className="space-y-3">
              {durations.map((duration) => (
                <div key={duration} className="flex items-center space-x-2">
                  <Checkbox
                    id={`duration-${duration}`}
                    checked={selectedDuration.includes(duration)}
                    onCheckedChange={(checked) => handleDurationChange(duration, checked as boolean)}
                  />
                  <Label htmlFor={`duration-${duration}`} className="text-sm font-normal">
                    {duration}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Price Range</h3>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={500}
                min={0}
                step={10}
                className="mb-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
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