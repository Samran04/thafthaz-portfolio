'use client';

import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';

const workflowSteps = [
  {
    step: '01',
    title: 'Discovery & Creative Direction',
    description: 'Deconstructing campaign objectives, defining spatial visual tone, storyboard pacing, and setting key aesthetic benchmarks.',
  },
  {
    step: '02',
    title: 'Filming & Studio Production',
    description: 'High-definition videography, commercial lighting setups, crisp audio capture, and spatial portrait photography in Mangalore.',
  },
  {
    step: '03',
    title: 'Post-Production & Motion Graphics',
    description: 'Rhythmic video editing, DaVinci Resolve color grading, kinetic typography in After Effects, and precision sound design.',
  },
  {
    step: '04',
    title: 'Multi-Format Master Delivery',
    description: 'Optimized delivery for 16:9 cinema showcases, 9:16 vertical social reels, and high-resolution print poster artwork.',
  },
];

export function AboutWorkflowSection() {
  return (
    <section id="about-workflow" className="relative flex flex-col justify-between items-center px-6 py-20 md:py-28 bg-[#071114] text-white w-full">
      {/* Subtle Cyan Backing Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(57,255,20,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10 space-y-12 md:space-y-16">
        
        {/* Top Grid: Who I Am */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 lg:grid-cols-12 items-center border-b border-white/10 pb-10"
        >
          {/* Left Column: Who I Am Text & Mangalore SEO Badges */}
          <div className="lg:col-span-7 space-y-4">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[#39FF14] flex items-center gap-1.5 font-semibold">
              <MapPin size={12} /> Based in Mangalore, Karnataka
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
              Who I Am
            </h2>
            <p className="text-sm sm:text-base text-[#8ea1a7] leading-relaxed">
              I am <strong className="text-white">Thafthaz</strong> — a professional <strong className="text-[#39FF14]">Video Editor, Videographer, and Creative Graphic Designer</strong> based in Mangalore, Karnataka.
            </p>
            <p className="text-xs sm:text-sm text-[#8ea1a7]/90 leading-relaxed">
              I specialize in transforming brand concepts into immersive visual narratives. Whether directing cinematic video shoots, editing high-retention social reels, crafting 2D/3D motion graphics, or designing minimalist poster series, every piece is built on editorial rhythm and spatial restraint.
            </p>

            <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-medium uppercase tracking-wider text-white">
              <span className="rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-3 py-1.5 text-[#39FF14]">
                Mangalore Video Production
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#8ea1a7]">
                Cinematic Video Editing
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[#8ea1a7]">
                Commercial Graphic Design
              </span>
            </div>
          </div>

          {/* Right Column: Key Discipline Summary Card */}
          <div className="lg:col-span-5">
            <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-6 space-y-4 shadow-2xl backdrop-blur-xl">
              <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#39FF14] flex items-center gap-2">
                <CheckCircle2 size={14} /> Core Expertise
              </h3>
              <ul className="space-y-3 text-xs text-[#8ea1a7]">
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14]">•</span>
                  <span><strong>Videography:</strong> Commercial camera direction & event production</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14]">•</span>
                  <span><strong>Video Editing:</strong> Fast-paced social cuts, trailers & showreels</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14]">•</span>
                  <span><strong>Graphic Design:</strong> Poster design series & key visual systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39FF14]">•</span>
                  <span><strong>Motion Graphics:</strong> Kinetic title sequences & 2D/3D animations</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section: How I Work (Asymmetrical Editorial Split Composition) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 md:space-y-10"
        >
          {/* Asymmetrical Editorial Header Lockup */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 pb-4 border-b border-white/5">
            {/* Left Column: Heading */}
            <div className="space-y-1.5 max-w-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#39FF14]">
                Methodology & Process
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-none">
                How I Work
              </h3>
            </div>

            {/* Right Column: Supporting Description anchored with vertical border accent */}
            <div className="max-w-md md:pl-6 md:border-l md:border-[#39FF14]/25 self-end">
              <p className="text-xs sm:text-sm text-[#8ea1a7] leading-relaxed">
                A disciplined 4-step creative workflow bridging strategic direction, precise camera work, editorial pacing, and master multi-format delivery.
              </p>
            </div>
          </div>

          {/* Workflow Process Cards Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((item) => (
              <div
                key={item.step}
                className="group relative flex flex-col justify-between h-full rounded-[1.5rem] border border-white/5 bg-[#0b1417]/60 p-6 md:p-7 space-y-5 transition duration-500 hover:border-[#39FF14]/40 hover:bg-[#0b1417] hover:shadow-xl"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="font-display text-2xl font-semibold text-[#39FF14]">
                    {item.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#39FF14]/40 group-hover:bg-[#39FF14] transition" />
                </div>

                {/* Content Container */}
                <div className="space-y-3.5 flex-1 flex flex-col justify-start">
                  <h4 className="text-sm font-semibold text-white tracking-tight leading-snug group-hover:text-white transition">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#8ea1a7] leading-relaxed group-hover:text-white/80 transition">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Footer credit indicator */}
      <div className="relative z-10 flex justify-center w-full pt-4">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
          Mangalore • Karnataka • Global Commissions
        </p>
      </div>
    </section>
  );
}
