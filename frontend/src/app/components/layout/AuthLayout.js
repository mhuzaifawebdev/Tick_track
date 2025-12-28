"use client";

import { Card } from "../ui"; // Ensure your UI Card component supports className overrides or uses transparency
import Link from "next/link";
import Image from "next/image";
export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground relative overflow-hidden px-4 py-12">
      
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        
        {/* --- BRANDING (Logo) --- */}
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

        {/* --- AUTH CARD --- */}
        <Card className="p-8 bg-surface border border-border shadow-2xl rounded-[2rem] backdrop-blur-sm">
          {title && (
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-gray-400">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {children}
        </Card>

        {/* --- FOOTER --- */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our{' '}
            <Link href="#" className="hover:text-primary transition-colors underline">User Agreement</Link> and{' '}
            <Link href="#" className="hover:text-primary transition-colors underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};