'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Command, Sparkles } from 'lucide-react';
import { sound } from '@/utils/audio';

const navLinks = [
  { name: 'Simulator', href: '#simulator' },
  { name: 'Projects', href: '#projects' },
  { name: 'Timeline', href: '#experience' },
  { name: 'Skills Radar', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export default function Navbar({ onOpenCommandPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-8 sm:top-10 left-0 right-0 z-40 flex justify-center px-4">
      <nav
        className={`w-full max-w-5xl transition-all duration-300 rounded-2xl px-4 sm:px-6 py-2.5 flex items-center justify-between ${
          scrolled
            ? 'glass-cyber shadow-2xl shadow-violet-950/40 border-violet-500/30 bg-[#090714]/90'
            : 'bg-[#0a0818]/60 backdrop-blur-md border border-violet-500/15'
        }`}
      >
        {/* Brand with Active Gradient */}
        <a
          href="#"
          onClick={() => sound.playChirp(700, 0.04)}
          className="flex items-center gap-2.5 font-mono text-base font-bold text-white group tracking-tight"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 flex items-center justify-center text-neutral-950 font-black shadow-lg shadow-violet-500/30 group-hover:scale-110 group-hover:rotate-3 transition-transform">
            AT
          </div>
          <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-colors">
            afshin<span className="text-cyan-400">.talebi</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sound.playClick()}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-neutral-300 hover:text-white hover:bg-violet-500/10 hover:border-violet-500/20 border border-transparent transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions & Command Palette */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-950/40 hover:bg-violet-900/40 text-violet-200 border border-violet-500/30 text-xs font-mono transition-all cursor-pointer shadow-sm hover:shadow-violet-500/20"
            title="Open Command Palette (⌘K)"
          >
            <Command className="w-3.5 h-3.5 text-cyan-400" />
            <span>Search</span>
            <kbd className="px-1.5 py-0.2 rounded bg-black/50 text-[10px] text-violet-300 border border-violet-500/20">
              ⌘K
            </kbd>
          </button>

          <a
            href="#contact"
            onClick={() => sound.playClick()}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold font-mono bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-400 hover:to-fuchsia-400 text-white transition-all shadow-md shadow-violet-500/25 hover:shadow-violet-500/40"
          >
            Connect
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="p-2 text-violet-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            title="Command Palette"
          >
            <Command className="w-5 h-5 text-cyan-400" />
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-24 glass-cyber rounded-3xl p-6 bg-[#080614]/95 border border-violet-500/30 shadow-2xl shadow-violet-950/60 flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-violet-900/30 font-mono text-xs text-cyan-400">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-fuchsia-400" />
              Available for Senior / Architect Roles
            </span>
          </div>
          <div className="flex flex-col gap-2 font-mono text-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 rounded-xl text-neutral-300 hover:text-white hover:bg-violet-500/10 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => {
              sound.playSuccess();
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-xl text-center text-xs font-bold font-mono bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/30"
          >
            Initiate Contact
          </a>
        </div>
      )}
    </header>
  );
}
