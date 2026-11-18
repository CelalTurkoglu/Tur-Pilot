export interface FaqItem {
  question: string;
  answer: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  summary: string;
  items: {
    name: string;
    detail: string;
    bullets: string[];
  }[];
}

export const HOME_CONTENT = {
  hero: {
    badge: "Otobüslü tur acenteleri için",
    title: "Otobüsleriniz dolsun, akşam masa başı bitsin.",
    subtitle:
      "Rezervasyon, koltuk, kapora ve tur içi gelir-gider tek kayıtta. Ofiste girdiğiniz bilgi otobüste de görünür. Turlarınızı ve mevcut kayıtlarınızı biz aktarıyoruz.",
    primaryCta: "Sistemini Oluştur",
    secondaryCta: "Görüşme Planla",
  },
  positioningHeading:
    "TurPilot, rezervasyonu ofisten, yoklamayı ve tur içi satışı otobüsten tek kayıtla yöneten rezervasyon ve operasyon programıdır.",
  bentoCards: {
    wide: {
      title: "Koltuk sorusuna anında cevap verin.",
      body: 'Müşteri "kaç yer kaldı?" diye sorduğunda canlı listeye bakmanız yeterli. Telefon, WhatsApp ve ofisten gelen tüm rezervasyonlar tek koltuk şemasında toplanır. Aynı koltuğun iki kişiye satılması veritabanı seviyesinde engellenir; yan yana oturma kuralı ve her kalkış şehri için ayrı fiyat otomatik uygulanır.',
    },
    left: {
      title: "Unutulan kapora ve kaybolan fişler biter.",
      body: "Her yolcunun ne kadar kapora verdiği, kalan borcu ve tahsilatı alan personel kayıttadır. Tur görevlisi otobüste yaptığı harcamanın fişini fotoğraflayıp telefondan girer; otobüs kilometresi ve ekstra satışlar tur sonu gelir-gider raporuna işlenir.",
    },
    right: {
      title: "Müşteriniz düzenli bir acenteyle çalıştığını görsün.",
      body: "Biniş durağı, saati ve konum linki tek tıkla müşterinin WhatsApp’ına gider. Müşteri paket tur sözleşmesini telefonundan okur, TC kimlik doğrulamasıyla dijital olarak onaylar; tüm onaylar zaman damgasıyla arşivlenir.",
    },
  },
  miniStripHeading: "TurPilot ile neler yapabilirsiniz?",
  miniFeatures: [
    {
      title: "Saatli Durak Manifestosu",
      body: "Durak saati değiştiğinde o duraktaki tüm yolcular tek tıkla güncellenir.",
      href: "/ozellikler#grup-duraklar",
    },
    {
      title: "Renkli Oda Gruplandırma",
      body: "Konaklamalı turlarda misafir, kaptan ve rehber odalarını renkli şemada planlayın.",
      href: "/ozellikler#grup-duraklar",
    },
    {
      title: "Tek Tıkla PDF ve Excel",
      body: "Oturma planı PDF'i, mutabakat raporu ve Bakanlık Excel yolcu listesi saniyeler içinde hazır.",
      href: "/ozellikler#grup-finans",
    },
    {
      title: "Kendi B2C Satış Siteniz",
      body: "İsterseniz kendi alan adınızda çalışan vitrinle müşterileriniz koltuk seçip online rezervasyon yapsın.",
      href: "/ozellikler#public-site-vitrin",
    },
  ],
  trustStrip: [
    "Tarayıcıdan kurulumsuz erişim",
    "Mevcut Excel ve defter aktarımı bizden",
    "İlk turunuzu birlikte kuruyoruz",
    "Otobüs turu odaklı arayüz",
    "İhtiyaca göre A La Carte modüller",
    "Teknokent bünyesinde geliştirildi",
  ],
  migration: {
    heading: "Çalışan düzeninizi bozmadan geçin",
    subtitle:
      "Eski defterlerinizi ya da karmaşık Excel tablolarınızı tek seferde toparlayalım; ekibiniz ilk turdan itibaren aynı ekrandan çalışsın.",
    steps: [
      {
        step: "1. Kayıtlarınızı gönderin",
        body: "Mevcut Excel dosyanızı ya da defterinizin fotoğrafını bize gönderin.",
      },
      {
        step: "2. Biz kuruyoruz",
        body: "Turlarınızı biz aktarıyoruz, ilk seferinizi ekran paylaşımıyla sizinle kuruyoruz.",
      },
      {
        step: "3. İlk turda yanınızdayız",
        body: "Tur görevliniz takıldığı yerde bize WhatsApp'tan anında yazar.",
      },
    ],
  },
  conversionCta: {
    title: "Siz de başlayın: İhtiyacınıza göre modül seçin, net fiyatı hemen görün.",
    subtitle:
      "Temel Admin Paneli yıllık 30.000 TL'den başlar. Kullanmadığınız özellik veya modüllere ücret ödemezsiniz.",
    primary: "Sistemini Oluştur",
    secondary: "Görüşme Planla",
  },
  origin: {
    title: "Sahada tur yönetmiş insanlarla yazıldı.",
    body: "TurPilot’u ofisteki acente sorumluları ve otobüsteki tur görevlileriyle birlikte geliştirdik. Gerçek turların operasyon zorluklarına göre şekillendi; karmaşık otel veya uçak sistemlerinden arındırıldı. TurPilot, Karabük Teknokent bünyesinde geliştirildi.",
  },
};

