"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewView } from "@/components/dashboard/overview";
import { MessagesView } from "@/components/dashboard/messages-view";
import { ProjectsView } from "@/components/dashboard/projects-view";
import { ClientsView } from "@/components/dashboard/clients-view";
import { TeamView } from "@/components/dashboard/team-view";
import { SettingsView } from "@/components/dashboard/settings-view";
import { SiteVitrineView } from "@/components/dashboard/site-vitrine-view";
import { LoginScreen, type AuthUser } from "@/components/saphir/login-screen";

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Tableau de bord",
  messages: "Messages",
  projets: "Projets",
  clients: "Clients",
  equipe: "\u00c9quipe",
  parametres: "Param\u00e8tres",
};

/**
 * Espace d'administration : page de connexion puis tableau de bord.
 * Le site vitrine public reste accessible sur /.
 */
export default function AdminPage() {
  // --- Authentification ---
  const [authStatus, setAuthStatus] = useState<
    "loading" | "unauthenticated" | "authenticated"
  >("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then(async (res) => {
        if (cancelled) return;
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setAuthStatus("authenticated");
        } else {
          setAuthStatus("unauthenticated");
        }
      })
      .catch(() => {
        if (!cancelled) setAuthStatus("unauthenticated");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleLogin = useCallback((loggedInUser: AuthUser) => {
    setUser(loggedInUser);
    setAuthStatus("authenticated");
  }, []);

  const handleLogout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    setAuthStatus("unauthenticated");
  }, []);

  // --- Navigation du dashboard ---
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");
  const [unreadCount, setUnreadCount] = useState(0);

  // Compteur de messages non lus (rafraîchi toutes les 30 s)
  useEffect(() => {
    if (authStatus !== "authenticated") return;
    let cancelled = false;
    const poll = async () => {
      try {
        const res = await fetch("/api/messages", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setUnreadCount(data.stats?.unread ?? 0);
        }
      } catch {
        // silencieux
      }
    };
    poll();
    const interval = setInterval(poll, 30000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [authStatus]);

  const isSiteWeb = activeView === "site_web";

  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  // Écran de chargement (vérification de session)
  if (authStatus === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4">
        <div className="w-[100px] h-16 rounded-xl bg-white shadow-md flex items-center justify-center overflow-hidden">
          <Image
            src="/images/logo-emeraude.png"
            alt="EMERAUDE COM"
            width={900}
            height={570}
            className="w-full h-full object-contain animate-pulse"
          />
        </div>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-sapphire/20 border-t-sapphire" />
      </div>
    );
  }

  // Écran de connexion
  if (authStatus === "unauthenticated" || !user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Mode aperçu plein écran du site vitrine
  if (isSiteWeb) {
    return (
      <SiteVitrineView
        onBackToDashboard={() => setActiveView("dashboard")}
      />
    );
  }

  // Mode tableau de bord
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onViewChange={handleViewChange}
        unreadCount={unreadCount}
      />

      <div className="md:ml-64 flex min-h-screen flex-col transition-all duration-300">
        <DashboardHeader
          onMenuToggle={toggleSidebar}
          title={VIEW_TITLES[activeView] || "Tableau de bord"}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {activeView === "messages" && (
            <MessagesView onUnreadChange={setUnreadCount} />
          )}
          {activeView === "projets" && <ProjectsView />}
          {activeView === "clients" && <ClientsView />}
          {activeView === "equipe" && <TeamView />}
          {activeView === "parametres" && <SettingsView />}
          {(activeView === "dashboard" || !VIEW_TITLES[activeView]) && <OverviewView />}
        </main>
      </div>
    </div>
  );
}
