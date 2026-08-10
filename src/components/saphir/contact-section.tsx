"use client";

import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "./animations";

export function ContactSection() {
  return (
    <section id="contact" className="bg-white py-20 md:py-28 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <FadeIn direction="right">
            <Badge
              variant="outline"
              className="border-gold/30 text-gold-dark bg-gold/5 text-xs mb-4"
            >
              Contact
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-sapphire leading-tight">
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
                <div className="w-12 h-12 rounded-xl bg-sapphire/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-sapphire" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</p>
                  <span className="text-sm text-sapphire font-medium">
                    contact@saphircom.com
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sapphire/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-sapphire" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Téléphone</p>
                  <span className="text-sm text-sapphire font-medium">
                    +212 5 22 00 00 00
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sapphire/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-sapphire" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Adresse</p>
                  <span className="text-sm text-sapphire font-medium">
                    Casablanca, Maroc
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <Card className="border-slate-100 shadow-xl shadow-slate-200/50">
              <CardContent className="p-6 md:p-8">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        Nom
                      </label>
                      <Input placeholder="Votre nom" className="bg-slate-50" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                        Prénom
                      </label>
                      <Input placeholder="Votre prénom" className="bg-slate-50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      className="bg-slate-50"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Sujet
                    </label>
                    <Input placeholder="L'objet de votre message" className="bg-slate-50" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Message
                    </label>
                    <Textarea
                      placeholder="Décrivez votre projet..."
                      rows={5}
                      className="bg-slate-50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-sapphire hover:bg-sapphire-light text-white font-semibold"
                  >
                    Envoyer le message
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
