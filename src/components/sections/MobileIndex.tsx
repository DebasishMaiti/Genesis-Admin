import { HeroSection } from "@/components/ui/hero-section";
import { CourseCard } from "@/components/cards/CourseCard";
import { TuitionCard } from "@/components/cards/TuitionCard";
import { CategoryCard } from "@/components/cards/CategoryCard";
import { EventCard } from "@/components/cards/EventCard";
import { TestSeriesCard } from "@/components/cards/TestSeriesCard";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { Marquee } from "@/components/sections/Marquee";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

interface MobileIndexProps {
  homeData: any;
  marqueeItems: string[];
}

export function MobileIndex({ homeData, marqueeItems }: MobileIndexProps) {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        heading={homeData.hero.heading}
        subheading={homeData.hero.subheading}
        ctaPrimary={homeData.hero.ctaPrimary}
        ctaSecondary={homeData.hero.ctaSecondary}
        bgImage={homeData.hero.bgImage}
      />

      {/* Marquee Updates */}
      <Marquee items={marqueeItems} />

      {/* Quality Tuition Classes */}
      <section className="py-12 bg-background">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Quality Tuition Classes
            </h2>
            <p className="text-muted-foreground">
              Expert tutoring for all boards & subjects
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {homeData.popularTuition.map((tuition: any) => (
              <TuitionCard key={tuition.id} {...tuition} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <a href="/tuition">View All Tuition Classes</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 bg-background">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Explore Categories
            </h2>
            <p className="text-muted-foreground">
              Choose your exam preparation
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {homeData.categories.map((category: any) => (
              <CategoryCard
                key={category.key}
                label={category.label}
                href={category.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Test Series */}
      <section className="py-12 bg-background">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Test Series
            </h2>
            <p className="text-muted-foreground">
              Complete exam preparation
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {[
              { 
                id: "ts1", 
                title: "SSC CGL Complete Series", 
                category: "SSC",
                type: "Mock Test",
                thumb: "",
                rating: 4.8,
                tests: 50, 
                attempts: 1250,
                price: 999, 
                duration: "3 Hours",
                language: "Bilingual",
                href: "/test-series/ssc-cgl-complete"
              },
              { 
                id: "ts2", 
                title: "Banking Preparation Kit", 
                category: "Banking",
                type: "Mock Test",
                thumb: "",
                rating: 4.6,
                tests: 40, 
                attempts: 850,
                price: 799, 
                duration: "2.5 Hours",
                language: "English",
                href: "/test-series/banking-prep"
              },
              { 
                id: "ts3", 
                title: "UPSC Prelims Series", 
                category: "UPSC",
                type: "Practice Test",
                thumb: "",
                rating: 4.9,
                tests: 60, 
                attempts: 1200,
                price: 1499, 
                duration: "3 Hours",
                language: "Bilingual",
                href: "/test-series/upsc-prelims"
              }
            ].map((series) => (
              <TestSeriesCard key={series.id} {...series} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <a href="/test-series">View Test Series</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Books Buying */}
      <section className="py-12 bg-muted/30">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Books & Study Material
            </h2>
            <p className="text-muted-foreground">
              Best books for preparation
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {[
              { id: 1, title: "Quantitative Aptitude", author: "R.S. Aggarwal", price: "₹450", originalPrice: "₹550", rating: "4.5", image: "📊" },
              { id: 2, title: "General Knowledge Manual", author: "Arihant Publications", price: "₹350", originalPrice: "₹420", rating: "4.3", image: "🌐" },
              { id: 3, title: "English Grammar Guide", author: "Wren & Martin", price: "₹280", originalPrice: "₹340", rating: "4.7", image: "📖" }
            ].map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-r from-background to-muted/20">
                <CardContent className="p-4 flex gap-4">
                  <div className="relative w-20 h-24 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <div className="text-primary text-center">
                      <div className="text-2xl mb-1">{book.image}</div>
                      <div className="text-xs font-medium text-primary/80">Book</div>
                    </div>
                    <div className="absolute top-1 right-1 bg-accent/20 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                      <span className="text-xs font-semibold text-accent-foreground">⭐ {book.rating}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">by {book.author}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-primary">{book.price}</span>
                        <span className="text-xs text-muted-foreground line-through">{book.originalPrice}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
                        🛒 Add to Cart
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        👁️ Preview
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="sm">
              <a href="/books">Browse Books</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Quiz */}
      <section className="py-12 bg-background">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Daily Quiz
            </h2>
            <p className="text-muted-foreground">
              Test your knowledge daily
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {[
              { id: 1, title: "General Knowledge", questions: "25 Questions", time: "30 mins", difficulty: "Easy" },
              { id: 2, title: "Current Affairs", questions: "20 Questions", time: "25 mins", difficulty: "Medium" },
              { id: 3, title: "Mathematics", questions: "30 Questions", time: "45 mins", difficulty: "Hard" }
            ].map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-4 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{quiz.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground flex-grow">
                    <p>{quiz.questions}</p>
                    <p>Time: {quiz.time}</p>
                    <p>Difficulty: {quiz.difficulty}</p>
                  </div>
                  <Button className="w-full mt-3 bg-primary hover:bg-primary/90" size="sm">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <a href="/daily-quiz">Start Daily Quiz</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Weekly Test */}
      <section className="py-12 bg-muted/30">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Weekly Test
            </h2>
            <p className="text-muted-foreground">
              Weekly assessments
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {[
              { id: 1, title: "SSC CGL Mock Test", subjects: "All Subjects", duration: "3 Hours" },
              { id: 2, title: "Bank PO Weekly", subjects: "Reasoning, Quant, English", duration: "2 Hours" },
              { id: 3, title: "UPSC Prelims Test", subjects: "GS + CSAT", duration: "4 Hours" }
            ].map((test) => (
              <Card key={test.id} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-4 flex flex-col h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{test.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground flex-grow">
                    <p>Subjects: {test.subjects}</p>
                    <p>Duration: {test.duration}</p>
                  </div>
                  <Button variant="outline" className="w-full mt-3" size="sm">
                    Take Test
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="sm">
              <a href="/weekly-test">View Weekly Tests</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-12 bg-muted/30">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Popular Courses
            </h2>
            <p className="text-muted-foreground">
              Join our top-rated courses
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {homeData.popularCourses.map((course: any) => (
              <CourseCard key={course.id} {...course} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <a href="/courses">View All Courses</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Job Alerts */}
      <section className="py-12 bg-background">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Job Alerts
            </h2>
            <p className="text-muted-foreground">
              Latest job opportunities
            </p>
          </div>
          
          <div className="space-y-4 mb-6">
            {homeData.events.map((event: any) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="sm">
              <a href="/job-alerts">View All Job Alerts</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-12 bg-background">
        <div className="px-4">
          <EnquiryForm
            heading={homeData.enquiry.heading}
            fields={homeData.enquiry.fields}
            submitLabel={homeData.enquiry.submitLabel}
            submitHref={homeData.enquiry.submitHref}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-muted/30">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              What Students Say
            </h2>
            <p className="text-muted-foreground">
              Success stories from achievers
            </p>
          </div>
          
          <div className="space-y-4">
            {homeData.testimonials.map((testimonial: any) => (
              <TestimonialCard key={testimonial.id} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-12 bg-gradient-secondary">
        <div className="px-4">
          <Card className="bg-background/95 backdrop-blur border-0 shadow-xl">
            <CardContent className="p-6 text-center space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                {homeData.ctaBanner.heading}
              </h2>
              <p className="text-sm text-muted-foreground">
                Get expert tips and exam updates.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder={homeData.ctaBanner.inputPlaceholder}
                  className="w-full"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  {homeData.ctaBanner.buttonLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}