import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, ensureSeeded } from "@/lib/auth";
import type { ClientTier } from "@/components/dashboard/dashboard-data";

const TIERS: ClientTier[] = ["premium", "standard", "nouveau"];

function serializeClient(row: {
  id: string;
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  tier: string;
  projetsActifs: number;
  revenuTotal: number;
  derniereActivite: Date;
}) {
  return {
    id: row.id,
    nom: row.nom,
    entreprise: row.entreprise,
    email: row.email,
    telephone: row.telephone,
    tier: (TIERS.includes(row.tier as ClientTier) ? row.tier : "nouveau") as ClientTier,
    projetsActifs: row.projetsActifs,
    revenuTotal: row.revenuTotal,
    derniereActivite: row.derniereActivite.toISOString(),
  };
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  await ensureSeeded();
  const rows = await db.client.findMany({ orderBy: { createdAt: "asc" } });
  return NextResponse.json({ clients: rows.map(serializeClient) });
}

export async function POST(request: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const body = await request.json().catch(() => null);

    const nom = typeof body?.nom === "string" ? body.nom.trim() : "";
    const entreprise =
      typeof body?.entreprise === "string" ? body.entreprise.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!nom || !entreprise || !email) {
      return NextResponse.json(
        { error: "Nom, entreprise et email sont obligatoires." },
        { status: 400 }
      );
    }

    const telephone =
      typeof body?.telephone === "string" ? body.telephone.trim() : "";
    const tier = TIERS.includes(body?.tier) ? body.tier : "nouveau";

    const created = await db.client.create({
      data: { nom, entreprise, email, telephone, tier },
    });

    return NextResponse.json(
      { client: serializeClient(created) },
      { status: 201 }
    );
  } catch (error) {
    console.error("[clients:POST]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la création du client." },
      { status: 500 }
    );
  }
}
