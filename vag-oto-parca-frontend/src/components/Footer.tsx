import Link from 'next/link';
import Image from 'next/image';
import { getGlobalSettings, getMarkalar } from '@/lib/data';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react'; // Instagram ikonunu import ediyoruz

export default async function Footer() {
  const settings = await getGlobalSettings();
  const markalar = await getMarkalar();
  const footerMarkalar = markalar.filter(m => m && m).slice(0, 4);

  const logoUrl = settings?.site_logosu?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${settings.site_logosu.url}`
    : null;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Sütun 1: Logo ve Açıklama */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center h-12">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="VAG OTO PARÇA Logosu"
                  width={160}
                  height={45}
                  style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                />
              ) : (
                <span className="text-xl font-bold text-black">VAG OTO PARÇA</span>
              )}
            </Link>
            <p className="text-gray-500 text-sm">
              VAG grubu araçlarınız için kaliteli ve güvenilir yedek parça çözümleri.
            </p>
          </div>

          {/* Sütun 2: Hızlı Linkler */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Site Haritası</h3>
            <ul className="space-y-2 text-gray-500">
              <li><Link href="/" className="hover:text-black">Ana Sayfa</Link></li>
              <li><Link href="/hakkimizda" className="hover:text-black">Hakkımızda</Link></li>
              <li><Link href="/markalar" className="hover:text-black">Tüm Markalar</Link></li>
              <li><Link href="/iletisim" className="hover:text-black">İletişim</Link></li>
            </ul>
          </div>

          {/* Sütun 3: Markalar */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Popüler Markalar</h3>
            <ul className="space-y-2 text-gray-500">
              {footerMarkalar.map(marka => (
                <li key={marka.id}>
                  <Link href={`/markalar/${marka.isim.toLowerCase()}`} className="hover:text-black">
                    {marka.isim}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sütun 4: İletişim */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Bize Ulaşın</h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Örnek Mah. Test Cad. No:123, Adana</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>0 (555) 123 45 67</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>info@vagotoparca.com</span>
              </li>
              {/* YENİ EKLENEN INSTAGRAM LİNKİ */}
              <li className="flex items-center gap-2">
                <Instagram size={16} />
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black">
                  @vagotoparca
                </a>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
      {/* Alt Bar */}
      <div className="bg-gray-300">
        <div className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} VAG OTO PARÇA. Tüm Hakları Saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}

