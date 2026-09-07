import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

// PATCH /api/messages/[id] — marquer un message lu / non lu
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const messageId = parseInt(id, 10);
    if (isNaN(messageId)) {
      return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const read = typeof body.read === "boolean" ? body.read : true;

    const message = await db.message.update({
      where: { id: messageId },
      data: { read },
    });

    return NextResponse.json({ ok: true, message: { ...message, createdAt: message.createdAt.toISOString() } });
  } catch (error) {
    console.error("[PATCH /api/messages/:id]", error);
    return NextResponse.json(
      { error: "Impossible de mettre à jour le message." },
      { status: 500 }
    );
  }
}

// DELETE /api/messages/[id] — supprimer un message
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const { id } = await params;
    const messageId = parseInt(id, 10);
    if (isNaN(messageId)) {
      return NextResponse.json({ error: "Identifiant invalide." }, { status: 400 });
    }

    await db.message.delete({ where: { id: messageId } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[DELETE /api/messages/:id]", error);
    return NextResponse.json(
      { error: "Impossible de supprimer le message." },
      { status: 500 }
    );
  }
}
