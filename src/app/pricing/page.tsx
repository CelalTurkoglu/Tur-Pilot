'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/landing/Footer';
import {
  Check,
  X,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building2,
  Users,
  Flame,
  ArrowRight,
  HelpCircle,
  Zap,
  Star,
  RefreshCw,
  Gift,
  CalendarCheck
} from 'lucide-react';

export default function PricingPage() {
  const [isCampaignMode, setIsCampaignMode] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 pt-28 pb-20">
        {/* Header Section */}
        <section className="landing-container text-center max-w-4xl mx-auto px-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Kültür Turu Operasyon Altyapısı
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#10233f] tracking-tight leading-tight">
            Şeffaf ve Esnek <span className="text-[#de2a1d]">Acente Paketleri</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#4f5c70] max-w-2xl mx-auto">
            Kültür turları operasyonlarınızı tek merkezden yönetin. Lansman fırsatıyla 3 yıllık sabit fiyat avantajından yararlanın.
          </p>

          {/* Toggle Switch */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-[#d7dee8] shadow-sm">
            <button
              type="button"
              onClick={() => setIsCampaignMode(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                !isCampaignMode
                  ? 'bg-[#10233f] text-white shadow-sm'
                  : 'text-[#4f5c70] hover:text-[#10233f]'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              Standart (İlk Yıl)
            </button>
            <button
              type="button"
              onClick={() => setIsCampaignMode(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                isCampaignMode
                  ? 'bg-[#de2a1d] text-white shadow-sm'
                  : 'text-[#4f5c70] hover:text-[#10233f]'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              3 Yıllık Kampanya
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-400 text-amber-950 rounded-full ml-1">
                Tasarruf!
              </span>
            </button>
          </div>

          <p className="mt-3 text-xs text-[#64748b]">
            {isCampaignMode
              ? '⚡ 3 yıllık tek seferlik ödeme ile sonraki yıllarda yenileme ücreti ödemezsiniz.'
              : 'ℹ️ Standart modda kurulum ücreti + ilk yıl yenileme bedeli gösterilir.'}
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="landing-container max-w-6xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* 1. Giriş Paketi */}
            <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-1">
                  Başlangıç
                </div>
                <h3 className="text-2xl font-bold text-[#10233f]">Giriş Paketi</h3>
                <p className="text-xs text-[#64748b] mt-1 mb-6">
                  Küçük ölçekli tur operasyonları için temel çözüm
                </p>

                <div className="mb-6 pb-6 border-b border-[#f1f5f9]">
                  {!isCampaignMode ? (
                    <div>
                      <div className="text-3xl font-extrabold text-[#10233f]">
                        40.000 ₺ <span className="text-xs font-normal text-[#64748b]">+KDV</span>
                      </div>
                      <p className="text-xs text-[#64748b] mt-1">Kurulum + 15.000 ₺/Yıl Yenileme</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-extrabold text-[#10233f]">
                        55.000 ₺ <span className="text-xs font-normal text-[#64748b]">+KDV</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-2">
                        <CalendarCheck className="w-3.5 h-3.5" /> 3 Yıl Kullanım Hakkı (30.000 ₺ Tasarruf)
                      </div>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 text-sm text-[#334155]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Temel Admin Paneli</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Kültür Turu & Yolcu Kaydı</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>TC Kimlik & Çıkış Noktaları</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>PDF Yolcu Listesi Çıktısı</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-gray-400">
                    <X className="w-4 h-4 text-gray-300 shrink-0" />
                    <span className="line-through">Koltuk Seçimi & Kilidi</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-gray-400">
                    <X className="w-4 h-4 text-gray-300 shrink-0" />
                    <span className="line-through">B2C Web Sitesi Vitrini</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-[#cbd5e1] text-[#10233f] font-bold text-sm hover:bg-[#f8fafc] transition-colors"
                >
                  Bilgi Al
                </Link>
              </div>
            </div>

            {/* 2. Silver Paket (Featured) */}
            <div className="bg-white rounded-3xl border-2 border-[#10233f] p-8 flex flex-col justify-between shadow-xl relative transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#10233f] text-white px-4 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                En Çok Tercih Edilen
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#de2a1d] mb-1">
                  Profesyonel Operasyon
                </div>
                <h3 className="text-2xl font-bold text-[#10233f]">Silver Paket</h3>
                <p className="text-xs text-[#64748b] mt-1 mb-6">
                  Büyüme odaklı kültür turu acenteleri için tam yönetim
                </p>

                <div className="mb-6 pb-6 border-b border-[#f1f5f9]">
                  {!isCampaignMode ? (
                    <div>
                      <div className="text-3xl font-extrabold text-[#10233f]">
                        89.000 ₺ <span className="text-xs font-normal text-[#64748b]">+KDV</span>
                      </div>
                      <p className="text-xs text-[#64748b] mt-1">Kurulum + 25.000 ₺/Yıl Yenileme</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-extrabold text-[#10233f]">
                        114.000 ₺ <span className="text-xs font-normal text-[#64748b]">+KDV</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full mt-2">
                        <CalendarCheck className="w-3.5 h-3.5" /> 3 Yıl Kullanım Hakkı (50.000 ₺ Tasarruf)
                      </div>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 text-sm text-[#334155]">
                  <li className="flex items-center gap-2.5 font-medium text-[#10233f]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Modern React Admin Paneli</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sert Kapasite & Koltuk Kilidi</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>G1 / G2 Çocuk Fiyat Motoru</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-medium text-emerald-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SNG / DBL / TRP Oda & Otel Planlama</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ofis Kasa & Gelir/Gider Analizi</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>B2B Bayi / Komisyon Ağı (3 Bayi)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Taksitli Sanal POS Altyapısı</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-gray-400">
                    <X className="w-4 h-4 text-gray-300 shrink-0" />
                    <span className="line-through">B2C Web Sitesi Vitrini</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#10233f] text-white font-bold text-sm hover:bg-[#1b3a6b] transition-colors shadow-md"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  Hemen Başla
                </Link>
              </div>
            </div>

            {/* 3. Gold Paket */}
            <div className="bg-gradient-to-b from-[#fffbeb] to-white rounded-3xl border border-amber-300 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                  Kurumsal & Vitrin
                </div>
                <h3 className="text-2xl font-bold text-[#10233f]">Gold Paket</h3>
                <p className="text-xs text-[#64748b] mt-1 mb-6">
                  Panel + E-Ticaret web sitesi ile tam dijital dönüşüm
                </p>

                <div className="mb-6 pb-6 border-b border-amber-100">
                  {!isCampaignMode ? (
                    <div>
                      <div className="text-3xl font-extrabold text-[#10233f]">
                        135.000 ₺ <span className="text-xs font-normal text-[#64748b]">+KDV</span>
                      </div>
                      <p className="text-xs text-[#64748b] mt-1">Kurulum + 45.000 ₺/Yıl Yenileme</p>
                    </div>
                  ) : (
                    <div>
                      <div className="text-3xl font-extrabold text-[#10233f]">
                        180.000 ₺ <span className="text-xs font-normal text-[#64748b]">+KDV</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-amber-800 font-semibold bg-amber-100 border border-amber-200 px-2 py-0.5 rounded-full mt-2">
                        <Gift className="w-3.5 h-3.5" /> 3 Yıl Kullanım Hakkı (90.000 ₺ Tasarruf)
                      </div>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 text-sm text-[#334155]">
                  <li className="flex items-center gap-2.5 font-bold text-amber-900">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Silver Paketteki Her Şey Dahil</span>
                  </li>
                  <li className="flex items-center gap-2.5 font-semibold text-[#10233f]">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>B2C E-Ticaret Web Sitesi (Next.js)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Online Tur Satışı & Sanal POS Entegrasyonu</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Müşteri Üyelik & Rezervasyon Portalı</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Genişletilmiş B2B Bayi Ağı (10 Bayi)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Özel Alan Adı (Custom Domain) & SSL</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SEO Optimizasyonu & Mobil Uyumluluk</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/#contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 text-amber-950 font-bold text-sm hover:bg-amber-400 transition-colors shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Gold Pakete Geç
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="landing-container max-w-6xl mx-auto px-4 mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#10233f]">
              Detaylı Özellik Karşılaştırması
            </h2>
            <p className="text-sm text-[#4f5c70] mt-2">
              Kültür turu operasyonları ve e-ticaret gereksinimlerinize en uygun paketi karşılaştırın.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#e2e8f0] shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#e2e8f0]">
                    <th className="p-4 sm:p-5 font-bold text-[#10233f] w-1/2">Operasyonel Modül / Özellik</th>
                    <th className="p-4 sm:p-5 font-bold text-center text-[#10233f] w-1/6">Giriş</th>
                    <th className="p-4 sm:p-5 font-bold text-center text-[#de2a1d] w-1/6 bg-red-50/40">Silver</th>
                    <th className="p-4 sm:p-5 font-bold text-center text-amber-800 w-1/6">Gold</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {/* Kültür Turu Demirbaşları */}
                  <tr className="bg-emerald-50/50">
                    <td colSpan={4} className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                      🎯 Kültür Turu Demirbaş Operasyonları (Dahili)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Sert Kapasite & Koltuk Seçimi / Kilidi</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">G1 / G2 Çocuk Fiyatlandırma Motoru</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Single (SNG) / DBL / TRP Oda & Otel Planlama</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Taksitli Sanal POS Entegrasyonu (iyzico / PayTR)</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>

                  {/* Genel Operasyon */}
                  <tr className="bg-slate-50">
                    <td colSpan={4} className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#64748b]">
                      📋 Yönetim & Raporlama
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Tur & Sefer Planlama</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">TC Kimlik Doğrulama & Yolcu Kaydı</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">PDF Çıktılar (Yolcu Listesi, Fatura)</td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Ofis Kasa & Gelir/Gider Takibi</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">B2B Bayi / Komisyon Ağı</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20 font-semibold text-xs text-[#10233f]">3 Bayi</td>
                    <td className="p-4 text-center font-semibold text-xs text-amber-900">10 Bayi</td>
                  </tr>

                  {/* E-Ticaret & Vitrin */}
                  <tr className="bg-slate-50">
                    <td colSpan={4} className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#64748b]">
                      🌐 B2C E-Ticaret & Web Vitrini
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Acenteye Özel Next.js Web Sitesi</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Online Tur Satışı & Rezervasyon</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-[#10233f]">Müşteri Giriş & Rezervasyon Portalı</td>
                    <td className="p-4 text-center"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center bg-red-50/20"><X className="w-4 h-4 text-gray-300 mx-auto" /></td>
                    <td className="p-4 text-center"><Check className="w-5 h-5 text-emerald-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="landing-container max-w-4xl mx-auto px-4 text-center">
          <div className="bg-[#10233f] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Acenteniz İçin En Doğru Paketi Birlikte Belirleyelim
              </h2>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">
                Operasyonel ihtiyaçlarınızı dinleyelim, 15 dakikalık online demo ile TurPilot'ın gücünü canlı gösterelim.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#de2a1d] text-white font-bold text-base hover:bg-[#b80400] transition-colors shadow-lg"
              >
                Ücretsiz Canlı Demo Planla
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
