'use client';
import { Star } from 'lucide-react';
import HeroSection from '@/app/components/home/HeroSection';
import TestimonialSection from '@/app/components/home/TestimonialSection';
import PricingSection from '@/app/components/home/PricingSection';

export default function TickTrackLanding() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      
      <HeroSection />
      
      <TestimonialSection />
      
      <PricingSection />

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center border-t border-border bg-black">
         <div className="flex justify-center gap-1 mb-4">
           {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-gray-600 fill-gray-600" />)}
         </div>
         <p className="text-sm text-gray-500">100+ reviews <span className="text-primary font-bold">on Google</span></p>
      </footer>
      
    </div>
  );
}