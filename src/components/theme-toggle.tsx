"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Bascule mode clair / mode sombre.
 * - Ajoute/retire la classe `dark` sur <html>
 * - Persiste le choix dans localStorage (clé "theme")
 * - Le script anti-flash dans layout.tsx applique le thème avant le premier rendu
 *
 * L'état est lu via useSyncExternalStore : le snapshot serveur est toujours
 * "clair" (icône Lune), puis le client se synchronise avec le DOM réel,
 * sans avertissement d'hydratation.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({
  variant = "default",
  className = "",
}: {
  /** "default" : fond clair (dashboard). "onDark" : fond sombre (navbar publique). */
  variant?: "default" | "onDark";
  className?: string;
}) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* localStorage indisponible : on ignore */
    }
  }, []);

  const base =
    "inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors";
  const styles =
    variant === "onDark"
      ? "text-white/70 hover:bg-white/10 hover:text-gold"
      : "text-muted-foreground hover:bg-accent hover:text-foreground";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={dark ? "Mode clair" : "Mode sombre"}
      className={`${base} ${styles} ${className}`}
    >
      {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
