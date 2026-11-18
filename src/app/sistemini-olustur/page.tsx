import type { Metadata } from "next";
import React from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ConfiguratorClient } from "@/components/ConfiguratorClient";

export const metadata: Metadata = {
  title: "Sistemini Oluştur — Şeffaf Modüler Fiyat Hesaplayıcı",
  description:
    "Admin Paneli, Public Site, B2B otel ve alt bayi modüllerini ihtiyacınıza göre seçip TurPilot yıllık net fiyatını hemen hesaplayın.",
  alternates: { canonical: "/sistemini-olustur" },
};

export default function ConfiguratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F7] text-[#15304C]">
      <SiteHeader variant="light" activePath="/sistemini-olustur" />

      <div className="flex-1">
        <ConfiguratorClient />
      </div>

      <div className="hidden lg:block">
        <SiteFooter hideMobileWhatsappFab />
      </div>
    </div>
  );
}
