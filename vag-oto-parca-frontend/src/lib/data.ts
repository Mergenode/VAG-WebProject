// src/lib/data.ts - SİZİN ÇALIŞAN KODUNUZ + GÜVENLİ GÜNCELLEME

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

// --- YENİ EKLENEN GÜVENLİ KOD ---
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