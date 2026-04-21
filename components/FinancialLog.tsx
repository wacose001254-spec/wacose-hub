"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';
import { Wallet, PlusCircle, CheckCircle } from 'lucide-react';

export default function FinancialLog() {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    if (!amount || !note) return alert("Please enter amount and description");
    
    setLoading(true);
    const { error } = await supabase
      .from('finances')
      .insert([{ 
        type, 
        amount: parseInt(amount), 
        description: note,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error(error);
      alert("Error saving: " + error.message);
    } else {
      setSuccess(true);
      setAmount('');
      setNote('');
      setTimeout(() => setSuccess(false), 3000); // Reset success state after 3s
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 text-white shadow-2xl"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-600/20 rounded-xl">
            <Wallet className="text-blue-500" size={24} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tighter italic">Finance Engine</h2>
        </div>
        
        {/* Income/Expense Toggle */}
        <div className="flex bg-black rounded-full p-1 border border-white/10">
          <button 
            onClick={() => setType('income')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${type === 'income' ? 'bg-green-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            INCOME
          </button>
          <button 
            onClick={() => setType('expense')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black transition-all ${type === 'expense' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            EXPENSE
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Amount Input */}
        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2 block">Value (KSh)</label>
          <input 
            type="number" 
            placeholder="0.00" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-black/60 border border-white/5 rounded-2xl px-6 py-4 text-3xl font-mono focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-zinc-800"
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2 block">Description</label>
          <input 
            type="text" 
            placeholder="e.g. Boda Boda Morning Shift" 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>

        {/* Action Button */}
        <button 
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 ${
            success ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-500 shadow-[0_0_30px_rgba(37,99,235,0.2)]'
          }`}
        >
          {success ? (
            <><CheckCircle size={20} /> Committed</>
          ) : (
            <><PlusCircle size={20} /> {loading ? 'Processing...' : 'Commit Transaction'}</>
          )}
        </button>
      </div>
    </motion.div>
  );
}