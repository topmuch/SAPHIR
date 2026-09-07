"use client";

import { useState } from "react";
import {
  ArrowRight,
  Star,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormState {
  nom: string;
  prenom: string;
  email: string;
  content: string;
}

const EMPTY_FORM: FormState = { nom: "", prenom: "", email: "", content: "" };

export function ContactForm() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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
    if (form.nom.trim().length < 2) err.nom = "Nom requis.";
    if (form.prenom.trim().length < 2) err.prenom = "Prénom requis.";
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
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.prenom.trim()} ${form.nom.trim()}`.trim(),
          email: form.email.trim(),
          subject: "Message depuis la page d'accueil",
          type: "contact",
          service: null,
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

      setSubmitted(true);
      setForm(EMPTY_FORM);
    } catch {
      setServerError("Connexion impossible. Vérifiez votre réseau puis réessayez.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-sapphire mb-2">
          Message envoyé !
        </h3>
        <p className="text-muted-foreground text-sm">
          Merci pour votre message. Nous vous recontacterons dans les plus brefs
          délais.
        </p>
        <Button
          variant="outline"
          className="mt-4 border-sapphire/20 text-sapphire hover:bg-sapphire/5"
          onClick={() => setSubmitted(false)}
        >
          Envoyer un autre message
        </Button>
      </div>
    );
  }

  const fieldError = (field: keyof FormState) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <AlertCircle className="w-3 h-3" /> {errors[field]}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Nom
          </label>
          <Input
            placeholder="Votre nom"
            value={form.nom}
            onChange={set("nom")}
            aria-invalid={!!errors.nom}
            className="bg-sapphire/5"
          />
          {fieldError("nom")}
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Prénom
          </label>
          <Input
            placeholder="Votre prénom"
            value={form.prenom}
            onChange={set("prenom")}
            aria-invalid={!!errors.prenom}
            className="bg-sapphire/5"
          />
          {fieldError("prenom")}
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Email
        </label>
        <Input
          type="email"
          placeholder="votre@email.com"
          value={form.email}
          onChange={set("email")}
          aria-invalid={!!errors.email}
          className="bg-sapphire/5"
        />
        {fieldError("email")}
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Message
        </label>
        <Textarea
          placeholder="Décrivez votre projet..."
          rows={4}
          value={form.content}
          onChange={set("content")}
          aria-invalid={!!errors.content}
          className="bg-sapphire/5"
        />
        {fieldError("content")}
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
  );
}
