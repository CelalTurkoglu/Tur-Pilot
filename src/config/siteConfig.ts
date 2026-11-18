export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  agency: string;
}

export const siteConfig = {
  brandName: "TurPilot",
  domain: "turpilot.site",
  siteUrl: "https://turpilot.site",
  appDomain: "admin.turpilot.com.tr/dashboard",
  phoneDisplay: "+90 850 885 3455",
  phoneHref: "tel:+908508853455",
  whatsappNumber: "908508853455",
  email: "info@turpilot.site",
  instagramUrl: "https://www.instagram.com/turpilot.site",
  instagramHandle: "@turpilot.site",
  /**
   * Pilot acente yorumları görünürlüğü.
   */
  showTestimonials: true,
  testimonials: [
    {
      quote:
        "Önceden iki personel telefonda aynı koltuğu yazınca akşam liste düzeltmekle uğraşıyorduk. Şimdi herkes aynı ekrana bakıyor, kapora kimde kalmış hemen görünüyor.",
      author: "Hakan Demir",
      role: "Acente Sahibi",
      agency: "Karadeniz Rota Turizm",
    },
    {
      quote:
        "Otobüste kağıt listeyle yoklama almak, durak saati değişince tek tek aramak bitti. Masraf fişini telefondan çekip yüklüyorum, ofis akşam zarf beklemiyor.",
      author: "Serdar Kaya",
      role: "Tur Görevlisi",
      agency: "Marmara Gezi",
    },
    {
      quote:
        "Konaklamalı turlarda oda dağılımını ve kaptan odalarını renkli listeden çıkarıp otele atıyoruz. Müşteriye de biniş saatini WhatsApp'tan tek tıkla göndermek çok rahatlattı.",
      author: "Özge Aydın",
      role: "Operasyon Sorumlusu",
      agency: "Anadolu Kültür Turları",
    },
  ] as TestimonialItem[],
  /**
   * KDV oranı ve konfigüratör sepet özeti altında KDV kırılımı görünürlüğü.
   */
  vatRate: 0.2,
  showVatBreakdown: true,
  /**
   * İstemci taraflı özel webhook/API adresi (opsiyonel).
   * Tanımlı değilse form /api/lead uç noktasına gönderilir.
   */
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL || "/api/lead",
  /**
   * Gerçek ekran görüntüleri hazır olduğunda public/images/ altına PNG ekleyip
   * buradaki ilgili anahtara dosya yolunu yazmanız yeterlidir (örn. "/images/admin.png").
   * null iken kodlanmış gerçekçi TurPilot arayüz önizlemeleri render edilir.
   */
  previewAssets: {
    heroDashboard: null as string | null,
    publicShowcase: null as string | null,
    admin: null as string | null,
    public: null as string | null,
    hotel: null as string | null,
    dealer: null as string | null,
    room: null as string | null,
    bulk: null as string | null,
    stops: null as string | null,
    pdf: null as string | null,
    whatsapp: null as string | null,
    refund: null as string | null,
    pos: null as string | null,
  },
} as const;

export type PreviewAssetKey = keyof typeof siteConfig.previewAssets;

export function getWhatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
