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

  // Auto-Play Logic
  useEffect(() => {
    if (isFullScreen) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isFullScreen]);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="mt-20 border-t border-white/5 pt-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Heart className="text-red-500 fill-red-500" size={18} />
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">
            Family & Partnership
          </h3>
        </div>
      </div>

      {/* MAIN CONTAINER: Optimized for Click Detection */}
      <div 
        onClick={() => setIsFullScreen(true)}
        className="relative aspect-square md:aspect-[21/9] w-full overflow-hidden rounded-[3.5rem] bg-zinc-900 group cursor-pointer border border-white/10 shadow-2xl active:scale-[0.98] transition-transform"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            <Image 
              src={images[index].url} 
              alt="Janet Gallery" 
              fill 
              className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              priority
            />
            
            {/* Click-Through Overlay: ensures click reaches the parent div */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 pointer-events-none" />
            
            <div className="absolute bottom-12 left-12 z-10 pointer-events-none">
              <p className="text-white text-3xl md:text-5xl font-black italic uppercase tracking-tighter drop-shadow-2xl">
                {images[index].caption}
              </p>
              <div className="flex items-center gap-2 mt-4 text-blue-500 font-black text-[10px] uppercase tracking-widest">
                <Maximize2 size={12} /> Click to expand
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons: Fixed with stopPropagation */}
        <div className="absolute inset-0 flex items-center justify-between px-8 z-30 pointer-events-none">
          <button 
            onClick={prev} 
            className="p-5 bg-black/60 backdrop-blur-2xl rounded-full text-white border border-white/10 hover:bg-blue-600 transition-all pointer-events-auto opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={28} />
          </button>
          <button 
            onClick={next} 
            className="p-5 bg-black/60 backdrop-blur-2xl rounded-full text-white border border-white/10 hover:bg-blue-600 transition-all pointer-events-auto opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      {/* FULL-SCREEN OVERLAY (THE LIGHTBOX) */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/98 backdrop-blur-3xl flex flex-col items-center justify-center p-4"
            onClick={() => setIsFullScreen(false)}
          >
            {/* Close Button */}
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors">
              <X size={48} strokeWidth={1} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative w-full h-[70vh] md:h-[85vh]"
            >
              <Image 
                src={images[index].url} 
                alt="Full View" 
                fill 
                className="object-contain"
              />
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8 text-center"
            >
              <h4 className="text-white text-2xl font-black italic uppercase tracking-[0.2em]">{images[index].caption}</h4>
              <p className="text-zinc-500 text-[10px] mt-2 uppercase font-bold tracking-widest">Click anywhere to return</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}