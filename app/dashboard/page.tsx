"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Components
import FinancialLog from '@/components/FinancialLog';
import WorkoutLog from '@/components/WorkoutLog';
import MealSlider from '@/components/MealSlider';
import QuickEntry from '@/components/QuickEntry'; 
import WealthAuditor from '@/components/WealthAuditor';
import PhotoVault from '@/components/PhotoVault';
import MealTracker from '@/components/MealTracker';
import LiveTicker from '@/components/LiveTicker'; // The New Live Stream Bar

// Icons
import { BarChart3, LayoutDashboard, ArrowUpCircle, ArrowDownCircle, Activity } from 'lucide-react';

export default function Dashboard() {
  const [totalSavings, setTotalSavings] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [todayExpense, setTodayExpense] = useState(0);
  const [fuelEfficiency, setFuelEfficiency] = useState(100);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchFinancialData();
    const interval = setInterval(fetchFinancialData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFinancialData = async () => {
    // 1. Total Savings for Land Goal (KSh 500,000)
    const { data: allFinances } = await supabase.from('finances').select('amount, type');
    if (allFinances) {
      const total = allFinances.reduce((acc, curr) => 
        curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);
      setTotalSavings(total);
    }

    // 2. Today's Specific Stats & Efficiency
    const today = new Date().toISOString().split('T')[0];
    const { data: todayData } = await supabase
      .from('finances')
      .select('amount, type, description')
      .gte('created_at', `${today}T00:00:00Z`);

    if (todayData) {
      const income = todayData.filter(i => i.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
      const expense = todayData.filter(i => i.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
      const fuel = todayData.filter(i => i.description.toLowerCase().includes('fuel')).reduce((acc, curr) => acc + curr.amount, 0);

      setTodayIncome(income);
      setTodayExpense(expense);
      
      const calcEfficiency = income > 0 ? ((income - fuel) / income) * 100 : 100;
      setFuelEfficiency(isNaN(calcEfficiency) ? 100 : calcEfficiency);
    }

    // 3. Activity Stream
    const { data: logs } = await supabase
      .from('finances')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10); // Increased limit for a better ticker stream
    if (logs) setRecentLogs(logs);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-24 font-sans">
      
      {/* 1. NAVIGATION HUB */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <Link href="/" className="flex items-center gap-2 group transition-all">
          <LayoutDashboard className="text-blue-500 group-hover:rotate-12 transition-transform" />
          <h1 className="font-black text-2xl uppercase italic tracking-tighter">Wacose OS</h1>
        </Link>
        <div className="hidden md:block px-4 py-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          Nairobi Logistics Hub • 2026
        </div>
      </nav>

      {/* 2. TOP SUMMARY STATS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-green-500/10 flex justify-between items-center">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Today's Inflow</p>
            <h2 className="text-4xl font-black text-green-500 font-mono tracking-tighter">
              KSh {todayIncome.toLocaleString()}
            </h2>
          </div>
          <ArrowUpCircle size={32} className="text-green-500/20" />
        </div>

        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-red-500/10 flex justify-between items-center">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Today's Outflow</p>
            <h2 className="text-4xl font-black text-red-500 font-mono tracking-tighter">
              KSh {todayExpense.toLocaleString()}
            </h2>
          </div>
          <ArrowDownCircle size={32} className="text-red-500/20" />
        </div>

        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-blue-500/20 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Fuel Efficiency</p>
            <h2 className={`text-4xl font-black font-mono tracking-tighter ${fuelEfficiency > 70 ? 'text-blue-500' : 'text-orange-500'}`}>
              {fuelEfficiency.toFixed(0)}%
            </h2>
          </div>
          <Activity size={32} className="text-blue-500/20 relative z-10" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800">
             <div 
               className="h-full bg-blue-500 transition-all duration-1000" 
               style={{ width: `${fuelEfficiency}%` }} 
             />
          </div>
        </div>
      </div>

      {/* 3. CORE OPERATING MODULES (Bento Grid) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN */}
        <div className="space-y-8">
          <FinancialLog />
          <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
            <div className="flex justify-between mb-4">
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Land Goal (500K)</p>
              <BarChart3 size={16} className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-black italic tracking-tighter">KSh {totalSavings.toLocaleString()}</h2>
            <div className="mt-4 w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400" 
                style={{ width: `${Math.min((totalSavings / 500000) * 100, 100)}%` }} 
              />
            </div>
            <WealthAuditor totalSavings={totalSavings} />
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div>
          <WorkoutLog />
          <div className="mt-8">
     <MealTracker /> {/* 👈 Add the new component here */}
  </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-8">
          <QuickEntry />
          <PhotoVault />
          <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5">
            <h3 className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-6">Activity Stream</h3>
            <div className="space-y-4">
              {recentLogs.slice(0, 3).map(log => (
                <div key={log.id} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                  <span className="text-sm font-bold text-zinc-300">{log.description}</span>
                  <span className={`font-mono text-sm font-bold ${log.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {log.type === 'income' ? '+' : '-'} {log.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. LOWER DECK */}
      <div className="mt-20 border-t border-white/5 pt-16">
        <MealSlider />
      </div>

      {/* 5. LIVE COMMAND TICKER */}
      <LiveTicker logs={recentLogs} />

    </main>
  );
}