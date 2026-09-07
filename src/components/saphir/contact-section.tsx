"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "./animations";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  return (
    <section id="contact" className="bg-white dark:bg-sapphire-dark py-20 md:py-28 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <FadeIn direction="right">
            <Badge
              variant="outline"
              className="border-gold/30 text-gold-dark dark:text-gold-light bg-gold/5 text-xs mb-4"
            >
              Contact
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-sapphire dark:text-white leading-tight">
              Parlons de votre
              <br />
              <span className="text-gradient-gold">prochain projet</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed text-lg">
              Vous avez un projet en tête ? Contactez-nous pour discuter de
              vos besoins et découvrir comment nous pouvons vous aider à
              atteindre vos objectifs.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sapphire/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-sapphire dark:text-gold-light" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</p>
                  <span className="text-sm text-sapphire dark:text-white font-medium">
                    <a href="mailto:contact@zaphircomsen.com" className="hover:text-gold-dark dark:hover:text-gold-light transition-colors">contact@zaphircomsen.com</a>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sapphire/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-sapphire dark:text-gold-light" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Téléphone</p>
                  <span className="text-sm text-sapphire dark:text-white font-medium">
                    <a href="tel:+221703167676" className="hover:text-gold-dark dark:hover:text-gold-light transition-colors">+221 70 316 76 76</a>
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sapphire/5 dark:bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-sapphire dark:text-gold-light" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Adresse</p>
                  <span className="text-sm text-sapphire dark:text-white font-medium">
                    Dakar, Sénégal
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <Card className="border-slate-100 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/30 bg-white dark:bg-white/5">
              <CardContent className="p-6 md:p-8">
                <ContactForm />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
