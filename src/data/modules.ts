import { siteConfig } from "../config/siteConfig";

export type ModuleId =
  | "admin"
  | "public"
  | "hotel"
  | "dealer"
  | "room"
  | "bulk"
  | "stops"
  | "pdf"
  | "whatsapp"
  | "refund"
  | "pos";

export interface ConfigModule {
  id: ModuleId;
  step: 0 | 1 | 2 | 3;
  name: string;
  shortName: string;
  price: number;
  locked?: boolean;
  pain: string;
  solution: string;
  bullets: [string, string, string];
}

export interface ConfigStep {
  index: 0 | 1 | 2 | 3 | 4;
  label: string;
  mobileLabel: string;
  title: string;
  hint: string;
  optional: boolean;
}

export interface TimelineEntry {
  day: string;
  label: string;
  note: string;
}

export const MODULES: ConfigModule[] = [
  {
    id: "admin",
    step: 0,
    name: "Admin Paneli (Çekirdek Operasyon)",
    shortName: "Admin Paneli",
    price: 30000,
    locked: true,
    pain: "Sefer, koltuk ve ödemeler defter ve Excel’e dağılmış; aynı koltuğa çifte kayıt riski var.",
    solution:
      "Tüm operasyon, 2+1/2+2 koltuk planı ve ön muhasebe tek bulut panelde.",
    bullets: [
      "2+1 ve 2+2 canlı koltuk şeması, çifte satış kilidi ve yan yana oturma kontrolü",
      "Kalkış noktası, saatli durak yönetimi, doğum tarihine göre çocuk ve SNG oda fiyatlaması",
      "Yolcu kapora, parçalı tahsilat, sefer kârlılığı ve personel için kasa gizliliği",
    ],
  },
  {
    id: "public",
    step: 0,
    name: "Public Site (Acenteye Özel B2C Vitrin)",
    shortName: "Public Site",
    price: 15000,
    pain: "Turlarınız sadece telefon ve WhatsApp’tan soruluyor; mesai dışında satış duruyor.",
    solution:
      "Kendi alan adınızda çalışan vitrinden 7/24 online koltuk seçimi ve rezervasyon alın.",
    bullets: [
      "Özel alan adınızla (www.acenteadiniz.com) SSL sertifikalı hazır kurumsal satış sitesi",
      "Panelden girdiğiniz turlar, kalkış şehirleri ve boş koltuklar sitede otomatik güncellenir",
      "Siteden gelen rezervasyon, yorum ve iletişim talepleri doğrudan Admin Paneline düşer",
    ],
  },
  {
    id: "hotel",
    step: 1,
    name: "B2B Otel Satış",
    shortName: "B2B Otel Satış",
    price: 14000,
    pain: "Otel kontratları, sezonluk oda çarpanları ve stop-sale takibi karmaşık Excel’lerde dağılıyor.",
    solution:
      "Otel tanımlama, sezonluk kontrat matrisi, kontenjan ve satış yönetimi tek modülde.",
    bullets: [
      "Hafta içi/sonu net ve satış fiyatları, SGL/DBL/TRPL/QUAD çarpan ve çocuk yaş matrisi",
      "Erken rezervasyon (EB) ve kal-öde (7 kal 6 öde vb.) kampanya kuralları",
      "Günlük kontenjan, Stop-Sale / Sor-Sat takvimi ve müşteri/otel konfirme Voucher PDF'i",
    ],
  },
  {
    id: "dealer",
    step: 1,
    name: "B2B Alt Bayi Ağı",
    shortName: "B2B Alt Bayi Ağı",
    price: 16000,
    pain: "Alt acentelerin sattığı koltukları, komisyonları ve borç/alacak cari hesabını tutmak zor.",
    solution:
      "Bayilerinize özel giriş portalı, kontenjan kotası ve çift yönlü cari defter tek ekranda.",
    bullets: [
      "Alt acentelere özel giriş portalı (role: dealer), tur atama ve kontenjan sınırı",
      "Tura, şablona veya bayiye özel yüzde / kişi başı / rezervasyon başı komisyon kuralları",
      "Merkez/bayi tahsilat ayrımı, kredi limiti kontrolü ve otomatik Borç/Alacak cari defteri",
    ],
  },
  {
    id: "room",
    step: 2,
    name: "Gelişmiş Renkli Oda Gruplandırma & Personel Odalama",
    shortName: "Renkli Oda Gruplandırma",
    price: 2500,
    pain: "Konaklamalı turlarda oda dağılımı ve şoför/rehber odaları kâğıt üzerinde karışıyor.",
    solution:
      "Yolcuları ve tur personelini 29 renk grubuyla ekranda eşleştirip otele tek liste gönderin.",
    bullets: [
      "1–4 kişilik otomatik SNG, DBL, TWN, TRPL, French Bed ve Aile Odası kombinasyonları",
      "Rehber, 1. Kaptan ve 2. Kaptan odalarını aynı Rooming List içinde planlama",
      "Otel resepsiyonuna doğrudan gönderilebilen renkli Oda Grupları PDF çıktısı",
    ],
  },
  {
    id: "bulk",
    step: 2,
    name: "Toplu Sefer Açma (50 Tarih)",
    shortName: "Toplu Sefer Açma",
    price: 2000,
    pain: "Tekrarlayan turlar için her hafta sonu durak ve fiyatları baştan girmek saatler alıyor.",
    solution:
      "Tur şablonundan tek tıkla 50 farklı kalkış tarihine kadar toplu sefer üretin.",
    bullets: [
      "Tek işlemde 50 farklı tarihe tüm kalkış noktaları, duraklar ve çocuk fiyatlarıyla çoğaltma",
      "Çakışan tarihler varsa atomik kontrolle hata yapmadan otomatik uyarma",
      "Şablon bazlı gruplanmış takvim ekranıyla tüm sezon seferlerini tek bakışta yönetme",
    ],
  },
  {
    id: "stops",
    step: 2,
    name: "Durak Saat Senkronizasyonu & Google Maps",
    shortName: "Durak Senkronizasyonu",
    price: 2000,
    pain: "Bir durak saati değiştiğinde o duraktaki tüm yolcuları tek tek güncellemek hata yaptırıyor.",
    solution:
      "Durak saatini güncellediğiniz anda tüm yolcuların biniş saati ve haritası senkronize olur.",
    bullets: [
      "Ara durak biniş saati değiştiğinde o duraktaki tüm yolcuları tek tıkla güncelleme",
      "Her durağa ve güzergaha tıklanabilir Google Maps konum bağlantısı ekleme",
      "Şoför ve rehber için saat sırasına göre dizilmiş net biniş manifestosu",
    ],
  },
  {
    id: "pdf",
    step: 3,
    name: "Gelişmiş PDF & Excel Raporlama",
    shortName: "Gelişmiş PDF & Excel",
    price: 2500,
    pain: "Şoför listesi, rehber listesi, oda listesi ve muhasebe raporu ayrı ayrı elle hazırlanıyor.",
    solution:
      "Rol kapsamına göre filtrelenmiş 7 farklı profesyonel PDF ve Excel raporu tek tıkla hazır.",
    bullets: [
      "Görsel otobüs oturma planı PDF'i ve saatli durak/güzergah manifestosu PDF'i",
      "Sefer gelir-gider mutabakat PDF'i, tahsilat/kırmızı iade makbuzları ve doğum günü listesi",
      "Detaylı muhasebe Excel çıktısı ve ödeme bilgisi seçilebilir resmi Excel yolcu listesi",
    ],
  },
  {
    id: "whatsapp",
    step: 3,
    name: "WhatsApp Canlı Tur Sözleşmesi",
    shortName: "WhatsApp Canlı Sözleşme",
    price: 2000,
    pain: "Otobüste kağıt sözleşme dağıtmak, imzalatmak ve denetimler için arşivlemek zor.",
    solution:
      "Tek tıkla WhatsApp'tan veya toplu otobüs QR koduyla TC doğrulamalı dijital sözleşme onayı alın.",
    bullets: [
      "Yolcuya özel sözleşme bağlantısını tek tıkla WhatsApp üzerinden iletme (wa.me)",
      "Tüm sefer için Toplu QR kod üreterek otobüs binişinde telefondan hızlı onay toplama",
      "TC kimlik doğrulamalı, tarih/saat ve IP adresi kayıtlı denetim arşivi ve PDF listesi",
    ],
  },
  {
    id: "refund",
    step: 3,
    name: "Yolcu İndirim & İade Tahakkuku",
    shortName: "İndirim & İade Tahakkuku",
    price: 2000,
    pain: "Yolcuya sonradan indirim yapıldığında iade edilecek fark ve sefer gideri elle hesaplanıyor.",
    solution:
      "İndirim sonrası fazla tahsilat varsa sistem sefer giderine otomatik \"Yolcu İadesi\" işler.",
    bullets: [
      "Yolcu bazlı neden/açıklama belirterek sonradan indirim tanımlama ve geçmiş takibi",
      "İndirimli tutar ödenenden düşükse aradaki farkı turun giderine otomatik tahakkuk etme",
      "İndirim geri alındığında ilgili gider kaydını denetim iziyle otomatik iptal etme",
    ],
  },
  {
    id: "pos",
    step: 3,
    name: "Sanal POS Taksit Yönetimi",
    shortName: "Sanal POS Taksit",
    price: 2000,
    pain: "Kredi kartı taksit vade farkları ve POS API ayarları ayrı ayrı yönetiliyor.",
    solution:
      "Kendi İyzico, PayTR veya Nkolay hesabınızı bağlayıp 1–12 taksit komisyon matrisini yönetin.",
    bullets: [
      "İyzico, PayTR ve Nkolay sanal POS anahtarlarının AES-256 şifreli güvenli kasada saklanması",
      "1'den 12 taksite kadar vade farkı ve komisyon oranlarını panelden belirleme",
      "Taksitli online ödeme tahsilatı ve işlem geçmişi takibi",
    ],
  },
];

