import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface TuitionFilterSidebarProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TuitionFilterSidebar({ children, isOpen, onOpenChange }: TuitionFilterSidebarProps) {
  const [searchFilter, setSearchFilter] = useState("");
  const [boardFilter, setBoardFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [modeFilter, setModeFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  const handleApplyFilters = () => {
    const filters = {
      search: searchFilter,
      board: boardFilter,
      class: classFilter,
      subject: subjectFilter,
      mode: modeFilter,
      language: languageFilter,
      price: priceFilter,
    };
    console.log("Applied filters:", filters);
    onOpenChange(false);
  };

  const handleResetFilters = () => {
    setSearchFilter("");
    setBoardFilter("");
    setClassFilter("");
    setSubjectFilter("");
    setModeFilter("");
    setLanguageFilter("");
    setPriceFilter("");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Tuition Classes</SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Search Filter */}
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search by class, board, or subject..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </div>

          <Separator />

          {/* Board Filter */}
          <div className="space-y-2">
            <Label>Board</Label>
            <Select value={boardFilter} onValueChange={setBoardFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Board" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cbse">CBSE</SelectItem>
                <SelectItem value="icse">ICSE</SelectItem>
                <SelectItem value="ib">IB</SelectItem>
                <SelectItem value="maharashtra">Maharashtra State Board</SelectItem>
                <SelectItem value="karnataka">Karnataka State Board</SelectItem>
                <SelectItem value="tamil-nadu">Tamil Nadu State Board</SelectItem>
                <SelectItem value="gujarat">Gujarat State Board</SelectItem>
                <SelectItem value="college">College</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Class/Grade Filter */}
          <div className="space-y-2">
            <Label>Class/Grade</Label>
            <Select value={classFilter} onValueChange={setClassFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Class 1</SelectItem>
                <SelectItem value="2">Class 2</SelectItem>
                <SelectItem value="3">Class 3</SelectItem>
                <SelectItem value="4">Class 4</SelectItem>
                <SelectItem value="5">Class 5</SelectItem>
                <SelectItem value="6">Class 6</SelectItem>
                <SelectItem value="7">Class 7</SelectItem>
                <SelectItem value="8">Class 8</SelectItem>
                <SelectItem value="9">Class 9</SelectItem>
                <SelectItem value="10">Class 10</SelectItem>
                <SelectItem value="11">Class 11</SelectItem>
                <SelectItem value="12">Class 12</SelectItem>
                <SelectItem value="fy">FY (First Year)</SelectItem>
                <SelectItem value="sy">SY (Second Year)</SelectItem>
                <SelectItem value="ty">TY (Third Year)</SelectItem>
                <SelectItem value="ba1">BA 1st Year</SelectItem>
                <SelectItem value="ba2">BA 2nd Year</SelectItem>
                <SelectItem value="ba3">BA 3rd Year</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject Filter */}
          <div className="space-y-2">
            <Label>Subject</Label>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="accounts">Accounts</SelectItem>
                <SelectItem value="economics">Economics</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="geography">Geography</SelectItem>
                <SelectItem value="computer">Computer Science</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Mode Filter */}
          <div className="space-y-2">
            <Label>Mode</Label>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Filter */}
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="marathi">Marathi</SelectItem>
                <SelectItem value="gujarati">Gujarati</SelectItem>
                <SelectItem value="tamil">Tamil</SelectItem>
                <SelectItem value="kannada">Kannada</SelectItem>
                <SelectItem value="telugu">Telugu</SelectItem>
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
                <SelectItem value="20000+">₹20,000+</SelectItem>
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