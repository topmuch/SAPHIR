"use client";

import {
  Lightbulb,
  Award,
  HeartHandshake,
  Handshake,
  MapPin,
  Globe,
  Languages,
  Compass,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/saphir/animations";
import { Counter } from "@/components/saphir/counter";

const DEPARTEMENTS = [
  {
    image: "/images/home/dept-creation.jpg",
    name: "Création graphique",
    desc: "Nos directeurs artistiques et designers donnent corps à vos idées : identités visuelles, campagnes d'affichage, supports print et déclinaisons digitales. Chaque création est pensée pour marquer les esprits et servir vos objectifs.",
  },
  {
    image: "/images/home/dept-audiovisuel.jpg",
    name: "Production audiovisuelle",
    desc: "Une équipe de réalisation complète : cadreur·ses, monteur·ses, motion designers et ingénieur·es son. Du spot publicitaire au film institutionnel, nous maîtrisons toute la chaîne, du tournage à la post-production.",
  },
  {
    image: "/images/home/dept-planning.jpg",
    name: "Planning stratégique",
    desc: "Nos planneurs analysent votre marché, vos publics et vos concurrents pour construire des stratégies pertinentes et mesurables. Ils traduisent vos ambitions commerciales en plans de communication concrets et opérationnels.",
  },
  {
    image: "/images/home/dept-commercial.jpg",
    name: "Commercial",
    desc: "Vos interlocuteur·rices de proximité : conseil, devis, suivi de projet et relation client au quotidien. Ils garantissent une réponse rapide, claire et adaptée à vos besoins comme à vos contraintes budgétaires.",
  },
  {
    image: "/images/home/dept-infosono.jpg",
    name: "Informatique & Sonorisation",
    desc: "Développeurs, intégrateurs et techniciens son équipent vos événements, vos espaces et vos plateformes digitales. Sonorisation, diffusion, applications et sites web fonctionnent sans accroc.",
  },
  {
    image: "/images/home/dept-evenementiel.jpg",
    name: "Événementiel",
    desc: "Chef·fes de projet, régie et logistique : salons, lancements, cérémonies et conférences sont orchestrés au millimètre. Plannings, prestataires et imprévus sont gérés pour que vous viviez votre événement sereinement.",
  },
];

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Teranga",
    desc: "L'hospitalité sénégalaise au cœur de nos relations. Nous accueillons chaque client comme un partenaire de confiance, dans une écoute sincère et un respect mutuel qui rendent nos collaborations durables.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Nous repoussons les limites de la créativité pour offrir des solutions de communication novatrices qui démarquent votre marque sur le marché sénégalais et au-delà.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Chaque projet est traité avec le plus grand soin, de la conception à la livraison, en garantissant des résultats à la hauteur des ambitions de nos clients.",
  },
  {
    icon: Handshake,
    title: "Engagement",
    desc: "Nous nous engageons pleinement auprès de nos clients, avec une proximité et une réactivité qui reflètent notre fierté de contribuer au rayonnement des entreprises sénégalaises.",
  },
];

const ANCRAGE = [
  {
    icon: MapPin,
    title: "Enracinée à Dakar",
    desc: "Notre agence est implantée au cœur de la capitale sénégalaise, au plus près des entreprises, institutions et entrepreneurs qui font vibrer l'économie nationale.",
  },
  {
    icon: Compass,
    title: "Connaissance du marché local",
    desc: "Codes culturels, habitudes de consommation, réalités économiques : nous maîtrisons le tissu économique sénégalais pour des stratégies qui parlent vraiment à vos publics.",
  },
  {
    icon: Languages,
    title: "Proximité culturelle et linguistique",
    desc: "Français, wolof, pular, serer : notre équipe crée des messages qui touchent toutes les communautés du Sénégal, dans le respect de leurs sensibilités.",
  },
  {
    icon: Globe,
    title: "Ouverture sur la sous-région",
    desc: "De Dakar, nous accompagnons également des ambitions régionales en Afrique de l'Ouest, en connectant les marques sénégalaises aux marchés de la CEDEAO.",
  },
];

interface AProposPageProps {
  onNavigate?: (page: string) => void;
}

