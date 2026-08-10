"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/saphir/animations";

const BLOG_POSTS = [
  {
    title: "Les tendances du marketing digital en 2025",
    category: "Marketing digital",
    date: "10 Mars 2025",
    excerpt:
      "Découvrez les nouvelles tendances qui transforment le paysage du marketing digital cette année, de l'IA générative aux nouvelles stratégies d'engagement.",
  },
  {
    title: "Comment créer une identité de marque mémorable",
    category: "Branding",
    date: "5 Mars 2025",
    excerpt:
      "Les clés essentielles pour construire une identité visuelle et narrative qui marque les esprits et fidélise votre audience sur le long terme.",
  },
  {
    title: "5 erreurs à éviter dans votre stratégie sociale",
    category: "Réseaux sociaux",
    date: "28 Février 2025",
    excerpt:
      "Les pièges les plus courants en matière de réseaux sociaux et comment les éviter pour maximiser l'impact de vos publications.",
  },
  {
    title: "L'importance du SEO pour votre site web",
    category: "Référencement",
    date: "20 Février 2025",
    excerpt:
      "Pourquoi le référencement naturel reste incontournable pour toute entreprise souhaitant améliorer sa visibilité en ligne durablement.",
  },
  {
    title: "Organiser un événement corporate réussi",
    category: "Événementiel",
    date: "15 Février 2025",
    excerpt:
      "De la planification à l'exécution, les étapes clés pour créer un événement d'entreprise qui laisse une impression durable.",
  },
  {
    title: "Les clés d'une bonne communication interne",
    category: "Communication",
    date: "10 Février 2025",
    excerpt:
      "Comment renforcer la culture d'entreprise et améliorer la productivité grâce à une stratégie de communication interne efficace.",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  "Marketing digital": "bg-sapphire/10 text-sapphire",
  Branding: "bg-gold/10 text-gold-dark",
  "Réseaux sociaux": "bg-sapphire/10 text-sapphire",
  Référencement: "bg-gold/10 text-gold-dark",
  Événementiel: "bg-sapphire/10 text-sapphire",
  Communication: "bg-gold/10 text-gold-dark",
};

export function BlogPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/blog-hero.png')" }}
        />
        <div className="absolute inset-0 bg-sapphire-dark/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Notre <span className="text-gradient-gold">Blog</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Actualités, conseils et tendances en communication
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post) => (
              <StaggerItem key={post.title}>
                <Card className="h-full border-sapphire/8 hover:border-gold/30 hover:shadow-lg hover:shadow-sapphire/5 transition-all duration-300 group overflow-hidden">
                  {/* Image Placeholder */}
                  <div className="bg-sapphire/10 h-48 w-full" />
                  <CardContent className="p-6">
                    <Badge
                      variant="secondary"
                      className={`${CATEGORY_COLORS[post.category] || "bg-sapphire/10 text-sapphire"} border-0 text-xs mb-3`}
                    >
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-sapphire text-base mb-2 leading-snug group-hover:text-gold-dark transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">
                      {post.date}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <button className="inline-flex items-center text-sm font-medium text-sapphire hover:text-gold-dark transition-colors group/link">
                      Lire la suite
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
