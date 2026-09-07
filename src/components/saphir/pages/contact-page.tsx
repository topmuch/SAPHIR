"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Navigation,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
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

const SUBJECT_OPTIONS = [
  { value: "branding", label: "Branding" },
  { value: "digital", label: "Communication digitale" },
  { value: "web", label: "Création de site web" },
  { value: "production", label: "Production audiovisuelle" },
  { value: "evenement", label: "Événementiel" },
  { value: "autre", label: "Autre" },
];

interface ContactPageForm {
  nom: string;
  email: string;
  sujet: string;
  content: string;
}

const EMPTY_FORM: ContactPageForm = {
  nom: "",
  email: "",
  sujet: "",
  content: "",
};

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
  const [form, setForm] = useState<ContactPageForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<ContactPageForm>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set =
    (field: keyof ContactPageForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
      setServerError(null);
    };

  const validate = (): Partial<ContactPageForm> => {
    const err: Partial<ContactPageForm> = {};
    if (form.nom.trim().length < 2) err.nom = "Veuillez indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      err.email = "Adresse e-mail invalide.";
    if (form.content.trim().length < 10)
      err.content = "Votre message doit contenir au moins 10 caractères.";
    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    setLoading(true);
    try {
      const sujetLabel =
        SUBJECT_OPTIONS.find((s) => s.value === form.sujet)?.label || "Contact";
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nom.trim(),
          email: form.email.trim(),
          subject: `Contact — ${sujetLabel}`,
          type: "contact",
          service: form.sujet ? sujetLabel : null,
          content: form.content.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setServerError(
          data?.error || "L'envoi a échoué. Veuillez réessayer dans un instant."
        );
        return;
      }

      setSent(true);
      setForm(EMPTY_FORM);
    } catch {
      setServerError(
        "Connexion impossible. Vérifiez votre réseau puis réessayez."
      );
    } finally {
      setLoading(false);
    }
  };

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
                  {sent ? (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-sapphire mb-2">
                        Message envoyé !
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        Merci pour votre message. Nous vous recontacterons dans
                        les plus brefs délais.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 border-sapphire/20 text-sapphire hover:bg-sapphire/5"
                        onClick={() => setSent(false)}
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Nom
                      </Label>
                      <Input
                        placeholder="Votre nom complet"
                        value={form.nom}
                        onChange={set("nom")}
                        aria-invalid={!!errors.nom}
                        className="bg-sapphire/5"
                      />
                      {errors.nom && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.nom}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Email
                      </Label>
                      <Input
                        type="email"
                        placeholder="votre@email.com"
                        value={form.email}
                        onChange={set("email")}
                        aria-invalid={!!errors.email}
                        className="bg-sapphire/5"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-muted-foreground mb-1 block">
                        Sujet
                      </Label>
                      <Select
                        value={form.sujet || undefined}
                        onValueChange={(v) => {
                          setForm((f) => ({ ...f, sujet: v }));
                          setServerError(null);
                        }}
                      >
                        <SelectTrigger className="bg-sapphire/5">
                          <SelectValue placeholder="Sélectionnez un sujet" />
                        </SelectTrigger>
                        <SelectContent>
                          {SUBJECT_OPTIONS.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
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
                        value={form.content}
                        onChange={set("content")}
                        aria-invalid={!!errors.content}
                        className="bg-sapphire/5"
                      />
                      {errors.content && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.content}
                        </p>
                      )}
                    </div>

                    {serverError && (
                      <p className="text-red-500 text-xs flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {serverError}
                      </p>
                    )}

                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-sapphire hover:bg-sapphire-light text-white font-semibold"
                    >
                      {loading ? (
                        <>
                          Envoi en cours…
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        </>
                      ) : (
                        <>
                          Envoyer le message
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                  )}
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
                title="Carte de Dakar, Sénégal — EMERAUDE COM"
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
                          EMERAUDE COM
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
