'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, CheckCircle2, Wrench } from 'lucide-react';

const educationData = [
  {
    degree: 'Bachelor of Science (B.Sc.) in Visual Communication',
    institution: 'St. Aloysius College, Mangalore',
    period: '2023 – 2026',
    description: 'Comprehensive study in graphic design, visual media theory, typography, videography, and digital layout systems.',
    tag: 'Degree Education',
  },
  {
    degree: 'Kulliyya Shariyah Wal Qanoon',
    institution: 'Jamia Markazu Saqafathi Sunniyya Al Islamiyya',
    period: '2021 – 2023',
    description: 'Advanced religious and jurisprudence studies in Islamic Law & Shariah studies.',
    tag: 'Religious Education',
  },
  {
    degree: 'Pre-University Course (Arts)',
    institution: 'Government First Grade College, Mudipu',
    period: '2020 – 2022',
    description: 'Foundation studies in Arts, Humanities, and Communication.',
    tag: 'Pre-University',
  },
];

const experienceData = [
  {
    role: 'Graphic Designer',
    company: 'St. Aloysius College, Mangalore',
    period: '2023 – Present',
    description: 'Designed posters, brochures, event branding, and social media creatives for college events and departments.',
  },
  {
    role: 'Freelance Graphic Designer',
    company: 'Mostly Add, Mangalore',
    period: '2022 – Present',
    description: 'Crafted commercial branding, advertisements, social media campaigns, and marketing collateral for agency clients.',
  },
  {
    role: 'Graphic Designer',
    company: 'Markaz Saqafathu Sunniyya, Calicut',
    period: '2021 – 2023',
    description: 'Designed official promotional materials, publication covers, conference banners, and event graphics.',
  },
  {
    role: 'Graphic Designer',
    company: 'Thajul Ulama English Medium School, Thalakki',
    period: '2020 – 2021',
    description: 'Designed educational materials, graduation certificates, campus banners, and promotional content.',
  },
];

const skillsList = [
  { name: 'Adobe Photoshop', category: 'Graphic & Photo Editing', level: 95 },
  { name: 'Adobe Illustrator', category: 'Vector & Brand Design', level: 92 },
  { name: 'Adobe InDesign', category: 'Publication & Print Layout', level: 88 },
  { name: 'Adobe Premiere Pro', category: 'Video Editing & Motion', level: 85 },
  { name: 'Adobe Lightroom', category: 'Color Grading & Processing', level: 90 },
  { name: 'Adobe Fresco', category: 'Digital Illustration', level: 85 },
];

export function EducationExperienceSection() {
  return (
    <section id="education-experience" className="relative bg-[#030d10] px-6 py-20 md:py-28 text-white w-full">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(57,255,20,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.35em] text-[#39FF14] font-semibold">
            Background & Expertise
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white">
            Education & Career Timeline
          </h2>
          <p className="text-xs sm:text-sm text-[#8ea1a7]">
            Academic qualification in Visual Communication alongside active freelance agency experience.
          </p>
        </div>

        {/* Education & Experience Dual Columns */}
        <div className="grid gap-12 lg:grid-cols-2">
          
          {/* Left Column: Academic Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="p-2.5 rounded-xl border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14]">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Academic & Religious Education</h3>
                <p className="text-[10px] uppercase tracking-wider text-[#8ea1a7]">Qualifications & Institutions</p>
              </div>
            </div>

            <div className="space-y-6">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-6 border-l border-white/10 space-y-2 group"
                >
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#39FF14] group-hover:scale-125 transition" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#39FF14]">
                      {edu.tag}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-[#8ea1a7]">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#39FF14] transition">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-medium text-[#8ea1a7]">{edu.institution}</p>
                  <p className="text-xs text-[#8ea1a7]/80 leading-relaxed">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Work Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="p-2.5 rounded-xl border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14]">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Work & Freelance Experience</h3>
                <p className="text-[10px] uppercase tracking-wider text-[#8ea1a7]">Agency & Client History</p>
              </div>
            </div>

            <div className="space-y-6">
              {experienceData.map((exp, idx) => (
                <motion.div
                  key={exp.role + exp.company}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative pl-6 border-l border-white/10 space-y-2 group"
                >
                  <div className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-[#39FF14] group-hover:scale-125 transition" />
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#39FF14]">
                      {exp.company}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-[#8ea1a7]">
                      {exp.period}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white group-hover:text-[#39FF14] transition">
                    {exp.role}
                  </h4>
                  <p className="text-xs text-[#8ea1a7]/80 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills & Software Toolkit Grid */}
        <div className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex items-center gap-2">
            <Wrench size={16} className="text-[#39FF14]" />
            <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-white">
              Software Toolsuite & Creative Mastery
            </h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                className="rounded-2xl border border-white/10 bg-[#071114] p-4 space-y-2 hover:border-[#39FF14]/40 transition"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">{skill.name}</span>
                  <span className="text-[10px] font-medium text-[#39FF14]">{skill.level}%</span>
                </div>
                <p className="text-[10px] text-[#8ea1a7]">{skill.category}</p>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#39FF14] to-emerald-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
