import type { Metadata } from "next";
import { LEGAL_PAGES } from "@/data/content";
import { LegalPageLayout } from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında TurPilot aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  const data = LEGAL_PAGES.kvkk;
  return (
    <LegalPageLayout
      title={data.title}
      updatedAt={data.updatedAt}
      intro={data.intro}
      sections={data.sections}
    />
  );
}
