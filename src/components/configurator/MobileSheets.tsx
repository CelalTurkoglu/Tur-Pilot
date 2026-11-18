"use client";

import React, { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";
import {
  CONFIG_STEPS,
  formatTry,
  type ConfigModule,
  type ModuleId,
} from "@/data/modules";
import { CheckIcon, CloseIcon, LockIcon, PlusIcon } from "@/components/Icons";
import { ModulePreviewFrame } from "@/components/PreviewMockups";

export function MobileDetailSheet({
  moduleItem,
  isSelected,
  onToggle,
  onClose,
}: {
  moduleItem: ConfigModule | null;
  isSelected: boolean;
  onToggle: (id: ModuleId) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!moduleItem) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moduleItem, onClose]);

  if (!moduleItem) return null;

  const priceText = moduleItem.locked
    ? `${formatTry(moduleItem.price)} / yıl`
    : `+${formatTry(moduleItem.price)} / yıl`;

  return (
    <div
      className="lg:hidden fixed inset-0 z-50 bg-[#141821]/55 flex flex-col justify-end"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={moduleItem.name}
        className="bg-white rounded-t-[20px] max-h-[90vh] overflow-y-auto flex flex-col text-[#15304C]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 pt-2.5 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#CBD3DD] mx-auto mb-1.5" />
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium text-[#5A6472]">
              {CONFIG_STEPS[moduleItem.step].label}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-2 text-[#2457D6] text-[14px] font-semibold cursor-pointer inline-flex items-center gap-1"
            >
              <span>Kapat</span>
              <CloseIcon size={16} />
            </button>
          </div>
        </div>

        <div className="px-4">
          <ModulePreviewFrame moduleId={moduleItem.id} compact />
        </div>

        <div className="px-4 pt-3.5 pb-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[18px] font-bold leading-snug">
              {moduleItem.name}
            </h2>
            <span className="text-[15px] font-bold whitespace-nowrap tabular-nums">
              {priceText}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="bg-[#FCEFE8] rounded-[10px] px-3 py-2.5">
              <div className="text-[12px] font-bold text-[#8A3412]">Sorun</div>
              <div className="mt-0.5 text-[14px] leading-snug text-[#5C2510]">
                {moduleItem.pain}
              </div>
            </div>
            <div className="bg-[#E6F3EB] rounded-[10px] px-3 py-2.5">
              <div className="text-[12px] font-bold text-[#1E7A46]">Çözüm</div>
              <div className="mt-0.5 text-[14px] leading-snug text-[#144F2E]">
                {moduleItem.solution}
              </div>
            </div>
          </div>

          <ul className="mt-3 pl-5 list-disc space-y-1 text-[13px] leading-relaxed text-[#34465A]">
            {moduleItem.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-[#DDE2E9] px-4 py-3">
          {moduleItem.locked ? (
            <div className="min-h-[48px] flex items-center justify-center gap-2 rounded-[10px] bg-[#E8ECF2] text-[#34465A] text-[14px] font-semibold">
              <LockIcon size={16} />
              <span>Her pakete dahil</span>
            </div>
          ) : (
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => onToggle(moduleItem.id)}
              className={`w-full min-h-[48px] rounded-[10px] border border-[#2457D6] text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                isSelected
                  ? "bg-white text-[#2457D6]"
                  : "bg-[#2457D6] text-white"
              }`}
            >
              {isSelected ? (
                <>
                  <CheckIcon size={16} />
                  <span>Eklendi, kaldırmak için dokunun</span>
                </>
              ) : (
                <>
                  <PlusIcon size={16} />
                  <span>Pakete ekle</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function MobileCartSheet({
  open,
  items,
  subtotal,
  vatAmount,
  grandTotal,
  onRemove,
  onClose,
}: {
  open: boolean;
  items: ConfigModule[];
  subtotal: number;
  vatAmount: number;
  grandTotal: number;
  onRemove: (id: ModuleId) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-50 bg-[#141821]/55 flex flex-col justify-end"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sepetiniz"
        className="bg-white rounded-t-[20px] px-4 pt-2.5 pb-6 max-h-[82vh] overflow-y-auto text-[#15304C]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 rounded-full bg-[#CBD3DD] mx-auto mb-2.5" />
        <div className="flex items-center justify-between pb-2">
          <h2 className="text-[18px] font-bold">Sepetiniz</h2>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-2 text-[#2457D6] text-[14px] font-semibold cursor-pointer"
          >
            Kapat
          </button>
        </div>

        <div className="divide-y divide-[#E8ECF2]">
          {items.map((it) => (
            <div
              key={it.id}
              className="flex items-center gap-2.5 min-h-[48px] py-1.5 text-[14px]"
            >
              <span className="flex-1 font-medium">{it.name}</span>
              <span className="text-[#34465A] whitespace-nowrap tabular-nums">
                {formatTry(it.price)}
              </span>
              {it.locked ? (
                <span className="w-[44px] text-center text-[12px] text-[#5A6472]">
                  dahil
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onRemove(it.id)}
                  aria-label={`${it.name} kaldır`}
                  className="w-[44px] h-[44px] rounded-[8px] border border-[#CBD3DD] bg-white text-[#34465A] text-[18px] cursor-pointer flex items-center justify-center"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pt-3 mt-1 border-t border-[#DDE2E9] space-y-1 text-[14px] tabular-nums">
          <div className="flex justify-between text-[#5A6472]">
            <span>Ara toplam (KDV hariç)</span>
            <span>{formatTry(subtotal)}</span>
          </div>
          {siteConfig.showVatBreakdown && (
            <>
              <div className="flex justify-between text-[#5A6472]">
                <span>KDV (%{Math.round(siteConfig.vatRate * 100)})</span>
                <span>{formatTry(vatAmount)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 text-[#15304C]">
                <span className="font-bold">Yıllık toplam</span>
                <span className="text-[20px] font-bold">
                  {formatTry(grandTotal)}
                </span>
              </div>
            </>
          )}
          <p className="text-right text-[12px] text-[#5A6472] pt-1">
            Kredi kartınızla, bankanız üzerinden taksitle ödeyebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
