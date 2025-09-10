// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getGlobalSettings } from '../lib/data'; // Yeni fonksiyonu import et

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VAG OTO PARÇA',
  description: 'Volkswagen, Audi, Seat, Skoda Orjinal ve Yan Sanayi Yedek Parçaları',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // VERİYİ BURADA, EN ÜST SEVİYEDE ÇEKİYORUZ
  const settings = await getGlobalSettings();
  
  const logoUrl = settings?.site_logosu?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${settings.site_logosu.url}`
    : null;
  const logoWidth = settings?.site_logosu?.width || 150;
  const logoHeight = settings?.site_logosu?.height || 40;

  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          {/* VERİYİ HEADER'A PROP OLARAK GÖNDERİYORUZ */}
          <Header logoUrl={logoUrl} logoWidth={logoWidth} logoHeight={logoHeight} />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}