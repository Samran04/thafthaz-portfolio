import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Instagram, Mail, Linkedin } from 'lucide-react';
import { projects } from '@/app/data/projects';

// Show only a few featured items on the home screen.
// This keeps the initial experience focused and cinematic.
const featuredWork = projects.slice(0, 3);

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent">
      {/* Hero section: first impression, full viewport height */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-10 sm:px-8 lg:px-12">
        {/* Background glow adds premium depth without overwhelming the design */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(57,255,20,0.08),transparent_45%)]" />
        <div className="relative z-10 flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Text column with title, role, and CTA */}
          <div className="max-w-2xl space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-[#B8C2CC]">Video Editor • Graphic Designer</p>
            <h1 className="font-display text-5xl font-semibold leading-[0.9] text-white sm:text-6xl lg:text-8xl">
              Crafting visuals that leave an impression.
            </h1>
            <p className="max-w-xl text-lg text-[#B8C2CC] sm:text-xl">
              Motion, design, and storytelling shaped into immersive digital experiences.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="#work"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
              >
                Explore work <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Profile card for a premium visual presence */}
          <div className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-white/10 bg-[#181818]/70 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl lg:mx-0">
            <div className="overflow-hidden rounded-[1.5rem]">
              <Image
                src="/assets/profile/profile.jpg"
                alt="Portrait of the creator"
                width={800}
                height={1000}
                className="h-[460px] w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured work preview section */}
      <section id="work" className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#B8C2CC]">Selected work</p>
              <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Featured projects</h2>
            </div>
            <Link href="/work" className="text-sm text-[#39FF14] transition hover:opacity-80">
              View all
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredWork.map((item) => (
              <article key={item.title} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#181818]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="text-sm text-[#B8C2CC]">{item.category}</p>
                  </div>
                  <span className="rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#39FF14]">
                    Featured
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About / contact teaser section */}
      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[2rem] border border-white/10 bg-[#181818]/70 p-8 backdrop-blur xl:grid-cols-[1.1fr_0.9fr] xl:p-12">
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.35em] text-[#B8C2CC]">About</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">A quiet bold approach to moving images.</h2>
            <p className="max-w-2xl text-lg leading-8 text-[#B8C2CC]">
              This space is built to present visual work with clarity, rhythm, and restraint. The focus stays on the work itself.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-[#222222] p-6">
            <div className="flex items-center gap-3 text-white">
              <Mail size={18} />
              <a href="mailto:hello@thafthaz.com" className="transition hover:text-[#39FF14]">
                hello@thafthaz.com
              </a>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Instagram size={18} />
              <a href="https://instagram.com" className="transition hover:text-[#39FF14]">
                Instagram
              </a>
            </div>
            <div className="flex items-center gap-3 text-white">
              <Linkedin size={18} />
              <a href="https://linkedin.com" className="transition hover:text-[#39FF14]">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
