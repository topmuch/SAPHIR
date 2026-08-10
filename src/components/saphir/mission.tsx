"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "./animations";
import { MISSION_PILLARS } from "./data";

export function Mission() {
  return (
    <section id="mission" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="right">
            <Badge
              variant="outline"
              className="border-gold/30 text-gold-dark bg-gold/5 text-xs mb-4"
            >
              Notre mission
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-sapphire leading-tight">
              Créer des campagnes
              <br />
              <span className="text-gradient-gold">efficaces</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Nous créons des campagnes de communication efficaces qui
              allient créativité, marketing, expérience client et performance.
              Notre approche globale garantit des résultats mesurables tout en
              construisant une relation durable entre votre marque et votre
              audience.
            </p>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {MISSION_PILLARS.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-gradient-to-br from-sapphire/5 to-sapphire/10 p-6 text-center border border-sapphire/8 hover:border-gold/30 transition-colors"
                >
                  <div className="w-14 h-14 rounded-2xl bg-sapphire/10 flex items-center justify-center mx-auto mb-4">
                    <pillar.icon className="w-7 h-7 text-sapphire" />
                  </div>
                  <h3 className="font-semibold text-sapphire text-sm md:text-base">
                    {pillar.label}
                  </h3>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
