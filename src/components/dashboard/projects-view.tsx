"use client";

import { useState, useEffect, useCallback } from "react";
import {
  STATUS_LABELS,
  STATUS_COLORS,
  formatCurrency,
  type ProjectStatus,
  type Project,
} from "@/components/dashboard/dashboard-data";
import { useToast } from "@/hooks/use-toast";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Calendar,
  User,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS: { value: "all" | ProjectStatus; label: string }[] = [
  { value: "all", label: "Tous les statuts" },
  { value: "en_cours", label: "En cours" },
  { value: "termine", label: "Terminé" },
  { value: "en_attente", label: "En attente" },
  { value: "pause", label: "En pause" },
];

const DEPARTEMENTS = [
  "Création graphique",
  "Production audiovisuelle",
  "Informatique & Sonorisation",
  "Planning stratégique",
  "Événementiel",
  "Commercial",
];

interface ProjectForm {
  nom: string;
  client: string;
  departement: string;
  statut: ProjectStatus;
  budget: string;
  progression: string;
  dateDebut: string;
  dateEcheance: string;
  responsable: string;
}

const EMPTY_FORM: ProjectForm = {
  nom: "",
  client: "",
  departement: "",
  statut: "en_attente",
  budget: "",
  progression: "0",
  dateDebut: "",
  dateEcheance: "",
  responsable: "",
};

