'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ChevronDown } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 0,
    name: "Samuel Alemu",
    handle: "@samuel23",
    img: "/images/user-1.jpg",
    text: "TickTrack completely transformed how I manage my freelance projects. The ability to visualize upcoming tasks with such a clean interface is a game-changer for my productivity."
  },
  {
    id: 1,
    name: "Kalkidan Tilahun",
    handle: "@kalkidan",
    img: "/images/user-2.jpg",
    text: "Choose your SimpleList plan and watch your efficiency soar! Stay organized effortlessly—whether it's daily tasks, a packed schedule, or big projects, SimpleList keeps you on track and in control."
  },
  {
    id: 2,
    name: "Nuel Balcha",
    handle: "@nuel",
    img: "/images/user-3.jpg",
    text: "I've tried every to-do app on the market, but nothing compares to the minimalist yet powerful design of this tool. It's exactly what our design team needed."
  }
];

export default function TestimonialSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(1);

  const handleNext = () => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
  const handlePrev = () => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="relative">
        <div className="p-[2px] rounded-[3rem] bg-gradient-to-r from-yellow-500 via-primary to-pink-600">
          <div className="bg-surface rounded-[3rem] py-16 px-6 md:px-16 text-center">
            
            {/* User Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {TESTIMONIALS.map((user, index) => (
                <div key={user.id} onClick={() => setActiveTestimonial(index)} className="cursor-pointer transition-transform hover:scale-105">
                  <UserTestimonialPill 
                    name={user.name} 
                    handle={user.handle} 
                    img={user.img}
                    activeDot={index === activeTestimonial}
                    isActive={index === activeTestimonial}
                  />
                </div>
              ))}
            </div>

            {/* Animated Text */}
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeTestimonial}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400 text-base md:text-lg leading-relaxed max-w-3xl mx-auto min-h-[100px]"
              >
                {TESTIMONIALS[activeTestimonial].text}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={handlePrev} className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 hover:text-white hover:bg-white/10 transition-colors">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, index) => (
              <div 
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors ${index === activeTestimonial ? 'bg-primary' : 'bg-gray-700'}`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-orange-500/30 hover:bg-primary-hover hover:scale-105 transition-all">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}

function UserTestimonialPill({ name, handle, img, activeDot, isActive }) {
  return (
    <div className={`flex items-center gap-3 pr-4 pl-2 py-2 rounded-full border transition-all ${isActive ? 'bg-surface-hover border-white/20 opacity-100 scale-100' : 'bg-surface border-transparent opacity-60 hover:opacity-100'}`}>
      <div className="relative">
        <img src={img} alt={name} className="w-10 h-10 rounded-full object-cover" />
        {activeDot && <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full border-2 border-surface-hover"></div>}
      </div>
      <div className="text-left">
        <p className={`text-xs font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>{name}</p>
        <p className="text-[10px] text-gray-500">{handle}</p>
      </div>
      <ChevronDown size={14} className="text-gray-500 ml-2" />
    </div>
  );
}