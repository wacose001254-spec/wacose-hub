"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Utensils, Plus, ExternalLink } from 'lucide-react';

export default function MealSlider() {
  const [offMenuMeal, setOffMenuMeal] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  const logMeal = async (mealName: string) => {
    setIsLogging(true);
    const { error } = await supabase
      .from('meals')
      .insert([{ name: mealName, timestamp: new Date().toISOString() }]);
    
    if (!error) {
      alert(`Logged: ${mealName}`);
      setOffMenuMeal("");
    }
    setIsLogging(false);
  };

  return (
    <div className="p-8 rounded-[3rem] bg-zinc-900/30 border border-white/5">
      <div className="flex items-center gap-3 mb-8">
        <Utensils className="text-orange-500" size={20} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Nutrition Protocol</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Standard Menu Logs go here... (Keep your existing slider buttons) */}
        
        {/* NEW: Off-Menu Entry Card */}
        <div className="p-6 rounded-[2rem] bg-black/50 border border-orange-500/10 flex flex-col justify-between">
          <div>
            <p className="text-orange-500 text-[10px] font-black uppercase tracking-widest mb-2">Off-Menu Tracking</p>
            <input 
              type="text" 
              value={offMenuMeal}
              onChange={(e) => setOffMenuMeal(e.target.value)}
              placeholder="e.g. Chapo Madondo" 
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-orange-500 transition-all text-white mb-4"
            />
          </div>
          <button 
            disabled={!offMenuMeal || isLogging}
            onClick={() => logMeal(offMenuMeal)}
            className="w-full py-3 bg-orange-600/10 hover:bg-orange-600 text-orange-500 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 disabled:opacity-30"
          >
            <Plus size={14} /> Log Custom Meal
          </button>
        </div>
      </div>
    </div>
  );
}