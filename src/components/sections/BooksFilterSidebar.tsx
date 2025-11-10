import type { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";

interface BooksFilterSidebarProps {
  children: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BooksFilterSidebar({ children, isOpen, onOpenChange }: BooksFilterSidebarProps) {
  const categories = ["SSC", "Banking", "Railways", "Police", "Teaching", "General"];
  const subjects = ["General Studies", "Mathematics", "English", "Science", "Current Affairs", "Banking Awareness"];
  const types = ["Physical Book", "E-Book", "Combo Pack"];
  const languages = ["English", "Hindi", "Bilingual"];
  const publications = ["Genesis Publications", "McGraw Hill", "Arihant", "Kiran"];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader className="text-left">
          <div className="flex items-center justify-between">
            <SheetTitle>Filter Books</SheetTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Active Filters */}
          <div>
            <h3 className="font-medium mb-3">Active Filters</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                SSC
                <X className="h-3 w-3 cursor-pointer" />
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                English
                <X className="h-3 w-3 cursor-pointer" />
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-3">
              <Slider
                defaultValue={[0, 2000]}
                max={2000}
                step={50}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹0</span>
                <span>₹2000+</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Category */}
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category}`} />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Subject */}
          <div>
            <h3 className="font-medium mb-3">Subject</h3>
            <div className="space-y-2">
              {subjects.map((subject) => (
                <div key={subject} className="flex items-center space-x-2">
                  <Checkbox id={`subject-${subject}`} />
                  <label
                    htmlFor={`subject-${subject}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {subject}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Book Type */}
          <div>
            <h3 className="font-medium mb-3">Book Type</h3>
            <div className="space-y-2">
              {types.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={`type-${type}`} />
                  <label
                    htmlFor={`type-${type}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Language */}
          <div>
            <h3 className="font-medium mb-3">Language</h3>
            <div className="space-y-2">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox id={`language-${language}`} />
                  <label
                    htmlFor={`language-${language}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Publication */}
          <div>
            <h3 className="font-medium mb-3">Publication</h3>
            <div className="space-y-2">
              {publications.map((publication) => (
                <div key={publication} className="flex items-center space-x-2">
                  <Checkbox id={`publication-${publication}`} />
                  <label
                    htmlFor={`publication-${publication}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {publication}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Filter Actions */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              Clear All
            </Button>
            <Button className="flex-1">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}