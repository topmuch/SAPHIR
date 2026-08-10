"use client";

import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/saphir/animations";
import { SERVICES } from "@/components/saphir/data";

const SLUGS = [
  "branding",
  "corporate",
  "marketing360",
  "graphic",
  "production",
  "digital",
  "web",
  "evenementiel",
] as const;

type ServiceSlug = (typeof SLUGS)[number];

interface ServiceDetail {
  description: string;
  features: string[];
  projects: { title: string; desc: string }[];
}

const SERVICE_DETAILS: Record<ServiceSlug, ServiceDetail> = {
  branding: {
    description:
      "Nous créons des identités de marque uniques et mémorables qui transcendent le simple logo. Notre approche holistique du branding englobe chaque point de contact entre votre marque et votre audience, de la conception du logo à l'élaboration d'une charte graphique complète. Nous travaillons main dans la main avec nos clients pour comprendre leur vision, leurs valeurs et leur positionnement sur le marché.",
    features: [
      "Conception de logos et logotypes",
      "Charte graphique complète",
      "Identité visuelle sur tous supports",
      "Stratégie de marque et positionnement",
      "Naming et baseline créative",
      "Papeterie et supports imprimés",
    ],
    projects: [
      {
        title: "Refonte de l'identité visuelle d'une banque marocaine",
        desc: "Création d'une identité moderne et rassurante, reflet de l'innovation et de la fiabilité bancaire, déployée sur plus de 200 agences à travers le Maroc.",
      },
      {
        title: "Création de marque pour startup tech",
        desc: "Positionnement disruptif et identité visuelle dynamique pour une startup marocaine spécialisée dans la fintech, avec un univers graphique 100% digital.",
      },
      {
        title: "Branding luxe pour maison de mode",
        desc: "Développement d'une image de marque haut de gamme intégrant typographies exclusives, palette épurée et packaging premium.",
      },
    ],
  },
  corporate: {
    description:
      "Notre équipe spécialisée en communication corporate vous accompagne dans la construction et le renforcement de votre image institutionnelle. Nous développons des stratégies de communication interne et externe qui fédèrent vos collaborateurs et inspirent confiance à vos parties prenantes.",
    features: [
      "Stratégie de communication institutionnelle",
      "Supports internes (journal, intranet)",
      "Rapports annuels et documents institutionnels",
      "Relations presse et medias",
      "Gestion de crise communicationnelle",
      "Événements corporate",
    ],
    projects: [
      {
        title: "Rapport annuel d'un groupe industriel",
        desc: "Conception et production du rapport annuel bilingue (fr/ar) avec infographies, photographies corporate et mise en page premium.",
      },
      {
        title: "Stratégie de communication interne pour un opérateur télécom",
        desc: "Mise en place d'un journal interne, d'une plateforme intranet et d'un programme d'engagement collaborateurs pour 3000+ employés.",
      },
      {
        title: "Gestion de crise pour une entreprise du secteur énergétique",
        desc: "Plan de communication de crise, formation des porte-paroles et gestion médiatique lors d'un incident majeur.",
      },
    ],
  },
  marketing360: {
    description:
      "Notre approche Marketing 360° intègre tous les canaux de communication pour créer une synergie puissante autour de votre marque. Du marketing traditionnel au digital, en passant par l'événementiel et les relations publiques, nous concevons des campagnes cohérentes qui maximisent votre retour sur investissement.",
    features: [
      "Audit marketing complet",
      "Plan de communication intégré",
      "Campagnes multicanales",
      "Sponsoring et partenariats",
      "Marketing B2B et B2C",
      "Mesure de performance et ROI",
    ],
    projects: [
      {
        title: "Lancement d'un nouveau produit de grande consommation",
        desc: "Campagne 360° intégrant TV, digital, affichage et événementiel pour le lancement d'une nouvelle gamme de produits au Maroc.",
      },
      {
        title: "Stratégie marketing B2B pour un groupe immobilier",
        desc: "Plan marketing intégré avec lead generation, événements VIP et relations publiques ciblées pour la promotion de projets résidentiels.",
      },
      {
        title: "Sponsoring et partenariats sportifs",
        desc: "Stratégie de sponsoring complète incluant la gestion de partenariats avec des clubs et événements sportifs de premier plan.",
      },
    ],
  },
  graphic: {
    description:
      "Notre studio de création graphique et audiovisuelle donne vie à vos idées les plus ambitieuses. Nos designers et réalisateurs talentueux combinent créativité et expertise technique pour produire des visuels et contenus multimédias qui captent l'attention et renforcent votre image de marque.",
    features: [
      "Design graphique (print et digital)",
      "Illustration et infographie",
      "Production vidéo corporate",
      "Motion design et animations",
      "Retouche photo professionnelle",
      "Montage et post-production",
    ],
    projects: [
      {
        title: "Campagne visuelle pour un festival culturel",
        desc: "Création de l'identité visuelle complète du festival : affiches, programme, signalétique, supports digitaux et motion design pour les réseaux sociaux.",
      },
      {
        title: "Vidéos motion design pour une plateforme e-learning",
        desc: "Production de 20 vidéos explicatives en motion design pour illustrer les modules de formation en ligne d'un organisme certifiant.",
      },
      {
        title: "Infographies pour un rapport de développement durable",
        desc: "Conception d'un ensemble d'infographies percutantes pour vulgariser les données RSE d'un grand groupe industriel marocain.",
      },
    ],
  },
  production: {
    description:
      "De la conception à la diffusion, notre équipe de production audiovisuelle réalise des films et supports de communication qui racontent votre histoire avec émotion et impact. Équipés des dernières technologies, nous assurons une qualité de production professionnelle pour tous vos projets.",
    features: [
      "Films institutionnels et documentaires",
      "Spots publicitaires TV et web",
      "Production de contenu pour réseaux sociaux",
      "Captation d'événements en direct",
      "Supports audio (spots radio, podcasts)",
      "Duplication et distribution",
    ],
    projects: [
      {
        title: "Film institutionnel pour un groupe bancaire",
        desc: "Réalisation d'un film de 5 minutes mettant en valeur l'histoire, les valeurs et l'impact social du groupe, avec tournages au Maroc et à l'international.",
      },
      {
        title: "Série de spots publicitaires TV",
        desc: "Conception et production de 3 spots TV de 30 secondes pour une marque de grande consommation, diffusés sur les chaînes nationales.",
      },
      {
        title: "Captation en direct d'un summit international",
        desc: "Réalisation multi-caméras d'un summit de deux jours avec diffusion en direct sur les réseaux sociaux et production d'un film bilan.",
      },
    ],
  },
  digital: {
    description:
      "Dans un monde de plus en plus connecté, notre équipe digitale vous aide à tirer le meilleur parti des plateformes numériques. Nous créons et gérons votre présence en ligne avec des stratégies de contenu engageantes qui génèrent de l'interaction et fidélisent votre audience.",
    features: [
      "Stratégie de contenu digital",
      "Gestion des réseaux sociaux",
      "Publicité digitale (Google Ads, Meta Ads)",
      "Community management",
      "E-mail marketing et automation",
      "Veille et analyse de la e-réputation",
    ],
    projects: [
      {
        title: "Stratégie sociale media pour une marque de cosmétiques",
        desc: "Développement de la communauté à +150K abonnés en 6 mois avec un taux d'engagement supérieur à 8% sur Instagram et TikTok.",
      },
      {
        title: "Campagnes Google Ads pour un e-commerce",
        desc: "Optimisation continue des campagnes SEA avec un ROAS multiplié par 4 en 3 mois et une réduction de 40% du coût par acquisition.",
      },
      {
        title: "E-mail marketing pour une chaîne de restauration",
        desc: "Mise en place d'une stratégie d'e-mailing automatisée avec segmentation avancée, générant une augmentation de 60% du trafic en magasin.",
      },
    ],
  },
  web: {
    description:
      "Nous concevons des sites web qui ne sont pas seulement beaux, mais qui convertissent. Chaque projet web est pensé pour offrir une expérience utilisateur optimale tout en répondant aux exigences des moteurs de recherche. Notre approche SEO-first garantit une visibilité maximale dès le lancement.",
    features: [
      "Conception de sites vitrines et e-commerce",
      "Développement sur mesure",
      "Optimisation SEO technique et sémantique",
      "Maintenance et hébergement",
      "Analytics et suivi de performance",
      "Accessibilité et conformité RGPD",
    ],
    projects: [
      {
        title: "Site e-commerce pour une marque de mode marocaine",
        desc: "Plateforme e-commerce performante avec +500 références, paiement intégralisé multi-devises et un taux de conversion optimisé à 4.2%.",
      },
      {
        title: "Site vitrine SEO pour un cabinet d'avocats",
        desc: "Refonte complète avec optimisation SEO technique et sémantique, positionnement en première page Google sur 35+ mots-clés stratégiques.",
      },
      {
        title: "Application web SaaS pour la gestion immobilière",
        desc: "Développement sur mesure d'une plateforme SaaS avec tableau de bord, gestion locative et CRM intégré pour un réseau de plus de 200 agences.",
      },
    ],
  },
  evenementiel: {
    description:
      "Notre département événementiel et relations publiques crée des expériences mémorables qui renforcent votre notoriété et génèrent des retombées médiatiques positives. De l'intimité d'un séminaire d'entreprise à la grandeur d'un lancement de produit, nous gérons chaque détail avec passion et professionnalisme.",
    features: [
      "Organisation de séminaires et conférences",
      "Lancements de produits",
      "Team building et incentives",
      "Relations presse et influenceurs",
      "Gestion logistique complète",
      "Production de contenus événementiels",
    ],
    projects: [
      {
        title: "Lancement national d'un smartphone",
        desc: "Organisation d'un événement simultané à Casablanca, Rabat et Marrakech avec 1500 invités, couverture médiatique nationale et activation digitale.",
      },
      {
        title: "Séminaire annuel d'un groupe hôtelier",
        desc: "Séminaire de 3 jours pour 300 collaborateurs incluant ateliers, soirées thématiques, team building et gala de remise de prix.",
      },
      {
        title: "Festival de musique en plein air",
        desc: "Conception et production d'un festival sur 2 jours accueillant 10 000 spectateurs, avec 3 scènes, zone food court et activations de marque.",
      },
    ],
  },
};

