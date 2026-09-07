import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

const SETTINGS_ID = "default";

const LANGUAGES = ["Français", "Arabe", "Anglais"];
const CURRENCIES = ["XOF"];

interface SettingsPayload {
  agencyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  currency: string;
  language: string;
  emailNotifications: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  notifyContactMessages: boolean;
  notifyNewMember: boolean;
  notifyNewProject: boolean;
}

const FALLBACK: SettingsPayload = {
  agencyName: "SAPHIR COM SEN",
  email: "contact@zaphircomsen.com",
  phone: "+221 70 316 76 76",
  address: "Dakar, Sénégal",
  website: "www.zaphircomsen.com",
  currency: "XOF",
  language: "Français",
  emailNotifications: true,
  seoTitle:
    "SAPHIR COM SEN — Agence de communication 360° à Dakar",
  seoDescription:
    "Agence de communication 360° à Dakar : branding, marketing digital, production audiovisuelle, événementiel et création de sites web.",
  seoKeywords:
    "agence communication Dakar, communication 360 Sénégal, branding, marketing digital, production audiovisuelle, événementiel",
  notifyContactMessages: true,
  notifyNewMember: true,
  notifyNewProject: true,
};

function serialize(row: {
  agencyName: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  currency: string;
  language: string;
  emailNotifications: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  notifyContactMessages: boolean;
  notifyNewMember: boolean;
  notifyNewProject: boolean;
}): SettingsPayload {
  return {
    agencyName: row.agencyName,
    email: row.email,
    phone: row.phone,
    address: row.address,
    website: row.website,
    currency: CURRENCIES.includes(row.currency) ? row.currency : "XOF",
    language: LANGUAGES.includes(row.language) ? row.language : "Français",
    emailNotifications: row.emailNotifications,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
    seoKeywords: row.seoKeywords,
    notifyContactMessages: row.notifyContactMessages,
    notifyNewMember: row.notifyNewMember,
    notifyNewProject: row.notifyNewProject,
  };
}

function readString(body: Record<string, unknown>, key: string): string | null {
  const value = body[key];
  if (typeof value !== "string") return null;
  return value.trim();
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  try {
    const row = await db.setting.findUnique({ where: { id: SETTINGS_ID } });
    return NextResponse.json({ settings: row ? serialize(row) : FALLBACK });
  } catch (error) {
    console.error("[settings:GET]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors du chargement des paramètres." },
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
    const body = (await request.json().catch(() => null)) as Record<
      string,
      unknown
    > | null;
    if (!body) {
      return NextResponse.json({ error: "Corps JSON invalide." }, { status: 400 });
    }

    const agencyName = readString(body, "agencyName");
    const email = readString(body, "email");
    if (!agencyName || !email) {
      return NextResponse.json(
        { error: "Le nom de l'agence et l'email sont obligatoires." },
        { status: 400 }
      );
    }

    const data = {
      agencyName,
      email,
      phone: readString(body, "phone") ?? "",
      address: readString(body, "address") ?? "",
      website: readString(body, "website") ?? "",
      currency:
        typeof body.currency === "string" && CURRENCIES.includes(body.currency)
          ? body.currency
          : "XOF",
      language:
        typeof body.language === "string" && LANGUAGES.includes(body.language)
          ? body.language
          : "Français",
      emailNotifications: body.emailNotifications === true,
      seoTitle: readString(body, "seoTitle") ?? "",
      seoDescription: readString(body, "seoDescription") ?? "",
      seoKeywords: readString(body, "seoKeywords") ?? "",
      notifyContactMessages: body.notifyContactMessages === true,
      notifyNewMember: body.notifyNewMember === true,
      notifyNewProject: body.notifyNewProject === true,
    };

    const row = await db.setting.upsert({
      where: { id: SETTINGS_ID },
      update: data,
      create: { id: SETTINGS_ID, ...data },
    });

    return NextResponse.json({ settings: serialize(row) });
  } catch (error) {
    console.error("[settings:PUT]", error);
    return NextResponse.json(
      { error: "Erreur serveur lors de la sauvegarde des paramètres." },
      { status: 500 }
    );
  }
}
