"use client";

import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { ADVANTAGES } from "./data";

export function Advantages() {
  return (
    <section id="avantages" className="bg-gradient-to-b from-slate-50 to-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14 md:mb-18">
          <Badge
            variant="outline"
            className="border-gold/30 text-gold-dark bg-gold/5 text-xs mb-4"
          >
            Pourquoi nous choisir
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sapphire leading-tight">
            L'excellence au service
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold">de votre marque</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {ADVANTAGES.map((adv) => (
            <StaggerItem key={adv.title}>
              <div className="flex gap-5 p-6 rounded-2xl bg-white border border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300 group">
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-sapphire/5 flex items-center justify-center group-hover:bg-sapphire/10 transition-colors">
                  <adv.icon className="w-7 h-7 text-sapphire" />
                </div>
                <div>
                  <h3 className="font-semibold text-sapphire mb-1 text-base">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
