import React, { useEffect, useState } from 'react';

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

// Screen margin locations (% top & % left) to keep quotes safely in side margins
const BASE_SLOTS = [
  { top: '10%', left: '2%' },
  { top: '15%', left: '78%' },
  { top: '35%', left: '1.5%' },
  { top: '40%', left: '80%' },
  { top: '62%', left: '2.5%' },
  { top: '68%', left: '77%' },
  { top: '85%', left: '3%' },
  { top: '88%', left: '79%' },
];

interface TauntItem {
  id: string;
  slotIdx: number;
  text: string;
  color: typeof COLOR_PALETTE[number];
  top: string;
  left: string;
  animVariant: string;
  durationSec: number;
  delaySec: number;
}

function generateTaunt(slotIdx: number): TauntItem {
  const quote = QUOTE_POOL[Math.floor(Math.random() * QUOTE_POOL.length)];
  const color = COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];
  const baseSlot = BASE_SLOTS[slotIdx];

  // Slight jitter around base slot %
  const topVal = parseFloat(baseSlot.top) + (Math.random() * 6 - 3);
  const leftVal = parseFloat(baseSlot.left) + (Math.random() * 4 - 2);

  const animVariant = `anim-float-taunt-${Math.floor(Math.random() * 4) + 1}`;
  const durationSec = Math.floor(18 + Math.random() * 16); // 18s - 34s
  // Negative delay so they are instantly in motion mid-animation loop on page load
  const delaySec = -Math.floor(Math.random() * 20);

  return {
    id: `taunt-${slotIdx}-${Date.now()}-${Math.random()}`,
    slotIdx,
    text: quote,
    color,
    top: `${topVal}%`,
    left: `${leftVal}%`,
    animVariant,
    durationSec,
    delaySec,
  };
}

export const FloatingTaunts: React.FC = () => {
  const [taunts, setTaunts] = useState<TauntItem[]>([]);

  useEffect(() => {
    // Generate initial 8 taunts
    const initial = BASE_SLOTS.map((_, idx) => generateTaunt(idx));
    setTaunts(initial);

    // Staggered respawn timer every 12 seconds to re-randomize one quote slot cleanly
    const interval = setInterval(() => {
      setTaunts((prev) => {
        if (prev.length === 0) return prev;
        const targetSlot = Math.floor(Math.random() * prev.length);
        return prev.map((t, idx) => (idx === targetSlot ? generateTaunt(idx) : t));
      });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-1 overflow-hidden select-none"
      style={{ pointerEvents: 'none' }}
    >
      {taunts.map((item) => {
        // Show slots 0..3 on mobile, all slots 0..7 on md+ screens
        const isHiddenOnMobile = item.slotIdx >= 4;

        return (
          <div
            key={item.id}
            className={`absolute px-3 py-1.5 rounded-full border-2 border-[#1B1B2F] shadow-[3px_3px_0px_#1B1B2F] text-xs md:text-sm font-semibold font-space cursor-default transition-opacity ${item.animVariant} ${
              isHiddenOnMobile ? 'hidden md:inline-flex' : 'inline-flex'
            }`}
            style={
              {
                top: item.top,
                left: item.left,
                backgroundColor: item.color.bg,
                color: item.color.text,
                '--taunt-duration': `${item.durationSec}s`,
                '--taunt-delay': `${item.delaySec}s`,
              } as React.CSSProperties
            }
          >
            {item.text}
          </div>
        );
      })}
    </div>
  );
};
