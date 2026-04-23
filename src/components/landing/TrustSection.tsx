import { Building2, LockKeyhole, ShieldCheck } from 'lucide-react';

const items = [
  { icon: Building2, label: 'Karabük Teknokent Bünyesinde Geliştirildi' },
  { icon: LockKeyhole, label: '%100 KVKK Uyumlu' },
  { icon: ShieldCheck, label: 'TÜRSAB Acentelerine Özel' },
];

export function TrustSection() {
  return (
    <section className="pb-6">
      <div className="landing-container">
        <div className="grid gap-4 border-y border-[#dde4ec] py-7 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center justify-center gap-3 rounded-2xl bg-[#f7f9fb] px-5 py-4 text-center text-sm font-semibold tracking-[0.04em] text-[#687589] grayscale">
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
        <p className="mx-auto mt-5 max-w-3xl text-center text-sm leading-7 text-[#6f7c90]">
          TurPilot, Karabük Teknokent bünyesinde geliştirilen ve turizm acentelerinin gerçek operasyon süreçlerine göre
          şekillenen bir yazılım altyapısıdır.
        </p>
      </div>
    </section>
  );
}
