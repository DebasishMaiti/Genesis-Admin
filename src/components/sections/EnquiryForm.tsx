import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EnquiryFormProps {
  heading: string;
  fields: string[];
  submitLabel: string;
  submitHref: string;
}

export function EnquiryForm({ heading, submitLabel }: EnquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    courseOfInterest: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <Card className="bg-gradient-primary text-primary-foreground border-0">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{heading}</CardTitle>
        <p className="text-primary-foreground/90">
          Get personalized guidance from our education experts
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-primary-foreground">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-primary-foreground">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/70"
                placeholder="+91 9876543210"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course" className="text-primary-foreground">Course Interest</Label>
              <Select value={formData.courseOfInterest} onValueChange={(value) => setFormData(prev => ({ ...prev, courseOfInterest: value }))}>
                <SelectTrigger className="bg-background/10 border-primary-foreground/20 text-primary-foreground">
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cet">CET Preparation</SelectItem>
                  <SelectItem value="banking">Banking Exams</SelectItem>
                  <SelectItem value="ssc">SSC Preparation</SelectItem>
                  <SelectItem value="insurance">Insurance Exams</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-6 text-lg"
          >
            <Send className="mr-2 h-5 w-5" />
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}