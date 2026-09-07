"use client";

import { useState, useEffect, useCallback } from "react";
import {
  TIER_LABELS,
  TIER_COLORS,
  formatCurrency,
  timeAgo,
  type ClientTier,
  type Client,
} from "@/components/dashboard/dashboard-data";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Plus,
  Search,
  Building2,
  Mail,
  Phone,
  FolderKanban,
  Loader2,
} from "lucide-react";

type TierFilter = "all" | ClientTier;

interface ClientForm {
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  tier: ClientTier;
}

const EMPTY_FORM: ClientForm = {
  nom: "",
  entreprise: "",
  email: "",
  telephone: "",
  tier: "nouveau",
};

export function ClientsView() {
  const { toast } = useToast();

  // Données
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtres
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<TierFilter>("all");

  // Dialog de création
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ClientForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadClients = useCallback(async () => {
    try {
      const res = await fetch("/api/clients");
      if (!res.ok) throw new Error("Chargement impossible");
      const data = await res.json();
      setClients(data.clients);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de charger les clients.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const filteredClients: Client[] = clients.filter((client) => {
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

  function openDialog() {
    setForm(EMPTY_FORM);
    setFormError(null);
    setDialogOpen(true);
  }

  function setField<K extends keyof ClientForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    if (!form.nom.trim() || !form.entreprise.trim() || !form.email.trim()) {
      setFormError("Nom, entreprise et email sont obligatoires.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormError("Adresse email invalide.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data?.error || "Création impossible.");
        return;
      }
      setDialogOpen(false);
      await loadClients();
      toast({
        title: "Client créé",
        description: `${data.client.nom} (${data.client.entreprise}) a été ajouté.`,
      });
    } catch {
      setFormError("Erreur réseau. Réessayez.");
    } finally {
      setSubmitting(false);
    }
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

        <Button onClick={openDialog}>
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
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Chargement des clients...
          </span>
        </div>
      ) : filteredClients.length === 0 ? (
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

      {/* Dialog : Nouveau client */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nouveau client</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau client à votre portefeuille.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="client-nom">Nom du contact *</Label>
              <Input
                id="client-nom"
                value={form.nom}
                onChange={(e) => setField("nom", e.target.value)}
                placeholder="Ex : Mohammed Alami"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client-entreprise">Entreprise *</Label>
              <Input
                id="client-entreprise"
                value={form.entreprise}
                onChange={(e) => setField("entreprise", e.target.value)}
                placeholder="Ex : Maroc Telecom"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client-email">Email *</Label>
              <Input
                id="client-email"
                type="email"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="contact@entreprise.ma"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="client-tel">Téléphone</Label>
              <Input
                id="client-tel"
                value={form.telephone}
                onChange={(e) => setField("telephone", e.target.value)}
                placeholder="+212 5 22 00 00 00"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2">
              <Label>Catégorie</Label>
              <Select
                value={form.tier}
                onValueChange={(v) => setField("tier", v)}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nouveau">Nouveau</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formError && (
              <p className="text-sm text-red-600" role="alert">
                {formError}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={submitting}
            >
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer le client"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
