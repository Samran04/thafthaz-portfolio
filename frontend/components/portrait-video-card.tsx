'use client';

import { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

interface PortraitVideoCardProps {
  src: string;
  poster?: string;
  title: string;
  subtitle?: string;
  duration?: string;
}

export function PortraitVideoCard({
  src,
  poster,
  title,
  subtitle,
  duration = '0:30',
}: PortraitVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={togglePlay}
      className="group relative cursor-pointer flex flex-col items-center justify-center p-2 rounded-[2.5rem] border border-[#39FF14]/20 bg-[#0b1417]/80 backdrop-blur-xl shadow-2xl shadow-black/80 max-w-[280px] sm:max-w-[320px] mx-auto transition duration-500 hover:border-[#39FF14]/50 hover:shadow-[#39FF14]/10"
    >
      {/* Phone Notch & Top Frame Accent */}
      <div className="w-full flex items-center justify-between px-6 pt-3 pb-2 text-[10px] tracking-widest text-white/40 uppercase">
        <span className="flex items-center gap-1"><Smartphone size={10} className="text-[#39FF14]" /> 9:16 REEL</span>
        <span>{duration}</span>
      </div>

      {/* 9:16 Aspect Inner Phone Container */}
      <div className="relative w-full aspect-[9/16] overflow-hidden rounded-[1.8rem] bg-[#030d10] border border-white/10">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          loop
          muted={isMuted}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />

        {/* Play Overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#39FF14]/40 bg-[#0b1417]/90 text-[#39FF14] shadow-xl backdrop-blur-md"
            >
              <Play size={20} className="ml-1 fill-current" />
            </motion.div>
          </div>
        )}

        {/* Mute/Unmute quick toggle button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:text-[#39FF14] transition"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}

        {/* Bottom Title Gradient */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#030d10] via-[#030d10]/80 to-transparent">
          <p className="text-xs font-semibold uppercase tracking-wider text-white leading-tight">{title}</p>
          {subtitle && <p className="text-[10px] text-[#8ea1a7] uppercase tracking-widest mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}
