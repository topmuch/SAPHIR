"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "./animations";
import { MISSION_PILLARS } from "./data";

export function Mission() {
  return (
    <section id="mission" className="bg-white py-20 md:py-28 w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn direction="right">
            <Badge
              variant="outline"
              className="border-gold/30 text-gold-dark bg-gold/5 text-xs mb-4"
            >
              Notre mission
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sapphire leading-tight">
              Créer des campagnes
              <br />
              <span className="text-gradient-gold">efficaces</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              Nous créons des campagnes de communication efficaces qui
              allient créativité, marketing, expérience client et performance.
              Notre approche globale garantit des résultats mesurables tout en
              construisant une relation durable entre votre marque et votre
              audience.
            </p>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="grid grid-cols-2 gap-6">
              {MISSION_PILLARS.map((pillar) => (
                <motion.div
                  key={pillar.label}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl bg-white overflow-hidden shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-sapphire/10 border border-slate-100 hover:border-gold/30 transition-colors"
                >
                  <div className="h-36 overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-sapphire text-base">
                      {pillar.label}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
