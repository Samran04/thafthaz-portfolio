'use client';

import { Service } from '@/types/cms';
import { motion } from 'framer-motion';
import { Video, Camera, Palette, Sparkles, Film, Layers } from 'lucide-react';

interface ServicesSectionProps {
  services: Service[];
}

const iconMap: Record<string, any> = {
  Video: Video,
  Camera: Camera,
  Palette: Palette,
  Sparkles: Sparkles,
  Film: Film,
  Layers: Layers,
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="relative flex flex-col justify-between items-center px-6 py-20 md:py-28 bg-[#030d10] text-white w-full">
      {/* Subtle Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(57,255,20,0.035),transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto relative z-10 space-y-10 md:space-y-14">
        {/* Section Heading Block */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <p className="text-[10px] uppercase tracking-[0.35em] text-[#39FF14]">
            Discipline & Services
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-tight">
            My Creative Services
          </h2>
          <p className="text-xs sm:text-sm text-[#8ea1a7] leading-relaxed">
            Crafting visual experiences spanning camera direction, editorial video cuts, studio photography, and graphic design systems.
          </p>
        </motion.div>

        {/* Services Cards Grid */}
        {services.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#8ea1a7] rounded-2xl border border-white/5 bg-[#0b1417] p-6">
            No services added in database yet. Add services via Admin Panel.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Video;

              return (
                <motion.div
                  key={service.id}
                  variants={{
                    hidden: { opacity: 0, y: 25, filter: 'blur(6px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-[#0b1417]/80 p-6 sm:p-7 backdrop-blur-xl transition duration-500 hover:border-[#39FF14]/40 hover:bg-[#0b1417] hover:shadow-2xl hover:shadow-black/60"
                >
                  {/* Top Icon & Order Pill */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#39FF14]/20 bg-[#39FF14]/5 text-[#39FF14] transition duration-500 group-hover:scale-110 group-hover:border-[#39FF14]/40 group-hover:bg-[#39FF14]/15">
                        <IconComponent size={22} />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 group-hover:text-[#39FF14]/60 transition">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="font-display text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-white transition">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#8ea1a7] leading-relaxed group-hover:text-white/70 transition">
                        {service.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom indicator */}
      <div className="relative z-10 flex justify-center w-full pt-4">
        <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
          Crafted with restraint
        </p>
      </div>
    </section>
  );
}
