import { CheckCircle2, Lock, Mail, Phone } from 'lucide-react';

const points = ['Ücretsiz canlı demo', 'Acentenize özel ihtiyaç analizi', '15 dakikada net ürün sunumu'];

export function ContactSection() {
  return (
    <section id="contact" className="section-space">
      <div className="landing-container">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="surface-card p-8">
            <span className="section-kicker">Demo Toplantısı</span>
            <h2 className="section-title mt-5 text-left">Sizi arayalım, kısa bir demoda tüm akışı canlı gösterelim.</h2>
            <p className="section-copy mt-5">
              Formu doldurun; operasyon yapınıza göre doğru paketi, geçiş sürecini ve size en çok zaman kazandıracak
              modülleri birlikte netleştirelim.
            </p>

            <div className="mt-8 space-y-4">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-2xl border border-[#e4e9ef] bg-[#f8fafc] px-4 py-4 text-sm font-medium text-[#10233f]">
                  <CheckCircle2 className="h-5 w-5 flex-none" />
                  {point}
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm leading-7 text-[#627186]">
              Karabük Teknokent bünyesinde geliştirilen TurPilot’u canlı olarak inceleyin; size uygun paket ve geçiş
              planını birlikte netleştirelim.
            </p>

            <div className="mt-6 space-y-4 text-sm text-[#627186]">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                info@turpilot.site
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                +90 850 885 3455
              </div>
            </div>
          </div>

          <div className="surface-card p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">İletişim Formu</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[#10233f]">Ücretsiz canlı demo talep edin</h3>
            </div>

            <form action="https://formspree.io/f/mnjqazgp" method="POST" className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Ad Soyad</span>
                  <input type="text" name="name" required placeholder="Adınız Soyadınız" className="px-4 py-3.5" />
                </label>
                <label className="block">
                  <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Acente Adı</span>
                  <input type="text" name="company" required placeholder="Şirket / Acente Adı" className="px-4 py-3.5" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">E-posta</span>
                  <input type="email" name="email" required placeholder="ornek@email.com" className="px-4 py-3.5" />
                </label>
                <label className="block">
                  <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Telefon</span>
                  <input type="tel" name="phone" required placeholder="05XX XXX XX XX" className="px-4 py-3.5" />
                </label>
              </div>

              <label className="block">
                <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Şehir</span>
                <input type="text" name="city" required placeholder="Hizmet verdiğiniz şehir" className="px-4 py-3.5" />
              </label>

              <label className="block">
                <span className="mb-2.5 block text-xs font-semibold uppercase tracking-[0.18em] text-[#7b8697]">Mesajınız</span>
                <textarea name="message" rows={4} placeholder="Kısa notunuzu ekleyebilirsiniz." className="px-4 py-3.5" />
              </label>

              <button type="submit" className="btn-primary w-full justify-center">
                Ücretsiz Canlı Demo Planla
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-[#7b8697]">
                <Lock className="h-3.5 w-3.5" />
                Verileriniz yalnızca demo dönüşü için kullanılır.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
