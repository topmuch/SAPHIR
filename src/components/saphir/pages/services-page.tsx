"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/saphir/animations";

const SERVICES = [
  {
    slug: "branding",
    title: "Branding & Identité visuelle",
    image: "/images/service-branding.png",
    desc: "Nous créons des identités de marque uniques et mémorables. Du logo à la charte graphique complète, nous construisons une image de marque forte et cohérente qui reflète l'essence de votre entreprise et résonne avec votre audience cible.",
    features: [
      "Logo, logotype et déclinaisons",
      "Charte graphique complète",
      "Naming, baseline et univers de marque",
    ],
  },
  {
    slug: "corporate",
    title: "Communication corporate",
    image: "/images/service-corporate.png",
    desc: "Stratégies de communication interne et externe sur mesure. Nous élaborons des plans de communication corporate qui renforcent votre image institutionnelle et fédèrent vos collaborateurs autour d'une vision commune.",
    features: [
      "Plan de communication institutionnelle",
      "Rapports annuels et supports corporate",
      "Relations presse et gestion de crise",
    ],
  },
  {
    slug: "marketing360",
    title: "Communication globale & Marketing 360°",
    image: "/images/service-marketing360.png",
    desc: "Approche intégrée couvrant tous les canaux et points de contact. Notre marketing 360° garantit une présence cohérente et impactante sur l'ensemble du parcours client, du premier contact à la fidélisation.",
    features: [
      "Audit et plan de communication intégré",
      "Campagnes multicanales (TV, radio, digital, affichage)",
      "Mesure de performance et ROI",
    ],
  },
  {
    slug: "graphic",
    title: "Création graphique et audiovisuelle",
    image: "/images/service-graphic.png",
    desc: "Design graphique professionnel et productions audiovisuelles de haute qualité. Nos créateurs transforment vos idées en visuels percutants et contenus multimédias qui captent l'attention de votre audience.",
    features: [
      "Design print et digital",
      "Motion design et animation",
      "Films corporate et reportages",
    ],
  },
  {
    slug: "production",
    title: "Production de films & supports",
    image: "/images/service-production.png",
    desc: "Films, spots radio et supports print percutants. De la conception au montage, nous produisons des contenus qui racontent votre histoire de manière authentique et engageante.",
    features: [
      "Spots TV et radio",
      "Films institutionnels et publicitaires",
      "Supports print : brochures, affiches, PLV",
    ],
  },
  {
    slug: "digital",
    title: "Communication digitale & Réseaux sociaux",
    image: "/images/service-digital.png",
    desc: "Gestion des réseaux sociaux et stratégies de contenu digital. Nous maximisons votre visibilité en ligne avec des campagnes créatives et des contenus optimisés pour chaque plateforme.",
    features: [
      "Community management et modération",
      "Stratégies de contenus par plateforme",
      "Campagnes sponsorisées et influence",
    ],
  },
  {
    slug: "web",
    title: "Création de sites web & Référencement",
    image: "/images/service-web.png",
    desc: "Sites web performants optimisés SEO pour une visibilité maximale. Nous concevons des expériences numériques qui convertissent vos visiteurs en clients fidèles.",
    features: [
      "Sites vitrines et e-commerce",
      "SEO technique et rédactionnel",
      "Maintenance et évolutions continues",
    ],
  },
  {
    slug: "evenementiel",
    title: "Relations publiques & Événements",
    image: "/images/service-evenementiel.png",
    desc: "Organisation événements et relations publiques pour renforcer votre notoriété. Nous créons des moments mémorables qui génèrent du buzz et des retombées médiatiques positives.",
    features: [
      "Salons, conférences et lancements",
      "Cérémonies et événements corporate",
      "Relations médias et retombées presse",
    ],
  },
];

const METHOD_STEPS = [
  {
    step: "01",
    title: "Écoute & brief",
    desc: "Nous prenons le temps de comprendre votre entreprise, vos objectifs, vos publics et vos contraintes. Un brief précis est la fondation de toute communication réussie.",
  },
  {
    step: "02",
    title: "Stratégie & recommandation",
    desc: "Notre équipe de planning élabore une stratégie sur mesure : positionnement, messages, canaux, calendrier et budget. Vous validez une vision claire avant tout passage à l'action.",
  },
  {
    step: "03",
    title: "Création & conception",
    desc: "Nos directeurs artistiques et concepteurs-rédacteurs donnent vie à la stratégie : identités visuelles, campagnes, contenus et supports, avec plusieurs pistes créatives soumises à votre arbitrage.",
  },
  {
    step: "04",
    title: "Production & déploiement",
    desc: "Nous produisons et déployons les livrables sur tous les canaux : tournages, impression, mise en ligne, animation des réseaux — dans le respect strict des délais et des budgets validés.",
  },
  {
    step: "05",
    title: "Suivi & performance",
    desc: "Chaque projet se conclut par un bilan : indicateurs de performance, enseignements et recommandations. Nous restons à vos côtés pour les ajustements et la croissance continue.",
  },
];

interface ServicesPageProps {
  onServiceClick?: (slug: string) => void;
}

export function ServicesPage({ onServiceClick }: ServicesPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/service-marketing360.png')" }}
        />
        <div className="absolute inset-0 bg-sapphire-dark/85" />
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
      <section className="bg-white dark:bg-sapphire-dark py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="space-y-16 md:space-y-24">
            {SERVICES.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <FadeIn key={service.title}>
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className={isEven ? "" : "md:order-2"}>
                      <div
                        className="relative rounded-xl overflow-hidden h-64 md:h-80 bg-slate-100 cursor-pointer group"
                        onClick={() => onServiceClick?.(service.slug)}
                      >
                        <img
                          src={service.image}
                          alt={service.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-sapphire-dark/0 group-hover:bg-sapphire-dark/40 transition-all duration-300 flex items-center justify-center">
                          <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                            Voir en détail <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={isEven ? "" : "md:order-1"}>
                      <div className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold-dark dark:text-gold-light text-xs font-medium mb-4">
                        Service {String(index + 1).padStart(2, "0")}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-sapphire dark:text-white mb-4 leading-tight">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {service.desc}
                      </p>
                      <ul className="space-y-2.5 mb-6">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-sm text-sapphire dark:text-white/80"
                          >
                            <CheckCircle2 className="w-4 h-4 text-gold-dark dark:text-gold-light shrink-0 mt-0.5" />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        className="border-sapphire/20 text-sapphire dark:text-gold-light dark:border-gold/30 hover:bg-sapphire hover:text-white dark:hover:bg-gold dark:hover:text-sapphire-dark"
                        onClick={() => onServiceClick?.(service.slug)}
                      >
                        Découvrir ce service
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Notre méthode */}
      <section className="bg-slate-50 dark:bg-sapphire py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white">
              Notre <span className="text-gradient-gold">méthode</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Un processus éprouvé en 5 étapes, de l'écoute initiale au suivi
              des performances, pour des projets menés avec rigueur et
              transparence.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {METHOD_STEPS.map((step, i) => (
              <FadeIn key={step.step} delay={i * 0.08} className="h-full">
                <Card className="h-full border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300">
                  <CardContent className="p-6 flex flex-col">
                    <div className="text-3xl font-bold text-gradient-gold mb-3">
                      {step.step}
                    </div>
                    <h3 className="font-semibold text-sapphire dark:text-white text-lg mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.desc}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
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
