"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Dumbbell, Utensils, Check, Loader2, Plus } from 'lucide-react';

export default function QuickEntry() {
  const [reps, setReps] = useState("");
  const [exercise, setExercise] = useState("Pushups");
  const [customMeal, setCustomMeal] = useState("");
  const [status, setStatus] = useState<'idle' | 'syncing' | 'success'>('idle');

  const exercises = ["Pushups", "Pullups", "Squats", "Plank", "Dips", "Lunges"];

  const handleLog = async (type: 'workout' | 'meal', value: string, count?: string) => {
    setStatus('syncing');
    const table = type === 'workout' ? 'workouts' : 'daily_meals';
    const payload = type === 'workout' 
      ? { exercise_name: value, reps: parseInt(count || "0") } 
      : { meal_name: value };

    const { error } = await supabase.from(table).insert([{ ...payload, created_at: new Date().toISOString() }]);

    if (!error) {
      setReps(""); setCustomMeal(""); setStatus('success');
      setTimeout(() => setStatus('idle'), 2000);
    } else {
      console.error("Sync Error:", error.message);
      setStatus('idle');
    }
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 space-y-8">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6">Mechanical Output</p>
        <select 
          value={exercise} 
          onChange={(e) => setExercise(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-bold mb-4 outline-none text-white"
        >
          {exercises.map(ex => <option key={ex} value={ex}>{ex}</option>)}
        </select>
        <div className="flex gap-2">
          <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} placeholder="Reps" className="w-24 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm font-mono outline-none" />
          <button onClick={() => handleLog('workout', exercise, reps)} className="flex-1 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 font-black text-[10px] uppercase tracking-widest text-white">
            {status === 'syncing' ? <Loader2 className="animate-spin" size={16}/> : <Check size={16}/>} Log {exercise}
          </button>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-6">Fuel Protocol</p>
        <div className="flex gap-2">
          <input type="text" value={customMeal} onChange={(e) => setCustomMeal(e.target.value)} placeholder="Custom Intake..." className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm outline-none" />
          <button onClick={() => handleLog('meal', customMeal)} className="px-6 bg-orange-600 hover:bg-orange-500 rounded-xl transition-all active:scale-95 text-white"><Plus size={20}/></button>
        </div>
      </div>
    </div>
  );
}