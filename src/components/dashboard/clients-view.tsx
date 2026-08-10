"use client";

import { useState } from "react";
import {
  CLIENTS,
  TIER_LABELS,
  TIER_COLORS,
  formatCurrency,
  timeAgo,
  type ClientTier,
  type Client,
} from "@/components/dashboard/dashboard-data";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Plus,
  Search,
  Building2,
  Mail,
  Phone,
  FolderKanban,
} from "lucide-react";

type TierFilter = "all" | ClientTier;

export function ClientsView() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");

  const filteredClients: Client[] = CLIENTS.filter((client) => {
    const matchesSearch =
      search.trim() === "" ||
      client.nom.toLowerCase().includes(search.toLowerCase()) ||
      client.entreprise.toLowerCase().includes(search.toLowerCase());

    const matchesTier =
      tierFilter === "all" || client.tier === tierFilter;

    return matchesSearch && matchesTier;
  });

  function handleTierChange(value: string) {
    setTierFilter(value as TierFilter);
  }

  return (
    <Card className="p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight">Clients</h2>
          <Badge variant="secondary" className="text-sm">
            {filteredClients.length}
          </Badge>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau client
        </Button>
      </div>

      {/* Search + Filter Row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={tierFilter} onValueChange={handleTierChange}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Filtrer par tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="nouveau">Nouveau</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clients Grid */}
      {filteredClients.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun client trouvé.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="overflow-hidden">
              {/* Top: Avatar + Tier Badge */}
              <CardHeader className="pb-0">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sapphire/10 text-sapphire font-semibold text-lg">
                    {client.nom.charAt(0)}
                  </div>
                  <Badge variant="secondary" className={TIER_COLORS[client.tier]}>
                    {TIER_LABELS[client.tier]}
                  </Badge>
                </div>
              </CardHeader>

              {/* Middle: Client Info */}
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="font-semibold">{client.nom}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{client.entreprise}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5 shrink-0" />
                    <span>{client.telephone}</span>
                  </div>
                </div>

                {/* Bottom: Stats + Activity */}
                <div className="border-t pt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <FolderKanban className="h-3.5 w-3.5" />
                      <span>
                        {client.projetsActifs} projet{client.projetsActifs > 1 ? "s" : ""} actif{client.projetsActifs > 1 ? "s" : ""}
                      </span>
                    </div>
                    <span className="font-medium">
                      {formatCurrency(client.revenuTotal)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dernière activité: {timeAgo(client.derniereActivite)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
