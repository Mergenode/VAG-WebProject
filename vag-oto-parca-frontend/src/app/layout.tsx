// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header'; // Header'ı import ediyoruz
import Footer from '@/components/Footer'; // Footer'ı import ediyoruz

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VAG OTO PARÇA',
  description: 'Volkswagen, Audi, Seat, Skoda Orjinal ve Yan Sanayi Yedek Parçaları',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}