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
  title: "EMERAUDE COM — Votre partenaire en communication 360°",
  description:
    "EMERAUDE COM accompagne les entreprises dans la conception et la mise en œuvre de stratégies de communication innovantes et performantes. Branding, digital, événementiel et plus.",
  keywords: [
    "EMERAUDE COM",
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
  authors: [{ name: "EMERAUDE COM" }],
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/images/logo-mark-64.png", type: "image/png", sizes: "64x64" },
    ],
  },
  openGraph: {
    title: "EMERAUDE COM — Votre partenaire en communication 360°",
    description:
      "Valorisez votre image, développez votre marque ! EMERAUDE COM réinvente la relation entre les marques et leurs clients.",
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
      <head>
        {/* Applique le thème sauvegardé avant le premier rendu (anti-flash) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(t===null&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
