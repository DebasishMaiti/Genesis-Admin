import { Card, CardContent } from "@/components/ui/card";

interface CategoryCardProps {
  label: string;
  href: string;
}

export function CategoryCard({ label, href }: CategoryCardProps) {
  return (
    <a href={href} className="block">
      <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-subtle cursor-pointer">
        <CardContent className="p-6 text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/30 transition-colors">
            <div className="w-8 h-8 bg-primary/30 rounded-lg"></div>
          </div>
          <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
            {label}
          </h3>
        </CardContent>
      </Card>
    </a>
  );
}