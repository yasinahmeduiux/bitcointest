import React, { useState } from 'react';
import Header from './components/Header';
import PhoneMockup from './components/PhoneMockup';
import OverlayPanels from './components/OverlayPanels';
import { motion } from 'motion/react';
import { Download, Sparkles, MoveRight, Layers, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [showGuides, setShowGuides] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-[#FAF9F5] text-neutral-900 flex flex-col justify-between overflow-x-hidden selection:bg-orange-200">
      
      {/* 
        HIGH-FIDELITY VECTOR BACKGROUND LAYERS
        Rebuilds the top-left mist/clouds and top-right lighthouse from the source design.
      */}

      {/* Top Left: Organic Cloudy Mist */}
      <div className="absolute top-0 left-0 w-full md:w-[60%] h-[400px] pointer-events-none overflow-hidden z-0 select-none">
        <svg 
          className="w-full h-full opacity-60 filter blur-4xl" 
          viewBox="0 0 800 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Multiple overlapping soft dark vectors to create that organic textured smokey slate cloud */}
          <path d="M-150 -100 C 100 -20 Q 300 150 -50 350 Z" fill="url(#mistGradient1)" opacity="0.35" />
          <path d="M-80 -150 C 200 -50 Q 150 250 -180 200 Z" fill="url(#mistGradient2)" opacity="0.4" />
          <path d="M-200 -50 C -50 -10 Q 50 120 -120 180 Z" fill="url(#mistGradient3)" opacity="0.3" />
          <defs>
            <radialGradient id="mistGradient1" cx="20%" cy="20%" r="60%">
              <stop offset="0%" stopColor="#2c2e35" />
              <stop offset="70%" stopColor="#3d3e42" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#faf9f5" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mistGradient2" cx="0%" cy="0%" r="70%">
              <stop offset="0%" stopColor="#1a1c20" />
              <stop offset="60%" stopColor="#22252a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#faf9f5" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="mistGradient3" cx="15%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#434853" />
              <stop offset="100%" stopColor="#faf9f5" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Top Right: Architectural Lighthouse Motif */}
      <div className="absolute top-0 right-0 w-[45%] md:w-[32%] h-[600px] pointer-events-none select-none z-0 overflow-hidden opacity-5 md:opacity-[0.14] transition-opacity duration-700">
        <svg 
          className="w-full h-full text-neutral-800" 
          viewBox="0 0 400 800" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.25"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Lighthouse Base Cliff */}
          <path d="M220 780 L400 780 C400 680, 360 620, 310 600 L270 600 Z" fill="none" strokeWidth="1" />
          
          {/* Tower Body */}
          <line x1="280" y1="600" x2="310" y2="350" />
          <line x1="330" y1="600" x2="328" y2="350" strokeDasharray="3 3" />
          <line x1="340" y1="600" x2="334" y2="350" />

          {/* Windows / Slits in tower body */}
          <rect x="306" y="520" width="4" height="15" rx="2" fill="currentColor" stroke="none" />
          <rect x="313" y="440" width="3.5" height="12" rx="1.5" fill="currentColor" stroke="none" />

          {/* Gallery Deck */}
          <rect x="290" y="335" width="60" height="8" rx="1" fill="none" />
          {/* Gallery Railings */}
          <path d="M294 335 L294 322 L346 322 L346 335 M307 335 L307 322 M320 335 L320 322 M333 335 L333 322" />

          {/* Lantern Room Glass Frame */}
          <rect x="302" y="278" width="36" height="44" rx="2" fill="none" />
          <line x1="311" y1="278" x2="311" y2="322" />
          <line x1="320" y1="278" x2="320" y2="322" />
          <line x1="329" y1="278" x2="329" y2="322" />

          {/* Lighthouse Dome Cap */}
          <path d="M302 278 C302 250, 338 250, 338 278 Z" fill="none" />
          {/* Small ventilator sphere and lightning tip */}
          <circle cx="320" cy="246" r="3" fill="currentColor" stroke="none" />
          <line x1="320" y1="243" x2="320" y2="230" />

          {/* Beacon Glow effect */}
          <circle cx="320" cy="300" r="14" fill="#F97316" opacity="0.15" className="animate-pulse" stroke="none" />
          <circle cx="320" cy="300" r="4" fill="#FBBF24" opacity="0.4" stroke="none" />
        </svg>
      </div>

      {/* Floating Pill Nav Bar */}
      <Header 
        onOpenGuides={() => { setShowGuides(true); setShowSupport(false); }} 
        onOpenSupport={() => { setShowSupport(true); setShowGuides(false); }} 
      />

      {/* 
        MAIN CONTENT CONTAINER
        Desktop and mobile grid orchestration 
      */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-32 pb-16 z-10 w-full max-w-6xl mx-auto">
        
        {/* Main Display Headlines */}
        <div className="text-center max-w-4xl mb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-4xl md:text-[76px] leading-[1.08] font-display font-bold tracking-tight text-neutral-900 select-none">
              Reimagine How <br className="hidden md:inline" /> 
              You Interact With <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-red-500">
                Bitcoin
              </span>
            </h1>
          </motion.div>
        </div>

        {/* 
          Phone Mockup Showcase (Interactive conversion playground)
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm mb-12 relative"
        >
          <PhoneMockup />
        </motion.div>

        {/* Lower Meta Description text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center max-w-lg px-4 space-y-7"
        >
          <p className="text-[#575654] text-sm md:text-base font-medium leading-relaxed max-w-md mx-auto">
            From transactions to dapps — explore every corner of the Bitcoin universe with ease.
          </p>

          {/* 
            CTA BUTTON: DOWNLOAD NOW 
            Pulsating red-orange luxury CTA button
          */}
          <div className="flex flex-col items-center space-y-5">
            <motion.a
              href="https://wallet.unisat.io/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center space-x-2.5 bg-[#FF3B30] hover:bg-[#FF453A] text-white px-7 py-3.5 rounded-2xl shadow-lg shadow-red-500/15 text-sm font-semibold tracking-wide transition-all cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-100"
            >
              <svg 
                className="w-4 h-4 text-white" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="8 12 12 16 16 12"></polyline>
                <line x1="12" y1="8" x2="12" y2="16"></line>
              </svg>
              <span>Download for free</span>
            </motion.a>

            {/* 
              Multiplatform compatibility group
              Chrome, Safari, Firefox icons built with pure CSS and beautiful SVG markup to match original.
            */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center -space-x-1.5 bg-white/50 backdrop-blur-sm p-1 rounded-full border border-neutral-200/50">
                {/* Safari style card logo */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 via-blue-500 to-sky-400 p-0.5 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                </div>
                
                {/* Chrome style logo */}
                <div className="w-7 h-7 rounded-full bg-slate-100 p-0.5 flex items-center justify-center shadow-sm border border-neutral-200/30">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#ECEFF1" />
                    <circle cx="12" cy="12" r="4" fill="#1565C0" />
                    {/* Visual green red and yellow segments */}
                    <path d="M12 2A10 10 0 0 0 3.2 7h6.3a4 4 0 0 1 2.5-3z" fill="#E53935" />
                    <path d="M21.2 9.5a10 10 0 0 0-9.2-7.5v4a4 4 0 0 1 3.5 3.5z" fill="#FFCA28" />
                    <path d="M3.2 7a10 10 0 0 0 8.8 15v-4a4 4 0 0 1-2.5-4.7z" fill="#4CAF50" />
                  </svg>
                </div>

                {/* Firefox style logo */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-red-600 p-0.5 flex items-center justify-center shadow-sm">
                  <svg className="w-4 h-4 text-[#FFEB3B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" stroke="none" fill="currentColor" opacity="0.1" />
                    <path d="M12 2 C16 4, 21 8, 20 14 C19 18, 14 22, 10 22 C6 22, 2 18, 2 13 C2 8, 8 2, 12 2 Z" />
                    <circle cx="12" cy="12" r="4" fill="#0D47A1" />
                  </svg>
                </div>
              </div>
              <span className="text-[11px] text-neutral-400 font-medium tracking-wide">
                Also available in browsers
              </span>
            </div>
          </div>
        </motion.div>

      </main>

      {/* Mini Legal or Attribution Footer */}
      <footer className="w-full text-center py-6 border-t border-neutral-200/40 text-[10px] text-neutral-400 font-mono tracking-wider bg-white/40">
        <p>© 2026 Bitcoin Interaction Portal. Evaluation mockup.</p>
      </footer>

      {/* Slide-out Guides or Support Overlay panels */}
      <OverlayPanels 
        showGuides={showGuides} 
        showSupport={showSupport} 
        onCloseGuides={() => setShowGuides(false)} 
        onCloseSupport={() => setShowSupport(false)} 
      />

    </div>
  );
}
