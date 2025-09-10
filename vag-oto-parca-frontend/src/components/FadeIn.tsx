// src/components/FadeIn.tsx
"use client";

import { useInView } from 'react-intersection-observer';

export function FadeIn({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animasyon sadece bir kere tetiklensin
    threshold: 0.1,    // Elementin %10'u göründüğünde tetiklensin
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-in-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      {children}
    </div>
  );
}