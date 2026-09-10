"use client";

import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-wide.png')" }}
      />

      {/* Soft gradient overlay on left side for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-sapphire-dark/70 via-sapphire-dark/30 to-transparent" />

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
              className="border-white/40 text-white bg-white/10 text-xs sm:text-sm px-4 py-1.5 mb-6"
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
            <span>communication 360°</span>
          </motion.h1>

          <motion.p
            className="mt-6 text-base sm:text-lg text-white font-light max-w-lg leading-relaxed"
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
