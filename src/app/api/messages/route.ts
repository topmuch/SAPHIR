import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { z } from "zod";

const messageSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  email: z.string().email("Adresse e-mail invalide"),
  subject: z.string().optional().nullable(),
  type: z.enum(["devis", "contact"]),
  service: z.string().optional().nullable(),
  content: z.string().min(10, "Message requis (10 caractères minimum)"),
});

// POST /api/messages — envoi public depuis le hero (devis) et la page contact
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = messageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Données invalides.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const message = await db.message.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        subject: data.subject?.trim() || null,
        type: data.type,
        service: data.service?.trim() || null,
        content: data.content.trim(),
      },
    });

    return NextResponse.json({ ok: true, message }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/messages]", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi. Réessayez." },
      { status: 500 }
    );
  }
}

// GET /api/messages — liste des messages pour le dashboard (auth requis)
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const messages = await db.message.findMany({
      orderBy: { createdAt: "desc" },
    });

    const [total, unread, devis, contact] = await Promise.all([
      db.message.count(),
      db.message.count({ where: { read: false } }),
      db.message.count({ where: { type: "devis" } }),
      db.message.count({ where: { type: "contact" } }),
    ]);

    return NextResponse.json({
      messages: messages.map((m) => ({
        id: m.id,
        name: m.name,
        email: m.email,
        subject: m.subject,
        type: m.type,
        service: m.service,
        content: m.content,
        read: m.read,
        createdAt: m.createdAt.toISOString(),
      })),
      stats: { total, unread, devis, contact },
    });
  } catch (error) {
    console.error("[GET /api/messages]", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les messages." },
      { status: 500 }
    );
  }
}
