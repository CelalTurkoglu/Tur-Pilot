# TurPilot Gerçek Ekran Görüntüleri

Bu klasöre gerçek TurPilot ekran görüntülerini (`.png` / `.webp`) ekleyip
`src/config/siteConfig.ts` dosyasındaki `previewAssets` alanına dosya yolunu
yazdığınızda (örneğin `"/images/admin-panel.png"`), site otomatik olarak
kodlanmış arayüz önizlemesi yerine gerçek ekran görüntünüzü gösterir.

Önerilen boyutlar:
- `heroDashboard`: `1440x900` (16:10 oran)
- `publicShowcase`: `1440x900` (16:10 oran)
- Modül önizlemeleri (`admin`, `public`, `hotel`, `dealer`, `room`, `bulk`, `stops`, `pdf`, `whatsapp`, `refund`, `pos`): `1280x800` (16:10 oran)
