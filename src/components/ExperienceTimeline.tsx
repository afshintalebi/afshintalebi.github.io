'use client';

import React from 'react';
import { experiences, educationList } from '@/data/experience';
import { GraduationCap, Calendar, CheckCircle2, GitCommit, GitBranch, ShieldCheck } from 'lucide-react';
import { sound } from '@/utils/audio';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Career Changelog */}
        <div className="lg:col-span-8">
          <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400 uppercase tracking-widest mb-3">
            <GitBranch className="w-4 h-4" />
            <span>Career History</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Where I&apos;ve Worked
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mb-12 max-w-2xl leading-relaxed">
            Over a decade of building and shipping — from Linux sysadmin roots to distributed cloud systems and applied AI.
          </p>

          {/* Timeline Nodes */}
          <div className="relative border-l border-violet-900/40 ml-3 sm:ml-4 space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                {/* Node Commit Dot */}
                <div
                  className={`absolute -left-[9px] top-2 w-4 h-4 rounded-full border-2 transition-all flex items-center justify-center ${
                    exp.current
                      ? 'bg-cyan-400 border-black ring-4 ring-cyan-500/30 animate-pulse'
                      : 'bg-violet-950 border-violet-600 group-hover:border-cyan-400'
                  }`}
                />

                {/* Card Container */}
                <div
                  onMouseEnter={() => sound.playClick()}
                  className="glass-cyber p-6 sm:p-7 rounded-3xl border border-violet-900/30 bg-[#0c091d]/80 group-hover:border-violet-500/50 transition-all shadow-xl cursor-default"
                >
                  {/* Top metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/30 text-violet-300 font-bold">
                        {exp.versionTag}
                      </span>
                      <span className="flex items-center gap-1 text-neutral-400">
                        <GitCommit className="w-3 h-3 text-cyan-400" />
                        <code>{exp.commitHash}</code>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-300 bg-violet-950/40 px-3 py-1 rounded-xl border border-violet-900/40">
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Role & Company */}
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-fuchsia-400 font-mono font-medium mt-0.5">
                      <span>{exp.company}</span>
                      <span>•</span>
                      <span className="text-xs text-neutral-400 px-2 py-0.5 rounded bg-black/40 border border-violet-900/30">
                        {exp.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 mb-5">
                    {exp.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Metrics Badges */}
                  {exp.keyMetrics && exp.keyMetrics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {exp.keyMetrics.map((km, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-xl text-xs font-mono bg-violet-950/40 border border-violet-500/30 text-violet-200 font-semibold shadow-sm"
                        >
                          ✦ {km}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-violet-900/30">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-lg text-xs font-mono bg-black/40 text-neutral-300 border border-violet-900/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Academic Foundation & Principles */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Education Card */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Foundation</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mb-6">
              Degree &amp; Studies
            </h2>

            {educationList.map((edu) => (
              <div
                key={edu.id}
                className="glass-cyber p-6 rounded-3xl border border-violet-900/30 bg-[#0c091d]/80"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {edu.period}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">4-Year B.Sc.</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
                <div className="text-xs font-mono text-violet-300 mb-4">{edu.institution}</div>
                <p className="text-xs text-neutral-300 leading-relaxed mb-4">{edu.details}</p>

                {edu.coreSubjects && (
                  <div>
                    <div className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider mb-2">
                      Core CS Disciplines:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coreSubjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/50 border border-violet-900/40 text-neutral-300"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Software Engineering Principles */}
          <div className="glass-cyber p-6 rounded-3xl border border-violet-900/30 bg-[#0c091d]/80">
            <div className="flex items-center gap-2 text-xs font-mono text-fuchsia-400 uppercase tracking-widest mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Architectural Values</span>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-violet-900/40">
                <div className="text-cyan-300 font-bold mb-1">1. Concurrency First</div>
                <p className="text-neutral-400">
                  Channels and bounded queues beat mutex fights every time.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-violet-900/40">
                <div className="text-violet-300 font-bold mb-1">2. No Escape Hatches</div>
                <p className="text-neutral-400">
                  Zero `any` policies. Types are documentation that actually runs.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-violet-900/40">
                <div className="text-fuchsia-300 font-bold mb-1">3. Reads & Writes Don&apos;t Mix</div>
                <p className="text-neutral-400">
                  CQRS keeps read paths fast and write paths safe — independent scaling, no lock contention.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
