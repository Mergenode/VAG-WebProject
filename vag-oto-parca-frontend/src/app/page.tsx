// src/app/page.tsx - ANİMASYONLU VE ZENGİNLEŞTİRİLMİŞ NİHAİ HAL

import Image from "next/image";
import Link from "next/link";
// Güvenilirlik için göreceli yolları kullanalım
import {
  getMarkalar,
  getHomepageData,
  getFeaturedParts,
  type Marka,
  type YedekParca,
} from "../lib/data";
import { CheckCircle, Wrench, Truck } from "lucide-react";
import { FadeIn } from "@/components/FadeIn"; // Animasyon bileşenimizi import ediyoruz

export default async function Home() {
  // Gerekli tüm verileri sunucu tarafında tek seferde çekiyoruz
  const homepageData = await getHomepageData();
  const markalar = await getMarkalar();
  const oneCikanParcalar = await getFeaturedParts();
  const oneCikanMarkalar = markalar.slice(0, 4);

  const heroImageUrl = homepageData
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${homepageData.heroGorsel.url}`
    : "/placeholder.jpg";

  return (
    <main className="space-y-20">
      {/* 1. BÖLÜM: KARŞILAMA (HERO) */}
      <FadeIn>
        <section className="bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 py-16">
            {/* Sol Taraf: Metin ve Buton */}
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                {homepageData?.heroBaslik || "Kalite. Güven. Performans."}
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
                {homepageData?.heroAciklama ||
                  "VAG grubu aracınız için aradığınız tüm orijinal ve yan sanayi yedek parçalar, uzman ekibimizin güvencesiyle kapınızda."}
              </p>
              <Link
                href="/markalar"
                className="inline-block mt-8 bg-black text-white font-bold py-4 px-10 rounded-lg hover:bg-gray-800 transition-colors text-lg"
              >
                Markaları Keşfet
              </Link>
            </div>
            {/* Sağ Taraf: Görsel */}
            <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={heroImageUrl}
                alt="VAG Grubu Yedek Parçaları"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 2. BÖLÜM: GÜVEN UNSURLARI */}
      <FadeIn>
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200">
              <CheckCircle size={32} className="text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">
                  Orijinal ve Garantili Ürünler
                </h3>
                <p className="text-gray-500">
                  Tüm parçalarımız kalite kontrolünden geçirilmiştir.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200">
              <Wrench size={32} className="text-blue-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">Uzman Teknik Destek</h3>
                <p className="text-gray-500">
                  Doğru parçayı bulmanız için her zaman yanınızdayız.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg border border-gray-200">
              <Truck size={32} className="text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg">
                  Türkiye Geneli Hızlı Kargo
                </h3>
                <p className="text-gray-500">
                  Siparişleriniz en kısa sürede adresinize teslim.
                </p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 3. BÖLÜM: ÖNE ÇIKAN MARKALAR */}
      <FadeIn>
        <section className="bg-white py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold">Öne Çıkan Markalar</h2>
            <p className="mt-4 text-lg text-gray-500">
              Hizmet verdiğimiz lider markalardan bazıları.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {oneCikanMarkalar.map((marka) => (
                <Link
                  href={`/markalar/${marka.isim.toLowerCase()}`}
                  key={marka.id}
                  className="group block bg-gray-50 p-8 rounded-xl border border-gray-200 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="relative h-20 w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${marka.logo.url}`}
                      alt={marka.isim}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                </Link>
              ))}
            </div>
            <Link
              href="/markalar"
              className="inline-block mt-12 text-lg font-bold text-black group"
            >
              Tüm Markaları Gör
              <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black"></span>
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* 4. BÖLÜM: ÖNE ÇIKAN PARÇALAR */}
      {oneCikanParcalar.length > 0 && (
        <FadeIn>
          <section className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold">Öne Çıkan Parçalar</h2>
              <p className="mt-4 text-lg text-gray-500">
                En çok tercih edilen ve yeni gelen ürünlerimizden bazıları.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {oneCikanParcalar.map((parca) => {
                const imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${parca.gorsel.url}`;
                return (
                  <div
                    key={parca.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="relative w-full h-56">
                      <Image
                        src={imageUrl}
                        alt={parca.isim}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-v-dark truncate">
                        {parca.isim}
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Detaylı bilgi için iletişime geçin.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </FadeIn>
      )}

      {/* 5. BÖLÜM: CTA (Çağrı) */}
      <FadeIn>
        <section className="container mx-auto px-6 py-20">
          <div className="bg-black text-white rounded-2xl p-12 text-center flex flex-col items-center">
            <h2
              className="text-4xl font-bold 
                      bg-gradient-to-tr from-blue-400 via-gray-200 to-white 
                      bg-clip-text text-transparent"
            >
              Aracınız İçin Doğru Parçayı <br /> Birlikte Bulalım.
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl">
              Stok durumu, parça uyumluluğu veya herhangi bir sorunuz için
              bizimle iletişime geçmekten çekinmeyin.
            </p>
            <Link
              href="/iletisim"
              className="inline-block mt-8 bg-white text-black font-bold py-4 px-10 rounded-lg hover:bg-gray-200 transition-colors text-lg"
            >
              İletişime Geçin
            </Link>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}