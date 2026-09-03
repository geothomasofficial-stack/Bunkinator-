import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import type { BunkResult } from '../types/bunkinator';
import { RotateCcw, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface ResultCardProps {
  result: BunkResult;
  onReset: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  useEffect(() => {
    // Play sound FX corresponding to outcome
    sounds.playReveal(result.outcomeId);

    // Trigger confetti burst on "Go 🚶‍♂️" outcome
    if (result.outcomeId === 'go') {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({
          particleCount,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF3E9D', '#FFD23F', '#3EC1FF', '#3DDC84', '#FF4B4B'],
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [result]);

  const handleTryAgain = () => {
    sounds.playPop();
    onReset();
  };

  // Determine progress bar fill color
  const getProgressBarColor = () => {
    if (result.score < 40) return '#FF4B4B'; // Red
    if (result.score <= 70) return '#FFD23F'; // Yellow
    return '#3DDC84'; // Green
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      className="relative z-10 w-full max-w-2xl mx-auto my-6 px-4"
    >
      {/* Signature Color Background Container */}
      <div
        className="rounded-[28px] border-4 border-[#1B1B2F] p-6 md:p-10 shadow-[10px_10px_0px_#1B1B2F] relative overflow-hidden transition-all text-[#1B1B2F]"
        style={{ backgroundColor: result.signatureColor }}
      >
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1B1B2F_1.5px,transparent_1.5px)] [background-size:16px_16px] pointer-events-none" />

        {/* Top Tag Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9] border-2 border-[#1B1B2F] font-bold text-xs md:text-sm uppercase tracking-wider shadow-[2px_2px_0px_#1B1B2F]">
            <Award className="w-4 h-4 text-[#FF3E9D]" />
            <span>The Oracle Has Spoken</span>
          </div>

          <button
            onClick={handleTryAgain}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFDF9] border-2 border-[#1B1B2F] font-bold text-xs shadow-[2px_2px_0px_#1B1B2F] hover:bg-[#FFD23F] transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Hero Headline Reveal */}
        <div className="text-center my-6">
          <motion.h2
            initial={{ scale: 0.5, rotate: -5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="text-4xl md:text-6xl font-extrabold font-fredoka leading-tight tracking-tight drop-shadow-[2px_3px_0px_#FFFDF9]"
          >
            {result.headline}
          </motion.h2>

          {/* Flavor Text Quote Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 rounded-2xl bg-[#FFFDF9] border-2 border-[#1B1B2F] shadow-[4px_4px_0px_#1B1B2F] text-center"
          >
            <p className="text-base md:text-lg font-bold text-[#1B1B2F] italic">
              "{result.flavorText}"
            </p>
          </motion.div>
        </div>

        {/* Animated Horizontal Probability Bar (Irony display) */}
        <div className="mt-8 p-5 rounded-2xl bg-[#FFFDF9] border-3 border-[#1B1B2F] shadow-[4px_4px_0px_#1B1B2F]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold uppercase tracking-wider text-[#1B1B2F]/80 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FF3E9D]" />
              Chances You'll Actually Show Up
            </span>
            <span
              className="text-xl font-extrabold font-fredoka px-2.5 py-0.5 rounded-lg border-2 border-[#1B1B2F]"
              style={{ backgroundColor: getProgressBarColor() }}
            >
              {result.score}%
            </span>
          </div>

          {/* Outer Track */}
          <div className="w-full h-7 bg-[#EAE6DF] border-2 border-[#1B1B2F] rounded-full overflow-hidden p-0.5 relative">
            {/* Animated Inner Fill Bar */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.score}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full rounded-full border border-[#1B1B2F]/20 relative overflow-hidden"
              style={{ backgroundColor: getProgressBarColor() }}
            >
              {/* Gloss shine line */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-white/30 rounded-t-full" />
            </motion.div>
          </div>

          <div className="flex justify-between text-[11px] font-bold text-[#1B1B2F]/60 mt-1.5 px-1">
            <span>0% (Solid Bunk)</span>
            <span>40%</span>
            <span>70%</span>
            <span>100% (Model Student)</span>
          </div>
        </div>

        {/* Score Factor Breakdown Box */}
        <div className="mt-6 p-4 md:p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#1B1B2F] shadow-[4px_4px_0px_#1B1B2F]">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#1B1B2F] mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#3DDC84]" />
            Bunk Matrix Factor Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold">
            {result.breakdown.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl bg-white border border-[#1B1B2F]/20"
              >
                <span className="flex items-center gap-1.5 truncate">
                  <span>{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </span>
                <span
                  className={`px-2 py-0.5 rounded-md font-extrabold border ${
                    item.points > 0
                      ? 'bg-[#3DDC84]/20 border-[#3DDC84] text-emerald-800'
                      : item.points < 0
                      ? 'bg-[#FF4B4B]/20 border-[#FF4B4B] text-rose-800'
                      : 'bg-gray-100 border-gray-300 text-gray-700'
                  }`}
                >
                  {item.points > 0 ? `+${item.points}` : item.points}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Try Again 🔁 Action */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleTryAgain}
            className="py-3.5 px-8 rounded-2xl bg-[#FFFDF9] border-3 border-[#1B1B2F] font-fredoka text-xl font-extrabold text-[#1B1B2F] shadow-[5px_5px_0px_#1B1B2F] hover:bg-[#FFD23F] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#1B1B2F] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1B1B2F] transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Try Again 🔁</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};
