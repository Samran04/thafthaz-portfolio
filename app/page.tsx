'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Instagram, Linkedin, ArrowDown } from 'lucide-react';
import { projects } from '@/app/data/projects';
import { ExhibitionMedia } from '@/components/exhibition-media';

/**
 * HomePage represents the digital exhibition experience.
 * It uses CSS Scroll Snap to scroll through 100vh sections.
 * Lenis is disabled on this page to prevent scroll collision.
 */
export default function HomePage() {
  // Filter for featured works only (Visual Rhythms, Typographic Restraint, etc.)
  const featuredProjects = projects.filter((p) => p.isFeatured);

  return (
    <main className="snap-container no-scrollbar w-full bg-[#030d10] text-white">
      
      {/* 1. HERO SECTION - Minimal Refinement */}
      <section className="snap-section relative flex flex-col justify-between px-6 py-10 md:px-16 md:py-16">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(57,255,20,0.04),transparent_50%)] pointer-events-none" />

        {/* Top Header - Branding */}
        <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
          <Link href="/" className="group flex items-center gap-1.5 text-xs uppercase tracking-[0.4em] font-semibold text-white transition">
            Thafthaz<span className="w-1 h-1 rounded-full bg-[#39FF14] inline-block animate-pulse"></span>
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-white/10 bg-[#0b1417]/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:border-[#39FF14]/30 hover:text-white backdrop-blur-md"
          >
            Archive
          </Link>
        </div>

        {/* Center Content */}
        <div className="relative z-10 grid gap-10 md:gap-16 lg:grid-cols-[1.2fr_0.8fr] max-w-6xl w-full mx-auto my-auto items-center">
          
          {/* Taglines & Titles */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8 text-left"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#8ea1a7]">
              Video Editor <span className="text-[#39FF14]/60 mx-1">•</span> Graphic Designer
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white">
              Crafting visual <br />
              stories that leave <br />
              an impression.
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-[#8ea1a7] leading-relaxed">
              Immersive digital experiences shaped through editorial movement, layout rhythm, and spatial restraint.
            </p>
            <div className="pt-2">
              <Link
                href="#project-0"
                className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition hover:bg-[#39FF14]/10 hover:border-[#39FF14]/40"
              >
                Enter Exhibition <ArrowDown size={14} className="text-[#39FF14] animate-pulse" />
              </Link>
            </div>
          </motion.div>

          {/* Profile Card with floating oscillation and ambient backing glow */}
          <div className="relative justify-self-center lg:justify-self-end w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
            {/* Soft backing cyan glow */}
            <div className="absolute -inset-4 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08),transparent_55%)] blur-2xl pointer-events-none rounded-[3rem]" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15, filter: 'blur(8px)' }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: 'blur(0px)',
                y: [0, -6, 0]
              }}
              transition={{ 
                opacity: { duration: 0.7, delay: 0.1, ease: 'easeOut' },
                scale: { duration: 0.7, delay: 0.1, ease: 'easeOut' },
                filter: { duration: 0.7, delay: 0.1, ease: 'easeOut' },
                y: { 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: 'easeInOut',
                  delay: 0.8
                }
              }}
              className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] border border-[#39FF14]/15 bg-[#0b1417] p-1.5 shadow-2xl shadow-black/80 backdrop-blur-xl sm:p-2"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-[#071114]">
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_35%,rgba(3,13,16,0.18)_100%)] pointer-events-none" />
                <Image
                  src="/assets/profile/profile.jpeg"
                  alt="Portrait of Thafthaz"
                  fill
                  sizes="(max-width: 768px) 280px, 360px"
                  className="scale-[1.04] object-cover object-[center_18%] brightness-[1.04] contrast-[1.08] saturate-[1.05]"
                  style={{ objectPosition: 'center 18%' }}
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="relative z-10 flex justify-center w-full">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/20 flex items-center gap-1.5">
            Scroll to Navigate <ArrowDown size={10} className="animate-pulse" />
          </p>
        </div>
      </section>

      {/* 2. FEATURED PROJECTS SECTIONS - Centered Artwork Exhibition */}
      {featuredProjects.map((project, idx) => (
        <section
          key={project.slug}
          id={`project-${idx}`}
          className="snap-section relative flex flex-col justify-between items-center px-6 py-12 md:py-16"
        >
          {/* Top spacer to align content cleanly with nav bar clearance */}
          <div className="h-6 md:h-10" />

          {/* Artwork Container - 80% Height Centered Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 25, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex items-center justify-center w-full max-w-5xl"
          >
            <ExhibitionMedia
              imageSrc={project.image}
              alt={project.title}
            />
          </motion.div>

          {/* Minimalist Info Card below the artwork - Text-Artwork Hierarchy reversed */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 md:mt-8 text-center space-y-1.5 relative z-10"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#8ea1a7]">
              {project.category}
            </p>
            <h2 className="font-display text-xl sm:text-2xl font-semibold text-white tracking-tight leading-tight">
              {project.title}
            </h2>
            <div className="pt-1">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8ea1a7] transition hover:text-[#39FF14]"
              >
                View Project <ArrowRight size={11} className="text-[#39FF14]" />
              </Link>
            </div>
          </motion.div>
        </section>
      ))}

      {/* 3. ABOUT & CONTACT SECTION - Snapped Immersive Ending Scene */}
      <section id="about" className="snap-section relative flex flex-col justify-between px-6 py-12 md:px-16 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.03),transparent_40%)] pointer-events-none" />

        {/* Top Header */}
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center text-[9px] uppercase tracking-[0.25em] text-white/20">
          <span>THAFTHAZ EXHIBITION © 2026</span>
          <Link href="/" className="hover:text-white transition">Back to Top</Link>
        </div>

        {/* Center Content Scene */}
        <div className="max-w-4xl w-full mx-auto my-auto text-center space-y-8 md:space-y-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 md:space-y-6"
          >
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
              Let's create something <br />
              people remember.
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#8ea1a7] leading-relaxed">
              Collaborating on visual identities, cinematic editing sequences, and layouts that leave a lasting imprint.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-6"
          >
            {/* Primary Email CTA */}
            <a
              href="mailto:hello@thafthaz.com"
              className="inline-flex items-center gap-2.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-white transition hover:bg-[#39FF14]/15 hover:border-[#39FF14]/40"
            >
              Send an Email <Mail size={13} className="text-[#39FF14]" />
            </a>

            {/* Social & Contact links */}
            <div className="flex items-center justify-center gap-8 pt-6 border-t border-white/5 w-full max-w-sm">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-[#8ea1a7] hover:text-white transition flex items-center gap-1.5"
              >
                <Instagram size={11} /> Instagram
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.2em] text-[#8ea1a7] hover:text-white transition flex items-center gap-1.5"
              >
                <Linkedin size={11} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mx-auto text-[9px] uppercase tracking-[0.25em] text-white/20 gap-2 border-t border-white/5 pt-4">
          <span>Designed with restraint</span>
          <span>Crafted in 2026</span>
        </div>
      </section>

    </main>
  );
}
