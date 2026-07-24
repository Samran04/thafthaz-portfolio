'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, Instagram, Linkedin, ArrowDown, FolderKanban } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { HeroSettings, AboutSettings, Project, Showreel, Service, SocialLink } from '@/types/cms';
import { ExhibitionMedia } from '@/components/exhibition-media';
import { FeaturedShowreel } from '@/components/featured-showreel';
import { ServicesSection } from '@/components/services-section';
import { AboutWorkflowSection } from '@/components/about-workflow-section';

export default function HomePage() {
  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [about, setAbout] = useState<AboutSettings | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredShowreel, setFeaturedShowreel] = useState<Showreel | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCMSData() {
      try {
        const [heroData, aboutData, projectsData, showreelData, servicesData, socialsData] = await Promise.all([
          CMSDataService.getHero(),
          CMSDataService.getAbout(),
          CMSDataService.getProjects(undefined, true),
          CMSDataService.getFeaturedShowreel(),
          CMSDataService.getServices(),
          CMSDataService.getSocialLinks(),
        ]);

        setHero(heroData);
        setAbout(aboutData);
        setFeaturedProjects(projectsData.slice(0, 3));
        setFeaturedShowreel(showreelData);
        setServices(servicesData);
        setSocialLinks(socialsData);
      } catch (err) {
        console.error('Failed to load CMS data', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadCMSData();
  }, []);

  if (isLoading || !hero || !about) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#030d10] text-[#39FF14]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#39FF14] border-t-transparent" />
          <span className="text-xs uppercase tracking-[0.3em]">Loading Exhibition...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="snap-container no-scrollbar w-full bg-[#030d10] text-white">
      {/* 1. HERO SECTION */}
      <section id="hero" className="snap-section relative flex flex-col justify-between px-6 py-10 md:px-16 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(57,255,20,0.04),transparent_50%)] pointer-events-none" />

        {/* Top Spacer to clear floating navbar */}
        <div className="h-10 md:h-14" />

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
              {hero.title} <span className="text-[#39FF14]/60 mx-1">•</span> Mangalore, KA
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white whitespace-pre-line">
              {hero.headline}
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-[#8ea1a7] leading-relaxed">
              {hero.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition hover:bg-[#39FF14]/10 hover:border-[#39FF14]/40"
              >
                Explore Services <ArrowDown size={14} className="text-[#39FF14] animate-pulse" />
              </Link>
            </div>
          </motion.div>

          {/* Profile Card */}
          <div className="relative justify-self-center lg:justify-self-end w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
            <div className="absolute -inset-4 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08),transparent_55%)] blur-2xl pointer-events-none rounded-[3rem]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.7, delay: 0.1, ease: 'easeOut' },
                scale: { duration: 0.7, delay: 0.1, ease: 'easeOut' },
                filter: { duration: 0.7, delay: 0.1, ease: 'easeOut' },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
              }}
              className="relative w-full aspect-[3/4] overflow-hidden rounded-[2rem] border border-[#39FF14]/15 bg-[#0b1417] p-1.5 shadow-2xl shadow-black/80 backdrop-blur-xl sm:p-2"
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.4rem] bg-[#071114]">
                <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_35%,rgba(3,13,16,0.18)_100%)] pointer-events-none" />
                <Image
                  src={hero.profileImageUrl}
                  alt={`Portrait of ${hero.name} - Video Editor & Graphic Designer in Mangalore`}
                  fill
                  sizes="(max-width: 768px) 280px, 360px"
                  className="scale-[1.10] object-cover object-[center_44%] brightness-[1.04] contrast-[1.08] saturate-[1.05] sm:scale-[1.04] sm:object-[center_18%]"
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

      {/* 2. MY SERVICES SECTION (Videography, Photography, Graphic Design, Motion Graphics) */}
      <ServicesSection services={services} />

      {/* 3. WHO I AM & HOW I WORK SECTION (Mangalore SEO Focused) */}
      <AboutWorkflowSection />

      {/* 4. FEATURED SHOWREEL SECTION */}
      {featuredShowreel && (
        <div id="showreel">
          <FeaturedShowreel showreel={featuredShowreel} />
        </div>
      )}

      {/* 5. CURATED EXHIBITION PROJECTS */}
      {featuredProjects.map((project, idx) => (
        <section
          key={project.slug}
          id={`project-${idx}`}
          className="snap-section relative flex flex-col justify-between items-center px-6 py-12 md:py-16"
        >
          <div className="h-10 md:h-14" />

          {/* Artwork Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 25, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex items-center justify-center w-full max-w-5xl"
          >
            <ExhibitionMedia imageSrc={project.thumbnail} alt={project.title} />
          </motion.div>

          {/* Info Card */}
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

      {/* 6. EXPLORE FULL ARCHIVE CARD */}
      <section className="snap-section relative flex flex-col justify-between items-center px-6 py-12 md:py-16 bg-[#071114]">
        <div className="h-10 md:h-14" />

        <div className="max-w-3xl w-full mx-auto my-auto text-center space-y-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14]">
            <FolderKanban size={26} />
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Explore Full Portfolio Archive
          </h2>
          <p className="text-sm text-[#8ea1a7] leading-relaxed max-w-lg mx-auto">
            Browse all 16+ video edits, 9:16 mobile reels, spatial poster series, and visual identity projects.
          </p>
          <div className="pt-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-black transition hover:bg-[#39FF14]/90"
            >
              Browse 16+ Projects Archive <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex justify-center w-full">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            Mangalore Video Production & Design Catalog
          </p>
        </div>
      </section>

      {/* 7. ABOUT & CONTACT SECTION (With Email & Phone Number) */}
      <section id="about" className="snap-section relative flex flex-col justify-between px-6 py-12 md:px-16 md:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,255,20,0.03),transparent_40%)] pointer-events-none" />

        {/* Top Header */}
        <div className="w-full max-w-6xl mx-auto flex justify-between items-center text-[9px] uppercase tracking-[0.25em] text-white/20">
          <span>THAFTHAZ EXHIBITION © 2026</span>
          <Link href="#hero" className="hover:text-white transition">Back to Top</Link>
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
              {about.tagline}
            </h2>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-[#8ea1a7] leading-relaxed">
              {about.subline}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-6"
          >
            {/* Primary Contact CTAs (Email + Phone Number) */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`mailto:${about.email}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-white transition hover:bg-[#39FF14]/15 hover:border-[#39FF14]/40"
              >
                Send an Email <Mail size={13} className="text-[#39FF14]" />
              </a>

              {about.phone && (
                <a
                  href={`tel:${about.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2.5 rounded-full border border-[#39FF14] bg-[#39FF14] px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-black transition hover:bg-[#39FF14]/90 shadow-lg shadow-[#39FF14]/10"
                >
                  <Phone size={13} /> Call {about.phone}
                </a>
              )}
            </div>

            {/* Social & Contact links */}
            <div className="flex items-center justify-center gap-8 pt-6 border-t border-white/5 w-full max-w-sm">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-[0.2em] text-[#8ea1a7] hover:text-white transition flex items-center gap-1.5"
                >
                  {social.platform === 'Instagram' && <Instagram size={11} />}
                  {social.platform === 'LinkedIn' && <Linkedin size={11} />}
                  {social.platform === 'Email' && <Mail size={11} />}
                  {social.platform}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Credit */}
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full max-w-6xl mx-auto text-[9px] uppercase tracking-[0.25em] text-white/20 gap-2 border-t border-white/5 pt-4">
          <span>Designed with restraint in Mangalore</span>
          <span>Crafted in 2026</span>
        </div>
      </section>
    </main>
  );
}
