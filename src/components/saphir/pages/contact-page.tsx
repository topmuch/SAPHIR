"use client";

import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FadeIn } from "@/components/saphir/animations";

const CONTACT_INFO = [
  { icon: Mail, label: "Email", value: "contact@zaphircomsen.com" },
  { icon: Phone, label: "Téléphone", value: "+221 70 316 76 76" },
  { icon: MapPin, label: "Adresse", value: "Dakar, Sénégal" },
];

export function ContactPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-80 md:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/contact-hero.png')" }}
        />
        <div className="absolute inset-0 bg-sapphire-dark/80" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Contactez-<span className="text-gradient-gold">nous</span>
          </h1>
          <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
            Parlons de votre prochain projet
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-bold text-sapphire mb-8">
                Nos <span className="text-gradient-gold">coordonnées</span>
              </h2>
              <div className="space-y-6">
                {CONTACT_INFO.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card
                      key={item.label}
                      className="border-sapphire/8 hover:border-gold/30 transition-all"
                    >
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-sapphire/5 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-sapphire" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                            {item.label}
                          </p>
                          <p className="text-sm text-sapphire font-medium mt-0.5">
                            {item.value}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </FadeIn>

            {/* Right: Contact Form */}
            <FadeIn direction="left" delay={0.2}>
              <Card className="border-sapphire/8 shadow-lg shadow-sapphire/5">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl font-semibold text-sapphire mb-6">
                    Envoyez-nous un message
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Nom
                      </Label>
                      <Input
                        placeholder="Votre nom complet"
                        className="bg-sapphire/5"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Email
                      </Label>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        className="bg-sapphire/5"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Sujet
                      </Label>
                      <Select>
                        <SelectTrigger className="bg-sapphire/5">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="digital">Communication digitale</SelectItem>
                          <SelectItem value="web">Création de site web</SelectItem>
                          <SelectItem value="production">Production audiovisuelle</SelectItem>
                          <SelectItem value="evenement">Événementiel</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Message
                      </Label>
                      <Textarea
                        placeholder="Décrivez votre projet..."
                        rows={5}
                        className="bg-sapphire/5"
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

      {/* Map Placeholder */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-sapphire mb-8 text-center">
              Notre <span className="text-gradient-gold">localisation</span>
            </h2>
            <div className="bg-slate-100 h-64 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-sapphire/30 mx-auto mb-2" />
                <p className="text-sapphire/50 font-medium">Carte - Dakar, Sénégal</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
