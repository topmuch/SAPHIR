"use client";

import {
  FolderKanban,
  TrendingUp,
  Users,
  Star,
  UserPlus,
  Receipt,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

import {
  REVENUE_DATA,
  PROJECTS_BY_DEPT,
  SERVICES_DISTRIBUTION,
  ACTIVITIES,
  formatCurrency,
  timeAgo,
} from "@/components/dashboard/dashboard-data";
import type { Activity } from "@/components/dashboard/dashboard-data";

// ------------------------------------------------------------------
// Chart configs
// ------------------------------------------------------------------

const revenueConfig: ChartConfig = {
  revenus: {
    label: "Revenus",
    color: "var(--color-sapphire)",
  },
  depenses: {
    label: "Dépenses",
    color: "var(--color-gold)",
  },
};

const deptConfig: ChartConfig = {
  projets: {
    label: "Projets",
    color: "var(--color-sapphire)",
  },
};

// ------------------------------------------------------------------
// KPI data — fonds multicolores jaune (or) et bleu (saphir) alternés
// ------------------------------------------------------------------

const KPI_VARIANTS = {
  blue: {
    card: "bg-gradient-to-br from-sapphire via-sapphire-light to-sapphire text-white border-0",
    iconBox: "bg-white/15",
    icon: "text-gold",
    value: "text-white",
    label: "text-white/75",
    trendUp: "text-emerald-300",
    trendDown: "text-rose-300",
  },
  gold: {
    card: "bg-gradient-to-br from-gold via-gold-light to-gold text-sapphire-dark border-0",
    iconBox: "bg-sapphire/10",
    icon: "text-sapphire",
    value: "text-sapphire-dark",
    label: "text-sapphire-dark/75",
    trendUp: "text-emerald-800",
    trendDown: "text-rose-800",
  },
} as const;

const kpis = [
  {
    label: "Projets actifs",
    value: "8",
    trend: "+12%",
    trendUp: true,
    trendLabel: "vs mois dernier",
    icon: FolderKanban,
    variant: "blue",
  },
  {
    label: "Revenus mensuels",
    value: formatCurrency(810_000),
    trend: "+44.6%",
    trendUp: true,
    trendLabel: "",
    icon: TrendingUp,
    variant: "gold",
  },
  {
    label: "Clients actifs",
    value: "10",
    trend: "+2",
    trendUp: true,
    trendLabel: "ce mois",
    icon: Users,
    variant: "blue",
  },
  {
    label: "Satisfaction client",
    value: "96%",
    trend: "+2%",
    trendUp: true,
    trendLabel: "",
    icon: Star,
    variant: "gold",
  },
] as const;

// ------------------------------------------------------------------
// Activity icon helper
// ------------------------------------------------------------------

function activityIcon(type: Activity["type"]) {
  switch (type) {
    case "projet":
      return <FolderKanban className="h-4 w-4 text-sapphire" />;
    case "client":
      return <Users className="h-4 w-4 text-sapphire" />;
    case "equipe":
      return <UserPlus className="h-4 w-4 text-sapphire" />;
    case "facture":
      return <Receipt className="h-4 w-4 text-sapphire" />;
  }
}

// ------------------------------------------------------------------
// OverviewView
// ------------------------------------------------------------------

export function OverviewView() {
  return (
    <div className="space-y-6">
      {/* ---------- KPI Cards (fond multicolore jaune / bleu) ---------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const v = KPI_VARIANTS[kpi.variant];
          return (
            <Card
              key={kpi.label}
              className={`p-6 shadow-lg ${v.card}`}
            >
              <div className="flex items-center justify-between">
                <p className={`text-sm ${v.label}`}>{kpi.label}</p>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${v.iconBox}`}
                >
                  <Icon className={`h-5 w-5 ${v.icon}`} />
                </div>
              </div>
              <p className={`mt-2 text-2xl font-bold ${v.value}`}>
                {kpi.value}
              </p>
              <p className={`mt-1 text-xs ${v.label}`}>
                <span
                  className={kpi.trendUp ? v.trendUp : v.trendDown}
                >
                  {kpi.trendUp ? "+" : ""}
                  {kpi.trend}
                </span>{" "}
                {kpi.trendLabel}
              </p>
            </Card>
          );
        })}
      </div>

      {/* ---------- Charts Row ---------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenus vs Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={revenueConfig} className="h-[300px] w-full">
              <LineChart
                data={REVENUE_DATA}
                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="mois"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(v: number) =>
                    `${(v / 1000).toFixed(0)}k`
                  }
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  labelFormatter={(label) => <span>{label}</span>}
                  formatter={(value: number, name: string) => (
                    <span className="font-mono">
                      {formatCurrency(value)}
                    </span>
                  )}
                />
                <Line
                  type="monotone"
                  dataKey="revenus"
                  stroke="var(--color-revenus)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="depenses"
                  stroke="var(--color-depenses)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Projects by Department Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Projets par département
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={deptConfig} className="h-[300px] w-full">
              <BarChart
                data={PROJECTS_BY_DEPT}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} />
                <YAxis
                  dataKey="departement"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  width={120}
                  tickMargin={4}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="projets"
                  fill="var(--color-projets)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* ---------- Bottom Row ---------- */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Services Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Répartition des services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SERVICES_DISTRIBUTION}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {SERVICES_DISTRIBUTION.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [
                      `${value}%`,
                      name,
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend below */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {SERVICES_DISTRIBUTION.map((entry) => (
                <div
                  key={entry.name}
                  className="flex items-center gap-1.5 text-xs"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-[2px]"
                    style={{ backgroundColor: entry.fill }}
                  />
                  {entry.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-96 space-y-0 overflow-y-auto">
              {ACTIVITIES.map((activity, index) => (
                <div key={activity.id}>
                  {index > 0 && <Separator />}
                  <div className="flex items-start gap-3 py-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sapphire/10">
                      {activityIcon(activity.type)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm leading-snug">
                        {activity.message}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {timeAgo(activity.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
