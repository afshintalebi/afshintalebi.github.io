'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, Terminal, Wifi, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sound } from '@/utils/audio';

interface TelemetryBarProps {
  onOpenCommandPalette: () => void;
}

export default function TelemetryBar({ onOpenCommandPalette }: TelemetryBarProps) {
  const [time, setTime] = useState<string>('');
  const [latency, setLatency] = useState<number>(16);
  const [audioActive, setAudioActive] = useState<boolean>(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          timeZone: 'Asia/Dubai', // UTC+4
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    const pingInterval = setInterval(() => {
      setLatency(12 + Math.floor(Math.random() * 8));
    }, 4500);

    return () => {
      clearInterval(clockInterval);
      clearInterval(pingInterval);
    };
  }, []);

  const handleToggleAudio = () => {
    const newState = sound.toggle();
    setAudioActive(newState);
  };

  return (
    <div className="w-full bg-[#05040b]/90 border-b border-violet-900/30 backdrop-blur-md px-3 sm:px-6 py-1.5 text-[11px] font-mono text-neutral-400 flex items-center justify-between z-40 select-none overflow-x-auto no-scrollbar">
      {/* Left: Active Version & Git */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          <span>Open to New Challenges</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        </div>

        <div className="hidden md:flex items-center gap-3 text-neutral-400 border-l border-neutral-800/80 pl-4">
          <span className="flex items-center gap-1 text-purple-300">
            <Sparkles className="w-3 h-3 text-fuchsia-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>POWERED BY:</span> Go &bull; Node.js &bull; Next.js &bull; TypeScript
          </span>
        </div>
      </div>

      {/* Right: Sound FX Toggle, Latency, Clock, Command */}
      <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-4">
        {/* Audio FX Toggle */}
        <button
          onClick={handleToggleAudio}
          className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
            audioActive
              ? 'bg-fuchsia-950/60 border-fuchsia-500/50 text-fuchsia-300 shadow-sm shadow-fuchsia-500/20'
              : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white'
          }`}
          title={audioActive ? 'Audio FX Enabled' : 'Click to Enable Audio FX'}
        >
          {audioActive ? <Volume2 className="w-3 h-3 text-fuchsia-400" /> : <VolumeX className="w-3 h-3 text-neutral-500" />}
          <span className="text-[10px] hidden sm:inline">{audioActive ? 'FX ON' : 'FX OFF'}</span>
        </button>

        {/* Latency */}
        <div className="hidden sm:flex items-center gap-1.5 text-neutral-400">
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span>{latency}ms</span>
        </div>

        {/* Local Time UTC+4 */}
        <div className="hidden sm:flex items-center gap-1.5 text-neutral-300">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{time ? `${time} UTC+4` : '--:--:--'}</span>
        </div>

        {/* Available Badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-500/30 text-emerald-400 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AVAILABLE</span>
        </div>

        {/* Command Palette Button */}
        <button
          onClick={() => {
            sound.playClick();
            onOpenCommandPalette();
          }}
          className="flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-violet-600/30 via-fuchsia-600/30 to-cyan-600/30 hover:from-violet-600/50 hover:to-cyan-600/50 border border-violet-500/40 text-violet-200 transition-all cursor-pointer shadow-sm"
          title="Open Command Palette (⌘K)"
        >
          <Terminal className="w-3 h-3 text-cyan-400" />
          <span className="font-semibold text-[10px]">⌘K</span>
        </button>
      </div>
    </div>
  );
}
