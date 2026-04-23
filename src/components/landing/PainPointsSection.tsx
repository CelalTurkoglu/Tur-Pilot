import Image from 'next/image';
import { ArrowRightLeft, BedDouble, FileCheck2, WalletCards } from 'lucide-react';
import { BrowserMockup } from '@/components/ui/BrowserMockup';

const features = [
  {
    icon: FileCheck2,
    title: 'Islak İmza Derdine Son',
    text: 'Yolcularınıza tek tıkla sözleşme onaylatın, hukuki güvencenizi anında sağlayın.',
  },
  {
    icon: BedDouble,
    title: 'Otonom Operasyon',
    text: 'Saniyeler içinde araç planı ve otel odalandırması yapın.',
  },
  {
    icon: WalletCards,
    title: 'Ödeme Kontrolünü Kaybetmeyin',
    text: 'Banka komisyonları ve tahsilat akışlarını tek panelde daha şeffaf şekilde yönetin.',
  },
  {
    icon: ArrowRightLeft,
    title: 'Gelir, Gider ve Ekstra Takibi',
    text: 'Tur içindeki kahvaltı, ATV ve benzeri ekstra kalemleri takip edin; gelir gider görünürlüğünü tek panelde güçlendirin.',
  },
];

export function PainPointsSection() {
  return (
    <section id="features" className="section-space">
      <div className="landing-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Sorun - Çözüm Odaklı Özellikler</span>
          <h2 className="section-title mt-5">Acentenizin en kritik darboğazlarını sade ama güçlü akışlarla çözün.</h2>
          <p className="section-copy mt-5">
            Uzun özellik listeleri yerine, ekibinizin her gün yaşadığı operasyonel sorunları çözen ana başlıklara
            odaklandık.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.92fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article key={feature.title} className="surface-card p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef2f6] text-[#10233f]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Sorun - Çözüm</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[#10233f]">{feature.title}</h3>
                  <p className="mt-4 text-[15px] leading-8 text-[#627186]">{feature.text}</p>
                </article>
              );
            })}
          </div>

          <div className="space-y-5">
            <div className="surface-card p-3">
              <BrowserMockup url="admin.turpilot.com.tr/seferler" className="shadow-none">
                <div className="relative aspect-[16/10] overflow-hidden bg-white">
                  <Image
                    src="/seferler-karabuk.png"
                    alt="TurPilot sefer ve operasyon ekranı"
                    fill
                    className="object-contain object-top"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                </div>
              </BrowserMockup>
            </div>

            <div className="surface-card p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Finans ve Ekstralar</p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#10233f]">
                Tur içi ekstraları kaçırmadan daha sağlıklı karlılık görün.
              </h3>
              <p className="mt-4 text-[15px] leading-8 text-[#627186]">
                Kahvaltı, ATV, transfer ve benzeri ek satış kalemlerini tur bazında takip edin. Ofis giderleriyle
                birlikte düşündüğünüzde, hangi turun gerçekten ne kazandırdığını daha net görün.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[22px] bg-[#f7f9fb] px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8697]">Tur Bazlı Takip</p>
                  <p className="mt-3 text-base font-semibold tracking-[-0.03em] text-[#10233f]">
                    Gelir, gider ve ekstra kalemleri tek tur üzerinden okuyun
                  </p>
                </div>
                <div className="rounded-[22px] bg-[#f7f9fb] px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8697]">Daha Net Karlılık</p>
                  <p className="mt-3 text-base font-semibold tracking-[-0.03em] text-[#10233f]">
                    Operasyon kalitesini finans tarafında da ölçülebilir hale getirin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
