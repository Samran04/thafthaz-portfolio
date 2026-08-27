'use client';

import Image from 'next/image';
import { Phone, ArrowUpRight, Code, Sparkles } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#030d10] border-t border-white/5 pt-16 pb-12 overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(circle_at_bottom_right,rgba(57,255,20,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-10 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_left,rgba(57,255,20,0.01),transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-12 pb-12 border-b border-white/5">
          {/* Brand/Logo Column */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white/5 p-1 border border-white/10 flex items-center justify-center">
                <Image
                  src="/assets/popera-logo.png"
                  alt="PopEra Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-display text-lg font-bold tracking-wider text-white">
                  PopEra
                </span>
                <span className="block text-[9px] uppercase tracking-[0.2em] text-[#39FF14]">
                  Digital Agency
                </span>
              </div>
            </div>
            <p className="text-xs text-[#8ea1a7] leading-relaxed max-w-sm">
              Crafting state-of-the-art web applications, custom software solutions, and premium design identities that elevate businesses.
            </p>
          </div>

          {/* Call to Action Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white flex items-center gap-2">
              <Code size={14} className="text-[#39FF14]" /> Work with Us
            </h4>
            <p className="text-xs text-[#8ea1a7] leading-relaxed">
              Looking to build a premium website, dynamic web portal, or custom mobile application for your business?
            </p>
            <div className="text-xs text-white/95 font-medium flex items-center gap-1">
              <Sparkles size={12} className="text-[#39FF14]" /> Get in touch for custom development.
            </div>
          </div>

          {/* Contact Column */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-white flex items-center gap-2">
              <Phone size={14} className="text-[#39FF14]" /> Contact PopEra
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+919591574151"
                className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#0b1417]/50 hover:bg-[#0b1417] hover:border-[#39FF14]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-[#39FF14]/10 text-[#39FF14]">
                    <Phone size={13} />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-[#8ea1a7]">Call / WhatsApp</span>
                    <span className="text-xs font-semibold text-white tracking-wide group-hover:text-[#39FF14] transition-colors">+91 95915 74151</span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#39FF14] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="tel:+917676952715"
                className="group flex items-center justify-between p-3 rounded-xl border border-white/5 bg-[#0b1417]/50 hover:bg-[#0b1417] hover:border-[#39FF14]/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-[#39FF14]/10 text-[#39FF14]">
                    <Phone size={13} />
                  </div>
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-[#8ea1a7]">Call / WhatsApp</span>
                    <span className="text-xs font-semibold text-white tracking-wide group-hover:text-[#39FF14] transition-colors">+91 76769 52715</span>
                  </div>
                </div>
                <ArrowUpRight size={14} className="text-white/20 group-hover:text-[#39FF14] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom / Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              Website built by{' '}
              <a
                href="tel:+919591574151"
                className="text-white hover:text-[#39FF14] transition-colors font-semibold"
              >
                PopEra
              </a>
            </span>
            <span className="hidden sm:inline text-white/10">•</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">
              For other Websites & Apps contact us
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="text-[10px] uppercase tracking-[0.25em] text-white/40 hover:text-[#39FF14] transition-colors flex items-center gap-1.5"
          >
            Back to Top <span className="text-[#39FF14]">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