export function AProposPage({ onNavigate }: AProposPageProps) {
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
          <Badge
            variant="outline"
            className="border-gold/40 text-gold bg-gold/10 text-xs mb-4"
          >
            Agence 100% sénégalaise
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            À propos de <span className="text-gradient-gold">EMERAUDE COM</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Une agence de communication née à Dakar, au service des marques
            sénégalaises et de l'Afrique de l'Ouest
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="bg-white dark:bg-sapphire-dark py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white mb-8">
              Notre <span className="text-gradient-gold">histoire</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
              EMERAUDE COM est une société sénégalaise de communication et de
              marketing, née à Dakar de la vision d'un groupe de professionnels
              africains passionnés par les métiers de la création et du
              conseil. Convaincus que les entreprises du Sénégal méritaient une
              agence à la hauteur de leurs ambitions, ses fondateurs ont bâti
              une structure capable de conjuguer exigence internationale et
              ancrage local. Dès ses débuts, EMERAUDE COM s'est distinguée par
              sa créativité, sa proximité avec ses clients et sa connaissance
              fine du marché sénégalais.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
              Aujourd'hui, avec une équipe de plus de 25 experts créatifs et
              plus de 150 clients satisfaits — PME, grandes entreprises,
              institutions et organisations du pays — EMERAUDE COM est devenue
              un acteur de référence de la communication au Sénégal. De la
              refonte d'une identité de marque à la stratégie digitale
              complète, en passant par la production audiovisuelle et
              l'événementiel, nous accompagnons la transformation des
              marques sénégalaises avec la même exigence de qualité.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Fiers de nos racines dakaroises et portés par l'audace d'une
              jeunesse sénégalaise créative et connectée au monde, nous
              croyons au potentiel du pays et de sa sous-région. Notre
              ambition est simple : faire rayonner les marques que nous
              servons, du Plateau de Dakar jusqu'aux marchés de l'Afrique de
              l'Ouest, avec des idées fortes et des réalisations remarquables.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Notre ancrage sénégalais */}
      <section className="bg-slate-50 dark:bg-sapphire py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <Badge
              variant="outline"
              className="border-gold/30 text-gold-dark dark:text-gold-light bg-gold/5 text-xs mb-4"
            >
              Notre identité
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white">
              Un ancrage <span className="text-gradient-gold">sénégalais</span>{" "}
              fort
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Être une agence sénégalaise n'est pas un détail : c'est notre
              force. C'est elle qui nous permet de créer des communications
              justes, pertinentes et efficaces pour les publics d'ici.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ANCRAGE.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <Card className="h-full border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300 group">
                  <CardContent className="p-8 flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-sapphire/5 flex items-center justify-center shrink-0 group-hover:bg-gold/10 transition-colors">
                      <item.icon className="w-7 h-7 text-sapphire dark:text-gold-light group-hover:text-gold-dark dark:group-hover:text-gold transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sapphire dark:text-white text-xl mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.desc}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Nos départements */}
      <section className="bg-slate-50 dark:bg-sapphire py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <Badge className="bg-gold/15 text-gold-dark border-0 text-xs mb-4">
              Nos équipes
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white">
              Six départements, <span className="text-gradient-gold">un seul partenaire</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Nos experts travaillent en synergie au sein de départements
              complémentaires, pour des solutions complètes et innovantes
              sur chaque projet.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTEMENTS.map((dept, i) => (
              <FadeIn key={dept.name} delay={i * 0.06} className="h-full">
                <div className="bg-white/70 dark:bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden group hover:shadow-xl hover:shadow-sapphire/10 border border-slate-200/50 dark:border-white/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-sapphire dark:text-white text-lg mb-2.5 text-center">
                      {dept.name}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm text-center">
                      {dept.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-white dark:bg-sapphire-dark py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white">
              Nos <span className="text-gradient-gold">valeurs</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Des valeurs puisées dans la richesse culturelle du Sénégal et
              dans l'exigence professionnelle de nos équipes.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.1}>
                <Card className="h-full border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-sapphire/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/10 transition-colors">
                      <value.icon className="w-8 h-8 text-sapphire dark:text-gold-light group-hover:text-gold-dark dark:group-hover:text-gold transition-colors" />
                    </div>
                    <h3 className="font-semibold text-sapphire dark:text-white text-xl mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {value.desc}
                    </p>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe en chiffres */}
      <section className="bg-sapphire-gradient py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              EMERAUDE COM en <span className="text-gradient-gold">chiffres</span>
            </h2>
            <p className="mt-4 text-white/60 max-w-xl mx-auto">
              Une équipe sénégalaise au service de la croissance de vos marques
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Counter value={25} suffix="+" label="Experts" />
            <Counter value={150} suffix="+" label="Clients" />
            <Counter value={350} suffix="+" label="Projets" />
            <Counter value={10} suffix="+" label="Années" />
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-white dark:bg-sapphire-dark py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-gold-dark dark:text-gold-light" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-sapphire dark:text-white mb-3">
              Envie de travailler ensemble ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Discutons de votre projet autour d'un café, à Dakar ou en
              visioconférence. Nous vous proposons une première analyse
              gratuite et sans engagement.
            </p>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold-light text-sapphire-dark font-semibold px-8"
              onClick={() => onNavigate?.("contact")}
            >
              Contactez-nous
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
