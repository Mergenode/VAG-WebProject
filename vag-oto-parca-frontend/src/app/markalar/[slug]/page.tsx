// src/app/markalar/[slug]/page.tsx

import Image from 'next/image';
// Projenizin yapısına uygun olarak göreceli yolu kullanıyoruz
import { getPartsByBrand, type YedekParca } from '@/lib/data';
import { FadeIn } from '@/components/FadeIn';

export default async function MarkaParcalariSayfasi({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const parcalar = await getPartsByBrand(slug);

  // URL'deki slug'ı başlıkta kullanmak için ilk harfini büyütelim
  const markaIsmi = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="my-10">
      <FadeIn>
        <section className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-center mb-10">{markaIsmi} Yedek Parçaları</h1>

          {parcalar.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-lg text-gray-500">Bu markaya ait yedek parça bulunamadı veya henüz eklenmedi.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {parcalar.map((parca: YedekParca) => {
                // Sizin "düz" veri yapınıza uygun olarak URL'i alıyoruz
                const imageUrl = parca.gorsel?.url
                  ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${parca.gorsel.url}`
                  : "/placeholder.jpg";
                return (
                  <div key={parca.id} className="bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative w-full h-56 bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={parca.isim} // Veriye doğrudan ulaşıyoruz
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold truncate">{parca.isim}</h3>
                      <p className="text-sm text-gray-500 mt-2">Detaylı bilgi için iletişime geçin.</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </FadeIn>
    </main>
  );
}