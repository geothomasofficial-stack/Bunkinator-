import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { OutcomeType } from '../types/bunkinator';

interface HesitatingWalkerProps {
  outcomeId: OutcomeType | null;
}

export const HesitatingWalker: React.FC<HesitatingWalkerProps> = ({ outcomeId }) => {
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

  // Reduced motion static fallback: Standing at college door
  if (prefersReducedMotion) {
    return (
      <div className="w-full max-w-2xl mx-auto my-2 px-4 flex justify-center pointer-events-none select-none">
        <div className="relative w-full h-[170px] md:h-[240px] flex items-center justify-between px-6 md:px-12">
          <div className="relative flex items-end justify-end w-full gap-1 pr-2 pb-6">
            <svg width="70" height="120" viewBox="0 0 70 120" fill="none">
              <rect x="6" y="35" width="20" height="35" rx="5" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="3" />
              <circle cx="38" cy="22" r="16" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <path d="M24 20 C 26 8, 48 8, 52 20 C 47 16, 29 16, 24 20 Z" fill="#1B1B2F" />
              <circle cx="44" cy="21" r="2" fill="#1B1B2F" />
              <path d="M41 27 Q44 30 47 27" stroke="#1B1B2F" strokeWidth="2" strokeLinecap="round" />
              <rect x="26" y="38" width="24" height="35" rx="5" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="3" />
              <rect x="26" y="73" width="24" height="16" rx="3" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="3" />
              <line x1="32" y1="89" x2="32" y2="114" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="44" y1="89" x2="44" y2="114" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" />
            </svg>

            <svg width="120" height="150" viewBox="0 0 120 150" fill="none" className="w-[90px] md:w-[125px] h-[115px] md:h-[155px]">
              <rect x="10" y="45" width="100" height="95" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <polygon points="4,45 60,10 116,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
              <line x1="60" y1="10" x2="60" y2="-4" stroke="#1B1B2F" strokeWidth="2.5" />
              <polygon points="60,-4 76,2 60,8" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />
              <circle cx="60" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="43" y="92" width="34" height="48" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" rx="4" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER SPECIFIC SCENE ACCORDING TO OUTCOME ---

  // 1. BED IS HEAVEN SCENE (Sleeping in bed, persistent Zzz, college untouched)
  if (outcomeId === 'bed_heaven') {
    return (
      <div className="w-full max-w-2xl mx-auto my-2 px-4 select-none pointer-events-none">
        <div className="relative w-full h-[180px] md:h-[240px] flex items-center justify-between px-2 md:px-6">
          {/* Bed Scene */}
          <div className="absolute left-4 md:left-8 bottom-6 z-2 flex flex-col items-center">
            <motion.div
              animate={{ y: [0, -10, -20], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="px-3 py-1 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] mb-1"
            >
              Bed is Heaven! Zzz... 🛌
            </motion.div>
            <svg width="105" height="75" viewBox="0 0 105 75" fill="none" className="w-[85px] md:w-[110px] h-[60px] md:h-[75px]">
              <rect x="4" y="10" width="10" height="58" rx="3" fill="#1B1B2F" />
              <rect x="92" y="28" width="6" height="40" rx="2" fill="#1B1B2F" />
              <rect x="12" y="42" width="82" height="22" rx="2" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="16" y="28" width="26" height="16" rx="4" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2" />
              <circle cx="29" cy="33" r="8" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="1.5" />
              <path d="M22 31 Q29 27 36 31" fill="#1B1B2F" />
              <rect x="38" y="34" width="54" height="28" rx="4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />
            </svg>
          </div>

          {/* College Building in Background */}
          <div className="absolute right-1 md:right-4 bottom-5 z-1 opacity-70">
            <svg width="125" height="155" viewBox="0 0 125 155" fill="none" className="w-[90px] md:w-[130px] h-[115px] md:h-[160px]">
              <rect x="10" y="45" width="105" height="98" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <polygon points="4,45 62.5,10 121,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
              <circle cx="62.5" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="44" y="93" width="36" height="50" fill="#1B1B2F" rx="4" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // 2. SIT AT HOME & DO ASSIGNMENT SCENE (Student sitting at study desk with laptop & books)
  if (outcomeId === 'sit_home') {
    return (
      <div className="w-full max-w-2xl mx-auto my-2 px-4 select-none pointer-events-none">
        <div className="relative w-full h-[180px] md:h-[240px] flex items-center justify-between px-2 md:px-6">
          {/* Study Desk Scene */}
          <div className="absolute left-6 md:left-12 bottom-5 z-2 flex flex-col items-center">
            <div className="px-3 py-1 bg-[#FFD23F] border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] mb-2 animate-bounce">
              Assignments First! 📚💻
            </div>

            <svg width="130" height="120" viewBox="0 0 130 120" fill="none" className="w-[100px] md:w-[140px] h-[90px] md:h-[125px]">
              {/* Chair */}
              <rect x="25" y="55" width="8" height="45" rx="2" fill="#1B1B2F" />
              <rect x="18" y="70" width="22" height="6" rx="2" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />
              <line x1="20" y1="76" x2="20" y2="115" stroke="#1B1B2F" strokeWidth="3" />
              <line x1="36" y1="76" x2="36" y2="115" stroke="#1B1B2F" strokeWidth="3" />

              {/* Seated Boy */}
              <circle cx="32" cy="40" r="14" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
              <path d="M20 38 C 22 26, 42 26, 44 38 Z" fill="#1B1B2F" />
              <rect x="22" y="52" width="20" height="24" rx="3" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />

              {/* Desk Table */}
              <rect x="50" y="65" width="65" height="10" rx="2" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              <line x1="56" y1="75" x2="56" y2="115" stroke="#1B1B2F" strokeWidth="3" />
              <line x1="108" y1="75" x2="108" y2="115" stroke="#1B1B2F" strokeWidth="3" />

              {/* Laptop on Desk */}
              <rect x="62" y="48" width="22" height="17" rx="2" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="2" />
              <line x1="58" y1="65" x2="88" y2="65" stroke="#1B1B2F" strokeWidth="2.5" />

              {/* Book Stack */}
              <rect x="90" y="55" width="18" height="5" rx="1" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="1.5" />
              <rect x="88" y="60" width="20" height="5" rx="1" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="1.5" />
            </svg>
          </div>

          {/* College Building in Background */}
          <div className="absolute right-1 md:right-4 bottom-5 z-1 opacity-70">
            <svg width="125" height="155" viewBox="0 0 125 155" fill="none" className="w-[90px] md:w-[130px] h-[115px] md:h-[160px]">
              <rect x="10" y="45" width="105" height="98" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <polygon points="4,45 62.5,10 121,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
              <circle cx="62.5" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="44" y="93" width="36" height="50" fill="#1B1B2F" rx="4" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // 3. "DON'T GO" SCENE (Boy walks 40%, turns back, walks back to bed!)
  if (outcomeId === 'dont_go') {
    return (
      <div className="w-full max-w-2xl mx-auto my-2 px-4 select-none pointer-events-none">
        <div className="relative w-full h-[180px] md:h-[240px] flex items-center justify-between px-2 md:px-6">
          {/* Bed on Left */}
          <div className="absolute left-2 md:left-6 bottom-6 z-1">
            <svg width="95" height="70" viewBox="0 0 95 70" fill="none" className="w-[75px] md:w-[95px] h-[55px] md:h-[70px]">
              <rect x="4" y="10" width="10" height="54" rx="3" fill="#1B1B2F" />
              <rect x="84" y="28" width="6" height="36" rx="2" fill="#1B1B2F" />
              <rect x="12" y="40" width="74" height="20" rx="2" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="16" y="28" width="24" height="15" rx="4" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2" />
              <rect x="36" y="34" width="48" height="26" rx="4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Turn Back Boy Traversal */}
          <div className="relative w-full h-full flex items-end pb-6 z-2">
            <motion.div
              animate={{
                // Walk right 40% -> Turn around -> Walk back to bed on left
                left: ['5%', '42%', '42%', '5%'],
                scaleX: [1, 1, -1, -1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatDelay: 1,
                times: [0, 0.45, 0.55, 1],
                ease: 'easeInOut',
              }}
              className="absolute bottom-6 flex flex-col items-center"
            >
              <div className="px-2.5 py-0.5 bg-[#FF4B4B] text-white border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold shadow-[2px_2px_0px_#1B1B2F] mb-1">
                Nope! Turning back! 🙅
              </div>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 0.35, repeat: Infinity }}>
                <svg width="70" height="125" viewBox="0 0 70 125" fill="none" className="w-[55px] md:w-[75px] h-[95px] md:h-[130px]">
                  <rect x="6" y="35" width="20" height="35" rx="5" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="3" />
                  <circle cx="38" cy="22" r="16" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
                  <path d="M24 20 C 26 8, 48 8, 52 20 C 47 16, 29 16, 24 20 Z" fill="#1B1B2F" />
                  <rect x="26" y="38" width="24" height="35" rx="5" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="3" />
                  <rect x="26" y="73" width="24" height="16" rx="3" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="3" />
                  <motion.line x1="31" y1="89" x2="22" y2="116" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" animate={{ x2: [22, 40, 22] }} transition={{ duration: 0.35, repeat: Infinity }} />
                  <motion.line x1="45" y1="89" x2="54" y2="116" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" animate={{ x2: [54, 30, 54] }} transition={{ duration: 0.35, repeat: Infinity }} />
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* College Building in Background */}
          <div className="absolute right-1 md:right-4 bottom-5 z-1 opacity-70">
            <svg width="125" height="155" viewBox="0 0 125 155" fill="none" className="w-[90px] md:w-[130px] h-[115px] md:h-[160px]">
              <rect x="10" y="45" width="105" height="98" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <polygon points="4,45 62.5,10 121,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
              <circle cx="62.5" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              <rect x="44" y="93" width="36" height="50" fill="#1B1B2F" rx="4" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // 4. "GO" SCENE (Boy completes walk and settles RIGHT AT THE COLLEGE DOOR!)
  if (outcomeId === 'go') {
    return (
      <div className="w-full max-w-2xl mx-auto my-2 px-4 select-none pointer-events-none">
        <div className="relative w-full h-[180px] md:h-[240px] flex items-center justify-between px-2 md:px-6">
          {/* Standing Directly at Door Position: right side calculated offset */}
          <div className="relative w-full h-full flex items-end pb-6 z-2">
            <motion.div
              initial={{ left: '5%' }}
              animate={{ left: 'calc(100% - 145px)' }}
              transition={{ duration: 3.5, ease: 'easeInOut' }}
              className="absolute bottom-6 flex flex-col items-center"
            >
              <div className="px-3 py-1 bg-[#3DDC84] border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] mb-1 animate-bounce">
                Arrived at Class! 🚶‍♂️✅
              </div>
              <svg width="70" height="125" viewBox="0 0 70 125" fill="none" className="w-[55px] md:w-[75px] h-[95px] md:h-[130px]">
                <rect x="6" y="35" width="20" height="35" rx="5" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="3" />
                <circle cx="38" cy="22" r="16" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
                <path d="M24 20 C 26 8, 48 8, 52 20 C 47 16, 29 16, 24 20 Z" fill="#1B1B2F" />
                <circle cx="44" cy="21" r="2" fill="#1B1B2F" />
                <path d="M41 27 Q44 30 47 27" stroke="#1B1B2F" strokeWidth="2" strokeLinecap="round" />
                <rect x="26" y="38" width="24" height="35" rx="5" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="3" />
                <rect x="26" y="73" width="24" height="16" rx="3" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="3" />
                <line x1="32" y1="89" x2="32" y2="116" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="44" y1="89" x2="44" y2="116" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>

          {/* College Building with Highlighted Green Door */}
          <div className="absolute right-1 md:right-4 bottom-5 z-1">
            <svg width="125" height="155" viewBox="0 0 125 155" fill="none" className="w-[90px] md:w-[130px] h-[115px] md:h-[160px]">
              <rect x="10" y="45" width="105" height="98" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
              <polygon points="4,45 62.5,10 121,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
              <line x1="62.5" y1="10" x2="62.5" y2="-4" stroke="#1B1B2F" strokeWidth="2.5" />
              <polygon points="62.5,-4 78.5,2 62.5,8" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />
              <circle cx="62.5" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
              {/* Highlighted Door */}
              <rect x="44" y="93" width="36" height="50" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" rx="4" />
              <circle cx="72" cy="118" r="2" fill="#1B1B2F" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // 5. IDLE TEASER SCENE (outcomeId === null: Continuous wake-up and walk loop ending RIGHT AT COLLEGE DOOR)
  return (
    <div className="w-full max-w-2xl mx-auto my-2 px-4 select-none pointer-events-none">
      <div className="relative w-full h-[180px] md:h-[240px] flex items-center justify-between px-2 md:px-6">

        {/* 1. Bed Scene (Left Side - 3.8s Lying Phase + 1.7s Sit/Stand Phase) */}
        <motion.div
          animate={{
            opacity: [1, 1, 1, 0, 0, 0, 1],
            scale: [1, 1, 1, 0.85, 0.85, 0.85, 1],
          }}
          transition={{
            duration: 13,
            repeat: Infinity,
            times: [0, 0.29, 0.35, 0.44, 0.92, 0.96, 1],
            ease: 'easeInOut',
          }}
          className="absolute left-2 md:left-6 bottom-6 z-1 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, -12, -22], opacity: [0, 1, 0], scale: [0.8, 1.1, 0.9] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            className="px-2.5 py-1 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] mb-1"
          >
            Zzz... 🛌
          </motion.div>
          <svg width="95" height="70" viewBox="0 0 95 70" fill="none" className="w-[75px] md:w-[95px] h-[55px] md:h-[70px]">
            <rect x="4" y="10" width="10" height="54" rx="3" fill="#1B1B2F" />
            <rect x="84" y="28" width="6" height="36" rx="2" fill="#1B1B2F" />
            <rect x="12" y="40" width="74" height="20" rx="2" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2.5" />
            <rect x="16" y="28" width="24" height="15" rx="4" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="2" />
            <circle cx="28" cy="32" r="7.5" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="1.5" />
            <path d="M22 30 Q28 26 34 30" fill="#1B1B2F" />
            <rect x="36" y="34" width="48" height="26" rx="4" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2.5" />
          </svg>
        </motion.div>

        {/* 2. Character Traversal (Visible Sit/Stand at 3.8s -> Smooth Walk 5.5s-10.5s -> Door Arrival 10.5s-12.0s) */}
        <div className="relative w-full h-full flex items-end pb-6 z-2">
          <motion.div
            animate={{
              left: ['2%', '2%', '2%', 'calc(100% - 145px)', 'calc(100% - 145px)', '2%'],
              opacity: [0, 0, 1, 1, 1, 0],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              times: [0, 0.29, 0.35, 0.81, 0.92, 1],
              ease: 'easeInOut',
            }}
            className="absolute bottom-6 flex flex-col items-center"
          >
            {/* Intermittent Lingering Zzz Bubble popping up during Walk Phase */}
            <motion.div
              animate={{
                opacity: [0, 0, 1, 0, 1, 0, 0],
                y: [0, -4, -12, -4, -12, -4, 0],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                times: [0, 0.44, 0.54, 0.64, 0.74, 0.84, 1],
                ease: 'easeInOut',
              }}
              className="px-2.5 py-1 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] -mb-1 z-10"
            >
              Zzz... 😴
            </motion.div>

            {/* Boy Character Vector SVG */}
            <motion.div animate={{ y: [0, -5, 0, -5, 0] }} transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}>
              <svg width="70" height="125" viewBox="0 0 70 125" fill="none" className="w-[55px] md:w-[75px] h-[95px] md:h-[130px]">
                <rect x="6" y="35" width="20" height="35" rx="5" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="3" />
                <circle cx="38" cy="22" r="16" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
                <path d="M24 20 C 26 8, 48 8, 52 20 C 47 16, 29 16, 24 20 Z" fill="#1B1B2F" />
                <circle cx="44" cy="21" r="2" fill="#1B1B2F" />
                <path d="M41 27 Q44 30 47 27" stroke="#1B1B2F" strokeWidth="2" strokeLinecap="round" />
                <rect x="26" y="38" width="24" height="35" rx="5" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="3" />
                <rect x="26" y="73" width="24" height="16" rx="3" fill="#3EC1FF" stroke="#1B1B2F" strokeWidth="3" />

                {/* Leg Swings */}
                <motion.line
                  x1="31" y1="89" x2="22" y2="116" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round"
                  animate={{ x2: [20, 42, 20], y2: [116, 112, 116] }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.line
                  x1="45" y1="89" x2="54" y2="116" stroke="#1B1B2F" strokeWidth="4.5" strokeLinecap="round"
                  animate={{ x2: [54, 28, 54], y2: [112, 116, 112] }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Arm Swing */}
                <motion.path
                  d="M 38 42 L 50 58" stroke="#1B1B2F" strokeWidth="4" strokeLinecap="round"
                  animate={{ d: ['M 38 42 L 50 58', 'M 38 42 L 26 58', 'M 38 42 L 50 58'] }}
                  transition={{ duration: 0.35, repeat: Infinity, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* 3. College Building (Right Side) */}
        <div className="absolute right-1 md:right-4 bottom-5 z-1 flex flex-col items-center">
          <svg width="125" height="155" viewBox="0 0 125 155" fill="none" className="w-[90px] md:w-[130px] h-[115px] md:h-[160px]">
            <rect x="10" y="45" width="105" height="98" rx="6" fill="#FFFDF9" stroke="#1B1B2F" strokeWidth="3" />
            <polygon points="4,45 62.5,10 121,45" fill="#3DDC84" stroke="#1B1B2F" strokeWidth="3" />
            <line x1="62.5" y1="10" x2="62.5" y2="-4" stroke="#1B1B2F" strokeWidth="2.5" />
            <polygon points="62.5,-4 78.5,2 62.5,8" fill="#FF3E9D" stroke="#1B1B2F" strokeWidth="2" />
            <circle cx="62.5" cy="65" r="12" fill="#FFD23F" stroke="#1B1B2F" strokeWidth="2.5" />
            <line x1="62.5" y1="65" x2="62.5" y2="58" stroke="#1B1B2F" strokeWidth="2" />
            <line x1="62.5" y1="65" x2="67.5" y2="65" stroke="#1B1B2F" strokeWidth="2" />
            <motion.rect
              x="44" y="93" width="36" height="50" fill="#1B1B2F" rx="4"
              animate={{ fill: ['#1B1B2F', '#1B1B2F', '#3DDC84', '#1B1B2F'] }}
              transition={{ duration: 13, repeat: Infinity, times: [0, 0.81, 0.91, 0.98] }}
            />
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
