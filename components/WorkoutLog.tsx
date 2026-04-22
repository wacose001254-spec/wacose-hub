"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Dumbbell, CheckCircle2, Clock, Zap } from 'lucide-react';

export default function WorkoutLog() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessions();
    // Set up real-time listener to update the list instantly
    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'workouts' }, 
        () => fetchSessions()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const fetchSessions = async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await supabase
      .from('workouts')
      .select('*')
      .gte('created_at', `${today}T00:00:00Z`)
      .order('created_at', { ascending: false });
    
    if (data) setSessions(data);
    setLoading(false);
  };

  return (
    <div className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-md">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Dumbbell className="text-blue-500" size={20} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Daily Grind</h3>
        </div>
        <div className="flex items-center gap-2">
           <Zap size={12} className="text-blue-500 animate-pulse" />
           <span className="text-[10px] font-black text-white uppercase tracking-widest">
             {sessions.length} Sessions
           </span>
        </div>
      </div>

      {/* The Scrolling Session Feed */}
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
        {sessions.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-white/10 rounded-[2rem]">
            <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">Ready for the first rep?</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div 
              key={session.id} 
              className="flex items-center justify-between p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                  <CheckCircle2 size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase italic tracking-tighter text-white">
                    {session.exercise_name}
                  </p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                    <Clock size={10} /> 
                    {new Date(session.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xl font-mono font-black text-blue-500 tracking-tighter">
                  {session.reps}
                </span>
                <span className="text-[9px] font-black text-zinc-600 ml-1 uppercase">Reps</span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <p className="mt-6 text-[8px] text-zinc-700 text-center uppercase tracking-widest font-bold">
        Mechanical Integrity: Synchronized with Supabase
      </p>
    </div>
  );
}