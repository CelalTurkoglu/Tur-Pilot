import type { Metadata } from "next";
import { LEGAL_PAGES } from "@/data/content";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "TurPilot (turpilot.site) ziyaretçi ve seyahat acentesi iletişim verilerinin gizlilik esasları.",
  alternates: { canonical: "/gizlilik" },
};

export default function PrivacyPage() {
  const data = LEGAL_PAGES.gizlilik;
  return (
    <LegalPageLayout
      title={data.title}
      updatedAt={data.updatedAt}
      intro={data.intro}
      sections={data.sections}
    />
  );
}
