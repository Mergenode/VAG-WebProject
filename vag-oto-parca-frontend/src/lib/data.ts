// src/lib/data.ts - NİHAİ VE %100 DOĞRU KOD

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

// GÜNCELLEME: HomepageData arayüzü de artık "düz" yapıya uygun
export interface HomepageData {
  id: number; // Strapi'den gelen veride bu da var
  heroBaslik: string;
  heroAciklama: string;
  heroGorsel: StrapiImage;
}

// --- Veri Çekme Fonksiyonları ---

export async function getMarkalar(): Promise<Marka[]> {
  // Bu fonksiyon zaten doğru çalışıyordu, aynı kalıyor.
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

export async function getHomepageData() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const query = `${strapiUrl}/api/anasayfa?populate=heroGorsel`;

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
    
    // GÜNCELLEME: Veri doğrudan data.data altında geldiği için .attributes kısmını kaldırdık.
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
    
    // GÜNCELLEME: Filtreleme için doğru ilişki alanı adını (`markas`) kullanıyoruz.
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

// src/lib/data.ts dosyasının en altına ekleyin

export async function getFeaturedParts(): Promise<YedekParca[]> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  // one_cikan alanı 'true' olanları filtreliyoruz
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