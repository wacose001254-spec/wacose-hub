"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Dumbbell, Utensils, Check } from 'lucide-react';

export default function QuickEntry() {
  const [exercise, setExercise] = useState("Pushups");
  const [reps, setReps] = useState("");
  const [customMeal, setCustomMeal] = useState("");
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success'>('idle');

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
    }
  };

  const handleCustomMeal = async () => {
    if (!customMeal) return;
    setStatus('syncing');

    const { error } = await supabase
      .from('finances') // Custom meals logged as tracking entries in finances or a meals table
      .insert([{ 
        description: `MEAL: ${customMeal}`, 
        amount: 0, 
        type: 'expense',
        created_at: new Date().toISOString() 
      }]);

    if (!error) {
      setCustomMeal("");
      triggerSuccess();
    }
  };

  const triggerSuccess = () => {
    setStatus('success');
    setTimeout(() => setStatus('idle'), 2000);
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 space-y-6">
      <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4">Quick Entry</h3>
      
      {/* Workout Input */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <input 
            type="number" 
            value={reps} 
            onChange={(e) => setReps(e.target.value)}
            placeholder="Reps" 
            className="w-24 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-mono focus:border-blue-500 outline-none"
          />
          <button 
            onClick={handleWorkout}
            className="flex-1 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            {status === 'success' ? <Check size={16} /> : <Dumbbell size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest">Log Reps</span>
          </button>
        </div>
      </div>

      {/* Off-Menu Meal Input */}
      <div className="pt-4 border-t border-white/5 space-y-3">
        <input 
          type="text" 
          value={customMeal}
          onChange={(e) => setCustomMeal(e.target.value)}
          placeholder="Log Off-Menu Meal..." 
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-orange-500 outline-none"
        />
        <button 
          onClick={handleCustomMeal}
          className="w-full py-3 border border-orange-500/20 hover:bg-orange-500/10 text-orange-500 rounded-xl flex items-center justify-center gap-2 transition-all text-[10px] font-black uppercase tracking-widest"
        >
          <Utensils size={14} /> Log Custom Meal
        </button>
      </div>
    </div>
  );
}