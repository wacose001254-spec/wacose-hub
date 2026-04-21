"use client";

import React from 'react';
import Link from 'next/link'; // Crucial: Uppercase 'L'
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Camera } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-hidden">
      
      {/* Cinematic Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(37,99,235,0.1),transparent_50%)] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="flex justify-center gap-4 mb-8">
             <span className="px-4 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] bg-white/5">
               Nairobi Logistics Hub
             </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-8 leading-[0.8] text-white">
            Wacose <span className="text-blue-600">OS</span>
          </h1>

          <p className="text-zinc-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed italic">
            "Precision engineering for the streets. Scaling from Boda Boda logistics to a global design empire."
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/dashboard">
              <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                Launch Dashboard
              </button>
            </Link>

            {/* FIXED: Using Uppercase Link component here */}
            <Link href="/vision">
              <button className="px-10 py-5 border border-white/20 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95">
                View Vision 2026
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Feature Grid at the bottom */}
        <div className="absolute bottom-12 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 px-6 opacity-40">
          {[
            { icon: <Shield size={16} />, label: "Secured Vault" },
            { icon: <Zap size={16} />, label: "73% Efficiency" },
            { icon: <Target size={16} />, label: "500K Land Goal" },
            { icon: <Camera size={16} />, label: "8K Portfolio" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}