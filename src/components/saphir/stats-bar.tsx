"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const STATS = [
  { value: 150, suffix: "+", label: "Clients satisfaits" },
  { value: 350, suffix: "+", label: "Projets réalisés" },
  { value: 10, suffix: "+", label: "Années d'expérience" },
  { value: 25, suffix: "+", label: "Experts créatifs" },
];

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="bg-sapphire-dark py-14 md:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center justify-center py-6 md:py-8 ${
                i < STATS.length - 1 ? "border-r border-white/10" : ""
              } ${i < 2 ? "border-b md:border-b-0 border-white/10" : ""}`}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gold">
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-sm text-white/70 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
