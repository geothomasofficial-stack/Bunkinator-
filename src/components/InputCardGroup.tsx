import type { SelectOption } from '../types/bunkinator';
import { sounds } from '../utils/soundEffects';

interface InputCardGroupProps<T extends string> {
  stepNumber: number;
  title: string;
  options: SelectOption<T>[];
  selectedValue: T | null;
  onSelect: (val: T) => void;
  gridCols?: 'grid-cols-2' | 'grid-cols-2 md:grid-cols-4' | 'grid-cols-2 md:grid-cols-3' | 'grid-cols-1 md:grid-cols-2';
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
    <div className="w-full bg-[#FFFDF9] border-2 border-[#1B1B2F] rounded-2xl p-4 md:p-5 shadow-[3px_3px_0px_#1B1B2F] transition-all hover:shadow-[4px_4px_0px_#1B1B2F]">
      <label className="text-base font-bold text-[#1B1B2F] block mb-3">
        {stepNumber}. {title}
      </label>

      <div className={`grid gap-2.5 ${gridCols}`}>
        {options.map((opt) => {
          const isSelected = selectedValue === opt.id;
          // Determine custom signature border/bg color per option if supplied or default palette
          const selectedColor = opt.accentColor || '#FF3E9D';

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectOption(opt.id)}
              className={`group relative p-3 rounded-xl border-2 transition-all flex flex-col items-center text-center justify-center cursor-pointer select-none ${
                isSelected
                  ? 'border-[#1B1B2F] bg-white shadow-[3px_3px_0px_#1B1B2F] translate-y-[-2px] ring-2 ring-offset-1 ring-[#1B1B2F]'
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
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full border-2 border-[#1B1B2F] flex items-center justify-center text-[10px] font-bold text-white shadow-[1px_1px_0px_#1B1B2F]"
                  style={{ backgroundColor: selectedColor }}
                >
                  ✓
                </div>
              )}

              <span className="text-2xl md:text-3xl mb-1 transition-transform group-hover:scale-110">
                {opt.emoji}
              </span>
              <span className="text-xs md:text-sm font-bold text-[#1B1B2F] leading-snug">
                {opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
