'use client';

import React, { useState } from 'react';
import ParticleCanvas from '@/components/ParticleCanvas';
import TelemetryBar from '@/components/TelemetryBar';
import Navbar from '@/components/Navbar';
import CommandPalette from '@/components/CommandPalette';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import SystemSimulator from '@/components/SystemSimulator';
import ProjectsSection from '@/components/ProjectsSection';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import SkillsMatrix from '@/components/SkillsMatrix';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#06050e] text-neutral-100 bg-cyber-grid selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Interactive Constellation / Neural Particle Mesh Canvas */}
      <ParticleCanvas />

      {/* Real-time System Telemetry HUD Bar */}
      <TelemetryBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Floating Navigation */}
      <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

      {/* Developer Command Palette (Cmd + K / Search) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectAction={() => setCommandPaletteOpen(true)}
      />

      <main className="relative z-10">
        {/* Animated Hero Section with Typewriter & Interactive Terminal */}
        <Hero onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* High-Impact Engineering Metrics */}
        <StatsBar />

        {/* Live System Design & Concurrency Engine Sandbox */}
        <SystemSimulator />

        {/* Featured Production Systems & Architecture Specs */}
        <ProjectsSection />

        {/* Production Career Progression & Git Changelog */}
        <ExperienceTimeline />

        {/* 4-Layer Architecture & Skill Radar */}
        <SkillsMatrix />

        {/* Direct Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
