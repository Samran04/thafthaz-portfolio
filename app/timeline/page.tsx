'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EducationExperienceSection } from '@/components/education-experience-section';

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-[#030d10] text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]"
        >
          <ArrowLeft size={14} className="text-[#39FF14]" /> Back to Studio
        </Link>
      </div>

      <EducationExperienceSection />
    </main>
  );
}
