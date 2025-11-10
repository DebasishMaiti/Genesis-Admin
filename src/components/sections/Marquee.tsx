interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  return (
    <div className="bg-secondary text-secondary-foreground py-2 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap">
        {items.map((item, index) => (
          <span key={index} className="mx-8 text-sm font-medium">
            📢 {item}
          </span>
        ))}
      </div>
    </div>
  );
}