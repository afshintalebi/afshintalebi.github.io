'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon } from './icons';
import { sound } from '@/utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-violet-900/40 bg-[#05040d] py-12 px-4 sm:px-6 font-mono text-xs text-neutral-400 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Git metadata */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              afshin.talebi
            </span>
          </div>
          <span className="hidden sm:inline text-violet-800">•</span>
          <span className="text-neutral-400">10+ Years of Shipping</span>
        </div>

        {/* Center: Copyright */}
        <div className="text-violet-400 text-center text-[11px]">
          &copy; Afshin Talebi. All rights reserved.
        </div>

        {/* Right: Back to top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/afshintalebi"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.playClick()}
            className="hover:text-cyan-400 transition-colors"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/50 text-violet-200 hover:text-white border border-violet-900/40 transition-all cursor-pointer shadow-sm hover:scale-105"
          >
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