export const CONFIG_STEPS: ConfigStep[] = [
  {
    index: 0,
    label: "Temel",
    mobileLabel: "Temel",
    title: "Temel paketinizi seçin",
    hint: "Admin Paneli her pakete dahildir. Acentenize özel online satış vitrini isteğe bağlıdır.",
    optional: false,
  },
  {
    index: 1,
    label: "B2B",
    mobileLabel: "B2B",
    title: "B2B satış kanalları",
    hint: "Otellere veya alt bayilere satış yapmıyorsanız bu durağı atlayabilirsiniz.",
    optional: true,
  },
  {
    index: 2,
    label: "Operasyon",
    mobileLabel: "Operasyon",
    title: "Operasyonu hızlandıran ek özellikler",
    hint: "Renkli oda dağılımı, toplu sefer açma ve durak saat senkronizasyonu.",
    optional: true,
  },
  {
    index: 3,
    label: "Satış ve iletişim",
    mobileLabel: "Satış",
    title: "Satış ve iletişim ek özellikleri",
    hint: "Raporlama, TC doğrulamalı sözleşme onayı, iade tahakkuku ve sanal POS.",
    optional: true,
  },
  {
    index: 4,
    label: "Özet",
    mobileLabel: "Özet",
    title: "Özet ve geçiş planı",
    hint: "Seçiminizi kontrol edin, özeti gönderin, görüşmeyi planlayın.",
    optional: false,
  },
];

