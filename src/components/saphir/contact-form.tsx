"use client";

import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-sapphire mb-2">
          Message envoyé !
        </h3>
        <p className="text-muted-foreground text-sm">
          Nous vous recontacterons dans les plus brefs délais.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Nom
          </label>
          <Input placeholder="Votre nom" required className="bg-sapphire/5" />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Prénom
          </label>
          <Input placeholder="Votre prénom" required className="bg-sapphire/5" />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Email
        </label>
        <Input
          type="email"
          placeholder="votre@email.com"
          required
          className="bg-sapphire/5"
        />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">
          Message
        </label>
        <Textarea
          placeholder="Décrivez votre projet..."
          rows={4}
          required
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
  );
}
