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

interface DesktopIndexProps {
  homeData: any;
  marqueeItems: string[];
}

export function DesktopIndex({
  homeData,
  marqueeItems
}: DesktopIndexProps) {
  return <>
      {/* Hero Section */}
      <HeroSection heading={homeData.hero.heading} subheading={homeData.hero.subheading} ctaPrimary={homeData.hero.ctaPrimary} ctaSecondary={homeData.hero.ctaSecondary} bgImage={homeData.hero.bgImage} />

      {/* Marquee Updates */}
      <Marquee items={marqueeItems} />

      {/* Quality Tuition Classes */}
      <section className="py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Quality Tuition Classes
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Expert tutoring for all boards, classes, and subjects with personalized attention
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {homeData.popularTuition.map((tuition: any) => <TuitionCard key={tuition.id} {...tuition} />)}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
              <a href="/academics">View All Academic Classes</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Explore Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of competitive exam preparations
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {homeData.categories.map((category: any) => <CategoryCard key={category.key} label={category.label} href={category.href} />)}
          </div>
        </div>
      </section>

      {/* Test Series */}
      <section className="py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Test Series
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive test series for complete exam preparation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[{
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
          }, {
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
          }, {
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
          }, {
            id: "ts4",
            title: "Railway Complete Pack",
            category: "Railways",
            type: "Full Length Test",
            thumb: "",
            rating: 4.5,
            tests: 35,
            attempts: 750,
            price: 699,
            duration: "2.5 Hours",
            language: "Hindi",
            href: "/test-series/railway-complete"
          }].map(series => <TestSeriesCard key={series.id} {...series} />)}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
              <a href="/test-series">View Test Series</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Books & Study Material */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Books & Study Material
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get the best books and study materials for your exam preparation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[{
            id: 1,
            title: "Quantitative Aptitude",
            author: "R.S. Aggarwal",
            price: "₹450",
            originalPrice: "₹550",
            rating: "4.5",
            image: "📊"
          }, {
            id: 2,
            title: "General Knowledge Manual",
            author: "Arihant Publications",
            price: "₹350",
            originalPrice: "₹420",
            rating: "4.3",
            image: "🌐"
          }, {
            id: 3,
            title: "English Grammar Guide",
            author: "Wren & Martin",
            price: "₹280",
            originalPrice: "₹340",
            rating: "4.7",
            image: "📖"
          }, {
            id: 4,
            title: "Reasoning Complete Book",
            author: "M.K. Pandey",
            price: "₹520",
            originalPrice: "₹650",
            rating: "4.4",
            image: "🧠"
          }].map(book => <Card key={book.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-0 shadow-md bg-gradient-to-br from-background to-muted/30">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-primary text-center z-10">
                      <div className="text-4xl mb-2">{book.image}</div>
                      <div className="text-sm font-medium text-primary/80">Study Material</div>
                    </div>
                    <div className="absolute top-2 right-2 bg-accent/20 backdrop-blur-sm rounded-full px-2 py-1">
                      <span className="text-xs font-semibold text-accent-foreground">⭐ {book.rating}</span>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {book.author}</p>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl font-bold text-primary">{book.price}</span>
                      <span className="text-sm text-muted-foreground line-through">{book.originalPrice}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                        Save ₹{parseInt(book.originalPrice.replace('₹', '')) - parseInt(book.price.replace('₹', ''))}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <a href="/books">Browse Books</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Quiz */}
      <section className="py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Daily Quiz
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Test your knowledge with our daily practice questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[{
            id: 1,
            title: "General Knowledge",
            questions: "25 Questions",
            time: "30 mins",
            difficulty: "Easy"
          }, {
            id: 2,
            title: "Current Affairs",
            questions: "20 Questions",
            time: "25 mins",
            difficulty: "Medium"
          }, {
            id: 3,
            title: "Mathematics",
            questions: "30 Questions",
            time: "45 mins",
            difficulty: "Hard"
          }, {
            id: 4,
            title: "English",
            questions: "25 Questions",
            time: "30 mins",
            difficulty: "Easy"
          }].map(quiz => <Card key={quiz.id} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{quiz.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground flex-grow">
                    <p>{quiz.questions}</p>
                    <p>Time: {quiz.time}</p>
                    <p>Difficulty: {quiz.difficulty}</p>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
              <a href="/daily-quiz">Start Daily Quiz</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Weekly Test */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Weekly Test
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Challenge yourself with comprehensive weekly assessments
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[{
            id: 1,
            title: "SSC CGL Mock Test",
            subjects: "All Subjects",
            duration: "3 Hours",
            attempts: "1.2k"
          }, {
            id: 2,
            title: "Bank PO Weekly",
            subjects: "Reasoning, Quant, English",
            duration: "2 Hours",
            attempts: "856"
          }, {
            id: 3,
            title: "UPSC Prelims Test",
            subjects: "GS + CSAT",
            duration: "4 Hours",
            attempts: "2.1k"
          }, {
            id: 4,
            title: "Railway Group D",
            subjects: "Math, GK, Reasoning",
            duration: "1.5 Hours",
            attempts: "967"
          }].map(test => <Card key={test.id} className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{test.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground flex-grow">
                    <p>Subjects: {test.subjects}</p>
                    <p>Duration: {test.duration}</p>
                    <p>{test.attempts} attempts</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Take Test
                  </Button>
                </CardContent>
              </Card>)}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <a href="/weekly-test">View Weekly Tests</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-24 bg-background">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Popular Courses
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of successful students in our top-rated courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {homeData.popularCourses.map((course: any) => <CourseCard key={course.id} {...course} />)}
          </div>

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
              <a href="/courses">View All Courses</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Job Alerts */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Job Alerts
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest job opportunities and recruitment notifications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {homeData.events.map((event: any) => <EventCard key={event.id} {...event} />)}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <a href="/job-alerts">View All Job Alerts</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-24 bg-background">
        <div className="container max-w-5xl">
          <EnquiryForm heading={homeData.enquiry.heading} fields={homeData.enquiry.fields} submitLabel={homeData.enquiry.submitLabel} submitHref={homeData.enquiry.submitHref} />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-muted/30">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Success stories from our achievers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeData.testimonials.map((testimonial: any) => <TestimonialCard key={testimonial.id} {...testimonial} />)}
          </div>
        </div>
      </section>

      {/* Newsletter Call to Action */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container max-w-5xl">
          <Card className="bg-background/95 backdrop-blur border-0 shadow-xl">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="text-3xl font-bold text-foreground">
                {homeData.ctaBanner.heading}
              </h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto">
                Get weekly study tips and exam updates directly to your inbox.
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder={homeData.ctaBanner.inputPlaceholder}
                  className="flex-1"
                />
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <Mail className="mr-2 h-4 w-4" />
                  {homeData.ctaBanner.buttonLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>;
}