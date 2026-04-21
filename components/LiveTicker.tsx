"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Log {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

export default function LiveTicker({ logs }: { logs: Log[] }) {
  if (!logs || logs.length === 0) return null;

  // Duplicate logs to ensure seamless infinite scrolling
  const tickerItems = [...logs, ...logs, ...logs];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-blue-600/90 backdrop-blur-xl border-t border-white/20 z-[100] h-10 overflow-hidden flex items-center">
      {/* "LIVE" Status Badge */}
      <div className="absolute left-0 top-0 h-full bg-black px-4 flex items-center gap-2 z-20 border-r border-white/10">
        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Live Stream</span>
      </div>

      {/* Infinite Scrolling Container */}
      <motion.div 
        className="flex whitespace-nowrap gap-12 pl-[120px]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          duration: 20, 
          ease: "linear" 
        }}
      >
        {tickerItems.map((log, i) => (
          <div key={`${log.id}-${i}`} className="flex items-center gap-3">
            <span className="text-white/40 font-mono text-[10px]">[{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]</span>
            <span className="text-white font-black uppercase text-[10px] tracking-widest italic">
              {log.description}
            </span>
            <span className={`flex items-center font-mono text-[10px] font-bold ${log.type === 'income' ? 'text-green-300' : 'text-red-300'}`}>
              {log.type === 'income' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              KSh {log.amount.toLocaleString()}
            </span>
            <Zap size={10} className="text-blue-300 ml-4 opacity-30" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}