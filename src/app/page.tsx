"use client";

import { useState, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewView } from "@/components/dashboard/overview";
import { ProjectsView } from "@/components/dashboard/projects-view";
import { ClientsView } from "@/components/dashboard/clients-view";
import { TeamView } from "@/components/dashboard/team-view";
import { SettingsView } from "@/components/dashboard/settings-view";
import { SiteVitrineView } from "@/components/dashboard/site-vitrine-view";

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Tableau de bord",
  projets: "Projets",
  clients: "Clients",
  equipe: "\u00c9quipe",
  parametres: "Param\u00e8tres",
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");

  const isSiteWeb = activeView === "site_web";

  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

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
