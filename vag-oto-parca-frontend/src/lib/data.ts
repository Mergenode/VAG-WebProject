// src/lib/data.ts - SİZİN KODUNUZ + KURŞUN GEÇİRMEZ GÜNCELLEME

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

export interface HomepageData {
  id: number;
  heroBaslik: string;
  heroAciklama: string;
  heroGorsel: StrapiImage;
}

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
  const query = `${strapiUrl}/api/anasayfa?populate=heroGorsel`;
  try {
    const res = await fetch(query, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });
    if (!res.ok) { return null; }
    const data = await res.json();
    return data.data as HomepageData;
  } catch (error) { return null; }
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
        if (!res.ok) { 
            // Hata durumunda bile her zaman boş dizi döndür
            return []; 
        }
        const data = await res.json();
        
        // --- NİHAİ DÜZELTME BURADA ---
        // Gelen verinin bir dizi olduğundan emin oluyoruz. Değilse, boş bir dizi döndürüyoruz.
        // Bu, senin "obje dönmesi" teşhisini kalıcı olarak çözer.
        if (Array.isArray(data.data)) {
            return data.data;
        } else {
            return [];
        }

    } catch (error) { 
        // Hata durumunda bile her zaman boş dizi döndür
        return []; 
    }
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