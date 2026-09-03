import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const QUOTE_POOL = [
  "Today is not your day.",
  "Books are waiting for you 📚",
  "Would you like to go to college?",
  "Your bed called. It misses you.",
  "Attendance doesn't count itself.",
  "One day won't matter... right?",
  "Future you is judging present you.",
  "That assignment isn't going to submit itself.",
  "Skipping class builds character. Allegedly.",
  "Your degree is watching 👀",
  "Netflix will still be there tomorrow.",
  "Every bunk has a price.",
  "Somewhere, your mom is asking if you went today.",
  "The syllabus doesn't forgive.",
  "Sleep now, cry during finals.",
  "Class started a few minutes ago, btw.",
  "You could be taking notes right now.",
  "Adulthood is just deciding whether to go.",
  "Coffee won't fix this sleep debt ☕",
  "Are 75% attendance rules a myth?",
  "Your blanket is warmer than the classroom.",
  "75% attendance is a lifestyle choice.",
  "To bunk or not to bunk? 🤔",
];

const COLOR_PALETTE = [
  { bg: '#FF3E9D', text: '#FFFDF9' }, // Bubblegum Pink
  { bg: '#3DDC84', text: '#1B1B2F' }, // Grass Green
  { bg: '#FFD23F', text: '#1B1B2F' }, // Zest Yellow
  { bg: '#3EC1FF', text: '#1B1B2F' }, // Sky Blue
  { bg: '#FF4B4B', text: '#FFFDF9' }, // Cherry Red
];

// Screen region anchors to keep pills in margins away from the central form card
const MARGIN_REGIONS = [
  { top: '8%', left: '3%' },
  { top: '12%', right: '4%' },
  { top: '34%', left: '2%' },
  { top: '38%', right: '3%' },
  { top: '60%', left: '4%' },
  { top: '65%', right: '2%' },
  { top: '85%', left: '5%' },
  { top: '88%', right: '4%' },
];

interface TauntPill {
  id: number;
  text: string;
  color: typeof COLOR_PALETTE[number];
  position: typeof MARGIN_REGIONS[number];
  rotation: number;
  duration: number;
  delay: number;
  floatX: [number, number, number];
  floatY: [number, number, number];
}

export const FloatingTaunts: React.FC = () => {
  const [taunts, setTaunts] = useState<TauntPill[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion media query
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleMotionChange);

    // Generate initial taunt pills
    const generated: TauntPill[] = MARGIN_REGIONS.map((pos, idx) => {
      const quote = QUOTE_POOL[Math.floor(Math.random() * QUOTE_POOL.length)];
      const color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
      const rotation = (Math.random() * 16 - 8); // -8 deg to +8 deg
      const duration = 18 + Math.random() * 18; // 18s to 36s loop
      const delay = idx * 0.4;
      const floatX: [number, number, number] = [
        0,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
      ];
      const floatY: [number, number, number] = [
        0,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
      ];

      return {
        id: idx,
        text: quote,
        color,
        position: pos,
        rotation,
        duration,
        delay,
        floatX,
        floatY,
      };
    });

    setTaunts(generated);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden select-none">
      {taunts.map((taunt) => {
        // Show 4 pills on mobile, all 8 on md+ screens
        const isHiddenOnMobile = taunt.id >= 4;

        if (prefersReducedMotion) {
          // Static rendering for reduced motion
          return (
            <div
              key={taunt.id}
              className={`absolute px-3 py-1.5 rounded-full border-2 border-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] text-xs md:text-sm font-medium transition-opacity ${
                isHiddenOnMobile ? 'hidden md:inline-flex' : 'inline-flex'
              }`}
              style={{
                ...taunt.position,
                backgroundColor: taunt.color.bg,
                color: taunt.color.text,
                transform: `rotate(${taunt.rotation}deg)`,
              }}
            >
              {taunt.text}
            </div>
          );
        }

        // Gentle floating drift animation
        return (
          <motion.div
            key={taunt.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 0.9, 0.95, 0.9, 0],
              x: taunt.floatX,
              y: taunt.floatY,
              rotate: [taunt.rotation, taunt.rotation + 4, taunt.rotation - 4, taunt.rotation],
            }}
            transition={{
              duration: taunt.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: taunt.delay,
            }}
            className={`absolute px-3 py-1.5 rounded-full border-2 border-[#1B1B2F] shadow-[3px_3px_0px_#1B1B2F] text-xs md:text-sm font-medium font-space transition-all ${
              isHiddenOnMobile ? 'hidden md:inline-flex' : 'inline-flex'
            }`}
            style={{
              ...taunt.position,
              backgroundColor: taunt.color.bg,
              color: taunt.color.text,
            }}
          >
            {taunt.text}
          </motion.div>
        );
      })}
    </div>
  );
};
