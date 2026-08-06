'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FolderKanban, Film, Sparkles, User, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { CMSData } from '@/types/cms';

export default function AdminOverviewPage() {
  const [data, setData] = useState<{
    projectCount: number;
    showreelCount: number;
    serviceCount: number;
    featuredCount: number;
  } | null>(null);

  useEffect(() => {
    async function loadStats() {
      const [projects, showreels, services] = await Promise.all([
        CMSDataService.getProjects(),
        CMSDataService.getAllShowreels(),
        CMSDataService.getServices(),
      ]);

      setData({
        projectCount: projects.length,
        showreelCount: showreels.length,
        serviceCount: services.length,
        featuredCount: projects.filter((p) => p.isFeatured).length,
      });
    }

    loadStats();
  }, []);

  return (
    <div className="space-y-10">
      {/* Overview Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-6">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#39FF14]">CMS Executive Dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">System Overview</h1>
        </div>
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/30 bg-[#39FF14] px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-black transition hover:bg-[#39FF14]/90"
        >
          <Plus size={14} /> Add New Project
        </Link>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1417] p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-[#39FF14]">
            <FolderKanban size={22} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7]">Projects</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{data?.projectCount ?? 0}</p>
            <p className="text-xs text-[#8ea1a7] mt-1">{data?.featuredCount ?? 0} Featured on Homepage</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1417] p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-[#39FF14]">
            <Film size={22} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7]">Showreels</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{data?.showreelCount ?? 0}</p>
            <p className="text-xs text-[#8ea1a7] mt-1">Cloudinary Stream Enabled</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1417] p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-[#39FF14]">
            <Sparkles size={22} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7]">Services</span>
          </div>
          <div>
            <p className="text-3xl font-bold text-white">{data?.serviceCount ?? 0}</p>
            <p className="text-xs text-[#8ea1a7] mt-1">Dynamic Cards</p>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-[#0b1417] p-6 shadow-xl space-y-3">
          <div className="flex items-center justify-between text-[#39FF14]">
            <ShieldCheck size={22} />
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8ea1a7]">Storage</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Supabase & Cloudinary</p>
            <p className="text-xs text-[#8ea1a7] mt-1">PostgreSQL URL Mode</p>
          </div>
        </div>
      </div>

      {/* Quick Action Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-6 space-y-4">
          <h2 className="text-base font-semibold text-white tracking-wide">Manage Video Showcase</h2>
          <p className="text-xs text-[#8ea1a7] leading-relaxed">
            Upload new video cuts (16:9, 21:9, or 9:16 mobile reels), update Cloudinary URL streams, assign custom thumbnails, or switch the featured homepage showreel.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/showreels"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#39FF14] hover:underline"
            >
              Open Showreel Manager <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-6 space-y-4">
          <h2 className="text-base font-semibold text-white tracking-wide">Edit Hero & Profile</h2>
          <p className="text-xs text-[#8ea1a7] leading-relaxed">
            Update taglines, headline text, profile photo, biography, or upload a new resume PDF for immediate site updates.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/hero-about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#39FF14] hover:underline"
            >
              Open Profile Editor <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
