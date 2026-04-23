import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { BrowserMockup } from '@/components/ui/BrowserMockup';

const packages = [
  {
    name: 'Giriş Paketi',
    audience: 'Başlangıçtaki küçük çaplı acenteler için',
    description:
      'Operasyonunu dijitalleştirmeye yeni başlayan acenteler için sade, hızlı ve güven veren temel kurulum.',
    features: [
      'Temel Admin Paneli',
      'Tur & Yolcu Yönetimi',
      'Tur bazlı gelir gider takibi',
      'Basit Raporlama',
      'PDF Çıktılar',
    ],
    cta: 'Fiyat Teklifi Al',
  },
  {
    name: 'Silver Paket',
    audience: 'Tam kontrol isteyen orta ve büyük acenteler için',
    description:
      'Operasyon, finans ve onay süreçlerini tek merkezde toplamak isteyen ekipler için daha kapsamlı yapı.',
    features: [
      'Modern Admin Paneli',
      'Tam Tur & Yolcu Yönetimi',
      'Gelişmiş Raporlama & Analitik',
      'Finans & Kasa Modülü',
      'Tek tıkla otel oda gruplandırması',
      'Tur sözleşme onayı',
      'Otobüs koltuk şeması',
    ],
    cta: 'Fiyat Teklifi Alın',
    featured: true,
  },
  {
    name: 'Gold Paket',
    audience: 'Satış kanalını da eksiksiz almak isteyen acenteler için',
    description:
      'Silver Paket’teki tüm yapıya ek olarak, admin panelinizle senkron çalışan ve turları tek tıkla yayına alabileceğiniz entegre bir e-ticaret sitesi sunar.',
    features: [
      'Silver Paket’teki her şey',
      'Admin paneliyle entegre e-ticaret sitesi',
      'Turları tek tıkla yayına alma',
      'Online rezervasyon ve ödeme deneyimi',
      'Kurumsal vitrin ve satış sayfaları',
    ],
    cta: 'Gold Paket Teklifi Al',
  },
];

type PackageState = 'included' | 'limited' | 'upgrade' | 'project';

const comparisonRows: Array<{
  label: string;
  entry: PackageState;
  silver: PackageState;
  gold: PackageState;
}> = [
  { label: 'Tur & Yolcu Yönetimi', entry: 'included', silver: 'included', gold: 'included' },
  { label: 'Tur bazlı gelir gider takibi', entry: 'included', silver: 'included', gold: 'included' },
  { label: 'Basit Raporlama', entry: 'included', silver: 'included', gold: 'included' },
  { label: 'Gelişmiş Raporlama & Analitik', entry: 'upgrade', silver: 'included', gold: 'included' },
  { label: 'Tur Sözleşme Onayı', entry: 'limited', silver: 'included', gold: 'included' },
  { label: 'Otel Oda Gruplandırması', entry: 'upgrade', silver: 'included', gold: 'included' },
  { label: 'Araç / Koltuk Planlama', entry: 'limited', silver: 'included', gold: 'included' },
  { label: 'Finans & Kasa Modülü', entry: 'limited', silver: 'included', gold: 'included' },
  { label: 'Gelişmiş B2B Ağı', entry: 'upgrade', silver: 'limited', gold: 'included' },
  { label: 'Entegre E-Ticaret Sitesi', entry: 'upgrade', silver: 'upgrade', gold: 'included' },
  { label: 'Admin panelinden tek tıkla yayınlama', entry: 'upgrade', silver: 'upgrade', gold: 'included' },
  { label: 'Online rezervasyon ve ödeme akışı', entry: 'upgrade', silver: 'upgrade', gold: 'included' },
  { label: 'Özel Sunucu Kurulumu', entry: 'project', silver: 'project', gold: 'project' },
  { label: 'PDF Çıktılar', entry: 'included', silver: 'included', gold: 'included' },
];