export const MIGRATION_SLA_TEXT =
  "Mevcut Excel veya defter kayıtlarınızın tesliminden itibaren ortalama 2–3 iş günü içinde canlıya geçiş.";

export const MIGRATION_TIMELINE: TimelineEntry[] = [
  {
    day: "Gün 0",
    label: "İlk görüşme",
    note: "Seçiminiz incelenir, paneliniz hazırlanır",
  },
  {
    day: "Gün 1",
    label: "Kayıt teslimi",
    note: "Mevcut Excel veya defter fotoğraflarını iletirsiniz",
  },
  {
    day: "Gün 2",
    label: "Veri aktarımı",
    note: "Tur şablonlarınızı ve yolcularınızı biz yükleriz",
  },
  {
    day: "Gün 3",
    label: "Canlı eğitim",
    note: "Ekibinizle 30 dakikalık ekran paylaşımı eğitimi",
  },
  {
    day: "İlk Tur",
    label: "Sahada destek",
    note: "İlk seferinizde WhatsApp üzerinden yanınızdayız",
  },
];

export const SUMMARY_POLICIES = {
  setupLabel: "Kurulum ve veri taşıma",
  setupValue: "Dahil (Ücretsiz)",
  flexibleTitle: "Esnek paket",
  flexibleBody:
    "İhtiyacınız arttığında yeni modül ve ek özellikleri yıl içinde panelinize ekleyebilirsiniz. Bir sonraki yıllık yenilemede kullanmadığınız eklentileri çıkarabilirsiniz.",
  noLockInTitle: "Kilitlenme yok",
  noLockInBody:
    "Tüm yolcu, rezervasyon, ödeme ve cari verilerinizi dilediğiniz an tek tıkla Excel veya PDF olarak dışa aktarabilirsiniz.",
  microDisclaimer:
    "Bu seçim ön talep özetidir. Görüşmede ihtiyaçlarınızı doğruladıktan sonra sözleşmeniz başlatılır.",
  installmentNote:
    "Kredi kartınızla, bankanız üzerinden taksitle ödeyebilirsiniz.",
} as const;

