'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Smartphone, ArrowRight, Heart, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Project } from '@/types/cms';
import { formatMediaUrl } from '@/lib/cms/google-drive';

interface ReelsShowcaseProps {
  projects: Project[];
}

const fallbackPosters = [
  '/assets/featured-projects/St_Aloysius_2.jpg',
  '/assets/featured-projects/Artha_Capital_1.jpg',
  '/assets/posters/Typography_Minimal_1.jpg',
  '/assets/featured-projects/Travel_Pack_6.jpg',
];

export function ReelsShowcase({ projects }: ReelsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const scrollNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: containerRef.current.clientHeight, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -containerRef.current.clientHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#040f12] text-white relative">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] font-semibold flex items-center gap-2">
              <Smartphone size={14} /> Interactive Reels & Key Visuals
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              Featured Reels Showcase
            </h2>
            <p className="text-xs sm:text-sm text-[#8ea1a7]">
              Scroll through portrait video edits, social campaign reels, and spatial poster visual series.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={scrollPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 hover:text-[#39FF14]"
                aria-label="Previous Reel"
              >
                <ChevronUp size={18} />
              </button>
              <button
                onClick={scrollNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 hover:text-[#39FF14]"
                aria-label="Next Reel"
              >
                <ChevronDown size={18} />
              </button>
            </div>

            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white hover:border-[#39FF14]/40 transition"
            >
              Full Archive <ArrowRight size={14} className="text-[#39FF14]" />
            </Link>
          </div>
        </div>

        {/* Studio Box Container (Fixed Bounding Box preventing any section overlap) */}
        <div className="relative w-full h-[75vh] md:h-[82vh] rounded-[2.5rem] border border-white/10 bg-[#071114] overflow-hidden shadow-2xl">
          {/* Scrollable Snap Container */}
          <div
            ref={containerRef}
            className="h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar relative"
          >
            {projects.map((project, idx) => (
              <FullReelSlide
                key={project.id || project.slug}
                project={project}
                index={idx}
                fallbackImg={fallbackPosters[idx % fallbackPosters.length]}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FullReelSlide({ project, index, fallbackImg }: { project: Project; index: number; fallbackImg: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formattedImage = formatMediaUrl(project.thumbnail, false);
  const formattedVideo = formatMediaUrl(project.videoUrl || '', true);
  const isVideoFile = project.videoUrl?.endsWith('.mp4') || project.videoUrl?.endsWith('.webm');
  const isDriveEmbed = formattedVideo.includes('drive.google.com') || formattedVideo.includes('youtube.com');

  const displayImage = imgError ? fallbackImg : formattedImage || fallbackImg;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="h-full w-full snap-start snap-always relative flex flex-col justify-between overflow-hidden bg-[#030d10]">
      {/* Background Visual Container */}
      <div className="absolute inset-0 z-0">
        {isVideoFile ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={displayImage}
            autoPlay
            playsInline
            loop
            muted={isMuted}
            onClick={togglePlay}
            className="h-full w-full object-cover cursor-pointer"
          />
        ) : isDriveEmbed ? (
          <iframe
            src={`${formattedVideo}?autoplay=1&muted=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            className="h-full w-full border-none object-cover pointer-events-auto"
            title={project.title}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={displayImage}
            alt={project.title}
            onError={() => setImgError(true)}
            className="h-full w-full object-cover"
          />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 p-6 flex justify-between items-center pointer-events-none">
        <span className="rounded-full border border-[#39FF14]/40 bg-[#0b1417]/80 backdrop-blur-md px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#39FF14]">
          {project.category}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-white/50 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
          REEL #{index + 1}
        </span>
      </div>

      {/* Right Action Icons (TikTok / Reels Style Bar) */}
      <div className="absolute right-6 bottom-24 z-20 flex flex-col items-center gap-4 pointer-events-auto">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-xl border transition shadow-xl ${
            liked
              ? 'border-[#39FF14] bg-[#39FF14] text-black'
              : 'border-white/15 bg-black/60 text-white hover:border-[#39FF14]/50 hover:text-[#39FF14]'
          }`}
        >
          <Heart size={18} className={liked ? 'fill-current' : ''} />
        </button>

        {isVideoFile && (
          <button
            onClick={toggleMute}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-xl hover:text-[#39FF14] transition shadow-xl"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        )}

        <Link
          href={`/work/${project.slug}`}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#39FF14]/40 bg-[#39FF14]/15 text-[#39FF14] backdrop-blur-xl hover:bg-[#39FF14] hover:text-black transition shadow-xl"
          title="View Project Showcase"
        >
          <ArrowRight size={18} />
        </Link>
      </div>

      {/* Bottom Content Caption Overlay */}
      <div className="relative z-10 p-6 md:p-10 max-w-2xl space-y-3 pointer-events-auto">
        {project.client && (
          <p className="text-[10px] uppercase tracking-widest font-medium text-[#39FF14]">
            {project.client}
          </p>
        )}

        <h3 className="font-display text-2xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
          {project.title}
        </h3>

        <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="pt-2 flex items-center gap-3">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-black transition hover:bg-[#39FF14]/90 shadow-lg shadow-[#39FF14]/20"
          >
            Explore Project <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}
