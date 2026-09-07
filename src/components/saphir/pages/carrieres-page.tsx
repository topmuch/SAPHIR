"use client";

import { GraduationCap, Briefcase, PartyPopper, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/saphir/animations";
import { ArrowRight } from "lucide-react";

const BENEFITS = [
  {
    icon: GraduationCap,
    title: "Formation continue",
    desc: "Des programmes de formation réguliers pour développer vos compétences et rester à la pointe des tendances du secteur.",
  },
  {
    icon: Briefcase,
    title: "Projets variés",
    desc: "Travaillez sur des projets passionnants pour des clients de secteurs diversifiés, du luxe aux nouvelles technologies.",
  },
  {
    icon: PartyPopper,
    title: "Ambiance stimulante",
    desc: "Une culture d'entreprise dynamique et bienveillante où la créativité et l'initiative sont encouragées.",
  },
  {
    icon: Gift,
    title: "Avantages compétitifs",
    desc: "Un package de rémunération attractif avec des avantages sociaux étendus et un équilibre vie professionnelle / personnelle.",
  },
];

const JOBS = [
  {
    title: "Chef de projet digital",
    contract: "CDI",
    location: "Casablanca",
    department: "Marketing digital",
  },
  {
    title: "Designer graphique senior",
    contract: "CDI",
    location: "Casablanca",
    department: "Création graphique",
  },
  {
    title: "Réalisateur vidéo",
    contract: "CDD 6 mois",
    location: "Casablanca",
    department: "Production audiovisuelle",
  },
  {
    title: "Community Manager",
    contract: "Stage",
    location: "Casablanca",
    department: "Réseaux sociaux",
  },
];

const CONTRACT_COLORS: Record<string, string> = {
  CDI: "bg-sapphire/10 text-sapphire dark:text-gold-light",
  "CDD 6 mois": "bg-gold/10 text-gold-dark dark:text-gold-light",
  Stage: "bg-sapphire/5 text-sapphire dark:text-gold-light",
};

export function CarrieresPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/careers-hero.png')" }}
        />
        <div className="absolute inset-0 bg-sapphire-dark/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-gradient-gold">Carrières</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Rejoignez une équipe passionnée et créative
          </p>
        </div>
      </section>

      {/* Pourquoi nous rejoindre */}
      <section className="bg-white dark:bg-sapphire-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white">
              Pourquoi nous <span className="text-gradient-gold">rejoindre</span> ?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Chez EMERAUDE COM, nous croyons que notre réussite repose sur le talent et l'épanouissement de chaque membre de notre équipe.
            </p>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <Card className="h-full border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300 group text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-sapphire/5 flex items-center justify-center mx-auto mb-4 group-hover:bg-sapphire/10 transition-colors">
                      <benefit.icon className="w-7 h-7 text-sapphire dark:text-gold-light" />
                    </div>
                    <h3 className="font-semibold text-sapphire dark:text-white text-base mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.desc}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Postes disponibles */}
      <section className="bg-slate-50 dark:bg-sapphire py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white">
              Postes <span className="text-gradient-gold">disponibles</span>
            </h2>
          </FadeIn>
          <StaggerContainer className="space-y-4">
            {JOBS.map((job) => (
              <StaggerItem key={job.title}>
                <Card className="border-sapphire/8 hover:border-gold/30 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-sapphire dark:text-white text-base md:text-lg">
                          {job.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className={`${CONTRACT_COLORS[job.contract] || "bg-sapphire/10 text-sapphire dark:text-gold-light"} border-0 text-xs`}
                        >
                          {job.contract}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{job.location}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{job.department}</span>
                      </div>
                      <p className="sm:hidden text-sm text-muted-foreground mt-1">
                        {job.department}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-sapphire/20 text-sapphire dark:text-gold-light dark:border-gold/30 hover:bg-sapphire hover:text-white dark:hover:bg-gold dark:hover:text-sapphire-dark shrink-0"
                    >
                      Postuler
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Spontaneous Application CTA */}
      <section className="bg-sapphire-gradient py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Vous ne trouvez pas votre poste ?
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-8">
              Envoyez-nous votre CV spontané à recrutement@zaphircomsen.com,
              nous serons ravis de découvrir votre profil.
            </p>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-light text-sapphire-dark font-semibold px-10 text-base shadow-lg shadow-gold/20"
            >
              Envoyer mon CV
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}