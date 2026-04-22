"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Clock, Utensils } from 'lucide-react';

export default function MealTracker() {
  const [meals, setMeals] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('daily_meals').select('*').gte('created_at', new Date().toISOString().split('T')[0]).order('created_at', { ascending: false });
      if (data) setMeals(data);
    };
    fetch();
    const sub = supabase.channel('meals').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'daily_meals' }, fetch).subscribe();
    return () => { supabase.removeChannel(sub); };
  }, []);

  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Fuel History</h3>
        <Utensils size={14} className="text-orange-500" />
      </div>
      <div className="space-y-3">
        {meals.map(m => (
          <div key={m.id} className="flex justify-between items-center p-4 bg-black rounded-2xl border border-white/5">
            <span className="text-sm font-black uppercase italic tracking-tighter">{m.meal_name}</span>
            <span className="text-[9px] font-mono text-zinc-500">{new Date(m.created_at).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
          </div>
        ))}
      </div>
    </div>
  );
}