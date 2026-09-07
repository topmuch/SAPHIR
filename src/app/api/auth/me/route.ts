import { NextResponse } from "next/server";
import { getSessionUser, ensureSeeded } from "@/lib/auth";

export async function GET() {
  // Au premier chargement de page, garantit l'existence de l'admin
  await ensureSeeded();
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }
  return NextResponse.json({ user });
}
