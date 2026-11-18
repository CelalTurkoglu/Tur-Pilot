"use client";

import React from "react";
import Link from "next/link";
import { getWhatsappUrl, siteConfig } from "@/config/siteConfig";
import {
  buildSummaryWhatsappText,
  CONFIG_STEPS,
  formatTry,
  MIGRATION_SLA_TEXT,
  MIGRATION_TIMELINE,
  SUMMARY_POLICIES,
  type ConfigModule,
  type ModuleId,
} from "@/data/modules";
import { CheckIcon, WhatsAppIcon } from "@/components/Icons";

export interface SummaryFormState {
  contactName: string;
  agencyName: string;
  phone: string;
  email: string;
  callWindow: string;
  kvkkAccepted: boolean;
}

export function SummaryView({
  selectedItems,
  selectedIds,
  subtotal,
  vatAmount,
  grandTotal,
  form,
  onFormChange,
  onEditStep,
  onRemoveModule,
  onPrev,
  onSubmit,
  submitting,
  submitted,
  errorMessage,
}: {
  selectedItems: ConfigModule[];
  selectedIds: ModuleId[];
  subtotal: number;
  vatAmount: number;
  grandTotal: number;
  form: SummaryFormState;
  onFormChange: (patch: Partial<SummaryFormState>) => void;
  onEditStep: (stepIndex: 0 | 1 | 2 | 3) => void;
  onRemoveModule: (id: ModuleId) => void;
  onPrev: () => void;
  onSubmit: () => void;
  submitting: boolean;
  submitted: boolean;
  errorMessage: string | null;
}) {
  const groups = ([0, 1, 2, 3] as const).map((stepIndex) => ({
    stepIndex,
    label: CONFIG_STEPS[stepIndex].label,
    items: selectedItems.filter((m) => m.step === stepIndex),
  }));

  const whatsappSummaryHref = getWhatsappUrl(
    buildSummaryWhatsappText({
      selectedIds,
      agencyName: form.agencyName.trim() || "Belirtilmedi",
      contactName: form.contactName.trim() || "Belirtilmedi",
      phone: form.phone.trim() || "Belirtilmedi",
      email: form.email.trim() || "Belirtilmedi",
      callWindow: form.callWindow,
      includeVat: siteConfig.showVatBreakdown,
    })
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
      {/* Sol Ana Kolon */}
      <div className="w-full lg:flex-[1_1_580px] min-w-0 flex flex-col gap-4 sm:gap-5">
        {/* Seçiminiz */}
        <section className="bg-white border border-[#DDE2E9] rounded-[18px] p-4 sm:p-6">
          <h2 className="text-[20px] font-bold text-[#15304C] font-condensed mb-2">
            Seçiminiz
          </h2>
          {groups.map((g) => (
            <div
              key={g.label}
              className="border-t border-[#E8ECF2] py-3 first-of-type:mt-2"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-[15px] font-bold text-[#15304C]">
                  {g.label}
                </h3>
                <button
                  type="button"
                  onClick={() => onEditStep(g.stepIndex)}
                  className="min-h-[44px] px-2 text-[#2457D6] text-[14px] font-semibold hover:text-[#1A43A8] cursor-pointer"
                >
                  Düzenle
                </button>
              </div>
              {g.items.length === 0 ? (
                <div className="text-[15px] text-[#5A6472] py-1">
                  Seçilmedi
                </div>
              ) : (
                <div className="divide-y divide-[#F2F4F7]">
                  {g.items.map((it) => (
                    <div
                      key={it.id}
                      className="flex items-center gap-3 min-h-[44px] py-1"
                    >
                      <span className="flex-1 text-[15px] sm:text-[16px] text-[#15304C]">
                        {it.name}
                      </span>
                      <span className="text-[15px] font-semibold text-[#15304C] whitespace-nowrap tabular-nums">
                        {formatTry(it.price)}
                      </span>
                      {it.locked ? (
                        <span className="w-[44px] text-center text-[13px] text-[#5A6472]">
                          dahil
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onRemoveModule(it.id)}
                          aria-label={`${it.name} kaldır`}
                          className="w-[44px] h-[44px] rounded-[10px] border border-[#CBD3DD] bg-white text-[#34465A] text-[18px] cursor-pointer flex items-center justify-center hover:bg-[#F2F4F7]"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Geçiş Takvimi ve Destek */}
        <section className="bg-white border border-[#DDE2E9] rounded-[18px] p-4 sm:p-6">
          <h2 className="text-[20px] font-bold text-[#15304C] font-condensed">
            Geçiş takvimi ve destek
          </h2>
          <p className="mt-1 text-[14px] sm:text-[15px] text-[#5A6472] mb-5">
            {MIGRATION_SLA_TEXT}
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-2.5">
            {MIGRATION_TIMELINE.map((t) => (
              <li key={t.day} className="flex sm:flex-col gap-3 sm:gap-1.5">
                <div className="flex items-center gap-1.5 pt-1 sm:pt-0 shrink-0">
                  <span className="w-3 h-3 rounded-full bg-[#2457D6] shrink-0" />
                  <span className="hidden sm:block flex-1 h-[2px] bg-[#CBD3DD]" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-[#2457D6]">
                    {t.day}
                  </div>
                  <div className="text-[15px] font-semibold text-[#15304C]">
                    {t.label}
                  </div>
                  <div className="text-[13px] leading-snug text-[#5A6472] mt-0.5">
                    {t.note}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Esnek Paket & Kilitlenme Yok */}
        <section className="bg-white border border-[#DDE2E9] rounded-[18px] p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <h2 className="text-[17px] font-bold text-[#15304C] mb-1">
              {SUMMARY_POLICIES.flexibleTitle}
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#5A6472]">
              {SUMMARY_POLICIES.flexibleBody}
            </p>
          </div>
          <div>
            <h2 className="text-[17px] font-bold text-[#15304C] mb-1">
              {SUMMARY_POLICIES.noLockInTitle}
            </h2>
            <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#5A6472]">
              {SUMMARY_POLICIES.noLockInBody}
            </p>
          </div>
        </section>

        {/* İletişim Bilgileriniz */}
        <section
          aria-labelledby="contact-form-heading"
          className="bg-white border border-[#DDE2E9] rounded-[18px] p-4 sm:p-6"
        >
          <h2
            id="contact-form-heading"
            className="text-[20px] font-bold text-[#15304C] font-condensed mb-4"
          >
            İletişim bilgileriniz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-[#15304C]">
              Ad soyad *
              <input
                type="text"
                required
                autoComplete="name"
                value={form.contactName}
                onChange={(e) => onFormChange({ contactName: e.target.value })}
                placeholder="Örn. Ahmet Yılmaz"
                className="h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[16px] font-normal text-[#15304C] bg-white"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-[#15304C]">
              Acente adı *
              <input
                type="text"
                required
                autoComplete="organization"
                value={form.agencyName}
                onChange={(e) => onFormChange({ agencyName: e.target.value })}
                placeholder="Örn. Anadolu Turizm"
                className="h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[16px] font-normal text-[#15304C] bg-white"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-[#15304C]">
              Telefon (WhatsApp) *
              <input
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => onFormChange({ phone: e.target.value })}
                placeholder="05XX XXX XX XX"
                className="h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[16px] font-normal text-[#15304C] bg-white"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-[#15304C]">
              E-posta *
              <input
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => onFormChange({ email: e.target.value })}
                placeholder="ornek@acenteadiniz.com"
                className="h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[16px] font-normal text-[#15304C] bg-white"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[14px] font-semibold text-[#15304C]">
              Görüşme zamanı
              <select
                value={form.callWindow}
                onChange={(e) => onFormChange({ callWindow: e.target.value })}
                className="h-[46px] rounded-[10px] border border-[#AEB7C4] px-3 text-[16px] font-normal text-[#15304C] bg-white"
              >
                <option value="Sabah">Sabah</option>
                <option value="Öğleden sonra">Öğleden sonra</option>
                <option value="Akşam">Akşam</option>
              </select>
            </label>
          </div>

          <label className="mt-4 flex items-start gap-2.5 text-[13px] leading-snug text-[#34465A] cursor-pointer">
            <input
              type="checkbox"
              checked={form.kvkkAccepted}
              onChange={(e) => onFormChange({ kvkkAccepted: e.target.checked })}
              className="mt-0.5 h-5 w-5 rounded border-[#AEB7C4] accent-[#2457D6] shrink-0"
            />
            <span>
              <Link
                href="/kvkk"
                target="_blank"
                className="text-[#2457D6] underline font-semibold"
              >
                KVKK Aydınlatma Metni
              </Link>
              &apos;ni okudum, seçtiğim paket özeti üzerinden benimle iletişime
              geçilmesini onaylıyorum.
            </span>
          </label>

          {errorMessage && (
            <div
              role="alert"
              className="mt-4 rounded-[10px] bg-[#FCEFE8] border border-[#F2C7B0] px-4 py-3 text-[14px] font-medium text-[#8A3412]"
            >
              {errorMessage}
            </div>
          )}

          {submitted && (
            <div
              role="status"
              className="lg:hidden mt-4 bg-[#E6F3EB] text-[#144F2E] border border-[#B7DFC7] rounded-[14px] p-4 space-y-3"
            >
              <div className="flex items-center gap-2 font-bold text-[16px]">
                <CheckIcon size={18} />
                <span>Özet gönderildi</span>
              </div>
              <p className="text-[14px] leading-snug">
                <strong>{form.agencyName}</strong> için seçtiğiniz{" "}
                {selectedItems.length} modüllük yapılandırma (
                {formatTry(subtotal)} + KDV / yıl) kaydedildi. Tercih
                ettiğiniz <strong>{form.callWindow.toLowerCase()}</strong>{" "}
                saatlerinde dönüş yapacağız.
              </p>
              <a
                href={whatsappSummaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] rounded-[10px] bg-[#1E7A46] text-white font-bold text-[14px] inline-flex items-center justify-center gap-2"
              >
                <WhatsAppIcon size={18} />
                <span>Özeti WhatsApp ile Gönder</span>
              </a>
            </div>
          )}
        </section>
      </div>

      {/* Sağ Sticky Özet Kartı */}
      <aside className="w-full lg:w-[380px] lg:flex-[0_0_380px] lg:sticky lg:top-6 bg-[#15304C] text-white rounded-[18px] p-5 sm:p-6">
        <h2 className="text-[19px] font-bold font-condensed">Yıllık özet</h2>

        <div className="mt-3 border-t border-dashed border-white/35 pt-2.5 space-y-1.5 text-[15px]">
          {selectedItems.map((it) => (
            <div key={it.id} className="flex justify-between gap-3 py-1">
              <span>{it.name}</span>
              <span className="text-[#D5DEEA] whitespace-nowrap tabular-nums">
                {formatTry(it.price)}
              </span>
            </div>
          ))}
          <div className="flex justify-between gap-3 py-1">
            <span>{SUMMARY_POLICIES.setupLabel}</span>
            <span className="text-[#9BE2B6] font-semibold whitespace-nowrap">
              {SUMMARY_POLICIES.setupValue}
            </span>
          </div>
        </div>

        <div className="mt-3 border-t border-dashed border-white/35 pt-3 text-[15px] tabular-nums space-y-1">
          <div className="flex justify-between text-[#C3CEDC]">
            <span>Ara toplam (KDV hariç)</span>
            <span className="font-semibold text-white">
              {formatTry(subtotal)}
            </span>
          </div>
          {siteConfig.showVatBreakdown && (
            <>
              <div className="flex justify-between text-[#C3CEDC]">
                <span>KDV (%{Math.round(siteConfig.vatRate * 100)})</span>
                <span>{formatTry(vatAmount)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-2">
                <span className="text-[16px] font-semibold">Yıllık toplam</span>
                <span className="text-[30px] font-bold font-condensed">
                  {formatTry(grandTotal)}
                </span>
              </div>
            </>
          )}
          <div className="text-right text-[13px] text-[#C3CEDC] pt-1">
            {SUMMARY_POLICIES.installmentNote}
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-relaxed text-[#C3CEDC]">
          {SUMMARY_POLICIES.microDisclaimer}
        </p>

        {!submitted ? (
          <div className="mt-5 space-y-2">
            <button
              type="button"
              disabled={submitting}
              onClick={onSubmit}
              className="w-full min-h-[50px] rounded-[10px] bg-[#F2A900] hover:bg-[#dca000] text-[#15304C] text-[16px] font-bold cursor-pointer transition-colors disabled:opacity-60"
            >
              {submitting
                ? "Özet gönderiliyor..."
                : "Özeti gönder ve görüşme planla"}
            </button>
            <button
              type="button"
              onClick={onPrev}
              className="w-full min-h-[46px] rounded-[10px] border border-white/35 bg-transparent text-white text-[15px] font-medium cursor-pointer hover:bg-white/10"
            >
              Geri
            </button>
          </div>
        ) : (
          <div
            role="status"
            className="mt-5 bg-[#E6F3EB] text-[#144F2E] rounded-[14px] p-4 space-y-3"
          >
            <div className="flex items-center gap-2 font-bold text-[16px]">
              <CheckIcon size={18} />
              <span>Özet gönderildi</span>
            </div>
            <p className="text-[14px] leading-snug">
              <strong>{form.agencyName}</strong> için seçtiğiniz{" "}
              {selectedItems.length} modüllük yapılandırma (
              {formatTry(subtotal)} + KDV / yıl) kaydedildi. Tercih ettiğiniz{" "}
              <strong>{form.callWindow.toLowerCase()}</strong> saatlerinde
              dönüş yapacağız.
            </p>
            <a
              href={whatsappSummaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[46px] rounded-[10px] bg-[#1E7A46] hover:opacity-95 text-white font-bold text-[14px] inline-flex items-center justify-center gap-2"
            >
              <WhatsAppIcon size={18} />
              <span>Özeti WhatsApp ile Gönder</span>
            </a>
            <Link
              href={`/tesekkurler?tip=ozet&acente=${encodeURIComponent(
                form.agencyName.trim()
              )}&toplam=${subtotal}`}
              className="w-full min-h-[40px] rounded-[8px] border border-[#1E7A46]/30 bg-white text-[#144F2E] text-[13px] font-semibold inline-flex items-center justify-center"
            >
              Onay Ekranını Görüntüle
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
