"use client";

import { useState, useCallback } from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { OverviewView } from "@/components/dashboard/overview";
import { ProjectsView } from "@/components/dashboard/projects-view";
import { ClientsView } from "@/components/dashboard/clients-view";
import { TeamView } from "@/components/dashboard/team-view";
import { SettingsView } from "@/components/dashboard/settings-view";

const VIEW_TITLES: Record<string, string> = {
  dashboard: "Tableau de bord",
  projets: "Projets",
  clients: "Clients",
  equipe: "Équipe",
  parametres: "Paramètres",
};

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState("dashboard");

  const handleViewChange = useCallback((view: string) => {
    setActiveView(view);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "projets":
        return <ProjectsView />;
      case "clients":
        return <ClientsView />;
      case "equipe":
        return <TeamView />;
      case "parametres":
        return <SettingsView />;
      default:
        return <OverviewView />;
    }
  };

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
        <main className="flex-1 p-4 md:p-6 lg:p-8">{renderView()}</main>
      </div>
    </div>
  );
}
