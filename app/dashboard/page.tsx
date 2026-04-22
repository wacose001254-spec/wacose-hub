"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Components
import FinancialLog from '@/components/FinancialLog';
import WorkoutLog from '@/components/WorkoutLog';
import MealTracker from '@/components/MealTracker';
import MealSlider from '@/components/MealSlider';
import QuickEntry from '@/components/QuickEntry'; 
import WealthAuditor from '@/components/WealthAuditor';
import PhotoVault from '@/components/PhotoVault';
import LiveTicker from '@/components/LiveTicker';

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
    const { data: allFinances } = await supabase.from('finances').select('amount, type');
    if (allFinances) {
      const total = allFinances.reduce((acc, curr) => 
        curr.type === 'income' ? acc + curr.amount : acc - curr.amount, 0);
      setTotalSavings(total);
    }

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

    const { data: logs } = await supabase
      .from('finances')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    if (logs) setRecentLogs(logs);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-blue-500/30">
      
      {/* 1. NAVIGATION */}
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <Link href="/" className="flex items-center gap-2 group">
          <LayoutDashboard className="text-blue-500 group-hover:rotate-12 transition-transform" />
          <h1 className="font-black text-2xl uppercase italic tracking-tighter">Wacose OS</h1>
        </Link>
        <div className="px-4 py-1 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          Nairobi Hub • Operating System
        </div>
      </nav>

      {/* 2. STATS OVERVIEW */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-green-500/10 flex justify-between items-center">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Inflow</p>
            <h2 className="text-4xl font-black text-green-500 font-mono tracking-tighter">KSh {todayIncome.toLocaleString()}</h2>
          </div>
          <ArrowUpCircle size={32} className="text-green-500/20" />
        </div>

        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-red-500/10 flex justify-between items-center">
          <div>
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Total Outflow</p>
            <h2 className="text-4xl font-black text-red-500 font-mono tracking-tighter">KSh {todayExpense.toLocaleString()}</h2>
          </div>
          <ArrowDownCircle size={32} className="text-red-500/20" />
        </div>

        <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-blue-500/20 flex justify-between items-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Fuel Efficiency</p>
            <h2 className="text-4xl font-black font-mono tracking-tighter text-blue-500">{fuelEfficiency.toFixed(0)}%</h2>
          </div>
          <Activity size={32} className="text-blue-500/20 relative z-10" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-zinc-800">
             <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${fuelEfficiency}%` }} />
          </div>
        </div>
      </div>

      {/* 3. BENTO GRID SYSTEM */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: FINANCIALS */}
        <div className="space-y-8">
          <FinancialLog />
          <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5">
            <div className="flex justify-between mb-4">
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Asset Goal: 500K</p>
              <BarChart3 size={16} className="text-blue-500" />
            </div>
            <h2 className="text-3xl font-black italic tracking-tighter mb-4">KSh {totalSavings.toLocaleString()}</h2>
            <WealthAuditor totalSavings={totalSavings} />
          </div>
        </div>

        {/* MIDDLE: LOGS */}
        <div className="space-y-8">
          <WorkoutLog />
          <MealTracker />
        </div>

        {/* RIGHT: INPUTS */}
        <div className="space-y-8">
          <QuickEntry />
          <PhotoVault />
        </div>
      </div>

      {/* 4. FOOTER PROTOCOL */}
      <div className="mt-20">
        <MealSlider />
      </div>

      {/* 5. LIVE COMMAND TICKER */}
      <LiveTicker logs={recentLogs} />

    </main>
  );
}