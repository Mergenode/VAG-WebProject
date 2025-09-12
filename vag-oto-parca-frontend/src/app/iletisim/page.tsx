// src/app/iletisim/page.tsx

import ContactForm from "../../components/ContactForm"; // Birazdan bu bileşeni oluşturacağız
import { Mail, Phone, MapPin } from 'lucide-react'; // İkonlar için küçük bir kütüphane ekleyeceğiz

export default function IletisimSayfasi() {
  return (
    <section>
      <h1 className="text-4xl font-bold text-center text-v-dark mb-10">İletişim</h1>
      
      <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Sol Sütun: Bilgiler ve Harita */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-v-dark">Bize Ulaşın</h2>
              <p className="text-v-gray mt-2">Aşağıdaki bilgilerden veya yandaki formu kullanarak bizimle iletişime geçebilirsiniz.</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-v-blue" />
                <span className="text-gray-700">Yeşilyurt, Kıyıboyu Cd. No:152/A, 01170 Seyhan/Adana</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-v-blue" />
                <span className="text-gray-700">0538 935 92 10</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-v-blue" />
                <span className="text-gray-700">info@vagotoparca.com</span>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-v-dark mb-4">Konumumuz</h3>
              {/* ÖNEMLİ: Aşağıdaki iframe kodunu kendi Google Haritalar kodunuzla değiştirin.
                1. Google Haritalar'a gidin.
                2. İşletmenizin adresini aratın.
                3. "Paylaş" (Share) butonuna tıklayın.
                4. "Harita Yerleştirme" (Embed a map) sekmesine geçin.
                5. "HTML'i Kopyala" (Copy HTML) deyin ve aşağıdaki src="..." kısmına yapıştırın.
              */}
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3185.950254595492!2d35.3122963!3d37.0109831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15288f8e89db6279%3A0x598150af73b53746!2sVolkswagen%20Yedek%20Par%C3%A7a%20Adana%20Audi%20Seat%20Skoda%20Yedek%20Par%C3%A7a%20Vag%20Otomotiv!5e0!3m2!1str!2str!4v1757636314272!5m2!1str!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border:0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>

          {/* Sağ Sütun: İletişim Formu */}
          <div>
            <h2 className="text-2xl font-bold text-v-dark">Mesaj Gönderin</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}