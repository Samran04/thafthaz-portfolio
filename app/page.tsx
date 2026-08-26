'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, Instagram, Linkedin, ArrowDown, FolderKanban, Sparkles, User, MapPin } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { HeroSettings, AboutSettings, Project, Showreel, Service, SocialLink } from '@/types/cms';
import { ExhibitionMedia } from '@/components/exhibition-media';
import { FeaturedShowreel } from '@/components/featured-showreel';
import { ServicesSection } from '@/components/services-section';
import { RecentWorks } from '@/components/recent-works';

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
          CMSDataService.getProjects(),
          CMSDataService.getFeaturedShowreel(),
          CMSDataService.getServices(),
          CMSDataService.getSocialLinks(),
        ]);

        setHero(heroData);
        setAbout(aboutData);
        setFeaturedProjects(projectsData.slice(0, 5));
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
          <span className="text-xs uppercase tracking-[0.3em]">Loading Studio...</span>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-[#030d10] text-white">
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative flex flex-col justify-between px-6 pt-24 pb-8 sm:pt-28 sm:pb-12 md:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(57,255,20,0.04),transparent_50%)] pointer-events-none" />

        <div className="relative z-10 grid gap-12 md:gap-16 lg:grid-cols-[1.2fr_0.8fr] max-w-6xl w-full mx-auto my-auto items-center">
          {/* Taglines & Titles */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 md:space-y-8 text-left"
          >
            <p className="text-xs uppercase tracking-[0.35em] text-[#8ea1a7] flex items-center gap-1.5 font-medium">
              <MapPin size={12} className="text-[#39FF14]" /> {hero.title} <span className="text-[#39FF14]/60 mx-1">•</span> Mangalore, KA
            </p>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white whitespace-pre-line">
              {hero.headline}
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-[#8ea1a7] leading-relaxed">
              {hero.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-semibold text-black transition hover:bg-[#39FF14]/90 shadow-lg shadow-[#39FF14]/10"
              >
                View Selected Work <ArrowRight size={14} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white transition hover:bg-white/10 hover:border-[#39FF14]/40"
              >
                About Studio <User size={14} className="text-[#39FF14]" />
              </Link>
            </div>
          </motion.div>

          {/* Profile Image Card */}
          {hero.profileImageUrl ? (
            <div className="relative justify-self-center lg:justify-self-end w-full max-w-[320px] sm:max-w-[380px] md:max-w-[420px] group">
              {/* Animated Radial Ambient Glow */}
              <motion.div
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -inset-4 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.12),transparent_60%)] blur-2xl pointer-events-none rounded-2xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 25, filter: 'blur(12px)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                  y: [0, -8, 0],
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0.5,
                  borderColor: 'rgba(57, 255, 20, 0.5)',
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                  filter: { duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                }}
                className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl border border-[#39FF14]/25 bg-[#0b1417] shadow-2xl shadow-black/80 backdrop-blur-xl cursor-pointer"
              >
                <Image
                  src={hero.profileImageUrl}
                  alt={`Portrait of ${hero.name || 'Designer'}`}
                  fill
                  sizes="(max-width: 768px) 320px, 420px"
                  className="object-cover object-[center_20%] brightness-[1.04] contrast-[1.08] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  priority
                />
              </motion.div>
            </div>
          ) : null}
        </div>
      </section>

      {/* 4. RECENT WORKS SHOWCASE */}
      <RecentWorks projects={featuredProjects} />

      {/* 6. FINAL STUDIO CTA */}
      <section id="contact-cta" className="h-screen w-full snap-start snap-always flex flex-col justify-center items-center py-24 px-6 text-center bg-[#030d10] relative">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-display text-4xl sm:text-6xl font-semibold text-white tracking-tight leading-tight">
            Let’s create visual identities people remember.
          </h2>
          <p className="text-sm sm:text-base text-[#8ea1a7] max-w-xl mx-auto">
            Available for select brand commissions, poster series, video production, and commercial visual projects.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-black transition hover:bg-[#39FF14]/90 shadow-xl shadow-[#39FF14]/10"
            >
              Start a Commission <Mail size={14} />
            </Link>
            <a
              href="tel:+918277389481"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-white transition hover:border-[#39FF14]/40"
            >
              <Phone size={14} className="text-[#39FF14]" /> Call +91 82773 89481
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
