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

  // Static reduced motion fallback: boy standing right next to the college door (No card box)
  if (prefersReducedMotion) {
    return (
      <div className="w-full max-w-2xl mx-auto my-4 px-4 flex justify-center pointer-events-none select-none">
        <div className="relative w-full h-[170px] md:h-[240px] flex items-center justify-between px-6 md:px-12">
          {/* Subtle Ground Line */}
          <div className="absolute bottom-6 left-4 right-4 h-[2px] border-t-2 border-dashed border-[#1B1B2F]/30" />

          {/* Student Standing Right Next to College Door */}
          <div className="relative flex items-end justify-end w-full gap-1 pr-2 pb-6">
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
            <svg width="120" height="150" viewBox="0 0 120 150" fill="none" className="w-[90px] md:w-[125px] h-[115px] md:h-[155px]">
              <rect x="10" y="45" width="100" height="95" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <polygon points="4,45 60,10 116,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
              <line x1="60" y1="10" x2="60" y2="-4" stroke="#1B1B2F" strokeWidth="2.5" />
              <polygon points="60,-4 76,2 60,8" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />
              <circle cx="60" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="43" y="92" width="34" height="48" fill="#1B1B2F" rx="4" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto my-2 px-4 select-none pointer-events-none">
      {/* Container: NO Card Frame, NO border, NO background fill, NO shadow */}
      <div className="relative w-full h-[180px] md:h-[240px] flex items-center justify-between px-2 md:px-6">

        {/* Subtle Dashed Ground Line */}
        <div className="absolute bottom-6 left-4 right-4 h-[2px] border-t-2 border-dashed border-[#1B1B2F]/30 z-0" />

        {/* 1. Bed Scene (Left Side - 4s Bed Phase + 3s Wake & Rise Phase) */}
        <motion.div
          animate={{
            opacity: [1, 1, 1, 0, 0, 0, 1],
            scale: [1, 1, 1, 0.8, 0.8, 0.8, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            times: [0, 0.30, 0.45, 0.54, 0.94, 0.97, 1],
            ease: 'easeInOut',
          }}
          className="absolute left-2 md:left-6 bottom-6 z-1 flex flex-col items-center"
        >
          {/* Zzz Sleeping Bubble in Bed (Phases 1 & 2) */}
          <motion.div
            animate={{
              y: [0, -12, -22],
              opacity: [0, 1, 0],
              scale: [0.8, 1.1, 0.9],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
            className="px-2.5 py-1 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] mb-1"
          >
            Zzz... 🛌
          </motion.div>

          {/* Bed Vector SVG */}
          <svg width="95" height="70" viewBox="0 0 95 70" fill="none" className="w-[75px] md:w-[95px] h-[55px] md:h-[70px]">
            {/* Headboard */}
            <rect x="4" y="10" width="10" height="54" rx="3" fill="#1B1B2F" />
            {/* Footboard */}
            <rect x="84" y="28" width="6" height="36" rx="2" fill="#1B1B2F" />
            {/* Bed Frame Base */}
            <rect x="12" y="40" width="74" height="20" rx="2" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
            {/* Pillow */}
            <rect x="16" y="28" width="24" height="15" rx="4" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2" />
            {/* Lying Boy Head */}
            <circle cx="28" cy="32" r="7.5" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="1.5" />
            <path d="M22 30 Q28 26 34 30" fill="#1B1B2F" />
            {/* Blanket (Bubblegum Pink #FF3E9D) */}
            <rect x="36" y="34" width="48" height="26" rx="4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />
          </svg>
        </motion.div>

        {/* 2. Character Traversal (Boy Walks Left to Right and Ends RIGHT NEXT TO College Door) */}
        <div className="relative w-full h-full flex items-end pb-6 z-2">
          <motion.div
            animate={{
              // Sequence:
              // 0.0s-4.0s (0% - 31%): Lying in bed (opacity 0)
              // 4.0s-7.0s (31% - 54%): Wake & rise beside bed (opacity 1)
              // 7.0s-11.0s (54% - 85%): Walk across full frame right up to college door (x: 0% -> 84%)
              // 11.0s-12.5s (85% - 96%): Arrives standing right next to door (x: 84%)
              // 12.5s-13.0s (96% - 100%): Reset fade back
              x: ['0%', '0%', '0%', '84%', '84%', '0%'],
              opacity: [0, 0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              times: [0, 0.30, 0.38, 0.85, 0.96, 1],
              ease: 'easeInOut',
            }}
            className="absolute left-6 md:left-12 flex flex-col items-center"
          >
            {/* Intermittent Lingering "Zzz..." Bubble during Walk Phase */}
            <motion.div
              animate={{
                opacity: [0, 0, 1, 0, 1, 0, 0],
                y: [0, -4, -12, -4, -12, -4, 0],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                times: [0, 0.55, 0.65, 0.72, 0.80, 0.88, 1],
                ease: 'easeInOut',
              }}
              className="px-2.5 py-1 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] -mb-1 z-10"
            >
              Zzz... 😴
            </motion.div>

            {/* Boy Character Vector SVG (Scaled up ~120px-135px height) */}
            <motion.div
              animate={{
                y: [0, -6, 0, -6, 0],
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

        {/* 3. College Building (Right Side - Boy ends RIGHT BESIDE the entrance door) */}
        <div className="absolute right-1 md:right-4 bottom-5 z-1 flex flex-col items-center">
          <svg width="125" height="155" viewBox="0 0 125 155" fill="none" className="w-[90px] md:w-[130px] h-[115px] md:h-[160px]">
            {/* Main Building Wall */}
            <rect x="10" y="45" width="105" height="98" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />

            {/* School Roof (Grass Green #3DDC84) */}
            <polygon points="4,45 62.5,10 121,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />

            {/* Flag & Pole */}
            <line x1="62.5" y1="10" x2="62.5" y2="-4" stroke="#1B1B2F" strokeWidth="2.5" />
            <polygon points="62.5,-4 78.5,2 62.5,8" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />

            {/* Clock Tower Window */}
            <circle cx="62.5" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
            <line x1="62.5" y1="65" x2="62.5" y2="58" stroke="#1B1B2F" strokeWidth="2" />
            <line x1="62.5" y1="65" x2="67.5" y2="65" stroke="#1B1B2F" strokeWidth="2" />

            {/* Front Door Entrance */}
            <motion.rect
              x="44"
              y="93"
              width="36"
              height="50"
              fill="#1B1B2F"
              rx="4"
              animate={{
                fill: ['#1B1B2F', '#1B1B2F', '#3DDC84', '#1B1B2F'],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                times: [0, 0.84, 0.92, 0.98],
              }}
            />

            {/* Door Handle */}
            <circle cx="72" cy="118" r="2" fill="#FFD23F" />
          </svg>
          <span className="text-xs md:text-sm font-extrabold text-[#1B1B2F] uppercase tracking-wider -mt-1">
            College 🏫
          </span>
        </div>

      </div>
    </div>
  );
};
