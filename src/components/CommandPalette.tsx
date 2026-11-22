'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal,
  Search,
  ArrowRight,
  Cpu,
  Layers,
  Code2,
  Briefcase,
  Mail,
  Copy,
  Check,
  X,
  Activity,
  Volume2,
} from 'lucide-react';
import { sound } from '@/utils/audio';
import { copyText } from '@/utils/clipboard';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction?: (actionId: string) => void;
}

interface CommandItem {
  id: string;
  category: 'Navigation' | 'Engineering Action' | 'Profile';
  title: string;
  description: string;
  icon: React.ElementType;
  action: () => void;
}

export default function CommandPalette({ isOpen, onClose, onSelectAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Global keydown listeners for Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        sound.playClick();
        if (isOpen) onClose();
        else onSelectAction?.('open');
      } else if (e.key === 'Escape' && isOpen) {
        sound.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectAction]);

  const handleClose = () => {
    setQuery('');
    setFeedback(null);
    onClose();
  };

  const scrollToSection = (id: string) => {
    sound.playClick();
    handleClose();
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commands: CommandItem[] = [
    {
      id: 'nav-sim',
      category: 'Navigation',
      title: 'Interactive System Design Simulator',
      description: 'Run live Go worker pool & CQRS visualizer sandbox',
      icon: Cpu,
      action: () => scrollToSection('simulator'),
    },
    {
      id: 'nav-projects',
      category: 'Navigation',
      title: 'Explore Featured Projects',
      description: 'Browse Go automation, NestJS CLI & AI translation suites',
      icon: Layers,
      action: () => scrollToSection('projects'),
    },
    {
      id: 'nav-experience',
      category: 'Navigation',
      title: 'Career Changelog & Releases',
      description: '10+ years of engineering progression (2013-Present)',
      icon: Briefcase,
      action: () => scrollToSection('experience'),
    },
    {
      id: 'nav-skills',
      category: 'Navigation',
      title: 'Architecture & Skill Radar',
      description: 'Inspect Go, NestJS, Cloud, and AI competencies',
      icon: Code2,
      action: () => scrollToSection('skills'),
    },
    {
      id: 'nav-contact',
      category: 'Navigation',
      title: 'Get in Touch',
      description: 'Jump to email and contact details',
      icon: Mail,
      action: () => scrollToSection('contact'),
    },
    {
      id: 'act-copy-email',
      category: 'Engineering Action',
      title: 'Copy Email Address',
      description: 'at.de.work@gmail.com',
      icon: Copy,
      action: async () => {
        const ok = await copyText('at.de.work@gmail.com');
        if (!ok) {
          setFeedback('Copy failed — please copy the address manually');
          return;
        }
        sound.playSuccess();
        setFeedback('✓ Copied at.de.work@gmail.com to clipboard');
        setTimeout(() => {
          handleClose();
        }, 1200);
      },
    },
    {
      id: 'act-toggle-audio',
      category: 'Engineering Action',
      title: 'Toggle Audio FX Synthesizer',
      description: 'Enable or disable interactive Web Audio sound effects',
      icon: Volume2,
      action: () => {
        const active = sound.toggle();
        setFeedback(active ? '✓ Audio FX Synthesizer Activated' : 'Audio FX Disabled');
        setTimeout(() => handleClose(), 1000);
      },
    },
    {
      id: 'act-github',
      category: 'Profile',
      title: 'Visit GitHub Profile',
      description: 'github.com/afshintalebi',
      icon: Terminal,
      action: () => {
        sound.playClick();
        window.open('https://github.com/afshintalebi', '_blank', 'noopener,noreferrer');
        handleClose();
      },
    },
    {
      id: 'act-curl',
      category: 'Engineering Action',
      title: 'curl /api/v3/engineer',
      description: 'Output raw JSON profile schema to console',
      icon: Activity,
      action: () => {
        sound.playSuccess();
        const profile = {
          name: 'Afshin Talebi',
          title: 'Senior Software Engineer & Systems Architect',
          years_experience: 10,
          stack: ['Go', 'TypeScript', 'NestJS', 'Docker', 'PostgreSQL', 'OpenAI'],
          status: 'AVAILABLE_FOR_HIGH_IMPACT_ROLES',
        };
        console.log('--- AFSHIN TALEBI ---');
        console.table(profile);
        setFeedback('✓ Profile logged to browser dev console');
        setTimeout(() => handleClose(), 1200);
      },
    },
  ];

  const filteredCommands = commands.filter((cmd) => {
    const text = `${cmd.title} ${cmd.description} ${cmd.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#090718] border border-violet-500/40 rounded-3xl shadow-2xl shadow-violet-950/80 overflow-hidden font-mono text-xs sm:text-sm animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-violet-900/40 bg-[#060410]">
          <Search className="w-4 h-4 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            aria-label="Search commands"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section... (e.g. Go, Projects, Simulator)"
            className="w-full bg-transparent text-white placeholder-neutral-500 focus:outline-none font-mono text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-neutral-500 hover:text-neutral-300 p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-violet-950/60 text-[10px] text-violet-300 border border-violet-800/40">
            ESC
          </span>
        </div>

        {/* Feedback Alert if triggered */}
        {feedback && (
          <div className="px-4 py-2 bg-violet-950/80 border-b border-cyan-500/40 text-cyan-300 text-xs flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-neutral-500">
              No matching commands found for &quot;{query}&quot;.
            </div>
          ) : (
            filteredCommands.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-violet-950/50 border border-transparent hover:border-violet-500/30 transition-all text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-black/50 border border-violet-900/40 text-neutral-300 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-white font-medium group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        <span>{cmd.title}</span>
                        <span className="text-[10px] text-violet-300 font-mono px-2 py-0.2 rounded-full bg-violet-950/60 border border-violet-800/40">
                          {cmd.category}
                        </span>
                      </div>
                      <div className="text-neutral-400 text-xs mt-0.5">
                        {cmd.description}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-neutral-500">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-cyan-400" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-[#060410] border-t border-violet-900/40 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-violet-300">Developer Terminal v3.0</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span>Close: Esc</span>
          </div>
        </div>
      </div>
    </div>
  );
}
