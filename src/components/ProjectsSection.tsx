'use client';

import React, { useState } from 'react';
import { projects } from '@/data/projects';
import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Sparkles, Terminal, Layers, LayoutGrid, Search, X } from 'lucide-react';
import { sound } from '@/utils/audio';

const categories = [
  { id: 'all', label: 'All Projects', icon: LayoutGrid },
  { id: 'ai', label: 'AI & LLM', icon: Sparkles },
  { id: 'automation', label: 'Go & Concurrency', icon: Terminal },
  { id: 'fullstack', label: 'Full-Stack', icon: Layers },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Things I&apos;ve Built.
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
            A selection of projects spanning Go concurrency, NestJS backends, and AI tooling — each one shipped and running in the real world.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0a081a] p-1.5 rounded-2xl border border-violet-900/40">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sound.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-medium font-mono transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/20 font-semibold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Search & Filter Bar */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-violet-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by technology (e.g. Go, Docker, CQRS, Whisper)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-violet-950/20 border border-violet-900/40 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-violet-500 font-mono shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs font-mono text-cyan-300 shrink-0 hidden sm:block">
          Showing <span className="text-white font-bold">{filteredProjects.length}</span> systems
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-violet-900/40 bg-violet-950/20 text-neutral-400 font-mono text-sm">
          No projects matched &quot;{searchQuery}&quot;. Try searching for &quot;Go&quot;, &quot;NestJS&quot;, or &quot;Whisper&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenSpec={(p) => setSelectedProject(p)}
            />
          ))}
        </div>
      )}

      {/* Engineering Spec Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
