"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
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
        <div className="flex items-center justify-between h-16 md:h-[108px]">
          <a href="#hero" className="flex items-center group" aria-label="EMERAUDE COM — Accueil">
            <div className="w-[88px] h-[56px] md:w-[150px] md:h-[96px] rounded-xl bg-white shadow-md shadow-black/20 flex items-center justify-center overflow-hidden group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <Image
                src="/images/logo-emeraude.png"
                alt="EMERAUDE COM"
                width={900}
                height={570}
                className="w-full h-full object-contain"
                priority
              />
            </div>
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
                    <Image
                      src="/images/logo-mark.png"
                      alt="EMERAUDE"
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain"
                    />{" "}Contactez-nous
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
                      <Image
                        src="/images/logo-mark.png"
                        alt="EMERAUDE"
                        width={20}
                        height={20}
                        className="w-5 h-5 object-contain"
                      />{" "}Contactez-nous
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
