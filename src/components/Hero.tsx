'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Terminal as TermIcon, Cpu, Code2 } from 'lucide-react';
import { GithubIcon } from './icons';
import InteractiveTerminal from './InteractiveTerminal';
import { sound } from '@/utils/audio';

const rotatingTitles = [
  'fast, reliable Go backends.',
  'scalable NestJS event-driven systems.',
  'AI-powered tools that actually ship.',
  'cloud architectures built to last.',
];

interface HeroProps {
  onOpenCommandPalette: () => void;
}

export default function Hero({ onOpenCommandPalette }: HeroProps) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for headline
  useEffect(() => {
    const currentFullText = rotatingTitles[titleIndex];
    const typingSpeed = isDeleting ? 30 : 55;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentFullText.length) {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % rotatingTitles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <section
      id="about"
      className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden"
    >
      {/* Dynamic Animated Ambient Color Blobs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-violet-600/20 via-fuchsia-600/15 to-cyan-500/15 blur-[140px] -z-10 pointer-events-none rounded-full animate-float" />
      <div className="absolute top-16 right-10 w-96 h-96 bg-cyan-500/10 blur-[130px] -z-10 pointer-events-none rounded-full animate-pulse-neon" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-fuchsia-500/10 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Bio & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status Pill with Pulsing Ring */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-violet-950/40 border border-violet-500/30 text-xs font-mono text-violet-200 mb-6 shadow-lg shadow-violet-950/50 backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-cyan-400 to-fuchsia-400"></span>
              </span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200">
                Senior Software & AI Developer
              </span>
            </div>

            {/* Main Animated Headline with Typewriter */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6 font-sans">
              I build{' '}
              <span className="block min-h-[1.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400">
                {displayText}
                <span className="inline-block w-1 h-10 ml-1 bg-cyan-400 animate-pulse align-middle" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl leading-relaxed mb-8 font-sans">
              Hi, I&apos;m <span className="text-white font-semibold">Afshin Talebi</span> — a software developer with 10+ years shipping production systems. I specialize in <span className="text-cyan-400 font-mono font-medium">Go</span> for high-concurrency workloads, <span className="text-violet-400 font-mono font-medium">NestJS</span> for clean, event-driven backends, and <span className="text-fuchsia-400 font-mono font-medium">AI integrations</span> that go beyond demos into real products.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto font-mono text-xs">
              <a
                href="#simulator"
                onClick={() => sound.playChirp(650, 0.05)}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-neutral-950 shadow-xl shadow-violet-500/25 hover:shadow-cyan-500/30 transition-all duration-300 group w-full sm:w-auto cursor-pointer hover:scale-105"
              >
                <Cpu className="w-4 h-4 text-neutral-950" />
                <span>See It In Action</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                onClick={() => sound.playClick()}
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-white glass-cyber hover:border-violet-500/50 transition-all duration-200 w-full sm:w-auto cursor-pointer"
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>View Projects</span>
              </a>

              <button
                onClick={() => {
                  sound.playClick();
                  onOpenCommandPalette();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-neutral-300 hover:text-white glass-cyber hover:border-fuchsia-500/50 transition-all duration-200 w-full sm:w-auto cursor-pointer"
                title="Open Command Palette"
              >
                <TermIcon className="w-4 h-4 text-fuchsia-400" />
                <span>Press ⌘K</span>
              </button>
            </div>

            {/* Social & Profiles with active hover */}
            <div className="flex items-center gap-4 text-neutral-400 text-xs font-mono">
              <span className="uppercase tracking-wider text-neutral-500">Profiles:</span>
              <a
                href="https://github.com/afshintalebi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="p-2 rounded-xl hover:text-white hover:bg-violet-950/50 border border-transparent hover:border-violet-500/30 transition-all hover:scale-110"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4 text-cyan-400" />
              </a>
              <a
                href="mailto:at.de.work@gmail.com"
                onClick={() => sound.playClick()}
                className="p-2 rounded-xl hover:text-white hover:bg-violet-950/50 border border-transparent hover:border-violet-500/30 transition-all hover:scale-110"
                aria-label="Direct Email"
              >
                <Mail className="w-4 h-4 text-fuchsia-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Multi-tab Interactive Code Terminal */}
          <div className="lg:col-span-5 w-full flex justify-center animate-float" style={{ animationDuration: '7s' }}>
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
