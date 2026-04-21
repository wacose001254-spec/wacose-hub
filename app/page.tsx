"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, TrendingUp, LayoutDashboard } from 'lucide-react';

// Card Data for the Portal Section
const protocols = [
  {
    title: "Lean Protocol",
    desc: "Advanced bodyweight training and meal tracking to maintain elite physical form.",
    icon: <Zap size={32} />,
    color: "group-hover:text-blue-400",
    glow: "hover:shadow-[0_0_50px_rgba(59,130,246,0.2)]",
    border: "hover:border-blue-500/50",
    href: "/dashboard" 
  },
  {
    title: "Wealth Tracker",
    desc: "Tracking every Shilling toward the KSh 500,000 goal and land acquisition.",
    icon: <TrendingUp size={32} />,
    color: "group-hover:text-green-400",
    glow: "hover:shadow-[0_0_50px_rgba(34,197,94,0.2)]",
    border: "hover:border-green-500/50",
    href: "/dashboard" 
  },
  {
    title: "Logistics Focus",
    desc: "Scaling Wasike Courier Services with precision engineering and design.",
    icon: <ShieldCheck size={32} />,
    color: "group-hover:text-purple-400",
    glow: "hover:shadow-[0_0_50px_rgba(168,85,247,0.2)]",
    border: "hover:border-purple-500/50",
    href: "/dashboard" 
  }
];

export default function LandingPage() {
  const { scrollY } = useScroll();
  
  // Parallax effects
  const yBg = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="bg-black text-white selection:bg-blue-500 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Cinematic Background */}
        <motion.div 
          style={{ y: yBg }}
          className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2500')] bg-cover bg-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />
        </motion.div>

        {/* Hero Content */}
        <motion.div 
          style={{ opacity: opacityText }}
          className="relative z-10 text-center px-6"
        >
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            className="text-blue-500 font-bold uppercase text-xs mb-4 block"
          >
            WACOSE CFO • Designer • Entrepreneur • Developer • Photographer
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter"
          >
            WACOSE <span className="text-blue-600">OS</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            The elite operating system for a lean body, strong mind, and 
            wealth-building discipline. Built for the Nairobi grind.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col md:flex-row gap-4 justify-center"
          >
            <Link 
              href="/dashboard"
              className="group px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              Enter System
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
            
            <link href="/vision">
            <button className="px-10 py-5 border border-white/20 rounded-full font-bold uppercase tracking-widest hover:bg-white/10 transition">
              View Vision 2026
            </button>
            </link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-500"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* --- FEATURES / PROTOCOLS SECTION --- */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 mb-2">System Modules</h2>
          <p className="text-4xl font-black uppercase italic tracking-tighter">Core Operating Procedures</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {protocols.map((item, index) => (
            <Link href={item.href} key={item.title}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-10 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-sm transition-all duration-500 cursor-pointer ${item.glow} ${item.border}`}
              >
                {/* Inner Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className={`w-20 h-20 rounded-2xl bg-black flex items-center justify-center border border-white/10 transition-colors duration-500 ${item.color}`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter group-hover:scale-105 transition-transform duration-500">
                    {item.title}
                  </h3>
                  
                  <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {item.desc}
                  </p>

                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                      Enter System →
                    </span>
                  </div>
                </div>

                {/* Background Glow Pulse Effect */}
                <div className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white/10 to-transparent`} />
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 border-t border-white/5 px-6 text-center">
        <div className="flex justify-center items-center gap-3 mb-4 opacity-50">
          <LayoutDashboard size={20} />
          <span className="font-black uppercase italic tracking-widest text-sm">Wacose Courier Services</span>
        </div>
        <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-[0.2em]">
          © 2026 Developed by Denis Wasike Musamali
        </p>
      </footer>
    </div>
  );
}