"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import FinancialLog from '@/components/FinancialLog';
import WorkoutLog from '@/components/WorkoutLog';
import MealSlider from '@/components/MealSlider';
import QuickEntry from '@/components/QuickEntry'; 
import { BarChart3, LayoutDashboard, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'annually';

export default function Dashboard() {
  const [view, setView] = useState<TimeFrame>('daily');
  const [totalSavings, setTotalSavings] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [todayExpense, setTodayExpense] = useState(0);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    fetchFinancialData();
    
    // Set up a "handshake" to refresh data every 5 seconds or on demand
    const interval = setInterval(fetchFinancialData, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchFinancialData = async () => {
    // 1. Fetch ALL finances for the Land Goal
    const { data: allFinances } = await supabase.from('finances').select('amount, type');
    if (allFinances) {
      const total = allFinances.reduce((acc, curr) => {
        return curr.type === 'income' ? acc + curr.amount : acc - curr.amount;
      }, 0);
      setTotalSavings(total);
    }

    // 2. Fetch TODAY'S specific stats
    const today = new Date().toISOString().split('T')[0];
    const { data: todayData } = await supabase
      .from('finances')
      .select('amount, type')
      .gte('created_at', `${today}T00:00:00Z`);

    if (todayData) {
      const income = todayData.filter(i => i.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
      const expense = todayData.filter(i => i.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
      setTodayIncome(income);
      setTodayExpense(expense);
    }

    // 3. Fetch recent history
    const { data: logs } = await supabase
      .from('finances')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);
    if (logs) setRecentLogs(logs);
  };

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
      
      {/* 1. Cinematic Header */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-all cursor-pointer group">
            <LayoutDashboard className="text-blue-500 group-hover:rotate-12 transition-transform" />
            <h1 className="font-black tracking-tighter text-2xl uppercase italic">Wacose OS</h1>
          </Link>
          
          <div className="flex bg-zinc-900 rounded-full p-1 border border-white/10">
            {['daily', 'weekly', 'monthly', 'annually'].map((t) => (
              <button
                key={t}
                onClick={() => setView(t as TimeFrame)}
                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  view === t ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* NEW: TOP SUMMARY STATS */}
      <section className="pt-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Today's Income */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-green-500/10 flex justify-between items-center"
          >
            <div>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Today's Inflow</p>
              <h2 className="text-5xl md:text-6xl font-black text-green-500 tracking-tighter font-mono">
                KSh {todayIncome.toLocaleString()}
              </h2>
            </div>
            <ArrowUpCircle size={48} className="text-green-500/20" />
          </motion.div>

          {/* Today's Expenses */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-red-500/10 flex justify-between items-center"
          >
            <div>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-1">Today's Outflow</p>
              <h2 className="text-5xl md:text-6xl font-black text-red-500 tracking-tighter font-mono">
                KSh {todayExpense.toLocaleString()}
              </h2>
            </div>
            <ArrowDownCircle size={48} className="text-red-500/20" />
          </motion.div>
        </div>
      </section>

      {/* 2. Main Layout (Bento Grid) */}
      <section className="pt-12 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* LEFT COLUMN: Finance Engine */}
              <div className="lg:col-span-1 space-y-8">
                <FinancialLog />
                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">Target Land Goal</h3>
                    <BarChart3 size={16} className="text-blue-500" />
                  </div>
                  <p className="text-3xl font-black font-mono tracking-tighter italic">
                    KSh {totalSavings.toLocaleString()}
                  </p>
                  <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((totalSavings / 500000) * 100, 100)}%` }}
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-400" 
                    />
                  </div>
                  <div className="flex justify-between mt-2 font-black text-[10px] text-zinc-500 uppercase">
                    <span>Target: 500K</span>
                    <span>{Math.round((totalSavings / 500000) * 100)}% Achieved</span>
                  </div>
                </div>
              </div>

              {/* MIDDLE COLUMN: Workout Protocol */}
              <div className="lg:col-span-1">
                <WorkoutLog />
              </div>

              {/* RIGHT COLUMN: Quick Entry & History */}
              <div className="lg:col-span-1 space-y-8">
                <QuickEntry />
                <div className="space-y-4">
                  <h3 className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] px-2">Activity Stream</h3>
                  <div className="space-y-3">
                    {recentLogs.map((log) => (
                      <div key={log.id} className="flex justify-between items-center p-4 bg-zinc-900/30 border border-white/5 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${log.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <div className="flex flex-col">
                            <span className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">
                              {new Date(log.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-sm font-medium">{log.description}</span>
                          </div>
                        </div>
                        <span className={`${log.type === 'income' ? 'text-green-500' : 'text-red-500'} font-mono text-sm font-bold`}>
                          {log.type === 'income' ? '+' : '-'}KSh {log.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Meal Slider Section */}
      <section className="bg-zinc-900/20 py-20 border-t border-white/5">
         <MealSlider />
      </section>
    </main>
  );
}