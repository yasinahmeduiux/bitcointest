import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowDownUp, 
  ArrowLeft, 
  Wifi, 
  Battery, 
  Signal, 
  Loader2, 
  CheckCircle, 
  Copy, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Asset, SwapState } from '../types';

export default function PhoneMockup() {
  // Core State
  const [isBtcOnTop, setIsBtcOnTop] = useState(true);
  const [activeInput, setActiveInput] = useState<'source' | 'dest'>('source');
  const [btcValue, setBtcValue] = useState('0.01');
  const [rsicValue, setRsicValue] = useState('312,607.00');
  const [swapStatus, setSwapStatus] = useState<'input' | 'processing' | 'success'>('input');
  const [simulatedTime, setSimulatedTime] = useState('9:41');
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Conversion rate: 1 BTC = 31,260,700 RSIC
  const conversionRate = 31260700;

  // Track simulated iPhone time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      // Format 12h
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setSimulatedTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sync calculations
  const calculateConversion = (val: string, inputType: 'btc' | 'rsic') => {
    // Strip commas for parsing
    const cleanVal = val.replace(/,/g, '');
    if (!cleanVal || isNaN(Number(cleanVal))) {
      return '';
    }

    const numeric = Number(cleanVal);
    if (inputType === 'btc') {
      const calculatedRsic = numeric * conversionRate;
      // Format with standard commas and decimals for RSIC
      return calculatedRsic.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      const calculatedBtc = numeric / conversionRate;
      // Keep up to 8 decimal places for BTC, stripping trailing zeros
      return Number(calculatedBtc.toFixed(8)).toString();
    }
  };

  // Handle number click on simulated pad
  const handleInputDigit = (digit: string) => {
    // Determine which field is actively targeted for input
    const isBtcActive = (isBtcOnTop && activeInput === 'source') || (!isBtcOnTop && activeInput === 'dest');
    const currentValue = isBtcActive ? btcValue : rsicValue.replace(/,/g, '');

    let newValue = currentValue;

    if (digit === '⌫') {
      newValue = currentValue.slice(0, -1);
      if (newValue === '' || newValue === '-') newValue = '0';
    } else if (digit === '.') {
      if (!currentValue.includes('.')) {
        newValue = currentValue + '.';
      }
    } else {
      // Avoid leading consecutive zeros
      if (currentValue === '0' && digit !== '0') {
        newValue = digit;
      } else if (currentValue === '0' && digit === '0') {
        newValue = '0';
      } else {
        newValue = currentValue + digit;
      }
    }

    // Limit length to avoid layout breaking
    if (newValue.length > 14) return;

    if (isBtcActive) {
      setBtcValue(newValue);
      const converted = calculateConversion(newValue, 'btc');
      setRsicValue(converted || '0.00');
    } else {
      // Validate number of decimals for RSIC
      const parts = newValue.split('.');
      if (parts[1] && parts[1].length > 2) return;

      // Local change
      const rawRsic = newValue;
      setRsicValue(Number(rawRsic).toLocaleString('en-US', {
        minimumFractionDigits: parts.length > 1 ? parts[1].length : 0,
        maximumFractionDigits: 2
      }));
      const converted = calculateConversion(rawRsic, 'rsic');
      setBtcValue(converted || '0');
    }
  };

  // Keyboard support for desktop interactions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (swapStatus !== 'input') return;
      const key = e.key;
      
      if (key >= '0' && key <= '9') {
        handleInputDigit(key);
      } else if (key === '.') {
        handleInputDigit('.');
      } else if (key === 'Backspace') {
        handleInputDigit('⌫');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [btcValue, rsicValue, isBtcOnTop, activeInput, swapStatus]);

  // Flip assets
  const handleFlipAssets = () => {
    setIsBtcOnTop(!isBtcOnTop);
    // Switch active state nicely
    setActiveInput(activeInput === 'source' ? 'dest' : 'source');
  };

  // Trigger swap simulation
  const handleSwapTrigger = () => {
    if (Number(btcValue) <= 0 || Number(rsicValue.replace(/,/g, '')) <= 0) return;
    setSwapStatus('processing');
    
    // Simulate transaction delay
    setTimeout(() => {
      setSwapStatus('success');
    }, 1800);
  };

  const resetSwap = () => {
    setBtcValue('0.01');
    setRsicValue('312,607.00');
    setIsBtcOnTop(true);
    setActiveInput('source');
    setSwapStatus('input');
    setCopied(false);
  };

  const copyTxId = () => {
    navigator.clipboard.writeText('0x6ee2d8bcf7fb45a4b73b221088ffbd71a');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 
        Background glows exactly matching the image 
        Generates a subtle, luxurious crimson/orange volumetric radial glow directly supporting the phone stage.
      */}
      <div className="absolute -inset-10 md:-inset-20 bg-gradient-to-tr from-orange-400/10 via-red-500/10 to-transparent rounded-full blur-3xl opacity-80 pointer-events-none select-none z-0" />
      
      {/* 
        The Phone Container (Precision simulated viewport frame) 
        Styled with luxury matte glass beveled edges and physical buttons
      */}
      <div className="relative w-[345px] h-[700px] bg-neutral-950 rounded-[54px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border-[1px] border-neutral-800/80 z-10 flex flex-col overflow-hidden">
        
        {/* Physical Button Details - Left (volume up, volume down, mute) */}
        <div className="absolute top-28 -left-1 w-[3px] h-10 bg-neutral-800 rounded-r" />
        <div className="absolute top-44 -left-1 w-[3px] h-14 bg-neutral-800 rounded-r" />
        <div className="absolute top-62 -left-1 w-[3px] h-14 bg-neutral-800 rounded-r" />
        {/* Physical Button Details - Right (power) */}
        <div className="absolute top-36 -right-1 w-[3px] h-20 bg-neutral-800 rounded-l" />

        {/* Screen Outer Bezel Cover */}
        <div className="w-full h-full bg-[#FFFFFF] rounded-[42px] relative flex flex-col justify-between overflow-hidden border border-neutral-200 select-none">
          
          {/* Header Status Bar area */}
          <div className="w-full h-11 flex justify-between items-center px-7 pt-1 z-30 select-none text-black relative font-medium">
            <span className="text-xs font-semibold tracking-tight">{simulatedTime}</span>

            {/* Simulated iPhone Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-[50%] top-2 w-[90px] h-[25px] bg-[#000000] rounded-full flex items-center justify-end px-3">
              <span className="w-2.5 h-2.5 bg-neutral-900 rounded-full border border-neutral-800" />
            </div>

            <div className="flex items-center space-x-1.5 text-black">
              <Signal className="w-3.5 h-3.5" strokeWidth={2.5} />
              <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
              <div className="flex items-center">
                <Battery className="w-5 h-5 -mr-1" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Interactive Screen Viewport */}
          <div className="flex-1 flex flex-col justify-between relative px-5 pb-4">
            
            <AnimatePresence mode="wait">
              {swapStatus === 'input' && (
                <motion.div 
                  key="swap-box"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-between"
                >
                  {/* Local Simulated App Header */}
                  <div className="flex items-center space-x-3 py-[2px] mt-1">
                    <button className="p-1 text-neutral-500 hover:text-neutral-900 transition-colors" disabled>
                      <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={2.5} />
                    </button>
                    <h2 className="text-xl font-bold font-display text-neutral-900">Swap</h2>
                  </div>

                  {/* Dual Swap Cards */}
                  <div className="my-auto flex flex-col relative space-y-1">
                    
                    {/* Source Asset Card */}
                    <div 
                      onClick={() => setActiveInput('source')}
                      className={`relative p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer border ${
                        activeInput === 'source' 
                          ? 'bg-[#F2F5FE] border-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/10' 
                          : 'bg-[#F7F7F7] border-neutral-200/60 hover:bg-neutral-50'
                      }`}
                    >
                      {isBtcOnTop ? (
                        /* Bitcoin logo and info */
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-[#F7931A] flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-lg leading-none">₿</span>
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 text-sm">Bitcoin</div>
                            <div className="text-[10px] text-neutral-500 font-mono font-medium">$BTC</div>
                          </div>
                        </div>
                      ) : (
                        /* Runecoin logo and info */
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center shadow-sm border border-neutral-700">
                            {/* Runecoin custom runic vector */}
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="6" x2="12" y2="18" />
                              <line x1="6" y1="12" x2="18" y2="12" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 text-sm">Runecoin</div>
                            <div className="text-[10px] text-neutral-500 font-mono font-medium">$RSIC</div>
                          </div>
                        </div>
                      )}

                      <div className="text-right flex items-center justify-end">
                        <span className="text-lg font-bold text-neutral-900 font-mono tracking-tight mr-0.5">
                          {isBtcOnTop ? btcValue : rsicValue}
                        </span>
                        {activeInput === 'source' && (
                          <span className="w-[1.5px] h-5 bg-blue-500 animate-cursor inline-block" />
                        )}
                      </div>
                    </div>

                    {/* Swap Reversing Divider in center */}
                    <div className="relative flex justify-center h-2 z-10">
                      <motion.button 
                        onClick={handleFlipAssets}
                        whileHover={{ scale: 1.15, rotate: 180 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md border border-neutral-200/80 flex items-center justify-center text-neutral-700 hover:text-black cursor-pointer bg-white"
                      >
                        <ArrowDownUp className="w-3.5 h-3.5" strokeWidth={2.5} />
                      </motion.button>
                    </div>

                    {/* Destination Asset Card */}
                    <div 
                      onClick={() => setActiveInput('dest')}
                      className={`relative p-3.5 rounded-2xl flex items-center justify-between transition-all cursor-pointer border ${
                        activeInput === 'dest' 
                          ? 'bg-[#F2F5FE] border-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/10' 
                          : 'bg-[#F7F7F7] border-neutral-200/60 hover:bg-neutral-50'
                      }`}
                    >
                      {!isBtcOnTop ? (
                        /* Bitcoin logo and info */
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-[#F7931A] flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-lg leading-none">₿</span>
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 text-sm">Bitcoin</div>
                            <div className="text-[10px] text-neutral-500 font-mono font-medium">$BTC</div>
                          </div>
                        </div>
                      ) : (
                        /* Runecoin logo and info */
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center shadow-sm border border-neutral-700">
                            {/* Runecoin custom runic vector */}
                            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="12" y1="6" x2="12" y2="18" />
                              <line x1="6" y1="12" x2="18" y2="12" />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 text-sm">Runecoin</div>
                            <div className="text-[10px] text-neutral-500 font-mono font-medium">$RSIC</div>
                          </div>
                        </div>
                      )}

                      <div className="text-right flex items-center justify-end">
                        <span className="text-lg font-bold text-neutral-900 font-mono tracking-tight mr-0.5">
                          {!isBtcOnTop ? btcValue : rsicValue}
                        </span>
                        {activeInput === 'dest' && (
                          <span className="w-[1.5px] h-5 bg-blue-500 animate-cursor inline-block" />
                        )}
                      </div>
                    </div>

                  </div>

                  {/* The Simulated Keypad Grid layout */}
                  <div className="grid grid-cols-3 gap-y-3.5 gap-x-2 text-center text-neutral-800 font-display font-medium text-lg my-3 select-none">
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'].map((key) => (
                      <motion.button
                        key={key}
                        onMouseDown={() => setActiveButton(key)}
                        onMouseUp={() => setActiveButton(null)}
                        onMouseLeave={() => setActiveButton(null)}
                        onClick={() => handleInputDigit(key)}
                        whileTap={{ scale: 0.9 }}
                        className={`py-2 rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
                          activeButton === key ? 'bg-neutral-100 font-bold' : 'hover:bg-neutral-50/70'
                        }`}
                      >
                        {key === '⌫' ? (
                          <span className="text-neutral-500">
                            {/* Arrow character identical to screenshot keypad */}
                            ←
                          </span>
                        ) : (
                          <span>{key}</span>
                        )}
                      </motion.button>
                    ))}
                  </div>

                  {/* Core Action triggers */}
                  <button
                    onClick={handleSwapTrigger}
                    disabled={Number(btcValue) === 0}
                    className={`block w-full py-3.5 rounded-2xl text-center text-sm font-semibold transition-all cursor-pointer ${
                      Number(btcValue) > 0 
                        ? 'bg-[#1C1C1E] text-white hover:bg-[#2C2C2E]' 
                        : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    Swap
                  </button>
                </motion.div>
              )}

              {swapStatus === 'processing' && (
                <motion.div 
                  key="processing-box"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="relative w-20 h-20 flex items-center justify-center bg-blue-50 rounded-full shadow-lg border border-blue-100/50 mb-6">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 font-display">Executing Swap</h3>
                  <div className="text-xs text-neutral-500 max-w-[220px] mt-2 font-medium">
                    Routing your order through secure Bitcoin liquidity pools. Please keep the app open.
                  </div>
                  <div className="mt-8 flex flex-col space-y-2 w-full px-4 text-left font-mono text-[10px] bg-neutral-50 p-4 rounded-xl border border-neutral-100/60">
                    <div className="flex justify-between text-neutral-400">
                      <span>Source:</span>
                      <span className="text-neutral-800 font-semibold">{isBtcOnTop ? `${btcValue} BTC` : `${rsicValue} RSIC`}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Destination:</span>
                      <span className="text-neutral-800 font-semibold">{!isBtcOnTop ? `${btcValue} BTC` : `${rsicValue} RSIC`}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Status:</span>
                      <span className="text-blue-500 animate-pulse font-semibold">Broadcasting TX...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {swapStatus === 'success' && (
                <motion.div 
                  key="success-box"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col justify-between py-2 text-center"
                >
                  <div className="py-4">
                    <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 border border-emerald-100">
                      <motion.div
                        initial={{ scale: 0.5, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, type: 'spring', damping: 10 }}
                      >
                        <CheckCircle className="w-9 h-9" />
                      </motion.div>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 font-display">Swap Successful</h3>
                    <p className="text-xs text-neutral-500 mt-1">Transaction confirmed successfully!</p>

                    <div className="mt-6 bg-neutral-50 rounded-2xl p-4 border border-neutral-100 flex flex-col space-y-3.5 text-left text-xs font-medium">
                      
                      {/* Asset Flow Details */}
                      <div>
                        <div className="text-[10px] text-neutral-400 font-mono">YOU SENT</div>
                        <div className="text-sm font-bold text-neutral-800 mt-0.5">
                          {isBtcOnTop ? `${btcValue} BTC` : `${rsicValue} RSIC`}
                        </div>
                      </div>

                      <div className="border-t border-neutral-100 pt-3">
                        <div className="text-[10px] text-neutral-400 font-mono">YOU RECEIVED</div>
                        <div className="text-sm font-bold text-neutral-800 mt-0.5">
                          {!isBtcOnTop ? `${btcValue} BTC` : `${rsicValue} RSIC`}
                        </div>
                      </div>

                      {/* Transaction Identifier ID block */}
                      <div className="border-t border-neutral-100 pt-3 flex items-center justify-between">
                        <div>
                          <div className="text-[10px] text-neutral-400 font-mono">TRANSACTION ID</div>
                          <div className="text-[11px] font-mono text-neutral-600 mt-0.5">0x6ee2d8...fbd71a</div>
                        </div>
                        <button 
                          onClick={copyTxId}
                          className="p-1.5 hover:bg-neutral-200/50 rounded-lg text-neutral-500 hover:text-black cursor-pointer transition-colors active:scale-95"
                          title="Copy Transaction ID"
                        >
                          {copied ? (
                            <span className="text-[10px] text-emerald-500 font-bold font-sans">Copied!</span>
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="space-y-2">
                    <a 
                      href="https://mempool.space"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center space-x-1 w-full py-2.5 rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold hover:bg-neutral-50 hover:text-black hover:border-neutral-300 transition-colors"
                    >
                      <span>View on Block Explorer</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    
                    <button
                      onClick={resetSwap}
                      className="w-full py-3.5 rounded-2xl bg-[#1C1C1E] text-white hover:bg-[#2C2C2E] text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* iPhone Home Screen Indicator Bar */}
          <div className="w-full h-5 flex justify-center items-end pb-1.5 select-none z-30">
            <div className="w-[110px] h-1 bg-[#1A1A1A] rounded-full" />
          </div>

        </div>
      </div>
    </div>
  );
}
