'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowLeft, Plus, Search, Sun, Briefcase, Calendar, 
  CheckCircle2, Home, Star, Command, User, Heart, 
  Square, Copy, Trash2, GripVertical, MoreHorizontal, Check 
} from 'lucide-react';
import { ROUTES } from '@/app/lib/constants';

export default function HeroSection() {
  return (
    <>
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      {/* --- NAVBAR --- */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
       <div className="text-center mb-8">
        <Link href="/" className="inline-block group">
          <div className="relative transition-transform group-hover:scale-105">
            <Image 
              src="/images/tasktick-logo.png" 
              alt="TickTrack Logo" 
              width={180}  
              height={50}  
              className="object-contain mx-auto"
              priority    
            />
          </div>
        </Link>
</div>
        
        <div className="flex items-center gap-4">
            <Link href={ROUTES.LOGIN}>
                <button className="px-5 py-2 rounded-full border border-border text-sm font-medium hover:bg-surface-hover transition-colors text-gray-300">
                Log In
                </button>
            </Link>
            <Link href={ROUTES.SIGNUP} className="hidden sm:block">
                <button className="px-5 py-2 rounded-full bg-surface hover:bg-surface-hover border border-border text-sm font-medium transition-colors text-white">
                Sign Up
                </button>
            </Link>
        </div>
      </nav>

      {/* --- HERO CONTENT --- */}
      <section className="relative z-10 pt-16 pb-32 px-4 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Track your Task - <span className="text-primary">Tick</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Create, manage, and conquer your to-do lists with ease
          </p>
          
          <Link href={ROUTES.SIGNUP}>
            <button className="bg-primary hover:bg-primary-hover text-white font-semibold px-10 py-4 rounded-full transition-all shadow-[0_0_30px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.5)]">
                Get Started
            </button>
          </Link>
        </div>

        {/* --- HERO VISUAL --- */}
        <div className="relative max-w-5xl mx-auto h-[500px] md:h-[600px] flex justify-center items-center perspective-1000">
            {/* Sidebar (Left) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute left-0 md:left-[10%] top-1/2 -translate-y-1/2 w-[280px] h-[360px] bg-surface/90 border border-border rounded-3xl p-4 hidden md:flex flex-col gap-2 z-10 blur-[1px] scale-90 opacity-60 origin-right transform -rotate-y-12"
            >
              <div className="flex items-center gap-3 px-3 py-2 text-gray-500 mb-4">
                <Search size={16} /> <span className="text-sm">Search list.</span>
              </div>
              <SidebarItem icon={<Sun size={16} />} label="Today" />
              <SidebarItem icon={<Briefcase size={16} />} label="Work" />
              <SidebarItem icon={<Calendar size={16} />} label="Upcoming" active />
              <div className="relative">
                <SidebarItem icon={<CheckCircle2 size={16} />} label="Completed" />
                <div className="absolute -right-4 -top-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg z-50 flex items-center gap-1">
                   Tetoro <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-white border-b-[4px] border-b-transparent transform rotate-180"></div>
                </div>
              </div>
            </motion.div>

            {/* Icons (Right) */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.2 }}
               className="absolute right-0 md:right-[10%] top-1/2 -translate-y-1/2 w-[280px] h-[360px] bg-surface/90 border border-border rounded-3xl p-6 hidden md:block z-10 blur-[1px] scale-90 opacity-60 origin-left transform rotate-y-12"
            >
              <div className="grid grid-cols-4 gap-4 mb-8 opacity-50">
                 {/* Reused IconBox with abstract icons */}
                 <IconBox><Home size={18} /></IconBox>
                 <IconBox><Home size={18} /></IconBox>
                 <IconBox><Star size={18} /></IconBox>
                 <IconBox><Command size={18} /></IconBox>
                 <IconBox><User size={18} /></IconBox>
                 <IconBox>66</IconBox>
                 <IconBox><Heart size={18} /></IconBox>
                 <IconBox><Square size={18} /></IconBox>
              </div>
              <div className="flex gap-3 justify-center">
                 <ColorDot color="bg-primary" />
                 <ColorDot color="bg-yellow-400" />
                 <ColorDot color="bg-green-500" />
                 <ColorDot color="bg-pink-400" />
                 <ColorDot color="bg-purple-500" />
              </div>
            </motion.div>

            {/* Main Center Card */}
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-[340px] md:w-[380px] bg-surface border border-border rounded-[2.5rem] p-6 shadow-2xl z-20 flex flex-col gap-4"
              style={{ boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.5)' }}
            >
               <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-3 text-white">
                    <ArrowLeft size={20} className="text-gray-400" />
                    <span className="text-lg font-medium">Upcoming</span>
                 </div>
                 <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-gray-400 hover:text-white cursor-pointer">
                    <Plus size={18} />
                 </div>
               </div>
               <div className="space-y-3">
                  <TaskItem text="Promote Bento Cards v.2" />
                  <div className="relative">
                    <div className="bg-surface-hover p-3 rounded-xl border border-border flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                            <span className="text-sm text-gray-200">Release Bento Cards for Framef</span>
                        </div>
                        <MoreHorizontal size={14} className="text-gray-500" />
                    </div>
                  
                  </div>
                  <TaskItem text="Bento Cards: UI Components" />
                  <div className="flex items-center justify-between p-3 opacity-50">
                     <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center"><div className="w-2 h-2 bg-black rounded-full"/></div>
                        <span className="text-sm text-gray-400 line-through">Remove Illustrations</span>
                     </div>
                     <MoreHorizontal size={14} />
                  </div>
                  <TaskItem text="Bento Cards v.4" />
               </div>
               <div className="mt-auto pt-4 flex items-center gap-2 text-xs text-gray-500 font-medium">
                  <div className="w-4 h-4 rounded-full border-2 border-gray-600 border-t-transparent animate-spin" />
                  COMPLETED 1/5
                  <div className="ml-auto w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-white">
                     <MoreHorizontal size={16} />
                  </div>
               </div>
            </motion.div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/20 blur-[100px] -z-10" />
        </div>

        {/* --- TRUSTED BY SECTION --- */}
        <div className="mt-12 text-center">
            <p className="text-sm text-gray-400 mb-4">Trusted by over <span className="text-primary font-bold">10,000</span> Global users</p>
            <div className="flex justify-center -space-x-2">
                {[1, 2, 3, 4, 5].map((num) => (
                    <img 
                      key={num} 
                      src={`/images/user-${num}.jpg`} 
                      alt={`User ${num}`} 
                      className="w-10 h-10 rounded-full border-2 border-background object-cover" 
                    />
                ))}
            </div>
        </div>
      </section>

      {/* --- STEPS SECTION --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
         <div className="inline-block px-4 py-1 rounded-full border border-border text-xs text-gray-400 mb-6 tracking-widest uppercase">
            How it works
         </div>
         <h2 className="text-3xl md:text-5xl font-bold mb-20 text-gray-200">
            Three simple steps to <br/> <span className="text-gray-500">Get Started</span>
         </h2>

         <div className="grid md:grid-cols-3 gap-8 px-4">
            <StepCard number="1" title="Create Tasks" desc="Add tasks in seconds. Use shortcuts to capture ideas before they slip away.">
               <div className="relative w-32 h-32 flex flex-col items-center justify-center gap-2">
                  <div className="grid grid-cols-3 gap-2 opacity-50">
                     {[...Array(9)].map((_, i) => (
                        <div key={i} className={`w-6 h-6 rounded-md border ${i === 4 ? 'border-primary bg-primary/20 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'border-border bg-white/5'}`}></div>
                     ))}
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-border rounded-full scale-150 opacity-20 animate-pulse"></div>
               </div>
            </StepCard>

            <StepCard number="2" title="Manage & Organize" desc="Categorize with tags, set deadlines, and prioritize what matters most.">
               <div className="relative w-32 h-32 flex items-center justify-center">
                  <div className="absolute inset-0 border border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="w-12 h-12 rounded-full bg-surface-hover border border-white/20 flex items-center justify-center relative z-10 shadow-xl">
                      <Plus size={24} className="text-gray-200" />
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-border bg-surface flex items-center justify-center">
                      <Sun size={14} className="text-gray-500" />
                  </div>
               </div>
            </StepCard>

            <StepCard number="3" title="Track Progress" desc="Watch your productivity soar as you check off items and hit your goals.">
               <div className="flex flex-col gap-3 w-36 relative">
                  <div className="h-10 w-full bg-surface-hover border border-border rounded-lg flex items-center px-3 gap-3 shadow-lg z-10">
                      <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
                      <div className="ml-auto text-green-500 bg-green-500/10 p-1 rounded-full"><Check size={10} /></div>
                  </div>
                  <div className="h-10 w-[90%] self-center bg-surface border border-border rounded-lg flex items-center px-3 gap-3 opacity-60 z-0">
                      <div className="w-8 h-1.5 bg-gray-600 rounded-full"></div>
                      <div className="ml-auto text-green-500"><Check size={10} /></div>
                  </div>
               </div>
            </StepCard>
         </div>
      </section>
    </>
  );
}

// --- HELPER COMPONENTS (Using Global Colors) ---

function StepCard({ number, title, desc, children }) {
    return (
        <div className="relative group pt-8"> 
            <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary text-white font-bold text-lg flex items-center justify-center rounded-full shadow-[0_4px_15px_rgba(249,115,22,0.4)] z-20 border-4 border-background">
                {number}
            </div>
            <div className="h-full bg-surface border border-border rounded-[2rem] p-8 flex flex-col items-center text-center hover:border-primary/20 transition-all duration-300 hover:bg-surface-hover hover:shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                <div className="h-40 w-full flex items-center justify-center mb-2 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full scale-50 group-hover:scale-90 transition-transform duration-500"></div>
                    {children}
                </div>
                <h3 className="text-xl font-bold text-gray-200 mb-3 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-xs">{desc}</p>
            </div>
        </div>
    );
}

function TaskItem({ text }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl hover:bg-surface-hover transition-colors group">
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                <span className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{text}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">
                <Copy size={14} />
                <Trash2 size={14} />
                <GripVertical size={14} />
            </div>
        </div>
    );
}

function SidebarItem({ icon, label, active }) {
    return (
        <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-surface-hover text-white' : 'text-gray-500 hover:text-gray-300'}`}>
            {icon}
            <span>{label}</span>
        </div>
    );
}

function IconBox({ children }) {
    return <div className="w-10 h-10 rounded-xl bg-surface-hover flex items-center justify-center text-gray-500">{children}</div>;
}

function ColorDot({ color }) {
    return <div className={`w-3 h-3 rounded-full ${color}`} />;
}