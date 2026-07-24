'use client';

import { useEffect, useState } from 'react';
import { Film, Save, Video, Play } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { Showreel } from '@/types/cms';

export default function AdminShowreelsPage() {
  const [showreel, setShowreel] = useState<Showreel | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    async function fetchShowreel() {
      const sr = await CMSDataService.getFeaturedShowreel();
      setShowreel(sr);
    }
    fetchShowreel();
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!showreel) return <div className="p-10 text-white/50 text-xs uppercase tracking-widest">Loading Showreel...</div>;

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/10 pb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-[#39FF14]">CMS Video Integration</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white mt-1">Homepage Showreel Settings</h1>
      </div>

      {savedSuccess && (
        <div className="rounded-xl border border-[#39FF14]/40 bg-[#39FF14]/10 p-4 text-xs text-[#39FF14]">
          Showreel configuration saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-6 text-xs">
        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Showreel Title</label>
          <input
            type="text"
            value={showreel.title}
            onChange={(e) => setShowreel({ ...showreel, title: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-wider text-[#8ea1a7] mb-1">Description</label>
          <textarea
            rows={3}
            value={showreel.description || ''}
            onChange={(e) => setShowreel({ ...showreel, description: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
          />
        </div>

        <div className="rounded-xl border border-[#39FF14]/20 bg-[#39FF14]/5 p-4 space-y-4">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-[#39FF14] flex items-center gap-1.5">
            <Video size={14} /> Cloudinary Video Stream Endpoint
          </p>

          <div>
            <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Cloudinary MP4/HLS Stream URL</label>
            <input
              type="url"
              value={showreel.videoUrl}
              onChange={(e) => setShowreel({ ...showreel, videoUrl: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Poster Thumbnail Image URL</label>
              <input
                type="text"
                value={showreel.thumbnailUrl}
                onChange={(e) => setShowreel({ ...showreel, thumbnailUrl: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-[#8ea1a7] mb-1">Duration Tag (e.g. 1:45)</label>
              <input
                type="text"
                value={showreel.duration || '1:30'}
                onChange={(e) => setShowreel({ ...showreel, duration: e.target.value })}
                className="w-full rounded-xl border border-white/10 bg-[#071114] p-3 text-white focus:border-[#39FF14] outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-6 py-3 text-xs font-semibold text-black hover:bg-[#39FF14]/90"
          >
            <Save size={14} /> Save Showreel Settings
          </button>
        </div>
      </form>
    </div>
  );
}
