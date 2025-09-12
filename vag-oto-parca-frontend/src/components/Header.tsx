// src/components/Header.tsx

import Link from 'next/link';
import Image from 'next/image';

// Header'ın dışarıdan alacağı verilerin tiplerini tanımlıyoruz
interface HeaderProps {
    logoUrl: string | null;
    logoWidth: number;
    logoHeight: number;
}

export default function Header({ logoUrl, logoWidth, logoHeight }: HeaderProps) {
  const navLinkClasses = "relative font-medium text-gray-600 hover:text-black transition-colors after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="bg-slate-200 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-300 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="VAG OTO PARÇA Logosu"
              width={150}
              height={(150 / logoWidth) * logoHeight}
              style={{ height: '80px', width: 'auto' }}
              priority
            />
          ) : (
            <span className="text-2xl font-bold text-black">VAG OTO PARÇA</span>
          )}
        </Link>
        <nav>
          <ul className="flex space-x-8 items-center">
            <li><Link href="/" className={navLinkClasses}>Ana Sayfa</Link></li>
            <li><Link href="/hakkimizda" className={navLinkClasses}>Hakkımızda</Link></li>
            <li><Link href="/markalar" className={navLinkClasses}>Markalar</Link></li>
            <li><Link href="/iletisim" className={navLinkClasses}>İletişim</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}