export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  agency: string;
}

export interface PreviewSlide {
  src: string;
  label: string;
  alt: string;
}

export const siteConfig = {
  brandName: "TurPilot",
  domain: "turpilot.site",
  siteUrl: "https://turpilot.site",
  appDomain: "app.turpilot.site/acenteniz",
  phoneDisplay: "+90 850 885 3455",
  phoneHref: "tel:+908508853455",
  whatsappNumber: "908508853455",
  email: "info@turpilot.site",
  notifyEmails: ["info@turpilot.site", "celal2004@gmail.com"],
  formspreeFallbackUrl: "https://formspree.io/f/mnjqazgp",
  instagramUrl: "https://www.instagram.com/turpilot.site",
  instagramHandle: "@turpilot.site",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "",
  /**
   * Pilot acente yorumları görünürlüğü.
   */
  showTestimonials: true,
  testimonials: [
    {
      quote:
        "Turlardaki kahvaltı ve ATV gibi ekstra etkinlikleri yolculara tek bir link üzerinden sunmaya başladıktan sonra çok güzel geri dönüşler aldık. Yolcular daha tura çıkmadan düzenli ve teknolojik bir acenteyle çalıştıklarını hissediyor.",
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
   * Gerçek ekran görüntüleri eşlemesi (birden fazla görsel için sekmeli/oklu galeri açılır).
   */
  previewAssets: {
    heroDashboard: [
      {
        src: "/images/admin-dashboard.png",
        label: "Admin Dashboard",
        alt: "TurPilot Admin Paneli Dashboard ekranı: toplam tur, aktif turlar, gelir-gider ve yaklaşan seferler",
      },
    ],
    publicShowcase: [
      {
        src: "/images/public-hero-mardin.jpg",
        label: "Ana Vitrin & Slider",
        alt: "TurPilot Public Site ana vitrin ve şehir slider görünümü",
      },
      {
        src: "/images/public-populer-turlar.jpg",
        label: "Popüler Turlar & Fiyatlar",
        alt: "TurPilot Public Site popüler turlar kartları ve kalkış noktası görünümü",
      },
    ],
    admin: [
      {
        src: "/images/admin-dashboard.png",
        label: "Panel & Net Kâr/Zarar",
        alt: "TurPilot Admin Paneli gelir, gider, net kâr/zarar ve yaklaşan seferler ekranı",
      },
    ],
    public: [
      {
        src: "/images/public-populer-turlar.jpg",
        label: "Tur Kartları & Fiyatlar",
        alt: "Public Site popüler turlar vitrini",
      },
      {
        src: "/images/public-hero-mardin.jpg",
        label: "Özel Alan Adı Ana Vitrin",
        alt: "Public Site tam ekran slider vitrini",
      },
    ],
    hotel: [] as PreviewSlide[],
    dealer: [] as PreviewSlide[],
    room: [
      {
        src: "/images/oda-gruplandirma.png",
        label: "Oda Gruplandır & PDF",
        alt: "TurPilot 29 renkli oda gruplandırma ve kaptan/rehber personel odalama ekranı",
      },
    ],
    bulk: [
      {
        src: "/images/toplu-sefer.jpg",
        label: "Toplu Sefer Takvimi",
        alt: "TurPilot şablondan çoklu tarih seçerek toplu sefer oluşturma ekranı",
      },
    ],
    stops: [
      {
        src: "/images/durak-ozeti.png",
        label: "Panel Durak Özeti",
        alt: "TurPilot sefer içi saatli durak özeti görünümü",
      },
      {
        src: "/images/durak-tablo-pdf.png",
        label: "Durak & Harita Çıktısı",
        alt: "TurPilot tıklanabilir Google Maps bağlantılı durak ve güzergah raporu",
      },
    ],
    pdf: [
      {
        src: "/images/durak-tablo-pdf.png",
        label: "Durak & Güzergah Çıktısı",
        alt: "TurPilot yazdırılabilir ve tıklanabilir durak güzergah listesi",
      },
    ],
    whatsapp: [] as PreviewSlide[],
    refund: [] as PreviewSlide[],
    pos: [] as PreviewSlide[],
  },
} as const;

export type PreviewAssetKey = keyof typeof siteConfig.previewAssets;

export function getWhatsappUrl(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
