import React from 'react';
import { sounds } from '../utils/soundEffects';

interface SleepSliderProps {
  value: number | null;
  onChange: (val: number) => void;
}

const PRESETS = [
  { val: 2, label: '2 hrs 💀' },
  { val: 5, label: '5 hrs 🥱' },
  { val: 7.5, label: '7.5 hrs 😊' },
  { val: 9, label: '9 hrs 😴' },
  { val: 12, label: '12 hrs 🛌' },
];

export const SleepSlider: React.FC<SleepSliderProps> = ({ value, onChange }) => {
  const currentValue = value ?? 7;

  const getSleepEmoji = (hrs: number) => {
    if (hrs < 4) return '💀';
    if (hrs < 6) return '🥱';
    if (hrs < 8) return '😊';
    if (hrs < 10) return '😴';
    return '🛌';
  };

  const getSleepStatusText = (hrs: number) => {
    if (hrs < 4) return 'Danger Zone! Extreme Sleep Debt 🛑';
    if (hrs < 6) return 'Zombie Mode — Needs Coffee Urgently ☕';
    if (hrs < 8) return 'Optimal Human Functioning Level 👍';
    return 'Fully Charged Sleeping Beauty Status 👑';
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onChange(val);
    sounds.playClick();
  };

  const handlePresetClick = (val: number) => {
    onChange(val);
    sounds.playPop();
  };

  return (
    <div className="w-full bg-[#FFFDF9] border-2 border-[#1B1B2F] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-[3px_3px_0px_#1B1B2F] transition-all hover:shadow-[4px_4px_0px_#1B1B2F]">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <label className="text-sm sm:text-base font-bold text-[#1B1B2F] flex items-center gap-1.5 sm:gap-2">
          <span>1. Sleep Hours Last Night</span>
          <span className="text-lg sm:text-xl">{getSleepEmoji(currentValue)}</span>
        </label>
        <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-[#3EC1FF] border-2 border-[#1B1B2F] rounded-full text-xs sm:text-sm md:text-base font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F]">
          {value !== null ? `${value} hrs` : 'Select'}
        </div>
      </div>

      {/* Main Range Slider */}
      <div className="py-1.5 sm:py-2">
        <input
          type="range"
          min="0"
          max="12"
          step="0.5"
          value={currentValue}
          onChange={handleSliderChange}
          className="w-full accent-[#FF3E9D] cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-[#1B1B2F]/60 mt-1">
          <span>0 hrs (No sleep)</span>
          <span>6 hrs</span>
          <span>12 hrs (Coma)</span>
        </div>
      </div>

      {/* Sleep Status Subtitle */}
      <p className="text-[11px] sm:text-xs font-semibold text-[#1B1B2F]/70 italic mt-1 mb-2 sm:mb-3">
        {value !== null ? getSleepStatusText(currentValue) : 'Drag slider or pick a preset:'}
      </p>

      {/* Quick Presets */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
        {PRESETS.map((p) => {
          const isSelected = value === p.val;
          return (
            <button
              key={p.val}
              type="button"
              onClick={() => handlePresetClick(p.val)}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border-2 border-[#1B1B2F] text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#FF3E9D] text-white shadow-[2px_2px_0px_#1B1B2F] translate-y-[-1px]'
                  : 'bg-white text-[#1B1B2F] hover:bg-[#FFD23F] hover:shadow-[2px_2px_0px_#1B1B2F]'
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
