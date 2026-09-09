"use client";

import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FOOTER_SERVICES = [
  "Branding & Identité visuelle",
  "Communication digitale",
  "Création de sites web",
  "Production audiovisuelle",
];

const FOOTER_COMPANY = [
  "À propos",
  "FAQ",
  "Contact",
];

export function Footer() {
  return (
    <footer className="bg-sapphire-dark text-white/70 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#hero" className="flex items-center mb-4">
              <div className="w-[100px] h-16 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/logo-emeraude.png"
                  alt="EMERAUDE COM"
                  width={900}
                  height={577}
                  className="w-full h-full object-contain"
                />
              </div>
            </a>
            <p className="text-sm leading-relaxed text-white/50">
              L'agence qui réinvente la relation entre les marques et leurs
              clients. Communication 360° innovante et performante.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Entreprise</h4>
            <ul className="space-y-2.5">
              {FOOTER_COMPANY.map((c) => (
                <li key={c}>
                  <a
                    href="#"
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {c}
                  </a>
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
          <p>© {new Date().getFullYear()} EMERAUDE COM. Tous droits réservés.</p>
          <p>
            Conçu avec passion par{" "}
            <a href="#hero" className="text-gold/60 hover:text-gold transition-colors">
              EMERAUDE COM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