export function ProjectsView() {
  const { toast } = useToast();

  // Données
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [clientNames, setClientNames] = useState<string[]>([]);

  // Filtres / pagination
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog de création / modification
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Dialog de consultation
  const [viewingProject, setViewingProject] = useState<Project | null>(null);

  // Confirmation de suppression
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      const res = await fetch("/api/projects");
      if (!res.ok) throw new Error("Chargement impossible");
      const data = await res.json();
      setProjects(data.projects);
    } catch {
      toast({
        title: "Erreur",
        description: "Impossible de charger les projets.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadProjects();
    // Suggestions de clients pour le formulaire
    fetch("/api/clients")
      .then((res) => (res.ok ? res.json() : { clients: [] }))
      .then((data) => setClientNames(data.clients.map((c: { nom: string }) => c.nom)))
      .catch(() => {});
  }, [loadProjects]);

  const filteredProjects: Project[] =
    statusFilter === "all"
      ? projects
      : projects.filter((p) => p.statut === statusFilter);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length);
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  function handleFilterChange(value: string) {
    setStatusFilter(value as "all" | ProjectStatus);
    setCurrentPage(1);
  }

  function openDialog() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setDialogOpen(true);
  }

  function openEditDialog(project: Project) {
    setEditingId(project.id);
    setForm({
      nom: project.nom,
      client: project.client,
      departement: project.departement,
      statut: project.statut,
      budget: String(project.budget),
      progression: String(project.progression),
      dateDebut: project.dateDebut ? project.dateDebut.slice(0, 10) : "",
      dateEcheance: project.dateEcheance ? project.dateEcheance.slice(0, 10) : "",
      responsable: project.responsable ?? "",
    });
    setFormError(null);
    setDialogOpen(true);
  }

  function setField<K extends keyof ProjectForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    if (!form.nom.trim() || !form.client.trim() || !form.departement) {
      setFormError("Nom, client et département sont obligatoires.");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const isEdit = editingId !== null;
      const res = await fetch("/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(isEdit ? { id: editingId } : {}),
          ...form,
          budget: form.budget ? Number(form.budget) : 0,
          progression: form.progression ? Number(form.progression) : 0,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data?.error || "Enregistrement impossible.");
        return;
      }
      setDialogOpen(false);
      await loadProjects();
      toast({
        title: isEdit ? "Projet modifié" : "Projet créé",
        description: isEdit
          ? `${data.project.nom} (${data.project.id}) a été mis à jour.`
          : `${data.project.nom} (${data.project.id}) a été ajouté.`,
      });
    } catch {
      setFormError("Erreur réseau. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(
        `/api/projects?id=${encodeURIComponent(deleteTarget.id)}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error();
      await loadProjects();
      toast({
        title: "Projet supprimé",
        description: `${deleteTarget.nom} (${deleteTarget.id}) a été supprimé.`,
      });
      setDeleteTarget(null);
    } catch {
      toast({
        title: "Erreur",
        description: "Suppression impossible.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Card className="p-6">
      {/* Header Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">Projets</h2>

        <div className="flex items-center gap-3">
          <Select value={statusFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={openDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau projet
          </Button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Référence</TableHead>
              <TableHead>Projet</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Département</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Budget</TableHead>
              <TableHead className="w-[160px]">Progression</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Chargement des projets...
                  </span>
                </TableCell>
              </TableRow>
            ) : paginatedProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                  Aucun projet trouvé.
                </TableCell>
              </TableRow>
            ) : (
              paginatedProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-mono text-sm">
                    {project.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {project.nom}
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.departement}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={STATUS_COLORS[project.statut]}
                    >
                      {STATUS_LABELS[project.statut]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(project.budget)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progression} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground w-8 text-right">
                        {project.progression}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => setViewingProject(project)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => openEditDialog(project)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => setDeleteTarget(project)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-muted-foreground">
          Affichage de {filteredProjects.length === 0 ? 0 : startIndex + 1} à {" "}
          {endIndex} sur {filteredProjects.length} projets
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={safeCurrentPage <= 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={safeCurrentPage >= totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Dialog : Nouveau / Modifier projet */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingId ? `Modifier ${editingId}` : "Nouveau projet"}
            </DialogTitle>
            <DialogDescription>
              {editingId
                ? "Mettez à jour les informations du projet."
                : "Renseignez les informations du projet. La référence est générée automatiquement."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label htmlFor="proj-nom">Nom du projet *</Label>
              <Input
                id="proj-nom"
                value={form.nom}
                onChange={(e) => setField("nom", e.target.value)}
                placeholder="Ex : Campagne social media..."
                disabled={submitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="proj-client">Client *</Label>
              <Input
                id="proj-client"
                list="proj-client-suggestions"
                value={form.client}
                onChange={(e) => setField("client", e.target.value)}
                placeholder="Ex : Maroc Telecom"
                disabled={submitting}
              />
              <datalist id="proj-client-suggestions">
                {clientNames.map((name) => (
                  <option key={name} value={name} />
                ))}
              </datalist>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Département *</Label>
                <Select
                  value={form.departement}
                  onValueChange={(v) => setField("departement", v)}
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
                <Label>Statut</Label>
                <Select
                  value={form.statut}
                  onValueChange={(v) => setField("statut", v)}
                  disabled={submitting}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en_attente">En attente</SelectItem>
                    <SelectItem value="en_cours">En cours</SelectItem>
                    <SelectItem value="termine">Terminé</SelectItem>
                    <SelectItem value="pause">En pause</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="proj-budget">Budget (FCFA)</Label>
                <Input
                  id="proj-budget"
                  type="number"
                  min={0}
                  value={form.budget}
                  onChange={(e) => setField("budget", e.target.value)}
                  placeholder="0"
                  disabled={submitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="proj-progression">Progression (%)</Label>
                <Input
                  id="proj-progression"
                  type="number"
                  min={0}
                  max={100}
                  value={form.progression}
                  onChange={(e) => setField("progression", e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="proj-debut">Date de début</Label>
                <Input
                  id="proj-debut"
                  type="date"
                  value={form.dateDebut}
                  onChange={(e) => setField("dateDebut", e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="proj-echeance">Échéance</Label>
                <Input
                  id="proj-echeance"
                  type="date"
                  value={form.dateEcheance}
                  onChange={(e) => setField("dateEcheance", e.target.value)}
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="proj-resp">Responsable</Label>
              <Input
                id="proj-resp"
                value={form.responsable}
                onChange={(e) => setField("responsable", e.target.value)}
                placeholder="Ex : Amina Benali"
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
                  {editingId ? "Modification..." : "Création..."}
                </>
              ) : editingId ? (
                "Enregistrer"
              ) : (
                "Créer le projet"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog : Voir un projet */}
      <Dialog
        open={viewingProject !== null}
        onOpenChange={(open) => !open && setViewingProject(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="font-mono text-sm text-muted-foreground">
                {viewingProject?.id}
              </span>
              {viewingProject?.nom}
            </DialogTitle>
            <DialogDescription>Fiche détaillée du projet.</DialogDescription>
          </DialogHeader>

          {viewingProject && (
            <div className="space-y-4 py-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Client
                  </p>
                  <p className="text-sm font-medium">{viewingProject.client}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Département
                  </p>
                  <p className="text-sm font-medium">
                    {viewingProject.departement}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Statut
                  </p>
                  <Badge
                    variant="secondary"
                    className={STATUS_COLORS[viewingProject.statut]}
                  >
                    {STATUS_LABELS[viewingProject.statut]}
                  </Badge>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    Budget
                  </p>
                  <p className="text-sm font-medium">
                    {formatCurrency(viewingProject.budget)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Progression
                  </p>
                  <span className="text-sm font-medium">
                    {viewingProject.progression}%
                  </span>
                </div>
                <Progress value={viewingProject.progression} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border p-3 flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Début
                    </p>
                    <p className="text-sm font-medium">
                      {viewingProject.dateDebut
                        ? new Date(viewingProject.dateDebut).toLocaleDateString(
                            "fr-FR"
                          )
                        : "—"}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border p-3 flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Échéance
                    </p>
                    <p className="text-sm font-medium">
                      {viewingProject.dateEcheance
                        ? new Date(
                            viewingProject.dateEcheance
                          ).toLocaleDateString("fr-FR")
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-3 flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Responsable
                  </p>
                  <p className="text-sm font-medium">
                    {viewingProject.responsable || "Non assigné"}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setViewingProject(null)}
            >
              Fermer
            </Button>
            <Button
              onClick={() => {
                const p = viewingProject;
                setViewingProject(null);
                if (p) openEditDialog(p);
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
            <AlertDialogTitle>Supprimer ce projet ?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget &&
                `${deleteTarget.nom} (${deleteTarget.id}) sera définitivement supprimé. Cette action est irréversible.`}
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
                "Supprimer"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
