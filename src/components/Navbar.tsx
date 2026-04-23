'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  { href: '#features', label: 'Özellikler' },
  { href: '#solutions', label: 'Çözüm Paketleri' },
  { href: '#contact', label: 'İletişim' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav className={`nav-shell ${scrolled ? 'nav-shell-scrolled' : ''}`}>
        <div className="landing-container nav-mobile-inner relative z-[1] flex min-h-[54px] items-center justify-between gap-3 lg:min-h-[62px]">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Image
              src="/yenilogo-brand.png"
              alt="TurPilot logosu"
              width={112}
              height={112}
              className="brand-logo-image"
              priority
            />
            <div className="min-w-0 shrink-0">
              <p className="brand-wordmark brand-wordmark-nav">TurPilot</p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-[#4f5c70] transition-colors hover:text-[#10233f]">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link href="#contact" className="btn-primary">
              Ücretsiz Canlı Demo Planla
            </Link>
          </div>

          <button
            type="button"
            aria-label="Menüyü aç"
            className="inline-flex h-[2.15rem] w-[2.15rem] items-center justify-center rounded-[17px] border border-[#d7dee8] bg-white text-[#10233f] shadow-[0_10px_24px_rgba(16,35,63,0.06)] sm:h-10 sm:w-10 sm:rounded-[20px] lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-[17px] w-[17px] sm:h-5 sm:w-5" />
          </button>
        </div>
      </nav>

      <div className={`mobile-overlay ${open ? 'mobile-overlay-open' : ''}`} onClick={() => setOpen(false)} />

      <aside className={`mobile-drawer ${open ? 'mobile-drawer-open' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <Image
              src="/yenilogo-brand.png"
              alt="TurPilot logosu"
              width={96}
              height={96}
              className="brand-logo-image brand-logo-image-drawer"
            />
            <p className="brand-wordmark text-[1.55rem] sm:text-[1.65rem]">TurPilot</p>
          </div>

          <button
            type="button"
            aria-label="Menüyü kapat"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[20px] border border-[#d7dee8] bg-white text-[#10233f]"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-[#dfe5ee] bg-white px-4 py-4 text-base font-medium text-[#10233f]"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="#contact" className="btn-primary mt-8 justify-center" onClick={() => setOpen(false)}>
          Ücretsiz Canlı Demo Planla
        </Link>
      </aside>
    </>
  );
}
