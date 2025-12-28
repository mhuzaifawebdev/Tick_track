"use client";
import Image from "next/image";
import { Search, Bell, Menu } from "lucide-react";

export function Header({ user, onMenuClick }) {
  return (
    <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-border flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
       
       {/* Mobile Menu & Title */}
       <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
 
       </div>

       {/* Actions & Profile */}
       <div className="flex items-center gap-4">
          {/* Search Bar (Hidden on mobile) */}
          <div className="hidden md:flex items-center bg-surface-hover border border-border rounded-full px-4 py-1.5 w-64">
             <Search size={16} className="text-gray-500 mr-2" />
             <input 
               type="text" 
               placeholder="Search tasks..." 
               className="bg-transparent border-none focus:outline-none text-sm text-foreground w-full placeholder-gray-500"
             />
          </div>

         

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-medium leading-none text-foreground">{user?.firstName}</p>
               
             </div>
             {user?.profileImage ? (
                <Image src={user.profileImage} alt="User" width={40} height={40} className="rounded-full border border-border" />
             ) : (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold border border-border">
                   {user?.firstName?.[0]?.toUpperCase() || "U"}
                </div>
             )}
          </div>
       </div>
    </header>
  );
}