"use client";

import { Mail, Phone, MapPin, ArrowRight, Navigation } from "lucide-react";
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
  {
    icon: Mail,
    label: "Email",
    value: "contact@zaphircomsen.com",
    href: "mailto:contact@zaphircomsen.com",
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+221 70 316 76 76",
    href: "tel:+221703167676",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: "Dakar, Sénégal",
    href: "https://www.google.com/maps/search/?api=1&query=Dakar%2C+S%C3%A9n%C3%A9gal",
  },
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
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.href.startsWith("http") ? "_blank" : undefined}
                              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                              className="text-sm text-sapphire font-medium mt-0.5 hover:text-gold-dark transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="text-sm text-sapphire font-medium mt-0.5">
                              {item.value}
                            </p>
                          )}
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

      {/* Carte de Dakar */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-bold text-sapphire mb-4 text-center">
              Notre <span className="text-gradient-gold">localisation</span>
            </h2>
            <p className="text-center text-muted-foreground mb-10 max-w-xl mx-auto">
              Nous sommes basés à Dakar, au cœur du Sénégal. Rendez-nous visite
              ou contactez-nous pour échanger sur votre projet.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl shadow-sapphire/10 border border-sapphire/10">
              <iframe
                title="Carte de Dakar, Sénégal — SAPHIR COM"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-17.5450%2C14.6400%2C-17.3450%2C14.7800&layer=mapnik&marker=14.6928%2C-17.4467"
                className="w-full h-[400px] md:h-[480px] block"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Carte d'information superposée */}
              <div className="absolute top-4 left-4 right-4 md:right-auto md:w-80">
                <Card className="border-sapphire/10 shadow-lg shadow-black/10 bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-gold-dark" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sapphire text-sm">
                          SAPHIR COM
                        </p>
                        <p className="text-sm text-muted-foreground mt-0.5">
                          Dakar, Sénégal
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <a
                            href="https://www.google.com/maps/dir/?api=1&destination=Dakar%2C+S%C3%A9n%C3%A9gal"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              className="bg-sapphire hover:bg-sapphire-light text-white text-xs h-8"
                            >
                              <Navigation className="w-3.5 h-3.5 mr-1.5" />
                              Itinéraire
                            </Button>
                          </a>
                          <a
                            href="https://www.openstreetmap.org/?mlat=14.6928&mlon=-17.4467#map=12/14.6928/-17.4467"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-sapphire/20 text-sapphire hover:bg-sapphire/5 text-xs h-8"
                            >
                              Agrandir la carte
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