export const HOME_FAQS: FaqItem[] = [
  {
    question: "Bilgisayardan çok iyi anlamam gerekir mi? Kurulum var mı?",
    answer:
      "Hayır. TurPilot %100 bulut tabanlıdır ve tarayıcıdan kurulum gerektirmeden açılır; bilgisayarınıza hiçbir program yüklemeniz gerekmez. İlk turunuzu ekran paylaşımıyla birlikte kuruyoruz.",
  },
  {
    question: "Mevcut Excel ve defter kayıtlarım ne olacak?",
    answer:
      "Excel dosyanızı ya da defterinizin fotoğrafını gönderin; aktif tur şablonlarınızı ve yolcu kayıtlarınızı sisteme biz aktarıyoruz.",
  },
  {
    question:
      "Sadece Yönetim Paneli alıp web sitesini veya modülleri sonra ekleyebilir miyiz?",
    answer:
      "Evet. Sadece Admin Paneli (30.000 TL/yıl) ile başlayıp ihtiyacınız oldukça Public Site'ı, B2B modülleri veya ek özellikleri sonradan açabilirsiniz.",
  },
  {
    question: "Fiyatlandırma nasıl çalışıyor? Gizli maliyet var mı?",
    answer:
      "Yıllık şeffaf modüler fiyatlandırma uygulanır. Kurulum ve ilk veri aktarımı dahildir; sadece seçtiğiniz temel paket ve eklentiler kadar ödersiniz.",
  },
  {
    question: "Tur görevlisi veya rehber otobüste telefondan kullanabilir mi?",
    answer:
      "Evet. Arayüz mobil uyumludur; yoklamayı, ekstra satışları, fiş fotoğraflı harcamaları ve otobüs KM bilgisini telefondan girebilir.",
  },
  {
    question: "Bakanlığın istediği yolcu listesini ve sözleşme arşivini veriyor mu?",
    answer:
      "Evet. Oturma planlı PDF manifestosu ve ödeme bilgili/bilgisiz Excel yolcu listesi tek tıkla alınır. Sözleşme onayları TC kimlik doğrulamalı, tarih/saat ve IP damgalı dijital sözleşme onayı olarak arşivlenir.",
  },
  {
    question: "Alt acentelerimle (bayilerimle) ortak satış yapabilir miyim?",
    answer:
      "Evet. B2B Alt Bayi Ağı modülünü seçtiğinizde bayilerinize kontenjan açabilir, komisyon kurallarını ve çift yönlü cari defteri tek ekrandan yönetebilirsiniz.",
  },
];

