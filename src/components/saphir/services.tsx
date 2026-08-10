"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "./animations";
import { SERVICES } from "./data";

const SERVICE_SLUGS: Record<string, string> = {
  "Branding & Identité visuelle": "branding",
  "Communication corporate": "corporate",
  "Communication globale & Marketing 360°": "marketing360",
  "Création graphique et audiovisuelle": "graphic",
  "Production de films & supports": "production",
  "Communication digitale & Réseaux sociaux": "digital",
  "Création de sites web & Référencement": "web",
  "Relations publiques & Événements": "evenementiel",
};

interface ServicesProps {
  onServiceClick?: (slug: string) => void;
}

export function Services({ onServiceClick }: ServicesProps) {
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
            De la stratégie à la création, nous couvrons l&rsquo;ensemble de vos
            besoins en communication pour propulser votre marque.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service) => (
            <StaggerItem key={service.title}>
              <Card
                className="group h-full border-sapphire/8 hover:border-gold/40 hover:shadow-xl hover:shadow-sapphire/10 transition-all duration-300 bg-white overflow-hidden cursor-pointer"
                onClick={() => {
                  const slug = SERVICE_SLUGS[service.title];
                  if (slug && onServiceClick) onServiceClick(slug);
                }}
              >
                <div className="h-40 overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sapphire-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      En savoir plus <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
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
