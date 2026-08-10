"use client";

import { Gem, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FadeIn } from "./animations";
import { ContactForm } from "./contact-form";

export function CTASection() {
  return (
    <section className="bg-sapphire-gradient py-20 md:py-28 relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gold/5 blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <Gem className="w-12 h-12 text-gold mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            SAPHIR COM
          </h2>
          <p className="mt-4 text-xl md:text-2xl text-white/70 font-light">
            L’agence qui réinvente la relation
            <br className="hidden sm:block" /> entre les marques et leurs clients.
          </p>
          <div className="mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-gold hover:bg-gold-light text-sapphire-dark font-semibold px-10 text-base shadow-lg shadow-gold/20"
                >
                  Démarrer un projet
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-sapphire flex items-center gap-2">
                    <Gem className="w-5 h-5 text-gold" /> Contactez-nous
                  </DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
