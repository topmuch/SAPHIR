"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactForm } from "./contact-form";
import { NAV_LINKS } from "./data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-sapphire-dark/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
              <Gem className="w-5 h-5 text-gold" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              <span className="text-white">EMERAUDE</span>{" "}
              <span className="text-gradient-gold">COM</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-white/80 hover:text-gold transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
            {/* Bascule mode clair / sombre */}
            <ThemeToggle variant="onDark" className="mx-2" />
            <Dialog>
              <DialogTrigger asChild>
                <Button className="ml-3 bg-gold hover:bg-gold-light text-sapphire-dark font-semibold text-sm">
                  Nous contacter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-sapphire dark:text-gold-light flex items-center gap-2">
                    <Gem className="w-5 h-5 text-gold" /> Contactez-nous
                  </DialogTitle>
                </DialogHeader>
                <ContactForm />
              </DialogContent>
            </Dialog>
          </div>

          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle variant="onDark" />
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-sapphire-dark/98 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2.5 text-sm text-white/80 hover:text-gold hover:bg-white/5 rounded-md transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full mt-3 bg-gold hover:bg-gold-light text-sapphire-dark font-semibold">
                    Nous contacter
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
