"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/saphir/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "Quels types de services proposez-vous ?",
    answer:
      "Nous proposons une gamme complète de services de communication : branding et identité visuelle, communication corporate, marketing 360°, création graphique et audiovisuelle, production de films et supports, communication digitale et réseaux sociaux, création de sites web et référencement, ainsi que des relations publiques et organisation d'événements.",
  },
  {
    question: "Comment se déroule un projet typique ?",
    answer:
      "Chaque projet suit un processus structuré en 5 étapes : le brief initial pour comprendre vos besoins, la phase de conception et création, la validation par votre équipe, la production et exécution, et enfin la livraison avec un suivi post-projet. Nous assurons une communication transparente à chaque étape.",
  },
  {
    question: "Quels sont vos tarifs ?",
    answer:
      "Nos tarifs sont établis sur devis, selon la complexité et l'ampleur du projet. Nous proposons des solutions adaptées à tous les budgets, de la PME au grand compte. N'hésitez pas à nous contacter pour obtenir un devis personnalisé et détaillé sans engagement.",
  },
  {
    question: "Travaillez-vous avec des entreprises internationales ?",
    answer:
      "Oui, nous accompagnons aussi bien des entreprises sénégalaises qu'internationales. Notre équipe maîtrise plusieurs langues et comprend les enjeux de communication interculturels. Nous avons collaboré avec des clients à Dakar, dans la sous-région ouest-africaine et en Europe.",
  },
  {
    question: "Quel est le délai moyen de réalisation ?",
    answer:
      "Les délais varient selon la nature et l'ampleur du projet. Pour une identité de marque, comptez entre 3 et 6 semaines. Un site web prend généralement 4 à 8 semaines. Une campagne complète peut s'étendre de 2 semaines à 6 mois. Nous nous engageons à respecter les délais convenus.",
  },
  {
    question: "Proposez-vous un suivi après livraison ?",
    answer:
      "Oui, nous proposons un accompagnement et un support post-projet pour garantir la pérennité de nos réalisations. Cela inclut des ajustements mineurs, un suivi des performances pour les projets digitaux, et une assistance technique pour une période définie selon le contrat.",
  },
  {
    question: "Comment puis-je demander un devis ?",
    answer:
      "Vous pouvez nous demander un devis via notre formulaire de contact sur le site, par email à contact@zaphircomsen.com, ou directement par téléphone au +221 70 316 76 76. Nous vous répondrons dans les 24 à 48 heures avec une proposition détaillée adaptée à vos besoins.",
  },
  {
    question: "Quels secteurs d'activité couvrez-vous ?",
    answer:
      "Nous intervenons dans de nombreux secteurs : télécommunications, banque et finance, immobilier, retail et grande distribution, luxe et cosmétique, industrie, éducation, santé, tourisme et hôtellerie, ainsi que les administrations publiques. Notre expérience transversale nous permet d'apporter un regard frais et innovant à chaque secteur.",
  },
  {
    question: "Pouvez-vous gérer l'ensemble de ma communication ?",
    answer:
      "Absolument. C'est même notre cœur de métier : en tant qu'agence 360°, nous pouvons prendre en charge l'intégralité de votre communication — stratégie, création, production, digital et événementiel — comme une seule prestation coordonnée. Vous gagnez un interlocuteur unique, une cohérence totale entre les canaux et une efficacité budgétaire optimisée. Nous proposons également des formules d'externalisation partielle si vous préférez conserver certains pans en interne.",
  },
  {
    question: "Intervenez-vous en dehors de Dakar ?",
    answer:
      "Oui. Basés à Dakar, nous intervenons dans tout le Sénégal — Thiès, Saint-Louis, Saly, Ziguinchor — ainsi que dans la sous-région ouest-africaine (Côte d'Ivoire, Mali, Guinée, Gambie…). Pour les projets hors de Dakar, nous organisons des déplacements sur site et un suivi à distance fluide grâce à nos outils collaboratifs. Les productions numériques (sites web, campagnes digitales, contenus) se pilotent sans contrainte géographique.",
  },
  {
    question: "Comment mesurez-vous les résultats des campagnes digitales ?",
    answer:
      "Chaque campagne digitale est pilotée par la donnée : nous définissons des indicateurs clés dès le brief (portée, engagement, clics, conversions, coût par lead…), nous mettons en place les outils de suivi (Google Analytics, pixels publicitaires, tableaux de bord), et nous vous remettons un rapport régulier lisible, avec des recommandations concrètes. À la fin de chaque campagne, un bilan complet mesure le retour sur investissement et les enseignements pour la suite.",
  },
  {
    question: "Qui possède les droits sur les créations réalisées ?",
    answer:
      "Une fois le projet entièrement réglé, les droits d'exploitation des créations vous sont cédés : vous êtes pleinement propriétaire de votre logo, de vos visuels, de vos contenus et de votre site web. Nous vous remettons l'ensemble des fichiers sources exploitables et une documentation vous permettant de faire évoluer vos supports sereinement, avec nous ou avec d'autres partenaires.",
  },
];

export function FaqPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/faq-hero.png')" }}
        />
        <div className="absolute inset-0 bg-sapphire-dark/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-gradient-gold">FAQ</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Questions fréquemment posées
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="bg-white dark:bg-sapphire-dark py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire dark:text-white">
              Vos questions, nos <span className="text-gradient-gold">réponses</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Retrouvez les réponses aux questions les plus courantes sur nos services.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Accordion type="single" collapsible className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-sapphire/10 rounded-xl px-6 data-[state=open]:shadow-md data-[state=open]:shadow-sapphire/5 data-[state=open]:border-gold/20 transition-all"
                >
                  <AccordionTrigger className="text-left text-sapphire dark:text-white font-medium hover:text-gold-dark dark:hover:text-gold-light hover:no-underline py-5">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </section>

      {/* CTA — une autre question ? */}
      <section className="bg-slate-50 dark:bg-sapphire py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-gold-dark dark:text-gold-light" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-sapphire dark:text-white mb-3">
              Vous ne trouvez pas la réponse à votre question ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Notre équipe vous répond personnellement sous 24 h ouvrées.
              Posez votre question, nous nous chargeons du reste.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="mailto:contact@zaphircomsen.com" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-sapphire-dark font-semibold px-8 w-full sm:w-auto"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  contact@zaphircomsen.com
                </Button>
              </a>
              <a href="tel:+221703167676" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-sapphire/20 text-sapphire dark:text-gold-light dark:border-gold/30 hover:bg-sapphire hover:text-white dark:hover:bg-gold dark:hover:text-sapphire-dark px-8 w-full sm:w-auto"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  +221 70 316 76 76
                </Button>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
