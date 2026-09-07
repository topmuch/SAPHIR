"use client";

import { SiteRouter } from "@/components/saphir/pages/page-router";

/**
 * Page d'accueil publique : le site vitrine SAPHIR COM SEN.
 * Aucune authentification requise — l'espace d'administration
 * est accessible via /admin (lien « Espace admin » dans la navbar).
 */
export default function Home() {
  return <SiteRouter />;
}
