import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, ensureSeeded } from "@/lib/auth";
import type { ProjectStatus } from "@/components/dashboard/dashboard-data";

const STATUTS: ProjectStatus[] = ["en_cours", "termine", "en_attente", "pause"];

function serializeProject(row: {
  id: string;
  reference: string;
  nom: string;
  client: string;
  departement: string;
  statut: string;
  budget: number;
  progression: number;
  dateDebut: Date | null;
  dateEcheance: Date | null;
  responsable: string | null;
}) {
  return {
    id: row.reference,
    nom: row.nom,
    client: row.client,
    departement: row.departement,
    statut: (STATUTS.includes(row.statut as ProjectStatus)
      ? row.statut
      : "en_attente") as ProjectStatus,
    budget: row.budget,
    progression: row.progression,
    dateDebut: row.dateDebut ? row.dateDebut.toISOString() : "",
    dateEcheance: row.dateEcheance ? row.dateEcheance.toISOString() : "",
    responsable: row.responsable ?? "",
  };
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  await ensureSeeded();
  const rows = await db.project.findMany({
    orderBy: { reference: "asc" },
  });
  return NextResponse.json({ projects: rows.map(serializeProject) });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);

    const nom = typeof body?.nom === "string" ? body.nom.trim() : "";
    const client = typeof body?.client === "string" ? body.client.trim() : "";
    const departement =
      typeof body?.departement === "string" ? body.departement.trim() : "";

    if (!nom || !client || !departement) {
      return NextResponse.json(
        { error: "Nom, client et département sont obligatoires." },
        { status: 400 }
      );
    }

    const statut = STATUTS.includes(body?.statut)
      ? body.statut
      : "en_attente";
    const budget = Number.isFinite(Number(body?.budget))
      ? Math.max(0, Math.round(Number(body?.budget)))
      : 0;
    const progression = Number.isFinite(Number(body?.progression))
      ? Math.min(100, Math.max(0, Math.round(Number(body?.progression))))
      : 0;
    const dateDebut = body?.dateDebut ? new Date(body.dateDebut) : null;
    const dateEcheance = body?.dateEcheance ? new Date(body.dateEcheance) : null;
    const responsable =
      typeof body?.responsable === "string" ? body.responsable.trim() : "";

    // Génère la prochaine référence P-XXX
    const last = await db.project.findFirst({
      orderBy: { reference: "desc" },
      select: { reference: true },
    });
    const lastNum = last ? parseInt(last.reference.replace("P-", ""), 10) : 0;
    const reference = `P-${String((Number.isNaN(lastNum) ? 0 : lastNum) + 1).padStart(3, "0")}`;

    const created = await db.project.create({
      data: {
        reference,
        nom,
        client,
        departement,
        statut,
        budget,
        progression,
        dateDebut,
        dateEcheance,
        responsable,
      },
    });

    return NextResponse.json(
      { project: serializeProject(created) },
      { status: 201 }
    );
  } catch (error) {
    console.error("[projects:POST]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création du projet." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);

    // id = référence du projet (P-XXX), telle qu'affichée dans le tableau
    const reference =
      typeof body?.id === "string" ? body.id.trim() : "";
    const nom = typeof body?.nom === "string" ? body.nom.trim() : "";
    const client = typeof body?.client === "string" ? body.client.trim() : "";
    const departement =
      typeof body?.departement === "string" ? body.departement.trim() : "";

    if (!reference || !nom || !client || !departement) {
      return NextResponse.json(
        { error: "Référence, nom, client et département sont obligatoires." },
        { status: 400 }
      );
    }

    const statut = STATUTS.includes(body?.statut)
      ? body.statut
      : "en_attente";
    const budget = Number.isFinite(Number(body?.budget))
      ? Math.max(0, Math.round(Number(body?.budget)))
      : 0;
    const progression = Number.isFinite(Number(body?.progression))
      ? Math.min(100, Math.max(0, Math.round(Number(body?.progression))))
      : 0;
    const dateDebut = body?.dateDebut ? new Date(body.dateDebut) : null;
    const dateEcheance = body?.dateEcheance ? new Date(body.dateEcheance) : null;
    const responsable =
      typeof body?.responsable === "string" ? body.responsable.trim() : "";

    const updated = await db.project.update({
      where: { reference },
      data: {
        nom,
        client,
        departement,
        statut,
        budget,
        progression,
        dateDebut,
        dateEcheance,
        responsable,
      },
    });

    return NextResponse.json({ project: serializeProject(updated) });
  } catch (error: { code?: string } & unknown) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
    }
    console.error("[projects:PUT]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la modification du projet." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  // id = référence du projet (P-XXX), telle qu'affichée dans le tableau
  const reference = request.nextUrl.searchParams.get("id");
  if (!reference) {
    return NextResponse.json(
      { error: "Référence du projet requise." },
      { status: 400 }
    );
  }

  const deleted = await db.project.deleteMany({ where: { reference } });
  if (deleted.count === 0) {
    return NextResponse.json({ error: "Projet introuvable." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
