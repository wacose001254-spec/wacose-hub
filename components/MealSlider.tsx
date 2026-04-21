"use client";

import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Utensils, Zap, Calendar, RefreshCcw } from 'lucide-react';

const protocolData = {
  week1: [
    { day: "Monday", protocol: "Builder", meal1: "3 Eggs + 1 Ngwaci + Sukuma", meal2: "Fried Omena + Managu + 1/2 Nduma", img: "https://images.unsplash.com/photo-1547516508-4c1f9c7c4ec3?q=80&w=1000" },
    { day: "Tuesday", protocol: "Cutter", meal1: "Ndengu + Brown Ugali + Avocado", meal2: "250g Beef Liver + Spinach + 1 Egg", img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1000" },
    { day: "Wednesday", protocol: "Builder", meal1: "3 Eggs + 1 Ngwaci + Sukuma", meal2: "Fried Omena + Terere + 1/2 Nduma", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000" },
    { day: "Thursday", protocol: "Cutter", meal1: "Ndengu + Brown Ugali + Avocado", meal2: "250g Beef Liver + Cabbage + 1 Egg", img: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000" },
    { day: "Friday", protocol: "Builder", meal1: "3 Eggs + 1 Ngwaci + Sukuma", meal2: "Fried Omena + Managu + Brown Bread", img: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1000" },
    { day: "Saturday", protocol: "Cutter", meal1: "Ndengu + Brown Ugali + Avocado", meal2: "250g Beef Liver + Spinach + 1 Egg", img: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1000" },
    { day: "Sunday", protocol: "Wildcard", meal1: "3 Eggs + 1 Ngwaci + Spinach", meal2: "Githeri + Large Avocado", img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?q=80&w=1000" },
  ],
  week2: [
    { day: "Monday", protocol: "Builder", meal1: "3 Eggs + 1 large Nduma + Sukuma", meal2: "Fried Minced Beef + Managu + Matoke (3)", img: "https://images.unsplash.com/photo-1594041680534-e8c8cdebd679?q=80&w=1000" },
    { day: "Tuesday", protocol: "Cutter", meal1: "Lentils (Kamande) + Avocado", meal2: "Chicken Gizzards + Cabbage + 1 Egg", img: "https://images.unsplash.com/photo-1512058560366-cd2429bb5c63?q=80&w=1000" },
    { day: "Wednesday", protocol: "Builder", meal1: "3 Eggs + 1 large Nduma + Sukuma", meal2: "Fried Minced Beef + Terere + Matoke (3)", img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1000" },
    { day: "Thursday", protocol: "Cutter", meal1: "Lentils (Kamande) + Avocado", meal2: "Chicken Gizzards + Spinach + 1 Egg", img: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1000" },
    { day: "Friday", protocol: "Builder", meal1: "3 Eggs + 1 large Nduma + Sukuma", meal2: "Fried Minced Beef + Managu + Brown Bread", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000" },
    { day: "Saturday", protocol: "Cutter", meal1: "Lentils (Kamande) + Avocado", meal2: "Chicken Gizzards + Cabbage + 1 Egg", img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=1000" },
    { day: "Sunday", protocol: "Wildcard", meal1: "3 Eggs + 1 large Nduma + Spinach", meal2: "Githeri + Avocado + 1 Wing", img: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=1000" },
  ]
};

export default function MealSlider() {
  const [week, setWeek] = useState<'week1' | 'week2'>('week1');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [activeSlide, setActiveSlide] = useState(0);
  
  const todayIndex = new Date().getDay();
  const adjustedToday = todayIndex === 0 ? 6 : todayIndex - 1; 

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  emblaApi?.on('select', () => setActiveSlide(emblaApi.selectedScrollSnap()));

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <span className="text-blue-500 uppercase tracking-[0.3em] text-[10px] font-bold">Nutritional Blueprint</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter italic uppercase">
            {week === 'week1' ? 'Foundations' : 'Muscle & Metabolism'}
          </h2>
        </div>

        {/* Week Variation Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex bg-zinc-900 rounded-full p-1 border border-white/10">
            <button 
              onClick={() => setWeek('week1')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${week === 'week1' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              Week 1
            </button>
            <button 
              onClick={() => setWeek('week2')}
              className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${week === 'week2' ? 'bg-blue-600 text-white shadow-lg' : 'text-zinc-500 hover:text-white'}`}
            >
              Week 2
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-3 bg-zinc-900/50 rounded-full border border-white/5">
            <Calendar size={14} className="text-blue-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">{protocolData[week][adjustedToday].day}</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {protocolData[week].map((day, index) => (
            <div key={`${week}-${day.day}`} className="flex-[0_0_100%] min-w-0 px-2 md:px-4">
              <div className="relative h-[550px] overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 group">
                
                {/* Background Image Layer */}
                <img 
                  src={day.img} 
                  alt={day.day} 
                  className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-1000 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <div className="relative h-full p-8 md:p-12 flex flex-col justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className={`px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl ${
                      day.protocol === 'Builder' ? 'bg-orange-600 text-white' : 
                      day.protocol === 'Cutter' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                    }`}>
                      {day.protocol} Mode
                    </div>
                    {index === adjustedToday && (
                      <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">Today</span>
                    )}
                  </div>

                  {/* Center Content */}
                  <div className="max-w-2xl">
                    <h3 className="text-5xl md:text-8xl font-black text-white italic uppercase tracking-tighter mb-8 opacity-90">{day.day}</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-blue-400 uppercase text-[10px] font-black tracking-widest">
                          <Zap size={14} /> 11:00 AM Fuel
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-white leading-tight">{day.meal1}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-orange-400 uppercase text-[10px] font-black tracking-widest">
                          <Utensils size={14} /> 07:00 PM Fuel
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-white leading-tight">{day.meal2}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Navigation */}
      <div className="flex justify-center gap-6 mt-10">
        <button onClick={scrollPrev} className="p-5 rounded-full bg-zinc-900 border border-white/10 text-white hover:bg-blue-600 transition-all shadow-2xl">
          <ChevronLeft size={24} />
        </button>
        <button onClick={scrollNext} className="p-5 rounded-full bg-zinc-900 border border-white/10 text-white hover:bg-blue-600 transition-all shadow-2xl">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}