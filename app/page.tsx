"use client";

import React from 'react';
import Link from 'next/link'; // Crucial: Uppercase 'L'
import { motion } from 'framer-motion';
import { Shield, Zap, Target, Camera } from 'lucide-react';
import Image from 'next/image'; // Required for optimal background loading

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-hidden">
      
      {/* 1. Cinematic Photo Background & Overlay */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/your-photo.jpg" // ⚠️ Place your photo in the 'public' folder and rename this path
          alt="Wacose OS Hero Background"
          fill
          priority
          className="object-cover object-center scale-110" // scale adds subtle depth
        />
        {/* Dark Blue Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9),rgba(37,99,235,0.2),rgba(0,0,0,0.9))] pointer-events-none" />
      </div>

      {/* 2. Content Layer (Elevated with z-10) */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        
        {/* Animated Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {/* Nairobi Badge */}
          <div className="flex justify-center gap-4 mb-8">
             <span className="px-4 py-1 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] bg-black/40 backdrop-blur-sm">
               Nairobi Logistics Hub
             </span>
          </div>

          {/* Master Headline */}
          <h1 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter mb-8 leading-[0.8] text-white">
            Wacose <span className="text-blue-600">OS</span>
          </h1>

          {/* Subtitle with proper contrast */}
          <p className="text-zinc-300 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed italic drop-shadow-lg">
            "Precision engineering for the streets. Scaling from Boda Boda logistics to a global design empire."
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link href="/dashboard">
              <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-blue-600 hover:text-white transition-all active:scale-95 shadow-xl">
                Launch Dashboard
              </button>
            </Link>

            <Link href="/vision">
              <button className="px-10 py-5 border border-white/30 rounded-full font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm">
                View Vision 2026
              </button>
            </Link>
          </div>
        </motion.div>

        {/* 3. Feature Grid at the bottom (Elevated for contrast) */}
        <div className="absolute bottom-12 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {[
            { icon: <Shield size={16} />, label: "Secured Vault" },
            { icon: <Zap size={16} />, label: "73% Efficiency" },
            { icon: <Target size={16} />, label: "500K Land Goal" },
            { icon: <Camera size={16} />, label: "8K Portfolio" }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/50 bg-black/20 p-3 rounded-xl backdrop-blur-sm">
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}