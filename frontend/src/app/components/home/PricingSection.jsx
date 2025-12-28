'use client';
import { useState } from 'react';

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 relative bg-gradient-to-b from-transparent to-black/50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1 rounded-full border border-border text-xs text-gray-400 mb-6 tracking-widest uppercase">
          Pricing
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Buy a Package with your <span className="text-primary">Task level</span>
        </h2>

        <div className="flex justify-center mb-16">
          <div className="bg-surface p-1 rounded-full flex items-center border border-border">
            <button 
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${isAnnual ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Payed Annually
            </button>
            <button 
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              payed monthly
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-end">
          <PricingCard title="SimpleTeam" price="$9.99" color="bg-blue-500" />
          
          {/* Pro Card */}
          <div className="relative bg-surface rounded-[2rem] p-8 border border-primary/50 shadow-[0_0_50px_-10px_rgba(249,115,22,0.15)] transform md:scale-105 z-10 text-left">
         
            <div className="relative w-12 h-12 flex items-center justify-center text-yellow-400 text-4xl font-black mb-6">*</div>
            <h3 className="text-2xl font-bold mb-1">TickTrack Pro</h3>
            <p className="text-sm text-gray-500 mb-6">$14.99 per member/ month</p>
            <button className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition mb-8">Get started</button>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-2"><span>•</span> Unlimited lists</li>
              <li className="flex gap-2"><span>•</span> Advanced categorization</li>
              <li className="flex gap-2"><span>•</span> Web and desktop app access</li>
            </ul>
          </div>
          
          <PricingCard title="SimpleTeam" price="$9.99" color="bg-pink-500" />
        </div>
      </div>
    </section>
  );
}

function PricingCard({ title, price, color }) {
  return (
    <div className="bg-surface border border-border rounded-[2rem] p-8 text-left hover:border-white/10 transition-colors">
      
      <h3 className="text-xl font-bold text-gray-200 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 mb-8">{price} per member/ month</p>
      <button className="w-full py-3 rounded-full border border-border text-gray-400 hover:bg-white/5 transition mb-8">Get started</button>
      <ul className="space-y-3 text-sm text-gray-500">
        <li className="flex gap-2"><span>•</span> Team collaboration tools</li>
        <li className="flex gap-2"><span>•</span> Admin controls</li>
        <li className="flex gap-2"><span>•</span> Advanced security</li>
      </ul>
    </div>
  );
}