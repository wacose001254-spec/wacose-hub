// components/WorkoutLog.tsx
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Footprints, Dumbbell, Zap } from 'lucide-react';

const exercises = [
  { id: 'pushups', name: 'Pushups', goal: '50 Reps', icon: <Dumbbell size={20} /> },
  { id: 'walking', name: 'Daily Walk', goal: '10,000 Steps', icon: <Footprints size={20} /> },
  { id: 'core', name: 'Core Planks', goal: '3 Minutes', icon: <Zap size={20} /> },
];

export default function WorkoutLog() {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleExercise = (id: string) => {
    setCompleted(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const progress = (completed.length / exercises.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 shadow-2xl text-white"
    >
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tighter italic uppercase">Daily Grind</h2>
          <p className="text-zinc-500 text-sm">Lean & Strong Protocol</p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-black text-blue-500">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-800 rounded-full mb-8 overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
        />
      </div>

      <div className="space-y-4">
        {exercises.map((ex, index) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => toggleExercise(ex.id)}
            className={`cursor-pointer group flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 ${
              completed.includes(ex.id) 
              ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' 
              : 'bg-zinc-800/50 border-white/5 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl transition-colors ${
                completed.includes(ex.id) ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-400'
              }`}>
                {ex.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg">{ex.name}</h3>
                <p className="text-xs text-zinc-500 uppercase tracking-widest">{ex.goal}</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {completed.includes(ex.id) ? (
                <motion.div
                  key="checked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <CheckCircle2 className="text-blue-400" size={28} />
                </motion.div>
              ) : (
                <motion.div
                  key="unchecked"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Circle className="text-zinc-600 group-hover:text-zinc-400" size={28} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <button 
        className="w-full mt-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-colors active:scale-95"
        onClick={() => console.log("Workout Saved:", completed)}
      >
        Finish Session
      </button>
    </motion.div>
  );
}