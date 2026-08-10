"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/saphir/animations";

const SERVICES = [
  {
    title: "Branding & Identité visuelle",
    image: "/images/service-branding.png",
    desc: "Nous créons des identités de marque uniques et mémorables. Du logo à la charte graphique complète, nous construisons une image de marque forte et cohérente qui reflète l'essence de votre entreprise et résonne avec votre audience cible.",
  },
  {
    title: "Communication corporate",
    image: "/images/service-corporate.png",
    desc: "Stratégies de communication interne et externe sur mesure. Nous élaborons des plans de communication corporate qui renforcent votre image institutionnelle et fédèrent vos collaborateurs autour d'une vision commune.",
  },
  {
    title: "Communication globale & Marketing 360°",
    image: "/images/service-marketing360.png",
    desc: "Approche intégrée couvrant tous les canaux et points de contact. Notre marketing 360° garantit une présence cohérente et impactante sur l'ensemble du parcours client, du premier contact à la fidélisation.",
  },
  {
    title: "Création graphique et audiovisuelle",
    image: "/images/service-graphic.png",
    desc: "Design graphique professionnel et productions audiovisuelles de haute qualité. Nos créateurs transforment vos idées en visuels percutants et contenus multimédias qui captent l'attention de votre audience.",
  },
  {
    title: "Production de films & supports",
    image: "/images/service-production.png",
    desc: "Films, spots radio et supports print percutants. De la conception au montage, nous produisons des contenus qui racontent votre histoire de manière authentique et engageante.",
  },
  {
    title: "Communication digitale & Réseaux sociaux",
    image: "/images/service-digital.png",
    desc: "Gestion des réseaux sociaux et stratégies de contenu digital. Nous maximisons votre visibilité en ligne avec des campagnes créatives et des contenus optimisés pour chaque plateforme.",
  },
  {
    title: "Création de sites web & Référencement",
    image: "/images/service-web.png",
    desc: "Sites web performants optimisés SEO pour une visibilité maximale. Nous concevons des expériences numériques qui convertissent vos visiteurs en clients fidèles.",
  },
  {
    title: "Relations publiques & Événements",
    image: "/images/service-evenementiel.png",
    desc: "Organisation événements et relations publiques pour renforcer votre notoriété. Nous créons des moments mémorables qui génèrent du buzz et des retombées médiatiques positives.",
  },
];

export function ServicesPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/about-hero.png')" }}
        />
        <div className="absolute inset-0 bg-sapphire-dark/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Nos <span className="text-gradient-gold">Services</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Des solutions complètes pour votre communication
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-24">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <FadeIn key={service.title}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={isEven ? "" : "md:order-2"}>
                      <div className="relative rounded-xl overflow-hidden h-64 md:h-80 bg-slate-100">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${service.image}')` }}
                        />
                      </div>
                    </div>
                    <div className={isEven ? "" : "md:order-1"}>
                      <div className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-medium mb-4">
                        Service {String(index + 1).padStart(2, "0")}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-sapphire mb-4 leading-tight">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sapphire-gradient py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Vous avez un projet en tête ?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé.
            </p>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-light text-sapphire-dark font-semibold px-10 text-base shadow-lg shadow-gold/20"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
