import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { projects } from '@/app/data/projects';

// WorkPage displays the archive of selected projects.
// It uses client-side navigation to each individual project page.
export default function WorkPage() {
  return (
    <main className="min-h-screen px-5 py-24 sm:px-8 lg:px-12">
      <section className="mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#B8C2CC]">Archive</p>
            <h1 className="mt-2 text-4xl font-semibold text-white sm:text-5xl">Selected work</h1>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#B8C2CC] sm:text-base">
            A collection of visual studies presented with clarity and space.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.slug} href={`/work/${project.slug}`} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#181818]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={project.image} alt={project.title} fill className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h2 className="text-xl font-semibold text-white">{project.title}</h2>
                  <p className="text-sm text-[#B8C2CC]">{project.category}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#39FF14]/25 bg-[#39FF14]/10 px-3 py-2 text-sm text-[#39FF14]">
                  View <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
