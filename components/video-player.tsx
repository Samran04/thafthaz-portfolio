'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AspectRatio } from '@/types/cms';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  aspectRatio?: AspectRatio;
  autoPlayHover?: boolean;
  loop?: boolean;
  className?: string;
}

export function VideoPlayer({
  src,
  poster,
  title,
  aspectRatio = '16:9',
  autoPlayHover = false,
  loop = true,
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);

  const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Format seconds to mm:ss
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '0:00';
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      setHasStartedPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const dur = videoRef.current.duration;
    if (dur > 0) {
      setProgress((current / dur) * 100);
      setCurrentTime(formatTime(current));
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(formatTime(videoRef.current.duration));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTo = (parseFloat(e.target.value) / 100) * videoRef.current.duration;
    videoRef.current.currentTime = seekTo;
    setProgress(parseFloat(e.target.value));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
      setIsFullscreen(false);
    }
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    if (autoPlayHover && videoRef.current && !isPlaying) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStartedPlaying(true);
      }).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (autoPlayHover && videoRef.current && isPlaying && !hasStartedPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeout.current) clearTimeout(hideControlsTimeout.current);
    hideControlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 2500);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (!containerRef.current?.contains(document.activeElement) && !isFullscreen) return;

      if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, isFullscreen]);

  // Aspect ratio helper class
  const aspectClasses = {
    '16:9': 'aspect-[16/9]',
    '9:16': 'aspect-[9/16]',
    '21:9': 'aspect-[21/9]',
    '1:1': 'aspect-square',
    '3:4': 'aspect-[3/4]',
    '4:3': 'aspect-[4/3]',
  }[aspectRatio] || 'aspect-[16/9]';

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#071114] shadow-2xl ${aspectClasses} ${className}`}
    >
      {/* HTML5 Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        muted={isMuted}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        className="h-full w-full object-cover transition duration-300"
        onClick={togglePlay}
      />

      {/* Poster overlay overlay play button when not playing */}
      {!isPlaying && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/40 backdrop-blur-[2px] transition duration-300 group-hover:bg-black/20"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex h-16 w-16 items-center justify-center rounded-full border border-[#39FF14]/40 bg-[#0b1417]/80 text-[#39FF14] shadow-xl backdrop-blur-md transition group-hover:border-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-black"
          >
            <Play size={24} className="ml-1 fill-current" />
          </motion.div>
        </div>
      )}

      {/* Top Title Overlay */}
      {title && (
        <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent transition duration-300 pointer-events-none ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/90">{title}</p>
        </div>
      )}

      {/* Bottom Controls Bar */}
      <AnimatePresence>
        {(showControls || !isPlaying) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 p-4 bg-gradient-to-t from-[#030d10] via-[#030d10]/90 to-transparent"
          >
            {/* Progress Slider Bar */}
            <div className="relative flex items-center w-full group/slider">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[#39FF14] transition hover:h-2"
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-[#39FF14]"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                <button
                  onClick={toggleMute}
                  className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-[#39FF14]"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <span className="text-[10px] uppercase tracking-wider text-[#8ea1a7]">
                  {currentTime} / {duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (videoRef.current) videoRef.current.currentTime = 0;
                  }}
                  className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-[#39FF14]"
                  title="Replay"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="rounded-full p-2 text-white/80 transition hover:bg-white/10 hover:text-[#39FF14]"
                  title="Fullscreen"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
