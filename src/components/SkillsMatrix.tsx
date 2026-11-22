'use client';

import React, { useState } from 'react';
import { skillCategories } from '@/data/skills';
import { SkillItem } from '@/types';
import { Binary, Server, Database, Sparkles, Hexagon, Info } from 'lucide-react';
import { sound } from '@/utils/audio';

const iconMap: Record<string, React.ElementType> = {
  Binary,
  Server,
  Database,
  Sparkles,
};

export default function SkillsMatrix() {
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Skills & Tools</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          What I Work With
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-2 leading-relaxed">
          A decade of hands-on work across Go, TypeScript, cloud infra, and AI — the things I reach for when it has to work reliably.
        </p>
      </div>

      {/* Layer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {skillCategories.map((category) => {
          const Icon = iconMap[category.iconName] || Server;
          return (
            <div
              key={category.title}
              className="glass-cyber p-6 sm:p-7 rounded-3xl border border-violet-900/30 bg-[#0c091d]/80 hover:border-violet-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-violet-950/60 border border-violet-800/40 text-cyan-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-fuchsia-400 uppercase tracking-wider block font-bold">
                        {category.layer}
                      </span>
                      <h3 className="text-lg font-bold text-white">{category.title}</h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {category.description}
                </p>

                {/* Skills with Animated Proficiency Bars */}
                <div className="space-y-3">
                  {category.skills.map((skill) => {
                    const isSelected = selectedSkill?.name === skill.name;
                    const accent = skill.color || '#a855f7';
                    return (
                      <div
                        key={skill.name}
                        onClick={() => {
                          sound.playClick();
                          setSelectedSkill(isSelected ? null : skill);
                        }}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-violet-950/70 border-cyan-400/80 shadow-lg shadow-cyan-500/15 scale-101'
                            : 'bg-black/30 border-violet-900/30 hover:border-violet-700/60'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <Hexagon className="w-3.5 h-3.5 text-violet-400" />
                            <span
                              className={`text-sm font-medium ${
                                skill.highlight ? 'text-white font-semibold' : 'text-neutral-300'
                              }`}
                            >
                              {skill.name}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-violet-950/60 border border-violet-900/40 text-neutral-300">
                              {skill.years} yrs
                            </span>
                            <span
                              className="text-[11px] font-mono font-semibold"
                              style={{ color: accent }}
                            >
                              {skill.proficiency}%
                            </span>
                          </div>
                        </div>

                        {/* Animated Visual Level Bar */}
                        <div className="w-full bg-violet-950/60 h-1.5 rounded-full overflow-hidden border border-violet-900/40">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${skill.proficiency}%`,
                              backgroundColor: accent,
                            }}
                          />
                        </div>

                        {/* Expandable Architecture Context */}
                        {isSelected && skill.architectureUse && (
                          <div className="mt-3 pt-3 border-t border-violet-900/40 text-xs font-mono text-neutral-300 animate-in fade-in duration-150">
                            <div className="text-[10px] text-cyan-300 font-bold uppercase mb-1">
                              Architectural Application:
                            </div>
                            <p className="text-violet-100 leading-relaxed">{skill.architectureUse}</p>

                            {skill.tags && (
                              <div className="flex flex-wrap gap-1.5 mt-2.5">
                                {skill.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-md text-[10px] bg-black/60 text-neutral-300 border border-violet-900/40"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-violet-900/30 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                <span>Click any competency to inspect architecture spec</span>
                <Info className="w-3.5 h-3.5 text-cyan-400" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
