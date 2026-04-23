import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TurPilot | Tur Operasyonlarındaki Kaosu Bitirin',
  description:
    'TurPilot; Karabük Teknokent bünyesinde geliştirilen, WhatsApp sözleşme onayı, otel ve araç planlama, tahsilat ve operasyon yönetimini tek merkezde toplayan turizm acentesi altyapısıdır.',
  keywords: [
    'tur yönetim yazılımı',
    'acente yazılımı',
    'turizm yazılımı',
    'online rezervasyon sistemi',
    'tur acentesi sitesi',
    'saas turizm yazılımı',
    'whatsapp sözleşme onayı',
    'otel odalandırma yazılımı',
  ],
  authors: [{ name: 'TurPilot' }],
  openGraph: {
    title: 'TurPilot | Acentenizin Vitrini ve Operasyon Merkezi',
    description:
      'Karabük Teknokent bünyesinde geliştirilen TurPilot, tur sözleşmelerini WhatsApp üzerinden onaylatan ve operasyonu merkezileştiren kurumsal acente altyapısıdır.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="bg-canvas font-sans antialiased">{children}</body>
    </html>
  );
}
