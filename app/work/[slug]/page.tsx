import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, FolderKanban, Images, Video, Calendar, User, Wrench } from 'lucide-react';
import { notFound } from 'next/navigation';
import { CMSDataService } from '@/lib/cms/data-service';
import { VideoPlayer } from '@/components/video-player';
import { PortraitVideoCard } from '@/components/portrait-video-card';
import type { Metadata } from 'next';

export async function generateStaticParams() {
  const projects = await CMSDataService.getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await CMSDataService.getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found | Thafthaz' };
  }

  const title = project.metaTitle || `${project.title} | Thafthaz Portfolio`;
  const description = project.metaDescription || project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [project.thumbnail],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [project.thumbnail],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await CMSDataService.getProjectBySlug(slug);

  if (!project) notFound();

  // Separate media items into videos and images
  const videoMedia = project.media.filter((m) => m.mediaType === 'video');
  const imageMedia = project.media.filter((m) => m.mediaType === 'image');

  // Fallback to legacy posters array if imageMedia is empty
  const galleryImages = imageMedia.length > 0 ? imageMedia.map((m) => m.url) : project.posters;

  return (
    <main className="min-h-screen bg-[#030d10] px-6 py-28 text-white sm:px-12 lg:px-16">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        {/* Back link */}
        <Link
          href="/work"
          className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]"
        >
          <ArrowLeft size={14} className="text-[#39FF14]" /> Back to Archive
        </Link>

        {/* Header Block */}
        <header className="flex flex-col gap-6 border-b border-white/5 pb-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.25em] text-[#39FF14]/80">{project.category}</p>
            <h1 className="text-4xl font-semibold leading-none tracking-tight sm:text-5xl">{project.title}</h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8ea1a7]">{project.description}</p>
        </header>

        {/* Project Meta Pills */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-[#0b1417] px-4 py-2 text-[#8ea1a7]">
            <FolderKanban size={13} className="text-[#39FF14]" /> {project.projectType || project.category}
          </span>
          {project.client && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-[#0b1417] px-4 py-2 text-[#8ea1a7]">
              <User size={13} className="text-[#39FF14]" /> Client: {project.client}
            </span>
          )}
          {project.releaseDate && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-[#0b1417] px-4 py-2 text-[#8ea1a7]">
              <Calendar size={13} className="text-[#39FF14]" /> {project.releaseDate}
            </span>
          )}
          {project.softwareUsed && project.softwareUsed.length > 0 && (
            <span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-[#0b1417] px-4 py-2 text-[#8ea1a7]">
              <Wrench size={13} className="text-[#39FF14]" /> {project.softwareUsed.join(' • ')}
            </span>
          )}
          {galleryImages.length > 0 && (
            <span className="flex items-center gap-1.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-2 text-[#39FF14]">
              <Images size={13} /> {galleryImages.length} images
            </span>
          )}
        </div>

        {/* Dynamic Video Section (If Videos Exist) */}
        {(videoMedia.length > 0 || project.videoUrl) && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8ea1a7] flex items-center gap-2">
              <Video size={14} className="text-[#39FF14]" /> Video Showcase
            </h2>

            {/* Primary Video Player if defined on main project */}
            {project.videoUrl && videoMedia.length === 0 && (
              <VideoPlayer
                src={project.videoUrl}
                poster={project.thumbnail}
                title={project.title}
                aspectRatio="16:9"
              />
            )}

            {/* Media Videos Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {videoMedia.map((vid) => {
                if (vid.aspectRatio === '9:16') {
                  return (
                    <div key={vid.id} className="flex justify-center w-full">
                      <PortraitVideoCard
                        src={vid.url}
                        poster={vid.thumbnailUrl || project.thumbnail}
                        title={vid.title || project.title}
                        duration={vid.duration}
                      />
                    </div>
                  );
                }

                return (
                  <div key={vid.id} className="col-span-full">
                    <VideoPlayer
                      src={vid.url}
                      poster={vid.thumbnailUrl || project.thumbnail}
                      title={vid.title || project.title}
                      aspectRatio={vid.aspectRatio}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Gallery Posters Section */}
        {galleryImages.length > 0 && (
          <div className="space-y-6 pt-4">
            <h2 className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8ea1a7] flex items-center gap-2">
              <Images size={14} className="text-[#39FF14]" /> Gallery & Visual Artworks
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((poster, index) => (
                <div
                  key={poster}
                  className="overflow-hidden rounded-[1.5rem] border border-white/5 bg-[#0b1417]/50 p-2 shadow-xl shadow-black/20"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[1rem]">
                    <Image
                      src={poster}
                      alt={`${project.title} artwork ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      priority={index < 3}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}