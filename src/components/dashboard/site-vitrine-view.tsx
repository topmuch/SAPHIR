"use client";

import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/saphir/hero";
import { StatsBar } from "@/components/saphir/stats-bar";
import { Services } from "@/components/saphir/services";
import { Departments } from "@/components/saphir/departments";
import { Mission } from "@/components/saphir/mission";
import { Advantages } from "@/components/saphir/advantages";
import { CTASection } from "@/components/saphir/cta";
import { ContactSection } from "@/components/saphir/contact-section";
import { Footer } from "@/components/saphir/footer";

interface SiteVitrineViewProps {
  onBackToDashboard?: () => void;
}

export function SiteVitrineView({ onBackToDashboard }: SiteVitrineViewProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      {onBackToDashboard && (
        <Button
          onClick={onBackToDashboard}
          className="fixed top-4 right-4 z-[60] bg-sapphire-dark/80 hover:bg-sapphire-dark text-white backdrop-blur-sm shadow-lg"
          size="sm"
        >
          <LayoutDashboard className="w-4 h-4 mr-2" />
          Dashboard
        </Button>
      )}

      <Hero />
      <StatsBar />
      <Services />
      <Departments />
      <Mission />
      <Advantages />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
}
