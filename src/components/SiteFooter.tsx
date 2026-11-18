"use client";

import React from "react";
import Link from "next/link";
import { getWhatsappUrl, siteConfig } from "@/config/siteConfig";
import {
  InstagramIcon,
  MailIcon,
  PhoneIcon,
  TurPilotMark,
  WhatsAppIcon,
} from "./Icons";
import { useDemoModal } from "./DemoModal";

export function SiteFooter({
  hideMobileWhatsappFab = false,
}: {
  hideMobileWhatsappFab?: boolean;
}) {
  const { openDemoModal } = useDemoModal();

  return (
    <>
      <footer className="bg-white border-t border-[#DDE2E9] text-[#15304C]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Sol */}
            <div className="md:col-span-4 space-y-3">
              <Link href="/" className="inline-flex items-center min-h-[44px]">
                <TurPilotMark />
              </Link>
              <p className="text-[14px] leading-relaxed text-[#5A6472] max-w-[300px]">
                Otobüslü tur acenteleri için rezervasyon, koltuk planı, saha ve
                ön muhasebe programı.
              </p>
              <p className="text-[13px] text-[#5A6472] pt-2">
                © 2026 {siteConfig.brandName} · {siteConfig.domain}
              </p>
            </div>

            {/* Orta */}
            <div className="md:col-span-4 grid grid-cols-2 gap-6 text-[14px]">
              <div>
                <h3 className="font-bold text-[#15304C] mb-3">Ürün</h3>
                <ul className="space-y-1.5 text-[#34465A]">
                  <li>
                    <Link
                      href="/"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      Ana Sayfa
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ozellikler"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      Özellikler
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/sistemini-olustur"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      Sistemini Oluştur
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#sss"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      Sık Sorulanlar
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-[#15304C] mb-3">Yasal</h3>
                <ul className="space-y-1.5 text-[#34465A]">
                  <li>
                    <Link
                      href="/gizlilik"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      Gizlilik Politikası
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kvkk"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      KVKK Aydınlatma Metni
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/kullanim-sartlari"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      Kullanım Şartları
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cerez-politikasi"
                      className="inline-flex items-center min-h-[36px] hover:text-[#2457D6]"
                    >
                      Çerez Politikası
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sağ */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="text-[14px] font-bold text-[#15304C]">
                İletişim ve Destek
              </h3>
              <div className="flex flex-col gap-1.5 text-[14px] text-[#34465A]">
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-2 min-h-[38px] hover:text-[#2457D6]"
                >
                  <PhoneIcon size={16} className="text-[#2457D6]" />
                  <span>{siteConfig.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 min-h-[38px] hover:text-[#2457D6]"
                >
                  <MailIcon size={16} className="text-[#2457D6]" />
                  <span>{siteConfig.email}</span>
                </a>
                <div className="flex items-center gap-3 pt-1">
                  <a
                    href={getWhatsappUrl(
                      "Merhaba TurPilot ekibi, ürün hakkında bilgi almak istiyorum."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp ile iletişime geçin"
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-[10px] border border-[#DDE2E9] text-[13px] font-semibold text-[#1E7A46] hover:bg-[#E6F3EB]"
                  >
                    <WhatsAppIcon size={16} />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={siteConfig.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TurPilot Instagram"
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-3 rounded-[10px] border border-[#DDE2E9] text-[13px] font-semibold text-[#34465A] hover:bg-[#F2F4F7]"
                  >
                    <InstagramIcon size={16} />
                    <span>{siteConfig.instagramHandle}</span>
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => openDemoModal("Footer - Görüşme Planla")}
                  className="min-h-[44px] px-5 rounded-[10px] bg-[#2457D6] hover:bg-[#1A43A8] text-white text-[14px] font-semibold transition-colors cursor-pointer"
                >
                  Görüşme Planla
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {!hideMobileWhatsappFab && (
        <a
          href={getWhatsappUrl(
            "Merhaba TurPilot ekibi, tur acentemiz için demo görüşmesi talep ediyoruz."
          )}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp ile TurPilot ekibine yazın"
          className="md:hidden fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 min-h-[46px] px-4 rounded-full bg-[#1E7A46] text-white text-[14px] font-semibold shadow-md border border-white/20"
        >
          <WhatsAppIcon size={18} />
          <span>WhatsApp</span>
        </a>
      )}
    </>
  );
}
