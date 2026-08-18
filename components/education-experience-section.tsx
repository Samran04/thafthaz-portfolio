'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Wrench } from 'lucide-react';
import { Experience, Skill } from '@/types/cms';
import { CMSDataService } from '@/lib/cms/data-service';

interface EducationExperienceSectionProps {
  experiences?: Experience[];
  skills?: Skill[];
}

export function EducationExperienceSection({
  experiences: initialExperiences,
  skills: initialSkills,
}: EducationExperienceSectionProps) {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences || []);
  const [skills, setSkills] = useState<Skill[]>(initialSkills || []);
  const [isLoading, setIsLoading] = useState(!initialExperiences || !initialSkills);

  useEffect(() => {
    if (initialExperiences && initialSkills) return;

    async function loadData() {
      try {
        const [exps, sks] = await Promise.all([
          initialExperiences ? Promise.resolve(initialExperiences) : CMSDataService.getExperiences(),
          initialSkills ? Promise.resolve(initialSkills) : CMSDataService.getSkills(),
        ]);
        setExperiences(exps);
        setSkills(sks);
      } catch (err) {
        console.error('Failed to load experiences and skills', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [initialExperiences, initialSkills]);

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
            Academic qualifications alongside active freelance agency experience.
          </p>
        </div>

        {/* Education & Experience Dual Columns */}
        {isLoading ? (
          <div className="py-12 text-center text-xs uppercase tracking-[0.25em] text-[#8ea1a7]">
            Loading Timeline...
          </div>
        ) : (
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Work & Freelance Experience */}
            <div className="space-y-6 lg:col-span-2">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14]">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Career & Educational Experience</h3>
                  <p className="text-[10px] uppercase tracking-wider text-[#8ea1a7]">History & Qualifications</p>
                </div>
              </div>

              {experiences.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#8ea1a7] rounded-2xl border border-white/5 bg-[#0b1417] p-6">
                  No experience records in database yet. Add records via Admin Panel.
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {experiences.map((exp, idx) => (
                    <motion.div
                      key={exp.id || exp.role + exp.company}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.08 }}
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
                      {exp.description && (
                        <p className="text-xs text-[#8ea1a7]/80 leading-relaxed">{exp.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Skills & Software Toolkit Grid */}
        <div className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex items-center gap-2">
            <Wrench size={16} className="text-[#39FF14]" />
            <h3 className="text-xs uppercase tracking-[0.3em] font-semibold text-white">
              Software Toolsuite & Creative Mastery
            </h3>
          </div>

          {skills.length === 0 ? (
            <div className="py-6 text-center text-xs text-[#8ea1a7] rounded-2xl border border-white/5 bg-[#0b1417] p-6">
              No skills added in database yet. Add skills via Admin Panel.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {skills.map((skill) => (
                <div
                  key={skill.id || skill.name}
                  className="rounded-2xl border border-white/10 bg-[#071114] p-4 space-y-2 hover:border-[#39FF14]/40 transition"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{skill.name}</span>
                    <span className="text-[10px] font-medium text-[#39FF14]">{skill.proficiency}%</span>
                  </div>
                  <p className="text-[10px] text-[#8ea1a7]">{skill.category}</p>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#39FF14] to-emerald-400 rounded-full"
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

