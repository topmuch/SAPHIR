import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, ensureSeeded } from "@/lib/auth";

function serializeMember(row: {
  id: string;
  nom: string;
  role: string;
  departement: string;
  email: string;
  projets: number;
}) {
  return {
    id: row.id,
    nom: row.nom,
    role: row.role,
    departement: row.departement,
    email: row.email,
    projets: row.projets,
  };
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  await ensureSeeded();
  const rows = await db.teamMember.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ team: rows.map(serializeMember) });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);

    const nom = typeof body?.nom === "string" ? body.nom.trim() : "";
    const role = typeof body?.role === "string" ? body.role.trim() : "";
    const departement =
      typeof body?.departement === "string" ? body.departement.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!nom || !role || !departement || !email) {
      return NextResponse.json(
        { error: "Nom, rôle, département et email sont obligatoires." },
        { status: 400 }
      );
    }

    const created = await db.teamMember.create({
      data: { nom, role, departement, email },
    });

    return NextResponse.json(
      { member: serializeMember(created) },
      { status: 201 }
    );
  } catch (error) {
    console.error("[team:POST]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de l'ajout du membre." },
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

    const id = typeof body?.id === "string" ? body.id.trim() : "";
    const nom = typeof body?.nom === "string" ? body.nom.trim() : "";
    const role = typeof body?.role === "string" ? body.role.trim() : "";
    const departement =
      typeof body?.departement === "string" ? body.departement.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!id || !nom || !role || !departement || !email) {
      return NextResponse.json(
        { error: "Identifiant, nom, rôle, département et email sont obligatoires." },
        { status: 400 }
      );
    }

    const updated = await db.teamMember.update({
      where: { id },
      data: { nom, role, departement, email },
    });

    return NextResponse.json({ member: serializeMember(updated) });
  } catch (error: { code?: string } & unknown) {
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Membre introuvable." }, { status: 404 });
    }
    console.error("[team:PUT]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la modification du membre." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json(
      { error: "Identifiant du membre requis." },
      { status: 400 }
    );
  }

  const deleted = await db.teamMember.deleteMany({ where: { id } });
  if (deleted.count === 0) {
    return NextResponse.json({ error: "Membre introuvable." }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}
