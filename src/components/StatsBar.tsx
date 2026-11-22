'use client';

import React from 'react';
import { Calendar, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { sound } from '@/utils/audio';

const stats = [
  {
    icon: Calendar,
    value: '10+ Years',
    label: 'Production Engineering',
    sub: 'Backend & Systems since 2013',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
  },
  {
    icon: Cpu,
    value: 'Go · TypeScript',
    label: 'Primary Stack',
    sub: 'Concurrency, strict typing & CQRS',
    color: 'text-violet-400',
    border: 'border-violet-500/30',
  },
  {
    icon: Zap,
    value: '10× Faster',
    label: 'Go Worker Pools',
    sub: 'vs. sequential batch processing',
    color: 'text-fuchsia-400',
    border: 'border-fuchsia-500/30',
  },
  {
    icon: ShieldCheck,
    value: 'Zero `any`',
    label: 'Strict TypeScript',
    sub: 'Clean architecture, typed DTOs',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
  },
];

export default function StatsBar() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 sm:-mt-10 mb-20 relative z-20">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              onMouseEnter={() => sound.playClick()}
              className="glass-cyber glass-cyber-hover shimmer-card p-5 rounded-3xl border border-violet-900/30 bg-[#0c091d]/80 flex flex-col justify-between group cursor-default"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xl sm:text-2xl lg:text-3xl font-extrabold font-mono tracking-tight ${item.color} group-hover:scale-105 transition-transform`}>
                  {item.value}
                </span>
                <div className={`p-2.5 rounded-xl bg-violet-950/50 border ${item.border} ${item.color} group-hover:rotate-6 transition-transform shadow-lg`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-semibold text-neutral-200">{item.label}</p>
                <p className="text-[11px] text-neutral-400 mt-0.5">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
