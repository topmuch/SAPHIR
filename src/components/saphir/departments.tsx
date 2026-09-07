"use client";

import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { DEPARTMENTS } from "./data";

export function Departments() {
  return (
    <section
      id="departements"
      className="bg-slate-50/80 py-20 md:py-28 w-full"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14 md:mb-16">
          <Badge className="bg-gold/15 text-gold-dark border-0 text-xs mb-4">
            Nos départements
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sapphire leading-tight">
            Une équipe
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold">multidisciplinaire</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Nos experts travaillent en synergie pour offrir des solutions
            complètes et innovantes à chaque projet.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept) => (
            <StaggerItem key={dept.name}>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-sapphire/10 border border-slate-200/50 hover:border-gold/30 transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={dept.image}
                    alt={dept.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-sapphire text-lg">
                    {dept.name}
                  </h3>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
