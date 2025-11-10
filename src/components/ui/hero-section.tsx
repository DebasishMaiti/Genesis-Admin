import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  bgImage?: string;
}

export function HeroSection({
  heading,
  subheading,
  ctaPrimary,
  ctaSecondary,
  bgImage,
}: HeroSectionProps) {
  return (
    <section
      className="flex flex-col items-center justify-center py-24 text-center bg-cover bg-center"
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : undefined }}
    >
      <h1 className="text-5xl font-bold mb-4">{heading}</h1>
      {subheading && (
        <p className="text-lg text-gray-600 mb-6">{subheading}</p>
      )}
      <div className="flex gap-4">
        {ctaPrimary && <Button>{ctaPrimary}</Button>}
        {ctaSecondary && (
          <Button variant="outline">{ctaSecondary}</Button>
        )}
      </div>
    </section>
  );
}
