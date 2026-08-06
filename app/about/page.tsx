'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Award, CheckCircle2, Mail, Phone, ExternalLink } from 'lucide-react';
import { AboutWorkflowSection } from '@/components/about-workflow-section';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#030d10] text-white pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8ea1a7] transition hover:text-[#39FF14]"
        >
          <ArrowLeft size={14} className="text-[#39FF14]" /> Back to Studio
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Top Header */}
        <div className="space-y-4 max-w-3xl border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] flex items-center gap-2 font-semibold">
            <MapPin size={14} /> Based in Mangalore, Karnataka
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight">
            About Thafthaz
          </h1>
          <p className="text-base text-[#8ea1a7] leading-relaxed">
            Graphic Designer & Visual Communicator holding a B.Sc. in Visual Communication from St. Aloysius College, Mangalore. Specializing in brand visual identity, editorial publications, poster series, commercial layout design, and video editing.
          </p>
        </div>

        {/* Workflow & Philosophy Section */}
        <AboutWorkflowSection />

        {/* Personal Details & Qualifications Quick Grid */}
        <div className="grid gap-8 md:grid-cols-2 pt-10 border-t border-white/10">
          <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-4 shadow-xl">
            <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#39FF14]">
              Design Philosophy & Approach
            </h3>
            <p className="text-sm text-[#8ea1a7] leading-relaxed">
              Every design decision is built on spatial rhythm, typographic hierarchy, and visual clarity. Whether creating branding for local commercial businesses in Mangalore or designing publication artwork for regional institutions, the focus is always on creating work that communicates clearly and leaves a lasting impression.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#39FF14]">
                Direct Contacts & Commissions
              </h3>
              <p className="text-sm text-[#8ea1a7]">
                Available for freelance branding, poster series, and visual communication projects.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="mailto:thafthaz313@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] px-6 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-black hover:bg-[#39FF14]/90 transition"
              >
                <Mail size={14} /> Send Email
              </a>
              <a
                href="tel:+918277389481"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white hover:border-[#39FF14]/40 transition"
              >
                <Phone size={14} className="text-[#39FF14]" /> Call +91 82773 89481
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