export const FEATURES_CONTENT = {
  hero: {
    title: "Otobüsleriniz dolsun, akşam masa başı bitsin.",
    subtitle:
      "Ofisteki rezervasyon ve kasadan otobüsteki yoklamaya, B2C web sitenizden B2B bayi carisine kadar TurPilot modüllerinin her detayını inceleyin.",
  },
  zigZag: [
    {
      index: "01",
      tag: "01 · Admin Paneli (Ofis Operasyon & Finans)",
      title: "Kapora, bakiye ve net sefer kârı tek ekranda.",
      body: "Kapora ve tahsilatlar tam kontrolde. Her turun net gelirini ve giderini ayrı ayrı görün; araç, kaptan ve rehber atamalarında tarih çakışmalarını önleyin; ofis personelinin kasa kârlılığını görmesini rol yetkisiyle sınırlayın.",
      linkText: "Fiyatlandır ve seç",
      href: "/sistemini-olustur",
      previewKey: "admin" as const,
    },
    {
      index: "02",
      tag: "02 · WhatsApp & QR Canlı Tur Sözleşmesi",
      title: "Tek tıkla biniş mesajı ve TC doğrulamalı sözleşme.",
      body: "Tek tıkla WhatsApp üzerinden hazır biniş bilgisi ve makbuz bağlantısı müşteriye gider. Müşteri paket tur sözleşmesini telefonundan TC kimlik doğrulamasıyla okur ve dijital olarak onaylar; tüm kayıtlar tarih, saat ve IP damgasıyla saklanır.",
      linkText: "Fiyatlandır ve seç",
      href: "/sistemini-olustur?adim=3",
      previewKey: "whatsapp" as const,
    },
    {
      index: "03",
      tag: "03 · Otobüs Koltuk Planı, Durak & Saha Takibi",
      title: "2+1 / 2+2 çifte satış kilidi ve mobil yoklama.",
      body: "2+1 ve 2+2 koltuk planında çifte satışı veritabanı seviyesinde kilitleyin, durakları Google Maps konumu ve saat sırasıyla şoföre verin. Tur görevlisi telefondan yoklama, ekstra satış, parçalı KM ve fiş fotoğrafıyla harcama girişi yapsın.",
      linkText: "Fiyatlandır ve seç",
      href: "/sistemini-olustur?adim=2",
      previewKey: "stops" as const,
    },
    {
      index: "04",
      tag: "04 · B2B Otel Satış & Alt Bayi Cari Ağı",
      title: "Otel kontratları ve alt bayi cari defteri kontrol altında.",
      body: "Otel kontratlarınızdaki sezonluk çarpan, erken rezervasyon ve stop-sale takvimini yönetin. Alt bayilerinize canlı koltuk kontenjanı açıp komisyon ve borç/alacak cari defterini otomatik takip edin.",
      linkText: "Fiyatlandır ve seç",
      href: "/sistemini-olustur?adim=1",
      previewKey: "dealer" as const,
    },
  ],
  ctaBand: {
    title: "İhtiyacınıza göre yapılandırın. Net fiyatı görün.",
    buttonText: "Başla: Sistemini Oluştur",
  },
  libraryTitle: "Modül ve Özellik Kütüphanesi",
  libraryGroups: [
    {
      id: "grup-sefer-koltuk",
      title: "Grup 1: Sefer, Koltuk ve Kontenjan Yönetimi",
      summary:
        "Şablondan hızlı sefer üretimi, veritabanı kilitli 2+1/2+2 koltuk planı ve yaş/oda fiyat kuralları.",
      items: [
        {
          name: "Şablonlardan Tek Seferde 50 Tarihe Toplu Sefer Açma",
          detail:
            "Düzenli hafta sonu ve kültür turlarını her defasında baştan kurmayın. Tek şablondan tüm kalkış noktaları, durak saatleri ve çocuk fiyatlarıyla 50 farklı tarihe kadar toplu sefer üretin; çakışan tarihler atomik olarak denetlenir.",
          bullets: [
            "Benzersiz tur kodu (örn. ABC123) ve çoklu otobüste otomatik araç numaralandırma (1. Araç, 2. Araç)",
            "Tarih çakışması varsa hatalı kayıt açmadan anında uyarı",
            "Şablon bazlı gruplanmış takvim ekranı ile sezon planlaması",
          ],
        },
        {
          name: "2+1 ve 2+2 Veritabanı Kilitli Koltuk Şeması & Yan Yana Kuralı",
          detail:
            "Aynı koltuğun telefon ve ofis personeli tarafından aynı anda satılmasını veritabanı seviyesinde engeller. Kalkış noktası bazlı kontenjan ve kalkış şehrine göre farklı tur fiyatı otomatik uygulanır.",
          bullets: [
            "Görsel otobüs şeması üzerinden anlık koltuk seçimi",
            "Yan yana oturma kuralı kontrolü ve opsiyon/kapora ayrımı",
            "Araç kapasitesine göre 2+1 veya 2+2 şablon seçimi",
          ],
        },
        {
          name: "Doğum Tarihine Göre G1/G2 Çocuk Yaşı & SNG Oda Kontenjan Kilidi",
          detail:
            "Yolcunun doğum tarihine göre turun kalkış tarihindeki tam yaşı otomatik hesaplanır; 1. ve 2. çocuk indirimleri uygulanır. Tek kişilik oda (SNG) kontenjanı dolduğunda sistem otomatik durdurur.",
          bullets: [
            "Kalkış tarihine göre dinamik yaş ve indirim basamağı hesaplama",
            "SNG (tek kişilik oda) kontenjan sınırı ve otomatik fiyat farkı",
            "Manuel hesaplama hatalarını ortadan kaldıran tarife motoru",
          ],
        },
      ],
    },
    {
      id: "grup-duraklar",
      title: "Grup 2: Duraklar, Oda Gruplandırma ve Saha Operasyonu",
      summary:
        "Durak saat senkronizasyonu, 29 renkli oda planlama ve mobil saha/araç KM disiplini.",
      items: [
        {
          name: "Tek Tıkla Durak Saat Senkronizasyonu ve Google Maps Konumu",
          detail:
            "Bir ara durağın biniş saati değiştiğinde o durağa bağlı tüm yolcuların biniş saati tek tıkla güncellenir. Şoför ve rehber için saat sırasına göre dizilmiş manifesto her zaman günceldir.",
          bullets: [
            "Tek tıkla WhatsApp üzerinden hazır biniş bilgisi ve Google Maps konum linki gönderimi",
            "Şoför ve rehbere özel saat sıralı durak manifestosu",
            "Kalkış noktası bazlı toplanan yolcu sayısı takibi",
          ],
        },
        {
          name: "29 Renkli Oda Gruplandırma ve Personel Odalama (Rooming List)",
          detail:
            "Konaklamalı turlarda 1–4 kişilik SNG, DBL, TWN, TRPL, French Bed ve Aile Odası kombinasyonlarını 29 renk grubuyla yönetin. Rehber, 1. Kaptan ve 2. Kaptan odalarını aynı listede planlayın.",
          bullets: [
            "Renkli şema üzerinden sürükle-seç kolaylığıyla oda eşleştirme",
            "Rehber ve kaptan odalarının misafir listesiyle tek PDF'te birleşmesi",
            "Otel resepsiyonuna doğrudan gönderilebilen renkli Rooming List PDF'i",
          ],
        },
        {
          name: "Araç/Şoför/Rehber Çakışma Kontrolü ve Saha Masraf/KM Takibi",
          detail:
            "Aynı tarihte aynı araç, 1. kaptan, 2. kaptan veya rehber başka tura atanmak istendiğinde sistem uyarır. Saha görevlisi telefondan yoklama alır, ekstra satış tahsilatı girer, harcama fişi fotoğrafı yükler ve araç parçalı KM kaydını işler.",
          bullets: [
            "Tarih bazlı araç ve personel çakışma kontrolü",
            "Fiş fotoğrafı eklemeli saha gideri ve ekstra (ATV, yemek vb.) satış kaydı",
            "Sefer sonu net kâr/zarar ekranı ve ofis genel gider takibi",
          ],
        },
      ],
    },
    {
      id: "grup-finans",
      title: "Grup 3: Finans, İade, Raporlama ve Tahsilat",
      summary:
        "Rol yetkili kasa gizliliği, onaylı iade makbuzu, 7 farklı PDF/Excel çıktısı ve Sanal POS.",
      items: [
        {
          name: "Yolcu İndirim, İade Tahakkuku ve Onaylı Yolcu Silme",
          detail:
            "Yolcuya sonradan indirim tanımlandığında fazla tahsilat varsa sistem otomatik olarak sefer giderine \"Yolcu İadesi\" tahakkuk eder. Yönetici onaylı yolcu silmede kırmızı iade makbuzu PDF'i otomatik oluşur.",
          bullets: [
            "İndirim geri alındığında ilgili gider tahakkukunun denetim iziyle iptali",
            "Personel için kasa gizliliği ve yönetici onaylı yolcu silme akışı",
            "Otomatik üretilen kırmızı iade makbuzu PDF'i",
          ],
        },
        {
          name: "7 Farklı Profesyonel PDF ve Bakanlık Uyumlu Excel Çıktısı",
          detail:
            "Kullanıcı rolüne göre filtrelenmiş oturma planı PDF'i, durak manifestosu, gelir-gider mutabakat PDF'i, tahsilat/iade makbuzları, doğum günü listesi, muhasebe Excel'i ve resmi Bakanlık yolcu listesi tek tıkla alınır.",
          bullets: [
            "Ödeme bilgili veya ödeme bilgisiz seçilebilir resmi Excel yolcu listesi",
            "Görsel 2+1 / 2+2 otobüs oturma planı PDF'i",
            "Sefer gelir-gider ve ofis gider mutabakat raporları",
          ],
        },
        {
          name: "İyzico / PayTR / Nkolay 1–12 Taksit Sanal POS Matrisi",
          detail:
            "Kendi sanal POS hesabınızı AES-256 şifreli kasaya bağlayın. 1'den 12 taksite kadar vade farkı ve komisyon oranlarını panelden belirleyip güvenli online tahsilat yapın.",
          bullets: [
            "Acentenin kendi POS hesabıyla komisyon/vade kontrolü",
            "1–12 taksit tablosunun otomatik fiyat hesaplamasına yansıması",
            "Tahsilat ve işlem geçmişi denetim kaydı",
          ],
        },
      ],
    },
    {
      id: "grup-b2b-vitrin",
      title: "Grup 4: B2B Dağıtım ve Online Vitrin",
      summary:
        "B2B Otel Satış kontrat motoru, Alt Bayi portalı ve acenteye özel B2C Public Site.",
      items: [
        {
          name: "B2B Otel Satış Kontrat, Çarpan ve Stop-Sale Yönetimi",
          detail:
            "Hafta içi/sonu net ve satış fiyatları, SGL/DBL/TRPL/QUAD oda çarpanları, çocuk yaş matrisi, erken rezervasyon (EB), kal-öde (7 kal 6 öde) kampanyaları, günlük kontenjan, Stop-Sale / Sor-Sat ve konfirme Voucher PDF'i tek modülde.",
          bullets: [
            "Sezonluk otel kontrat matrisi ve otomatik fiyat hesaplama",
            "Günlük kontenjan ve Stop-Sale / Sor-Sat takvimi",
            "Müşteri ve otel için tek tıkla konfirme Voucher PDF çıktısı",
          ],
        },
        {
          name: "B2B Alt Bayi Ağı (role: dealer) ve Çift Yönlü Cari Defter",
          detail:
            "Alt acentelerinize kendi giriş portalını verin, belirli turlara kontenjan kotası tanımlayın. Yüzde, kişi başı veya rezervasyon başı 3 seviyeli komisyon kurallarıyla merkez/bayi tahsilatını ve kredi limitini yönetin.",
          bullets: [
            "Tur, şablon veya bayiye özel esnek komisyon kuralları",
            "Merkez ve bayi tahsilat ayrımı ile kredi limiti kontrolü",
            "Otomatik işleyen çift yönlü Borç / Alacak cari defteri",
          ],
        },
        {
          name: "Public Site (Acenteye Özel B2C Satış Vitrini)",
          detail:
            "Kendi alan adınızda (www.acenteadiniz.com) SSL sertifikalı yayınlanan vitrin siteniz Admin Paneli ile canlı bağlantılıdır. Müşterileriniz koltuk seçip rezervasyon yaptığında kayıt doğrudan panelinize düşer.",
          bullets: [
            "Kalkış şehrine ve tarihe göre canlı boş koltuk ve fiyat gösterimi",
            "TC kimlik doğrulamalı, tarih/saat ve IP damgalı dijital sözleşme onayı desteği",
            "Yorum, iletişim ve ön talep formlarının doğrudan Admin Paneline akması",
          ],
        },
      ],
    },
  ] satisfies FeatureGroup[],
  publicShowcase: {
    badge: "01 · Acenteye Özel Public Site / B2C Vitrin",
    title: "Public Site: Kendi web sitenizden 7/24 online rezervasyon alın.",
    body: "Telefon, WhatsApp ve ofisten gelen rezervasyonlar tek listede toplanır. Her kalkış şehri için ayrı fiyat verin, yeni seferi hazır şablondan açın; turlarınız kendi alan adınızda (www.acenteadiniz.com) otomatik güncellensin.",
  },
};

