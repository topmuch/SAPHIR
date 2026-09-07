"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { timeAgo } from "@/components/dashboard/dashboard-data";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Inbox,
  MailOpen,
  FileText,
  MessageSquare,
  RefreshCw,
  Trash2,
  Loader2,
  User,
  Mail,
  Tag,
  Search,
  AtSign,
} from "lucide-react";

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface MessageItem {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  type: string; // "devis" | "contact"
  service: string | null;
  content: string;
  read: boolean;
  createdAt: string;
}

interface MessagesStats {
  total: number;
  unread: number;
  devis: number;
  contact: number;
}

type TypeFilter = "all" | "unread" | "devis" | "contact";

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const FILTERS: { key: TypeFilter; label: string }[] = [
  { key: "all", label: "Tous" },
  { key: "unread", label: "Non lus" },
  { key: "devis", label: "Devis" },
  { key: "contact", label: "Contact" },
];

// ------------------------------------------------------------------
// Vue Messages
// ------------------------------------------------------------------
export function MessagesView({ onUnreadChange }: { onUnreadChange?: (n: number) => void }) {
  const { toast } = useToast();

  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [stats, setStats] = useState<MessagesStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TypeFilter>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<MessageItem | null>(null);

  // Suppression
  const [deleteTarget, setDeleteTarget] = useState<MessageItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchMessages = useCallback(
    async (silent = false) => {
      if (!silent) setRefreshing(true);
      try {
        const res = await fetch("/api/messages", { cache: "no-store" });
        if (res.status === 401) {
          setError("Session expirée — reconnectez-vous.");
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Erreur de chargement");
        setMessages(data.messages as MessageItem[]);
        setStats(data.stats as MessagesStats);
        onUnreadChange?.(data.stats?.unread ?? 0);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Erreur de chargement");
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [onUnreadChange]
  );

  // Chargement initial + rafraîchissement automatique toutes les 10 s
  useEffect(() => {
    fetchMessages();
    const interval = setInterval(() => fetchMessages(true), 10000);
    return () => clearInterval(interval);
  }, [fetchMessages]);

  const filtered = useMemo(() => {
    let list = messages;
    switch (filter) {
      case "unread":
        list = list.filter((m) => !m.read);
        break;
      case "devis":
        list = list.filter((m) => m.type === "devis");
        break;
      case "contact":
        list = list.filter((m) => m.type === "contact");
        break;
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          (m.subject || "").toLowerCase().includes(q)
      );
    }
    return list;
  }, [messages, filter, search]);

  const openMessage = async (message: MessageItem) => {
    setSelected(message);
    if (!message.read) {
      try {
        const res = await fetch(`/api/messages/${message.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ read: true }),
        });
        if (res.ok) {
          setMessages((msgs) =>
            msgs.map((m) => (m.id === message.id ? { ...m, read: true } : m))
          );
          setSelected((sel) =>
            sel && sel.id === message.id ? { ...sel, read: true } : sel
          );
          setStats((s) => (s ? { ...s, unread: Math.max(0, s.unread - 1) } : s));
          onUnreadChange?.(Math.max(0, (stats?.unread ?? 1) - 1));
        }
      } catch {
        // non bloquant
      }
    }
  };

  const toggleRead = async (message: MessageItem) => {
    const newRead = !message.read;
    try {
      const res = await fetch(`/api/messages/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: newRead }),
      });
      if (!res.ok) throw new Error();
      setMessages((msgs) =>
        msgs.map((m) => (m.id === message.id ? { ...m, read: newRead } : m))
      );
      setSelected((sel) =>
        sel && sel.id === message.id ? { ...sel, read: newRead } : sel
      );
      fetchMessages(true);
      toast({
        title: newRead ? "Marqué comme lu" : "Marqué comme non lu",
        description: `Message de ${message.name}.`,
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Action impossible.",
        variant: "destructive",
      });
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/messages/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setMessages((msgs) => msgs.filter((m) => m.id !== deleteTarget.id));
      if (selected?.id === deleteTarget.id) setSelected(null);
      setDeleteTarget(null);
      fetchMessages(true);
      toast({
        title: "Message supprimé",
        description: "Le message a été définitivement retiré.",
      });
    } catch {
      toast({
        title: "Erreur",
        description: "Suppression impossible.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  // Variantes multicolores jaune (or) / bleu (saphir) alternées
  const STAT_VARIANTS = {
    blue: {
      card: "bg-gradient-to-br from-sapphire via-sapphire-light to-sapphire border-0 text-white",
      iconBox: "bg-white/15",
      icon: "text-gold",
      value: "text-white",
      label: "text-white/75",
    },
    gold: {
      card: "bg-gradient-to-br from-gold via-gold-light to-gold border-0 text-sapphire-dark",
      iconBox: "bg-sapphire/10",
      icon: "text-sapphire",
      value: "text-sapphire-dark",
      label: "text-sapphire-dark/75",
    },
  } as const;

  const statCards = [
    { label: "Total messages", value: stats?.total ?? 0, icon: Inbox, variant: "blue" as const },
    { label: "Non lus", value: stats?.unread ?? 0, icon: MailOpen, variant: "gold" as const },
    { label: "Demandes de devis", value: stats?.devis ?? 0, icon: FileText, variant: "blue" as const },
    { label: "Messages contact", value: stats?.contact ?? 0, icon: MessageSquare, variant: "gold" as const },
  ];

  return (
    <div className="space-y-6">
      {/* ---------- Statistiques (fond multicolore jaune / bleu) ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const v = STAT_VARIANTS[card.variant];
          return (
            <Card key={card.label} className={`shadow-md ${v.card}`}>
              <CardContent className="flex items-center gap-4 p-4 md:p-5">
                <div
                  className={`w-11 h-11 rounded-xl ${v.iconBox} flex items-center justify-center shrink-0`}
                >
                  <card.icon className={`w-5 h-5 ${v.icon}`} />
                </div>
                <div className="min-w-0">
                  <p className={`text-2xl font-bold leading-none ${v.value}`}>
                    {loading ? "…" : card.value}
                  </p>
                  <p className={`text-xs mt-1 truncate ${v.label}`}>
                    {card.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ---------- Filtres + recherche + actualiser ---------- */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={
                "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors border " +
                (filter === f.key
                  ? "bg-sapphire text-white border-sapphire dark:bg-gold dark:text-sapphire-dark dark:border-gold"
                  : "bg-background text-muted-foreground border-border hover:bg-muted hover:text-foreground")
              }
            >
              {f.label}
              {f.key === "unread" && (stats?.unread ?? 0) > 0 && (
                <span className="ml-1.5 text-xs opacity-80">
                  ({stats?.unread})
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="relative sm:ml-auto sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Rechercher un message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm outline-none focus:border-ring/40 focus:ring-2 focus:ring-ring/10 placeholder:text-muted-foreground"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchMessages()}
          disabled={refreshing}
        >
          <RefreshCw
            className={"w-4 h-4 mr-1.5" + (refreshing ? " animate-spin" : "")}
          />
          Actualiser
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400">
          {error}{" "}
          <button
            className="font-semibold underline"
            onClick={() => fetchMessages()}
          >
            Réessayer
          </button>
        </div>
      )}

      {/* ---------- Liste + détail ---------- */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="md:col-span-3 h-28 animate-pulse rounded-xl bg-muted"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-14 text-center">
            <div className="w-16 h-16 rounded-2xl bg-sapphire/5 dark:bg-white/5 flex items-center justify-center">
              <Inbox className="w-8 h-8 text-sapphire/40 dark:text-gold-light/40" />
            </div>
            <div>
              <p className="font-semibold text-sapphire dark:text-gold-light">
                Aucun message pour le moment
              </p>
              <p className="mt-1 text-sm text-muted-foreground max-w-md">
                Les demandes envoyées depuis le formulaire de devis (page
                d&apos;accueil) et les formulaires de contact apparaîtront ici
                automatiquement.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-5">
          {/* Liste */}
          <div className="md:col-span-3 flex flex-col gap-3 max-h-[620px] overflow-y-auto pr-1">
            {filtered.map((message) => (
              <button
                key={message.id}
                onClick={() => openMessage(message)}
                className={
                  "w-full text-left rounded-xl border bg-card p-4 shadow-sm transition-all hover:shadow-md " +
                  (selected?.id === message.id
                    ? "border-sapphire/40 ring-2 ring-sapphire/10 dark:border-gold/40 dark:ring-gold/15"
                    : "border-border hover:border-gold/30") +
                  (message.read ? "" : " border-l-4 border-l-gold")
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      {!message.read && (
                        <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                      )}
                      <p
                        className={
                          "truncate text-sm " +
                          (message.read
                            ? "font-medium text-foreground"
                            : "font-bold text-sapphire dark:text-gold-light")
                        }
                      >
                        {message.name}
                      </p>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {message.subject || message.content}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {timeAgo(message.createdAt)} · {message.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <Badge
                      className={
                        message.type === "devis"
                          ? "bg-gold/15 text-gold-dark dark:text-gold-light border border-gold/30 hover:bg-gold/20"
                          : "bg-sapphire/10 text-sapphire dark:text-gold-light border border-sapphire/20 hover:bg-sapphire/15"
                      }
                      variant="outline"
                    >
                      {message.type === "devis" ? "Devis" : "Contact"}
                    </Badge>
                    {!message.read && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gold-dark dark:text-gold-light">
                        Nouveau
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Détail */}
          <div className="md:col-span-2">
            {selected ? (
              <Card className="border-border shadow-sm md:sticky md:top-20">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b pb-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className={
                            selected.type === "devis"
                              ? "bg-gold/15 text-gold-dark dark:text-gold-light border border-gold/30"
                              : "bg-sapphire/10 text-sapphire dark:text-gold-light border border-sapphire/20"
                          }
                          variant="outline"
                        >
                          {selected.type === "devis"
                            ? "Demande de devis"
                            : "Message contact"}
                        </Badge>
                        {selected.read ? (
                          <Badge
                            variant="outline"
                            className="text-[11px] border-border text-muted-foreground"
                          >
                            Lu
                          </Badge>
                        ) : (
                          <Badge className="bg-gold text-sapphire-dark text-[11px] font-semibold">
                            Non lu
                          </Badge>
                        )}
                      </div>
                      <h3 className="mt-2 text-base font-bold text-sapphire dark:text-gold-light truncate">
                        {selected.subject || "Sans sujet"}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Reçu le {formatDate(selected.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4 shrink-0 text-sapphire dark:text-gold-light" />
                      <span className="font-medium text-foreground">
                        {selected.name}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <AtSign className="w-4 h-4 shrink-0 text-sapphire dark:text-gold-light" />
                      <a
                        href={`mailto:${selected.email}`}
                        className="truncate text-sapphire dark:text-gold-light underline-offset-2 hover:underline"
                      >
                        {selected.email}
                      </a>
                    </p>
                    {selected.service && (
                      <p className="flex items-center gap-2">
                        <Tag className="w-4 h-4 shrink-0 text-sapphire dark:text-gold-light" />
                        <span className="text-foreground">
                          {selected.service}
                        </span>
                      </p>
                    )}
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      {timeAgo(selected.createdAt)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted border border-border p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {selected.content}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleRead(selected)}
                    >
                      <MailOpen className="w-4 h-4 mr-1.5" />
                      {selected.read ? "Marquer non lu" : "Marquer comme lu"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="ml-auto text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 dark:hover:text-red-300"
                    >
                      <a href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(selected.subject || "Votre message")}`}>
                        Répondre
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setDeleteTarget(selected)}
                    >
                      <Trash2 className="w-4 h-4 mr-1.5" />
                      Supprimer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed hidden md:flex items-center justify-center">
                <CardContent className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
                  <MailOpen className="w-10 h-10 text-muted-foreground/50" />
                  <p className="text-sm">
                    Sélectionnez un message dans la liste
                    <br />
                    pour afficher son contenu complet.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* ---------- Confirmation de suppression ---------- */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-sapphire dark:text-gold-light">
              Supprimer ce message ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Le message de <strong>{deleteTarget?.name}</strong> sera
              définitivement supprimé. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting && <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />}
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
