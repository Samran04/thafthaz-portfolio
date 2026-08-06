'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MapPin, Send, Instagram, Linkedin, Globe, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'Branding', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-white/10 pb-8">
          <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] flex items-center gap-2 font-semibold">
            <Mail size={14} /> Direct Inquiries
          </p>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-tight">
            Start a Commission
          </h1>
          <p className="text-base text-[#8ea1a7] leading-relaxed">
            Have a project, brand identity, poster series, or video production edit in mind? Reach out directly via email, phone, or send an inquiry below.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-6 shadow-xl">
              <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#39FF14]">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm">
                <a
                  href="mailto:thafthaz313@gmail.com"
                  className="flex items-center gap-3 text-white hover:text-[#39FF14] transition"
                >
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#39FF14]">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#8ea1a7]">Email Address</p>
                    <p className="font-medium">thafthaz313@gmail.com</p>
                  </div>
                </a>

                <a
                  href="tel:+918277389481"
                  className="flex items-center gap-3 text-white hover:text-[#39FF14] transition"
                >
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#39FF14]">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#8ea1a7]">Phone Number</p>
                    <p className="font-medium">+91 82773 89481</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-white">
                  <div className="p-2.5 rounded-xl border border-white/10 bg-white/5 text-[#39FF14]">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-[#8ea1a7]">Location</p>
                    <p className="font-medium">Mangalore, Karnataka / Remote</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels Card */}
            <div className="rounded-[2rem] border border-white/10 bg-[#0b1417] p-8 space-y-4 shadow-xl">
              <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#39FF14]">
                Social & Profiles
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <a
                  href="https://www.instagram.com/thafthaz_design"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-white hover:border-[#39FF14]/40 transition"
                >
                  <Instagram size={14} className="text-[#39FF14]" /> @thafthaz_design
                </a>
                <a
                  href="https://www.instagram.com/iconn.studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-white hover:border-[#39FF14]/40 transition"
                >
                  <Instagram size={14} className="text-[#39FF14]" /> @iconn.studios
                </a>
                <a
                  href="https://linkedin.com/in/thafthazdesigns"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-white hover:border-[#39FF14]/40 transition"
                >
                  <Linkedin size={14} className="text-[#39FF14]" /> LinkedIn
                </a>
                <a
                  href="https://behance.net/thafthaz313"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 p-3 text-white hover:border-[#39FF14]/40 transition"
                >
                  <Globe size={14} className="text-[#39FF14]" /> Behance
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[2.5rem] border border-white/10 bg-[#0b1417] p-8 md:p-10 space-y-6 shadow-2xl">
              <h2 className="text-xl font-semibold text-white tracking-tight">Project Inquiry Form</h2>

              {submitted ? (
                <div className="rounded-2xl border border-[#39FF14]/30 bg-[#39FF14]/10 p-6 text-center space-y-3">
                  <CheckCircle2 size={32} className="text-[#39FF14] mx-auto" />
                  <h3 className="text-lg font-semibold text-white">Inquiry Sent Successfully</h3>
                  <p className="text-xs text-[#8ea1a7]">
                    Thank you! Thafthaz will review your project details and respond via email within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-widest text-[#39FF14] underline pt-2"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8ea1a7]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#030d10] px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#39FF14] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8ea1a7]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#030d10] px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#39FF14] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8ea1a7]">
                      Service Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#030d10] px-4 py-3 text-sm text-white focus:border-[#39FF14] focus:outline-none"
                    >
                      <option value="Branding">Brand Visual Identity</option>
                      <option value="Posters">Poster Series & Key Visuals</option>
                      <option value="Video Editing">Video Production & Editing</option>
                      <option value="Motion Graphics">Motion Graphics & Social Reels</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#8ea1a7]">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Tell us about your brand, timeline, and goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-[#030d10] px-4 py-3 text-sm text-white placeholder-white/20 focus:border-[#39FF14] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#39FF14] bg-[#39FF14] py-4 text-xs uppercase tracking-[0.25em] font-semibold text-black hover:bg-[#39FF14]/90 transition"
                  >
                    Submit Inquiry <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
