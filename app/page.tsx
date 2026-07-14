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
      
      {/* 1. HERO SECTION - Minimal & Mysterious */}
      <section className="snap-section relative flex flex-col justify-between px-6 py-12 md:px-16 md:py-20">
        {/* Subtle cyan background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(57,255,20,0.04),transparent_50%)] pointer-events-none" />

        {/* Top Header - Branding */}
        <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto">
          <Link href="/" className="group flex items-center gap-1.5 text-sm uppercase tracking-[0.4em] font-semibold text-white transition">
            Thafthaz<span className="w-1.5 h-1.5 rounded-full bg-[#39FF14] inline-block animate-pulse"></span>
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-white/10 bg-[#0b1417]/40 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:border-[#39FF14]/30 hover:text-white backdrop-blur-md"
          >
            Archive
          </Link>
        </div>

        {/* Center Content - Split layout */}
        <div className="relative z-10 grid gap-10 md:gap-16 lg:grid-cols-[1.2fr_0.8fr] max-w-7xl w-full mx-auto my-auto items-center">
          
          {/* Taglines & Titles */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8"
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
                Enter Exhibition <ArrowDown size={14} className="text-[#39FF14] animate-bounce" />
              </Link>
            </div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative justify-self-center md:justify-self-end w-full max-w-[280px] sm:max-w-[340px] aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1417]/80 p-2.5 shadow-2xl shadow-black/60 backdrop-blur-xl"
          >
            <div className="w-full h-full relative overflow-hidden rounded-[1.5rem]">
              <Image
                src="/assets/profile/profile.jpg"
                alt="Portrait of Thafthaz"
                fill
                sizes="(max-width: 768px) 280px, 340px"
                className="object-cover transition duration-[700ms]"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom indicator */}
        <div className="relative z-10 flex justify-center w-full">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 flex items-center gap-2">
            Scroll to Navigate <ArrowDown size={10} className="animate-pulse" />
          </p>
        </div>
      </section>

      {/* 2. FEATURED PROJECTS SECTIONS - Snapped Cinematic Exhibits */}
      {featuredProjects.map((project, idx) => {
        const nextSectionId = idx < featuredProjects.length - 1 ? `#project-${idx + 1}` : '#about';

        return (
          <section
            key={project.slug}
            id={`project-${idx}`}
            className="snap-section relative flex flex-col justify-center items-center px-4 md:px-12 lg:px-16 py-12"
          >
            {/* Background color glow matching project */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_80%,rgba(57,255,20,0.03),transparent_50%)] pointer-events-none" />

            {/* Media Exhibition Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 30, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-6xl h-[65vh] md:h-[70vh] rounded-[2rem] overflow-hidden border border-white/10 bg-[#0b1417]/80 shadow-2xl shadow-black/80 group"
            >
              {/* Client component handling muted/loop/intersection logic */}
              <ExhibitionMedia
                imageSrc={project.image}
                videoSrc={project.video}
                alt={project.title}
              />

              {/* Floating Overlay Glass Panel - Linear/Raycast style */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-auto md:max-w-md z-10 rounded-[1.5rem] border border-white/10 bg-[#0b1417]/85 p-5 md:p-6 shadow-2xl shadow-black/55 backdrop-blur-md transition duration-300 hover:border-white/20">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#39FF14]">
                  {project.category}
                </span>
                <h2 className="mt-1 font-display text-xl md:text-2xl font-semibold text-white tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-2 text-xs md:text-sm text-[#8ea1a7] leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold text-white transition hover:text-[#39FF14]"
                  >
                    View Study <ArrowRight size={12} />
                  </Link>
                  <span className="text-[10px] tracking-widest text-white/30 font-mono">
                    0{idx + 1} / 0{featuredProjects.length}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Micro Scroll Snapper Link for Desktop */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
              <Link href={nextSectionId} className="flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition">
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/60">Next Exhibit</span>
                <ArrowDown size={12} className="text-[#39FF14]" />
              </Link>
            </div>
          </section>
        );
      })}

      {/* 3. ABOUT & CONTACT SECTION - End of Exhibition */}
      <section id="about" className="snap-section relative flex flex-col justify-between px-6 py-12 md:px-16 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.03),transparent_40%)] pointer-events-none" />

        {/* Top Spacer */}
        <div className="w-full max-w-7xl mx-auto flex justify-between items-center text-xs tracking-wider text-white/30">
          <span>THAFTHAZ EXHIBITION © 2026</span>
          <Link href="/" className="hover:text-white transition uppercase">Back to Top</Link>
        </div>

        {/* Middle content grid */}
        <div className="grid gap-12 md:gap-16 lg:grid-cols-[1.1fr_0.9fr] max-w-7xl w-full mx-auto my-auto items-center">
          
          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.65 }}
            className="space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#8ea1a7]">Our Philosophy</p>
            <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
              A quiet, bold <br />
              approach to <br />
              moving images.
            </h2>
            <p className="max-w-xl text-base text-[#8ea1a7] leading-relaxed">
              We structure details to let projects project their own rhythm, volume, and composition. The design recedes, the work speaks.
            </p>
          </motion.div>

          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="rounded-[2rem] border border-white/10 bg-[#0b1417]/60 p-6 md:p-10 backdrop-blur-xl shadow-xl flex flex-col gap-6"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#39FF14]">Get in touch</span>
              <h3 className="mt-1 text-2xl font-semibold text-white tracking-tight">Let's discuss a project</h3>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@thafthaz.com"
                className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-[#8ea1a7] transition hover:border-[#39FF14]/30 hover:text-white"
              >
                <Mail size={16} className="text-[#39FF14]" />
                hello@thafthaz.com
              </a>
              
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-[#8ea1a7] transition hover:border-[#39FF14]/30 hover:text-white"
                >
                  <Instagram size={16} />
                  Instagram
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-[#8ea1a7] transition hover:border-[#39FF14]/30 hover:text-white"
                >
                  <Linkedin size={16} />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#8ea1a7]">Looking for the full archive?</span>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-white transition hover:bg-white/10 hover:border-white/20"
              >
                All Works <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>

        </div>

        {/* Footer Credit */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mx-auto text-[10px] uppercase tracking-[0.25em] text-white/30 gap-2">
          <span>Designed with restraint</span>
          <span>Crafted in 2026</span>
        </div>
      </section>

    </main>
  );
}
