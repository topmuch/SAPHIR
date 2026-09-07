"use client";

import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { ADVANTAGES } from "./data";

export function Advantages() {
  return (
    <section id="avantages" className="bg-slate-50/80 py-20 md:py-28 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14 md:mb-16">
          <Badge
            variant="outline"
            className="border-gold/30 text-gold-dark bg-gold/5 text-xs mb-4"
          >
            Pourquoi nous choisir
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sapphire leading-tight">
            L'excellence au service
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold">de votre marque</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ADVANTAGES.map((adv) => (
            <StaggerItem key={adv.title}>
              <div className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 hover:border-gold/30 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-sapphire/10 transition-all duration-300 group overflow-hidden">
                <div className="shrink-0 w-28 h-28 rounded-xl bg-sapphire-gradient flex items-center justify-center border border-sapphire/10">
                  <adv.icon
                    className="w-11 h-11 text-gold"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-sapphire mb-2 text-lg">
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
