'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Video, Images, FolderKanban } from 'lucide-react';
import { CMSDataService } from '@/lib/cms/data-service';
import { Project, Category } from '@/types/cms';

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, projs] = await Promise.all([
          CMSDataService.getCategories(),
          CMSDataService.getProjects(),
        ]);
        const allCategory: Category = { id: 'all', name: 'All Work', slug: 'all', displayOrder: 0 };
        setCategories([allCategory, ...cats]);
        setProjects(projs);
      } catch (err) {
        console.error('Failed to load archive projects', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => {
        const catSlug = p.category.toLowerCase().replace(/\s+/g, '-');
        const typeSlug = p.projectType ? p.projectType.toLowerCase().replace(/\s+/g, '-') : '';
        return catSlug.includes(activeCategory) || typeSlug.includes(activeCategory) || activeCategory.includes(catSlug);
      });

  return (
    <main className="min-h-screen bg-[#030d10] text-white px-6 py-28 sm:px-12 lg:px-16">
      <section className="mx-auto flex max-w-6xl flex-col gap-12">
        {/* Back to Studio link */}
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]"
        >
          <ArrowLeft size={14} className="text-[#39FF14]" /> Back to Studio
        </Link>

        {/* Heading Block */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] font-semibold flex items-center gap-2">
              <FolderKanban size={14} /> Studio Portfolio Catalog
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl leading-none font-display">
              Selected Work
            </h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8ea1a7]">
            Comprehensive archive of poster series, brand visual systems, motion graphics, commercial campaigns, and video productions.
          </p>
        </div>

        {/* Category Filter Tabs */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id || cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] font-medium transition ${
                  activeCategory === cat.slug
                    ? 'border border-[#39FF14]/40 bg-[#39FF14]/15 text-[#39FF14]'
                    : 'border border-white/5 bg-[#0b1417]/50 text-[#8ea1a7] hover:border-white/20 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading ? (
          <div className="flex py-20 justify-center text-xs uppercase tracking-[0.25em] text-[#8ea1a7]">
            Loading Work Archive...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-xs uppercase tracking-[0.25em] text-[#8ea1a7] rounded-3xl border border-white/5 bg-[#0b1417] p-8">
            No projects found in database. Add new projects via Admin Panel.
          </div>
        ) : (
          /* Projects Grid */
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid gap-8 sm:grid-cols-2"
          >
            {filteredProjects.map((project) => {
              const hasVideo = Boolean(project.videoUrl || (project.media && project.media.some((m) => m.mediaType === 'video')));

              return (
                <motion.div
                  key={project.id || project.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)' },
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="group flex flex-col h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1417] transition hover:border-[#39FF14]/40 hover:shadow-2xl shadow-black/80"
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[16/11] overflow-hidden bg-[#071114]">
                      {project.thumbnail && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-[700ms] ease-out group-hover:scale-[1.03]"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030d10] via-transparent to-transparent opacity-70" />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                        {hasVideo ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#39FF14]/40 bg-[#030d10]/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#39FF14]">
                            <Video size={10} /> Video Showcase
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#030d10]/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#8ea1a7]">
                            <Images size={10} /> Artwork Series
                          </span>
                        )}

                        {project.isFeatured && (
                          <span className="rounded-full border border-[#39FF14]/30 bg-[#030d10]/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#39FF14]">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Info Card */}
                    <div className="flex items-center justify-between p-6 mt-auto border-t border-white/5">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#39FF14]/80">
                          {project.category}
                        </span>
                        <h2 className="text-lg font-semibold text-white tracking-tight leading-tight group-hover:text-[#39FF14] transition">
                          {project.title}
                        </h2>
                      </div>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#8ea1a7] transition group-hover:border-[#39FF14]/40 group-hover:bg-[#39FF14]/10 group-hover:text-[#39FF14]">
                        <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </section>
    </main>
  );
}
