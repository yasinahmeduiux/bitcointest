import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, Clock, ShieldCheck, HeartHandshake, HelpCircle, Send, CheckCircle, Info, Bitcoin, Sparkles, ChevronRight, Loader2 } from 'lucide-react';
import { SupportTicket } from '../types';

interface OverlayPanelsProps {
  showGuides: boolean;
  showSupport: boolean;
  onCloseGuides: () => void;
  onCloseSupport: () => void;
}

export default function OverlayPanels({
  showGuides,
  showSupport,
  onCloseGuides,
  onCloseSupport
}: OverlayPanelsProps) {
  
  // Support state
  const [ticket, setTicket] = useState<SupportTicket>({
    email: '',
    category: 'Transaction Swap Support',
    message: '',
    submitted: false
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket.email || !ticket.message) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setTicket(prev => ({ ...prev, submitted: true }));
    }, 1500);
  };

  const resetSupport = () => {
    setTicket({
      email: '',
      category: 'Transaction Swap Support',
      message: '',
      submitted: false
    });
  };

  return (
    <AnimatePresence>
      {/* 
        GUIDES OVERLAY 
        Slides in from the right gracefully using spring physics.
      */}
      {showGuides && (
        <React.Fragment key="guides-root">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onCloseGuides}
            className="fixed inset-0 bg-[#000000] z-50 cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#FAF9F5] shadow-2xl z-50 flex flex-col justify-between border-l border-neutral-200"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200/60 bg-white">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-display text-neutral-900">Guides & Tutorials</h3>
              </div>
              <button 
                onClick={onCloseGuides}
                className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content list */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              
              {/* Introduction Card */}
              <div className="bg-white p-5 rounded-2xl border border-neutral-200/50 shadow-sm">
                <span className="inline-block bg-orange-100 text-orange-850 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono tracking-wider uppercase mb-3">
                  Quick Start
                </span>
                <h4 className="text-base font-bold text-neutral-900 font-display">Interacting with the Simulator</h4>
                <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                  The mobile terminal mockup on screen is a fully functional BTC/RSIC converter. Use the interactive 
                  keypad inside the phone mockup to type conversion values, use the middle arrow button <code className="bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">⇅</code> to swap 
                  assets, or simply type directly on your computer keyboard to live-simulate!
                </p>
              </div>

              {/* Guide 1 */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-widest pl-1">Bitcoin Runes Protocol</h4>
                
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/50 shadow-sm space-y-3.5">
                  <div className="flex items-start space-x-3.5">
                    <div className="p-1.5 bg-neutral-100 rounded-lg text-neutral-800 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-neutral-900">What are Runes ($RSIC)?</h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                        Runes represent a modern, highly efficient protocol for deploying fungible tokens natively on the 
                        Bitcoin blockchain, avoiding the excessive memory overhead of previous experimental formats.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="p-1.5 bg-neutral-100 rounded-lg text-neutral-800 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-neutral-900">UTXO Consolidation</h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                        Swapping between BTC and Runecoin leverages the concept of Unspent Transaction Outputs (UTXO). To maintain low fees, 
                        our router consolidates minor balances automatically before firing transactions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3.5">
                    <div className="p-1.5 bg-neutral-100 rounded-lg text-neutral-800 mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-neutral-900">Securing your Hardware Wallet</h5>
                      <p className="text-[11px] text-neutral-500 leading-relaxed mt-1">
                        Always sign swap authorizations with a physical hardware validator. Keep your backup phrases hidden and entirely 
                        offline inside hard plates.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Guide FAQ Area */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-neutral-400 font-mono uppercase tracking-widest pl-1">Frequently Asked</h4>
                
                <div className="space-y-2.5">
                  <details className="bg-white border border-neutral-200/60 rounded-xl px-4 py-3 group cursor-pointer transition-colors hover:border-neutral-300">
                    <summary className="list-none flex justify-between items-center text-xs font-semibold text-neutral-800 select-none">
                      <span>How much gas are Rune swaps?</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mt-2 pl-1 select-text">
                      Rune swaps are settled directly on L1 Bitcoin or through custom state channels, yielding average transaction fees ranging from 5 to 25 sat/vB depending on memory pool congestion.
                    </p>
                  </details>

                  <details className="bg-white border border-neutral-200/60 rounded-xl px-4 py-3 group cursor-pointer transition-colors hover:border-neutral-300">
                    <summary className="list-none flex justify-between items-center text-xs font-semibold text-neutral-800 select-none">
                      <span>What is $RSIC's initial supply?</span>
                      <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-[11px] text-neutral-500 leading-relaxed mt-2 pl-1 select-text">
                      The RSIC protocol distributes runes via interactive miners standard on-chain, totaling 21 billion absolute tokens.
                    </p>
                  </details>
                </div>
              </div>

            </div>

            {/* Footer informational banner */}
            <div className="p-5 border-t border-neutral-200/60 bg-white text-center">
              <div className="flex items-center justify-center space-x-1 text-[10px] text-neutral-400 uppercase font-mono tracking-wider">
                <Info className="w-3.5 h-3.5" />
                <span>Simulated guides for evaluation</span>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}

      {/* 
        SUPPORT TICKET OVERLAY 
        Slides in with smooth transition to submit interactive cases.
      */}
      {showSupport && (
        <React.Fragment key="support-root">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onCloseSupport}
            className="fixed inset-0 bg-[#000000] z-50 cursor-pointer"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-[#FAF9F5] shadow-2xl z-50 flex flex-col justify-between border-l border-neutral-200"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200/60 bg-white">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="text-lg font-bold font-display text-neutral-900">Resolution Center</h3>
              </div>
              <button 
                onClick={onCloseSupport}
                className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Inner viewport container */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <AnimatePresence mode="wait">
                {!ticket.submitted ? (
                  <motion.form 
                    key="support-form"
                    onSubmit={handleSubmitTicket}
                    className="space-y-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-white p-4 rounded-xl border border-neutral-200/50">
                      <p className="text-xs text-neutral-500 leading-relaxed">
                        Have a question regarding Bitcoin Runecentral transactions? File an absolute resolution request below. Our system is simulated to run full telemetry loops.
                      </p>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Your Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="you@domain.com"
                        value={ticket.email}
                        onChange={(e) => setTicket(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    {/* Category Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Inquiry Topic</label>
                      <select 
                        value={ticket.category}
                        onChange={(e) => setTicket(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option>Transaction Swap Support</option>
                        <option>Bitcoin Rune Protocol Question</option>
                        <option>Partnership & Integration</option>
                        <option>General Feedback</option>
                      </select>
                    </div>

                    {/* Message Box */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Detail Description</label>
                      <textarea 
                        required
                        rows={5}
                        placeholder="Please elaborate on your transaction block or questions..."
                        value={ticket.message}
                        onChange={(e) => setTicket(prev => ({ ...prev, message: e.target.value }))}
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting || !ticket.email || !ticket.message}
                      className={`w-full py-3.5 rounded-xl text-center text-xs font-bold font-sans transition-all flex items-center justify-center space-x-2 cursor-pointer ${
                        submitting || !ticket.email || !ticket.message
                          ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                          : 'bg-[#1C1C1E] text-white hover:bg-black hover:shadow-md'
                      }`}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Dispatching Case...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Resolution Request</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="support-completed"
                    className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 border border-emerald-100 mb-2">
                      <CheckCircle className="w-7 h-7" />
                    </div>
                    <h4 className="text-lg font-bold text-neutral-900 font-display">Ticket Transmitted</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed max-w-[280px]">
                      Your diagnostic support query has been logged. Our simulated specialists will review and reach out to <span className="font-semibold text-neutral-800">{ticket.email}</span> soon.
                    </p>

                    <div className="w-full bg-white border border-neutral-200/60 rounded-2xl p-4 text-left space-y-2 text-[11px] font-mono mt-4">
                      <div className="flex justify-between text-neutral-400">
                        <span>Case Number:</span>
                        <span className="text-neutral-800 font-bold">#RSC-29381</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Topic:</span>
                        <span className="text-neutral-800 font-medium">{ticket.category}</span>
                      </div>
                    </div>

                    <button
                      onClick={resetSupport}
                      className="mt-6 px-5 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                    >
                      File Another Ticket
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer informational banner */}
            <div className="p-5 border-t border-neutral-200/60 bg-white text-center">
              <div className="flex items-center justify-center space-x-1 text-[10px] text-neutral-400 uppercase font-mono tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Simulated resolution portal</span>
              </div>
            </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
