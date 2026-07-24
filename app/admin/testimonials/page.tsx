'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Star } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { Testimonial } from '@/types/cms';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function loadTestimonials() {
      const list = await CMSDataService.getTestimonials();
      setTestimonials(list);
    }
    loadTestimonials();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#39FF14]">CMS Client Reviews</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Testimonials Manager</h1>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="rounded-[1.5rem] border border-white/10 bg-[#0b1417] p-6 space-y-3">
            <div className="flex items-center justify-between text-[#39FF14]">
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-current text-[#39FF14]" />
                ))}
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#8ea1a7]">{t.company}</span>
            </div>
            <p className="text-xs italic text-white/90">"{t.quote}"</p>
            <div className="text-[10px] text-[#8ea1a7] uppercase tracking-wider">
              {t.clientName} • {t.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
