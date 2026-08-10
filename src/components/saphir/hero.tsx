"use client";

import { motion } from "framer-motion";
import { Gem, ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-sapphire-dark/70" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40 animate-float"
            style={{
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Badge
            variant="outline"
            className="border-gold/40 text-gold bg-gold/10 text-xs sm:text-sm px-4 py-1.5 mb-6"
          >
            <Gem className="w-3.5 h-3.5 mr-1.5" />
            Agence de communication 360°
          </Badge>
        </motion.div>

        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <span className="text-white">SAPHIR</span>{" "}
          <span className="text-gradient-gold">COM</span>
        </motion.h1>

        <motion.p
          className="mt-4 text-lg sm:text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          Votre partenaire en communication 360°
        </motion.p>

        <motion.p
          className="mt-4 text-sm sm:text-base text-white/60 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
        >
          Valorisez votre image, développez votre marque ! SAPHIR COM
          accompagne les entreprises dans la conception et la mise en œuvre de
          stratégies de communication innovantes et performantes.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
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
              className="border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold px-8 text-base"
            >
              Contactez-nous
            </Button>
          </a>
        </motion.div>

        <motion.div
          className="mt-16 md:mt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a
            href="#services"
            className="inline-block text-white/40 hover:text-gold transition-colors"
          >
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
