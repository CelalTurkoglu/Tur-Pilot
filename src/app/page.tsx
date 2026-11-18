import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/siteConfig";
import { HOME_CONTENT, HOME_FAQS } from "@/data/content";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FaqAccordion } from "@/components/FaqAccordion";
import { DemoTriggerButton } from "@/components/DemoTriggerButton";
import {
  ArrowRightIcon,
  BuildingIcon,
  BusIcon,
  CloudIcon,
  FileTextIcon,
  LayersIcon,
  MapPinIcon,
  ShieldCheckIcon,
  UploadIcon,
} from "@/components/Icons";
import {
  BentoFinancePreview,
  BentoSeatMapPreview,
  BentoWhatsappContractPreview,
  HeroDashboardPreview,
} from "@/components/PreviewMockups";

export const metadata: Metadata = {
  title:
    "TurPilot — Otobüslü Tur Acenteleri İçin Rezervasyon ve Operasyon Programı",
  description:
    "Otobüslü tur acenteleri için %100 bulut rezervasyon, 2+1/2+2 koltuk planı, kapora, durak manifestosu ve saha ön muhasebe yazılımı.",
  alternates: { canonical: "/" },
};

const MINI_ICONS = [MapPinIcon, LayersIcon, FileTextIcon, BuildingIcon];
const TRUST_ICONS = [
  CloudIcon,
  UploadIcon,
  ShieldCheckIcon,
  BusIcon,
  LayersIcon,
  BuildingIcon,
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#15304C]">
      {/* Bölüm 1: Mavi Hero Alanı */}
      <SiteHeader variant="blue" activePath="/" />

      <main className="flex-1">
        <section className="bg-[#2457D6] text-white pt-8 sm:pt-12 pb-12 sm:pb-16">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-8 text-center">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-[13px] font-semibold text-white">
              {HOME_CONTENT.hero.badge}
            </span>

            <h1 className="mt-5 text-[34px] sm:text-[48px] lg:text-[56px] font-bold leading-[1.08] font-display max-w-[780px] mx-auto">
              {HOME_CONTENT.hero.title}
            </h1>

            <p className="mt-5 text-[16px] sm:text-[18px] leading-relaxed text-[#E6EEFF] max-w-[660px] mx-auto">
              {HOME_CONTENT.hero.subtitle}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sistemini-olustur"
                className="w-full sm:w-auto min-h-[48px] px-7 rounded-[10px] bg-[#F2A900] hover:bg-[#dca000] text-[#15304C] text-[16px] font-bold inline-flex items-center justify-center transition-colors"
              >
                {HOME_CONTENT.hero.primaryCta}
              </Link>
              <DemoTriggerButton
                label={HOME_CONTENT.hero.secondaryCta}
                sourceLabel="Ana Sayfa Hero - Görüşme Planla"
                className="w-full sm:w-auto min-h-[48px] px-7 rounded-[10px] border border-white/45 bg-transparent hover:bg-white/10 text-white text-[16px] font-semibold inline-flex items-center justify-center transition-colors cursor-pointer"
              />
            </div>

            <div className="mt-10 sm:mt-12 max-w-[960px] mx-auto text-left">
              <HeroDashboardPreview />
            </div>
          </div>
        </section>

        {/* Bölüm 2: Değer Konumlandırma Başlığı */}
        <section className="bg-white pt-16 sm:pt-20 pb-10 sm:pb-12">
          <div className="max-w-[880px] mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-[24px] sm:text-[32px] font-bold leading-[1.25] text-[#15304C] font-display">
              {HOME_CONTENT.positioningHeading}
            </h2>
          </div>
        </section>

        {/* Bölüm 3: 3 Büyük Bento Özelliği */}
        <section
          aria-label="Temel Yetenekler"
          className="bg-white pb-12 sm:pb-16"
        >
          <div className="max-w-[1160px] mx-auto px-4 sm:px-8 space-y-5">
            {/* Üst Geniş Kart */}
            <article className="bg-[#F2F4F7] border border-[#DDE2E9] rounded-[18px] p-6 sm:p-9 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-3">
                <h3 className="text-[22px] sm:text-[26px] font-bold text-[#15304C] font-condensed leading-snug">
                  {HOME_CONTENT.bentoCards.wide.title}
                </h3>
                <p className="text-[15px] sm:text-[16px] leading-relaxed text-[#34465A]">
                  {HOME_CONTENT.bentoCards.wide.body}
                </p>
              </div>
              <div className="lg:col-span-6">
                <BentoSeatMapPreview />
              </div>
            </article>

            {/* Alt İki Kart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <article className="bg-[#F2F4F7] border border-[#DDE2E9] rounded-[18px] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-2.5">
                  <h3 className="text-[21px] sm:text-[24px] font-bold text-[#15304C] font-condensed leading-snug">
                    {HOME_CONTENT.bentoCards.left.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#34465A]">
                    {HOME_CONTENT.bentoCards.left.body}
                  </p>
                </div>
                <BentoFinancePreview />
              </article>

              <article className="bg-[#F2F4F7] border border-[#DDE2E9] rounded-[18px] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-2.5">
                  <h3 className="text-[21px] sm:text-[24px] font-bold text-[#15304C] font-condensed leading-snug">
                    {HOME_CONTENT.bentoCards.right.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-[#34465A]">
                    {HOME_CONTENT.bentoCards.right.body}
                  </p>
                </div>
                <BentoWhatsappContractPreview />
              </article>
            </div>
          </div>
        </section>

        {/* Bölüm 4: 4'lü Yatay Mini Özellik Şeridi */}
        <section
          aria-labelledby="mini-strip-heading"
          className="bg-white pb-16 sm:pb-20"
        >
          <div className="max-w-[1160px] mx-auto px-4 sm:px-8">
            <h2
              id="mini-strip-heading"
              className="text-[16px] font-bold text-[#5A6472] mb-4"
            >
              {HOME_CONTENT.miniStripHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {HOME_CONTENT.miniFeatures.map((feat, idx) => {
                const Icon = MINI_ICONS[idx] || BusIcon;
                return (
                  <Link
                    key={feat.title}
                    href={feat.href}
                    className="group bg-[#F2F4F7] hover:bg-[#EEF3FF] border border-[#DDE2E9] hover:border-[#2457D6] rounded-[14px] p-5 flex flex-col justify-between gap-4 transition-colors"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-[9px] bg-white border border-[#DDE2E9] text-[#2457D6] flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <h3 className="mt-3.5 text-[16px] font-bold text-[#15304C]">
                        {feat.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-snug text-[#5A6472]">
                        {feat.body}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-[13px] font-semibold text-[#2457D6]">
                      <span>Modülü incele</span>
                      <ArrowRightIcon
                        size={15}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Bölüm 5: Opsiyonel Gerçek Yorumlar + İkonlu Güven Şeridi + 3 Adımda Geçiş */}
        {siteConfig.showTestimonials && siteConfig.testimonials.length > 0 && (
          <section className="bg-[#F8FAFC] border-y border-[#DDE2E9] py-14 sm:py-16">
            <div className="max-w-[1160px] mx-auto px-4 sm:px-8">
              <h2 className="text-[28px] font-bold text-[#15304C] font-display">
                Kullanıcılar ne diyor?
              </h2>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
                {siteConfig.testimonials.map((t) => (
                  <blockquote
                    key={`${t.author}-${t.agency}`}
                    className="bg-white border border-[#DDE2E9] rounded-[16px] p-6 flex flex-col justify-between gap-4"
                  >
                    <p className="text-[15px] leading-relaxed text-[#34465A]">
                      “{t.quote}”
                    </p>
                    <footer className="text-[13px] text-[#5A6472]">
                      <strong className="text-[#15304C]">{t.author}</strong> ·{" "}
                      {t.role}, {t.agency}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* İkonlu Yatay Güven Şeridi */}
        <section
          aria-label="Güven İlkeleri"
          className="border-y border-[#DDE2E9] bg-[#F8FAFC] py-5"
        >
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOME_CONTENT.trustStrip.map((label, idx) => {
              const Icon = TRUST_ICONS[idx] || ShieldCheckIcon;
              return (
                <div
                  key={label}
                  className="flex items-center gap-2.5 text-[13px] font-semibold text-[#34465A]"
                >
                  <span className="w-8 h-8 rounded-[8px] bg-white border border-[#DDE2E9] text-[#2457D6] flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </span>
                  <span className="leading-snug">{label}</span>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3 Adımda Geçiş */}
        <section className="bg-white py-16 sm:py-20">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-8">
            <div className="max-w-[640px]">
              <p className="text-[13px] font-bold uppercase tracking-wider text-[#2457D6]">
                Zahmetsiz Başlangıç
              </p>
              <h2 className="mt-1.5 text-[28px] sm:text-[32px] font-bold text-[#15304C] font-display">
                {HOME_CONTENT.migration.heading}
              </h2>
              <p className="mt-2.5 text-[15px] sm:text-[16px] text-[#5A6472] leading-relaxed">
                {HOME_CONTENT.migration.subtitle}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {HOME_CONTENT.migration.steps.map((s) => (
                <div
                  key={s.step}
                  className="bg-[#F2F4F7] border border-[#DDE2E9] rounded-[16px] p-6"
                >
                  <h3 className="text-[18px] font-bold text-[#15304C] font-condensed">
                    {s.step}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#34465A]">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bölüm 6: Sistem Oluşturucu Çağrı Alanı (Conversion CTA) */}
        <section className="bg-white border-t border-[#DDE2E9] py-16 sm:py-20">
          <div className="max-w-[780px] mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#15304C] font-display leading-tight">
              {HOME_CONTENT.conversionCta.title}
            </h2>
            <p className="mt-3.5 text-[16px] leading-relaxed text-[#5A6472]">
              {HOME_CONTENT.conversionCta.subtitle}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/sistemini-olustur"
                className="w-full sm:w-auto min-h-[48px] px-7 rounded-[10px] bg-[#F2A900] hover:bg-[#dca000] text-[#15304C] text-[16px] font-bold inline-flex items-center justify-center transition-colors"
              >
                {HOME_CONTENT.conversionCta.primary}
              </Link>
              <DemoTriggerButton
                label={HOME_CONTENT.conversionCta.secondary}
                sourceLabel="Ana Sayfa CTA Bandı - Görüşme Planla"
                className="w-full sm:w-auto min-h-[48px] px-7 rounded-[10px] border border-[#DDE2E9] bg-white hover:bg-[#F2F4F7] text-[#15304C] text-[16px] font-semibold inline-flex items-center justify-center transition-colors cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* Bölüm 7: Köken & Güven Bloğu */}
        <section className="bg-[#F2F4F7] border-y border-[#DDE2E9] py-16 sm:py-20">
          <div className="max-w-[760px] mx-auto px-4 sm:px-8 text-center">
            <h2 className="text-[26px] sm:text-[32px] font-bold text-[#15304C] font-display">
              {HOME_CONTENT.origin.title}
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#34465A]">
              {HOME_CONTENT.origin.body}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DDE2E9] text-[13px] font-semibold text-[#15304C]">
              <BuildingIcon size={16} className="text-[#2457D6]" />
              <span>Karabük Teknokent Bünyesinde Geliştirildi</span>
            </div>
          </div>
        </section>

        {/* Bölüm 8: Sık Sorulan Sorular */}
        <FaqAccordion items={HOME_FAQS} id="sss" />
      </main>

      {/* Bölüm 9: Footer */}
      <SiteFooter />
    </div>
  );
}
