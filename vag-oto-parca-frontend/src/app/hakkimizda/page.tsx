// src/app/hakkimizda/page.tsx

import Image from 'next/image';
import { getAboutPageData } from '@/lib/data';
import { ShieldCheck, Users, Truck } from 'lucide-react'; // Değerler için ikonlar
import { FadeIn } from '@/components/FadeIn';

// Strapi'nin Rich Text formatını HTML'e çevirmek için bir kütüphane
import { Remarkable } from 'remarkable';

export default async function HakkimizdaSayfasi() {
  const pageData = await getAboutPageData();
  const md = new Remarkable();

  const heroImageUrl = pageData?.sayfaGorseli?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${pageData.sayfaGorseli.url}`
    : "/placeholder.jpg";
    
  // Strapi'den gelen Rich Text'i HTML'e çeviriyoruz
  const contentHtml = pageData?.girisMetni ? md.render(pageData.girisMetni) : '';

  return (
    <main>
      {/* 1. BÖLÜM: KAHRAMAN GÖRSELİ VE BAŞLIK */}
      <FadeIn>
        <section className="relative h-[40vh] bg-gray-800">
          <Image
            src={heroImageUrl}
            alt={pageData?.sayfaBasligi || "Hakkımızda"}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
              {pageData?.sayfaBasligi || "Bizim Hikayemiz"}
            </h1>
          </div>
        </section>
      </FadeIn>

      {/* 2. BÖLÜM: ANA İÇERİK */}
      <FadeIn>
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Strapi'den gelen metni burada gösteriyoruz */}
            <div
              className="prose lg:prose-xl max-w-none text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        </section>
      </FadeIn>

      {/* 3. BÖLÜM: DEĞERLERİMİZ */}
      <FadeIn>
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">
              {pageData?.degerlerBasligi || "Bizi Farklı Kılan Nedir?"}
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Her adımda kalite ve güveni ön planda tutuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-white rounded-lg shadow-lg border-t-4 border-blue-500">
              <ShieldCheck size={48} className="mx-auto text-blue-500" />
              <h3 className="text-2xl font-bold mt-4">Kalite ve Güvence</h3>
              <p className="mt-2 text-gray-600">
                Sadece test edilmiş, standartlara uygun orijinal ve yan sanayi ürünleri sunuyoruz.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-lg border-t-4 border-green-500">
              <Users size={48} className="mx-auto text-green-500" />
              <h3 className="text-2xl font-bold mt-4">Müşteri Odaklılık</h3>
              <p className="mt-2 text-gray-600">
                Doğru parçayı bulmanız ve memnuniyetiniz bizim için en büyük önceliktir.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-lg shadow-lg border-t-4 border-orange-500">
              <Truck size={48} className="mx-auto text-orange-500" />
              <h3 className="text-2xl font-bold mt-4">Hız ve Erişilebilirlik</h3>
              <p className="mt-2 text-gray-600">
                Geniş stok ağımız ve hızlı kargo altyapımızla ihtiyaçlarınıza anında cevap veriyoruz.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}