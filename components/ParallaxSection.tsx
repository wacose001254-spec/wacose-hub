// components/ParallaxSection.tsx
import FinancialLog from './FinancialLog';

export default function ParallaxSection() {
  return (
    <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-grayscale-[0.5]" />
      </div>

      <div className="relative z-10 w-full px-4">
        <FinancialLog />
      </div>
    </section>
  );
}