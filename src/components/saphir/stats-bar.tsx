"use client";

import { Counter } from "./counter";

export function StatsBar() {
  return (
    <section className="relative -mt-1 bg-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <Counter value={150} suffix="+" label="Clients satisfaits" />
          <Counter value={350} suffix="+" label="Projets réalisés" />
          <Counter value={10} suffix="+" label="Années d'expérience" />
          <Counter value={25} suffix="+" label="Experts créatifs" />
        </div>
      </div>
    </section>
  );
}
