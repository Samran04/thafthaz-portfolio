'use client';

import { useEffect, useRef, useState } from 'react';

interface ExhibitionMediaProps {
  imageSrc: string;
  videoSrc?: string;
  alt: string;
}

/**
 * ExhibitionMedia renders a visual asset using native img/video tags.
 * This preserves original artwork aspect ratios exactly (no object-cover cropping)
 * and allows rounded borders/shadows to wrap the actual visual bounds dynamically.
 * It uses IntersectionObserver to play/pause videos when they are 35% visible.
 */
export function ExhibitionMedia({ imageSrc, videoSrc, alt }: ExhibitionMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!videoSrc) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = videoRef.current;
          if (!video) return;

          if (entry.isIntersecting) {
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // Gracefully catch autoplay blockages
              });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.35, // Trigger playback when 35% of the element is visible
      }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, [videoSrc]);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-full h-full max-h-[72vh] md:max-h-[76vh]">
      {/* Fallback & Poster Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        className={`max-h-full max-w-full w-auto h-auto object-contain rounded-[1.5rem] border border-white/10 shadow-2xl transition-all duration-[600ms] ease-out ${
          videoSrc && isPlaying && isLoaded
            ? 'scale-[0.98] opacity-0 blur-md'
            : 'scale-100 opacity-100 blur-0'
        }`}
      />

      {/* Autoplay Video overlay */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute max-h-full max-w-full w-auto h-auto object-contain rounded-[1.5rem] border border-white/10 shadow-2xl transition-opacity duration-[500ms] ease-out ${
            isPlaying && isLoaded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />
      )}
    </div>
  );
}
