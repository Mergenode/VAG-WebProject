// src/app/markalar/[slug]/page.tsx

import Image from 'next/image';
import { getPartsByBrand, type YedekParca } from '@/lib/data';
import { FadeIn } from '@/components/FadeIn';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// --- SEO BÖLÜMÜ (DÜZELTİLMİŞ) ---
// Bu bölüm, sayfanın tarayıcı sekmesindeki başlığını ve Google arama sonuçlarındaki
// açıklamasını dinamik olarak ayarlar.

type MetadataProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: 'Marka Detayları - VAG OTO PARÇA',
      description: 'VAG Grubu araçlarınız için en kaliteli yedek parçalar.',
    };
  }

  const markaIsmi = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${markaIsmi} Yedek Parçaları - VAG OTO PARÇA`,
    description: `En kaliteli ve güvenilir ${markaIsmi} yedek parçalarını bulun. Geniş stok ve hızlı kargo imkanıyla hizmetinizdeyiz.`,
  };
}

// --- SAYFA BİLEŞENİ (DÜZELTİLMİŞ) ---

type PageProps = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function MarkaParcalariSayfasi({ params }: PageProps) {
  const { slug } = await params;

  if (!slug) return notFound();

  const parcalar = (await getPartsByBrand(slug)) ?? [];
  const markaIsmi = slug.charAt(0).toUpperCase() + slug.slice(1);

  const baseUrl = (process.env.NEXT_PUBLIC_STRAPI_API_URL || '').replace(/\/$/, '');

  return (
    <main className="my-10">
      <FadeIn>
        <section className="container mx-auto px-6 py-10">
          <h1 className="text-4xl font-bold text-center mb-10">
            {markaIsmi} Yedek Parçaları
          </h1>

          {parcalar.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <p className="text-lg text-gray-500">
                Bu markaya ait yedek parça bulunamadı veya henüz eklenmedi.
              </p>
              <p className="mt-4 text-sm text-gray-400">
                Geri dönmek için{" "}
                <a href="/markalar" className="underline">
                  markalar
                </a>{" "}
                sayfasına gidin.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {parcalar.map((parca: YedekParca) => {
                const rawUrl = parca.gorsel?.url ?? '';
                const imageUrl = rawUrl
                  ? rawUrl.startsWith('http')
                    ? rawUrl
                    : `${baseUrl}${rawUrl}`
                  : '/placeholder.jpg';

                return (
                  <article
                    key={parca.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative w-full h-56 bg-gray-100">
                      <Image
                        src={imageUrl}
                        alt={parca.isim ?? 'Parça resmi'}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold truncate">
                        {parca.isim ?? 'İsim yok'}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Detaylı bilgi için iletişime geçin.
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </FadeIn>
    </main>
  );
}
