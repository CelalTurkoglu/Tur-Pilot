import type { Metadata } from "next";
import Link from "next/link";
import { FEATURES_CONTENT, FEATURES_FAQS } from "@/data/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FeaturesAccordion } from "@/components/FeaturesAccordion";
import { ArrowRightIcon } from "@/components/Icons";
import {
  ModulePreviewFrame,
  PublicSiteShowcasePreview,
} from "@/components/PreviewMockups";

export const metadata: Metadata = {
  title: "Özellikler ve Modüller — Otobüs Tur Operasyon Yazılımı",
  description:
    "2+1/2+2 koltuk planı, WhatsApp ve QR TC doğrulamalı sözleşme, durak manifestosu, B2B otel ve alt bayi cari modüllerini inceleyin.",
  alternates: { canonical: "/ozellikler" },
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15304C]">
      <SiteHeader variant="light" activePath="/ozellikler" />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-white pt-12 sm:pt-16 pb-10 sm:pb-12 border-b border-[#E8ECF2]">
          <div className="max-w-[820px] mx-auto px-4 sm:px-8">
            <p className="text-[13px] font-bold uppercase tracking-wider text-[#2457D6]">
              Özellikler ve Modüller
            </p>
            <h1 className="mt-2 text-[32px] sm:text-[44px] font-bold leading-[1.1] text-[#15304C] font-display">
              {FEATURES_CONTENT.hero.title}
            </h1>
            <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-[#5A6472]">
              {FEATURES_CONTENT.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Zig-Zag Ana Vitrin Blokları (01..04) */}
        <section aria-label="Ana Modül Vitrini" className="py-12 sm:py-16">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-8 space-y-14 sm:space-y-20">
            {FEATURES_CONTENT.zigZag.map((block, idx) => {
              const imageFirst = idx % 2 === 1;
              return (
                <article
                  key={block.index}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  <div
                    className={`lg:col-span-5 space-y-3 ${
                      imageFirst ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="text-[13px] font-bold text-[#2457D6]">
                      {block.tag}
                    </div>
                    <h2 className="text-[24px] sm:text-[28px] font-bold text-[#15304C] font-condensed leading-snug">
                      {block.title}
                    </h2>
                    <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#34465A]">
                      {block.body}
                    </p>
                    <div className="pt-2">
                      <Link
                        href={block.href}
                        className="inline-flex items-center gap-2 min-h-[44px] text-[15px] font-bold text-[#2457D6] hover:text-[#1A43A8]"
                      >
                        <span>{block.linkText}</span>
                        <ArrowRightIcon size={16} />
                      </Link>
                    </div>
                  </div>

                  <div
                    className={`lg:col-span-7 ${
                      imageFirst ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <ModulePreviewFrame moduleId={block.previewKey} />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Mavi CTA Bandı */}
        <section className="bg-[#2457D6] text-white py-14 sm:py-16">
          <div className="max-w-[900px] mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-[26px] sm:text-[34px] font-bold font-display leading-tight">
              {FEATURES_CONTENT.ctaBand.title}
            </h2>
            <div className="mt-6">
              <Link
                href="/sistemini-olustur"
                className="inline-flex items-center justify-center min-h-[48px] px-7 rounded-[10px] bg-white hover:bg-[#F2F4F7] text-[#15304C] text-[15px] font-bold transition-colors"
              >
                {FEATURES_CONTENT.ctaBand.buttonText}
              </Link>
            </div>
          </div>
        </section>

        {/* Kategorize Özellik Kütüphanesi (Akordeon Liste) */}
        <FeaturesAccordion
          groups={FEATURES_CONTENT.libraryGroups}
          title={FEATURES_CONTENT.libraryTitle}
        />

        {/* Açık Gri Showcase Bloğu (Public Site / B2C Vitrin) */}
        <section
          id="public-site-vitrin"
          className="bg-[#F2F4F7] border-y border-[#DDE2E9] py-16 sm:py-20 scroll-mt-16"
        >
          <div className="max-w-[1040px] mx-auto px-4 sm:px-8">
            <div className="max-w-[700px] mx-auto text-center">
              <div className="text-[13px] font-bold text-[#2457D6]">
                {FEATURES_CONTENT.publicShowcase.badge}
              </div>
              <h2 className="mt-2 text-[26px] sm:text-[32px] font-bold text-[#15304C] font-display leading-tight">
                {FEATURES_CONTENT.publicShowcase.title}
              </h2>
              <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[#34465A]">
                {FEATURES_CONTENT.publicShowcase.body}
              </p>
            </div>

            <div className="mt-10">
              <PublicSiteShowcasePreview />
            </div>
          </div>
        </section>

        {/* Alt SSS Akordeonu */}
        <FaqAccordion
          items={FEATURES_FAQS}
          heading="Modüller Hakkında Sık Sorulanlar"
          id="ozellikler-sss"
        />
      </main>

      <SiteFooter />
    </div>
  );
}
