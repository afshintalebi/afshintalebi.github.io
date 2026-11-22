'use client';

import React, { useState, useEffect } from 'react';
import { Project } from '@/types';
import {
  X,
  Layers,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  Code2,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { GithubIcon } from './icons';
import { sound } from '@/utils/audio';
import { copyText } from '@/utils/clipboard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedCode, setCopiedCode] = useState(false);

  const isOpen = project !== null;

  // Close on Escape and lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const handleCopyCode = async () => {
    if (!project.codeSnippet) return;
    if (!(await copyText(project.codeSnippet.code))) return;
    sound.playSuccess();
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const accent = project.accentColor || '#a855f7';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} specification`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-lg overflow-y-auto animate-in fade-in duration-200"
      onClick={() => {
        sound.playClick();
        onClose();
      }}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#090717] border border-violet-500/30 rounded-3xl shadow-2xl shadow-violet-950/80 overflow-y-auto font-mono text-neutral-300 my-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `0 25px 60px -15px ${accent}25`,
        }}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#090717]/95 backdrop-blur-md border-b border-violet-900/30">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accent }} />
            <span className="font-bold uppercase tracking-wider text-white">
              Engineering Specification
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-cyan-400">{project.id}</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            aria-label="Close specification"
            className="p-1.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/50 text-neutral-400 hover:text-white transition-colors cursor-pointer border border-violet-900/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title & Metadata */}
          <div>
            <div className="text-xs font-mono mb-1" style={{ color: accent }}>{project.role}</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-cyan-300 mt-1">{project.subtitle}</p>

            <p className="text-sm text-neutral-300 font-sans leading-relaxed mt-4">
              {project.description}
            </p>
          </div>

          {/* Architecture Pipeline Summary */}
          {project.architectureSummary && (
            <div className="p-4 rounded-2xl bg-[#060411] border border-violet-900/40">
              <div className="flex items-center gap-2 text-xs text-cyan-400 font-bold mb-2">
                <Layers className="w-4 h-4" />
                <span>Architecture Ingestion Pipeline</span>
              </div>
              <div className="text-xs text-violet-200 bg-black/50 p-3.5 rounded-xl border border-violet-900/30 leading-relaxed font-mono">
                {project.architectureSummary}
              </div>
            </div>
          )}

          {/* Measurable Performance Benchmarks */}
          {project.benchmarks && project.benchmarks.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs text-fuchsia-400 font-bold uppercase tracking-wider mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>Quantifiable Engineering Gains</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.benchmarks.map((b, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-violet-950/30 border border-violet-900/40 flex flex-col justify-between"
                  >
                    <div className="text-[11px] text-neutral-400 truncate">{b.label}</div>
                    <div className="flex items-baseline justify-between mt-2">
                      <span className="text-lg font-bold text-cyan-300 font-mono">{b.delta}</span>
                      <span className="text-[10px] text-neutral-400 font-mono">
                        {b.before} → {b.after}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Challenges Solved */}
          {project.challenges && project.challenges.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs text-violet-400 font-bold uppercase tracking-wider mb-3">
                <Cpu className="w-4 h-4" />
                <span>Technical Challenges Overcome</span>
              </div>
              <div className="space-y-2">
                {project.challenges.map((challenge, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-violet-950/20 border border-violet-900/30 text-xs font-sans text-neutral-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sample Production Code Snippet */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  <span>{project.codeSnippet.filename}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white px-2 py-0.5 rounded-lg bg-violet-950/50 border border-violet-900/40 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-4 rounded-2xl bg-[#05030d] border border-violet-900/40 overflow-x-auto text-xs">
                <pre className="text-violet-100 leading-relaxed">
                  <code>{project.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider mb-2">
              Technologies &amp; Libraries
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl text-xs font-mono bg-violet-950/40 border border-violet-900/40 text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* External Links */}
          <div className="pt-4 border-t border-violet-900/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-950/60 hover:bg-violet-900/60 border border-violet-500/40 text-white transition-all shadow-md shadow-violet-500/20"
                >
                  <Globe className="w-4 h-4" />
                  <span>Visit Live Website</span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-violet-950/60 hover:bg-violet-900/60 border border-violet-500/40 text-white transition-all shadow-md shadow-violet-500/20"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Inspect Source Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-violet-900/30 hover:bg-violet-900/50 text-neutral-300 transition-colors cursor-pointer"
            >
              Close Spec
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
