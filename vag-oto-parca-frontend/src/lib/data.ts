// src/lib/data.ts - KAYAN GÖRSEL İÇİN GÜNCELLENMİŞ NİHAİ HAL

export interface StrapiImage {
  id: number;
  url: string;
  width: number;
  height: number;
  name: string;
}

export interface Marka {
  id: number;
  isim: string;
  logo: StrapiImage;
}

export interface YedekParca {
  id: number;
  isim: string;
  gorsel: StrapiImage;
}

// GÜNCELLEME: heroGorsel'i, bir resim dizisi olan heroSliderGorselleri ile değiştirdik.
export interface HomepageData {
  id: number;
  heroBaslik: string;
  heroAciklama: string;
  heroSliderGorselleri: StrapiImage[]; // Tipini dizi olarak güncelledik
}

// --- Veri Çekme Fonksiyonları ---

export async function getMarkalar(): Promise<Marka[]> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  try {
    const res = await fetch(`${strapiUrl}/api/markas?populate=logo`, { 
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store' 
    });
    if (!res.ok) { return []; }
    const data = await res.json();
    return data.data; 
  } catch (error) { return []; }
}

export async function getHomepageData(): Promise<HomepageData | null> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  // GÜNCELLEME: populate edilecek alanı yeni alan adıyla değiştirdik.
  const query = `${strapiUrl}/api/anasayfa?populate=heroSliderGorselleri`;

  try {
    const res = await fetch(query, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error("Anasayfa verisi çekilemedi. Status:", res.status);
      return null;
    }
    const data = await res.json();
    
    if (!data.data) {
      console.error("Gelen veri beklenen formatta değil veya boş.", data);
      return null;
    }
    
    return data.data as HomepageData;
  } catch (error) {
    console.error("Fetch hatası (getHomepageData):", error);
    return null;
  }
}

export async function getPartsByBrand(slug: string): Promise<YedekParca[]> {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const requestUrl = `${strapiUrl}/api/yedek-parcas?filters[marka][isim][$eqi]=${slug}&populate=gorsel`;
 
    try {
        const res = await fetch(requestUrl, { 
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store' 
        });
        if (!res.ok) { return []; }
        const data = await res.json();
        return data.data;
    } catch (error) { return []; }
}

export async function getFeaturedParts(): Promise<YedekParca[]> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const requestUrl = `${strapiUrl}/api/yedek-parcas?filters[one_cikan][$eq]=true&populate=gorsel`;

  try {
    const res = await fetch(requestUrl, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store'
    });
    if (!res.ok) { return []; }
    const data = await res.json();
    return data.data;
  } catch (error) { return []; }
}

export interface GlobalSettings {
    id: number;
    site_logosu: StrapiImage;
}

export async function getGlobalSettings(): Promise<GlobalSettings | null> {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const query = `${strapiUrl}/api/genel-ayarlar?populate=site_logosu`;
    try {
      const res = await fetch(query, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Fetch Error for getGlobalSettings:`, error);
      return null;
    }
}

export interface AboutPageData {
    sayfaBasligi: string;
    girisMetni: string; 
    degerlerBasligi: string;
    sayfaGorseli: StrapiImage;
}

export async function getAboutPageData(): Promise<AboutPageData | null> {
    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const query = `${strapiUrl}/api/hakkimizda-sayfasi?populate=sayfaGorseli`;
    try {
      const res = await fetch(query, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Fetch Error for getAboutPageData:`, error);
      return null;
    }
}