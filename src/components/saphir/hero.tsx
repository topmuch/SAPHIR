"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronDown,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { SERVICES } from "./data";

interface FormState {
  name: string;
  email: string;
  service: string;
  content: string;
}

const EMPTY_FORM: FormState = { name: "", email: "", service: "", content: "" };

const INPUT_CLASS =
  "bg-white/10 border-white/20 text-white placeholder:text-white/55 focus:border-gold/60";
const LABEL_CLASS = "text-xs font-medium text-white/70 mb-1 block";

export function Hero() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const set =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
      setErrors((err) => ({ ...err, [field]: undefined }));
      setServerError(null);
    };

  const validate = (): Partial<FormState> => {
    const err: Partial<FormState> = {};
    if (form.name.trim().length < 2) err.name = "Veuillez indiquer votre nom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      err.email = "Adresse e-mail invalide.";
    if (form.content.trim().length < 10)
      err.content = "Décrivez votre projet (10 caractères minimum).";
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
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          subject: form.service
            ? `Demande de devis — ${form.service}`
            : "Demande de devis",
          type: "devis",
          service: form.service || null,
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
      setServerError("Connexion impossible. Vérifiez votre réseau puis réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Fond dégradé aux couleurs du logo (bleu royal → indigo) */}
      <div className="absolute inset-0 bg-sapphire-radial" />
      {/* Filigrane diamant (rappel du logo EMERAUDE) */}
      <div
        className="absolute inset-0 bg-no-repeat opacity-40"
        style={{
          backgroundImage: "url('/diamond-watermark.svg')",
          backgroundSize: "42%",
          backgroundPosition: "78% 42%",
        }}
      />
      {/* Lueur bleu ciel en haut à droite */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />

      {/* Voile dégradé pour la lisibilité du texte à gauche */}
      <div className="absolute inset-0 bg-gradient-to-r from-sapphire-dark/95 via-sapphire-dark/60 to-transparent" />

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* LEFT SIDE: Text content */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Badge
              variant="outline"
              className="border-gold/40 text-gold bg-gold/10 text-xs sm:text-sm px-4 py-1.5 mb-6"
            >
              Agence de communication 360°
            </Badge>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            Votre partenaire en
            <br />
            <span className="text-gradient-gold">communication 360°</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-base sm:text-lg text-white/70 font-light max-w-lg leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Valorisez votre image, développez votre marque ! EMERAUDE COM
            accompagne les entreprises dans la conception et la mise en œuvre de
            stratégies de communication innovantes et performantes.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
          >
            <a href="#services">
              <Button
                size="lg"
                className="bg-gold hover:bg-gold-light text-sapphire-dark font-semibold px-8 text-base shadow-lg shadow-gold/20"
              >
                Découvrir nos services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8 text-base"
              >
                Contactez-nous
              </Button>
            </a>
          </motion.div>
        </div>

        {/* RIGHT SIDE: Floating glass-morphism card with devis form */}
        <motion.div
          className="w-full max-w-md lg:max-w-lg mx-auto lg:ml-auto"
          initial={{ opacity: 0, y: 40, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        >
          <div
            className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 shadow-2xl"
            id="devis-form"
          >
            {sent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  Demande envoyée !
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Merci pour votre confiance. Notre équipe analyse votre projet
                  et vous répond sous 24 h ouvrées.
                </p>
                <Button
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                  onClick={() => setSent(false)}
                >
                  Envoyer une autre demande
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-bold text-xl mb-1">
                  Demandez un devis
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Obtenez une réponse sous 24h
                </p>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <Label className={LABEL_CLASS}>Votre nom *</Label>
                    <Input
                      placeholder="Nom et prénom"
                      value={form.name}
                      onChange={set("name")}
                      aria-invalid={!!errors.name}
                      className={INPUT_CLASS}
                    />
                    {errors.name && (
                      <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Votre email *</Label>
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={form.email}
                      onChange={set("email")}
                      aria-invalid={!!errors.email}
                      className={INPUT_CLASS}
                    />
                    {errors.email && (
                      <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Service concerné</Label>
                    <Select
                      value={form.service || undefined}
                      onValueChange={(v) => {
                        setForm((f) => ({ ...f, service: v }));
                        setServerError(null);
                      }}
                    >
                      <SelectTrigger className={INPUT_CLASS + " w-full"}>
                        <SelectValue
                          placeholder="Choisissez un service"
                          className="text-white/40"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICES.map((s) => (
                          <SelectItem key={s.title} value={s.title}>
                            {s.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className={LABEL_CLASS}>Votre projet *</Label>
                    <Textarea
                      placeholder="Décrivez votre projet..."
                      rows={4}
                      value={form.content}
                      onChange={set("content")}
                      aria-invalid={!!errors.content}
                      className={INPUT_CLASS + " resize-none"}
                    />
                    {errors.content && (
                      <p className="text-red-300 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.content}
                      </p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-red-300 text-xs flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {serverError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold hover:bg-gold-light text-sapphire-dark font-semibold shadow-lg shadow-gold/25"
                  >
                    {loading ? (
                      <>
                        Envoi en cours…
                        <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                      </>
                    ) : (
                      <>
                        Envoyer la demande
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <a
          href="#services"
          className="inline-flex flex-col items-center text-white/40 hover:text-gold transition-colors"
        >
          <span className="text-xs mb-1 tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
