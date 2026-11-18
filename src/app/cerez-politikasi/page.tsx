import type { Metadata } from "next";
import { LEGAL_PAGES } from "@/data/content";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "turpilot.site web sitesinde kullanılan çerezler hakkında bilgilendirme.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default function CookiesPage() {
  const data = LEGAL_PAGES.cerezPolitikasi;
  return (
    <LegalPageLayout
      title={data.title}
      updatedAt={data.updatedAt}
      intro={data.intro}
      sections={data.sections}
    />
  );
}
