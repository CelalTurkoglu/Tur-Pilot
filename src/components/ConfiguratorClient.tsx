"use client";

import React, { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/config/siteConfig";
import {
  calculatePackageTotals,
  CONFIG_STEPS,
  formatTry,
  MODULES,
  type ModuleId,
} from "@/data/modules";
import { CheckIcon, LockIcon, PlusIcon } from "@/components/Icons";
import { ModulePreviewFrame } from "@/components/PreviewMockups";
import {
  MobileCartSheet,
  MobileDetailSheet,
} from "@/components/configurator/MobileSheets";
import {
  SummaryView,
  type SummaryFormState,
} from "@/components/configurator/SummaryView";

const subscribeEmpty = () => () => {};

function parseInitialStep(search: string): 0 | 1 | 2 | 3 | 4 {
  const param = Number(new URLSearchParams(search).get("adim") ?? "0");
  if (param >= 1 && param <= 4 && Number.isInteger(param)) {
    return param as 0 | 1 | 2 | 3 | 4;
  }
  return 0;
}

export function ConfiguratorClient() {
  const searchString = useSyncExternalStore(
    subscribeEmpty,
    () => window.location.search,
    () => ""
  );
  const initialStepFromUrl = parseInitialStep(searchString);

  const [manualStep, setManualStep] = useState<0 | 1 | 2 | 3 | 4 | null>(null);
  const step = manualStep ?? initialStepFromUrl;

  const [selectedMap, setSelectedMap] = useState<Record<ModuleId, boolean>>({
    admin: true,
    public: false,
    hotel: false,
    dealer: false,
    room: false,
    bulk: false,
    stops: false,
    pdf: false,
    whatsapp: false,
    refund: false,
    pos: false,
  });
  const [manualVisited, setManualVisited] = useState<Record<number, boolean>>(
    {}
  );
  const visited = useMemo(() => {
    const merged: Record<number, boolean> = { 0: true, ...manualVisited };
    for (let i = 0; i <= initialStepFromUrl; i++) {
      merged[i] = true;
    }
    return merged;
  }, [initialStepFromUrl, manualVisited]);

  const [manualFocusId, setManualFocusId] = useState<ModuleId | null>(null);
  const focusId =
    manualFocusId ??
    MODULES.find((m) => m.step === step)?.id ??
    "admin";

  const [desktopCartOpen, setDesktopCartOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [detailId, setDetailId] = useState<ModuleId | null>(null);

  const [form, setForm] = useState<SummaryFormState>({
    contactName: "",
    agencyName: "",
    phone: "",
    email: "",
    callWindow: "Sabah",
    kvkkAccepted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<{
    referenceId?: string;
    emailDelivered?: boolean;
    customerNotified?: boolean;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Masaüstü scroll-focus IntersectionObserver (Main.dc.html referanslı)
  useEffect(() => {
    if (step >= 4 || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const e of entries) {
          if (
            e.isIntersecting &&
            (!best || e.intersectionRatio > best.intersectionRatio)
          ) {
            best = e;
          }
        }
        if (best) {
          const id = best.target.getAttribute("data-feat") as ModuleId | null;
          if (id) setManualFocusId(id);
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    const timer = window.setTimeout(() => {
      document
        .querySelectorAll("[data-feat]")
        .forEach((el) => io.observe(el));
    }, 60);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, [step]);

  const selectedIds = useMemo(
    () =>
      (Object.keys(selectedMap) as ModuleId[]).filter((id) => selectedMap[id]),
    [selectedMap]
  );

  const totals = useMemo(
    () => calculatePackageTotals(selectedIds, siteConfig.vatRate),
    [selectedIds]
  );

  const countInStep = (stepIdx: number) =>
    MODULES.filter((m) => m.step === stepIdx && selectedMap[m.id]).length;

  const goToStep = (nextStep: 0 | 1 | 2 | 3 | 4) => {
    const firstMod = MODULES.find((m) => m.step === nextStep);
    setManualStep(nextStep);
    setManualVisited((prev) => ({ ...prev, [nextStep]: true }));
    setManualFocusId(firstMod ? firstMod.id : null);
    setDesktopCartOpen(false);
    setMobileCartOpen(false);
    setDetailId(null);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleModule = (id: ModuleId) => {
    const mod = MODULES.find((m) => m.id === id);
    if (!mod || mod.locked) return;
    setSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }));
    setManualFocusId(id);
  };

  const scrollToForm = () => {
    if (typeof document !== "undefined") {
      document
        .getElementById("contact-form-heading")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    if (
      !form.contactName.trim() ||
      !form.agencyName.trim() ||
      !form.phone.trim() ||
      !form.email.trim()
    ) {
      setErrorMessage(
        "Lütfen ad soyad, acente adı, telefon ve e-posta alanlarını eksiksiz doldurun."
      );
      scrollToForm();
      return;
    }
    if (!form.kvkkAccepted) {
      setErrorMessage(
        "Özeti göndermeden önce KVKK Aydınlatma Metni onay kutusunu işaretleyin."
      );
      scrollToForm();
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(siteConfig.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "configurator_summary",
          selectedIds,
          subtotal: totals.subtotal,
          vatAmount: totals.vatAmount,
          grandTotal: totals.grandTotal,
          ...form,
        }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setErrorMessage(
          json?.error ||
            "Talep gönderilirken sunucu hatası oluştu. Lütfen WhatsApp üzerinden doğrudan iletin."
        );
        scrollToForm();
        return;
      }
      setDeliveryInfo({
        referenceId: json.referenceId,
        emailDelivered: !!json.emailDelivered,
        customerNotified: !!json.customerNotified,
      });
      setSubmitted(true);
    } catch {
      setErrorMessage(
        "Bağlantı hatası oluştu. Lütfen tekrar deneyin veya WhatsApp ile bizimle iletişime geçin."
      );
      scrollToForm();
    } finally {
      setSubmitting(false);
    }
  };

  const currentStepMeta = CONFIG_STEPS[step];
  const stepModules = MODULES.filter((m) => m.step === step);
  const focusMod =
    stepModules.find((m) => m.id === focusId) || stepModules[0] || MODULES[0];

  const isConfig = step < 4;
  const nInStep = isConfig ? countInStep(step) : 0;

  let desktopNextLabel =
    step < 4 ? `Sonraki durak: ${CONFIG_STEPS[step + 1].label}` : "";
  if (step === 3) desktopNextLabel = "Özete geç";
  if (isConfig && currentStepMeta.optional && nInStep === 0) {
    desktopNextLabel = "Bu durağı atla";
  }

  let mobilePrimaryLabel =
    step < 4 ? `Sonraki: ${CONFIG_STEPS[step + 1].mobileLabel}` : "Özeti gönder";
  if (step === 3) mobilePrimaryLabel = "Özete geç";
  if (isConfig && currentStepMeta.optional && nInStep === 0) {
    mobilePrimaryLabel = "Bu durağı atla";
  }
  if (!isConfig && submitted) {
    mobilePrimaryLabel = "Gönderildi";
  }

  const progressPct = (80 * step) / 4;
  const detailModule = MODULES.find((m) => m.id === detailId) ?? null;

  return (
    <div className="min-h-screen bg-[#F2F4F7] text-[#15304C]">
      {/* Adım İlerleme Çubuğu (Masaüstü & Mobil) */}
      <div className="bg-white border-b border-[#DDE2E9]">
        {/* Masaüstü 5 Duraklı Rota */}
        <div className="hidden lg:block max-w-[1280px] mx-auto px-8 pt-4 pb-3">
          <nav aria-label="Adımlar" className="relative max-w-[920px] mx-auto">
            <div className="absolute left-[10%] right-[10%] top-[9px] h-[3px] rounded-full bg-[#DDE2E9]" />
            <div
              className="absolute left-[10%] top-[9px] h-[3px] rounded-full bg-[#2457D6] transition-all duration-200"
              style={{ width: `${progressPct}%` }}
            />
            <ol className="relative grid grid-cols-5">
              {CONFIG_STEPS.map((s) => {
                const active = s.index === step;
                const n = s.index < 4 ? countInStep(s.index) : 0;
                let sub = "";
                if (s.index < 4) {
                  if (n > 0) sub = `${n} seçili`;
                  else if (visited[s.index] && !active) sub = "Atlandı";
                }
                const done = !active && !!visited[s.index] && s.index < 4;
                return (
                  <li key={s.label} className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => goToStep(s.index)}
                      aria-current={active ? "step" : undefined}
                      aria-label={`Durak ${s.index + 1}: ${s.label}${
                        sub ? `, ${sub}` : ""
                      }`}
                      className="flex flex-col items-center gap-1.5 px-1 pb-1 min-h-[44px] cursor-pointer bg-transparent border-0"
                    >
                      <span
                        className={`flex items-center justify-center rounded-full box-border transition-colors ${
                          active
                            ? "w-[22px] h-[22px] bg-[#2457D6] border-4 border-[#F2A900]"
                            : done
                            ? "w-[20px] h-[20px] bg-[#2457D6] border-2 border-[#2457D6]"
                            : "w-[20px] h-[20px] bg-white border-2 border-[#AEB7C4]"
                        }`}
                      >
                        {done && <CheckIcon size={12} className="text-white" />}
                      </span>
                      <span
                        className={`text-[14px] leading-tight text-center ${
                          active
                            ? "font-bold text-[#15304C]"
                            : "font-medium text-[#34465A]"
                        }`}
                      >
                        {s.label}
                      </span>
                      <span
                        className={`text-[12px] min-h-[15px] text-center font-medium tabular-nums ${
                          n > 0 ? "text-[#1E7A46]" : "text-[#5A6472]"
                        }`}
                      >
                        {sub}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        {/* Mobil Kompakt 5 Duraklı Rota */}
        <div className="lg:hidden px-3 pt-2.5 pb-1">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[13px] font-semibold text-[#2457D6]">
              Sistemini Oluştur
            </span>
            <span className="text-[13px] font-medium text-[#5A6472] tabular-nums">
              Durak {step + 1} / 5
            </span>
          </div>
          <nav aria-label="Adımlar" className="grid grid-cols-5 gap-1">
            {CONFIG_STEPS.map((s) => {
              const active = s.index === step;
              const n = s.index < 4 ? countInStep(s.index) : 0;
              let sub = "";
              if (s.index < 4) {
                if (n > 0) sub = `${n} seçili`;
                else if (visited[s.index] && !active) sub = "Atlandı";
              }
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => goToStep(s.index)}
                  aria-current={active ? "step" : undefined}
                  aria-label={`Durak ${s.index + 1}: ${s.mobileLabel}${
                    sub ? `, ${sub}` : ""
                  }`}
                  className="min-h-[48px] py-1 flex flex-col justify-center items-start gap-1 cursor-pointer bg-transparent border-0"
                >
                  <span className="relative block w-full h-4">
                    <span
                      className="absolute top-[7px] h-[2px]"
                      style={{
                        left: s.index === 0 ? "8px" : "0",
                        right: s.index === 4 ? "calc(100% - 8px)" : "-4px",
                        backgroundColor:
                          s.index < step ? "#2457D6" : "#CBD3DD",
                      }}
                    />
                    <span
                      className={`absolute top-0 left-0 w-4 h-4 rounded-full box-border ${
                        active
                          ? "bg-[#2457D6] border-[3px] border-[#F2A900]"
                          : visited[s.index]
                          ? "bg-[#2457D6] border-2 border-[#2457D6]"
                          : "bg-white border-2 border-[#AEB7C4]"
                      }`}
                    />
                  </span>
                  <span
                    className={`text-[12px] text-left whitespace-nowrap ${
                      active
                        ? "font-bold text-[#15304C]"
                        : "font-medium text-[#34465A]"
                    }`}
                  >
                    {s.mobileLabel}
                  </span>
                  <span
                    className={`text-[11px] min-h-[13px] tabular-nums ${
                      n > 0 ? "text-[#1E7A46]" : "text-[#5A6472]"
                    }`}
                  >
                    {sub}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Ana Alan */}
      <main className="max-w-[1280px] mx-auto px-3.5 sm:px-8 pt-5 lg:pt-7 pb-40 lg:pb-14">
        <div className="mb-5 lg:mb-6 max-w-[740px]">
          <p className="hidden lg:block text-[14px] font-medium text-[#5A6472] tabular-nums">
            Durak {step + 1} / 5
          </p>
          <h1 className="mt-1 text-[24px] lg:text-[32px] leading-[1.15] font-bold text-[#15304C] font-display">
            {currentStepMeta.title}
          </h1>
          <p className="mt-1.5 text-[14px] lg:text-[16px] leading-relaxed text-[#5A6472]">
            {currentStepMeta.hint}
          </p>
        </div>

        {isConfig ? (
          <>
            {/* MASAÜSTÜ GÖRÜNÜM (>= 1024px) */}
            <div className="hidden lg:flex gap-8 items-start">
              {/* Sol Yapışkan Önizleme Çerçevesi */}
              <section
                aria-label="Özellik önizlemesi"
                className="flex-[1_1_560px] min-w-0 sticky top-6"
              >
                <div className="bg-white border border-[#DDE2E9] rounded-[18px] p-5">
                  <ModulePreviewFrame moduleId={focusMod.id} />
                  <div className="mt-3 text-[15px] font-bold text-[#15304C]">
                    {focusMod.name}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="bg-[#FCEFE8] rounded-[12px] p-3.5">
                      <div className="text-[13px] font-bold text-[#8A3412]">
                        Sorun
                      </div>
                      <div className="mt-1 text-[14px] leading-snug text-[#5C2510]">
                        {focusMod.pain}
                      </div>
                    </div>
                    <div className="bg-[#E6F3EB] rounded-[12px] p-3.5">
                      <div className="text-[13px] font-bold text-[#1E7A46]">
                        Çözüm
                      </div>
                      <div className="mt-1 text-[14px] leading-snug text-[#144F2E]">
                        {focusMod.solution}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sağ Modül Kartları + Yapışkan Lacivert Sepet */}
              <section
                aria-label="Modüller"
                className="flex-[1_1_440px] min-w-0 flex flex-col gap-3"
              >
                {stepModules.map((m) => {
                  const sel = !!selectedMap[m.id];
                  const isFocus = m.id === focusMod.id;
                  const priceLabel = m.locked
                    ? `${formatTry(m.price)} / yıl`
                    : `+${formatTry(m.price)} / yıl`;

                  return (
                    <article
                      key={m.id}
                      data-feat={m.id}
                      onMouseEnter={() => {
                        if (focusId !== m.id) setManualFocusId(m.id);
                      }}
                      className={`rounded-[16px] p-[18px_20px] transition-colors ${
                        isFocus
                          ? "border-2 border-[#2457D6] m-0"
                          : "border border-[#DDE2E9] m-[1px]"
                      } ${sel ? "bg-[#EEF3FF]" : "bg-white"}`}
                    >
                      <div className="flex justify-between gap-3 items-baseline">
                        <h2 className="text-[18px] leading-snug font-semibold text-[#15304C]">
                          {m.name}
                        </h2>
                        <div className="text-[16px] font-bold whitespace-nowrap tabular-nums text-[#15304C]">
                          {priceLabel}
                        </div>
                      </div>

                      <p className="mt-2 text-[14px] leading-relaxed text-[#5A6472]">
                        <span className="text-[#8A3412] font-semibold">
                          Sorun:{" "}
                        </span>
                        {m.pain}
                      </p>

                      <ul className="mt-2.5 pl-4.5 list-disc text-[14px] text-[#34465A] leading-relaxed space-y-1">
                        {m.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>

                      <div className="mt-3.5 flex justify-between items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setManualFocusId(m.id)}
                          className="min-h-[44px] text-[#2457D6] hover:text-[#1A43A8] text-[14px] font-semibold cursor-pointer"
                        >
                          Görseli göster
                        </button>

                        {m.locked ? (
                          <span className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 rounded-[10px] bg-[#E8ECF2] text-[#34465A] text-[14px] font-semibold">
                            <LockIcon size={16} />
                            Pakete dahil
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleModule(m.id)}
                            aria-pressed={sel}
                            aria-label={`${sel ? "Eklendi" : "Ekle"}: ${m.name}`}
                            className={`inline-flex items-center gap-1.5 min-h-[44px] px-[18px] rounded-[10px] border-[1.5px] border-[#2457D6] text-[15px] font-semibold cursor-pointer transition-colors ${
                              sel
                                ? "bg-[#2457D6] text-white"
                                : "bg-white text-[#2457D6] hover:bg-[#EEF3FF]"
                            }`}
                          >
                            {sel ? (
                              <CheckIcon size={16} />
                            ) : (
                              <PlusIcon size={16} />
                            )}
                            <span>{sel ? "Eklendi" : "Ekle"}</span>
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}

                {/* Yapışkan Lacivert Sepet Özeti */}
                <div className="sticky bottom-4 mt-2 bg-[#15304C] text-white rounded-[16px] p-[16px_18px]">
                  {desktopCartOpen && (
                    <div className="border-b border-dashed border-white/35 pb-2.5 mb-3">
                      {totals.selectedModules.map((it) => (
                        <div
                          key={it.id}
                          className="flex items-center gap-2 text-[15px] min-h-[44px]"
                        >
                          <span className="flex-1">{it.name}</span>
                          <span className="text-[#D5DEEA] whitespace-nowrap tabular-nums">
                            {formatTry(it.price)}
                          </span>
                          {it.locked ? (
                            <span className="w-10 text-center text-[12px] text-[#C3CEDC]">
                              dahil
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleModule(it.id)}
                              aria-label={`${it.name} kaldır`}
                              className="w-10 h-10 rounded-[10px] border border-white/30 bg-transparent text-white text-[17px] cursor-pointer hover:bg-white/10"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}

                      {siteConfig.showVatBreakdown && (
                        <>
                          <div className="flex justify-between text-[14px] text-[#C3CEDC] mt-2 tabular-nums">
                            <span>
                              KDV (%{Math.round(siteConfig.vatRate * 100)})
                            </span>
                            <span>{formatTry(totals.vatAmount)}</span>
                          </div>
                          <div className="flex justify-between text-[15px] mt-1 tabular-nums">
                            <span>KDV dahil yıllık toplam</span>
                            <span className="font-bold">
                              {formatTry(totals.grandTotal)}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex-1">
                      <div className="text-[13px] text-[#C3CEDC]">
                        {totals.count} modül seçili, KDV hariç
                      </div>
                      <div className="text-[26px] font-bold font-condensed tabular-nums">
                        {formatTry(totals.subtotal)}
                        <span className="text-[14px] font-normal text-[#C3CEDC]">
                          {" "}
                          / yıl
                        </span>
                      </div>
                      <div className="text-[13px] text-[#C3CEDC] mt-0.5">
                        Kredi kartınızla, bankanız üzerinden taksitle
                        ödeyebilirsiniz.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDesktopCartOpen((o) => !o)}
                      aria-expanded={desktopCartOpen}
                      className="min-h-[44px] px-3.5 rounded-[10px] border border-white/35 bg-transparent text-white text-[14px] font-medium cursor-pointer hover:bg-white/10"
                    >
                      {desktopCartOpen ? "Listeyi gizle" : "Listeyi gör"}
                    </button>
                  </div>

                  <div className="flex gap-2 mt-3.5 pt-3.5 border-t border-dashed border-white/35">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={() => goToStep((step - 1) as 0 | 1 | 2 | 3)}
                        className="min-h-[48px] px-4.5 rounded-[10px] border border-white/35 bg-transparent text-white text-[15px] cursor-pointer hover:bg-white/10"
                      >
                        Geri
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => goToStep((step + 1) as 1 | 2 | 3 | 4)}
                      className="flex-1 min-h-[48px] rounded-[10px] bg-[#F2A900] hover:bg-[#dca000] text-[#15304C] text-[16px] font-bold cursor-pointer transition-colors"
                    >
                      {desktopNextLabel}
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* MOBİL LİSTE GÖRÜNÜMÜ (< 1024px) */}
            <div className="lg:hidden flex flex-col gap-2.5">
              {stepModules.map((m) => {
                const sel = !!selectedMap[m.id];
                const priceLabel = m.locked
                  ? `${formatTry(m.price)} / yıl`
                  : `+${formatTry(m.price)} / yıl`;

                return (
                  <article
                    key={m.id}
                    className={`rounded-[14px] overflow-hidden transition-colors ${
                      sel
                        ? "border-2 border-[#2457D6] bg-[#EEF3FF] m-0"
                        : "border border-[#DDE2E9] bg-white m-[1px]"
                    }`}
                  >
                    <div className="flex gap-3 p-3 items-start">
                      <button
                        type="button"
                        onClick={() => setDetailId(m.id)}
                        aria-label={`${m.name} görsel önizlemesini aç`}
                        className="shrink-0 w-16 h-16 rounded-[10px] bg-[#E8ECF2] border border-[#DDE2E9] overflow-hidden flex flex-col items-center justify-center text-[#2457D6] cursor-pointer"
                      >
                        {siteConfig.previewAssets[m.id].length > 0 ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={siteConfig.previewAssets[m.id][0].src}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <>
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                              Önizle
                            </span>
                            <span className="text-[11px] font-medium text-[#5A6472] mt-0.5">
                              16:10
                            </span>
                          </>
                        )}
                      </button>

                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <h2 className="text-[15px] font-bold text-[#15304C] leading-snug">
                          {m.name}
                        </h2>
                        <div className="text-[13px] text-[#5A6472] leading-snug">
                          <span className="text-[#8A3412] font-semibold">
                            Sorun:{" "}
                          </span>
                          {m.pain}
                        </div>
                        <div className="text-[14px] font-bold text-[#15304C] mt-1 tabular-nums">
                          {priceLabel}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-2 pl-[88px] pr-3 pb-2.5">
                      <button
                        type="button"
                        onClick={() => setDetailId(m.id)}
                        className="min-h-[44px] text-[#2457D6] text-[13px] font-semibold cursor-pointer"
                      >
                        Detay ve görsel
                      </button>

                      {m.locked ? (
                        <span className="inline-flex items-center gap-1 min-h-[44px] px-2.5 rounded-[10px] bg-[#E8ECF2] text-[#34465A] text-[13px] font-semibold">
                          <LockIcon size={14} />
                          Dahil
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleModule(m.id)}
                          aria-pressed={sel}
                          aria-label={`${sel ? "Eklendi" : "Ekle"}: ${m.name}`}
                          className={`inline-flex items-center gap-1 min-h-[44px] px-3 rounded-[10px] border border-[#2457D6] text-[13px] font-semibold cursor-pointer ${
                            sel
                              ? "bg-[#2457D6] text-white"
                              : "bg-white text-[#2457D6]"
                          }`}
                        >
                          {sel ? (
                            <CheckIcon size={15} />
                          ) : (
                            <PlusIcon size={15} />
                          )}
                          <span>{sel ? "Eklendi" : "Ekle"}</span>
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        ) : (
          /* ADIM 5: ÖZET & GEÇİŞ PLANI */
          <SummaryView
            selectedItems={totals.selectedModules}
            selectedIds={selectedIds}
            subtotal={totals.subtotal}
            vatAmount={totals.vatAmount}
            grandTotal={totals.grandTotal}
            form={form}
            onFormChange={(patch) =>
              setForm((prev) => ({ ...prev, ...patch }))
            }
            onEditStep={(idx) => goToStep(idx)}
            onRemoveModule={toggleModule}
            onPrev={() => goToStep(3)}
            onSubmit={handleSubmit}
            submitting={submitting}
            submitted={submitted}
            deliveryInfo={deliveryInfo}
            errorMessage={errorMessage}
          />
        )}
      </main>

      {/* Mobil Sabit Alt Panel */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-[#15304C] text-white px-3.5 pt-2.5 pb-4 flex flex-col gap-2 border-t border-white/10">
        {isConfig && (
          <button
            type="button"
            onClick={() => setMobileCartOpen(true)}
            aria-expanded={mobileCartOpen}
            className="flex items-center justify-between w-full min-h-[44px] text-left cursor-pointer"
          >
            <span>
              <span className="block text-[12px] text-[#C3CEDC]">
                {totals.count} modül, KDV hariç
              </span>
              <span className="text-[19px] font-bold tabular-nums">
                {formatTry(totals.subtotal)}
              </span>
              <span className="text-[12px] text-[#C3CEDC]"> / yıl</span>
            </span>
            <span className="text-[13px] font-medium text-[#D5DEEA] border border-[#34465A] rounded-[8px] px-2.5 py-2">
              Sepeti gör
            </span>
          </button>
        )}

        <div className="flex gap-2">
          {step > 0 && (
            <button
              type="button"
              onClick={() => goToStep((step - 1) as 0 | 1 | 2 | 3)}
              className="min-h-[48px] px-4 rounded-[10px] border border-[#34465A] bg-transparent text-white text-[14px] font-medium cursor-pointer"
            >
              Geri
            </button>
          )}
          <button
            type="button"
            disabled={!isConfig && (submitting || submitted)}
            onClick={
              isConfig
                ? () => goToStep((step + 1) as 1 | 2 | 3 | 4)
                : handleSubmit
            }
            className="flex-1 min-h-[48px] rounded-[10px] bg-[#F2A900] text-[#15304C] text-[16px] font-bold cursor-pointer disabled:opacity-65"
          >
            {mobilePrimaryLabel}
          </button>
        </div>
      </div>

      {/* Mobil Bottom Sheet'ler */}
      <MobileDetailSheet
        moduleItem={detailModule}
        isSelected={detailModule ? !!selectedMap[detailModule.id] : false}
        onToggle={toggleModule}
        onClose={() => setDetailId(null)}
      />
      <MobileCartSheet
        open={mobileCartOpen}
        items={totals.selectedModules}
        subtotal={totals.subtotal}
        vatAmount={totals.vatAmount}
        grandTotal={totals.grandTotal}
        onRemove={toggleModule}
        onClose={() => setMobileCartOpen(false)}
      />
    </div>
  );
}
