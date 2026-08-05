'use client';

import { useEffect, useState } from 'react';
import { User, Save, FileText, Upload } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { HeroSettings, AboutSettings } from '@/types/cms';

export default function AdminHeroAboutPage() {
  const [hero, setHero] = useState<HeroSettings | null>(null);
  const [about, setAbout] = useState<AboutSettings | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [h, a] = await Promise.all([CMSDataService.getHero(), CMSDataService.getAbout()]);
      setHero(h);
      setAbout(a);
    }
    fetchData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hero) await CMSDataService.updateHero(hero);
    if (about) await CMSDataService.updateAbout(about);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!hero || !about) return <div className="p-10 text-white/50 text-xs uppercase tracking-widest">Loading Profile...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#39FF14]">CMS Personal Information</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Hero & Profile Settings</h1>
      </div>

      {savedSuccess && (
        <div className="rounded-xl border border-[#39FF14]/40 bg-[#39FF14]/10 p-4 text-xs text-[#39FF14]">
          Hero & Profile settings updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Hero Card */}
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-6">
          <h2 className="text-base font-semibold text-white tracking-wide border-b border-white/10 pb-3">
            Hero Section Configuration
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Professional Name</label>
              <input
                type="text"
                value={hero.name}
                onChange={(e) => setHero({ ...hero, name: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Title / Subtitle</label>
              <input
                type="text"
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Headline Text</label>
            <textarea
              rows={2}
              value={hero.headline}
              onChange={(e) => setHero({ ...hero, headline: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Subdescription</label>
            <textarea
              rows={3}
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Profile Photo URL (Supabase Storage)</label>
              <input
                type="text"
                value={hero.profileImageUrl}
                onChange={(e) => setHero({ ...hero, profileImageUrl: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Resume PDF Link</label>
              <input
                type="text"
                value={hero.resumeUrl}
                onChange={(e) => setHero({ ...hero, resumeUrl: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
          </div>
        </div>

        {/* About Card */}
        <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-6">
          <h2 className="text-base font-semibold text-white tracking-wide border-b border-white/10 pb-3">
            About & Contact Information
          </h2>

          <div>
            <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">About Biography</label>
            <textarea
              rows={4}
              value={about.biography}
              onChange={(e) => setAbout({ ...about, biography: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Ending Tagline</label>
              <input
                type="text"
                value={about.tagline}
                onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Contact Email</label>
              <input
                type="email"
                value={about.email}
                onChange={(e) => setAbout({ ...about, email: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-6 py-3 text-xs font-semibold text-black hover:bg-[#39FF14]/90"
          >
            <Save size={14} /> Save Profile Settings
          </button>
        </div>
      </form>
    </div>
  );
}
