'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Film } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { Showreel } from '@/types/cms';
import { FeaturedShowreel } from '@/components/featured-showreel';

export default function ShowreelPage() {
  const [showreels, setShowreels] = useState<Showreel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadShowreels() {
      try {
        const data = await CMSDataService.getAllShowreels();
        setShowreels(data);
      } catch (err) {
        console.error('Failed to load showreels', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadShowreels();
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
            <Film size={14} /> Cinema & Motion Gallery
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight">
            Featured Showreels
          </h1>
          <p className="text-base text-[#8ea1a7] leading-relaxed">
            Commercial brand films, 9:16 vertical social reels, kinetic motion typography, and video editing showcases.
          </p>
        </div>

        {/* Showreel Showcase */}
        {isLoading ? (
          <div className="py-20 text-center text-xs uppercase tracking-[0.25em] text-[#8ea1a7]">
            Loading Showreel Gallery...
          </div>
        ) : (
          <div className="space-y-16">
            {showreels.map((sr) => (
              <div key={sr.id} className="space-y-6">
                <FeaturedShowreel showreel={sr} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
