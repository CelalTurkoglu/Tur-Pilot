'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Bus,
  CheckCircle2,
  CreditCard,
  Loader2,
  Plane,
  ShieldCheck,
  Sparkles,
  Store,
  ToggleRight,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type BillingPeriod = 'monthly' | 'yearly';
type VerticalCode = 'vertical.culture' | 'vertical.hajj_umrah' | 'vertical.flight_international';
type BasePackageCode = 'base.panel' | 'base.panel_storefront';
type ThemeCode = 'theme.standard' | 'theme.premium';

type QuoteLine = {
  code: string;
  name: string;
  total_cents: number;
  tax_rate_bps: number;
};

type QuoteResponse = {
  quote_uid: string;
  currency: 'TRY';
  billing_period: BillingPeriod;
  subtotal_cents: number;
  tax_cents: number;
  total_cents: number;
  line_items: QuoteLine[];
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.turpilot.site/api';

const verticalOptions = [
  {
    code: 'vertical.culture' as const,
    title: 'Kültür Turu',
    description: 'Otobüslü operasyon, koltuk/durak takibi ve tur finansı.',
    icon: Bus,
  },
  {
    code: 'vertical.hajj_umrah' as const,
    title: 'Hac / Umre',
    description: 'Kafile, vize ve oda planlama süreçlerine uygun iskelet.',
    icon: Users,
  },
  {
    code: 'vertical.flight_international' as const,
    title: 'Uçaklı Tur',
    description: 'PNR, uçuş segmentleri ve yurtdışı operasyon takibi.',
    icon: Plane,
  },
];

const addonOptions = [
  {
    code: 'addon.ai_reputation',
    title: 'AI İtibar Yönetimi',
    description: 'Yorum analizi ve yanıt önerileri.',
    icon: Bot,
  },
  {
    code: 'addon.tachograph',
    title: 'Dijital Takograf',
    description: 'Takograf veri analizi ve operasyon denetimi.',
    icon: ToggleRight,
  },
  {
    code: 'addon.hotel_sales',
    title: 'Otel Satış',
    description: 'Otel satış ve allotment süreçleri.',
    icon: Store,
  },
  {
    code: 'addon.b2b_dealer',
    title: 'B2B Bayi',
    description: 'Alt bayi ve sub-agent satış ağı.',
    icon: Users,
  },
];

const money = (cents?: number) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(Number(cents || 0) / 100);

export default function PricingPage() {
  const [vertical, setVertical] = useState<VerticalCode>('vertical.culture');
  const [basePackage, setBasePackage] = useState<BasePackageCode>('base.panel_storefront');
  const [theme, setTheme] = useState<ThemeCode>('theme.standard');
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>('monthly');
  const [addons, setAddons] = useState<string[]>(['addon.ai_reputation']);
  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const hasStorefront = basePackage === 'base.panel_storefront';
  const addonKey = addons.join('|');
  const activeVertical = useMemo(
    () => verticalOptions.find((item) => item.code === vertical),
    [vertical],
  );

  useEffect(() => {
    if (!hasStorefront) {
      setTheme('theme.standard');
    }
  }, [hasStorefront]);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}/billing/calculate-quote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            vertical,
            base_package: basePackage,
            theme: hasStorefront ? theme : null,
            billing_period: billingPeriod,
            addons,
          }),
          signal: controller.signal,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data?.error || 'Fiyat hesaplanamadı');
        }
        setQuote(data);
      } catch (quoteError) {
        if ((quoteError as Error).name !== 'AbortError') {
          setQuote(null);
          setError((quoteError as Error).message || 'Fiyat hesaplanamadı');
        }
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [vertical, basePackage, theme, billingPeriod, addonKey, hasStorefront, addons]);

  const toggleAddon = (code: string) => {
    setAddons((current) =>
      current.includes(code) ? current.filter((item) => item !== code) : [...current, code],
    );
  };

  const startCheckout = async () => {
    if (!quote) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/billing/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quote_uid: quote.quote_uid,
          vertical,
          base_package: basePackage,
          theme: hasStorefront ? theme : null,
          billing_period: billingPeriod,
          addons,
          idempotency_key: `turpilot_pricing_${quote.quote_uid}`,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail || data?.error || 'Checkout oturumu başlatılamadı');
      }
      if (data?.checkout_url) {
        window.location.href = data.checkout_url;
        return;
      }
      setError('Ödeme sağlayıcı yönlendirme URL’i henüz yapılandırılmamış. Demo için ekibimizle iletişime geçebilirsiniz.');
    } catch (checkoutError) {
      setError((checkoutError as Error).message || 'Checkout oturumu başlatılamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f4f6f8] pb-16 pt-24">
      <section className="landing-container">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#627186] hover:text-[#10233f]">
          <ArrowLeft className="h-4 w-4" />
          Ana sayfaya dön
        </Link>

        <div className="mx-auto max-w-3xl text-center">
          <span className="section-kicker">
            <Sparkles className="mr-2 h-4 w-4" />
            Dinamik Paket Sihirbazı
          </span>
          <h1 className="section-title mt-5">Acentenize uygun TurPilot paketini canlı hesaplayın.</h1>
          <p className="section-copy mt-5">
            Seçimleriniz değiştikçe TurPilot billing motoru TRY/kuruş standardıyla anlık teklif üretir.
          </p>
        </div>
      </section>

      <section className="landing-container mt-12 grid gap-8 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="surface-card p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#10233f]">1. Acente türü</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {verticalOptions.map((option) => {
                const Icon = option.icon;
                const active = vertical === option.code;
                return (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setVertical(option.code)}
                    className={`rounded-[24px] border p-5 text-left transition ${
                      active ? 'border-[#0ea472] bg-[#f2fbf7]' : 'border-[#dfe5ec] bg-white hover:border-[#0ea472]/50'
                    }`}
                  >
                    <Icon className={active ? 'text-[#0ea472]' : 'text-[#627186]'} />
                    <h3 className="mt-4 text-lg font-semibold text-[#10233f]">{option.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#627186]">{option.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="surface-card p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#10233f]">2. Temel paket</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => setBasePackage('base.panel')}
                className={`rounded-[24px] border p-5 text-left transition ${
                  basePackage === 'base.panel' ? 'border-[#0ea472] bg-[#f2fbf7]' : 'border-[#dfe5ec] bg-white hover:border-[#0ea472]/50'
                }`}
              >
                <CreditCard className="text-[#10233f]" />
                <h3 className="mt-4 text-lg font-semibold text-[#10233f]">Sadece Arka Ofis Paneli</h3>
                <p className="mt-2 text-sm leading-6 text-[#627186]">Operasyon, yolcu, finans ve raporlama paneli.</p>
              </button>
              <button
                type="button"
                onClick={() => setBasePackage('base.panel_storefront')}
                className={`rounded-[24px] border p-5 text-left transition ${
                  hasStorefront ? 'border-[#0ea472] bg-[#f2fbf7]' : 'border-[#dfe5ec] bg-white hover:border-[#0ea472]/50'
                }`}
              >
                <Store className="text-[#10233f]" />
                <h3 className="mt-4 text-lg font-semibold text-[#10233f]">Panel + E-Ticaret Vitrini</h3>
                <p className="mt-2 text-sm leading-6 text-[#627186]">Public satış sitesi, rezervasyon ve online ödeme akışı.</p>
              </button>
            </div>

            {hasStorefront && (
              <div className="mt-5 rounded-[24px] border border-[#dfe5ec] bg-[#f7f9fb] p-4">
                <p className="text-sm font-semibold text-[#10233f]">Tema seçimi</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {[
                    ['theme.standard', 'Standart Tema', 'Başlangıç için ücretsiz vitrin.'],
                    ['theme.premium', 'Premium Tema', 'Gelişmiş vitrin deneyimi.'],
                  ].map(([code, title, description]) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setTheme(code as ThemeCode)}
                      className={`rounded-[18px] border bg-white p-4 text-left ${
                        theme === code ? 'border-[#0ea472]' : 'border-[#dfe5ec]'
                      }`}
                    >
                      <span className="font-semibold text-[#10233f]">{title}</span>
                      <span className="mt-1 block text-xs leading-5 text-[#627186]">{description}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="surface-card p-6">
            <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#10233f]">3. Ek modüller</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {addonOptions.map((addon) => {
                const Icon = addon.icon;
                const active = addons.includes(addon.code);
                return (
                  <button
                    key={addon.code}
                    type="button"
                    onClick={() => toggleAddon(addon.code)}
                    className={`rounded-[24px] border p-5 text-left transition ${
                      active ? 'border-[#0ea472] bg-[#f2fbf7]' : 'border-[#dfe5ec] bg-white hover:border-[#0ea472]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Icon className={active ? 'text-[#0ea472]' : 'text-[#627186]'} />
                      <span className={`flex h-6 w-12 rounded-full p-1 ${active ? 'bg-[#0ea472]' : 'bg-[#d8dfe8]'}`}>
                        <span className={`h-4 w-4 rounded-full bg-white transition ${active ? 'translate-x-6' : ''}`} />
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[#10233f]">{addon.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#627186]">{addon.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="surface-card h-fit p-6 xl:sticky xl:top-28">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#7b8697]">Canlı teklif</p>
              <h2 className="mt-1 text-2xl font-semibold text-[#10233f]">{activeVertical?.title}</h2>
            </div>
            {loading ? <Loader2 className="h-6 w-6 animate-spin text-[#0ea472]" /> : <CheckCircle2 className="h-6 w-6 text-[#0ea472]" />}
          </div>

          <div className="mt-5 grid grid-cols-2 rounded-full bg-[#eef2f6] p-1">
            {[
              ['monthly', 'Aylık'],
              ['yearly', 'Yıllık'],
            ].map(([period, label]) => (
              <button
                key={period}
                type="button"
                onClick={() => setBillingPeriod(period as BillingPeriod)}
                className={`rounded-full py-2 text-sm font-semibold ${
                  billingPeriod === period ? 'bg-white text-[#10233f] shadow-[var(--shadow-subtle)]' : 'text-[#627186]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && <div className="mt-5 rounded-[20px] border border-red-100 bg-red-50 p-4 text-sm leading-6 text-red-700">{error}</div>}

          <div className="mt-5 space-y-3">
            {quote?.line_items?.map((line) => (
              <div key={line.code} className="flex items-start justify-between gap-4 text-sm">
                <div>
                  <p className="font-semibold text-[#10233f]">{line.name}</p>
                  <p className="text-xs text-[#7b8697]">KDV: %{Number(line.tax_rate_bps || 0) / 100}</p>
                </div>
                <span className="font-semibold text-[#10233f]">{money(line.total_cents)}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-[#dfe5ec] pt-5">
            <div className="flex justify-between text-sm text-[#627186]">
              <span>Ara toplam</span>
              <span>{money(quote?.subtotal_cents)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-[#627186]">
              <span>KDV</span>
              <span>{money(quote?.tax_cents)}</span>
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <span className="font-semibold text-[#10233f]">Toplam</span>
              <span className="text-3xl font-bold tracking-[-0.06em] text-[#10233f]">{money(quote?.total_cents)}</span>
            </div>
          </div>

          <button type="button" onClick={startCheckout} disabled={!quote || loading} className="btn-primary mt-6 w-full justify-center disabled:opacity-50">
            Ödeme Oturumu Başlat
            <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-5 flex gap-3 rounded-[20px] border border-[#dfe5ec] bg-[#f7f9fb] p-4 text-sm leading-6 text-[#627186]">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#0ea472]" />
            <p>Hesaplama TurPilot backend fiyat kataloğundan gelir; tutarlar `amount_cents` standardıyla işlenir.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
