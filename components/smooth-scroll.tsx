'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

// SmoothScroll is a client component because it uses browser APIs.
// We disable Lenis on the homepage ('/') so that native CSS Scroll Snap operates perfectly.
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // If we are on the homepage, do not initialize Lenis
    if (pathname === '/') {
      return;
    }

    // Lenis creates a smooth scrolling experience that feels more app-like.
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frame = 0;

    // requestAnimationFrame is required for Lenis to update on every frame.
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [pathname]);

  // This component does not render visible UI.
  return null;
}

