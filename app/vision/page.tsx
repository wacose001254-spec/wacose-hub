"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Target, Map, Plane, Landmark, Users } from 'lucide-react';

const milestones = [
  {
    month: "APRIL 2026",
    title: "Foundation & Family",
    desc: "Execute the April 10th family visit and maintain the Wacose OS deployment.",
    icon: <Users className="text-blue-500" />,
    status: "Active"
  },
  {
    month: "JUNE 2026",
    title: "The Israel Handshake",
    desc: "Finalize logistics for the Israel work travel. Transitioning creative design to global standards.",
    icon: <Plane className="text-purple-500" />,
    status: "Upcoming"
  },
  {
    month: "SEPTEMBER 2026",
    title: "The Land Acquisition",
    desc: "Hitting the KSh 500,000 savings milestone. Physical deed of land in hand.",
    icon: <Landmark className="text-green-500" />,
    status: "Upcoming"
  },
  {
    month: "DECEMBER 2026",
    title: "Full-Stack Logistics Hub",
    desc: "Wasike Courier Services fully integrated with a fleet management dashboard.",
    icon: <Target className="text-red-500" />,
    status: "Vision"
  }
];

export default function Vision2026() {
  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-20">
      <nav className="max-w-4xl mx-auto mb-20">
        <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-black uppercase tracking-widest">Back to OS</span>
        </Link>
      </nav>

      <div className="max-w-4xl mx-auto">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter mb-6"
          >
            Vision <span className="text-blue-600">2026</span>
          </motion.h1>
          <p className="text-zinc-500 text-lg max-w-xl italic uppercase tracking-tight">
            "Engineering a legacy for Naomi and the family. Every shilling logged, every kilometer ridden, every frame captured leads to this."
          </p>
        </header>

        <div className="space-y-12 border-l border-white/10 ml-4">
          {milestones.map((m, i) => (
            <motion.div 
              key={m.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
              
              <div className="p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-sm group hover:border-blue-500/20 transition-colors">
                <span className="text-[10px] font-black text-blue-500 tracking-[0.3em] mb-2 block">{m.month}</span>
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-black rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                    {m.icon}
                  </div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter">{m.title}</h2>
                </div>
                <p className="text-zinc-400 leading-relaxed font-medium">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="mt-32 p-12 rounded-[3rem] bg-gradient-to-br from-blue-600 to-purple-700 text-center">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Current Efficiency: 73%</h3>
          <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Maintain 70%+ to ensure all 2026 milestones hit. Stay Lean. Stay Focused.</p>
        </footer>
      </div>
    </main>
  );
}