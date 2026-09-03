import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const HesitatingWalker: React.FC = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Static reduced motion fallback: boy standing proudly at the college door
  if (prefersReducedMotion) {
    return (
      <div className="w-full max-w-2xl mx-auto my-4 px-4 flex justify-center">
        <div className="relative w-full h-[170px] md:h-[240px] bg-[#FFFDF9] border-3 border-[#1B1B2F] rounded-3xl shadow-[5px_5px_0px_#1B1B2F] overflow-hidden flex items-center justify-between px-8 md:px-16">
          {/* Ground Line */}
          <div className="absolute bottom-5 left-6 right-6 h-[2px] border-t-2 border-dashed border-[#1B1B2F]/30" />

          {/* Student at College Door */}
          <div className="relative flex items-center justify-end w-full gap-4 pr-4">
            {/* Boy Character */}
            <svg width="70" height="120" viewBox="0 0 70 120" fill="none">
              {/* Backpack */}
              <rect x="6" y="35" width="20" height="35" rx="5" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="3" />
              {/* Head */}
              <circle cx="38" cy="22" r="16" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <path d="M24 20 C 26 8, 48 8, 52 20 C 47 16, 29 16, 24 20 Z" fill="#1B1B2F" />
              <circle cx="44" cy="21" r="2" fill="#1B1B2F" />
              <path d="M41 27 Q44 30 47 27" stroke="#1B1B2F" strokeWidth="2" strokeLinecap="round" />
              {/* Torso (Pink) */}
              <rect x="26" y="38" width="24" height="35" rx="5" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="3" />
              {/* Shorts (Blue) */}
              <rect x="26" y="73" width="24" height="16" rx="3" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="3" />
              {/* Legs */}
              <line x1="32" y1="89" x2="32" y2="114" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="44" y1="89" x2="44" y2="114" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" />
            </svg>

            {/* College Building */}
            <svg width="110" height="140" viewBox="0 0 110 140" fill="none">
              <rect x="10" y="45" width="90" height="90" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <polygon points="4,45 55,10 106,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
              <line x1="55" y1="10" x2="55" y2="-4" stroke="#1B1B2F" strokeWidth="2.5" />
              <polygon points="55,-4 70,2 55,8" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />
              <circle cx="55" cy="65" r="11" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="40" y="88" width="30" height="47" fill="#1B1B2F" rx="3" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-4 px-4 select-none">
      {/* Outer Hero Frame */}
      <div className="relative w-full h-[170px] md:h-[240px] bg-[#FFFDF9] border-3 border-[#1B1B2F] rounded-3xl shadow-[6px_6px_0px_#1B1B2F] overflow-hidden flex items-center justify-between px-4 md:px-8">

        {/* Dashed Ground Path Line */}
        <div className="absolute bottom-5 left-6 right-6 h-[2px] border-t-2 border-dashed border-[#1B1B2F]/30 z-0" />

        {/* 1. Bed Scene (Left Side) */}
        <motion.div
          animate={{
            opacity: [1, 1, 0, 0, 0, 1],
            scale: [1, 1, 0.85, 0.85, 0.85, 1],
          }}
          transition={{
            duration: 8.5,
            repeat: Infinity,
            times: [0, 0.22, 0.28, 0.9, 0.95, 1],
            ease: 'easeInOut',
          }}
          className="absolute left-4 md:left-8 bottom-6 z-1 flex flex-col items-center"
        >
          {/* Zzz Sleeping Bubble */}
          <motion.div
            animate={{
              y: [0, -12, -22],
              opacity: [0, 1, 0],
              scale: [0.8, 1.1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="px-2 py-0.5 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-[11px] font-extrabold text-[#1B1B2F] shadow-[1.5px_1.5px_0px_#1B1B2F] mb-1"
          >
            Zzz... 🛌
          </motion.div>

          {/* Bed Vector SVG */}
          <svg width="90" height="65" viewBox="0 0 90 65" fill="none" className="w-[70px] md:w-[95px] h-[50px] md:h-[70px]">
            {/* Headboard */}
            <rect x="4" y="10" width="10" height="50" rx="3" fill="#1B1B2F" />
            {/* Footboard */}
            <rect x="80" y="28" width="6" height="32" rx="2" fill="#1B1B2F" />
            {/* Bed Frame Base */}
            <rect x="12" y="38" width="70" height="18" rx="2" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
            {/* Pillow */}
            <rect x="16" y="26" width="22" height="14" rx="4" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2" />
            {/* Lying Boy Head */}
            <circle cx="27" cy="30" r="7" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="1.5" />
            <path d="M22 28 Q27 25 32 28" fill="#1B1B2F" />
            {/* Blanket (Bubblegum Pink #FF3E9D) */}
            <rect x="36" y="32" width="46" height="24" rx="4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />
          </svg>
        </motion.div>

        {/* 2. Character Traversal (Walks Left to Right across full frame) */}
        <div className="relative w-full h-full flex items-end pb-5 z-2 pointer-events-none">
          <motion.div
            animate={{
              // Sequence: Lying/Stand beside bed -> Walk across -> Stop at College door -> Reset
              x: ['0%', '0%', '0%', '76%', '76%', '0%'],
              opacity: [0, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 8.5,
              repeat: Infinity,
              times: [0, 0.05, 0.22, 0.72, 0.92, 1],
              ease: 'easeInOut',
            }}
            className="absolute left-6 md:left-12 flex flex-col items-center"
          >
            {/* Boy Character Vector SVG (Scaled up to ~120px-135px height) */}
            <motion.div
              animate={{
                y: [0, -5, 0, -5, 0],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <svg width="70" height="125" viewBox="0 0 70 125" fill="none" className="w-[55px] md:w-[75px] h-[95px] md:h-[130px]">
                {/* Backpack (Zest Yellow #FFD23F) */}
                <rect x="6" y="35" width="20" height="35" rx="5" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="3" />

                {/* Head */}
                <circle cx="38" cy="22" r="16" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />

                {/* Hair */}
                <path d="M24 20 C 26 8, 48 8, 52 20 C 47 16, 29 16, 24 20 Z" fill="#1B1B2F" />

                {/* Face Features */}
                <circle cx="44" cy="21" r="2" fill="#1B1B2F" />
                <path d="M41 27 Q44 30 47 27" stroke="#1B1B2F" strokeWidth="2" strokeLinecap="round" />

                {/* Torso (Bubblegum Pink #FF3E9D) */}
                <rect x="26" y="38" width="24" height="35" rx="5" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="3" />

                {/* Shorts (Sky Blue #3EC1FF) */}
                <rect x="26" y="73" width="24" height="16" rx="3" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="3" />

                {/* Walking Animated Leg 1 */}
                <motion.line
                  x1="31"
                  y1="89"
                  x2="22"
                  y2="116"
                  stroke="#1B1B2F"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  animate={{ x2: [22, 40, 22], y2: [116, 112, 116] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Walking Animated Leg 2 */}
                <motion.line
                  x1="45"
                  y1="89"
                  x2="54"
                  y2="116"
                  stroke="#1B1B2F"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  animate={{ x2: [54, 30, 54], y2: [112, 116, 112] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Swinging Arm */}
                <motion.path
                  d="M 38 42 L 50 58"
                  stroke="#1B1B2F"
                  strokeWidth="4"
                  strokeLinecap="round"
                  animate={{ d: ['M 38 42 L 50 58', 'M 38 42 L 26 58', 'M 38 42 L 50 58'] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* 3. College Building (Right Side - Boy ends directly next to front door) */}
        <div className="absolute right-3 md:right-6 bottom-4 z-1 flex flex-col items-center">
          <svg width="120" height="150" viewBox="0 0 120 150" fill="none" className="w-[85px] md:w-[125px] h-[110px] md:h-[155px]">
            {/* Main Building Wall */}
            <rect x="10" y="45" width="100" height="95" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />

            {/* School Roof (Grass Green #3DDC84) */}
            <polygon points="4,45 60,10 116,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />

            {/* Flag & Pole */}
            <line x1="60" y1="10" x2="60" y2="-4" stroke="#1B1B2F" strokeWidth="2.5" />
            <polygon points="60,-4 76,2 60,8" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />

            {/* Clock Tower Window */}
            <circle cx="60" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
            <line x1="60" y1="65" x2="60" y2="58" stroke="#1B1B2F" strokeWidth="2" />
            <line x1="60" y1="65" x2="65" y2="65" stroke="#1B1B2F" strokeWidth="2" />

            {/* Front Door Entrance */}
            <motion.rect
              x="43"
              y="92"
              width="34"
              height="48"
              fill="#1B1B2F"
              rx="4"
              animate={{
                fill: ['#1B1B2F', '#1B1B2F', '#3DDC84', '#1B1B2F'],
              }}
              transition={{
                duration: 8.5,
                repeat: Infinity,
                times: [0, 0.7, 0.8, 0.95],
              }}
            />

            {/* Door Handle */}
            <circle cx="70" cy="116" r="2" fill="#FFD23F" />
          </svg>
          <span className="text-xs md:text-sm font-extrabold text-[#1B1B2F] uppercase tracking-wider -mt-1">
            College 🏫
          </span>
        </div>

      </div>
    </div>
  );
};
