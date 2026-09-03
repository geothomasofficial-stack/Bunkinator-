import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const Header: React.FC = () => {
  const [muted, setMuted] = useState(sounds.getMuted());

  const handleToggleSound = () => {
    const isNowMuted = sounds.toggleMute();
    setMuted(isNowMuted);
  };

  return (
    <header className="relative z-10 w-full max-w-2xl mx-auto pt-4 sm:pt-6 pb-2 sm:pb-4 px-3 sm:px-4 flex flex-col items-center text-center">
      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#FFD23F] border-2 border-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#1B1B2F] mb-2 sm:mb-3 transform -rotate-1 hover:rotate-1 transition-transform cursor-default">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        <span>100% Scientific Bunk Science 🧪</span>
      </div>

      {/* Main Title */}
      <div className="relative inline-block">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#1B1B2F] tracking-tight font-fredoka drop-shadow-[2px_3px_0px_rgba(255,62,157,0.3)]">
          Bunkinator <span className="inline-block animate-bounce">🔮</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="mt-1.5 sm:mt-2 text-xs sm:text-base md:text-lg font-bold text-[#1B1B2F]/80 max-w-md sm:max-w-none">
        "Should I Attend Class Today?" — The Ultimate College Decision Engine
      </p>

      {/* Sound Mute Toggle */}
      <button
        onClick={handleToggleSound}
        className="absolute top-3 sm:top-6 right-2 sm:right-4 md:right-0 p-2 sm:p-2.5 rounded-full bg-[#FFFDF9] border-2 border-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] sm:shadow-[3px_3px_0px_#1B1B2F] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all text-[#1B1B2F] focus:outline-none cursor-pointer"
        title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        aria-label={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
      >
        {muted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF3E9D]" />}
      </button>
    </header>
  );
};
