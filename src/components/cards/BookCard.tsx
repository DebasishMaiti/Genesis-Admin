import { Card, CardContent } from "@/components/ui/card";
 
import { Button } from "@/components/ui/button";
 

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  subject: string;
  category: string;
  type: string;
  thumb: string;
  rating: number;
  pages: number;
  price: number;
  originalPrice?: number;
  language: string;
  edition: string;
  publication: string;
  href: string;
}

export function BookCard({
  title,
  author,
  subject,
  category,
  rating,
  price,
  originalPrice,
}: BookCardProps) {
  // Generate emoji based on category/subject for consistent placeholder
  const getBookEmoji = (subject: string, category: string) => {
    const subjectLower = subject.toLowerCase();
    const categoryLower = category.toLowerCase();
    
    if (subjectLower.includes('math') || subjectLower.includes('quantitative')) return '📊';
    if (subjectLower.includes('english') || subjectLower.includes('language')) return '📖';
    if (subjectLower.includes('general') || subjectLower.includes('knowledge')) return '🌐';
    if (subjectLower.includes('reasoning') || subjectLower.includes('logic')) return '🧠';
    if (categoryLower.includes('science')) return '🔬';
    if (categoryLower.includes('history')) return '📜';
    return '📚'; // default book emoji
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full border-0 shadow-md bg-gradient-to-br from-background to-muted/30">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <CardContent className="p-6 flex flex-col h-full">
          <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl mb-4 flex items-center justify-center overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-primary text-center z-10">
              <div className="text-4xl mb-2">{getBookEmoji(subject, category)}</div>
              <div className="text-sm font-medium text-primary/80">Study Material</div>
            </div>
            <div className="absolute top-2 right-2 bg-accent/20 backdrop-blur-sm rounded-full px-2 py-1">
              <span className="text-xs font-semibold text-accent-foreground">⭐ {rating}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">by {author}</p>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl font-bold text-primary">₹{price}</span>
              {originalPrice && (
                <>
                  <span className="text-sm text-muted-foreground line-through">₹{originalPrice}</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    Save ₹{originalPrice - price}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-gradient-to-r from-background to-muted/20">
          <CardContent className="p-4 flex gap-4">
            <div className="relative w-20 h-24 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              <div className="text-primary text-center">
                <div className="text-2xl mb-1">{getBookEmoji(subject, category)}</div>
                <div className="text-xs font-medium text-primary/80">Book</div>
              </div>
              <div className="absolute top-1 right-1 bg-accent/20 backdrop-blur-sm rounded-full px-1.5 py-0.5">
                <span className="text-xs font-semibold text-accent-foreground">⭐ {rating}</span>
              </div>
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1 line-clamp-2">{title}</h3>
                <p className="text-xs text-muted-foreground mb-2">by {author}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-primary">₹{price}</span>
                  {originalPrice && (
                    <span className="text-xs text-muted-foreground line-through">₹{originalPrice}</span>
                  )}
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
      </div>
    </Card>
  );
}