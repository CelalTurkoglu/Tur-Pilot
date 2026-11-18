import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ThankYouDetails } from "@/components/ThankYouDetails";

export const metadata: Metadata = {
  title: "Talebiniz Alındı",
  description:
    "TurPilot görüşme ve paket yapılandırma talebiniz ekibimize ulaştı.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F7] text-[#15304C]">
      <SiteHeader variant="light" />

      <main className="flex-1 max-w-[760px] w-full mx-auto px-4 sm:px-8 py-14 sm:py-20">
        <ThankYouDetails />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="min-h-[46px] px-5 rounded-[10px] border border-[#DDE2E9] bg-white hover:bg-[#E8ECF2] text-[#15304C] text-[15px] font-semibold inline-flex items-center justify-center"
          >
            Ana Sayfaya Dön
          </Link>
          <Link
            href="/sistemini-olustur"
            className="min-h-[46px] px-5 rounded-[10px] bg-[#2457D6] hover:bg-[#1A43A8] text-white text-[15px] font-semibold inline-flex items-center justify-center"
          >
            Sistemini Oluştur&apos;a Dön
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
