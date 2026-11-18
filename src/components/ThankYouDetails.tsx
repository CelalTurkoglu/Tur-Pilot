"use client";

import React, { useSyncExternalStore } from "react";
import { getWhatsappUrl, siteConfig } from "@/config/siteConfig";
import { formatTry } from "@/data/modules";
import { CheckIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

const subscribeEmpty = () => () => {};

export function ThankYouDetails() {
  const searchString = useSyncExternalStore(
    subscribeEmpty,
    () => window.location.search,
    () => ""
  );

  const sp = new URLSearchParams(searchString);
  const type = sp.get("tip");
  const agency = sp.get("acente");
  const totalNum = Number(sp.get("toplam") || "0");
  const subtotal = Number.isFinite(totalNum) && totalNum > 0 ? totalNum : 0;

  const isSummary = type === "ozet";
  const hasSubtotal = subtotal > 0;

  const waMessage = isSummary
    ? `Merhaba TurPilot ekibi, ${
        agency ? `${agency} adına ` : ""
      }sistem yapılandırma özetimi (${
        hasSubtotal ? formatTry(subtotal) + " + KDV / yıl" : "özel paket"
      }) onay sayfasından iletiyorum.`
    : "Merhaba TurPilot ekibi, görüşme talebimi ilettim; uygun olduğunuz saati teyit etmek istiyorum.";

  return (
    <section className="bg-white border border-[#DDE2E9] rounded-[18px] p-6 sm:p-10">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F3EB] text-[#144F2E] text-[13px] font-bold">
        <CheckIcon size={16} />
        <span>Talep Kaydedildi</span>
      </div>

      <h1 className="mt-4 text-[28px] sm:text-[36px] font-bold text-[#15304C] font-display leading-tight">
        {isSummary
          ? "Sistem özetiniz ekibimize ulaştı."
          : "Talebiniz ekibimize ulaştı."}
      </h1>

      <p className="mt-3 text-[16px] leading-relaxed text-[#34465A]">
        {agency ? (
          <>
            <strong>{agency}</strong> için ilettiğiniz bilgiler inceleniyor.
          </>
        ) : (
          <>İlettiğiniz bilgiler inceleniyor.</>
        )}{" "}
        TurPilot ürün ekibimiz tercih ettiğiniz görüşme zamanında telefon veya
        WhatsApp üzerinden sizinle iletişime geçecektir.
      </p>

      {hasSubtotal && (
        <div className="mt-5 rounded-[12px] bg-[#F2F4F7] border border-[#DDE2E9] p-4 flex items-center justify-between gap-4">
          <span className="text-[14px] font-medium text-[#5A6472]">
            Ön Talep Yıllık Ara Toplam (KDV hariç)
          </span>
          <span className="text-[20px] font-bold text-[#15304C] tabular-nums">
            {formatTry(subtotal)} / yıl
          </span>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-[#E8ECF2] flex flex-col sm:flex-row gap-3">
        <a
          href={getWhatsappUrl(waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[48px] px-5 rounded-[10px] bg-[#1E7A46] hover:opacity-95 text-white text-[15px] font-bold inline-flex items-center justify-center gap-2"
        >
          <WhatsAppIcon size={18} />
          <span>WhatsApp Üzerinden Hızlı İletişim</span>
        </a>
        <a
          href={siteConfig.phoneHref}
          className="min-h-[48px] px-5 rounded-[10px] border border-[#DDE2E9] bg-white hover:bg-[#F2F4F7] text-[#15304C] text-[15px] font-semibold inline-flex items-center justify-center gap-2"
        >
          <PhoneIcon size={16} />
          <span>{siteConfig.phoneDisplay}</span>
        </a>
      </div>
    </section>
  );
}
