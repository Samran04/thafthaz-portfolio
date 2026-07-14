'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ExhibitionMediaProps {
  imageSrc: string;
  videoSrc?: string;
  alt: string;
}

/**
 * ExhibitionMedia handles video autoplay, loop, mute and viewport-based pausing.
 * It uses IntersectionObserver to detect when the media is at least 50% visible,
 * automatically playing the video and fading it in over the static image placeholder.
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
            // Autoplay the video when it comes into viewport
            video.play()
              .then(() => {
                setIsPlaying(true);
              })
              .catch((err) => {
                // Handle autoplay block or interruption gracefully
                console.debug('Autoplay video playing state:', err);
              });
          } else {
            // Pause video to conserve CPU and memory
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
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
    <div ref={containerRef} className="relative h-full w-full overflow-hidden bg-black/20">
      {/* Main Image Asset - acts as placeholder/poster and fallback */}
      <Image
        src={imageSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        priority
        className={`object-cover transition-all duration-[700ms] ease-in-out ${
          videoSrc && isPlaying && isLoaded
            ? 'scale-105 opacity-0 blur-md'
            : 'scale-100 opacity-100 blur-0'
        }`}
      />

      {/* Autoplay Video Asset */}
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setIsLoaded(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[600ms] ease-in-out ${
            isPlaying && isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
