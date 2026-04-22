"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Dumbbell, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function WorkoutLog() {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    fetchSessions();
    
    // Live synchronization listener
    const channel = supabase
      .channel('workout-updates')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'workouts' }, 
        () => fetchSessions()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchSessions = async () => {
    // Aggressive Today Filter: Start of the day in local time
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const { data } = await supabase
      .from('workouts')
      .select('*')
      .gte('created_at', startOfToday.toISOString())
      .order('created_at', { ascending: false });
    
    if (data) setSessions(data);
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Dumbbell className="text-blue-500" size={20} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Daily Grind</h3>
        </div>
        <div className="px-3 py-1 bg-blue-500/10 rounded-full flex items-center gap-2 border border-blue-500/20">
          <Zap size={10} className="text-blue-500 fill-blue-500" />
          <span className="text-[10px] font-black text-white">{sessions.length} Logs</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {sessions.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-white/10 rounded-[2rem] opacity-50">
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em]">No mechanical output detected</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-5 rounded-2xl bg-black border border-white/5 group hover:border-blue-500/40 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <CheckCircle2 size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase italic tracking-tighter text-white">{session.exercise_name}</p>
                  <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Clock size={10} /> {new Date(session.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-mono font-black text-blue-500 tracking-tighter">{session.reps}</span>
                <span className="text-[9px] font-black text-zinc-700 ml-1">REPS</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}