// src/app/markalar/page.tsx

import Image from 'next/image';
import Link from 'next/link';
// Yaşadığımız sorunları tekrar etmemek için güvenli olan göreceli yolu kullanalım
import { getMarkalar, type Marka } from '../../lib/data'; 

export default async function TumMarkalarSayfasi() {
  const markalar: Marka[] = await getMarkalar();

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-v-dark mb-10">Tüm Markalarımız</h1>
      
      {markalar.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-lg text-v-gray">Gösterilecek marka bulunamadı.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {markalar.map((marka) => {
            const logoUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${marka.logo.url}`;
            
            return (
              <Link 
                href={`/markalar/${marka.isim.toLowerCase()}`}
                key={marka.id} 
                className="group block bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-24 w-full">
                  <Image
                    src={logoUrl}
                    alt={`${marka.isim} Logosu`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-center mt-4 font-semibold text-v-dark group-hover:text-v-blue transition-colors">
                  {marka.isim}
                </h3>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}