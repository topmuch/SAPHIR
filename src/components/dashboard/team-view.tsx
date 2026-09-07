'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { UserPlus, Mail, FolderKanban, Loader2 } from 'lucide-react';
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

  // Dialog d'ajout
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<MemberForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

  function openDialog() {
    setForm(EMPTY_FORM);
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
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data?.error || "Ajout impossible.");
        return;
      }
      setDialogOpen(false);
      await loadTeam();
      toast({
        title: 'Membre ajouté',
        description: `${data.member.nom} a rejoint l'équipe.`,
      });
    } catch {
      setFormError('Erreur réseau. Réessayez.');
    } finally {
      setSubmitting(false);
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
        <Button onClick={openDialog}>
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
                ? 'rounded-full bg-sapphire px-4 py-1.5 text-sm font-medium text-white transition-colors'
                : 'rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200'
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
            <Card key={member.id}>
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start gap-4">
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

      {/* Dialog : Ajouter un membre */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un membre</DialogTitle>
            <DialogDescription>
              Ajoutez un nouveau collaborateur à l&apos;équipe SAPHIR.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="member-nom">Nom complet *</Label>
              <Input
                id="member-nom"
                value={form.nom}
                onChange={(e) => setField('nom', e.target.value)}
                placeholder="Ex : Amina Benali"
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
                placeholder="prenom.nom@saphircom.ma"
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
                  Ajout...
                </>
              ) : (
                'Ajouter le membre'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
