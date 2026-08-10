"use client";

import { Navbar } from "@/components/saphir/navbar";
import { Hero } from "@/components/saphir/hero";
import { StatsBar } from "@/components/saphir/stats-bar";
import { Services } from "@/components/saphir/services";
import { Departments } from "@/components/saphir/departments";
import { Mission } from "@/components/saphir/mission";
import { Advantages } from "@/components/saphir/advantages";
import { CTASection } from "@/components/saphir/cta";
import { ContactSection } from "@/components/saphir/contact-section";
import { Footer } from "@/components/saphir/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <Services />
        <Departments />
        <Mission />
        <Advantages />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