function Availability({ state }: { state: PackageState }) {
  const config = {
    included: {
      label: 'Dahil',
      className: 'border-[#d8e8e2] bg-[#f2fbf7] text-[#0a8b60]',
    },
    limited: {
      label: 'Kısıtlı',
      className: 'border-[#dde4ec] bg-[#f7f9fb] text-[#4f5c70]',
    },
    upgrade: {
      label: 'Üst Paket',
      className: 'border-[#e4e9ef] bg-white text-[#7b8697]',
    },
    project: {
      label: 'Özel Projelendirme',
      className: 'border-[#e4e9ef] bg-white text-[#7b8697]',
    },
  }[state];

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium ${config.className}`}>
      {state === 'included' ? <Check className="h-4 w-4" /> : null}
      {config.label}
    </span>
  );
}

export function SolutionsSection() {
  return (
    <section id="solutions" className="section-space bg-white">
      <div className="landing-container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">Çözüm Paketlerimiz</span>
          <h2 className="section-title mt-5">Rakamsal fiyat değil, ihtiyaca uygun çözüm diliyle konuşuyoruz.</h2>
          <p className="section-copy mt-5">
            Paketleri teknik terimlerle değil, acentenin büyüklüğüne ve operasyonel ihtiyacına göre konumlandırdık.
          </p>
        </div>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {packages.map((item) => (
            <article
              key={item.name}
              className={`rounded-[32px] border p-8 shadow-[var(--shadow-card)] ${
                item.featured
                  ? 'border-[#10233f] bg-[#10233f] text-white'
                  : item.name === 'Gold Paket'
                    ? 'border-[#b9dccc] bg-[#f5fbf8] text-[#10233f]'
                    : 'border-[#dfe5ec] bg-[#f8fafc] text-[#10233f]'
              }`}
            >
              <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${item.featured ? 'text-white/64' : 'text-[#7b8697]'}`}>
                {item.audience}
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">{item.name}</h3>
              <p className={`mt-4 text-[15px] leading-8 ${item.featured ? 'text-white/76' : 'text-[#627186]'}`}>{item.description}</p>

              <ul className="mt-8 space-y-4">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${
                        item.featured ? 'bg-white/12' : item.name === 'Gold Paket' ? 'bg-[#dff3ea]' : 'bg-[#e9edf2]'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className={`text-sm leading-7 ${item.featured ? 'text-white/84' : 'text-[#10233f]'}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="#contact" className={`mt-8 inline-flex ${item.featured || item.name === 'Gold Paket' ? 'btn-primary' : 'btn-secondary'}`}>
                {item.cta}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <div className="surface-card p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Gold Paket Vurgusu</p>
                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-[#10233f]">
                  Eksiksiz admin panelinin yanına, onunla senkron çalışan satış siteniz de gelir.
                </h3>
                <p className="mt-4 text-[15px] leading-8 text-[#627186]">
                  Gold Paket alan müşteriniz yalnızca operasyon paneli değil, o panelde oluşturduğu turları tek tıkla
                  yayına alabileceği modern bir e-ticaret sitesi de alır. Ürünler, turlar ve satış deneyimi admin
                  paneliyle aynı akışın parçası olarak çalışır.
                </p>
              </div>

              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {[
                  'Turları panelden yönetip doğrudan yayına alma',
                  'Online rezervasyon ve ödeme deneyimi',
                  'Kurumsal vitrin, güçlü tur listeleme ve detay sayfaları',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[#e4e9ef] bg-[#f8fafc] px-4 py-4 text-sm font-medium text-[#10233f]"
                  >
                    <Check className="h-4 w-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="surface-card overflow-hidden p-3 md:p-4">
            <div className="px-2 pb-3 pt-1 md:px-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8697]">Gold Paket Public Site</p>
              <p className="mt-2 text-sm leading-7 text-[#627186]">
                Kurumsal ana sayfa, vitrin yapısı ve güçlü kampanya alanlarıyla tur satışını daha profesyonel gösteren
                modern public site deneyimi.
              </p>
            </div>
            <BrowserMockup url="acenteniz.com" className="shadow-none">
              <div className="relative aspect-[16/8.7] overflow-hidden bg-white">
                <Image
                  src="/public-site-hero.png"
                  alt="TurPilot e-ticaret sitesi ana sayfa görünümü"
                  fill
                  className="object-contain object-top"
                  sizes="(min-width: 1024px) 82vw, 100vw"
                />
              </div>
            </BrowserMockup>
          </div>

          <div className="surface-card overflow-hidden p-3 md:p-4">
            <div className="px-2 pb-3 pt-1 md:px-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b8697]">Tur Listeleme ve Satış Akışı</p>
              <p className="mt-2 text-sm leading-7 text-[#627186]">
                Filtrelenebilir tur listeleme, güçlü detay kartları ve rezervasyona yönlendiren satış akışı aynı panel
                verisiyle beslenir.
              </p>
            </div>
            <BrowserMockup url="acenteniz.com/turlar" className="shadow-none">
              <div className="relative aspect-[16/8.7] overflow-hidden bg-white">
                <Image
                  src="/public-site-grid.png"
                  alt="TurPilot e-ticaret sitesi tur listeleme görünümü"
                  fill
                  className="object-contain object-top"
                  sizes="(min-width: 1024px) 82vw, 100vw"
                />
              </div>
            </BrowserMockup>
          </div>
        </div>

        <div className="surface-card mt-10 overflow-hidden">
          <div className="border-b border-[#e4e9ef] px-6 py-6">
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[#10233f]">Ticari özellik karşılaştırması</h3>
            <p className="mt-2 text-sm leading-7 text-[#627186]">
              Kod ve altyapı dili yerine, acentenizin satın alma kararını etkileyen ticari başlıklara odaklandık.
            </p>
          </div>

          <div className="overflow-x-auto px-4 pb-4 md:px-6 md:pb-6">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Özellik</th>
                  <th>Giriş Paketi</th>
                  <th>Silver Paket</th>
                  <th>Gold Paket</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td>{row.label}</td>
                    <td>
                      <Availability state={row.entry} />
                    </td>
                    <td>
                      <Availability state={row.silver} />
                    </td>
                    <td>
                      <Availability state={row.gold} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
