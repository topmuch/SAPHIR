"use client";

import { Lightbulb, Award, Handshake } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/saphir/animations";
import { Counter } from "@/components/saphir/counter";

const VALUES = [
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Nous repoussons les limites de la créativité pour offrir des solutions de communication novatrices qui démarquent votre marque sur le marché.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Chaque projet est traité avec le plus grand soin, de la conception à la livraison, garantissant des résultats qui dépassent les attentes.",
  },
  {
    icon: Handshake,
    title: "Engagement",
    desc: "Nous nous engageons pleinement auprès de nos clients, bâtissant des partenariats durables basés sur la confiance et la transparence.",
  },
];

export function AProposPage() {
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
            À propos de <span className="text-gradient-gold">SAPHIR COM</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            L'excellence en communication depuis plus de 10 ans
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire mb-8">
              Notre <span className="text-gradient-gold">histoire</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-6">
              Fondée en 2014 à Casablanca, SAPHIR COM est née de la vision d'un
              groupe de professionnels passionnés par la communication et le
              marketing. Dès ses débuts, l'agence s'est distinguée par son approche
              créative et son engagement envers l'excellence. En quelques années,
              SAPHIR COM a su se forger une réputation solide dans le paysage
              communicationnel marocain, en accompagnant des entreprises de toutes
              tailles dans leur transformation digitale et leur développement de
              marque.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
              Aujourd'hui, avec une équipe de plus de 25 experts créatifs et plus
              de 150 clients satisfaits à travers divers secteurs d'activité,
              SAPHIR COM continue de grandir tout en préservant son exigence de
              qualité et sa culture d'innovation. Notre force réside dans notre
              capacité à comprendre les enjeux uniques de chaque client et à
              transformer ces défis en opportunités de communication percutantes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-slate-50 py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sapphire">
              Nos <span className="text-gradient-gold">valeurs</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <FadeIn key={value.title} delay={i * 0.15}>
                <Card className="h-full border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-sapphire/5 flex items-center justify-center mx-auto mb-6 group-hover:bg-sapphire/10 transition-colors">
                      <value.icon className="w-8 h-8 text-sapphire" />
                    </div>
                    <h3 className="font-semibold text-sapphire text-xl mb-3">
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
              Notre équipe en <span className="text-gradient-gold">chiffres</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Counter value={25} suffix="+" label="Experts" />
            <Counter value={150} suffix="+" label="Clients" />
            <Counter value={350} suffix="+" label="Projets" />
            <Counter value={10} suffix="+" label="Années" />
          </div>
        </div>
      </section>
    </main>
  );
}
