"use client";

import { SiteRouter } from "@/components/saphir/pages/page-router";

/**
 * Page d'accueil publique : le site vitrine EMERAUDE COM SEN.
 * Aucune authentification requise — l'espace d'administration
 * est accessible via /admin (lien « Connexion » dans la navbar).
 */
export default function Home() {
  return <SiteRouter />;
}
