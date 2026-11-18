import React from "react";
import Link from "next/link";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function LegalPageLayout({
  title,
  updatedAt,
  intro,
  sections,
}: {
  title: string;
  updatedAt: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F7] text-[#15304C]">
      <SiteHeader variant="light" />

      <main className="flex-1 max-w-[840px] w-full mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <article className="bg-white border border-[#DDE2E9] rounded-[18px] p-6 sm:p-10">
          <div className="text-[13px] font-semibold text-[#5A6472]">
            Son güncelleme: {updatedAt}
          </div>
          <h1 className="mt-2 text-[28px] sm:text-[36px] font-bold text-[#15304C] font-display leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[#34465A]">
            {intro}
          </p>

          <div className="mt-8 space-y-6 border-t border-[#E8ECF2] pt-6">
            {sections.map((sec) => (
              <section key={sec.heading}>
                <h2 className="text-[18px] font-bold text-[#15304C]">
                  {sec.heading}
                </h2>
                <p className="mt-2 text-[15px] leading-relaxed text-[#34465A]">
                  {sec.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#E8ECF2] flex flex-wrap gap-4 text-[14px] font-semibold">
            <Link href="/" className="text-[#2457D6] hover:text-[#1A43A8]">
              ← Ana Sayfaya Dön
            </Link>
            <Link
              href="/sistemini-olustur"
              className="text-[#2457D6] hover:text-[#1A43A8]"
            >
              Sistemini Oluştur →
            </Link>
          </div>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
