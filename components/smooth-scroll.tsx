'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

// SmoothScroll is a client component because it uses browser APIs.
export function SmoothScroll() {
  useEffect(() => {
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
  }, []);

  // This component does not render visible UI.
  return null;
}
