// src/components/ContactForm.tsx
"use client"; // Bu satır, bileşenin tarayıcıda çalışacağını belirtir. ÇOK ÖNEMLİ!

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('Gönderiliyor...');
    
    const formData = new FormData(event.currentTarget);
    
    // Simülasyon: Form verilerini konsola yazdır ve 2 saniye bekle
    console.log("Form Verileri Sunucuya Gönderiliyor:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    // Gerçek bir Server Action veya API çağrısı burada yapılır.
    // Şimdilik başarılı bir gönderim simülasyonu yapıyoruz.
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('Mesajınız başarıyla gönderildi!');
    (event.target as HTMLFormElement).reset(); // Formu sıfırla
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Ad Soyad</label>
        <input type="text" name="name" id="name" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-v-blue focus:border-v-blue" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-posta Adresiniz</label>
        <input type="email" name="email" id="email" required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-v-blue focus:border-v-blue" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mesajınız</label>
        <textarea name="message" id="message" rows={5} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-v-blue focus:border-v-blue"></textarea>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-v-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-v-blue disabled:bg-v-gray">
          Gönder
        </button>
      </div>
      {status && <p className="text-center text-v-gray mt-4">{status}</p>}
    </form>
  );
}