export function formatTry(amount: number): string {
  return `${Math.round(amount).toLocaleString("tr-TR")} ₺`;
}

export function calculatePackageTotals(
  selectedIds: Iterable<ModuleId>,
  vatRate: number = siteConfig.vatRate
) {
  const selectedSet = new Set<ModuleId>(selectedIds);
  selectedSet.add("admin");

  const selectedModules = MODULES.filter((m) => selectedSet.has(m.id));
  const subtotal = selectedModules.reduce((sum, m) => sum + m.price, 0);
  const vatAmount = Math.round(subtotal * vatRate);
  const grandTotal = subtotal + vatAmount;

  return {
    selectedModules,
    count: selectedModules.length,
    subtotal,
    vatAmount,
    grandTotal,
  };
}

export function buildSummaryWhatsappText(params: {
  selectedIds: ModuleId[];
  agencyName: string;
  contactName: string;
  phone: string;
  email: string;
  callWindow: string;
  includeVat?: boolean;
}): string {
  const { selectedModules, subtotal, vatAmount, grandTotal } =
    calculatePackageTotals(params.selectedIds);
  const includeVat = params.includeVat ?? siteConfig.showVatBreakdown;

  const lines: string[] = [
    "Merhaba TurPilot ekibi, sistem yapılandırma ön talep özetim aşağıdadır:",
    "",
    `Acente: ${params.agencyName || "-"}`,
    `Yetkili: ${params.contactName || "-"}`,
    `Telefon: ${params.phone || "-"}`,
    `E-posta: ${params.email || "-"}`,
    `Görüşme zamanı: ${params.callWindow || "Sabah"}`,
    "",
    "Seçilen Modüller:",
    ...selectedModules.map((m) => `- ${m.name}: ${formatTry(m.price)} / yıl`),
    "- Kurulum ve veri taşıma: Dahil (Ücretsiz)",
    "",
    `Ara toplam (KDV hariç): ${formatTry(subtotal)} / yıl`,
  ];

  if (includeVat) {
    lines.push(
      `KDV (%${Math.round(siteConfig.vatRate * 100)}): ${formatTry(vatAmount)}`
    );
    lines.push(`KDV dahil yıllık toplam: ${formatTry(grandTotal)} / yıl`);
  }

  return lines.join("\n");
}
