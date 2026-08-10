import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAPHIR COM — Votre partenaire en communication 360°",
  description:
    "SAPHIR COM accompagne les entreprises dans la conception et la mise en œuvre de stratégies de communication innovantes et performantes. Branding, digital, événementiel et plus.",
  keywords: [
    "SAPHIR COM",
    "communication",
    "agence de communication",
    "marketing 360°",
    "branding",
    "identité visuelle",
    "communication digitale",
    "réseaux sociaux",
    "production audiovisuelle",
    "création de sites web",
    "référencement",
    "événementiel",
  ],
  authors: [{ name: "SAPHIR COM" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SAPHIR COM — Votre partenaire en communication 360°",
    description:
      "Valorisez votre image, développez votre marque ! SAPHIR COM réinvente la relation entre les marques et leurs clients.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
