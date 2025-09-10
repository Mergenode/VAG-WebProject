// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  const navLinkClasses = "relative text-gray-600 font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-black after:transition-all after:duration-300 hover:after:w-full";

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black">
          VAG OTO PARÇA
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