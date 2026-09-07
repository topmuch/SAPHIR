"use client";

import { useState, useEffect, useCallback } from "react";
import { Gem, Menu, X, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Homepage sections
import { Hero } from "@/components/saphir/hero";
import { StatsBar } from "@/components/saphir/stats-bar";
import { Services } from "@/components/saphir/services";
import { Departments } from "@/components/saphir/departments";
import { Mission } from "@/components/saphir/mission";
import { Advantages } from "@/components/saphir/advantages";
import { CTASection } from "@/components/saphir/cta";
import { ContactSection } from "@/components/saphir/contact-section";

// Page components
import { AProposPage } from "./a-propos";
import { ServicesPage } from "./services-page";
import { BlogPage } from "./blog-page";
import { CarrieresPage } from "./carrieres-page";
import { FaqPage } from "./faq-page";
import { ContactPage } from "./contact-page";
import { ServiceDetailPage } from "./service-detail-page";

const PAGES = [
  { id: "accueil", label: "Accueil" },
  { id: "a-propos", label: "À propos" },
  { id: "services", label: "Services" },
  { id: "blog", label: "Blog" },
  { id: "carrieres", label: "Carrières" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const SERVICE_SLUGS = [
  "branding",
  "corporate",
  "marketing360",
  "graphic",
  "production",
  "digital",
  "web",
  "evenementiel",
];

const FOOTER_SERVICES = [
  "Branding & Identité visuelle",
  "Communication digitale",
  "Création de sites web",
  "Production audiovisuelle",
];

const FOOTER_COMPANY_MAP: Record<string, string> = {
  "À propos": "a-propos",
  Carrières: "carrieres",
  Blog: "blog",
  FAQ: "faq",
};

/* ------------------------------------------------------------------ */
/*  Navbar                                                            */
/* ------------------------------------------------------------------ */
function Navbar({
  currentPage,
  onNavigate,
  onBackToDashboard,
}: {
  currentPage: string;
  onNavigate: (page: string) => void;
  onBackToDashboard?: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useCallback(
    (page: string) => {
      onNavigate(page);
      setMobileOpen(false);
      window.scrollTo(0, 0);
    },
    [onNavigate]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/98 backdrop-blur-md shadow-sm shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => navigate("accueil")}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-lg bg-sapphire/10 flex items-center justify-center border border-sapphire/20">
              <Gem className="w-4 h-4 text-gold" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-sapphire-dark">SAPHIR</span>{" "}
              <span className="text-gold">COM</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {PAGES.map((page) => (
              <button
                key={page.id}
                onClick={() => navigate(page.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === page.id
                    ? "text-gold"
                    : "text-sapphire-dark hover:text-gold"
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>

          {/* Right: Dashboard + Mobile Toggle */}
          <div className="flex items-center gap-3">
            {onBackToDashboard && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToDashboard}
                className="border-sapphire/20 text-sapphire-dark hover:bg-sapphire/5 hover:text-sapphire-dark text-xs font-semibold"
              >
                Dashboard
              </Button>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-sapphire-dark hover:text-gold transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-slate-200">
            <div className="flex flex-col gap-1 pt-3">
              {PAGES.map((page) => (
                <button
                  key={page.id}
                  onClick={() => navigate(page.id)}
                  className={`px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors ${
                    currentPage === page.id
                      ? "text-gold bg-gold/10"
                      : "text-sapphire-dark hover:text-gold hover:bg-slate-50"
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  SiteFooter                                                        */
/* ------------------------------------------------------------------ */
function SiteFooter({
  onNavigate,
}: {
  onNavigate: (page: string) => void;
}) {
  return (
    <footer className="bg-sapphire-dark text-white/70">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <button
              onClick={() => onNavigate("accueil")}
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 rounded-lg bg-gold/20 flex items-center justify-center">
                <Gem className="w-4 h-4 text-gold" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">SAPHIR</span>{" "}
                <span className="text-gradient-gold">COM</span>
              </span>
            </button>
            <p className="text-sm leading-relaxed text-white/50">
              L&rsquo;agence qui réinvente la relation entre les marques et leurs
              clients. Communication 360° innovante et performante.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => onNavigate("services")}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Entreprise</h4>
            <ul className="space-y-2.5">
              {Object.entries(FOOTER_COMPANY_MAP).map(([label, page]) => (
                <li key={label}>
                  <button
                    onClick={() => onNavigate(page)}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold/70 shrink-0" />
                <span className="text-sm text-white/50"><a href="mailto:contact@zaphircomsen.com" className="hover:text-gold transition-colors">contact@zaphircomsen.com</a></span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold/70 shrink-0" />
                <span className="text-sm text-white/50"><a href="tel:+221703167676" className="hover:text-gold transition-colors">+221 70 316 76 76</a></span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold/70 shrink-0 mt-0.5" />
                <span className="text-sm text-white/50">Dakar, Sénégal</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} SAPHIR COM. Tous droits réservés.</p>
          <p>
            Conçu avec passion par{" "}
            <button
              onClick={() => onNavigate("accueil")}
              className="text-gold/60 hover:text-gold transition-colors"
            >
              SAPHIR COM
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  SiteRouter (main export)                                           */
/* ------------------------------------------------------------------ */
export function SiteRouter({
  onBackToDashboard,
}: {
  onBackToDashboard?: () => void;
}) {
  const [currentPage, setCurrentPage] = useState("accueil");

  const navigate = useCallback((page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleServiceClick = useCallback(
    (slug: string) => {
      setCurrentPage(`service-${slug}`);
      window.scrollTo(0, 0);
    },
    []
  );

  const renderPage = () => {
    // Service detail pages
    if (currentPage.startsWith("service-")) {
      const slug = currentPage.replace("service-", "");
      if (SERVICE_SLUGS.includes(slug)) {
        return <ServiceDetailPage serviceSlug={slug} onNavigate={navigate} />;
      }
    }

    switch (currentPage) {
      case "accueil":
        return (
          <>
            <Hero />
            <StatsBar />
            <Services onServiceClick={handleServiceClick} />
            <Departments />
            <Mission />
            <Advantages />
            <CTASection />
            <ContactSection />
          </>
        );
      case "a-propos":
        return <AProposPage />;
      case "services":
        return <ServicesPage onServiceClick={handleServiceClick} />;
      case "blog":
        return <BlogPage />;
      case "carrieres":
        return <CarrieresPage />;
      case "faq":
        return <FaqPage />;
      case "contact":
        return <ContactPage />;
      default:
        return <AProposPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        onBackToDashboard={onBackToDashboard}
      />
      <div className="flex-1 pt-16 md:pt-20">{renderPage()}</div>
      <SiteFooter onNavigate={navigate} />
    </div>
  );
}
