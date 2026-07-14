'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { projects } from '@/app/data/projects';

/**
 * WorkPage displays the full archive of 10 selected visual studies.
 * It uses a clean grid layout with soft entrance animations and high-contrast styling.
 */
export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#030d10] text-white px-6 py-28 sm:px-12 lg:px-16">
      
      <section className="mx-auto flex max-w-6xl flex-col gap-12">
        
        {/* Back to Exhibition link */}
        <Link href="/" className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]">
          <ArrowLeft size={14} className="text-[#39FF14]" /> Back to Exhibition
        </Link>

        {/* Heading Block */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-white/5 pb-8">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8ea1a7]">Portfolio Archive</p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-none">Selected work</h1>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-[#8ea1a7]">
            A comprehensive catalog of motion graphics, video editing layouts, and spatial poster designs structured with space and intent.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
              }
            }
          }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.slug}
              variants={{
                hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
                show: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/work/${project.slug}`}
                className="group flex flex-col h-full overflow-hidden rounded-[2rem] border border-white/5 bg-[#0b1417]/40 transition hover:border-[#39FF14]/30 hover:bg-[#0b1417]/80 hover:shadow-xl hover:shadow-black/20"
              >
                {/* Image Aspect Box */}
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-[700ms] ease-out group-hover:scale-[1.03]"
                  />
                  {/* Subtle top-glow gradient on card hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030d10]/40 to-transparent opacity-60" />
                  
                  {project.isFeatured && (
                    <span className="absolute top-4 right-4 rounded-full border border-[#39FF14]/30 bg-[#030d10]/80 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#39FF14]">
                      Featured
                    </span>
                  )}
                </div>

                {/* Info Box */}
                <div className="flex items-center justify-between p-6 mt-auto">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#39FF14]/80">
                      {project.category}
                    </span>
                    <h2 className="text-lg font-semibold text-white tracking-tight leading-tight group-hover:text-white transition">
                      {project.title}
                    </h2>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 text-[#8ea1a7] transition group-hover:border-[#39FF14]/30 group-hover:bg-[#39FF14]/5 group-hover:text-white">
                    <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
      </section>

    </main>
  );
}
