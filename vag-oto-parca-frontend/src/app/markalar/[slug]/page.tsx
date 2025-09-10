// src/app/markalar/[slug]/page.tsx

import Image from 'next/image';
import { getPartsByBrand, type YedekParca } from '../../../lib/data'; // Veri çekme fonksiyonunu dışarıdan alıyoruz

// Dinamik sayfa bileşenimiz
export default async function MarkaParcalariSayfasi({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  // URL'deki slug'ı başlıkta kullanmak için ilk harfini büyütelim
  // Not: API sorgumuzda `$eqi` kullandığımız için büyük/küçük harf duyarsızdır, bu sadece görsel amaçlı.
  const markaIsmi = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  const parcalar: YedekParca[] = await getPartsByBrand(slug);

  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-v-dark mb-10">{markaIsmi} Yedek Parçaları</h1>

      {parcalar.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <p className="text-lg text-v-gray">Bu markaya ait yedek parça bulunamadı veya henüz eklenmedi.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {parcalar.map((parca) => {
            const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${parca.gorsel.url}`;
            return (
              <div key={parca.id} className="bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative w-full h-56">
                  <Image
                    src={imageUrl}
                    alt={parca.isim}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-v-dark truncate">{parca.isim}</h3>
                  <p className="text-sm text-v-gray mt-2">Detaylı bilgi için iletişime geçin.</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}