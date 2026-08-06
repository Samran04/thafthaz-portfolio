'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Video, Palette, Film, Check } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { Service } from '@/types/cms';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    async function loadServices() {
      const list = await CMSDataService.getServices();
      setServices(list);
    }
    loadServices();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#39FF14]">CMS Offerings</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Services Manager</h1>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((srv) => (
          <div key={srv.id} className="rounded-[1.5rem] border border-white/10 bg-[#0b1417] p-6 space-y-3">
            <div className="flex items-center justify-between text-[#39FF14]">
              {srv.icon === 'Video' && <Video size={20} />}
              {srv.icon === 'Sparkles' && <Sparkles size={20} />}
              {srv.icon === 'Palette' && <Palette size={20} />}
              {srv.icon === 'Film' && <Film size={20} />}
              <span className="text-[10px] uppercase tracking-wider text-[#8ea1a7]">Order #{srv.displayOrder}</span>
            </div>
            <h2 className="text-base font-semibold text-white">{srv.title}</h2>
            <p className="text-xs text-[#8ea1a7] leading-relaxed">{srv.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
