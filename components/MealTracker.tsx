"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Utensils, Clock, CheckCircle } from 'lucide-react';

export default function MealTracker() {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    fetchMeals();
    const channel = supabase
      .channel('meal-updates')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'daily_meals' }, () => fetchMeals())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchMeals = async () => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from('daily_meals')
      .select('*')
      .gte('created_at', startOfToday.toISOString())
      .order('created_at', { ascending: false });
    
    if (data) setMeals(data);
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Utensils className="text-orange-500" size={20} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Fuel Log</h3>
        </div>
        <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
          {meals.length} Intakes
        </span>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {meals.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-white/10 rounded-[2rem] opacity-40">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Waiting for first intake...</p>
          </div>
        ) : (
          meals.map((meal) => (
            <div key={meal.id} className="flex items-center justify-between p-4 rounded-2xl bg-black border border-white/5 group hover:border-orange-500/30 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-500/10 rounded-xl">
                  <CheckCircle size={14} className="text-orange-500" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase italic tracking-tighter text-white">{meal.meal_name}</p>
                  <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock size={10} /> {new Date(meal.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}