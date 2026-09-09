"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Eye, EyeOff, Lock, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface LoginScreenProps {
  onLogin: (user: AuthUser) => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError("Veuillez saisir votre email et votre mot de passe.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data?.error || "Connexion impossible. Réessayez.");
        return;
      }
      onLogin(data.user as AuthUser);
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Panneau de marque */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sapphire-dark via-sapphire to-sapphire-dark relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="w-[126px] h-20 rounded-xl bg-white shadow-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo-emeraude.png"
              alt="EMERAUDE COM"
              width={900}
              height={577}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            EMERAUDE <span className="text-gradient-gold">COM</span>
          </span>
        </div>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-white leading-tight max-w-md"
          >
            Votre partenaire en
            <span className="text-gradient-gold"> communication 360°</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-4 text-white/60 max-w-md leading-relaxed"
          >
            Espace d&apos;administration : gérez vos projets, vos clients et
            votre équipe depuis un tableau de bord unique.
          </motion.p>
        </div>

        <p className="relative text-xs text-white/40">
          © {new Date().getFullYear()} EMERAUDE COM SEN — Dakar, Sénégal
        </p>
      </div>

      {/* Formulaire */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="flex lg:hidden items-center gap-2.5 mb-8 justify-center">
            <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center p-1 dark:shadow-md dark:shadow-black/20">
              <Image
                src="/images/logo-mark.png"
                alt="EMERAUDE COM"
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-sapphire-dark">EMERAUDE</span>{" "}
              <span className="text-gold">COM</span>
            </span>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Connexion
          </h2>
          <p className="text-sm text-muted-foreground mt-1 mb-8">
            Accédez à votre tableau de bord.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@zaphircomsen.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="pl-9 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="pl-9 pr-10 h-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 dark:bg-red-500/10 dark:border-red-500/30 p-3 text-sm text-red-700 dark:text-red-400"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-sapphire hover:bg-sapphire-dark text-white font-semibold"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>

            <a
              href="/"
              className="block text-center text-sm text-muted-foreground hover:text-sapphire dark:hover:text-gold-light transition-colors pt-2"
            >
              ← Retour au site
            </a>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
