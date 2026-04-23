import Image from 'next/image';
import { Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#dce2ea] bg-white py-10">
      <div className="landing-container flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3 md:items-start">
          <Image
            src="/yenilogo-brand.png"
            alt="TurPilot logosu"
            width={112}
            height={112}
            className="brand-logo-image brand-logo-image-footer"
          />
          <div>
            <p className="brand-wordmark">TurPilot</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-[#627186]">
              Turizm operasyonlarını dijitalleştirin, acentenizi potansiyeline ulaştırın.
            </p>
          </div>
        </div>

        <div className="grid gap-3 text-sm text-[#627186]">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4" />
            Karabük, Türkiye
          </div>
          <a href="tel:+908508853455" className="footer-link flex items-center gap-3">
            <Phone className="h-4 w-4" />
            +90 850 885 3455
          </a>
          <a href="mailto:info@turpilot.site" className="footer-link flex items-center gap-3">
            <Mail className="h-4 w-4" />
            info@turpilot.site
          </a>
          <a
            href="https://www.instagram.com/turpilot.site"
            target="_blank"
            rel="noreferrer"
            className="footer-link flex items-center gap-3"
          >
            <Instagram className="h-4 w-4" />
            www.instagram.com/turpilot.site
          </a>
        </div>
      </div>
    </footer>
  );
}
