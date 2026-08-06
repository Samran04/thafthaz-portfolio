'use client';

import { useState } from 'react';
import { FolderKanban, ExternalLink, Image as ImageIcon } from 'lucide-react';

interface ExhibitionMediaProps {
  imageSrc: string;
  alt: string;
  driveUrl?: string;
}

export function ExhibitionMedia({ imageSrc, alt, driveUrl }: ExhibitionMediaProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !imageSrc || imageSrc.includes('drive.google.com/drive/folders')) {
    return (
      <div className="relative flex h-[340px] sm:h-[420px] w-full max-w-2xl flex-col items-center justify-center rounded-[2rem] border border-[#39FF14]/30 bg-gradient-to-b from-[#0b1417] to-[#040f12] p-8 text-center shadow-2xl shadow-black/80 space-y-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14]">
          <FolderKanban size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="font-display text-xl font-semibold text-white">{alt}</h3>
          <p className="text-xs uppercase tracking-[0.2em] text-[#39FF14]">Google Drive Portfolio Collection</p>
        </div>
        <p className="text-xs text-[#8ea1a7] max-w-md">
          Explore complete branding series, posters, and high-resolution design assets.
        </p>

        {driveUrl && (
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-semibold text-black transition hover:bg-[#39FF14]/90 mt-2"
          >
            Open Drive Folder <ExternalLink size={13} />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex h-full w-full max-h-[72vh] items-center justify-center md:max-h-[76vh]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={alt}
        onError={() => setHasError(true)}
        className="h-auto max-h-full w-auto max-w-full rounded-[1.5rem] border border-white/10 object-contain shadow-2xl"
      />
    </div>
  );
}