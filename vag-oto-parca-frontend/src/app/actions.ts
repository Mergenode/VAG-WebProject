// src/app/actions.ts
"use server";

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// GÜNCELLEME: Bu tipi artık diğer dosyalarda da kullanabilmek için 'export' ediyoruz.
export type FormState = {
    message: string;
    status: 'success' | 'error' | '';
};

export async function sendEmail(prevState: FormState, formData: FormData): Promise<FormState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    
    if (!name || !email || !message) {
        return { message: "Tüm alanlar zorunludur.", status: 'error' };
    }

    try {
        await resend.emails.send({
            from: 'VAG OTO PARÇA <onboarding@resend.dev>',
            to: 'pergenhen@gmail.com', // Kendi adresinle değiştir
            subject: `Yeni İletişim Formu Mesajı - ${name}`,
            replyTo: email,
            html: `<p><strong>Gönderen:</strong> ${name}</p><p><strong>E-posta:</strong> ${email}</p><hr><p><strong>Mesaj:</strong></p><p>${message}</p>`
        });

        return { message: "Mesajınız başarıyla gönderildi!", status: 'success' };

    } catch (error) {
        console.error("E-posta gönderme hatası:", error);
        return { message: "Mesaj gönderilirken bir hata oluştu.", status: 'error' };
    }
}