function getServiceData(slug: string) {
  const index = SLUGS.indexOf(slug as ServiceSlug);
  if (index === -1) return null;
  const service = SERVICES[index];
  const detail = SERVICE_DETAILS[slug as ServiceSlug];
  return { ...service, ...detail, index };
}

interface ServiceDetailPageProps {
  serviceSlug: string;
  onNavigate: (page: string) => void;
}

export function ServiceDetailPage({
  serviceSlug,
  onNavigate,
}: ServiceDetailPageProps) {
  const data = getServiceData(serviceSlug);

  if (!data) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center px-4">
          <h1 className="text-3xl font-bold text-sapphire mb-4">
            Service non trouvé
          </h1>
          <Button
            variant="outline"
            onClick={() => onNavigate("services")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux services
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative h-80 md:h-[28rem] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${data.image}')` }}
        />
        <div className="absolute inset-0 bg-sapphire-dark/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <FadeIn>
            <button
              onClick={() => onNavigate("services")}
              className="inline-flex items-center text-white/60 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Nos Services
            </button>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {data.title.split("&")[0]}
              {data.title.includes("&") && (
                <>
                  <br className="hidden sm:block" />{" "}
                  <span className="text-gradient-gold">
                    &amp;{data.title.split("&")[1]}
                  </span>
                </>
              )}
            </h1>
          </FadeIn>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold-dark text-xs font-medium mb-4">
                  Service {String(data.index + 1).padStart(2, "0")}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-sapphire mb-6 leading-tight">
                  {data.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                  {data.description}
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden h-72 md:h-96 bg-slate-100">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${data.image}')` }}
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Ce que nous offrons */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-sapphire">
                Ce que nous <span className="text-gradient-gold">offrons</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Une expertise complète pour répondre à tous vos besoins en{" "}
                {data.title.toLowerCase().includes("&")
                  ? data.title
                      .toLowerCase()
                      .split("&")[0]
                      .trim()
                  : data.title.toLowerCase()}
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.features.map((feature, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-3 bg-white rounded-lg p-4 md:p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-gold/30 transition-all duration-300">
                  <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sapphire font-medium text-sm md:text-base">
                    {feature}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Nos réalisations */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-sapphire">
                Nos <span className="text-gradient-gold">réalisations</span>
              </h2>
              <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                Découvrez quelques-uns de nos projets les plus récents dans ce
                domaine
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid md:grid-cols-3 gap-6 md:gap-8">
            {data.projects.map((project, i) => (
              <StaggerItem key={i}>
                <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                  <div className="relative h-48 bg-sapphire-gradient overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                      style={{ backgroundImage: `url('${data.image}')` }}
                    />
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-sapphire">
                        Projet {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-bold text-sapphire text-base md:text-lg mb-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sapphire-gradient py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Vous avez un projet en {""}
              {data.title.toLowerCase().includes("&")
                ? data.title.toLowerCase().split("&")[0].trim()
                : data.title.toLowerCase()}
              ?
            </h2>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Contactez-nous pour discuter de vos besoins et obtenir un devis
              personnalisé pour votre projet.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("contact")}
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
