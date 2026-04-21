"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Camera, Upload, Loader2, CheckCircle } from 'lucide-react';

export default function PhotoVault() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage
        .from('vault')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      setStatus("Uploaded Successfully!");
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      alert('Error uploading image!');
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-4">
        <Camera className="text-purple-500" size={18} />
        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Photography Vault</h3>
      </div>
      
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition-all">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          {uploading ? (
            <Loader2 className="animate-spin text-zinc-500" size={24} />
          ) : status ? (
            <CheckCircle className="text-green-500" size={24} />
          ) : (
            <Upload className="text-zinc-500" size={24} />
          )}
          <p className="mt-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            {uploading ? "Syncing 8K Frame..." : status ? status : "Upload Cinematic Shot"}
          </p>
        </div>
        <input type="file" className="hidden" onChange={uploadPhoto} disabled={uploading} />
      </label>
    </div>
  );
}