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

  const statCards = [
    { label: "Total messages", value: stats?.total ?? 0, icon: Inbox, color: "text-sapphire", bg: "bg-sapphire/10" },
    { label: "Non lus", value: stats?.unread ?? 0, icon: MailOpen, color: "text-red-600", bg: "bg-red-50" },
    { label: "Demandes de devis", value: stats?.devis ?? 0, icon: FileText, color: "text-gold-dark", bg: "bg-gold/10" },
    { label: "Messages contact", value: stats?.contact ?? 0, icon: MessageSquare, color: "text-green-700", bg: "bg-green-50" },
  ];

  return (
    <div className="space-y-6">
      {/* ---------- Statistiques ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <Card key={card.label} className="border-slate-100 shadow-sm">
            <CardContent className="flex items-center gap-4 p-4 md:p-5">
              <div
                className={`w-11 h-11 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}
              >
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-bold leading-none text-sapphire">
                  {loading ? "…" : card.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {card.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
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
                  ? "bg-sapphire text-white border-sapphire"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50")
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
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Rechercher un message…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-sapphire/40 focus:ring-2 focus:ring-sapphire/10"
          />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fetchMessages()}
          disabled={refreshing}
          className="border-slate-200"
        >
          <RefreshCw
            className={"w-4 h-4 mr-1.5" + (refreshing ? " animate-spin" : "")}
          />
          Actualiser
        </Button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
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
              className="md:col-span-3 h-28 animate-pulse rounded-xl bg-slate-100"
            />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-14 text-center">
            <div className="w-16 h-16 rounded-2xl bg-sapphire/5 flex items-center justify-center">
              <Inbox className="w-8 h-8 text-sapphire/40" />
            </div>
            <div>
              <p className="font-semibold text-sapphire">
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
                  "w-full text-left rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md " +
                  (selected?.id === message.id
                    ? "border-sapphire/40 ring-2 ring-sapphire/10"
                    : "border-slate-100") +
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
                            ? "font-medium text-slate-700"
                            : "font-bold text-sapphire")
                        }
                      >
                        {message.name}
                      </p>
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {message.subject || message.content}
                    </p>
                    <p className="mt-1.5 text-xs text-slate-400">
                      {timeAgo(message.createdAt)} · {message.email}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <Badge
                      className={
                        message.type === "devis"
                          ? "bg-gold/15 text-gold-dark border border-gold/30 hover:bg-gold/20"
                          : "bg-sapphire/10 text-sapphire border border-sapphire/20 hover:bg-sapphire/15"
                      }
                      variant="outline"
                    >
                      {message.type === "devis" ? "Devis" : "Contact"}
                    </Badge>
                    {!message.read && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-gold-dark">
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
              <Card className="border-slate-100 shadow-sm md:sticky md:top-20">
                <CardContent className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-2 border-b pb-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className={
                            selected.type === "devis"
                              ? "bg-gold/15 text-gold-dark border border-gold/30"
                              : "bg-sapphire/10 text-sapphire border border-sapphire/20"
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
                            className="text-[11px] border-slate-200 text-slate-500"
                          >
                            Lu
                          </Badge>
                        ) : (
                          <Badge className="bg-gold text-sapphire-dark text-[11px] font-semibold">
                            Non lu
                          </Badge>
                        )}
                      </div>
                      <h3 className="mt-2 text-base font-bold text-sapphire truncate">
                        {selected.subject || "Sans sujet"}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Reçu le {formatDate(selected.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-sm">
                    <p className="flex items-center gap-2">
                      <User className="w-4 h-4 shrink-0 text-sapphire" />
                      <span className="font-medium text-slate-800">
                        {selected.name}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <AtSign className="w-4 h-4 shrink-0 text-sapphire" />
                      <a
                        href={`mailto:${selected.email}`}
                        className="truncate text-sapphire underline-offset-2 hover:underline"
                      >
                        {selected.email}
                      </a>
                    </p>
                    {selected.service && (
                      <p className="flex items-center gap-2">
                        <Tag className="w-4 h-4 shrink-0 text-sapphire" />
                        <span className="text-slate-700">
                          {selected.service}
                        </span>
                      </p>
                    )}
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3.5 h-3.5" />
                      {timeAgo(selected.createdAt)}
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-50 border border-slate-100 p-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                      {selected.content}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 border-t pt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleRead(selected)}
                      className="border-slate-200"
                    >
                      <MailOpen className="w-4 h-4 mr-1.5" />
                      {selected.read ? "Marquer non lu" : "Marquer comme lu"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="border-slate-200 ml-auto text-red-600 hover:bg-red-50 hover:text-red-700"
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
                  <MailOpen className="w-10 h-10 text-slate-300" />
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
            <AlertDialogTitle className="text-sapphire">
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
