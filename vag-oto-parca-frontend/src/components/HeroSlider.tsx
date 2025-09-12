// src/components/HeroSlider.tsx
"use client"; // Bu bileşenin tarayıcıda çalışmasını sağlar

import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Gerekli Swiper CSS dosyalarını burada import ediyoruz
import 'swiper/css';
import 'swiper/css/effect-fade';

// Dışarıdan gelen verilerin tipini tanımlıyoruz
interface HeroSliderProps {
    images: {
        id: number;
        url: string;
    }[];
    altText: string;
}

export function HeroSlider({ images, altText }: HeroSliderProps) {
    return (
        <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop={true}
            className="w-full h-full"
        >
            {images.map((gorsel) => (
                <SwiperSlide key={gorsel.id}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${gorsel.url}`}
                        alt={altText}
                        fill
                        className="object-cover"
                        priority
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}