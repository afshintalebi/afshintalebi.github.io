'use client';

import React from 'react';
import { Project } from '@/types';
import { ArrowUpRight, Sparkles, Code2, Globe } from 'lucide-react';
import { GithubIcon } from './icons';
import { sound } from '@/utils/audio';

interface ProjectCardProps {
  project: Project;
  onOpenSpec: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenSpec }: ProjectCardProps) {
  const getCategoryBadge = (cat: Project['category']) => {
    switch (cat) {
      case 'ai':
        return { label: 'AI & LLM Toolchain', color: 'text-fuchsia-300 bg-fuchsia-500/10 border-fuchsia-500/30' };
      case 'backend':
      case 'automation':
        return { label: 'Go Systems & Concurrency', color: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30' };
      case 'fullstack':
        return { label: 'Full-Stack Cloud Platform', color: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/30' };
      default:
        return { label: 'Distributed Solution', color: 'text-violet-300 bg-violet-500/10 border-violet-500/30' };
    }
  };

  const badge = getCategoryBadge(project.category);
  const accent = project.accentColor || '#a855f7';

  return (
    <div
      onMouseEnter={() => sound.playClick()}
      className="glass-cyber glass-cyber-hover shimmer-card rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-violet-900/30 bg-[#0c091d]/80 group relative overflow-hidden transition-all duration-300 cursor-default"
      style={{
        borderColor: `${accent}25`,
      }}
    >
      {/* Dynamic ambient hover glow */}
      <div
        className="absolute top-0 right-0 w-60 h-60 blur-3xl pointer-events-none opacity-10 group-hover:opacity-25 transition-opacity duration-300 rounded-full"
        style={{ backgroundColor: accent }}
      />

      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-mono border ${badge.color}`}>
            {badge.label}
          </span>
          <span className="text-xs text-neutral-400 font-mono">{project.role}</span>
        </div>

        {/* Title & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyan-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs font-mono text-cyan-300 mb-3">{project.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-neutral-300 leading-relaxed mb-5 line-clamp-3">
          {project.description}
        </p>

        {/* Impact Box with Neon Accent */}
        <div className="p-3.5 rounded-2xl bg-[#070512] border border-violet-900/40 mb-5 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5 animate-pulse" />
          <p className="text-xs text-neutral-200 font-medium leading-snug">
            <span className="text-fuchsia-400 font-semibold">Impact:</span> {project.impact}
          </p>
        </div>

        {/* Metrics Grid */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-5">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-violet-950/30 border border-violet-900/30 text-center"
              >
                <div className="text-xs font-bold text-cyan-200 font-mono">{metric.value}</div>
                <div className="text-[10px] text-neutral-400 truncate mt-0.5">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.8 rounded-lg text-xs font-mono bg-violet-950/40 border border-violet-900/40 text-neutral-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.8 rounded-lg text-xs font-mono bg-violet-950/40 text-violet-400">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="pt-4 border-t border-violet-900/30 flex items-center justify-between">
        <button
          onClick={() => {
            sound.playChirp(700, 0.05);
            onOpenSpec(project);
          }}
          className="flex items-center gap-1.5 text-xs font-bold font-mono text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5 text-violet-400" />
          <span>Architecture Spec</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-cyan-400" />
        </button>

        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2 rounded-xl bg-violet-950/40 hover:bg-violet-900/50 text-neutral-400 hover:text-white border border-violet-900/40 transition-colors cursor-pointer"
            title="Live Website"
          >
            <Globe className="w-4 h-4" />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="p-2 rounded-xl bg-violet-950/40 hover:bg-violet-900/50 text-neutral-400 hover:text-white border border-violet-900/40 transition-colors cursor-pointer"
            title="GitHub Repository"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
