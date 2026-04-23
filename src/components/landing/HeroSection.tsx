import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { BrowserMockup } from '@/components/ui/BrowserMockup';

const quickBenefits = [
  'Karabük Teknokent bünyesinde geliştirildi',
  '7/24 teknik destek',
  'TÜRSAB acentelerine uygun akışlar',
];

export function HeroSection() {
  return (
    <section className="hero-section relative overflow-hidden">
      <div className="landing-container">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div className="hero-copy-stack min-w-0">
            <div className="hero-heading-block">
              <span className="section-kicker hero-kicker">Kurumsal Tur Operasyon Altyapısı</span>

              <div className="space-y-5">
                <h1 className="section-title hero-title max-w-3xl">
                  Tur Operasyonlarındaki Kaosu Bitirin. Excel&apos;i Bırakın, Satışa Odaklanın.
                </h1>
                <h2 className="max-w-3xl text-lg leading-8 text-[#627186] sm:text-xl">
                  Tur sözleşmelerinizi WhatsApp&apos;tan hukuki olarak onaylatan, otel/araç planlamasını otomatize eden
                  ve banka komisyonlarını yöneten Karabük Teknokent onaylı acente altyapısı.
                </h2>
              </div>
            </div>

            <div className="flex flex-col gap-3.5 md:flex-row">
              <Link href="#contact" className="btn-primary">
                Ücretsiz Canlı Demo Planla
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#solutions" className="btn-secondary">
                Çözüm Paketlerini Gör
              </Link>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {quickBenefits.map((item) => (
                <div key={item} className="rounded-[26px] border border-[#dfe5ec] bg-white px-4 py-3.5 text-[0.94rem] font-medium leading-6 text-[#4f5c70] shadow-[var(--shadow-subtle)]">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#eef2f6] text-[#10233f]">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-w-0">
            <div className="surface-card p-3">
              <BrowserMockup url="admin.turpilot.com.tr/dashboard" className="shadow-none">
                <div className="relative aspect-[16/10] overflow-hidden bg-white">
                  <Image
                    src="/dashboard-karabuk.png"
                    alt="TurPilot dashboard görünümü"
                    fill
                    priority
                    className="object-contain object-top"
                    sizes="(min-width: 1024px) 44vw, 100vw"
                  />
                </div>
              </BrowserMockup>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-[#dfe5ec] bg-white px-5 py-5 shadow-[var(--shadow-subtle)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8697]">Karabük Teknokent</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-[#10233f]">
                  Yerel sektör ihtiyacına göre geliştirilen kurumsal operasyon altyapısı
                </p>
              </div>
              <div className="rounded-[24px] border border-[#dfe5ec] bg-white px-5 py-5 shadow-[var(--shadow-subtle)]">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8697]">Finans Görünürlüğü</p>
                <p className="mt-3 text-lg font-semibold tracking-[-0.04em] text-[#10233f]">
                  Komisyon, gelir, gider ve karlılık akışlarında daha net kontrol
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
