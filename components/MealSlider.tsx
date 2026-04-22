"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Utensils, Plus, Check } from 'lucide-react';

export default function MealSlider() {
  const [custom, setCustom] = useState("");
  const [loading, setLoading] = useState(false);

  const logMeal = async (name: string) => {
    if (!name) return;
    setLoading(true);
    const { error } = await supabase.from('daily_meals').insert([{ meal_name: name, created_at: new Date().toISOString() }]);
    if (!error) { setCustom(""); alert("Fuel Synchronized"); }
    setLoading(false);
  };

  return (
    <div className="p-12 rounded-[3.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-3xl">
      <div className="flex items-center gap-4 mb-12">
        <Utensils className="text-orange-500" size={24} />
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Cutter <span className="text-orange-500">Protocol</span></h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Beef Liver', 'Ndengu', 'Omena'].map(meal => (
          <button key={meal} onClick={() => logMeal(meal)} className="p-8 rounded-[2rem] bg-black border border-white/5 hover:border-orange-500/40 text-left transition-all group">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2">Rapid Log</p>
            <h4 className="text-xl font-black uppercase italic group-hover:text-orange-500">{meal}</h4>
          </button>
        ))}
        
        <div className="md:col-span-3 p-8 rounded-[2.5rem] bg-orange-500/5 border border-orange-500/20 flex flex-col md:flex-row gap-4 items-center">
          <input 
            type="text" value={custom} onChange={(e) => setCustom(e.target.value)}
            placeholder="Log specific off-menu intake..."
            className="flex-1 bg-black border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-orange-500"
          />
          <button 
            onClick={() => logMeal(custom)}
            className="w-full md:w-auto px-12 py-4 bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95"
          >
            {loading ? "Syncing..." : "Log Custom Meal"}
          </button>
        </div>
      </div>
    </div>
  );
}