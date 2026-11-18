import type { Metadata } from "next";
import { LEGAL_PAGES } from "@/data/content";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "turpilot.site tanıtım ve fiyat hesaplama platformu kullanım şartları.",
  alternates: { canonical: "/kullanim-sartlari" },
};

export default function TermsPage() {
  const data = LEGAL_PAGES.kullanimSartlari;
  return (
    <LegalPageLayout
      title={data.title}
      updatedAt={data.updatedAt}
      intro={data.intro}
      sections={data.sections}
    />
  );
}