export const FEATURES_FAQS: FaqItem[] = [
  {
    question: "Modülleri sonradan ekleyip çıkarabilir miyiz?",
    answer:
      "Evet. İhtiyacınız arttığında yıl içinde yeni modül ve ek özellikleri panelinize ekleyebilirsiniz. Bir sonraki yıllık yenilemede kullanmadığınız eklentileri çıkarabilirsiniz.",
  },
  {
    question: "Public Site almak zorunda mıyız?",
    answer:
      "Hayır. Yalnızca Admin Paneli (30.000 TL/yıl) ile tüm ofis, koltuk, durak, finans ve saha operasyonunu yönetebilirsiniz. Public Site isteğe bağlıdır.",
  },
  {
    question: "WhatsApp üzerinden sözleşme onayı nasıl çalışır?",
    answer:
      "Yolcuya özel sözleşme bağlantısını tek tıkla WhatsApp üzerinden iletebilir veya sefer için Toplu QR kod üretebilirsiniz. Müşteri sözleşmeyi okuyup TC kimlik doğrulamasıyla onayladığında kayıt tarih, saat ve IP adresiyle arşivlenir.",
  },
  {
    question: "B2B Otel Satış ve Alt Bayi Ağı ayrı ayrı alınabilir mi?",
    answer:
      "Evet. Yalnızca otel kontratları yönetiyorsanız B2B Otel Satış'ı (+14.000 TL/yıl), yalnızca alt acentelerle çalışıyorsanız B2B Alt Bayi Ağı'nı (+16.000 TL/yıl) seçebilirsiniz.",
  },
];

