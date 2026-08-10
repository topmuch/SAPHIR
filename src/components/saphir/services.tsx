"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { SERVICES } from "./data";

export function Services() {
  return (
    <section id="services" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14 md:mb-18">
          <Badge
            variant="outline"
            className="border-gold/30 text-gold-dark bg-gold/5 text-xs mb-4"
          >
            Nos services
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sapphire leading-tight">
            Des solutions complètes pour
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold">votre communication</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            De la stratégie à la création, nous couvrons l'ensemble de vos
            besoins en communication pour propulser votre marque.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <Card className="group h-full border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300 bg-white">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-sapphire/5 flex items-center justify-center mb-4 group-hover:bg-sapphire/10 transition-colors">
                    <service.icon className="w-6 h-6 text-sapphire" />
                  </div>
                  <h3 className="font-semibold text-sapphire text-base mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
