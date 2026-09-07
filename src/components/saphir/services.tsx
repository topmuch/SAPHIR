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
    <section id="services" className="bg-white py-20 md:py-28 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-14 md:mb-16">
          <Badge
            variant="outline"
            className="border-gold/30 text-gold-dark bg-gold/5 text-xs mb-4"
          >
            Nos services
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sapphire leading-tight">
            Des solutions complètes pour
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold">votre communication</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            De la stratégie à la création, nous couvrons l&rsquo;ensemble de vos
            besoins en communication pour propulser votre marque.
          </p>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service, index) => (
            <StaggerItem key={service.title}>
              <Card
                className="group h-full border-slate-100 hover:border-gold/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-300 bg-white overflow-hidden cursor-pointer"
                onClick={() => {
                  const slug = SERVICE_SLUGS[service.title];
                  if (slug && onServiceClick) onServiceClick(slug);
                }}
              >
                <div className="h-52 relative rounded-t-xl bg-sapphire-gradient flex items-center justify-center overflow-hidden">
                  {/* Icône du service */}
                  <div className="w-24 h-24 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center group-hover:scale-110 group-hover:border-gold/40 transition-all duration-500">
                    <service.icon
                      className="w-12 h-12 text-gold"
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Badge number */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-sapphire font-bold text-xs">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-sapphire-dark/80 via-sapphire-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5">
                    <span className="text-white text-sm font-medium flex items-center gap-1.5">
                      En savoir plus <ArrowRight className="w-3.5 h-3.5" />
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
