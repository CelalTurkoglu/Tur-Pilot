"use client";

import React, { useEffect, useState } from "react";
import { siteConfig, type PreviewSlide } from "@/config/siteConfig";
import type { ModuleId } from "@/data/modules";
import { BusSeatMap } from "./BusSeatMap";
import { CloseIcon } from "./Icons";

function MultiScreenPreview({
  slides,
  aspectClass = "aspect-[16/10]",
  extraCodedTab,
}: {
  slides: readonly PreviewSlide[];
  aspectClass?: string;
  extraCodedTab?: { label: string; node: React.ReactNode };
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const totalTabs = slides.length + (extraCodedTab ? 1 : 0);
  const safeIdx = activeIdx < totalTabs ? activeIdx : 0;
  const isCodedActive = !!extraCodedTab && safeIdx === slides.length;
  const activeSlide = !isCodedActive ? slides[safeIdx] : null;

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoomOpen]);

  return (
    <>
      <div className="w-full rounded-[12px] border border-[#DDE2E9] bg-white overflow-hidden">
        {totalTabs > 1 && (
          <div className="px-3 py-2 bg-[#F8FAFC] border-b border-[#DDE2E9] flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              {slides.map((sl, i) => (
                <button
                  key={sl.src + sl.label}
                  type="button"
                  onClick={() => setActiveIdx(i)}
                  className={`min-h-[32px] px-2.5 rounded-[7px] text-[12px] font-semibold cursor-pointer transition-colors ${
                    safeIdx === i
                      ? "bg-[#2457D6] text-white"
                      : "bg-white border border-[#DDE2E9] text-[#34465A] hover:bg-[#EEF3FF]"
                  }`}
                >
                  {sl.label}
                </button>
              ))}
              {extraCodedTab && (
                <button
                  type="button"
                  onClick={() => setActiveIdx(slides.length)}
                  className={`min-h-[32px] px-2.5 rounded-[7px] text-[12px] font-semibold cursor-pointer transition-colors ${
                    isCodedActive
                      ? "bg-[#2457D6] text-white"
                      : "bg-white border border-[#DDE2E9] text-[#34465A] hover:bg-[#EEF3FF]"
                  }`}
                >
                  {extraCodedTab.label}
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#5A6472] tabular-nums">
              <button
                type="button"
                aria-label="Önceki ekran"
                onClick={() =>
                  setActiveIdx((prev) => (prev - 1 + totalTabs) % totalTabs)
                }
                className="w-7 h-7 rounded-[6px] border border-[#DDE2E9] bg-white text-[#15304C] hover:bg-[#F2F4F7] cursor-pointer flex items-center justify-center"
              >
                ‹
              </button>
              <span className="px-1">
                {safeIdx + 1} / {totalTabs}
              </span>
              <button
                type="button"
                aria-label="Sonraki ekran"
                onClick={() => setActiveIdx((prev) => (prev + 1) % totalTabs)}
                className="w-7 h-7 rounded-[6px] border border-[#DDE2E9] bg-white text-[#15304C] hover:bg-[#F2F4F7] cursor-pointer flex items-center justify-center"
              >
                ›
              </button>
            </div>
          </div>
        )}

        <div className={`relative w-full ${aspectClass} bg-[#F8FAFC]`}>
          {activeSlide ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSlide.src}
                alt={activeSlide.alt}
                className="w-full h-full object-contain bg-white"
              />
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="absolute bottom-2.5 right-2.5 min-h-[32px] px-2.5 rounded-[7px] bg-[#15304C]/85 hover:bg-[#15304C] text-white text-[11px] font-semibold cursor-pointer"
              >
                Büyüt
              </button>
            </>
          ) : (
            extraCodedTab?.node
          )}
        </div>
      </div>

      {zoomOpen && activeSlide && (
        <div
          className="fixed inset-0 z-50 bg-[#15304C]/80 flex items-center justify-center p-4"
          onClick={() => setZoomOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeSlide.label}
            className="max-w-[1100px] w-full bg-white rounded-[16px] overflow-hidden border border-[#DDE2E9]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-[#DDE2E9] flex items-center justify-between gap-3">
              <div className="text-[14px] font-bold text-[#15304C]">
                {activeSlide.label}
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="Kapat"
                className="min-h-[38px] px-3 rounded-[8px] border border-[#DDE2E9] text-[13px] font-semibold text-[#15304C] inline-flex items-center gap-1.5 cursor-pointer hover:bg-[#F2F4F7]"
              >
                <span>Kapat</span>
                <CloseIcon size={15} />
              </button>
            </div>
            <div className="p-3 bg-[#F8FAFC] max-h-[82vh] overflow-auto flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeSlide.src}
                alt={activeSlide.alt}
                className="max-w-full max-h-[75vh] object-contain rounded-[8px]"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function HeroDashboardPreview() {
  const heroSlides = siteConfig.previewAssets.heroDashboard;

  return (
    <div className="w-full rounded-[16px] overflow-hidden border border-white/25 bg-white text-[#15304C] shadow-sm">
      <div className="h-10 bg-[#F2F4F7] border-b border-[#DDE2E9] px-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E06C65]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F2A900]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#24A161]" />
        </div>
        <div className="flex-1 max-w-[360px] mx-auto h-6 rounded-full bg-white border border-[#DDE2E9] px-3 flex items-center justify-center text-[11px] sm:text-[12px] font-medium text-[#5A6472] truncate">
          {siteConfig.appDomain}
        </div>
      </div>

      {heroSlides.length > 0 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroSlides[0].src}
          alt={heroSlides[0].alt}
          className="w-full h-auto block bg-white"
        />
      )}
    </div>
  );
}

