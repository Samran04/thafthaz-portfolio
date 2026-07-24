'use client';

import { Showreel } from '@/types/cms';
import { VideoPlayer } from '@/components/video-player';
import { motion } from 'framer-motion';
import { Film, Play } from 'lucide-react';

interface FeaturedShowreelProps {
  showreel: Showreel;
}

export function FeaturedShowreel({ showreel }: FeaturedShowreelProps) {
  return (
    <section className="snap-section relative flex flex-col justify-between items-center px-6 py-12 md:py-16 bg-[#030d10]">
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(57,255,20,0.03),transparent_50%)] pointer-events-none" />

      {/* Top Header Clearance */}
      <div className="h-6 md:h-10" />

      {/* Main Showreel Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 25, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col items-center justify-center w-full max-w-5xl"
      >
        <div className="w-full">
          <VideoPlayer
            src={showreel.videoUrl}
            poster={showreel.thumbnailUrl}
            title={showreel.title}
            aspectRatio={showreel.aspectRatio}
            autoPlayHover={false}
          />
        </div>
      </motion.div>

      {/* Showreel Information Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 md:mt-8 text-center space-y-1.5 relative z-10"
      >
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#39FF14]/80 flex items-center justify-center gap-1.5">
          <Film size={12} /> Featured Showreel <span className="text-white/20">•</span> {showreel.duration}
        </p>
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
          {showreel.title}
        </h2>
        {showreel.description && (
          <p className="max-w-xl mx-auto text-xs text-[#8ea1a7] leading-relaxed">
            {showreel.description}
          </p>
        )}
      </motion.div>
    </section>
  );
}
