'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { Service } from '@/types/cms';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await CMSDataService.getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <main className="min-h-screen bg-[#030d10] text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]"
        >
          <ArrowLeft size={14} className="text-[#39FF14]" /> Back to Studio
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] flex items-center gap-2 font-semibold">
            <Sparkles size={14} /> Creative Offerings
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight">
            Services & Deliverables
          </h1>
          <p className="text-base text-[#8ea1a7] leading-relaxed">
            Specialized visual communication, poster design, publication layout, motion graphics, and video production tailored for commercial brands, agencies, and regional institutions.
          </p>
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="py-20 text-center text-xs uppercase tracking-[0.25em] text-[#8ea1a7]">
            Loading Services...
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-6 flex flex-col justify-between hover:border-[#39FF14]/40 transition shadow-xl"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#39FF14]">
                    Studio Service
                  </span>
                  <h2 className="text-2xl font-semibold text-white tracking-tight">{service.title}</h2>
                  <p className="text-sm text-[#8ea1a7] leading-relaxed">{service.description}</p>
                </div>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="space-y-3 border-t border-white/5 pt-4">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white">
                      Key Deliverables
                    </p>
                    <ul className="grid grid-cols-2 gap-2 text-xs text-[#8ea1a7]">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 size={12} className="text-[#39FF14]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* CTA Banner */}
        <div className="rounded-[2.5rem] border border-[#39FF14]/30 bg-gradient-to-r from-[#0b1417] via-[#040f12] to-[#0b1417] p-8 md:p-12 text-center space-y-6 shadow-2xl">
          <h2 className="font-display text-2xl sm:text-4xl font-semibold text-white">
            Have a project in mind?
          </h2>
          <p className="text-sm text-[#8ea1a7] max-w-xl mx-auto">
            Whether you need a single poster campaign, brand identity, or video production edit, let’s discuss your vision.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-8 py-4 text-xs uppercase tracking-[0.25em] font-semibold text-black hover:bg-[#39FF14]/90 transition"
          >
            Start a Commission
          </Link>
        </div>
      </div>
    </main>
  );
}