export const LEGAL_PAGES = {
  gizlilik: {
    title: "Gizlilik Politikası",
    updatedAt: "18 Kasım 2026",
    intro:
      "TurPilot (turpilot.site) olarak ziyaretçilerimizin ve müşteri seyahat acentelerimizin gizliliğine önem veriyoruz. Bu politika, tanıtım sitemiz üzerinden toplanan bilgilerin nasıl işlendiğini ve korunduğunu açıklar.",
    sections: [
      {
        heading: "1. Toplanan Bilgiler",
        body: "Sistem yapılandırma özeti ve görüşme planlama formları aracılığıyla paylaştığınız ad soyad, acente adı, telefon numarası, e-posta adresi, tercih ettiğiniz görüşme zamanı ve seçtiğiniz yazılım modülleri yalnızca talebinizi değerlendirmek ve sizinle iletişime geçmek amacıyla işlenir.",
      },
      {
        heading: "2. Bilgilerin Kullanım Amacı",
        body: "Toplanan iletişim ve paket bilgileri; talep ettiğiniz ürün demosunu planlamak, mevcut Excel/defter kayıtlarınızın aktarım kapsamını belirlemek ve sözleşme öncesi teknik teklif sunmak için kullanılır. Bilgileriniz üçüncü taraflara pazarlama amacıyla satılmaz veya devredilmez.",
      },
      {
        heading: "3. Veri Güvenliği",
        body: "TurPilot altyapısı %100 bulut tabanlı olup SSL/TLS şifreleme ile korunur. Sanal POS anahtarları gibi hassas entegrasyon verileri uygulama tarafında AES-256 şifreli kasada saklanır.",
      },
      {
        heading: "4. İletişim",
        body: "Gizlilik politikamızla ilgili sorularınız için info@turpilot.site e-posta adresinden veya +90 850 885 3455 numaralı telefondan bizimle iletişime geçebilirsiniz.",
      },
    ],
  },
  kvkk: {
    title: "KVKK Aydınlatma Metni",
    updatedAt: "18 Kasım 2026",
    intro:
      "6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca, veri sorumlusu sıfatıyla TurPilot tarafından kişisel verilerinizin işlenmesine ilişkin aydınlatma metnidir.",
    sections: [
      {
        heading: "1. Veri Sorumlusu ve İşlenen Kişisel Veriler",
        body: "turpilot.site üzerinden ilettiğiniz kimlik (ad, soyad), iletişim (telefon, e-posta), kurumsal temsil (acente unvanı) ve talep işlem (seçilen modüller, görüşme saati tercihi) verileriniz işlenmektedir.",
      },
      {
        heading: "2. Kişisel Verilerin İşlenme Amacı ve Hukuki Sebebi",
        body: "Kişisel verileriniz; KVKK’nın 5. maddesinin 2. fıkrasının (c) bendi uyarınca bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması ve (f) bendi uyarınca ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaatlerimiz kapsamında Demo/Görüşme planlama ve tekliflendirme süreçlerinin yürütülmesi amacıyla işlenir.",
      },
      {
        heading: "3. Verilerin Aktarımı",
        body: "Verileriniz yalnızca barındırma, iletişim ve teknik altyapı hizmet sağlayıcılarıyla (yurt içi/bulut veri işleyenler) gizlilik yükümlülükleri çerçevesinde ve yasal zorunluluk halinde yetkili kamu kurumlarıyla paylaşılabilir.",
      },
      {
        heading: "4. KVKK Madde 11 Kapsamındaki Haklarınız",
        body: "KVKK’nın 11. maddesi uyarınca kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, düzeltilmesini veya silinmesini isteme haklarına sahipsiniz. Başvurularınızı info@turpilot.site adresine iletebilirsiniz.",
      },
    ],
  },
  kullanimSartlari: {
    title: "Kullanım Şartları",
    updatedAt: "18 Kasım 2026",
    intro:
      "turpilot.site tanıtım ve sistem yapılandırma web sitesini kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.",
    sections: [
      {
        heading: "1. Hizmet Tanımı",
        body: "turpilot.site üzerinde yer alan fiyatlandırma ve modül yapılandırıcı aracı, seyahat acentelerine ön bilgilendirme ve talep özeti oluşturma imkânı sunar. Nihai hizmet kapsamı ve abonelik koşulları karşılıklı hizmet sözleşmesiyle kesinleşir.",
      },
      {
        heading: "2. Fikri Mülkiyet",
        body: "Site tasarımı, arayüz metinleri, TurPilot markası ve yazılım modüllerine ilişkin tüm fikri ve sınai mülkiyet hakları TurPilot’a aittir. İzinsiz kopyalanamaz veya ticari amaçla çoğaltılamaz.",
      },
      {
        heading: "3. Fiyat ve Paket Değişiklikleri",
        body: "Yıllık net fiyatlar Türk Lirası (TRY) cinsinden gösterilir ve aksi belirtilmedikçe KDV (%20) hariç net tutarlar üzerinden hesaplanır. Aktif abonelik dönemindeki müşteriler için sözleşme şartları korunur; yeni özellik ekleme veya yenileme döneminde modül çıkarma hakları sözleşmeye tabidir.",
      },
      {
        heading: "4. Sorumluluk Sınırı",
        body: "Tanıtım sitesinde yer alan örnek tur verileri ve önizleme ekranları temsilidir. Kesintisiz erişim için azami özen gösterilmekle birlikte bakım ve zorunlu kesintilerden doğan dolaylı zararlardan sorumluluk kabul edilmez.",
      },
    ],
  },
  cerezPolitikasi: {
    title: "Çerez Politikası",
    updatedAt: "18 Kasım 2026",
    intro:
      "turpilot.site web sitesinin güvenli, hızlı ve kesintisiz çalışması amacıyla temel teknik çerezler ve tarayıcı oturum mekanizmaları kullanılmaktadır.",
    sections: [
      {
        heading: "1. Kullanılan Çerez Türleri",
        body: "Zorunlu ve işlevsel çerezler; sayfa gezinmesinin sağlanması, sistem yapılandırıcı adım durumunuzun korunması ve güvenlik doğrulamalarının yürütülmesi için kullanılır.",
      },
      {
        heading: "2. Üçüncü Taraf Reklam Çerezleri",
        body: "Sitemizde ziyaretçileri izleyen agresif üçüncü taraf reklam takipçileri çalıştırılmamaktadır. Harici bağlantılar (ör. WhatsApp, Instagram) ilgili platformların kendi gizlilik politikalarına tabidir.",
      },
      {
        heading: "3. Çerez Tercihlerinin Yönetimi",
        body: "Tarayıcı ayarlarınız üzerinden çerezleri dilediğiniz zaman silebilir veya engelleyebilirsiniz. Zorunlu çerezlerin engellenmesi halinde bazı etkileşimli özellikler beklenildiği gibi çalışmayabilir.",
      },
    ],
  },
};
