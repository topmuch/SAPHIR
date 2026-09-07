"use client";

import { useState, useCallback, useEffect } from "react";
import { Gem } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewView } from "@/components/dashboard/overview";
import { ProjectsView } from "@/components/dashboard/projects-view";
import { ClientsView } from "@/components/dashboard/clients-view";
import { TeamView } from "@/components/dashboard/team-view";
import { SettingsView } from "@/components/dashboard/settings-view";
import { SiteVitrineView } from "@/components/dashboard/site-vitrine-view";
import { LoginScreen, type AuthUser } from "@/components/saphir/login-screen";

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Tableau de bord",
  projets: "Projets",
  clients: "Clients",
  equipe: "\u00c9quipe",
  parametres: "Param\u00e8tres",
};

export default function Home() {
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
  const [activeView, setActiveView] = useState("site_web");

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
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <div className="w-12 h-12 rounded-xl bg-sapphire/10 flex items-center justify-center border border-sapphire/20">
          <Gem className="w-5 h-5 text-gold animate-pulse" />
        </div>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-sapphire/20 border-t-sapphire" />
      </div>
    );
  }

  // Écran de connexion
  if (authStatus === "unauthenticated" || !user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Full-width showcase mode
  if (isSiteWeb) {
    return (
      <SiteVitrineView
        onBackToDashboard={() => setActiveView("dashboard")}
      />
    );
  }

  // Dashboard mode
  return (
    <div className="min-h-screen bg-slate-50/80">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onViewChange={handleViewChange}
      />

      <div className="md:ml-64 flex min-h-screen flex-col transition-all duration-300">
        <DashboardHeader
          onMenuToggle={toggleSidebar}
          title={VIEW_TITLES[activeView] || "Tableau de bord"}
          user={user}
          onLogout={handleLogout}
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
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
