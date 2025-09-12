// src/components/ContactForm.tsx
"use client";

import { useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
// GÜNCELLEME: Hem fonksiyonu hem de TİPİ import ediyoruz.
import { sendEmail, type FormState } from '@/app/actions'; 

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button 
            type="submit" 
            disabled={pending}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-v-blue hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-v-blue disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {pending ? 'Gönderiliyor...' : 'Gönder'}
        </button>
    );
}

export default function ContactForm() {
    // GÜNCELLEME: Başlangıç durumunu, import ettiğimiz FormState tipiyle tanımlıyoruz.
    const initialState: FormState = { message: '', status: '' };
    const [state, formAction] = useActionState(sendEmail, initialState);
    
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.status === 'success') {
            formRef.current?.reset();
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction} className="space-y-6 mt-4">
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
                <SubmitButton />
            </div>
            {state.message && (
                <p className={`text-center text-sm ${state.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {state.message}
                </p>
            )}
        </form>
    );
}