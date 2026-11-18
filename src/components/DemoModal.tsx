"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { getWhatsappUrl, siteConfig } from "@/config/siteConfig";
import { CheckIcon, CloseIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

interface DemoModalContextValue {
  openDemoModal: (sourceLabel?: string) => void;
}

const DemoModalContext = createContext<DemoModalContextValue>({
  openDemoModal: () => {},
});

export function useDemoModal() {
  return useContext(DemoModalContext);
}

export function DemoModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [sourceLabel, setSourceLabel] = useState("Genel Görüşme Talebi");
  const [name, setName] = useState("");
  const [agency, setAgency] = useState("");
  const [phone, setPhone] = useState("");
  const [callTime, setCallTime] = useState("Sabah");
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const openDemoModal = useCallback((label?: string) => {
    setSourceLabel(label || "Genel Görüşme Talebi");
    setSubmitted(false);
    setErrorMsg(null);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeModal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !agency.trim() || !phone.trim()) {
      setErrorMsg("Lütfen ad soyad, acente adı ve telefon alanlarını doldurun.");
      return;
    }
    if (!kvkkAccepted) {
      setErrorMsg("Devam etmek için KVKK aydınlatma metnini onaylamanız gerekir.");
      return;
    }

    setSubmitting(true);
    try {
      await fetch(siteConfig.leadEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "demo_call",
          source: sourceLabel,
          contactName: name.trim(),
          agencyName: agency.trim(),
          phone: phone.trim(),
          callWindow: callTime,
          kvkkAccepted: true,
        }),
      });
      setSubmitted(true);
    } catch {
      // Ağ hatasında dahi kullanıcı WhatsApp ile hızlıca devam edebilir
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappDemoText = `Merhaba TurPilot ekibi, canlı demo ve görüşme planlamak istiyorum.\nYetkili: ${
    name.trim() || "-"
  }\nAcente: ${agency.trim() || "-"}\nTelefon: ${
    phone.trim() || "-"
  }\nTercih edilen zaman: ${callTime}`;

  return (
    <DemoModalContext.Provider value={{ openDemoModal }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#15304C]/60 p-0 sm:p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            className="w-full sm:max-w-[480px] bg-white rounded-t-[20px] sm:rounded-[18px] border border-[#DDE2E9] p-5 sm:p-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wider text-[#2457D6]">
                  20 Dakikalık Canlı Tanıtım
                </p>
                <h2
                  id="demo-modal-title"
                  className="mt-1 text-[22px] font-bold text-[#15304C] font-condensed"
                >
                  Görüşme Planla
                </h2>
                <p className="mt-1 text-[14px] text-[#5A6472]">
                  Mevcut tur düzeninizi konuşalım; ilk seferinizi nasıl
                  taşıyacağımızı canlı ekranda gösterelim.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Kapat"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-[10px] border border-[#DDE2E9] text-[#34465A] hover:bg-[#F2F4F7] cursor-pointer"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-[14px] font-semibold text-[#15304C]">
                    Ad soyad *
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn. Ahmet Yılmaz"
                      className="mt-1.5 w-full h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[15px] text-[#15304C] bg-white"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-[14px] font-semibold text-[#15304C]">
                    Acente adı *
                    <input
                      type="text"
                      required
                      value={agency}
                      onChange={(e) => setAgency(e.target.value)}
                      placeholder="Örn. Anadolu Turizm"
                      className="mt-1.5 w-full h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[15px] text-[#15304C] bg-white"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="block text-[14px] font-semibold text-[#15304C]">
                    Telefon (WhatsApp) *
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="05XX XXX XX XX"
                      className="mt-1.5 w-full h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[15px] text-[#15304C] bg-white"
                    />
                  </label>

                  <label className="block text-[14px] font-semibold text-[#15304C]">
                    Görüşme zamanı
                    <select
                      value={callTime}
                      onChange={(e) => setCallTime(e.target.value)}
                      className="mt-1.5 w-full h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[15px] text-[#15304C] bg-white"
                    >
                      <option value="Sabah">Sabah (09:30–12:30)</option>
                      <option value="Öğleden sonra">
                        Öğleden sonra (13:30–17:30)
                      </option>
                      <option value="Akşam">Akşam (18:00–20:00)</option>
                    </select>
                  </label>
                </div>

                <label className="flex items-start gap-2.5 pt-1 text-[13px] text-[#34465A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={kvkkAccepted}
                    onChange={(e) => setKvkkAccepted(e.target.checked)}
                    className="mt-0.5 h-5 w-5 rounded border-[#AEB7C4] accent-[#2457D6] shrink-0"
                  />
                  <span>
                    <Link
                      href="/kvkk"
                      onClick={closeModal}
                      className="text-[#2457D6] underline font-medium"
                    >
                      KVKK Aydınlatma Metni
                    </Link>
                    &apos;ni okudum, görüşme planlaması kapsamında iletişim
                    bilgilerimin işlenmesini onaylıyorum.
                  </span>
                </label>

                {errorMsg && (
                  <div
                    role="alert"
                    className="rounded-[10px] bg-[#FCEFE8] px-3.5 py-2.5 text-[13px] font-medium text-[#8A3412]"
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[48px] rounded-[10px] bg-[#F2A900] hover:bg-[#dca000] text-[#15304C] font-bold text-[15px] transition-colors cursor-pointer disabled:opacity-60"
                >
                  {submitting ? "Gönderiliyor..." : "Görüşme Talebi Gönder"}
                </button>
              </form>
            ) : (
              <div
                role="status"
                className="mt-5 rounded-[14px] bg-[#E6F3EB] border border-[#B7DFC7] p-4 text-[#144F2E]"
              >
                <div className="flex items-center gap-2 font-bold text-[16px]">
                  <CheckIcon size={18} />
                  <span>Görüşme talebiniz alındı</span>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed">
                  {agency} için talebiniz ekibimize iletildi. Seçtiğiniz{" "}
                  <strong>{callTime.toLowerCase()}</strong> diliminde{" "}
                  <strong>{phone}</strong> numarasından sizinle iletişime
                  geçeceğiz.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={getWhatsappUrl(whatsappDemoText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 rounded-[10px] bg-[#1E7A46] text-white font-semibold text-[14px] hover:opacity-95"
                  >
                    <WhatsAppIcon size={17} />
                    WhatsApp&apos;tan Hemen Yaz
                  </a>
                  <Link
                    href="/tesekkurler?tip=gorusme"
                    onClick={closeModal}
                    className="inline-flex items-center justify-center min-h-[44px] px-4 rounded-[10px] border border-[#1E7A46]/30 bg-white text-[#144F2E] font-semibold text-[14px]"
                  >
                    Onay Sayfasına Git
                  </Link>
                </div>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-[#E8ECF2] flex flex-wrap items-center justify-between gap-2 text-[13px] text-[#5A6472]">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-1.5 font-medium text-[#15304C] hover:text-[#2457D6] min-h-[44px]"
              >
                <PhoneIcon size={15} />
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={getWhatsappUrl(whatsappDemoText)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[#1E7A46] hover:underline min-h-[44px]"
              >
                <WhatsAppIcon size={16} />
                Doğrudan WhatsApp ile yazın
              </a>
            </div>
          </div>
        </div>
      )}
    </DemoModalContext.Provider>
  );
}
