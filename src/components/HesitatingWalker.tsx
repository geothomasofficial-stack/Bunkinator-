import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const HesitatingWalker: React.FC = () => {
  const [thoughtState, setThoughtState] = useState<'go' | 'sleep'>('go');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Thought bubble crossfade interval (runs independently every 3.5 seconds)
    const interval = setInterval(() => {
      setThoughtState((prev) => (prev === 'go' ? 'sleep' : 'go'));
    }, 3500);

    return () => {
      clearInterval(interval);
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  if (prefersReducedMotion) {
    // Reduced motion static view
    return (
      <div className="w-full max-w-2xl mx-auto my-3 px-4 flex justify-center">
        <div className="relative w-full h-[100px] md:h-[150px] bg-[#FFFDF9] border-2 border-[#1B1B2F] rounded-2xl shadow-[3px_3px_0px_#1B1B2F] overflow-hidden flex items-center justify-between px-6 md:px-12">
          {/* Static Student */}
          <div className="flex items-center gap-3">
            <svg width="60" height="90" viewBox="0 0 60 90" fill="none">
              {/* Backpack */}
              <rect x="8" y="28" width="16" height="24" rx="4" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              {/* Head */}
              <circle cx="28" cy="18" r="12" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
              {/* Hair */}
              <path d="M18 16 Q28 6 38 16" stroke="#1B1B2F" strokeWidth="3" fill="#1B1B2F" />
              {/* Torso (Pink Shirt) */}
              <rect x="20" y="30" width="16" height="26" rx="4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />
              {/* Shorts (Blue) */}
              <rect x="20" y="56" width="16" height="12" rx="2" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="2.5" />
              {/* Static Legs */}
              <line x1="23" y1="68" x2="19" y2="84" stroke="#1B1B2F" strokeWidth="3" strokeLinecap="round" />
              <line x1="33" y1="68" x2="37" y2="84" stroke="#1B1B2F" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="px-3 py-1.5 bg-white border-2 border-[#1B1B2F] rounded-xl text-xs font-bold flex items-center gap-2 shadow-[2px_2px_0px_#1B1B2F]">
              <span>Go 🎒</span>
              <span className="text-gray-400">vs</span>
              <span>Sleep 🛌</span>
            </div>
          </div>

          {/* Static School */}
          <svg width="70" height="80" viewBox="0 0 70 80" fill="none">
            <rect x="10" y="25" width="50" height="50" rx="4" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
            <polygon points="5,25 35,5 65,25" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="2.5" />
            <rect x="26" y="50" width="18" height="25" fill="#1B1B2F" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-3 px-4 select-none">
      <div className="relative w-full h-[120px] md:h-[160px] bg-[#FFFDF9] border-3 border-[#1B1B2F] rounded-2xl shadow-[4px_4px_0px_#1B1B2F] overflow-hidden flex items-center justify-between px-4 md:px-10">

        {/* Path / Ground Line */}
        <div className="absolute bottom-4 left-6 right-6 h-[2px] bg-[#1B1B2F]/20 border-t-2 border-dashed border-[#1B1B2F]/40" />

        {/* Walking & Hesitating Student Area */}
        <div className="relative h-full flex items-center flex-1">
          <motion.div
            animate={{
              // Walk right toward school -> Pause & Glances Back -> Continue walk
              x: ['0%', '42%', '40%', '42%', '85%', '0%'],
              rotate: [0, 0, -8, 0, 0, 0], // Subtle hesitation glance back over shoulder
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.4, 0.5, 0.6, 0.9, 1],
            }}
            className="relative flex flex-col items-center"
          >
            {/* Independent Thought Bubble floating above student */}
            <div className="absolute -top-12 md:-top-14 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none">
              <AnimatePresence mode="wait">
                {thoughtState === 'go' ? (
                  <motion.div
                    key="thought-go"
                    initial={{ opacity: 0, scale: 0.5, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -5 }}
                    transition={{ duration: 0.35 }}
                    className="px-2.5 py-1 bg-white border-2 border-[#1B1B2F] rounded-full text-xs font-bold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Class 🎒</span>
                    <span className="text-[#3DDC84]">✓</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="thought-sleep"
                    initial={{ opacity: 0, scale: 0.5, y: 5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: -5 }}
                    transition={{ duration: 0.35 }}
                    className="px-2.5 py-1 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-xs font-bold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] flex items-center gap-1 whitespace-nowrap"
                  >
                    <span>Bed 🛌</span>
                    <span>zzz</span>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Little thought bubble tail dots */}
              <div className="w-1.5 h-1.5 bg-white border border-[#1B1B2F] rounded-full mx-auto -mt-0.5" />
            </div>

            {/* Boy Character Vector SVG */}
            <motion.div
              animate={{ y: [0, -3, 0, -3, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="50" height="75" viewBox="0 0 50 75" fill="none" className="w-[40px] md:w-[50px] h-[60px] md:h-[75px]">
                {/* Backpack (Yellow #FFD23F) */}
                <rect x="4" y="22" width="14" height="22" rx="4" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />

                {/* Head */}
                <circle cx="26" cy="14" r="10" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />

                {/* Hair */}
                <path d="M17 13 C 18 5, 33 5, 35 13 C 32 11, 20 11, 17 13 Z" fill="#1B1B2F" />

                {/* Face Features (Eye & Smile) */}
                <circle cx="30" cy="13" r="1.5" fill="#1B1B2F" />
                <path d="M28 17 Q30 19 32 17" stroke="#1B1B2F" strokeWidth="1.5" strokeLinecap="round" />

                {/* Torso (Bubblegum Pink #FF3E9D) */}
                <rect x="18" y="24" width="16" height="22" rx="4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />

                {/* Shorts (Sky Blue #3EC1FF) */}
                <rect x="18" y="46" width="16" height="10" rx="2" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="2.5" />

                {/* Walking Animated Legs */}
                <motion.line
                  x1="21"
                  y1="56"
                  x2="15"
                  y2="70"
                  stroke="#1B1B2F"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ x2: [15, 27, 15], y2: [70, 68, 70] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.line
                  x1="31"
                  y1="56"
                  x2="37"
                  y2="70"
                  stroke="#1B1B2F"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  animate={{ x2: [37, 23, 37], y2: [68, 70, 68] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Swinging Arm */}
                <motion.path
                  d="M 26 28 L 34 38"
                  stroke="#1B1B2F"
                  strokeWidth="3"
                  strokeLinecap="round"
                  animate={{ d: ['M 26 28 L 34 38', 'M 26 28 L 18 38', 'M 26 28 L 34 38'] }}
                  transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* School Building Vector SVG on the right */}
        <div className="relative flex flex-col items-center pl-2">
          <svg width="65" height="85" viewBox="0 0 65 85" fill="none" className="w-[50px] md:w-[65px] h-[65px] md:h-[85px]">
            {/* Base Wall */}
            <rect x="6" y="28" width="53" height="52" rx="4" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />

            {/* School Roof (Grass Green #3DDC84) */}
            <polygon points="2,28 32.5,6 63,28" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="2.5" />

            {/* Flag Pole & Flag */}
            <line x1="32.5" y1="6" x2="32.5" y2="-4" stroke="#1B1B2F" strokeWidth="2" />
            <polygon points="32.5,-4 42,0 32.5,4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="1.5" />

            {/* Clock Tower Window */}
            <circle cx="32.5" cy="42" r="7" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2" />
            <line x1="32.5" y1="42" x2="32.5" y2="38" stroke="#1B1B2F" strokeWidth="1.5" />
            <line x1="32.5" y1="42" x2="35.5" y2="42" stroke="#1B1B2F" strokeWidth="1.5" />

            {/* School Door Entrance */}
            <rect x="23" y="55" width="19" height="25" fill="#1B1B2F" rx="2" />

            {/* Door Handle */}
            <circle cx="38" cy="68" r="1" fill="#FFD23F" />
          </svg>
          <span className="text-[10px] md:text-xs font-bold text-[#1B1B2F] uppercase tracking-wide -mt-1">
            College 🏫
          </span>
        </div>
      </div>
    </div>
  );
};
