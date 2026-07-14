import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles, FolderKanban } from 'lucide-react';
import { notFound } from 'next/navigation';
import { projects } from '@/app/data/projects';

// generateStaticParams tells Next.js which dynamic pages to pre-render.
export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// generateMetadata creates page metadata for each project page.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: 'Work Detail',
    };
  }

  return {
    title: `${project.title} | Thafthaz`,
    description: project.description,
  };
}

// ProjectPage is a server component by default.
// It renders a focused detail view for each selected project.
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#030d10] text-white px-6 py-28 sm:px-12 lg:px-16 flex flex-col justify-center">
      
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        
        {/* Navigation back */}
        <Link
          href="/work"
          className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]"
        >
          <ArrowLeft size={14} className="text-[#39FF14]" /> Back to Archive
        </Link>

        {/* Core Layout Split */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          
          {/* Visual Showcase - Image or Video Container */}
          <div className="overflow-hidden rounded-[2rem] border border-white/5 bg-[#0b1417]/50 p-3 md:p-4 shadow-2xl shadow-black/40">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-black/20">
              
              {project.video ? (
                <video
                  src={project.video}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                  priority
                />
              )}

            </div>
          </div>

          {/* Details Column */}
          <div className="space-y-6 md:space-y-8">
            
            {/* Meta Tags */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#39FF14]">
                <Sparkles size={10} /> Visual Study
              </span>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8ea1a7]">{project.category}</p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl leading-none">
                {project.title}
              </h1>
            </div>

            {/* Paragraph block */}
            <p className="text-base sm:text-lg leading-relaxed text-[#8ea1a7]">
              {project.description}
            </p>

            <div className="space-y-4 border-t border-white/5 pt-6">
              <p className="text-xs text-[#8ea1a7] leading-relaxed">
                This project showcases high aesthetic attention to details, framing, rhythm, and typography selection, curated for premium audiences.
              </p>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-full border border-white/5 bg-[#0b1417] px-4 py-2 text-xs text-[#8ea1a7] flex items-center gap-1.5">
                  <FolderKanban size={12} /> {project.category}
                </span>
                <span className="rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-2 text-xs text-[#39FF14]">
                  Exhibition Piece
                </span>
              </div>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
