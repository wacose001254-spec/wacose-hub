"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Target, Plane, Landmark, Users, Heart } from 'lucide-react';
import MamaaGallery from '@/components/MamaaGallery';

const milestones = [
  {
    month: "APRIL 2026",
    title: "Foundation & Family",
    desc: "Execute the April 10th family visit and maintain the Wacose OS deployment. Physical and financial systems in sync.",
    icon: <Users className="text-blue-500" />,
  },
  {
    month: "JUNE 2026",
    title: "The Israel Handshake",
    desc: "Finalize logistics for the Israel work travel. Transitioning creative design to global standards and high-value contracts.",
    icon: <Plane className="text-purple-500" />,
  },
  {
    month: "SEPTEMBER 2026",
    title: "The Land Acquisition",
    desc: "Hitting the KSh 500,000 savings milestone. Converting Boda Boda hustle into a permanent family asset.",
    icon: <Landmark className="text-green-500" />,
  },
  {
    month: "DECEMBER 2026",
    title: "Full-Stack Logistics Hub",
    desc: "Wasike Courier Services (WACOSE) fully integrated with automated client intake and 8K cinematic marketing.",
    icon: <Target className="text-red-500" />,
  }
];

export default function Vision2026() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-20 selection:bg-blue-500/30">
      
      {/* 1. NAVIGATION */}
      <nav className="max-w-4xl mx-auto mb-20">
        <Link href="/dashboard" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-all group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to Dashboard</span>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto">
        
        {/* 2. HEADER SECTION */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-6 leading-none">
              Vision <span className="text-blue-600">2026</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-xl italic font-medium leading-relaxed border-l-2 border-blue-600 pl-6">
              "Engineering a legacy for Naomi and the family. Every shilling logged and every frame captured leads to this."
            </p>
          </motion.div>
        </header>

        {/* 3. TIMELINE MILESTONES */}
        <div className="space-y-12 border-l border-white/10 ml-4 mb-32">
          {milestones.map((m, i) => (
            <motion.div 
              key={m.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
              
              <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-sm group hover:border-blue-500/20 transition-all hover:bg-zinc-900/50">
                <span className="text-[10px] font-black text-blue-500 tracking-[0.4em] mb-3 block uppercase">{m.month}</span>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-black rounded-2xl border border-white/10 group-hover:scale-110 group-hover:border-blue-500/50 transition-all">
                    {m.icon}
                  </div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter">{m.title}</h2>
                </div>
                <p className="text-zinc-400 leading-relaxed font-medium text-sm">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. THE WHY: MAMAA GALLERY SLIDER */}
        <div className="mb-32">
          <MamaaGallery />
        </div>

        {/* 5. VISION FOOTER */}
        <footer className="relative p-12 rounded-[3.5rem] bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(37,99,235,0.1),transparent_70%)]" />
          <div className="relative z-10">
            <Heart className="text-red-500 mx-auto mb-6 animate-pulse" size={32} fill="currentColor" />
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Operational Status: Elite</h3>
            <p className="text-zinc-500 text-xs font-black uppercase tracking-[0.3em] max-w-md mx-auto">
              Maintain 70%+ Efficiency to ensure all 2026 milestones are met for Naomi, Mamaa, and the legacy.
            </p>
          </div>
        </footer>

      </div>
    </main>
  );
}