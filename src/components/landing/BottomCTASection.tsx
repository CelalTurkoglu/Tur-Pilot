import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BottomCTASection() {
  return (
    <section className="pb-8">
      <div className="landing-container">
        <div className="rounded-[36px] bg-[#10233f] px-6 py-12 text-center text-white shadow-[var(--shadow-card)] md:px-12 md:py-16">
          <h2 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-5xl">
            Acentenizi bir sonraki seviyeye taşımaya hazır mısınız? 15 dakikalık demomuzda size ne kadar zaman ve para
            kazandıracağımızı canlı gösterelim.
          </h2>
          <div className="mt-8">
            <Link href="#contact" className="btn-primary">
              Hemen Canlı Demo Randevusu Al
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
