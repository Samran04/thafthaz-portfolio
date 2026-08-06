'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Smartphone, ArrowRight, Heart, ExternalLink, Sparkles, FolderKanban } from 'lucide-react';
import { Project } from '@/types/cms';
import { formatMediaUrl, extractGoogleDriveId } from '@/lib/cms/google-drive';

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
  return (
    <section className="py-20 md:py-28 px-4 sm:px-6 bg-[#040f12] text-white relative overflow-hidden">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(57,255,20,0.03),transparent_65%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] font-semibold flex items-center gap-2">
              <Sparkles size={14} /> Selected Portfolio & Poster Series
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight">
              Featured Projects & Motion
            </h2>
            <p className="text-xs sm:text-sm text-[#8ea1a7]">
              Explore 9:16 portrait visual edits, spatial poster series, and commercial brand identities.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white hover:border-[#39FF14]/40 hover:bg-[#39FF14]/10 transition"
          >
            Explore Full Archive <ArrowRight size={14} className="text-[#39FF14]" />
          </Link>
        </div>

        {/* 9:16 Portrait Cards Studio Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <ReelCard
              key={project.id || project.slug}
              project={project}
              index={idx}
              fallbackImg={fallbackPosters[idx % fallbackPosters.length]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function ReelCard({ project, index, fallbackImg }: { project: Project; index: number; fallbackImg: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [imgError, setImgError] = useState(false);

  const formattedImage = formatMediaUrl(project.thumbnail, false);
  const formattedVideo = formatMediaUrl(project.videoUrl || '', true);
  const isVideoFile = project.videoUrl?.endsWith('.mp4') || project.videoUrl?.endsWith('.webm');
  const driveId = extractGoogleDriveId(project.videoUrl || '');
  const isDriveEmbed = Boolean(driveId || project.videoUrl?.includes('drive.google.com') || project.videoUrl?.includes('youtube.com'));

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
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex flex-col rounded-[2.2rem] border border-white/10 bg-[#0b1417] p-3 transition duration-500 hover:border-[#39FF14]/50 hover:shadow-2xl hover:shadow-[#39FF14]/10 relative overflow-hidden"
    >
      {/* Top Frame Header Tag */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 text-[10px] tracking-widest text-[#8ea1a7] uppercase border-b border-white/5 mb-2">
        <span className="flex items-center gap-1.5 text-[#39FF14] font-semibold">
          <Smartphone size={12} /> {project.category}
        </span>
        {project.client && (
          <span className="text-white/60 truncate max-w-[130px] font-medium">
            {project.client}
          </span>
        )}
      </div>

      {/* 9:16 Aspect Portrait Visual Frame */}
      <div
        onClick={isVideoFile ? togglePlay : undefined}
        className="relative w-full aspect-[9/14] sm:aspect-[9/15] overflow-hidden rounded-[1.8rem] bg-[#030d10] border border-white/10 cursor-pointer"
      >
        {isVideoFile ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={displayImage}
            playsInline
            loop
            muted={isMuted}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
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
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />
        )}

        {/* Video Play Overlay */}
        {isVideoFile && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#39FF14]/40 bg-[#0b1417]/90 text-[#39FF14] shadow-xl backdrop-blur-md transition group-hover:bg-[#39FF14] group-hover:text-black">
              <Play size={22} className="ml-1 fill-current" />
            </div>
          </div>
        )}

        {/* Mute/Unmute Toggle */}
        {isVideoFile && isPlaying && (
          <button
            onClick={toggleMute}
            className="absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:text-[#39FF14] transition"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}

        {/* Quick Like Overlay Icon */}
        <div className="absolute right-3 bottom-4 z-20 flex flex-col items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLiked(!liked);
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
              liked ? 'bg-[#39FF14] text-black' : 'bg-black/60 text-white hover:text-[#39FF14]'
            }`}
          >
            <Heart size={16} className={liked ? 'fill-current' : ''} />
          </button>
        </div>

        {/* Bottom Caption Gradient Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#030d10] via-[#030d10]/90 to-transparent space-y-1.5">
          <h3 className="text-base font-semibold text-white tracking-tight leading-tight group-hover:text-[#39FF14] transition">
            {project.title}
          </h3>
          <p className="text-[11px] text-[#8ea1a7] line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      {/* Card Action Link */}
      <div className="p-4 pt-3 flex items-center justify-between">
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-semibold text-white group-hover:text-[#39FF14] transition"
        >
          View Case Study <ArrowRight size={13} className="text-[#39FF14]" />
        </Link>
      </div>
    </motion.div>
  );
}
