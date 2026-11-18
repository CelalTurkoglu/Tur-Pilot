import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import { DemoModalProvider } from "@/components/DemoModal";
import { JsonLd } from "@/components/JsonLd";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "TurPilot — Otobüslü Tur Acenteleri İçin Rezervasyon ve Operasyon Programı",
    template: "%s | TurPilot",
  },
  description:
    "Otobüslü tur acenteleri için %100 bulut rezervasyon, 2+1/2+2 koltuk planı, kapora takibi, WhatsApp biniş bilgisi ve saha ön muhasebe yazılımı.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.siteUrl,
    siteName: siteConfig.brandName,
    title: "TurPilot — Otobüsleriniz dolsun, akşam masa başı bitsin.",
    description:
      "Rezervasyon, koltuk, kapora ve tur içi gelir-gider tek kayıtta. Mevcut Excel ve defter kayıtlarınızı biz aktarıyoruz.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TurPilot — Otobüslü Tur Acenteleri İçin Operasyon Programı",
    description:
      "2+1/2+2 koltuk planı, kapora, saatli durak manifestosu ve saha muhasebesi tek panelde.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[#15304C]">
        <JsonLd />
        <DemoModalProvider>{children}</DemoModalProvider>
      </body>
    </html>
  );
}