export function BentoSeatMapPreview() {
  return <BusSeatMap />;
}

export function BentoFinancePreview() {
  return (
    <div className="bg-white border border-[#DDE2E9] rounded-[12px] p-3.5 text-[12px] space-y-2.5">
      <div className="flex items-center justify-between border-b border-[#E8ECF2] pb-2">
        <div>
          <div className="font-bold text-[#15304C]">Ayşe Yılmaz · Koltuk 04</div>
          <div className="text-[11px] text-[#5A6472]">
            Tahsil eden: Mehmet K. (Ofis)
          </div>
        </div>
        <div className="text-right tabular-nums">
          <div className="font-bold text-[#1E7A46]">2.500 ₺ Kapora</div>
          <div className="text-[11px] text-[#8A3412]">Kalan: 4.000 ₺</div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-[#F8FAFC] rounded-[8px] px-2.5 py-2 border border-[#E8ECF2]">
        <div>
          <div className="font-semibold text-[#15304C]">
            Saha Gideri: Akaryakıt Fişi
          </div>
          <div className="text-[11px] text-[#5A6472]">
            Rehber yükledi · Fiş fotoğrafı eklendi
          </div>
        </div>
        <span className="font-bold text-[#15304C] tabular-nums">4.200 ₺</span>
      </div>
    </div>
  );
}

export function BentoWhatsappContractPreview() {
  return (
    <div className="bg-white border border-[#DDE2E9] rounded-[12px] p-3.5 text-[12px] space-y-2.5">
      <div className="rounded-[9px] bg-[#E6F3EB] p-2.5 text-[#144F2E]">
        <div className="font-bold">WhatsApp Biniş Bilgisi</div>
        <div className="text-[11px] mt-0.5 leading-snug">
          Sayın Kaya, 06:30 Kadıköy Evlendirme Dairesi önü biniş noktanız ve
          konum linkiniz hazırdır.
        </div>
      </div>
      <div className="flex items-center justify-between text-[11px] text-[#34465A] pt-0.5">
        <span className="font-semibold text-[#2457D6]">
          TC Doğrulamalı Dijital Onay
        </span>
        <span className="text-[#5A6472] tabular-nums">19.05 · IP Damgalı</span>
      </div>
    </div>
  );
}

export function PublicSiteShowcasePreview() {
  const slides = siteConfig.previewAssets.publicShowcase;
  return (
    <div className="w-full rounded-[16px] overflow-hidden border border-[#DDE2E9] bg-white text-[#15304C]">
      <div className="h-9 bg-[#F2F4F7] border-b border-[#DDE2E9] px-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD3DD]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD3DD]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#CBD3DD]" />
        </div>
        <div className="flex-1 max-w-[300px] mx-auto h-5 rounded-full bg-white border border-[#DDE2E9] px-3 flex items-center justify-center text-[11px] font-medium text-[#5A6472]">
          www.acenteadiniz.com
        </div>
      </div>
      <div className="p-3 bg-[#F8FAFC]">
        <MultiScreenPreview slides={slides} aspectClass="aspect-[16/9]" />
      </div>
    </div>
  );
}

function CodedPdfSummary({ pad }: { pad: string }) {
  return (
    <div className={`w-full h-full flex flex-col justify-between ${pad}`}>
      <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
        <div className="text-[13px] font-bold">
          7 Farklı PDF & Bakanlık Excel Çıktıları
        </div>
        <span className="px-2 py-0.5 rounded bg-[#EEF3FF] text-[#2457D6] text-[10px] font-semibold">
          Rol Filtreli
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 my-auto py-1 text-[11px]">
        {[
          "Görsel Otobüs Oturma Planı PDF",
          "Saatli Durak Manifestosu PDF",
          "Bakanlık Resmi Excel Yolcu Listesi",
          "Sefer Gelir-Gider Mutabakat PDF",
          "Tahsilat & Kırmızı İade Makbuzu PDF",
          "Detaylı Muhasebe & Doğum Günü Listesi",
        ].map((doc) => (
          <div
            key={doc}
            className="bg-white border border-[#DDE2E9] rounded-[8px] px-2.5 py-2 flex items-center justify-between gap-2"
          >
            <span className="font-medium truncate">{doc}</span>
            <span className="text-[#2457D6] font-bold shrink-0">İndir</span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-[#5A6472] flex justify-between">
        <span>Ödeme bilgili / bilgisiz Excel seçeneği</span>
        <span>Tek Tık Hazır Çıktı</span>
      </div>
    </div>
  );
}

export function ModulePreviewFrame({
  moduleId,
  compact = false,
}: {
  moduleId: ModuleId;
  compact?: boolean;
}) {
  const pad = compact ? "p-3" : "p-4 sm:p-5";
  const slides = siteConfig.previewAssets[moduleId];

  if (slides.length > 0) {
    return (
      <MultiScreenPreview
        slides={slides}
        extraCodedTab={
          moduleId === "pdf"
            ? {
                label: "Tüm Çıktı Türleri (7 PDF/Excel)",
                node: <CodedPdfSummary pad={pad} />,
              }
            : undefined
        }
      />
    );
  }

  return (
    <div className="w-full aspect-[16/10] rounded-[12px] bg-[#F8FAFC] border border-[#DDE2E9] overflow-hidden text-[#15304C]">
      <div className={`w-full h-full flex flex-col justify-between ${pad}`}>
        {moduleId === "hotel" && (
          <>
            <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
              <div className="text-[13px] font-bold">
                B2B Otel Kontrat & Kontenjan Matrisi
              </div>
              <span className="px-2 py-0.5 rounded bg-[#EEF3FF] text-[#2457D6] text-[10px] font-semibold">
                7 Kal 6 Öde + EB
              </span>
            </div>
            <div className="bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 my-auto text-[11px] space-y-1.5">
              <div className="grid grid-cols-5 font-bold text-[#5A6472] border-b border-[#E8ECF2] pb-1">
                <span className="col-span-2">Otel / Sezon</span>
                <span>DBL Net</span>
                <span>Satış</span>
                <span>Durum</span>
              </div>
              {[
                {
                  h: "Ürgüp Kaya Otel · Mayıs",
                  n: "2.100 ₺",
                  s: "2.650 ₺",
                  st: "14 Oda",
                  c: "text-[#1E7A46]",
                },
                {
                  h: "Abant Göl Konak · H.Sonu",
                  n: "2.850 ₺",
                  s: "3.450 ₺",
                  st: "Sor-Sat",
                  c: "text-[#8A3412]",
                },
                {
                  h: "Mardin Taş Konak · Haziran",
                  n: "1.950 ₺",
                  s: "2.490 ₺",
                  st: "Stop-Sale",
                  c: "text-[#8A3412]",
                },
              ].map((r) => (
                <div
                  key={r.h}
                  className="grid grid-cols-5 items-center py-0.5"
                >
                  <span className="col-span-2 font-medium truncate">{r.h}</span>
                  <span className="tabular-nums">{r.n}</span>
                  <span className="font-semibold tabular-nums">{r.s}</span>
                  <span className={`font-semibold ${r.c}`}>{r.st}</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#5A6472] flex justify-between">
              <span>SGL / DBL / TRPL / QUAD Çarpanı</span>
              <span>Konfirme Voucher PDF</span>
            </div>
          </>
        )}

        {moduleId === "dealer" && (
          <>
            <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
              <div className="text-[13px] font-bold">
                Alt Bayi Portalı & Çift Yönlü Cari
              </div>
              <span className="px-2 py-0.5 rounded bg-[#EEF3FF] text-[#2457D6] text-[10px] font-semibold">
                role: dealer
              </span>
            </div>
            <div className="bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 my-auto text-[11px] space-y-1.5">
              <div className="grid grid-cols-4 font-bold text-[#5A6472] border-b border-[#E8ECF2] pb-1">
                <span>Alt Bayi</span>
                <span>Kota</span>
                <span>Komisyon</span>
                <span className="text-right">Cari Bakiye</span>
              </div>
              {[
                {
                  b: "Kocaeli Rota Tur",
                  k: "10 / 12",
                  c: "%12",
                  bal: "+18.400 ₺",
                },
                {
                  b: "Bursa Gezi Ofisi",
                  k: "6 / 8",
                  c: "450 ₺/kişi",
                  bal: "+9.200 ₺",
                },
                {
                  b: "Sakarya Ulaşım",
                  k: "4 / 10",
                  c: "%10",
                  bal: "0 ₺ (Mutabık)",
                },
              ].map((d) => (
                <div
                  key={d.b}
                  className="grid grid-cols-4 items-center py-0.5"
                >
                  <span className="font-semibold truncate">{d.b}</span>
                  <span className="tabular-nums">{d.k}</span>
                  <span>{d.c}</span>
                  <span className="text-right font-bold text-[#2457D6] tabular-nums">
                    {d.bal}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#5A6472] flex justify-between">
              <span>Merkez / Bayi Tahsilat Ayrımı</span>
              <span>Otomatik Kredi Limiti Kontrolü</span>
            </div>
          </>
        )}

        {moduleId === "whatsapp" && (
          <>
            <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
              <div className="text-[13px] font-bold">
                WhatsApp & Toplu QR Sözleşme Onayı
              </div>
              <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] text-[10px] font-semibold">
                TC & IP Damgalı
              </span>
            </div>
            <div className="grid grid-cols-12 gap-2.5 my-auto py-1 text-[11px]">
              <div className="col-span-7 bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 space-y-1.5">
                <div className="font-bold text-[#1E7A46]">
                  Tek Tıkla WhatsApp İletimi
                </div>
                <div className="rounded bg-[#E6F3EB] p-2 text-[#144F2E] leading-snug">
                  Sayın Yılmaz, Kapadokya turu biniş bilgileriniz ve paket tur
                  sözleşmeniz bağlantısı: turpilot...
                </div>
                <div className="text-[10px] text-[#5A6472]">
                  Onay: TC Doğrulamalı · 19.05 06:14 · IP Kayıtlı
                </div>
              </div>
              <div className="col-span-5 bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 flex flex-col items-center justify-center text-center">
                <div className="w-12 h-12 rounded border-2 border-[#15304C] grid grid-cols-3 gap-0.5 p-1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span
                      key={i}
                      className={
                        i % 2 === 0 ? "bg-[#15304C]" : "bg-transparent"
                      }
                    />
                  ))}
                </div>
                <div className="mt-1.5 font-bold">Otobüs Toplu QR</div>
                <div className="text-[10px] text-[#5A6472]">
                  Binişte hızlı onay
                </div>
              </div>
            </div>
            <div className="text-[11px] text-[#5A6472] flex justify-between">
              <span>Denetim Arşivi & PDF Dökümü</span>
              <span>Yolcu Bazlı Onay Durumu</span>
            </div>
          </>
        )}

        {moduleId === "refund" && (
          <>
            <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
              <div className="text-[13px] font-bold">
                Yolcu İndirim & İade Gider Tahakkuku
              </div>
              <span className="px-2 py-0.5 rounded bg-[#FCEFE8] text-[#8A3412] text-[10px] font-semibold">
                Denetim İzli
              </span>
            </div>
            <div className="bg-white border border-[#DDE2E9] rounded-[10px] p-3 my-auto space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-[#5A6472]">Yolcu Ödemesi (Kayıtlı)</span>
                <span className="font-bold tabular-nums">6.500 ₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A6472]">
                  Sonradan Tanımlanan İndirim
                </span>
                <span className="font-bold text-[#2457D6] tabular-nums">
                  -1.000 ₺ (Erken Grup İndirimi)
                </span>
              </div>
              <div className="rounded-[7px] bg-[#FCEFE8] text-[#8A3412] px-2.5 py-1.5 flex justify-between font-bold">
                <span>Sefer Giderine Otomatik Tahakkuk</span>
                <span className="tabular-nums">1.000 ₺ Yolcu İadesi</span>
              </div>
            </div>
            <div className="text-[11px] text-[#5A6472] flex justify-between">
              <span>Geri almada otomatik iptal</span>
              <span>Kırmızı İade Makbuzu PDF</span>
            </div>
          </>
        )}

        {moduleId === "pos" && (
          <>
            <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
              <div className="text-[13px] font-bold">
                Sanal POS & 1–12 Taksit Komisyon Matrisi
              </div>
              <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] text-[10px] font-semibold">
                AES-256 Şifreli Kasa
              </span>
            </div>
            <div className="bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 my-auto space-y-2 text-[11px]">
              <div className="flex items-center gap-2 font-semibold">
                <span className="px-2 py-0.5 rounded bg-[#EEF3FF] text-[#2457D6]">
                  İyzico
                </span>
                <span className="px-2 py-0.5 rounded bg-[#F2F4F7] text-[#34465A]">
                  PayTR
                </span>
                <span className="px-2 py-0.5 rounded bg-[#F2F4F7] text-[#34465A]">
                  Nkolay
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 text-center tabular-nums">
                {[
                  { t: "Tek Çekim", r: "%0" },
                  { t: "3 Taksit", r: "%3,9" },
                  { t: "6 Taksit", r: "%7,4" },
                  { t: "12 Taksit", r: "%14,2" },
                ].map((x) => (
                  <div
                    key={x.t}
                    className="rounded border border-[#DDE2E9] py-1.5 bg-[#F8FAFC]"
                  >
                    <div className="text-[10px] text-[#5A6472]">{x.t}</div>
                    <div className="font-bold text-[#15304C]">{x.r}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[11px] text-[#5A6472] flex justify-between">
              <span>Acentenin kendi POS hesabı</span>
              <span>Taksitli Online Tahsilat</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
