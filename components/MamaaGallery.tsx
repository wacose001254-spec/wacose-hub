"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import Image from 'next/image';

const images = [
  { url: '/mamaa-1.jpg', caption: 'Partnership & Engineering' },
  { url: '/mamaa-2.jpg', caption: 'Family Foundation' },
  { url: '/mamaa-3.jpg', caption: '2026 Vision: Kisumu to Nairobi' },
];

export default function MamaaGallery() {
  const [index, setIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 1. Automatic Shuffling (Every 5 seconds)
  useEffect(() => {
    if (isFullScreen) return; // Pause auto-play if viewing full screen
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [index, isFullScreen]);

  const next = () => setIndex((prev) => (prev + 1) % images.length);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="mt-20 border-t border-white/5 pt-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500" size={18} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
            The Why: Family & Partnership
          </h3>
        </div>
        <span className="text-[10px] font-mono text-zinc-600 uppercase">Auto-Sync Active</span>
      </div>

      {/* 2. Main Large Slider Container */}
      <div className="relative aspect-square md:aspect-[21/9] w-full overflow-hidden rounded-[3.5rem] bg-zinc-900 group cursor-pointer border border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative w-full h-full"
            onClick={() => setIsFullScreen(true)}
          >
            <Image 
              src={images[index].url} 
              alt="Janet Gallery" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Cinematic Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            
            <div className="absolute bottom-12 left-12 z-10">
              <p className="text-white text-3xl md:text-5xl font-black italic uppercase tracking-tighter drop-shadow-2xl">
                {images[index].caption}
              </p>
              <div className="flex items-center gap-2 mt-4 text-blue-500 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={12} /> Click to expand
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Manual Controls */}
        <div className="absolute inset-0 flex items-center justify-between px-8 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button onClick={(e) => { e.stopPropagation(); prev(); }} className="p-5 bg-black/60 backdrop-blur-2xl rounded-full text-white border border-white/10 hover:bg-blue-600 transition-all">
            <ChevronLeft size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }} className="p-5 bg-black/60 backdrop-blur-2xl rounded-full text-white border border-white/10 hover:bg-blue-600 transition-all">
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      {/* 3. Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsFullScreen(false)}
          >
            <button className="absolute top-10 right-10 text-white hover:text-blue-500 z-[110]">
              <X size={40} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full h-full max-w-7xl max-h-[80vh]"
            >
              <Image 
                src={images[index].url} 
                alt="Full View" 
                fill 
                className="object-contain"
              />
            </motion.div>
            
            <div className="absolute bottom-10 text-center">
              <h4 className="text-white text-xl font-black italic uppercase tracking-widest">{images[index].caption}</h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}