import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { projects } from '@/app/data/projects';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: 'Work',
    };
  }

  return {
    title: `${project.title} | Thafthaz`,
    description: `A selected ${project.category.toLowerCase()} work entry.`,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen px-5 py-24 sm:px-8 lg:px-12">
      <section className="mx-auto flex max-w-6xl flex-col gap-8">
        <Link href="/work" className="inline-flex w-fit items-center gap-2 text-sm text-[#B8C2CC] transition hover:text-white">
          <ArrowLeft size={16} /> Back to work
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#181818] p-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
          </div>

          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-[#B8C2CC]">{project.category}</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">{project.title}</h1>
            <p className="max-w-xl text-lg leading-8 text-[#B8C2CC]">
              This entry is presented as a focused visual study with emphasis on composition, rhythm, and atmosphere.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">Selected work</span>
              <span className="rounded-full border border-[#39FF14]/25 bg-[#39FF14]/10 px-4 py-2 text-sm text-[#39FF14]">{project.category}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
