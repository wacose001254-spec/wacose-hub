"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Utensils, Dumbbell, CheckCircle, Loader2 } from 'lucide-react';

export default function QuickEntry() {
  const [loadingMeal, setLoadingMeal] = useState(false);
  const [loadingWork, setLoadingWork] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Your actual rotational menu options
  const mealOptions = [
    { label: "Foundation: 3 Eggs + Ngwaci + Sukuma", val: "Eggs/Ngwaci/Sukuma" },
    { label: "Foundation: Omena + Managu + Nduma", val: "Omena/Managu/Nduma" },
    { label: "Foundation: Ndengu + Brown Ugali + Avocado", val: "Ndengu/Ugali/Avocado" },
    { label: "Foundation: Beef Liver + Spinach + Egg", val: "Liver/Spinach/Egg" },
    { label: "Metabolism: Nduma + Minced Beef + Matoke", val: "Nduma/Beef/Matoke" },
    { label: "Metabolism: Lentils (Kamande) + Avocado", val: "Kamande/Avocado" },
    { label: "Metabolism: Gizzards + Cabbage + Egg", val: "Gizzards/Cabbage/Egg" },
  ];

  // Your 6-Exercise Bodyweight Protocol
  const workoutTypes = [
    "Standard Pushups",
    "Diamond Pushups",
    "Bodyweight Squats",
    "Plank Holds (Seconds)",
    "Mountain Climbers",
    "Daily Walking (Steps)"
  ];

  const logMeal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingMeal(true);
    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from('meals').insert([
      { meal_name: formData.get('meal'), created_at: new Date().toISOString() }
    ]);
    if (!error) {
      setSuccess('meal');
      setTimeout(() => setSuccess(null), 2000);
    }
    setLoadingMeal(false);
  };

  const logWorkout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingWork(true);
    const formData = new FormData(e.currentTarget);
    const { error } = await supabase.from('workouts').insert([
      { 
        exercise: formData.get('exercise'), 
        reps: parseInt(formData.get('reps') as string),
        created_at: new Date().toISOString() 
      }
    ]);
    if (!error) {
      setSuccess('work');
      setTimeout(() => setSuccess(null), 2000);
    }
    setLoadingWork(false);
  };

  return (
    <div className="space-y-6">
      {/* MEAL LOGGING */}
      <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 text-blue-400">
          <Utensils size={16} />
          <h3 className="font-bold text-[10px] uppercase tracking-widest text-zinc-400">Log Fuel</h3>
        </div>
        <form onSubmit={logMeal} className="space-y-3">
          <select name="meal" className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
            {mealOptions.map((m) => (
              <option key={m.val} value={m.val}>{m.label}</option>
            ))}
          </select>
          <button className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            success === 'meal' ? 'bg-green-600' : 'bg-zinc-800 hover:bg-zinc-700'
          }`}>
            {loadingMeal ? <Loader2 className="animate-spin" size={14} /> : success === 'meal' ? <CheckCircle size={14} /> : "Record Meal"}
          </button>
        </form>
      </div>

      {/* WORKOUT LOGGING */}
      <div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 text-green-400">
          <Dumbbell size={16} />
          <h3 className="font-bold text-[10px] uppercase tracking-widest text-zinc-400">Log Movement</h3>
        </div>
        <form onSubmit={logWorkout} className="space-y-3">
          <select name="exercise" className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-green-500 outline-none">
            {workoutTypes.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
          <input 
            name="reps" 
            type="number" 
            placeholder="Reps / Seconds / Steps" 
            className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white outline-none focus:ring-2 focus:ring-green-500" 
            required 
          />
          <button className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
            success === 'work' ? 'bg-green-600' : 'bg-zinc-800 hover:bg-zinc-700'
          }`}>
            {loadingWork ? <Loader2 className="animate-spin" size={14} /> : success === 'work' ? <CheckCircle size={14} /> : "Record Session"}
          </button>
        </form>
      </div>
    </div>
  );
}