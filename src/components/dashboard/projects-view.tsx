"use client";

import { useState } from "react";
import {
  PROJECTS,
  STATUS_LABELS,
  STATUS_COLORS,
  formatCurrency,
  type ProjectStatus,
  type Project,
} from "@/components/dashboard/dashboard-data";

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
import { Card } from "@/components/ui/card";

import {
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS: { value: "all" | ProjectStatus; label: string }[] = [
  { value: "all", label: "Tous les statuts" },
  { value: "en_cours", label: "En cours" },
  { value: "termine", label: "Terminé" },
  { value: "en_attente", label: "En attente" },
  { value: "pause", label: "En pause" },
];

export function ProjectsView() {
  const [statusFilter, setStatusFilter] = useState<"all" | ProjectStatus>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProjects: Project[] =
    statusFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.statut === statusFilter);

  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, filteredProjects.length);
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  function handleFilterChange(value: string) {
    setStatusFilter(value as "all" | ProjectStatus);
    setCurrentPage(1);
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

          <Button>
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
            {paginatedProjects.length === 0 ? (
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
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
    </Card>
  );
}
