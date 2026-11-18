import React from "react";
import { siteConfig, type PreviewAssetKey } from "@/config/siteConfig";
import type { ModuleId } from "@/data/modules";

function OptionalImageOverride({
  assetKey,
  alt,
  children,
}: {
  assetKey: PreviewAssetKey;
  alt: string;
  children: React.ReactNode;
}) {
  const src = siteConfig.previewAssets[assetKey];
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded-[inherit]"
      />
    );
  }
  return <>{children}</>;
}

export function HeroDashboardPreview() {
  return (
    <div className="w-full rounded-[16px] overflow-hidden border border-white/25 bg-white text-[#15304C] shadow-sm">
      {/* Tarayıcı Üst Çubuğu */}
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

      <OptionalImageOverride
        assetKey="heroDashboard"
        alt="TurPilot Admin Paneli Dashboard Ekranı"
      >
        <div className="grid grid-cols-12 min-h-[300px] sm:min-h-[360px]">
          {/* Sol Menü */}
          <aside className="hidden sm:flex sm:col-span-3 bg-[#15304C] text-white p-4 flex-col justify-between">
            <div>
              <div className="text-[14px] font-bold tracking-tight text-white pb-3 border-b border-white/10">
                TurPilot Panel
              </div>
              <ul className="mt-3 space-y-1 text-[12px]">
                {[
                  { label: "Dashboard", active: true },
                  { label: "Tur Şablonları", active: false },
                  { label: "Seferler & Araçlar", active: false },
                  { label: "2+1 / 2+2 Koltuklar", active: false },
                  { label: "Durak Manifestosu", active: false },
                  { label: "Saha & Gider Fişleri", active: false },
                  { label: "B2B Bayi & Cari", active: false },
                  { label: "PDF & Excel Çıktı", active: false },
                ].map((nav) => (
                  <li
                    key={nav.label}
                    className={`px-2.5 py-1.5 rounded-[7px] ${
                      nav.active
                        ? "bg-[#2457D6] text-white font-semibold"
                        : "text-[#C3CEDC]"
                    }`}
                  >
                    {nav.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-[11px] text-[#9FB0C4] pt-3 border-t border-white/10">
              Bulut Oturum · Aktif
            </div>
          </aside>

          {/* Ana İçerik */}
          <div className="col-span-12 sm:col-span-9 p-4 sm:p-5 bg-[#F8FAFC]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#DDE2E9]">
              <div>
                <div className="text-[15px] font-bold text-[#15304C]">
                  Operasyon Özeti
                </div>
                <div className="text-[12px] text-[#5A6472]">
                  Aktif seferler, kapora durumu ve araç dolulukları
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-[7px] bg-white border border-[#DDE2E9] text-[11px] font-semibold text-[#34465A]">
                  + Şablondan Sefer Aç
                </span>
                <span className="px-2.5 py-1 rounded-[7px] bg-[#2457D6] text-white text-[11px] font-semibold">
                  + Yeni Rezervasyon
                </span>
              </div>
            </div>

            {/* KPI Kartları */}
            <div className="mt-3.5 grid grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { label: "Aktif Sefer", val: "14", note: "Bu hafta 6 çıkış" },
                { label: "Kayıtlı Yolcu", val: "412", note: "38 opsiyonlu" },
                {
                  label: "Bekleyen Bakiye",
                  val: "48.500 ₺",
                  note: "27 yolcu kaporalı",
                },
                {
                  label: "Net Sefer Kârı",
                  val: "186.400 ₺",
                  note: "Masraflar düşüldü",
                },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="bg-white border border-[#DDE2E9] rounded-[10px] p-2.5"
                >
                  <div className="text-[11px] text-[#5A6472]">{kpi.label}</div>
                  <div className="mt-0.5 text-[16px] font-bold text-[#15304C] tabular-nums">
                    {kpi.val}
                  </div>
                  <div className="text-[10px] text-[#1E7A46] font-medium">
                    {kpi.note}
                  </div>
                </div>
              ))}
            </div>

            {/* Yaklaşan Seferler */}
            <div className="mt-3.5 bg-white border border-[#DDE2E9] rounded-[10px] overflow-hidden">
              <div className="px-3 py-2 border-b border-[#E8ECF2] flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#15304C]">
                  Yaklaşan Otobüs Seferleri
                </span>
                <span className="text-[11px] text-[#2457D6] font-semibold">
                  Canlı Doluluk
                </span>
              </div>
              <div className="divide-y divide-[#E8ECF2] text-[12px]">
                {[
                  {
                    code: "KPD104",
                    tour: "Kapadokya Kültür Turu · 1. Araç",
                    date: "22 Mayıs · 2+1 Otobüs",
                    seats: "41 / 45",
                    status: "Kalkışa Hazır",
                    tone: "bg-[#E6F3EB] text-[#144F2E]",
                  },
                  {
                    code: "BKD208",
                    tour: "Batı Karadeniz & Amasra · 2 Araç",
                    date: "23 Mayıs · 2+2 Otobüs",
                    seats: "78 / 90",
                    status: "Satışta",
                    tone: "bg-[#EEF3FF] text-[#2457D6]",
                  },
                  {
                    code: "GAP312",
                    tour: "Büyük GAP Kültür Turu · 1. Araç",
                    date: "29 Mayıs · 2+1 Otobüs",
                    seats: "36 / 42",
                    status: "Oda Planlı",
                    tone: "bg-[#FCEFE8] text-[#8A3412]",
                  },
                ].map((row) => (
                  <div
                    key={row.code}
                    className="px-3 py-2.5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-[#15304C] truncate">
                        <span className="text-[#5A6472] mr-1.5 font-mono text-[11px]">
                          {row.code}
                        </span>
                        {row.tour}
                      </div>
                      <div className="text-[11px] text-[#5A6472]">
                        {row.date}
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="font-bold text-[#15304C] tabular-nums">
                        {row.seats}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${row.tone}`}
                      >
                        {row.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </OptionalImageOverride>
    </div>
  );
}

export function BentoSeatMapPreview() {
  const seats = [
    { no: "01", st: "sold" },
    { no: "02", st: "sold" },
    { no: "03", st: "option" },
    { no: "04", st: "sold" },
    { no: "05", st: "free" },
    { no: "06", st: "sold" },
    { no: "07", st: "sold" },
    { no: "08", st: "free" },
    { no: "09", st: "option" },
    { no: "10", st: "sold" },
    { no: "11", st: "free" },
    { no: "12", st: "free" },
  ];

  return (
    <div className="bg-white border border-[#DDE2E9] rounded-[14px] p-4 text-[#15304C]">
      <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E8ECF2]">
        <div>
          <div className="text-[13px] font-bold">2+1 Koltuk Planı · 1. Araç</div>
          <div className="text-[11px] text-[#5A6472]">
            Çifte satış kilidi aktif
          </div>
        </div>
        <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] text-[11px] font-semibold">
          4 Boş Koltuk
        </span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {seats.map((s) => (
          <div
            key={s.no}
            className={`h-8 rounded-[7px] border text-[12px] font-bold flex items-center justify-center tabular-nums ${
              s.st === "sold"
                ? "bg-[#2457D6] border-[#2457D6] text-white"
                : s.st === "option"
                ? "bg-[#F2A900]/20 border-[#F2A900] text-[#8A3412]"
                : "bg-[#F8FAFC] border-[#CBD3DD] text-[#15304C]"
            }`}
          >
            {s.no}
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2.5 border-t border-[#E8ECF2] flex flex-wrap gap-2 text-[11px] text-[#34465A]">
        <span className="px-2 py-0.5 rounded bg-[#F2F4F7]">
          İstanbul: 24/30
        </span>
        <span className="px-2 py-0.5 rounded bg-[#F2F4F7]">Kocaeli: 8/10</span>
        <span className="px-2 py-0.5 rounded bg-[#F2F4F7]">Sakarya: 5/5</span>
      </div>
    </div>
  );
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

      <OptionalImageOverride
        assetKey="publicShowcase"
        alt="Acenteye Özel Public Site B2C Vitrin Önizlemesi"
      >
        <div className="p-4 sm:p-6 bg-[#F8FAFC]">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#DDE2E9]">
            <div className="font-bold text-[16px] text-[#15304C]">
              Anadolu Turizm · Online Tur Vitrini
            </div>
            <div className="flex items-center gap-2 text-[12px]">
              <span className="px-2.5 py-1 rounded-full bg-[#2457D6] text-white font-semibold">
                İstanbul Kalkışlı
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white border border-[#DDE2E9] text-[#34465A]">
                Bursa
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white border border-[#DDE2E9] text-[#34465A]">
                Ankara
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {[
              {
                name: "Kapadokya Kültür Turu",
                meta: "2 Gece 3 Gün · 2+1 Otobüs",
                seats: "Son 4 Koltuk",
                price: "6.450 ₺",
              },
              {
                name: "Amasra & Safranbolu",
                meta: "1 Gece 2 Gün · Yarım Pansiyon",
                seats: "12 Boş Koltuk",
                price: "3.950 ₺",
              },
              {
                name: "Büyük GAP Kültür Turu",
                meta: "4 Gece 5 Gün · Butik Oteller",
                seats: "6 Boş Koltuk",
                price: "11.900 ₺",
              },
            ].map((tour) => (
              <div
                key={tour.name}
                className="bg-white border border-[#DDE2E9] rounded-[12px] p-3.5 flex flex-col justify-between gap-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] font-semibold">
                      {tour.seats}
                    </span>
                    <span className="text-[#5A6472]">Online Koltuk Seçimi</span>
                  </div>
                  <div className="mt-2 font-bold text-[14px] text-[#15304C]">
                    {tour.name}
                  </div>
                  <div className="text-[12px] text-[#5A6472] mt-0.5">
                    {tour.meta}
                  </div>
                </div>
                <div className="pt-2.5 border-t border-[#E8ECF2] flex items-center justify-between">
                  <span className="font-bold text-[15px] text-[#15304C] tabular-nums">
                    {tour.price}
                  </span>
                  <span className="px-2.5 py-1 rounded-[7px] bg-[#F2A900] text-[#15304C] text-[11px] font-bold">
                    Koltuk Seç
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </OptionalImageOverride>
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

  return (
    <div className="w-full aspect-[16/10] rounded-[12px] bg-[#F8FAFC] border border-[#DDE2E9] overflow-hidden text-[#15304C]">
      <OptionalImageOverride
        assetKey={moduleId}
        alt={`TurPilot ${moduleId} modülü arayüz önizlemesi`}
      >
        <div className={`w-full h-full flex flex-col justify-between ${pad}`}>
          {moduleId === "admin" && (
            <>
              <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
                <div>
                  <div className="text-[13px] font-bold">
                    KPD104 · Kapadokya Seferi (1. Araç)
                  </div>
                  <div className="text-[11px] text-[#5A6472]">
                    Kaptan: H. Kaya · Rehber: S. Demir · 41/45 Koltuk
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] text-[11px] font-semibold">
                  Çifte Satış Kilidi
                </span>
              </div>
              <div className="grid grid-cols-12 gap-3 my-auto py-2">
                <div className="col-span-5 bg-white border border-[#DDE2E9] rounded-[10px] p-2.5">
                  <div className="text-[11px] font-bold mb-1.5">
                    2+1 Koltuk Planı
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["01", "02", "03", "04", "05", "06", "07", "08", "09"].map(
                      (n, idx) => (
                        <div
                          key={n}
                          className={`h-6 rounded text-[10px] font-bold flex items-center justify-center tabular-nums ${
                            idx === 4 || idx === 7
                              ? "bg-[#F2F4F7] border border-[#CBD3DD] text-[#15304C]"
                              : idx === 2
                              ? "bg-[#F2A900]/25 border border-[#F2A900] text-[#8A3412]"
                              : "bg-[#2457D6] text-white"
                          }`}
                        >
                          {n}
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="col-span-7 bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 flex flex-col justify-between text-[11px]">
                  <div className="font-bold">Tahsilat & Kârlılık</div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#5A6472]">Toplam Satış</span>
                      <span className="font-semibold tabular-nums">
                        264.450 ₺
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A6472]">Tahsil Edilen</span>
                      <span className="font-semibold text-[#1E7A46] tabular-nums">
                        215.950 ₺
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5A6472]">Saha + Otel Gideri</span>
                      <span className="font-semibold text-[#8A3412] tabular-nums">
                        148.200 ₺
                      </span>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-[#E8ECF2] flex justify-between font-bold">
                    <span>Net Kâr</span>
                    <span className="text-[#2457D6] tabular-nums">
                      116.250 ₺
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-[#5A6472] flex justify-between">
                <span>G1/G2 Çocuk Yaşı: Otomatik</span>
                <span>Personel Kasa Yetkisi: Kısıtlı</span>
              </div>
            </>
          )}

          {moduleId === "public" && (
            <>
              <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
                <div className="text-[12px] font-bold text-[#2457D6]">
                  www.acenteadiniz.com
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] text-[10px] font-semibold">
                  SSL Aktif · Canlı Senkron
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 my-auto py-2">
                {[
                  {
                    t: "Batı Karadeniz Turu",
                    c: "İstanbul 3.950 ₺ · Ankara 3.650 ₺",
                    s: "11 Koltuk Boş",
                  },
                  {
                    t: "Kapadokya Balon & Kültür",
                    c: "İstanbul 6.450 ₺ · Kocaeli 6.250 ₺",
                    s: "4 Koltuk Boş",
                  },
                ].map((card) => (
                  <div
                    key={card.t}
                    className="bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 flex flex-col justify-between gap-2"
                  >
                    <div>
                      <span className="text-[10px] font-semibold text-[#1E7A46] bg-[#E6F3EB] px-1.5 py-0.5 rounded">
                        {card.s}
                      </span>
                      <div className="mt-1.5 text-[12px] font-bold">
                        {card.t}
                      </div>
                      <div className="text-[10px] text-[#5A6472] mt-0.5">
                        {card.c}
                      </div>
                    </div>
                    <div className="h-6 rounded bg-[#F2A900] text-[#15304C] text-[11px] font-bold flex items-center justify-center">
                      Koltuk Seç & Rezerve Et
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#5A6472] flex justify-between">
                <span>7/24 Online Rezervasyon</span>
                <span>Doğrudan Admin Paneline Düşer</span>
              </div>
            </>
          )}

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
                    <span className="col-span-2 font-medium truncate">
                      {r.h}
                    </span>
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

          {moduleId === "room" && (
            <>
              <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
                <div className="text-[13px] font-bold">
                  29 Renkli Oda Gruplandırma (Rooming)
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] text-[10px] font-semibold">
                  Otel PDF Hazır
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 my-auto py-1 text-[11px]">
                {[
                  {
                    badge: "Grup 1 · DBL",
                    color: "bg-[#2457D6]",
                    names: "Ayşe Yılmaz · Kemal Yılmaz",
                  },
                  {
                    badge: "Grup 2 · TRPL",
                    color: "bg-[#1E7A46]",
                    names: "Can Demir · Elif Demir · Mert (Çocuk)",
                  },
                  {
                    badge: "Grup 3 · SNG",
                    color: "bg-[#8A3412]",
                    names: "Selin Kaya (Tek Kişilik Oda)",
                  },
                  {
                    badge: "Personel · TWN",
                    color: "bg-[#15304C]",
                    names: "1. Kaptan H. Kaya · Rehber S. Demir",
                  },
                ].map((room) => (
                  <div
                    key={room.badge}
                    className="bg-white border border-[#DDE2E9] rounded-[9px] p-2"
                  >
                    <div className="flex items-center gap-1.5 font-bold">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${room.color}`}
                      />
                      <span>{room.badge}</span>
                    </div>
                    <div className="mt-1 text-[#34465A] leading-snug">
                      {room.names}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#5A6472] flex justify-between">
                <span>SNG / DBL / TWN / TRPL / Aile</span>
                <span>Kaptan & Rehber Odaları Dahil</span>
              </div>
            </>
          )}

          {moduleId === "bulk" && (
            <>
              <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
                <div className="text-[13px] font-bold">
                  Şablondan Toplu Sefer Üretimi
                </div>
                <span className="px-2 py-0.5 rounded bg-[#EEF3FF] text-[#2457D6] text-[10px] font-semibold">
                  Maks. 50 Tarih
                </span>
              </div>
              <div className="bg-white border border-[#DDE2E9] rounded-[10px] p-3 my-auto space-y-2 text-[11px]">
                <div className="font-semibold">
                  Şablon: Batı Karadeniz & Amasra (Cumartesi Çıkışlı)
                </div>
                <div className="flex flex-wrap gap-1.5 tabular-nums">
                  {[
                    "23 May",
                    "30 May",
                    "06 Haz",
                    "13 Haz",
                    "20 Haz",
                    "27 Haz",
                    "04 Tem",
                    "+18 Tarih",
                  ].map((d) => (
                    <span
                      key={d}
                      className="px-2 py-1 rounded bg-[#EEF3FF] text-[#2457D6] font-semibold"
                    >
                      {d}
                    </span>
                  ))}
                </div>
                <div className="rounded-[7px] bg-[#E6F3EB] text-[#144F2E] px-2.5 py-1.5 font-medium">
                  Atomik kontrol tamam: 25 tarih durak ve çocuk fiyatlarıyla
                  çakışmasız üretilmeye hazır.
                </div>
              </div>
              <div className="text-[11px] text-[#5A6472] flex justify-between">
                <span>Tüm Durak & Fiyatlar Kopyalanır</span>
                <span>Takvimde Grup Görünümü</span>
              </div>
            </>
          )}

          {moduleId === "stops" && (
            <>
              <div className="flex items-center justify-between border-b border-[#DDE2E9] pb-2">
                <div className="text-[13px] font-bold">
                  Saatli Durak Manifestosu & Harita
                </div>
                <span className="px-2 py-0.5 rounded bg-[#E6F3EB] text-[#144F2E] text-[10px] font-semibold">
                  Tek Tık Senkron
                </span>
              </div>
              <div className="bg-white border border-[#DDE2E9] rounded-[10px] p-2.5 my-auto space-y-1.5 text-[11px]">
                {[
                  {
                    time: "06:00",
                    stop: "İncirli Ömür Plaza Önü",
                    pax: "14 Yolcu",
                    map: "Google Maps Konumu",
                  },
                  {
                    time: "06:25",
                    stop: "Mecidiyeköy İETT Durakları",
                    pax: "11 Yolcu",
                    map: "Google Maps Konumu",
                  },
                  {
                    time: "06:55",
                    stop: "Kadıköy Evlendirme Dairesi",
                    pax: "16 Yolcu",
                    map: "Google Maps Konumu",
                  },
                ].map((s) => (
                  <div
                    key={s.stop}
                    className="flex items-center justify-between gap-2 py-1 border-b last:border-b-0 border-[#E8ECF2]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-1.5 py-0.5 rounded bg-[#15304C] text-white font-bold tabular-nums">
                        {s.time}
                      </span>
                      <span className="font-semibold truncate">{s.stop}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-medium tabular-nums">{s.pax}</span>
                      <span className="text-[#2457D6] font-semibold">
                        {s.map}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#5A6472] flex justify-between">
                <span>Saat değişince yolcular güncellenir</span>
                <span>Şoför & Rehber Listesi Hazır</span>
              </div>
            </>
          )}

          {moduleId === "pdf" && (
            <>
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
                    <span className="text-[#2457D6] font-bold shrink-0">
                      İndir
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-[#5A6472] flex justify-between">
                <span>Ödeme bilgili / bilgisiz Excel seçeneği</span>
                <span>Tek Tık Hazır Çıktı</span>
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
      </OptionalImageOverride>
    </div>
  );
}
