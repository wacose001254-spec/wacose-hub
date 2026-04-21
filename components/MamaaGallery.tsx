"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import Image from 'next/image';

// ⚠️ Add your paths here. Put these images in your public/ folder.
const images = [
  { url: '/mamaa-1.jpg', caption: 'Partnership & Engineering' },
  { url: '/mamaa-2.jpg', caption: 'Family Foundation' },
  { url: '/mamaa-3.jpg', caption: '2026 Vision: Kisumu to Nairobi' },
];

export default function MamaaGallery() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="mt-32 border-t border-white/5 pt-20">
      <div className="flex items-center gap-3 mb-12">
        <Heart className="text-red-500 fill-red-500" size={20} />
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
          The Why: Family & Partnership
        </h3>
      </div>

      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[3rem] bg-zinc-900 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-full"
          >
            <Image 
              src={images[index].url} 
              alt="Janet Gallery" 
              fill 
              className="object-cover opacity-60"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute bottom-10 left-10">
              <p className="text-white text-2xl font-black italic uppercase tracking-tighter">
                {images[index].caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={prev} className="p-4 bg-black/50 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-blue-600">
            <ChevronLeft size={24} />
          </button>
          <button onClick={next} className="p-4 bg-black/50 backdrop-blur-xl rounded-full text-white border border-white/10 hover:bg-blue-600">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}