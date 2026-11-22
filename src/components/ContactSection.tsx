'use client';

import React, { useState } from 'react';
import { Copy, Check, Shield } from 'lucide-react';
import { GithubIcon } from './icons';
import { sound } from '@/utils/audio';
import { copyText } from '@/utils/clipboard';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'at.de.work@gmail.com';

  const handleCopyEmail = async () => {
    if (!(await copyText(email))) return;
    sound.playSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 max-w-6xl mx-auto px-4 sm:px-6 relative">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-cyan-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto">
        {/* Direct Outreach & Info */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Get in Touch</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Let&apos;s Work Together.
            </h2>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
              I&apos;m a software developer who builds scalable backends, concurrent systems in Go, and AI-powered web apps. If you have a product to ship, a system to scale, or an idea to explore, send me a note — I&apos;d love to hear about it.
            </p>

            {/* Quick Copy Email Box */}
            <div className="glass-cyber p-4 rounded-2xl border border-violet-900/40 bg-[#0c091d]/80 mb-8 font-mono">
              <span className="text-xs text-neutral-400 block mb-1">Email:</span>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm sm:text-base text-cyan-300 select-all font-semibold">
                  {email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-violet-950/60 hover:bg-violet-900/60 text-violet-200 border border-violet-500/30 transition-colors shrink-0 cursor-pointer"
                  aria-label="Copy Email Address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="text-cyan-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Channel Badges */}
            <div className="space-y-3 font-mono text-xs">
              <a
                href="https://github.com/afshintalebi"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center justify-between p-3.5 rounded-2xl glass-cyber border border-violet-900/40 hover:border-violet-500/50 hover:bg-violet-950/30 transition-all text-neutral-300 hover:text-white group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-sans font-medium">github.com/afshintalebi</span>
                </div>
                <span className="text-violet-400">GitHub</span>
              </a>

              <div className="p-3.5 rounded-2xl glass-cyber border border-violet-900/40 text-neutral-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Availability Status:</span>
                </div>
                <span className="text-emerald-400 font-semibold">Open for Global Position</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
