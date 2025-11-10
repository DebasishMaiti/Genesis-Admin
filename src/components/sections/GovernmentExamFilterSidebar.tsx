import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface GovernmentExamFilterSidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function GovernmentExamFilterSidebar({ children, isOpen, onOpenChange }: GovernmentExamFilterSidebarProps) {
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");

  const handleApplyFilters = () => {
    const filters = {
      search: searchFilter,
      category: categoryFilter,
      difficulty: difficultyFilter,
      price: priceFilter,
      language: languageFilter,
    };
    console.log("Applied filters:", filters);
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setSearchFilter("");
    setCategoryFilter("");
    setDifficultyFilter("");
    setPriceFilter("");
    setLanguageFilter("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Government Exams</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Search Filter */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search for exams..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <Separator />

          {/* Category Filter */}
          <div className="space-y-2">
            <Label>Exam Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ssc">SSC (Staff Selection Commission)</SelectItem>
                <SelectItem value="banking">Banking</SelectItem>
                <SelectItem value="railways">Railways</SelectItem>
                <SelectItem value="defence">Defence</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
                <SelectItem value="teaching">Teaching</SelectItem>
                <SelectItem value="state-psc">State PSC</SelectItem>
                <SelectItem value="upsc">UPSC</SelectItem>
                <SelectItem value="other">Other Central Exams</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty Level Filter */}
          <div className="space-y-2">
            <Label>Difficulty Level</Label>
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner (Clerk, Group D)</SelectItem>
                <SelectItem value="intermediate">Intermediate (SSC, Banking)</SelectItem>
                <SelectItem value="advanced">Advanced (PO, Civil Services)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Filter */}
          <div className="space-y-2">
            <Label>Medium of Instruction</Label>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="bilingual">Bilingual (English + Hindi)</SelectItem>
                <SelectItem value="regional">Regional Languages</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2">
            <Label>Price Range</Label>
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-5000">₹0 - ₹5,000</SelectItem>
                <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                <SelectItem value="10000-15000">₹10,000 - ₹15,000</SelectItem>
                <SelectItem value="15000-20000">₹15,000 - ₹20,000</SelectItem>
                <SelectItem value="20000-25000">₹20,000 - ₹25,000</SelectItem>
                <SelectItem value="25000+">₹25,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={handleApplyFilters} className="flex-1">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleResetFilters} className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
