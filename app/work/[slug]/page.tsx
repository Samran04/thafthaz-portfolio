import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, FolderKanban, Images } from 'lucide-react';
import { notFound } from 'next/navigation';
import { projects } from '@/app/data/projects';

export function generateStaticParams() { return projects.map((project) => ({ slug: project.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: `${project.title} | Thafthaz`, description: project.description } : { title: 'Work Detail' };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return <main className="min-h-screen bg-[#030d10] px-6 py-28 text-white sm:px-12 lg:px-16"><section className="mx-auto flex w-full max-w-6xl flex-col gap-10">
    <Link href="/work" className="inline-flex w-fit items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]"><ArrowLeft size={14} className="text-[#39FF14]" /> Back to Archive</Link>
    <header className="flex flex-col gap-5 border-b border-white/5 pb-8 md:flex-row md:items-end md:justify-between"><div className="space-y-2"><p className="text-xs uppercase tracking-[0.25em] text-[#8ea1a7]">{project.category}</p><h1 className="text-4xl font-semibold leading-none tracking-tight sm:text-5xl">{project.title}</h1></div><p className="max-w-md text-sm leading-relaxed text-[#8ea1a7]">{project.description}</p></header>
    <div className="flex flex-wrap gap-2"><span className="flex items-center gap-1.5 rounded-full border border-white/5 bg-[#0b1417] px-4 py-2 text-xs text-[#8ea1a7]"><FolderKanban size={12} /> {project.category}</span><span className="flex items-center gap-1.5 rounded-full border border-[#39FF14]/20 bg-[#39FF14]/5 px-4 py-2 text-xs text-[#39FF14]"><Images size={12} /> {project.posters.length} posters</span></div>
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{project.posters.map((poster, index) => <div key={poster} className="overflow-hidden rounded-[1.5rem] border border-white/5 bg-[#0b1417]/50 p-2 shadow-xl shadow-black/20"><div className="relative aspect-[3/4] overflow-hidden rounded-[1rem]"><Image src={poster} alt={`${project.title} poster ${index + 1}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" priority={index < 3} /></div></div>)}</div>
  </section></main>;
}