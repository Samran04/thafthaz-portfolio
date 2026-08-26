'use client';

import { Project } from '@/types/cms';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, FolderKanban, Sparkles, Video, Images, Calendar, User } from 'lucide-react';

interface RecentWorksProps {
  projects: Project[];
}

export function RecentWorks({ projects }: RecentWorksProps) {
  // Display 4 to 5 most recent works
  const recentProjects = projects.slice(0, 5);

  return (
    <section id="recent-works" className="relative pt-6 pb-20 md:pt-10 md:pb-24 px-6 bg-[#030d10] text-white w-full">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(57,255,20,0.03),transparent_65%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 md:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] font-semibold flex items-center gap-2">
              <FolderKanban size={14} /> Selected Portfolio Showcase
            </p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
              Recent Works
            </h2>
            <p className="text-sm sm:text-base text-[#8ea1a7] leading-relaxed">
              Handpicked commercial campaigns, motion graphics, video edits, and spatial poster design series.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition hover:border-[#39FF14]/50 hover:bg-[#39FF14]/10 hover:text-[#39FF14] shrink-0"
          >
            View Full Archive <ArrowRight size={14} />
          </Link>
        </div>

        {/* Projects Grid Container with Staggered Entrance Animations */}
        <div className="grid gap-8 md:gap-10 sm:grid-cols-2 lg:grid-cols-2">
          {recentProjects.map((project, index) => {
            const isLargeSpan = index === 0;

            return (
              <motion.div
                key={project.id || project.slug}
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={isLargeSpan ? 'sm:col-span-2 lg:col-span-2' : ''}
              >
                <ProjectCardItem project={project} index={index} isLargeSpan={isLargeSpan} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCardItem({
  project,
  index,
  isLargeSpan,
}: {
  project: Project;
  index: number;
  isLargeSpan: boolean;
}) {
  const hasVideo = Boolean(
    project.videoUrl || (project.media && project.media.some((m) => m.mediaType === 'video'))
  );

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0b1417]/90 backdrop-blur-xl transition-all duration-500 hover:border-[#39FF14]/40 hover:shadow-2xl hover:shadow-[#39FF14]/5">
      {/* Media Container with Proportional Scaling */}
      <div
        className={`relative w-full overflow-hidden bg-[#071114] ${
          isLargeSpan ? 'aspect-[16/9]' : 'aspect-[16/10]'
        }`}
      >
        <Link href={`/work/${project.slug}`} className="block h-full w-full">
          {project.thumbnail && (
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                priority={index === 0}
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1417] via-transparent to-black/20 opacity-80" />
        </Link>

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#39FF14]/30 bg-[#030d10]/80 backdrop-blur-md px-3.5 py-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#39FF14]">
            {hasVideo ? <Video size={11} /> : <Images size={11} />}
            {project.category}
          </span>

          {project.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#39FF14]/40 bg-[#39FF14]/15 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-semibold text-[#39FF14]">
              <Sparkles size={10} /> Featured
            </span>
          )}
        </div>
      </div>

      {/* Clean Content Container */}
      <div className="flex flex-col flex-1 justify-between p-6 sm:p-8 space-y-6">
        <div className="space-y-3">
          {/* Meta information row */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wider text-[#8ea1a7]">
            {project.client && (
              <span className="flex items-center gap-1">
                <User size={12} className="text-[#39FF14]" /> {project.client}
              </span>
            )}
            {project.releaseDate && (
              <span className="flex items-center gap-1">
                <span className="text-[#39FF14]/60">•</span>
                <Calendar size={12} className="text-[#39FF14]" /> {project.releaseDate}
              </span>
            )}
          </div>

          {/* Project Title */}
          <Link href={`/work/${project.slug}`}>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug group-hover:text-[#39FF14] transition-colors duration-300">
              {project.title}
            </h3>
          </Link>

          {/* Description excerpt */}
          <p className="text-xs sm:text-sm text-[#8ea1a7] leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Software stack pills */}
          {project.softwareUsed && project.softwareUsed.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.softwareUsed.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] text-[#8ea1a7]"
                >
                  {tool}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA & Action Button */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-[#39FF14] transition-all duration-300 group-hover:border-[#39FF14] group-hover:bg-[#39FF14] group-hover:text-black"
          >
            Explore Project <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30 group-hover:text-[#39FF14]/70 transition">
            0{index + 1}
          </span>
        </div>
      </div>
    </div>
  );
}
