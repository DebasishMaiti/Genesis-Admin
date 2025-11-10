import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Genesis Education</h3>
            <p className="text-sm text-background/80">
              Empowering students with quality education and comprehensive preparation for competitive exams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-background/80 hover:text-background transition-colors">About Us</a></li>
              <li><a href="/admission" className="text-sm text-background/80 hover:text-background transition-colors">Admission Process</a></li>
              <li><a href="/events" className="text-sm text-background/80 hover:text-background transition-colors">Events</a></li>
              <li><a href="/gallery" className="text-sm text-background/80 hover:text-background transition-colors">Gallery</a></li>
              <li><a href="/blog" className="text-sm text-background/80 hover:text-background transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Courses</h3>
            <ul className="space-y-2">
              <li><a href="/courses/cet" className="text-sm text-background/80 hover:text-background transition-colors">CET Preparation</a></li>
              <li><a href="/courses/banking" className="text-sm text-background/80 hover:text-background transition-colors">Banking Exams</a></li>
              <li><a href="/courses/ssc" className="text-sm text-background/80 hover:text-background transition-colors">SSC Preparation</a></li>
              <li><a href="/courses/insurance" className="text-sm text-background/80 hover:text-background transition-colors">Insurance Exams</a></li>
              <li><a href="/test-series" className="text-sm text-background/80 hover:text-background transition-colors">Test Series</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-background/80" />
                <span className="text-sm text-background/80">123, Main Street, Kolkata, IN</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-background/80" />
                <span className="text-sm text-background/80">+91-90000-00000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-background/80" />
                <span className="text-sm text-background/80">hello@genesisedu.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-sm text-background/80">
            © 2025 Genesis Education Institute. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}