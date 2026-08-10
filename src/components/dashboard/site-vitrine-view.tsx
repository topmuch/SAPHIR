"use client";

import { SiteRouter } from "@/components/saphir/pages/page-router";

interface SiteVitrineViewProps {
  onBackToDashboard?: () => void;
}

export function SiteVitrineView({ onBackToDashboard }: SiteVitrineViewProps) {
  return <SiteRouter onBackToDashboard={onBackToDashboard} />;
}
