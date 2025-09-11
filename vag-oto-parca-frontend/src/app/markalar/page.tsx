// src/app/markalar/page.tsx - YENİDEN TASARLANMIŞ VE SADELEŞTİRİLMİŞ HALİ

import Image from 'next/image';
import Link from 'next/link';
import { getMarkalar, type Marka } from '../../lib/data';
import { FadeIn } from '../../components/FadeIn';

export default async function TumMarkalarSayfasi() {
  const markalar = await getMarkalar();

  return (
    <main className="my-10">
      <FadeIn>
        <section className="container mx-auto px-6 py-10">
          {/* 1. BÖLÜM: SAYFA BAŞLIĞI */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold">Tüm Markalarımız</h1>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              VAG Grubu'nun lider markaları için aradığınız tüm orijinal ve kaliteli yedek parçalara buradan ulaşabilirsiniz.
            </p>
          </div>

          {/* 2. BÖLÜM: MARKA LİSTESİ */}
          {markalar.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <p className="text-lg text-gray-500">Gösterilecek marka bulunamadı.</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-9">
              {markalar.map((marka: Marka) => (
                <Link 
                  href={`/markalar/${marka.isim.toLowerCase()}`}
                  key={marka.id} 
                  // GÜNCELLEME: Kartın içeriğini ortalamak ve daha şık göstermek için flex sınıfları eklendi.
                  className="group flex items-center justify-center bg-white p-6 rounded-xl shadow-md border border-transparent hover:border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 h-40"
                >
                  <div className="relative h-24 w-full transition-transform duration-300 group-hover:scale-110">
                    {marka.logo?.url && (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${marka.logo.url}`}
                            alt={`${marka.isim} Logosu`}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    )}
                  </div>
                  {/* GÜNCELLEME: Marka ismini gösteren <h3> etiketi buradan kaldırıldı. */}
                </Link>
              ))}
            </div>
          )}
        </section>
      </FadeIn>
    </main>
  );
}