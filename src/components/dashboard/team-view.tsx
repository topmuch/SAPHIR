'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  UserPlus,
  Mail,
  FolderKanban,
  Loader2,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import type { TeamMember } from './dashboard-data';

const DEPARTEMENTS = [
  'Création graphique',
  'Production audiovisuelle',
  'Informatique & Sonorisation',
  'Planning stratégique',
  'Événementiel',
  'Commercial',
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

interface MemberForm {
  nom: string;
  role: string;
  departement: string;
  email: string;
}

const EMPTY_FORM: MemberForm = {
  nom: '',
  role: '',
  departement: '',
  email: '',
};

export function TeamView() {
  const { toast } = useToast();

  // Données
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('Tous');

  // Dialog d'ajout / modification
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MemberForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Dialog de consultation
  const [viewingMember, setViewingMember] = useState<TeamMember | null>(null);

  // Confirmation de suppression
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadTeam = useCallback(async () => {
    try {
      const res = await fetch('/api/team');
      if (!res.ok) throw new Error('Chargement impossible');
      const data = await res.json();
      setTeam(data.team);
    } catch {
      toast({
        title: 'Erreur',
        description: "Impossible de charger l'équipe.",
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadTeam();
  }, [loadTeam]);

  const departments = useMemo(() => {
    const unique = Array.from(new Set(team.map((m) => m.departement)));
    return ['Tous', ...unique];
  }, [team]);

  const filteredTeam = useMemo(
    () =>
      activeFilter === 'Tous'
        ? team
        : team.filter((m) => m.departement === activeFilter),
    [team, activeFilter],
  );

  function openCreateDialog() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setDialogOpen(true);
  }

  function openEditDialog(member: TeamMember) {
    setEditingId(member.id);
    setForm({
      nom: member.nom,
      role: member.role,
      departement: member.departement,
      email: member.email,
    });
    setFormError(null);
    setDialogOpen(true);
  }

  function setField<K extends keyof MemberForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    if (
      !form.nom.trim() ||
      !form.role.trim() ||
      !form.departement ||
      !form.email.trim()
    ) {
      setFormError('Tous les champs sont obligatoires.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setFormError('Adresse email invalide.');
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const isEdit = editingId !== null;
      const res = await fetch('/api/team', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isEdit ? { ...form, id: editingId } : form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data?.error || 'Enregistrement impossible.');
        return;
      }
      setDialogOpen(false);
      await loadTeam();
      toast({
        title: isEdit ? 'Membre modifié' : 'Membre ajouté',
        description: isEdit
          ? `${data.member.nom} a été mis à jour.`
          : `${data.member.nom} a rejoint l'équipe.`,
      });
    } catch {
      setFormError('Erreur réseau. Réessayez.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/team?id=${encodeURIComponent(deleteTarget.id)}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error();
      await loadTeam();
      toast({
        title: 'Membre supprimé',
        description: `${deleteTarget.nom} a été retiré de l'équipe.`,
      });
      setDeleteTarget(null);
    } catch {
      toast({
        title: 'Erreur',
        description: 'Suppression impossible.',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight">Équipe</h2>
          <Badge variant="secondary" className="text-sm">
            {team.length} membres
          </Badge>
        </div>
        <Button onClick={openCreateDialog}>
          <UserPlus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {/* Department filter pills */}
      <div className="flex flex-wrap gap-2">
        {departments.map((dept) => (
          <button
            key={dept}
            onClick={() => setActiveFilter(dept)}
            className={
              activeFilter === dept
                ? 'rounded-full bg-sapphire dark:bg-gold dark:text-sapphire-dark px-4 py-1.5 text-sm font-medium text-white transition-colors'
                : 'rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground'
            }
          >
            {dept}
          </button>
        ))}
      </div>

      {/* Team grid */}
      {loading ? (
        <div className="text-center py-12 text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Chargement de l'équipe...
          </span>
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun membre trouvé.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeam.map((member) => (
            <Card key={member.id} className="relative">
              <CardContent className="flex flex-col gap-4 p-5">
                {/* Menu d'actions */}
                <div className="absolute top-3 right-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => setViewingMember(member)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openEditDialog(member)}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => setDeleteTarget(member)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-start gap-4 pr-8">
                  {/* Avatar */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sapphire text-sm font-semibold text-white">
                    {getInitials(member.nom)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-tight">{member.nom}</p>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <Badge
                      variant="secondary"
                      className="mt-1.5 bg-sapphire/5 text-xs text-sapphire"
                    >
                      {member.departement}
                    </Badge>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>

                {/* Active projects count */}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FolderKanban className="h-3.5 w-3.5 shrink-0" />
                  <span>{member.projets} projets actifs</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog : Ajouter / Modifier un membre */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingId ? 'Modifier le membre' : 'Ajouter un membre'}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Mettez à jour les informations du collaborateur."
                : "Ajoutez un nouveau collaborateur à l'équipe EMERAUDE."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="member-nom">Nom complet *</Label>
              <Input
                id="member-nom"
                value={form.nom}
                onChange={(e) => setField('nom', e.target.value)}
                placeholder="Ex : Awa Ndiaye"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="member-role">Rôle *</Label>
              <Input
                id="member-role"
                value={form.role}
                onChange={(e) => setField('role', e.target.value)}
                placeholder="Ex : Directrice Artistique"
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2">
              <Label>Département *</Label>
              <Select
                value={form.departement}
                onValueChange={(v) => setField('departement', v)}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choisir" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTEMENTS.map((d) => (
                    <SelectItem key={d} value={d}>
                      {d}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="member-email">Email *</Label>
              <Input
                id="member-email"
                type="email"
                value={form.email}
                onChange={(e) => setField('email', e.target.value)}
                placeholder="prenom.nom@zaphircomsen.com"
                disabled={submitting}
              />
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
                  {editingId ? 'Modification...' : 'Ajout...'}
                </>
              ) : editingId ? (
                'Enregistrer'
              ) : (
                'Ajouter le membre'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog : Voir un membre */}
      <Dialog
        open={viewingMember !== null}
        onOpenChange={(open) => !open && setViewingMember(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Fiche membre</DialogTitle>
            <DialogDescription>Informations du collaborateur.</DialogDescription>
          </DialogHeader>

          {viewingMember && (
            <div className="space-y-4 py-1">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sapphire text-base font-semibold text-white">
                  {getInitials(viewingMember.nom)}
                </div>
                <div>
                  <p className="font-semibold text-lg leading-tight">
                    {viewingMember.nom}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {viewingMember.role}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className="rounded-lg border p-3 flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-medium break-all">
                      {viewingMember.email}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Département
                  </p>
                  <Badge
                    variant="secondary"
                    className="bg-sapphire/5 text-xs text-sapphire"
                  >
                    {viewingMember.departement}
                  </Badge>
                </div>
                <div className="rounded-lg border p-3 flex items-start gap-2">
                  <FolderKanban className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Charge
                    </p>
                    <p className="text-sm font-medium">
                      {viewingMember.projets} projets actifs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingMember(null)}>
              Fermer
            </Button>
            <Button
              onClick={() => {
                const m = viewingMember;
                setViewingMember(null);
                if (m) openEditDialog(m);
              }}
            >
              <Pencil className="mr-2 h-4 w-4" />
              Modifier
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation de suppression */}
      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce membre ?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget &&
                `${deleteTarget.nom} sera définitivement retiré de l'équipe. Cette action est irréversible.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Suppression...
                </>
              ) : (
                'Supprimer'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
