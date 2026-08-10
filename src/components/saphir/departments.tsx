"use client";

import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { DEPARTMENTS } from "./data";

export function Departments() {
  return (
    <section
      id="departements"
      className="bg-sapphire-gradient py-20 md:py-28 relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,168,76,0.3) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14 md:mb-18">
          <Badge className="bg-gold/15 text-gold-light border-0 text-xs mb-4">
            Nos départements
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Une équipe
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold">multidisciplinaire</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Nos experts travaillent en synergie pour offrir des solutions
            complètes et innovantes à chaque projet.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {DEPARTMENTS.map((dept) => (
            <StaggerItem key={dept.name}>
              <div className="glass-card-dark rounded-2xl p-6 md:p-8 text-center group hover:border-gold/40 transition-all duration-300 hover:bg-white/10">
                <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <dept.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-semibold text-white text-sm md:text-base">
                  {dept.name}
                </h3>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
