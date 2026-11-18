import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F2F4F7] text-[#15304C]">
      <SiteHeader variant="light" />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-8 py-20">
        <div className="max-w-[540px] w-full bg-white border border-[#DDE2E9] rounded-[18px] p-8 sm:p-10 text-center">
          <p className="text-[14px] font-bold text-[#2457D6] tabular-nums">
            404
          </p>
          <h1 className="mt-2 text-[28px] sm:text-[34px] font-bold text-[#15304C] font-display">
            Bu sayfayı bulamadık.
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[#5A6472]">
            Aradığınız adres taşınmış veya kaldırılmış olabilir. Ana sayfaya
            dönebilir ya da ihtiyacınıza göre sisteminizi oluşturabilirsiniz.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="min-h-[48px] px-6 rounded-[10px] border border-[#DDE2E9] bg-white hover:bg-[#F2F4F7] text-[#15304C] text-[15px] font-semibold inline-flex items-center justify-center"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/sistemini-olustur"
              className="min-h-[48px] px-6 rounded-[10px] bg-[#F2A900] hover:bg-[#dca000] text-[#15304C] text-[15px] font-bold inline-flex items-center justify-center"
            >
              Sistemini Oluştur
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
