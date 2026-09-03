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
    <header className="relative z-10 w-full max-w-2xl mx-auto pt-6 pb-4 px-4 flex flex-col items-center text-center">
      {/* Top Floating Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD23F] border-2 border-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F] text-xs font-bold uppercase tracking-wider text-[#1B1B2F] mb-3 transform -rotate-1 hover:rotate-1 transition-transform cursor-default">
        <Sparkles className="w-3.5 h-3.5" />
        <span>100% Scientific Bunk Science 🧪</span>
      </div>

      {/* Main Title */}
      <div className="relative inline-block">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#1B1B2F] tracking-tight font-fredoka drop-shadow-[2px_3px_0px_rgba(255,62,157,0.3)]">
          Bunkinator <span className="inline-block animate-bounce">🔮</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="mt-2 text-lg md:text-xl font-medium text-[#1B1B2F]/80">
        "Should I Attend Class Today?" — The Ultimate College Decision Engine
      </p>

      {/* Sound Mute Toggle */}
      <button
        onClick={handleToggleSound}
        className="absolute top-6 right-4 md:right-0 p-2.5 rounded-full bg-[#FFFDF9] border-2 border-[#1B1B2F] shadow-[3px_3px_0px_#1B1B2F] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-[2px_2px_0px_#1B1B2F] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all text-[#1B1B2F] focus:outline-none"
        title={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
        aria-label={muted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
      >
        {muted ? <VolumeX className="w-5 h-5 text-red-500" /> : <Volume2 className="w-5 h-5 text-[#FF3E9D]" />}
      </button>
    </header>
  );
};
