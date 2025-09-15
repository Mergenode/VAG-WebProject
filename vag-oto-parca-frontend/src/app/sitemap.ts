// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { getMarkalar } from '@/lib/data'; // Markaları çeken fonksiyonumuzu kullanıyoruz

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = '[https://www.vagotoparca.com](https://www.vagotoparca.com)'; // Sitenin tam adresi buraya gelecek

  // Statik sayfalarımız
  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date() },
    { url: `${baseUrl}/markalar`, lastModified: new Date() },
    { url: `${baseUrl}/iletisim`, lastModified: new Date() },
  ];

  // Dinamik marka sayfalarımız
  const markalar = await getMarkalar();
  const markaRoutes = markalar.map((marka) => ({
    url: `${baseUrl}/markalar/${marka.isim.toLowerCase()}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...markaRoutes];
}