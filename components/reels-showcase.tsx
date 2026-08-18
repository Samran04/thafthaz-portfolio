'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, Smartphone, ArrowRight, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '@/types/cms';
import { formatMediaUrl, extractGoogleDriveId } from '@/lib/cms/google-drive';

interface ReelsShowcaseProps {
  projects: Project[];
}

export function ReelsShowcase({ projects }: ReelsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  if (!projects || projects.length === 0) {
    return (
      <section className="relative w-full h-[60vh] bg-[#030d10] text-white flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4 rounded-3xl border border-white/10 bg-[#0b1417] p-8 shadow-2xl">
          <div className="h-12 w-12 rounded-full border border-[#39FF14]/40 bg-[#39FF14]/10 flex items-center justify-center text-[#39FF14] mx-auto">
            <Smartphone size={24} />
          </div>
          <h2 className="font-display text-2xl font-semibold text-white">Portfolio Exhibition Ready</h2>
          <p className="text-xs text-[#8ea1a7] leading-relaxed">
            Your portfolio database is clean swept and ready! Log into your Admin Panel to add your client’s first project bundle.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/projects"
              className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-black hover:bg-[#39FF14]/90 transition"
            >
              Open Admin Panel <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const scrollNext = () => {
    if (containerRef.current) {
      const slideHeight = containerRef.current.clientHeight;
      containerRef.current.scrollBy({ top: slideHeight, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (containerRef.current) {
      const slideHeight = containerRef.current.clientHeight;
      containerRef.current.scrollBy({ top: -slideHeight, behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact-cta');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="reels-feed" className="relative w-full h-screen bg-[#030d10] text-white overflow-hidden snap-start snap-always">
      {/* Top Header Badge */}
      <div className="absolute top-6 left-6 z-30 flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#0b1417]/85 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white backdrop-blur-xl shadow-2xl">
          <Smartphone size={14} className="text-[#39FF14]" /> TikTok & Instagram Reels Feed
        </div>
      </div>

      {/* Up / Down Navigation Controls */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3 pointer-events-auto">
        <button
          onClick={scrollPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0b1417]/85 text-white backdrop-blur-xl transition hover:border-[#39FF14]/50 hover:text-[#39FF14] shadow-xl"
          aria-label="Previous Project"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={scrollNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0b1417]/85 text-white backdrop-blur-xl transition hover:border-[#39FF14]/50 hover:text-[#39FF14] shadow-xl"
          aria-label="Next Project"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      {/* Vertical Full-Screen Snap Feed Container */}
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-auto snap-y snap-mandatory no-scrollbar relative"
      >
        {projects.map((project, idx) => (
          <FullReelSlide
            key={project.id || project.slug}
            project={project}
            index={idx}
            isLast={idx === projects.length - 1}
            onScrollToContact={scrollToContact}
          />
        ))}
      </div>
    </section>
  );
}

function FullReelSlide({
  project,
  index,
  isLast,
  onScrollToContact,
}: {
  project: Project;
  index: number;
  isLast: boolean;
  onScrollToContact: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formattedImage = formatMediaUrl(project.thumbnail, false);
  const formattedVideo = formatMediaUrl(project.videoUrl || '', true);
  const isVideoFile = project.videoUrl?.endsWith('.mp4') || project.videoUrl?.endsWith('.webm');
  const driveId = extractGoogleDriveId(project.videoUrl || '');
  const isDriveEmbed = Boolean(driveId || project.videoUrl?.includes('drive.google.com') || project.videoUrl?.includes('youtube.com'));

  const displayImage = formattedImage || '';

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
    <div className="h-screen w-full snap-start snap-always relative flex flex-col justify-between overflow-hidden bg-[#030d10]">
      {/* Background Media */}
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
          displayImage && !imgError && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayImage}
              alt={project.title}
              onError={() => setImgError(true)}
              className="h-full w-full object-cover"
            />
          )
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
      </div>

      {/* Top Spacer clearance */}
      <div className="h-20 w-full relative z-10" />

      {/* Right Action Icons (TikTok / Reels Style Bar) */}
      <div className="absolute right-6 bottom-28 z-20 flex flex-col items-center gap-5 pointer-events-auto">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-xl border transition shadow-2xl ${
            liked
              ? 'border-[#39FF14] bg-[#39FF14] text-black'
              : 'border-white/15 bg-black/60 text-white hover:border-[#39FF14]/50 hover:text-[#39FF14]'
          }`}
        >
          <Heart size={20} className={liked ? 'fill-current' : ''} />
        </button>

        {isVideoFile && (
          <button
            onClick={toggleMute}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-xl hover:text-[#39FF14] transition shadow-2xl"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}

        <Link
          href={`/work/${project.slug}`}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-[#39FF14]/40 bg-[#39FF14]/15 text-[#39FF14] backdrop-blur-xl hover:bg-[#39FF14] hover:text-black transition shadow-2xl"
          title="View Case Study"
        >
          <ArrowRight size={20} />
        </Link>
      </div>

      {/* Bottom Content Caption Overlay */}
      <div className="relative z-10 p-6 md:p-12 max-w-3xl space-y-4 pointer-events-auto">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[#39FF14]/40 bg-[#39FF14]/10 px-3.5 py-1 text-[10px] uppercase tracking-[0.25em] font-semibold text-[#39FF14]">
            {project.category}
          </span>
          {project.client && (
            <span className="text-xs uppercase tracking-widest text-white/70">
              Client: {project.client}
            </span>
          )}
        </div>

        <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight leading-tight">
          {project.title}
        </h2>

        <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl line-clamp-2">
          {project.description}
        </p>

        <div className="pt-2 flex items-center gap-4">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-semibold text-black transition hover:bg-[#39FF14]/90 shadow-lg shadow-[#39FF14]/20"
          >
            Explore Project <ArrowRight size={14} />
          </Link>
        </div>

        {/* Scroll Cue or Contact Jump */}
        {isLast ? (
          <button
            onClick={onScrollToContact}
            className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#39FF14] hover:underline cursor-pointer animate-pulse"
          >
            <span>Proceed to Contact & Start a Commission</span>
            <ChevronDown size={12} className="text-[#39FF14]" />
          </button>
        ) : (
          <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40 animate-bounce">
            <span>Scroll down for next reel</span>
            <ChevronDown size={12} className="text-[#39FF14]" />
          </div>
        )}
      </div>
    </div>
  );
}
