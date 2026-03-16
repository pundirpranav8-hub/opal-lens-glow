import { Camera, Palette } from "lucide-react";
import RippleCard from "./RippleCard";

const cardData = [
  {
    icon: Camera,
    title: "Photography",
    description: "Portraits, landscapes, events — stories captured in a single frame.",
    href: "#photography",
  },
  {
    icon: Palette,
    title: "Projects",
    description: "Editing, color grading, and brand visuals that define identity.",
    href: "#projects",
  },
];

const PortfolioCards = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
      {cardData.map((card, i) => (
        <div
          key={card.title}
          className="opacity-0 animate-fade-in-up"
          style={{ animationDelay: `${0.2 + i * 0.15}s` }}
        >
          <RippleCard
            className="bg-card rounded-2xl aspect-[4/5] flex flex-col items-center justify-center p-8 group"
            onClick={() => scrollTo(card.href)}
          >
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
              <card.icon className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
              {card.title}
            </h3>
            <p className="text-muted-foreground text-center leading-relaxed text-sm">
              {card.description}
            </p>
            <span className="text-ui text-primary mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Explore →
            </span>
          </RippleCard>
        </div>
      ))}
    </div>
  );
};

export default PortfolioCards;
