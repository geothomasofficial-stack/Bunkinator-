import type { SelectOption } from '../types/bunkinator';
import { sounds } from '../utils/soundEffects';

interface InputCardGroupProps<T extends string> {
  stepNumber: number;
  title: string;
  options: SelectOption<T>[];
  selectedValue: T | null;
  onSelect: (val: T) => void;
  gridCols?: string;
}

export function InputCardGroup<T extends string>({
  stepNumber,
  title,
  options,
  selectedValue,
  onSelect,
  gridCols = 'grid-cols-2 md:grid-cols-4',
}: InputCardGroupProps<T>) {
  const handleSelectOption = (optId: T) => {
    onSelect(optId);
    sounds.playPop();
  };

  return (
    <div className="w-full bg-[#FFFDF9] border-2 border-[#1B1B2F] rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-[3px_3px_0px_#1B1B2F] transition-all hover:shadow-[4px_4px_0px_#1B1B2F]">
      <label className="text-sm sm:text-base font-bold text-[#1B1B2F] block mb-2 sm:mb-3">
        {stepNumber}. {title}
      </label>

      <div className={`grid gap-2 sm:gap-2.5 ${gridCols}`}>
        {options.map((opt) => {
          const isSelected = selectedValue === opt.id;
          // Determine custom signature border/bg color per option if supplied or default palette
          const selectedColor = opt.accentColor || '#FF3E9D';

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              className={`group relative p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all flex flex-col items-center text-center justify-center cursor-pointer select-none ${
                isSelected
                  ? 'border-[#1B1B2F] bg-white shadow-[2px_2px_0px_#1B1B2F] sm:shadow-[3px_3px_0px_#1B1B2F] translate-y-[-1px] ring-2 ring-offset-1 ring-[#1B1B2F]'
                  : 'border-[#1B1B2F]/30 bg-white/70 hover:border-[#1B1B2F] hover:bg-white hover:shadow-[2px_2px_0px_#1B1B2F]'
              }`}
              style={{
                backgroundColor: isSelected ? `${selectedColor}18` : undefined,
                borderColor: isSelected ? '#1B1B2F' : undefined,
              }}
            >
              {/* Selected indicator chip */}
              {isSelected && (
                <div
                  className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-[#1B1B2F] flex items-center justify-center text-[9px] sm:text-[10px] font-bold text-white shadow-[1px_1px_0px_#1B1B2F]"
                  style={{ backgroundColor: selectedColor }}
                >
                  ✓
                </div>
              )}

              <span className="text-xl sm:text-2xl md:text-3xl mb-0.5 sm:mb-1 transition-transform group-hover:scale-110">
                {opt.emoji}
              </span>
              <span className="text-[11px] sm:text-xs md:text-sm font-bold text-[#1B1B2F] leading-tight sm:leading-snug">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
