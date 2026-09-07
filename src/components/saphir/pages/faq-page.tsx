"use client";

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
      "Nos tarifs sont établis sur devis, selon la complexité et l'ampleur du projet. Nous proposons des solutions adaptées à tous les budgets, du startup au grand compte. N'hésitez pas à nous contacter pour obtenir un devis personnalisé et détaillé sans engagement.",
  },
  {
    question: "Travaillez-vous avec des entreprises internationales ?",
    answer:
      "Oui, nous accompagnons aussi bien des entreprises marocaines qu'internationales. Notre équipe maîtrise plusieurs langues et comprend les enjeux de communication interculturels. Nous avons déjà collaboré avec des clients en Europe, en Afrique et au Moyen-Orient.",
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
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire">
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
                  <AccordionTrigger className="text-left text-sapphire font-medium hover:text-gold-dark hover:no-underline py-5">
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
    </main>
  );
}
