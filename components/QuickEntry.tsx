"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Dumbbell, Utensils, Check, Zap, Loader2 } from 'lucide-react';

export default function QuickEntry() {
  const [exercise, setExercise] = useState("Pushups");
  const [reps, setReps] = useState("");
  const [customMeal, setCustomMeal] = useState("");
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success'>('idle');

  // Unified Success Trigger
  const triggerSuccess = () => {
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  // 1. LOG WORKOUT (Sends to 'workouts' table)
  const handleWorkout = async () => {
    if (!reps) return;
    setStatus('syncing');
    
    const { error } = await supabase
      .from('workouts')
      .insert([{ 
        exercise_name: exercise, 
        reps: parseInt(reps),
        created_at: new Date().toISOString() 
      }]);

    if (!error) {
      setReps("");
      triggerSuccess();
    } else {
      console.error("Workout Sync Error:", error.message);
      setStatus('idle');
    }
  };

  // 2. LOG MEAL (Sends to 'daily_meals' table)
  const handleMealLog = async (mealName: string) => {
    if (!mealName) return;
    setStatus('syncing');

    const { error } = await supabase
      .from('daily_meals')
      .insert([{ 
        meal_name: mealName,
        created_at: new Date().toISOString() 
      }]);

    if (!error) {
      setCustomMeal("");
      triggerSuccess();
    } else {
      console.error("Meal Sync Error:", error.message);
      setStatus('idle');
    }
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-md space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Quick Entry Hub</h3>
        {status === 'syncing' && <Loader2 size={14} className="text-blue-500 animate-spin" />}
      </div>
      
      {/* --- WORKOUT SECTION --- */}
      <div className="space-y-4">
        <p className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest">Physical Integrity</p>
        <div className="flex gap-2">
          <input 
            type="number" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)}
            placeholder="60" 
            className="w-24 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-blue-500 outline-none transition-all"
          />
          <button 
            onClick={handleWorkout}
            disabled={status === 'syncing'}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-900/20"
          >
            {status === 'success' ? <Check size={16} /> : <Dumbbell size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest">Log {exercise}</span>
          </button>
        </div>
      </div>

      {/* --- NUTRITION SECTION --- */}
      <div className="pt-6 border-t border-white/5 space-y-4">
        <p className="text-[9px] font-black text-orange-500/50 uppercase tracking-widest">Fuel Protocol</p>
        
        {/* Off-Menu Input */}
        <div className="flex gap-2">
          <input 
            type="text" 
            value={customMeal}
            onChange={(e) => setCustomMeal(e.target.value)}
            placeholder="Log Off-Menu Intake..." 
            className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none transition-all placeholder:text-zinc-700"
          />
          <button 
            onClick={() => handleMealLog(customMeal)}
            disabled={!customMeal || status === 'syncing'}
            className="px-4 border border-orange-500/20 hover:bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center transition-all disabled:opacity-20"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* Rapid "Cutter Protocol" Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {['Beef Liver', 'Ndengu'].map((meal) => (
            <button
              key={meal}
              onClick={() => handleMealLog(meal)}
              className="py-2 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 rounded-lg text-[9px] font-black uppercase tracking-tighter text-zinc-400 hover:text-white transition-all"
            >
              + {meal}
            </button>
          ))}
        </div>
      </div>

      {status === 'success' && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[9px] text-center text-green-500 font-black uppercase tracking-[0.3em]"
        >
          System Synchronized
        </motion.p>
      )}
    </div>
  );
}