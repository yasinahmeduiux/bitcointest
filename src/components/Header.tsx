import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, LifeBuoy, X, Send, ArrowRight, CheckCircle } from 'lucide-react';

interface HeaderProps {
  onOpenGuides: () => void;
  onOpenSupport: () => void;
}

export default function Header({ onOpenGuides, onOpenSupport }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', damping: 20 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="flex items-center justify-between bg-[#141416]/95 backdrop-blur-md text-[#A3A3A3] px-4 py-2 rounded-full border border-white/10 shadow-xl w-full max-w-md">
        {/* Left: App Logo Icon */}
        <div className="flex items-center space-x-2 pl-1 select-none">
          <div className="relative w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 shadow-md shadow-orange-500/20 overflow-hidden">
            {/* Minimalist Crossed Path logo as displayed in screenshot */}
            <div className="absolute inset-0 bg-white/10" />
            <svg 
              className="w-4 h-4 text-white font-black" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="3.5"
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="4" y1="4" x2="20" y2="20"></line>
              <line x1="20" y1="4" x2="4" y2="20"></line>
            </svg>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="flex items-center space-x-5 text-sm font-medium">
          <button
            onClick={onOpenGuides}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
          >
            Guides
          </button>
          <span className="text-white/10 text-xs select-none">|</span>
          <button
            onClick={onOpenSupport}
            className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 focus:outline-none"
          >
            Support
          </button>
        </nav>

        {/* Right: CTA button in navbar */}
        <div>
          <button
            onClick={onOpenGuides}
            className="bg-[#212124] text-white py-1.5 px-4 rounded-full text-xs font-semibold border border-white/5 hover:bg-neutral-800 hover:border-white/10 transition-all cursor-pointer active:scale-95 focus:outline-none"
          >
            Remix for free
          </button>
        </div>
      </div>
    </motion.header>
  );
}
